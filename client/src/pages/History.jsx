import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { api } from '../api.js';

export default function History() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api('/generate/history').then(setItems).catch(() => {});
  }, []);

  return (
    <div>
      <h2>History</h2>
      {!items.length && <div className="card">Nothing generated yet.</div>}
      {items.map(i => (
        <div key={i._id} className="card">
          <span className="tag">{i.type}</span>
          <b> {i.role}</b>
          <small>{new Date(i.createdAt).toLocaleString()}</small>
          <hr />
          <div className="md"><ReactMarkdown>{i.content}</ReactMarkdown></div>
        </div>
      ))}
    </div>
  );
}