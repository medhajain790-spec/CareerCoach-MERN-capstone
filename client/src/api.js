const BASE = import.meta.env.VITE_API_URL || '/api';

export async function api(path, { method = 'GET', body } = {}, retry = true) {
  const token = localStorage.getItem('access');
  const res = await fetch(BASE + path, { method, headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) }, body: body && JSON.stringify(body) });
  if (res.status === 401 && retry && localStorage.getItem('refresh') && !path.startsWith('/auth')) {
    const r = await fetch(BASE + '/auth/refresh', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken: localStorage.getItem('refresh') }) });
    if (r.ok) { const d = await r.json(); localStorage.setItem('access', d.accessToken); localStorage.setItem('refresh', d.refreshToken); return api(path, { method, body }, false); }
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || 'Request failed');
  return data;
}