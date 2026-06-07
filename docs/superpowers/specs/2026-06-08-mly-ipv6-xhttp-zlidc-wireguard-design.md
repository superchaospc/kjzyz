# MLY IPv6 XHTTP to ZLIDC WireGuard Design

## Goal

Provide a VLESS subscription whose public entry is MLY's IPv6 address on TCP
port 443, while all accepted traffic exits through ZLIDC.

## Architecture

The client connects to MLY over VLESS, XHTTP, and REALITY:

`client -> [2605:52c0:2:1b96:be24:11ff:fefd:bf05]:443 -> MLY Xray`

MLY sends Xray's direct outbound through a dedicated WireGuard interface:

`MLY wg-mly (10.78.0.2/30) -> ZLIDC wg-mly (10.78.0.1/30) -> ZLIDC eth0`

ZLIDC applies IPv4 forwarding and source NAT only for `10.78.0.0/30`. The new
interface, keys, UDP port, service units, and firewall rules remain separate
from the existing `wg-hz` tunnel and existing Xray services.

## Entry Protocol

- Listen only on MLY IPv6 TCP port 443.
- Use VLESS with XHTTP transport and REALITY security.
- Use a random UUID, XHTTP path, REALITY key pair, and short ID.
- Use `www.microsoft.com:443` as the REALITY destination and
  `www.microsoft.com` as SNI.
- Use XHTTP mode `auto` for broad client compatibility.
- Block BitTorrent traffic.

## Relay Protocol

- Use WireGuard because MLY can initiate IPv4 traffic to ZLIDC even though its
  usable client-facing address is IPv6-only.
- Use ZLIDC IPv4 `128.241.26.230` as the WireGuard endpoint.
- Use a new UDP listener distinct from the existing `wg-hz` listener on 51820.
- Use policy routing on MLY so Xray traffic sourced from `10.78.0.2` uses
  `wg-mly`; the server's SSH and ordinary host traffic keep their existing
  routes.
- Set persistent keepalive on MLY.

## Isolation

- Do not modify or stop ZLIDC's `wg-hz` interface.
- Do not modify Hazel, Lanshan, or the primary ZLIDC Xray service.
- Remove the obsolete MLY-specific TCP/REALITY exit service on ZLIDC only after
  the new WireGuard path is verified.
- Preserve SSH on both hosts.

## Artifacts

- Store the raw VLESS URI in a local `.vless.txt` file.
- Store a base64 subscription in a local subscription file.
- Generate a local PNG QR code and a terminal QR code.
- Store matching copies under `/root` on MLY with mode 600.

## Verification

- Validate both WireGuard configurations before enabling them.
- Validate the MLY Xray JSON with `xray run -test`.
- Confirm WireGuard handshake and bidirectional counters.
- Confirm traffic sourced through `wg-mly` exits as ZLIDC IPv4.
- Start a temporary local Xray client against MLY IPv6 and confirm the observed
  public IPv4 is `128.241.26.230`.
- Confirm both services survive restart and existing ZLIDC services remain
  active.
