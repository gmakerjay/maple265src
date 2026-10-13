#!/usr/bin/env python3
import base64
import json
import os
import socket
import time
from pathlib import Path

from cryptography.hazmat.primitives.ciphers.aead import AESGCM


HOST = "::"
PORT = 16400
DEFAULT_RESPONSE_KEY_HEX = "67a1b4b7eefa926377c3d19ce2fa03ae84dd778dc9ab12ffa32c7c92aab56f2f"


def enc_mask(header12: bytes) -> int:
    return (
        (header12[header12[6] % 12] << 24)
        | (header12[header12[2] % 12] << 16)
        | (header12[header12[9] % 12] << 8)
        | header12[header12[11] % 12]
    )


def dec_mask(header12: bytes) -> int:
    return (
        (header12[header12[10] % 12] << 24)
        | (header12[header12[4] % 12] << 16)
        | (header12[header12[7] % 12] << 8)
        | header12[header12[2] % 12]
    )


def recv_exact(conn: socket.socket, size: int) -> bytes:
    chunks = []
    remaining = size
    while remaining:
        chunk = conn.recv(remaining)
        if not chunk:
            raise EOFError(f"socket closed with {remaining} bytes left")
        chunks.append(chunk)
        remaining -= len(chunk)
    return b"".join(chunks)


def read_request(conn: socket.socket) -> tuple[bytes, bytes]:
    header = recv_exact(conn, 16)
    header12 = header[4:16]
    first = int.from_bytes(header[:4], "big")
    length = first ^ enc_mask(header12)
    body = recv_exact(conn, length)
    return header, body


def make_response(request_body: bytes, secret: bytes) -> tuple[bytes, bytes, bytes]:
    req = json.loads(request_body.decode("utf-8"))
    now_ms = int(time.time() * 1000)
    payload = req.get("encryptedPayload", "")

    # The client-side signature verifier is the next target. These fields match
    # the shape observed in prior solves closely enough to reach that verifier.
    response = {
        "success": True,
        "timestamp": now_ms,
        "payload": payload,
        "fingerprint": "a",
        "hashHand": "b",
        "signature": "c",
        "expiresAt": 9999999999999,
        "time": now_ms,
    }
    plain = json.dumps(response, separators=(",", ":")).encode("utf-8")
    header12 = os.urandom(12)
    cipher = AESGCM(secret).encrypt(header12, plain, None)
    first = (dec_mask(header12) ^ len(cipher)) & 0xFFFFFFFF
    frame = first.to_bytes(4, "big") + header12 + cipher
    return frame, plain, header12


def main() -> None:
    log_path = Path(os.environ.get("AUTH_FORGE_LOG", "logs/auth-forge.log"))
    log_path.parent.mkdir(parents=True, exist_ok=True)
    # The AuthResponse decoder uses this stable key, not the .credentials.dat
    # secret used while constructing the outbound AuthRequest.
    secret = bytes.fromhex(os.environ.get("AUTH_SECRET_HEX", DEFAULT_RESPONSE_KEY_HEX))
    count = int(os.environ.get("AUTH_FORGE_COUNT", "1"))

    with log_path.open("w", encoding="utf-8") as log:
        def emit(line: str) -> None:
            print(line, flush=True)
            print(line, file=log, flush=True)

        with socket.socket(socket.AF_INET6, socket.SOCK_STREAM) as srv:
            srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            srv.bind((HOST, PORT))
            srv.listen(1)
            emit(f"listening [{HOST}]:{PORT}")
            handled = 0
            while count <= 0 or handled < count:
                conn, addr = srv.accept()
                handled += 1
                with conn:
                    emit(f"accepted[{handled}] {addr}")
                    request_header, request_body = read_request(conn)
                    emit(f"request_header {request_header.hex()}")
                    emit(f"request_plain_len {len(request_body)}")
                    emit(request_body.decode("utf-8", "replace"))

                    inner = json.loads(request_body.decode("utf-8")).get("encryptedPayload", "")
                    try:
                        decoded = base64.b64decode(inner).decode("utf-8", "replace")
                        emit(f"inner_payload {decoded}")
                    except Exception as exc:
                        emit(f"inner_payload_decode_failed {exc}")

                    frame, plain, header12 = make_response(request_body, secret)
                    emit(f"response_plain_len {len(plain)} cipher_len {len(frame) - 16}")
                    emit(f"response_header12 {header12.hex()} first {frame[:4].hex()}")
                    emit(plain.decode("utf-8", "replace"))
                    conn.sendall(frame)
                    emit(f"sent_len {len(frame)}")


if __name__ == "__main__":
    main()
