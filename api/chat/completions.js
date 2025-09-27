import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const body = req.body;
    const key = process.env.NVIDIA_API_KEY;
    if (!key) return res.status(500).json({ error: 'NVIDIA_API_KEY not configured' });

    const r = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify(body),
    });

    const text = await r.text();
    try { return res.status(r.status).json(JSON.parse(text)); } catch (e) { return res.status(r.status).send(text); }
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: 'proxy failed', details: String(err) });
  }
}
