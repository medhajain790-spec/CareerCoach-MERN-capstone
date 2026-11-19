import { createContext, useContext, useState } from 'react'; import { api } from '../api.js';
const Ctx = createContext(); export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const authenticate = async (mode, form) => {
    const d = await api('/auth/' + mode, { method: 'POST', body: form });
    localStorage.setItem('access', d.accessToken); localStorage.setItem('refresh', d.refreshToken); localStorage.setItem('user', JSON.stringify(d.user)); setUser(d.user);
  };
  const logout = async () => { try { await api('/auth/logout', { method: 'POST' }); } catch {} localStorage.clear(); setUser(null); };
  return <Ctx.Provider value={{ user, authenticate, logout }}>{children}</Ctx.Provider>;
}
