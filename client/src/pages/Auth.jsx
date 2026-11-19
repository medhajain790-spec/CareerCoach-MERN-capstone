import { useState } from 'react'; import { useNavigate } from 'react-router-dom'; import { useAuth } from '../context/AuthContext.jsx';
export default function Auth({ mode }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' }); const [err, setErr] = useState('');
  const { authenticate } = useAuth(); const nav = useNavigate();
  const set = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => { e.preventDefault(); try { await authenticate(mode, form); nav('/profile'); } catch (x) { setErr(x.message); } };
  return (<form onSubmit={submit}><h2>{mode === 'login' ? 'Login' : 'Register'}</h2>{err && <p style={{ color: 'red' }}>{err}</p>}
    {mode === 'register' && <><input name="name" placeholder="Name" value={form.name} onChange={set} required />
    <select name="role" value={form.role} onChange={set}><option value="user">User</option><option value="admin">Admin</option></select></>}
    <input name="email" type="email" placeholder="Email" value={form.email} onChange={set} required />
    <input name="password" type="password" placeholder="Password" value={form.password} onChange={set} required />
    <button>{mode === 'login' ? 'Login' : 'Register'}</button></form>);
}
