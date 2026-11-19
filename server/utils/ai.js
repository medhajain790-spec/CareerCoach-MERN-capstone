const wait = ms => new Promise(r => setTimeout(r, ms));

async function callModel(model, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    signal: AbortSignal.timeout(30000)
  });
  const d = await r.json();
  return { ok: r.ok, status: r.status, d };
}

module.exports = async prompt => {
  const models = [process.env.AI_MODEL || 'gemini-3.8-flash', 'gemini-flash-latest', 'gemini-flash-lite-latest'];
  let lastErr = 'AI service error';
  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`AI request -> ${model} (try ${attempt})`);
        const { ok, status, d } = await callModel(model, prompt);
        if (ok) {
          const text = d.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('\n');
          if (text) return text;
          lastErr = 'AI returned an empty response';
          break;
        }
        lastErr = d.error?.message || 'AI service error';
        console.log('AI status ->', status, lastErr);
        if (![429, 500, 503].includes(status)) break; // retry only when busy
        await wait(1500);
      } catch (e) {
        lastErr = 'AI service did not respond (timeout or network issue)';
        console.log('AI fetch failed:', e.message);
      }
    }
  }
  throw new Error(lastErr);
};