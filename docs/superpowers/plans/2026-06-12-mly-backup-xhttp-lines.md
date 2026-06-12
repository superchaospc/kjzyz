# MLY Backup XHTTP Lines Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy ten named VLESS-XHTTP-REALITY direct-egress lines on `mly` and create four standalone client artifacts for each line.

**Architecture:** A single Xray inbound listens on TCP 443 and contains ten uniquely identified VLESS clients. The clients share the inbound's XHTTP path and REALITY transport settings, then route through the server's direct public IPv4 egress. Local export tooling turns each generated VLESS URL into its own PNG, HTML, PDF, and XLSX package.

**Tech Stack:** Xray-core, VLESS, XHTTP, REALITY, systemd, Python export tooling, `@oai/artifact-tool`

---

### Task 1: Inspect And Back Up MLY

**Files:**
- Read: remote `/root/proxy-teardown-*`
- Create: remote `/root/xhttp-backup-lines-backup-<timestamp>/`

- [ ] Verify SSH, public IPv4/IPv6, TCP 443 availability, Xray version, firewall, systemd state, and existing proxy files.
- [ ] Save copies of every remote file that will be replaced plus `ss`, `ip rule`, `ip route`, and firewall snapshots.
- [ ] Confirm the host default route and SSH listener before changing services.

### Task 2: Install The Maintained XHTTP Relay

**Files:**
- Create: remote `/root/xray_deploy.sh`
- Create: remote `/usr/local/etc/xray/config.json`
- Create: remote `/etc/systemd/system/xray.service`

- [ ] Download the maintained `superchaospc/xray-xhttp-relay` script.
- [ ] Run its fresh direct-node installation flow to install dependencies, Xray, base REALITY material, firewall support, and service definitions.
- [ ] Confirm Xray meets the minimum XHTTP version and the generated base configuration passes `xray run -test`.

### Task 3: Consolidate Ten Clients On Port 443

**Files:**
- Modify: remote `/usr/local/etc/xray/config.json`
- Modify: remote `/root/xray_nodes_info.txt`
- Modify: remote `/root/xray_subscription.txt`

- [ ] Generate ten UUIDs and assign emails `backup1` through `backup10`.
- [ ] Build one port-443 VLESS inbound containing exactly those clients and one shared random XHTTP path.
- [ ] Preserve the generated REALITY private/public key, short ID, server name, destination, stats API, policy, and direct outbound.
- [ ] Generate ten XHTTP-capable VLESS URLs with fragments `backup1` through `backup10`.
- [ ] Validate the JSON before restarting Xray, then enable and start the service.

### Task 4: Verify Server And Every Line

**Files:**
- Create: local `outputs/mly-backup-xhttp-20260612/deployment-verification.json`

- [ ] Confirm Xray is active/enabled, TCP 443 is public, and StatsService is localhost-only on `127.0.0.1:10085`.
- [ ] Confirm exactly ten clients, unique UUIDs, correct names, shared path, and no unintended proxy listeners.
- [ ] Use an isolated local Xray client configuration for each URL and query an IPv4 address service through its local SOCKS endpoint.
- [ ] Record that all ten lines return `mly`'s expected public IPv4.

### Task 5: Generate Forty Per-Line Artifacts

**Files:**
- Create: local `outputs/mly-backup-xhttp-20260612/backup1/backup1.{png,html,pdf,xlsx}`
- Create: equivalent directories and files through `backup10`

- [ ] Feed each VLESS URL separately to the bundled exporter so every artifact contains only one line.
- [ ] Rebuild each XLSX with `@oai/artifact-tool` if needed to satisfy workbook formatting and embedded-QR requirements.
- [ ] Verify all 40 files are present and non-empty.
- [ ] Decode every PNG QR and compare it byte-for-byte with its source VLESS URL.
- [ ] Open or parse every HTML/PDF/XLSX, inspect workbook values, scan formula errors, and render each workbook once for visual review.

### Task 6: Final Acceptance

**Files:**
- Read: remote and local verification outputs

- [ ] Reconnect to `ssh mly` after all tests and confirm SSH plus the host default route remain healthy.
- [ ] Confirm normal public IPv4/IPv6 connectivity and no WireGuard interface or policy route was introduced.
- [ ] Report the remote backup location, server verification, output directory, and links to the requested artifacts.
