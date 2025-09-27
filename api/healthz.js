export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', time: new Date().toISOString() });
  }
  res.setHeader('Allow', 'GET');
  return res.status(405).json({ error: 'Method not allowed' });
}
