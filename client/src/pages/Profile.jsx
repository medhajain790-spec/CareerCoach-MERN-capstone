import { useEffect, useState } from 'react'; import { api } from '../api.js';
export default function Profile() {
  const [f, setF] = useState({ education: '', skills: '', experience: '' }); const [msg, setMsg] = useState('');
  useEffect(() => { api('/profile').then(p => p && setF({ education: p.education, skills: p.skills.join(', '), experience: p.experience })).catch(() => {}); }, []);
  const set = e => setF({ ...f, [e.target.name]: e.target.value });
  const submit = async e => { e.preventDefault(); try { await api('/profile', { method: 'PUT', body: f }); setMsg('Saved!'); } catch (x) { setMsg(x.message); } };
  return (<form onSubmit={submit}><h2>Your Profile</h2>
    <input name="education" placeholder="Education" value={f.education} onChange={set} />
    <input name="skills" placeholder="Skills (comma separated)" value={f.skills} onChange={set} />
    <textarea name="experience" placeholder="Experience" value={f.experience} onChange={set} />
    <button>Save</button><p>{msg}</p></form>);
}
