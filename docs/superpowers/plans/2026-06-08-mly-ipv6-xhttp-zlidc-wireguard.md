# MLY IPv6 XHTTP to ZLIDC WireGuard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy an IPv6-only VLESS XHTTP REALITY entry on MLY whose traffic exits through ZLIDC over a dedicated WireGuard tunnel.

**Architecture:** MLY listens on IPv6 TCP 443 with Xray and routes its freedom outbound through `wg-mly`. ZLIDC terminates `wg-mly`, forwards the tunnel subnet to `eth0`, and applies narrowly scoped source NAT without changing existing tunnels or Xray services.

**Tech Stack:** Ubuntu 24.04, Xray-core, VLESS, XHTTP, REALITY, WireGuard, systemd, nftables/iptables, qrencode

---

### Task 1: Reserve isolated network resources

**Files:**
- Create remotely: `/etc/wireguard/wg-mly.conf` on MLY and ZLIDC

- [ ] Confirm `10.78.0.0/30`, UDP 51821, TCP 443, and interface `wg-mly` are unused.
- [ ] Generate independent WireGuard private/public key pairs on each host.
- [ ] Record the existing ZLIDC firewall and WireGuard state for comparison.

### Task 2: Configure the ZLIDC WireGuard exit

**Files:**
- Create remotely: `/etc/wireguard/wg-mly.conf`
- Create remotely: `/etc/sysctl.d/99-wg-mly-forward.conf`

- [ ] Configure `10.78.0.1/30`, UDP 51821, and the MLY peer.
- [ ] Add source NAT and forwarding rules scoped to `10.78.0.0/30`.
- [ ] Enable `net.ipv4.ip_forward=1`.
- [ ] Validate and start `wg-quick@wg-mly`.
- [ ] Confirm `wg-hz` and existing Xray services remain active.

### Task 3: Configure the MLY WireGuard peer

**Files:**
- Create remotely: `/etc/wireguard/wg-mly.conf`

- [ ] Configure `10.78.0.2/30` and endpoint `128.241.26.230:51821`.
- [ ] Add source-based policy routing for traffic sourced from `10.78.0.2`.
- [ ] Validate and start `wg-quick@wg-mly`.
- [ ] Confirm handshake, tunnel ping, and ZLIDC public egress.

### Task 4: Deploy the MLY XHTTP entry

**Files:**
- Create remotely: `/usr/local/etc/xray/config.json`
- Create remotely: `/etc/systemd/system/xray.service`

- [ ] Install a current Xray-core release and verify XHTTP support.
- [ ] Generate the UUID, REALITY key pair, short ID, and XHTTP path.
- [ ] Configure an IPv6-only VLESS XHTTP REALITY inbound on TCP 443.
- [ ] Configure the freedom outbound with `sendThrough: 10.78.0.2`.
- [ ] Validate the JSON and enable the Xray service.

### Task 5: Verify the end-to-end route

**Files:**
- Create temporarily: local Xray client configuration

- [ ] Connect a temporary local Xray client to MLY IPv6.
- [ ] Request an IPv4 address through the local SOCKS listener.
- [ ] Confirm the response is ZLIDC IPv4 `128.241.26.230`.
- [ ] Confirm WireGuard counters increase and no unrelated service changed.

### Task 6: Retire the obsolete MLY-specific exit

**Files:**
- Remove remotely: `/etc/systemd/system/xray-vps2vps-exit-mly.service`
- Remove remotely: `/opt/xray-vps2vps-mly`

- [ ] Stop and disable only the obsolete MLY-specific Xray exit.
- [ ] Remove its TCP 9447 firewall rule after confirming no listener remains.
- [ ] Reload systemd and recheck all retained ZLIDC services.

### Task 7: Generate subscription artifacts

**Files:**
- Create locally: `mly-ipv6-xhttp-wg-zlidc.vless.txt`
- Create locally: `mly-ipv6-xhttp-wg-zlidc-subscription.txt`
- Create locally: `mly-ipv6-xhttp-wg-zlidc-qr.png`

- [ ] Build the IPv6 VLESS URI with XHTTP and REALITY parameters.
- [ ] Base64-encode the URI as a subscription payload.
- [ ] Generate PNG and terminal QR codes.
- [ ] Save protected copies on MLY and report the local artifact paths.
