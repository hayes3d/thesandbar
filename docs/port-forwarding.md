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
| 7777-7810 | UDP | UE5 game server port pool |
| 5673 | TCP | RabbitMQ Game (AMQPS/TLS) |
| 15673 | TCP | RabbitMQ HTTP Management |
| 31982 | TCP | RabbitMQ External |

## General Notes

- All four ports must be forwarded to your game server's internal IP address.
- The UDP range 7777-7810 handles all game partitions. Each partition uses one port sequentially starting from 7777.
- Ports 5673 and 15673 are required for the RabbitMQ connection handshake when a player clicks Join. Without these, players will see the server in the list but get stuck on the connecting screen.
- Port 31982 is the legacy RabbitMQ port referenced in Funcom documentation. Forward it as well to be safe.

## Local Network Players

If players on your local network cannot connect despite correct port forwarding, your router or firewall may not support NAT hairpinning (also called NAT loopback or NAT reflection).

This is where local traffic to your public IP gets reflected back to the internal server. Most consumer routers handle this automatically. Enterprise firewalls require it to be explicitly enabled.

Enable NAT reflection/loopback on your firewall if local players cannot connect.

## Verifying Your Setup

Your server should appear in the Dune Awakening experimental server list if correctly registered with Funcom. If it appears but players cannot connect, the issue is almost always one of the TCP ports not being forwarded correctly.

---

## Setup Guides by Platform

### Generic Home Router

Most home routers (Asus, Netgear, TP-Link, etc.) have a Port Forwarding section under Advanced Settings or NAT.

1. Log into your router admin panel (usually 192.168.1.1 or 192.168.0.1)
2. Find **Port Forwarding** or **Virtual Server**
3. Create rules for each port pointing to your server's local IP
4. For the UDP range, enter 7777 as start and 7810 as end
5. Save and apply

If local players cannot connect, look for a **NAT Loopback** or **Hairpin NAT** setting and enable it.

---

### CubeCoders AMP

When running Dune Awakening through AMP, the game server binds to `0.0.0.0` and uses host networking by default. The ports listed above apply directly.

Key things to verify in AMP:

- Under **Instance Settings → Network and Ports**, confirm the UE5 game port pool starts at 7777
- RabbitMQ Game (AMQPS) should show as **Listening** on port 5673
- **Use Host-Mode Networking** should be enabled

Forward all four ports to the IP of the VM running AMP.

:::tip
In AMP the RabbitMQ ports are 5673 and 15673, not the 5672/15672 defaults. Make sure your firewall rules use the correct ports.
:::

---

### OPNsense

OPNsense requires explicit configuration for both port forwarding and local network access.

**Port Forwarding (Firewall → NAT → Destination NAT):**

Create rules for each port group:
- UDP 7777-7810 → your server IP, redirect target port 7777 *(range is auto-mapped 1:1)*
- TCP 5673 → your server IP
- TCP 15673 → your server IP  
- TCP 31982 → your server IP

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