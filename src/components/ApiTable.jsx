import React, { useState } from 'react';

const methodColors = {
  GET: { bg: '#e6f1fb', color: '#185fa5', border: '#378add' },
  POST: { bg: '#eaf3de', color: '#3b6d11', border: '#639922' },
  PUT: { bg: '#faeeda', color: '#854f0b', border: '#ba7517' },
  DELETE: { bg: '#fcebeb', color: '#a32d2d', border: '#e24b4a' },
  PATCH: { bg: '#eeedfe', color: '#534ab7', border: '#7f77dd' },
};

function MethodBadge({ method }) {
  const style = methodColors[method] || methodColors.GET;
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '600',
      fontFamily: 'monospace',
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      minWidth: '52px',
      textAlign: 'center',
      letterSpacing: '0.04em',
    }}>
      {method}
    </span>
  );
}

function EndpointRow({ method, path, description }) {
  return (
    <tr style={{ borderBottom: '1px solid var(--ifm-table-border-color)' }}>
      <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
        <MethodBadge method={method} />
      </td>
      <td style={{ padding: '8px 12px' }}>
        <code style={{ fontSize: '13px' }}>{path}</code>
      </td>
      <td style={{ padding: '8px 12px', fontSize: '13px', color: 'var(--ifm-color-content-secondary)' }}>
        {description}
      </td>
    </tr>
  );
}

