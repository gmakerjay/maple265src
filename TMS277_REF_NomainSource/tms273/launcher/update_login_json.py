#!/usr/bin/env python3
import argparse
import json
import socket
from pathlib import Path


def detect_wsl_ip() -> str:
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
        sock.connect(("8.8.8.8", 80))
        return sock.getsockname()[0]


def main() -> None:
    parser = argparse.ArgumentParser(description="Update launcher/login.json with the current WSL IP.")
    parser.add_argument("--config", default=Path(__file__).with_name("login.json"), type=Path)
    parser.add_argument("--ip", default=None)
    args = parser.parse_args()

    ip = args.ip or detect_wsl_ip()
    data = json.loads(args.config.read_text(encoding="utf-8"))

    data["ServerAddress"] = ip
    data.setdefault("ShopServer", {})["address"] = ip
    data.setdefault("AuctionServer", {})["address"] = ip
    for server in data.setdefault("DistributedServer", {}).values():
        if isinstance(server, dict):
            server["address"] = ip

    args.config.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {args.config} to WSL IP {ip}", flush=True)


if __name__ == "__main__":
    main()
