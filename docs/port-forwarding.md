---
sidebar_position: 2
title: Port Forwarding
---

# Port Forwarding for Dune Awakening

This guide covers the ports required to run a Dune Awakening private server and make it accessible to players over the internet.

For the official Funcom self-hosted server documentation, see the [Dune Awakening Self Hosted Servers](https://duneawakening.com/self-hosted-servers/) page.

## Official Requirements (Funcom / Hyper-V)

Funcom's official setup requires a Windows machine with Hyper-V enabled (Windows Pro required), with virtualization enabled in BIOS.

The official required ports per Funcom are:

| Port | Protocol | Purpose |
|------|----------|---------|
| 7777-7810 | UDP | Game servers (UE5 port pool) |
| 31982 | TCP | RabbitMQ (RMQ) |

:::note
The Port and IGWPort options in the battlegroup configuration allow you to set different starting ports for the game servers. Changing these will require you to adjust your port forwarding settings accordingly.
:::

:::warning
To reduce the risk of virtual machine corruption or other attacks, only expose the ports that are strictly required for the servers to operate.
:::

## Non-Default Configurations

If you are running the server through third-party management software such as CubeCoders AMP, or on a non-Windows host such as Linux with Proxmox, your actual ports may differ. AMP for example bundles its own RabbitMQ instance which binds to port 5673 (TLS) instead of 31982. Always verify which ports your specific setup is actually listening on before configuring port forwarding.

## Local Network Players

If players on your local network cannot connect despite correct port forwarding, your router or firewall may not support NAT hairpinning (also called NAT loopback or NAT reflection).

Most consumer routers handle this automatically. Enterprise firewalls require it to be explicitly enabled. See the platform-specific guides below.

## Verifying Your Setup

Your server should appear in the Dune Awakening experimental server list once correctly registered with Funcom's matchmaking. If it appears but players cannot connect, the issue is almost always one of the ports not being forwarded correctly, or NAT reflection not being enabled for local players.

---

## Common Issues

### Server appears in list but players get stuck connecting

**Cause:** One or more ports are not forwarded correctly or RabbitMQ is unreachable from outside your network.

**Resolution:**
- Verify UDP 7777-7810 and TCP 31982 are forwarded to your server IP
- If using AMP, verify port 5673 is forwarded instead of or in addition to 31982
- Confirm RabbitMQ is showing as Listening in your server management software

---

### Local network players get stuck connecting but external players connect fine

**Cause:** Your router or firewall does not support NAT hairpinning (NAT reflection/loopback).

**Resolution:**
- Consumer routers: look for a **NAT Loopback** or **Hairpin NAT** setting and enable it
- OPNsense: enable **Reflection for destination NAT** and **Automatic outbound NAT for reflection** under Firewall → Settings → Advanced
- pfSense: enable **Pure NAT** mode under System → Advanced → Firewall & NAT
- Alternative: configure split-horizon DNS so internal clients resolve your server hostname to its internal IP directly

---

### Server does not appear in the experimental server list

**Cause:** The server is not successfully registering with Funcom's matchmaking.

**Resolution:**
- Check server logs for FLS or gateway connection errors
- Verify your ServiceAuthToken is valid and not expired
- Ensure your server's external IP is correctly configured
- Confirm outbound internet access is not blocked on the server VM

---

## Platform-Specific Setup Guides

### Funcom Official — Windows + Hyper-V

This is the officially supported setup. After enabling hardware virtualization in BIOS and turning Hyper-V on, download the Dune: Awakening Self-Hosted Server product on Steam. Run `battlegroup.bat` as administrator and follow the initial setup process.

Forward the following ports to the IP of your Hyper-V VM:
- UDP 7777-7810
- TCP 31982

---

### Generic Home Router

Most home routers (Asus, Netgear, TP-Link, etc.) have a Port Forwarding section under Advanced Settings or NAT.

1. Log into your router admin panel (usually 192.168.1.1 or 192.168.0.1)
2. Find **Port Forwarding** or **Virtual Server**
3. Create a UDP rule for ports 7777-7810 pointing to your server's local IP
4. Create a TCP rule for port 31982 pointing to your server's local IP
5. Save and apply

If local players cannot connect, look for a **NAT Loopback** or **Hairpin NAT** setting and enable it.

---

### CubeCoders AMP

AMP is a popular third-party game server management panel that supports Dune Awakening on Linux. It differs from the official Funcom setup in that it runs on Linux rather than Hyper-V and bundles its own RabbitMQ instance on a different port.

Ports to forward when using AMP:

| Port | Protocol | Purpose |
|------|----------|---------|
| 7777-7810 | UDP | UE5 game server port pool |
| 5673 | TCP | RabbitMQ Game (AMQPS/TLS) |

In AMP verify:
- **Instance Settings → Network and Ports** shows UE5 game port pool starting at 7777 and RabbitMQ Game listening on 5673
- **Use Host-Mode Networking** is enabled

---

### OPNsense

**Port Forwarding (Firewall → NAT → Destination NAT):**

Create rules pointing to your server's internal IP:
- UDP 7777-7810 → redirect target port 7777 *(range is auto-mapped 1:1)*
- TCP 31982 (standard) or 5673 (AMP)

Consider creating a **Host Alias** (Firewall → Aliases) for your server IP so you can update it in one place if it changes.

**NAT Reflection — required for local players (Firewall → Settings → Advanced):**
- Enable: Reflection for destination NAT
- Enable: Automatic outbound NAT for reflection

---

### pfSense

Create NAT rules under **Firewall → NAT → Port Forward** for the same ports as above.

For local network access enable **Pure NAT** mode under **System → Advanced → Firewall & NAT → NAT Reflection mode**.