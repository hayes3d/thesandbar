---
sidebar_position: 2
title: Port Forwarding for Dune Awakening
---

# Port Forwarding for Dune Awakening

This guide covers the ports required to run a Dune Awakening private server and make it accessible to players over the internet.

For the official Funcom self-hosted server documentation, see the [Dune Awakening Self Hosted Servers](https://duneawakening.com/self-hosted-servers/) page.

## Required Ports

| Port | Protocol | Purpose |
|------|----------|---------|
| 7777-7806 | UDP | UE5 game server port pool (game connections) |
| 31982 | TCP | RabbitMQ used by Funcom's server components |

## General Notes

- All four ports must be forwarded to your game server's internal IP address.
- The UDP range 7777-7806 handles all game partitions. Each partition uses one port sequentially starting from 7777.
 - Forward the ports above to your game server's internal IP address.
 - The UDP range 7777-7806 handles all game partitions. Each partition uses one port sequentially starting from 7777.
 - `31982` is commonly used for RabbitMQ in community/self-hosted setups; some panelized deployments (AMP) may instead use other RabbitMQ ports (e.g. 5673/15673). Forward whatever port your AMP/RabbitMQ instance is actually bound to.

## Local Network Players

If players on your local network cannot connect despite correct port forwarding, your router or firewall may not support NAT hairpinning (also called NAT loopback or NAT reflection).

This is where local traffic to your public IP gets reflected back to the internal server. Most consumer routers handle this automatically. Enterprise firewalls require it to be explicitly enabled.

Enable NAT reflection/loopback on your firewall if local players cannot connect.

## My Setup — AMP + OPNsense

I ran the server inside CubeCoders AMP and used OPNsense for routing, so my setup differed from a simple home router. The server appeared in the game's server list, but connecting stalled at "Connecting". The root cause was NAT hairpin (reflection) not being enabled on OPNsense.

What I did to fix it:
- Ensure AMP's instance networking was reachable from the host (bind to `0.0.0.0` or use host-mode networking).
- In OPNsense create Destination NAT (Port Forward) rules forwarding UDP `7777-7806` and TCP `31982` to your server's LAN IP.
- Enable NAT reflection/loopback so LAN clients connecting to your public IP are reflected back to the internal server. In OPNsense this is configured under **Firewall → Settings → Advanced** (enable reflection for destination NAT / automatic outbound NAT for reflection) or by enabling reflection on the port forward rules themselves.
- Alternatively, use split-horizon DNS so internal clients resolve the server hostname to the internal IP instead of the public IP.

After enabling NAT reflection (or using split-horizon DNS), local players could connect immediately and the "Connecting" stall disappeared.

## Verifying Your Setup

Your server should appear in the Dune Awakening experimental server list if correctly registered with Funcom. If it appears but players cannot connect, the issue is almost always one of the TCP ports not being forwarded correctly.

---

## Setup Guides by Platform

### Generic Home Router

Most home routers (Asus, Netgear, TP-Link, etc.) have a Port Forwarding section under Advanced Settings or NAT.

1. Log into your router admin panel (usually 192.168.1.1 or 192.168.0.1)
2. Find **Port Forwarding** or **Virtual Server**
3. Create rules for each port pointing to your server's local IP
4. For the UDP range, enter 7777 as start and 7806 as end
5. Save and apply

If local players cannot connect, look for a **NAT Loopback** or **Hairpin NAT** setting and enable it.

---

### CubeCoders AMP

When running Dune Awakening through AMP the ports above generally apply, but AMP surfaces the specific instance settings you should verify:

- **RabbitMQ Game (AMQPS)** — Port `5673`, TCP (`GenericModule.App.Ports.$RmqGamePort`)
- **UE5 game port pool** — Port `7777`, UDP (`GenericModule.App.Ports.$GamePort`)

Key things to verify in AMP:

- Under **Instance Settings → Network and Ports**, confirm the UE5 game port pool starts at `7777` (UDP) and that RabbitMQ Game is bound to `5673` (TCP) if you use AMP's bundled RabbitMQ.
- Ensure the instance is reachable from the host (bind to `0.0.0.0` or enable host-mode networking) so OPNsense or your router can forward traffic to it.

Forward the ports your AMP instance actually uses (UDP `7777-7806` for the UE5 pool and TCP `31982` or `5673` for RabbitMQ depending on your setup) to the VM or host running AMP.

---

### OPNsense

OPNsense requires explicit configuration for both port forwarding and local network access.

**Port Forwarding (Firewall → NAT → Destination NAT):**

Create rules for each port group:
- UDP 7777-7806 → your server IP, redirect target port 7777 *(range is auto-mapped 1:1)*
- TCP 5673 → your server IP
- TCP 15673 → your server IP  
- TCP 31982 → your server IP

Note on **Redirect target port**: the "Redirect target port" is the port on the internal host to forward traffic to. For port ranges, enter the first target port; the remaining target ports are calculated automatically. Use "any" to preserve the incoming destination port or port range.

Consider creating a **Host Alias** (Firewall → Aliases) for your server IP so you can update it in one place if it changes.

**NAT Reflection (required for local players):**

Go to **Firewall → Settings → Advanced** and enable:
- Reflection for destination NAT
- Automatic outbound NAT for reflection

Without this, players on your local network will see the server but get stuck on the connecting screen.

---

### pfSense

Similar to OPNsense. Create NAT rules under **Firewall → NAT → Port Forward**.

For local network access enable **Pure NAT** mode under **System → Advanced → Firewall & NAT → NAT Reflection mode**.