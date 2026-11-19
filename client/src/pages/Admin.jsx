import { useEffect, useState } from 'react'; import { api } from '../api.js';
export default function Admin() {
  const [rows, setRows] = useState([]);
  useEffect(() => { api('/admin/usage').then(setRows).catch(() => {}); }, []);
  return (<div><h2>Usage Report</h2><table border="1" cellPadding="6"><thead><tr><th>Name</th><th>Email</th><th>Total</th><th>Resumes</th><th>Interviews</th></tr></thead>
    <tbody>{rows.map(r => <tr key={r.email}><td>{r.name}</td><td>{r.email}</td><td>{r.total}</td><td>{r.resumes}</td><td>{r.interviews}</td></tr>)}</tbody></table></div>);
}
