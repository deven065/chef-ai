export default function handler(req, res) {
  res.status(200).json({ ok: true, message: 'Chef AI backend is running on Vercel' });
}
