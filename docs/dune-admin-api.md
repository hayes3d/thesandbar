---
sidebar_position: 3
title: dune-admin API Reference
---

# dune-admin API Reference

[dune-admin](https://github.com/Icehunter/dune-admin) is a community-built administration panel for Dune Awakening private servers. It exposes a REST API over the game's PostgreSQL and RabbitMQ stack.

All endpoints are prefixed with `/api/v1`. When authentication is enabled, all endpoints except `/api/v1/auth/*` require a session cookie obtained via `/api/v1/auth/login`.

---

## Players

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/players` | Search and list all players |
| GET | `/api/v1/players/summary` | Player summary stats |
| GET | `/api/v1/players/online` | Currently online players |
| GET | `/api/v1/players/{id}/inventory` | Player inventory |
| GET | `/api/v1/players/{id}/position` | Player position on map |
| GET | `/api/v1/players/{id}/specs` | Player specializations |
| GET | `/api/v1/players/{id}/char-xp` | Character XP breakdown |
| GET | `/api/v1/players/{id}/journey` | Journey progress |
| GET | `/api/v1/players/{id}/vehicles` | Player vehicles |
| GET | `/api/v1/players/{id}/keystones` | Player keystones |
| GET | `/api/v1/players/{id}/tags` | Player tags |
| GET | `/api/v1/players/factions` | Faction standings |
| GET | `/api/v1/players/currency` | Currency balance |
| GET | `/api/v1/players/{id}/session-history` | Session and playtime history |
| POST | `/api/v1/players/teleport` | Teleport player to location |
| POST | `/api/v1/players/teleport-coords` | Teleport player to coordinates |
| POST | `/api/v1/players/teleport-to-player` | Teleport player to another player |
| POST | `/api/v1/players/give-item` | Give item to player |
| POST | `/api/v1/players/give-items` | Give multiple items to player |
| POST | `/api/v1/players/give-item-live` | Give item while player is online |
| POST | `/api/v1/players/award-xp` | Award XP to player |
| POST | `/api/v1/players/award-char-xp` | Award character-specific XP |
| POST | `/api/v1/players/award-intel` | Award intel points |
| POST | `/api/v1/players/give-currency` | Give currency to player |
| POST | `/api/v1/players/give-scrip` | Give scrip to player |
| POST | `/api/v1/players/give-faction-rep` | Give faction reputation |
| POST | `/api/v1/players/set-faction-tier` | Set player faction tier |
| POST | `/api/v1/players/grant-max-spec` | Grant max specialization |
| POST | `/api/v1/players/grant-job-skills` | Grant job skill tree |
| POST | `/api/v1/players/reset-job-skills` | Reset job skills |
| POST | `/api/v1/players/set-skill-module` | Set specific skill module |
| POST | `/api/v1/players/set-skill-points` | Set unspent skill points |
| POST | `/api/v1/players/grant-all-keystones` | Grant all keystones |
| POST | `/api/v1/players/reset-all-keystones` | Reset all keystones |
| POST | `/api/v1/players/journey/complete` | Complete journey nodes |
| POST | `/api/v1/players/journey/reset` | Reset journey progress |
| POST | `/api/v1/players/journey/wipe` | Wipe all journey data |
| POST | `/api/v1/players/progression/apply-preset` | Apply progression preset |
| POST | `/api/v1/players/progression-unlock` | Unlock faction progression |
| POST | `/api/v1/players/progression-reverse` | Reverse progression unlock |
| POST | `/api/v1/players/set-starter-class` | Set starter class |
| POST | `/api/v1/players/contracts/complete` | Complete contracts |
| POST | `/api/v1/players/contracts/reverse` | Reverse completed contracts |
| POST | `/api/v1/players/fill-water` | Fill player water |
| POST | `/api/v1/players/repair-gear` | Repair all gear |
| POST | `/api/v1/players/repair-item` | Repair specific item |
| POST | `/api/v1/players/clean-inventory` | Clean player inventory |
| POST | `/api/v1/players/kick` | Kick player from server |
| POST | `/api/v1/players/rename` | Rename player character |
| POST | `/api/v1/players/delete` | Delete player character |
| POST | `/api/v1/players/delete-account` | Delete player account |
| POST | `/api/v1/players/reset-progression` | Reset full progression |
| POST | `/api/v1/players/reset-spec` | Reset specialization |
| POST | `/api/v1/players/cheat-script` | Run cheat script on player |
| POST | `/api/v1/players/update-tags` | Update player tags |

---

## Progression & Presets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/progression/presets` | List all available presets |
| GET | `/api/v1/players/specs` | All player specializations |
| GET | `/api/v1/players/faction-trends` | Faction trend data |

### Available Presets

| Preset ID | Name | Description |
|-----------|------|-------------|
| `skip_npe` | Skip NPE | Marks tutorial as complete |
| `a_new_beginning` | Complete: A New Beginning | Main story intro, unlocks early game |
| `find_the_fremen` | Complete: Find the Fremen | All 7 trials, completes Act 1 |
| `act1_complete` | Complete: All of Act 1 | A New Beginning + Find the Fremen combined |
| `vermillius_intro` | Skip: Vermillius Gap Tutorials | Skips research/crafting/exploration tutorials |
| `deep_desert_intro` | Skip: Deep Desert Intro | Completes Deep Desert side quest chain |
| `taxation_intro` | Skip: Taxation / Exchange Tutorial | Completes exchange/travel tutorial chain |
| `overland_intro` | Skip: Overland Map Intro | Completes Overland map side quest chain |
| `unlock_all_lore` | Unlock All Lore | Reveals all Dunipedia entries |

---

## Server & Battlegroup

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/servers/health` | Server health status |
| GET | `/api/v1/battlegroup/status` | Battlegroup status |
| GET | `/api/v1/battlegroup/pods` | List running pods |
| POST | `/api/v1/battlegroup/exec` | Execute battlegroup command |
| POST | `/api/v1/battlegroup/restore` | Restore battlegroup from backup |
| POST | `/api/v1/broadcast` | Broadcast message to all players |
| POST | `/api/v1/broadcast/shutdown` | Broadcast shutdown warning |
| POST | `/api/v1/chat/whisper` | Whisper to specific player |
| POST | `/api/v1/reconnect` | Reconnect to server |

---

## Backups & Database

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/db-backups` | List database backups |
| GET | `/api/v1/db-backups/download` | Download a backup |
| POST | `/api/v1/db-backups/restore` | Restore from backup |
| GET | `/api/v1/scheduled-backups` | Scheduled backup rules |
| GET | `/api/v1/database/tables` | List database tables |
| POST | `/api/v1/database/sql` | Run raw SQL query |

---

## Server Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/server-settings` | Read all server settings |
| PUT | `/api/v1/server-settings` | Update server settings |
| GET | `/api/v1/scheduled-restarts` | Scheduled restarts |
| GET | `/api/v1/director-config` | Director config |

---

## Battlepass & Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/battlepass/tiers` | Battlepass tiers |
| POST | `/api/v1/battlepass/grant` | Grant battlepass tier |
| GET | `/api/v1/battlepass/pending` | Pending battlepass grants |
| GET | `/api/v1/events/config` | Live events config |
| POST | `/api/v1/events/{id}/enable` | Enable event |
| POST | `/api/v1/events/{id}/reset` | Reset event |

---

## Welcome Package

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/welcome-package/config` | Welcome package config |
| POST | `/api/v1/welcome-package/run` | Run welcome package for player |
| POST | `/api/v1/welcome-package/override` | Override welcome package |
| POST | `/api/v1/welcome-package/revoke` | Revoke welcome package |

---

## Vehicles & Storage

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/vehicles/spawn` | Spawn vehicle for player |
| GET | `/api/v1/storage/{id}/items` | Storage contents |
| POST | `/api/v1/storage/{id}/give-item` | Give item to storage |
| POST | `/api/v1/storage/{id}/give-items` | Give multiple items to storage |

---

## Map & Locations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/map/markers` | Map markers |
| GET | `/api/v1/locations` | Saved locations |
| POST | `/api/v1/locations` | Create saved location |
| DELETE | `/api/v1/locations` | Delete saved location |

---

## Market & Economy

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/market/listings` | Market listings |
| GET | `/api/v1/market/sales` | Market sales history |
| GET | `/api/v1/market/stats` | Market stats |
| GET | `/api/v1/market/catalog` | Market catalog |

---

## Guilds & Discord

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/guilds` | List guilds |
| GET | `/api/v1/guilds/{id}` | Guild details |
| PUT | `/api/v1/guilds/{id}/members/{pid}/role` | Set guild member role |
| GET | `/api/v1/discord/guilds` | Discord guild config |
| GET | `/api/v1/discord/members/search` | Search Discord members |

---

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login and get session cookie |
| POST | `/api/v1/auth/logout` | Logout |
| GET | `/api/v1/auth/status` | Auth status |
| GET | `/api/v1/auth/permissions` | Permission matrix |
| GET | `/api/v1/auth/users` | List local users |

---

## Notes

- Endpoints marked with `{id}` require the player's `account_id` from the database, not their character ID.
- The `/api/v1/players?search=NAME` query parameter can be used to look up a player's account_id by character name.
- When auth is disabled, all endpoints are accessible without a session cookie.
- dune-admin version verified: v0.41.7