function Section({ title, endpoints, filter }) {
  const filtered = endpoints.filter(e =>
    filter === '' ||
    e.path.toLowerCase().includes(filter.toLowerCase()) ||
    e.description.toLowerCase().includes(filter.toLowerCase()) ||
    e.method.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) return null;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--ifm-table-border-color)', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: 'var(--ifm-table-head-background)' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', width: '80px', fontSize: '12px' }}>Method</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '12px' }}>Endpoint</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '12px' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e, i) => (
            <EndpointRow key={i} {...e} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sections = [
  {
    title: 'Players',
    endpoints: [
      { method: 'GET', path: '/api/v1/players', description: 'Search and list all players' },
      { method: 'GET', path: '/api/v1/players/summary', description: 'Player summary stats' },
      { method: 'GET', path: '/api/v1/players/online', description: 'Currently online players' },
      { method: 'GET', path: '/api/v1/players/{id}/inventory', description: 'Player inventory' },
      { method: 'GET', path: '/api/v1/players/{id}/position', description: 'Player position on map' },
      { method: 'GET', path: '/api/v1/players/{id}/specs', description: 'Player specializations' },
      { method: 'GET', path: '/api/v1/players/{id}/char-xp', description: 'Character XP breakdown' },
      { method: 'GET', path: '/api/v1/players/{id}/journey', description: 'Journey progress' },
      { method: 'GET', path: '/api/v1/players/{id}/vehicles', description: 'Player vehicles' },
      { method: 'GET', path: '/api/v1/players/{id}/keystones', description: 'Player keystones' },
      { method: 'GET', path: '/api/v1/players/{id}/tags', description: 'Player tags' },
      { method: 'GET', path: '/api/v1/players/factions', description: 'Faction standings' },
      { method: 'GET', path: '/api/v1/players/currency', description: 'Currency balance' },
      { method: 'GET', path: '/api/v1/players/{id}/session-history', description: 'Session and playtime history' },
      { method: 'POST', path: '/api/v1/players/teleport', description: 'Teleport player to location' },
      { method: 'POST', path: '/api/v1/players/teleport-coords', description: 'Teleport player to coordinates' },
      { method: 'POST', path: '/api/v1/players/teleport-to-player', description: 'Teleport player to another player' },
      { method: 'POST', path: '/api/v1/players/give-item', description: 'Give item to player' },
      { method: 'POST', path: '/api/v1/players/give-items', description: 'Give multiple items to player' },
      { method: 'POST', path: '/api/v1/players/give-item-live', description: 'Give item while player is online' },
      { method: 'POST', path: '/api/v1/players/award-xp', description: 'Award XP to player' },
      { method: 'POST', path: '/api/v1/players/award-char-xp', description: 'Award character-specific XP' },
      { method: 'POST', path: '/api/v1/players/award-intel', description: 'Award intel points' },
      { method: 'POST', path: '/api/v1/players/give-currency', description: 'Give currency to player' },
      { method: 'POST', path: '/api/v1/players/give-scrip', description: 'Give scrip to player' },
      { method: 'POST', path: '/api/v1/players/give-faction-rep', description: 'Give faction reputation' },
      { method: 'POST', path: '/api/v1/players/set-faction-tier', description: 'Set player faction tier' },
      { method: 'POST', path: '/api/v1/players/grant-max-spec', description: 'Grant max specialization' },
      { method: 'POST', path: '/api/v1/players/grant-job-skills', description: 'Grant job skill tree' },
      { method: 'POST', path: '/api/v1/players/reset-job-skills', description: 'Reset job skills' },
      { method: 'POST', path: '/api/v1/players/set-skill-module', description: 'Set specific skill module' },
      { method: 'POST', path: '/api/v1/players/set-skill-points', description: 'Set unspent skill points' },
      { method: 'POST', path: '/api/v1/players/grant-all-keystones', description: 'Grant all keystones' },
      { method: 'POST', path: '/api/v1/players/reset-all-keystones', description: 'Reset all keystones' },
      { method: 'POST', path: '/api/v1/players/journey/complete', description: 'Complete journey nodes' },
      { method: 'POST', path: '/api/v1/players/journey/reset', description: 'Reset journey progress' },
      { method: 'POST', path: '/api/v1/players/journey/wipe', description: 'Wipe all journey data' },
      { method: 'POST', path: '/api/v1/players/progression/apply-preset', description: 'Apply progression preset' },
      { method: 'POST', path: '/api/v1/players/progression-unlock', description: 'Unlock faction progression' },
      { method: 'POST', path: '/api/v1/players/progression-reverse', description: 'Reverse progression unlock' },
      { method: 'POST', path: '/api/v1/players/set-starter-class', description: 'Set starter class' },
      { method: 'POST', path: '/api/v1/players/contracts/complete', description: 'Complete contracts' },
      { method: 'POST', path: '/api/v1/players/contracts/reverse', description: 'Reverse completed contracts' },
      { method: 'POST', path: '/api/v1/players/fill-water', description: 'Fill player water' },
      { method: 'POST', path: '/api/v1/players/repair-gear', description: 'Repair all gear' },
      { method: 'POST', path: '/api/v1/players/repair-item', description: 'Repair specific item' },
      { method: 'POST', path: '/api/v1/players/clean-inventory', description: 'Clean player inventory' },
      { method: 'POST', path: '/api/v1/players/kick', description: 'Kick player from server' },
      { method: 'POST', path: '/api/v1/players/rename', description: 'Rename player character' },
      { method: 'POST', path: '/api/v1/players/delete', description: 'Delete player character' },
      { method: 'POST', path: '/api/v1/players/delete-account', description: 'Delete player account' },
      { method: 'POST', path: '/api/v1/players/reset-progression', description: 'Reset full progression' },
      { method: 'POST', path: '/api/v1/players/reset-spec', description: 'Reset specialization' },
      { method: 'POST', path: '/api/v1/players/cheat-script', description: 'Run cheat script on player' },
      { method: 'POST', path: '/api/v1/players/update-tags', description: 'Update player tags' },
    ]
  },
  {
    title: 'Progression & Presets',
    endpoints: [
      { method: 'GET', path: '/api/v1/progression/presets', description: 'List all available presets' },
      { method: 'GET', path: '/api/v1/players/specs', description: 'All player specializations' },
      { method: 'GET', path: '/api/v1/players/faction-trends', description: 'Faction trend data' },
    ]
  },
  {
    title: 'Server & Battlegroup',
    endpoints: [
      { method: 'GET', path: '/api/v1/servers/health', description: 'Server health status' },
      { method: 'GET', path: '/api/v1/battlegroup/status', description: 'Battlegroup status' },
      { method: 'GET', path: '/api/v1/battlegroup/pods', description: 'List running pods' },
      { method: 'POST', path: '/api/v1/battlegroup/exec', description: 'Execute battlegroup command' },
      { method: 'POST', path: '/api/v1/battlegroup/restore', description: 'Restore battlegroup from backup' },
      { method: 'POST', path: '/api/v1/broadcast', description: 'Broadcast message to all players' },
      { method: 'POST', path: '/api/v1/broadcast/shutdown', description: 'Broadcast shutdown warning' },
      { method: 'POST', path: '/api/v1/chat/whisper', description: 'Whisper to specific player' },
      { method: 'POST', path: '/api/v1/reconnect', description: 'Reconnect to server' },
    ]
  },
  {
    title: 'Backups & Database',
    endpoints: [
      { method: 'GET', path: '/api/v1/db-backups', description: 'List database backups' },
      { method: 'GET', path: '/api/v1/db-backups/download', description: 'Download a backup' },
      { method: 'POST', path: '/api/v1/db-backups/restore', description: 'Restore from backup' },
      { method: 'GET', path: '/api/v1/scheduled-backups', description: 'Scheduled backup rules' },
      { method: 'GET', path: '/api/v1/database/tables', description: 'List database tables' },
      { method: 'POST', path: '/api/v1/database/sql', description: 'Run raw SQL query' },
    ]
  },
  {
    title: 'Server Settings',
    endpoints: [
      { method: 'GET', path: '/api/v1/server-settings', description: 'Read all server settings' },
      { method: 'PUT', path: '/api/v1/server-settings', description: 'Update server settings' },
      { method: 'GET', path: '/api/v1/scheduled-restarts', description: 'Scheduled restarts' },
      { method: 'GET', path: '/api/v1/director-config', description: 'Director config' },
    ]
  },
  {
    title: 'Battlepass & Events',
    endpoints: [
      { method: 'GET', path: '/api/v1/battlepass/tiers', description: 'Battlepass tiers' },
      { method: 'POST', path: '/api/v1/battlepass/grant', description: 'Grant battlepass tier' },
      { method: 'GET', path: '/api/v1/battlepass/pending', description: 'Pending battlepass grants' },
      { method: 'GET', path: '/api/v1/events/config', description: 'Live events config' },
      { method: 'POST', path: '/api/v1/events/{id}/enable', description: 'Enable event' },
      { method: 'POST', path: '/api/v1/events/{id}/reset', description: 'Reset event' },
    ]
  },
  {
    title: 'Welcome Package',
    endpoints: [
      { method: 'GET', path: '/api/v1/welcome-package/config', description: 'Welcome package config' },
      { method: 'POST', path: '/api/v1/welcome-package/run', description: 'Run welcome package for player' },
      { method: 'POST', path: '/api/v1/welcome-package/override', description: 'Override welcome package' },
      { method: 'POST', path: '/api/v1/welcome-package/revoke', description: 'Revoke welcome package' },
    ]
  },
  {
    title: 'Vehicles & Storage',
    endpoints: [
      { method: 'POST', path: '/api/v1/vehicles/spawn', description: 'Spawn vehicle for player' },
      { method: 'GET', path: '/api/v1/storage/{id}/items', description: 'Storage contents' },
      { method: 'POST', path: '/api/v1/storage/{id}/give-item', description: 'Give item to storage' },
      { method: 'POST', path: '/api/v1/storage/{id}/give-items', description: 'Give multiple items to storage' },
    ]
  },
  {
    title: 'Map & Locations',
    endpoints: [
      { method: 'GET', path: '/api/v1/map/markers', description: 'Map markers' },
      { method: 'GET', path: '/api/v1/locations', description: 'Saved locations' },
      { method: 'POST', path: '/api/v1/locations', description: 'Create saved location' },
      { method: 'DELETE', path: '/api/v1/locations', description: 'Delete saved location' },
    ]
  },
  {
    title: 'Market & Economy',
    endpoints: [
      { method: 'GET', path: '/api/v1/market/listings', description: 'Market listings' },
      { method: 'GET', path: '/api/v1/market/sales', description: 'Market sales history' },
      { method: 'GET', path: '/api/v1/market/stats', description: 'Market stats' },
      { method: 'GET', path: '/api/v1/market/catalog', description: 'Market catalog' },
    ]
  },
  {
    title: 'Guilds & Discord',
    endpoints: [
      { method: 'GET', path: '/api/v1/guilds', description: 'List guilds' },
      { method: 'GET', path: '/api/v1/guilds/{id}', description: 'Guild details' },
      { method: 'PUT', path: '/api/v1/guilds/{id}/members/{pid}/role', description: 'Set guild member role' },
      { method: 'GET', path: '/api/v1/discord/guilds', description: 'Discord guild config' },
      { method: 'GET', path: '/api/v1/discord/members/search', description: 'Search Discord members' },
    ]
  },
  {
    title: 'Authentication',
    endpoints: [
      { method: 'POST', path: '/api/v1/auth/login', description: 'Login and get session cookie' },
      { method: 'POST', path: '/api/v1/auth/logout', description: 'Logout' },
      { method: 'GET', path: '/api/v1/auth/status', description: 'Auth status' },
      { method: 'GET', path: '/api/v1/auth/permissions', description: 'Permission matrix' },
      { method: 'GET', path: '/api/v1/auth/users', description: 'List local users' },
    ]
  },
];

export default function ApiTable() {
  const [filter, setFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');

  const filtered = filter || methodFilter !== 'ALL'
    ? sections.map(s => ({
        ...s,
        endpoints: s.endpoints.filter(e =>
          (methodFilter === 'ALL' || e.method === methodFilter) &&
          (filter === '' ||
            e.path.toLowerCase().includes(filter.toLowerCase()) ||
            e.description.toLowerCase().includes(filter.toLowerCase()))
        )
      })).filter(s => s.endpoints.length > 0)
    : sections;

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search endpoints..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--ifm-table-border-color)',
            fontSize: '14px',
            background: 'var(--ifm-background-surface-color)',
            color: 'var(--ifm-color-content)',
          }}
        />
        <div style={{ display: 'flex', gap: '6px' }}>
          {['ALL', 'GET', 'POST', 'PUT', 'DELETE'].map(m => (
            <button
              key={m}
              onClick={() => setMethodFilter(m)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: `1px solid ${m === 'ALL' ? 'var(--ifm-table-border-color)' : methodColors[m]?.border || '#ccc'}`,
                background: methodFilter === m
                  ? (m === 'ALL' ? 'var(--ifm-color-primary)' : methodColors[m]?.bg || '#eee')
                  : 'transparent',
                color: methodFilter === m
                  ? (m === 'ALL' ? '#fff' : methodColors[m]?.color || '#333')
                  : 'var(--ifm-color-content)',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {filtered.map((section, i) => (
        <Section key={i} title={section.title} endpoints={section.endpoints} filter="" />
      ))}

      {filtered.length === 0 && (
        <p style={{ color: 'var(--ifm-color-content-secondary)', fontStyle: 'italic' }}>
          No endpoints match your search.
        </p>
      )}
    </div>
  );
}