#!/usr/bin/env python3
import argparse
import json
import threading
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


DEFAULT_API_RESPONSE = {
    "code": 0,
    "message": "ok",
    "ok": True,
    "data": {},
}


class ReusableHTTPServer(ThreadingHTTPServer):
    allow_reuse_address = True


class LoginConfigHandler(BaseHTTPRequestHandler):
    config_path: Path
    log_dir: Path | None
    body_limit: int

    def do_GET(self):
        self.handle_any()

    def do_POST(self):
        self.handle_any()

    def do_PUT(self):
        self.handle_any()

    def do_PATCH(self):
        self.handle_any()

    def do_DELETE(self):
        self.handle_any()

    def do_OPTIONS(self):
        self.handle_any()

    def do_HEAD(self):
        self.handle_any(send_body=False)

    def handle_any(self, send_body=True):
        parsed = urlparse(self.path)
        body = self.read_body() if self.log_dir else b""
        self.record_request(parsed, body)

        if self.command == "OPTIONS":
            self.send_empty(204)
            return

        if parsed.path == "/" or parsed.path.endswith("/login.json"):
            self.send_login_config(send_body)
            return

        self.send_json(DEFAULT_API_RESPONSE, send_body=send_body)

    def read_body(self):
        raw_len = self.headers.get("Content-Length")
        if not raw_len:
            return b""
        try:
            length = int(raw_len)
        except ValueError:
            return b""
        return self.rfile.read(min(length, self.body_limit))

    def record_request(self, parsed, body):
        local_port = self.server.server_address[1]
        host = self.headers.get("Host", "")
        agent = self.headers.get("User-Agent", "")
        length = self.headers.get("Content-Length", "0")
        stamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(
            f"{stamp} port={local_port} peer={self.client_address[0]}:{self.client_address[1]} "
            f"{self.command} host={host!r} target={self.path!r} content_len={length} "
            f"captured_body={len(body)} ua={agent!r}"
        )

        if self.log_dir is None:
            return

        self.log_dir.mkdir(parents=True, exist_ok=True)
        safe_path = "".join(c if c.isalnum() or c in "_.-" else "_" for c in parsed.path).strip("_") or "root"
        fname = datetime.now().strftime("%Y%m%d-%H%M%S-%f")
        out = self.log_dir / f"{fname}_{local_port}_{self.command}_{safe_path[:80]}.txt"
        lines = [
            f"time: {stamp}",
            f"peer: {self.client_address[0]}:{self.client_address[1]}",
            f"local_port: {local_port}",
            f"method: {self.command}",
            f"path: {self.path}",
            f"parsed_path: {parsed.path}",
            f"query: {parsed.query}",
            "headers:",
        ]
        lines.extend(f"  {k}: {v}" for k, v in self.headers.items())
        lines.append("")
        if body:
            try:
                decoded = body.decode("utf-8")
            except UnicodeDecodeError:
                decoded = None
            lines.append(f"body_len_captured: {len(body)}")
            if decoded is not None:
                lines.append("body_utf8:")
                lines.append(decoded)
            else:
                lines.append("body_hex:")
                lines.append(body.hex(" "))
        else:
            lines.append("body_len_captured: 0")
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")

    def send_login_config(self, send_body=True):
        try:
            body = self.config_path.read_bytes()
            json.loads(body.decode("utf-8"))
        except Exception as exc:
            self.send_json({"code": 1, "message": str(exc)}, status=500, send_body=send_body)
            return
        self.send_response(200)
        self.send_common_headers("application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if send_body:
            self.wfile.write(body)

    def send_json(self, value, status=200, send_body=True):
        body = json.dumps(value, separators=(",", ":")).encode("utf-8")
        self.send_response(status)
        self.send_common_headers("application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if send_body:
            self.wfile.write(body)

    def send_empty(self, status):
        self.send_response(status)
        self.send_common_headers("text/plain; charset=utf-8")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def send_common_headers(self, content_type):
        self.close_connection = True
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Connection", "close")

    def log_message(self, fmt, *args):
        return


def start_server(host, port, config_path, log_dir, body_limit):
    class Handler(LoginConfigHandler):
        pass

    Handler.config_path = config_path
    Handler.log_dir = log_dir
    Handler.body_limit = body_limit

    server = ReusableHTTPServer((host, port), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server


def main():
    parser = argparse.ArgumentParser(description="Serve local MXD login.json and generic OK responses.")
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=8080, help="loginconfig listener port")
    parser.add_argument("--api-port", type=int, default=5000, help="extra generic API listener")
    parser.add_argument("--extra-port", type=int, action="append", default=[], help="additional HTTP port")
    parser.add_argument("--no-api", action="store_true", help="only listen on --port")
    parser.add_argument("--config", default=str(Path(__file__).with_name("login.json")))
    parser.add_argument("--log-dir", default=None, help="optional directory for detailed request captures")
    parser.add_argument("--body-limit", type=int, default=1048576, help="capture limit when --log-dir is used")
    args = parser.parse_args()

    script_dir = Path(__file__).resolve().parent
    raw_config_path = Path(args.config)
    if raw_config_path.is_absolute():
        config_path = raw_config_path.resolve()
    elif raw_config_path.exists():
        config_path = raw_config_path.resolve()
    else:
        config_path = (script_dir / raw_config_path).resolve()
    log_dir = Path(args.log_dir).resolve() if args.log_dir else None
    ports = [args.port]
    if not args.no_api:
        ports.append(args.api_port)
    ports.extend(args.extra_port)
    ports = list(dict.fromkeys(ports))

    servers = []
    for port in ports:
        servers.append(start_server(args.host, port, config_path, log_dir, args.body_limit))

    print(f"serving {config_path}")
    if log_dir:
        print(f"writing request captures to {log_dir}")
    else:
        print("request capture files disabled; pass --log-dir to enable them")
    print(f"listening on: {', '.join(f'http://{args.host}:{p}/' for p in ports)}")
    print("serving login config for / and any path ending in /login.json")

    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        print("\nstopping")
    finally:
        for server in servers:
            server.shutdown()


if __name__ == "__main__":
    main()
