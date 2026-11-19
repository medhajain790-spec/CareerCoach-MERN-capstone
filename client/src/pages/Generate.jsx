import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { api } from '../api.js';

export default function Generate() {
  const [role, setRole] = useState('');
  const [out, setOut] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const run = async type => {
    setBusy(true); setOut(''); setErr('');
    try {
      const d = await api('/generate/' + type, { method: 'POST', body: { role } });
      setOut(d.content);
    } catch (x) { setErr(x.message); }
    setBusy(false);
  };

  return (
    <div>
      <div className="card">
        <h2>AI Generator</h2>
        <div className="row">
          <input placeholder="Target role (e.g. Data Analyst)" value={role} onChange={e => setRole(e.target.value)} />
          <button disabled={busy} onClick={() => run('resume')}>Generate Resume</button>
          <button disabled={busy} onClick={() => run('interview')}>Interview Questions</button>
        </div>
      </div>
      {busy && <div className="card">Generating, please wait...</div>}
      {err && <div className="err">{err}</div>}
      {out && <div className="card md"><ReactMarkdown>{out}</ReactMarkdown></div>}
    </div>
  );
}