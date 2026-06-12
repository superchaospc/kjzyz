# MLY Backup XHTTP Lines Design

## Goal

Create ten VLESS-XHTTP-REALITY lines on the server reached through `ssh mly`.
Name the lines `backup1` through `backup10`. All lines use the server's own
public Internet egress.

## Architecture

- One proven public entry point on TCP port 443.
- One Xray VLESS-XHTTP-REALITY inbound shared by all ten lines.
- Ten independent clients, each with a unique UUID, email/name, and XHTTP path.
- Xray user routing sends every backup client to a direct `freedom` outbound.
- The REALITY key pair, server name, destination, and short ID are shared by the
  inbound because all clients use the same public entry point.
- Per-user traffic statistics remain enabled through the localhost-only Xray
  StatsService API.

This avoids additional public ports and secondary addresses while keeping every
line independently identifiable and revocable.

## Deployment

1. Inspect `mly` for its current network addresses, TCP 443 availability, Xray
   binary version, firewall, and any remaining proxy configuration.
2. Back up every remote file that will be changed.
3. Install or refresh the maintained `xray-xhttp-relay` deployment script.
4. Build the ten direct lines using the script's supported installation and
   node-management operations.
5. If the script initially creates separate ports, consolidate the generated
   clients into a single port-443 inbound with independent UUID and path values,
   preserving script-compatible metadata and exports.
6. Validate the final Xray JSON before restarting or enabling the service.

## Deliverables

Create a local output directory containing one folder for each line:

```text
backup1/
  backup1.png
  backup1.html
  backup1.pdf
  backup1.xlsx
...
backup10/
  backup10.png
  backup10.html
  backup10.pdf
  backup10.xlsx
```

Each artifact contains only that line's VLESS URL and QR code. The HTML is
self-contained, the PDF is printable, the PNG is directly scannable, and the
Excel workbook includes the connection fields plus an embedded QR code.

## Safety And Recovery

- Do not alter SSH, the host default route, or unrelated services.
- Do not expose the Xray statistics API publicly.
- Keep a timestamped remote backup of changed configuration and service files.
- Validate configuration before service activation.
- Preserve the previous teardown backup.
- If validation fails, restore the new deployment backup and leave Xray
  disabled rather than activating a partial configuration.

## Verification

- Xray configuration test succeeds.
- Xray is active and enabled after deployment.
- Only the intended public XHTTP-REALITY entry listens on TCP 443.
- The statistics API listens only on `127.0.0.1:10085`.
- Exactly ten named clients exist: `backup1` through `backup10`.
- UUIDs and XHTTP paths are unique.
- A local Xray client test confirms each line reaches the Internet through
  `mly`'s public IPv4 egress.
- All 40 requested files exist, are non-empty, and open successfully.
- QR decoding reproduces the exact VLESS URL stored in the corresponding file.
- Each workbook is rendered once and visually checked for clipping or missing
  content.
