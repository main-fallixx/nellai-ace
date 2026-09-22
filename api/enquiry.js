// Vercel serverless function: POST /api/enquiry  (service-role key stays on the server)
import { validate, clean, LIMITS } from '../src/lib/validate.js';

const hits = new Map(); // best-effort per-instance rate limit; use Upstash/Vercel KV for strict limits
const WINDOW = 10 * 60 * 1000, MAX = 5;
const limited = (ip) => {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  arr.push(now); hits.set(ip, arr);
  return arr.length > MAX;
};
const safeParse = (s) => { try { return JSON.parse(s); } catch { return null; } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return res.status(503).json({ ok: false, error: 'Enquiry storage is not configured.' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ ok: false, error: 'Too many requests. Please call or use WhatsApp.' });

  const b = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  if (!b || typeof b !== 'object') return res.status(400).json({ ok: false, error: 'Invalid request.' });
  if (b.website) return res.status(200).json({ ok: true });                       // honeypot: pretend success
  if (!(Number(b.elapsed) >= 2500)) return res.status(400).json({ ok: false, error: 'Please try again.' }); // too fast = bot

  const errors = validate(b);
  if (Object.keys(errors).length) return res.status(422).json({ ok: false, errors });

  const est = b.estimate == null || !Number.isFinite(Number(b.estimate)) ? null : Math.round(Number(b.estimate));
  const row = {
    name: clean(b.name, LIMITS.name), phone: String(b.phone).replace(/\D/g, '').slice(-10),
    mode: clean(b.mode, LIMITS.mode), pickup: clean(b.pickup, LIMITS.pickup), drop_off: clean(b.drop, LIMITS.drop),
    goods_type: clean(b.goods, LIMITS.goods), approx_load: clean(b.weight, LIMITS.weight),
    trip_date: b.date, time_slot: clean(b.slot, LIMITS.slot),
    loading_helper: !!b.helper, return_trip: !!b.roundTrip, notes: clean(b.notes, LIMITS.notes),
    estimate_inr: est, source: 'web',
  };
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, Prefer: 'return=minimal' },
      body: JSON.stringify(row),
    });
    if (!r.ok) return res.status(502).json({ ok: false, error: 'Could not save your request. Please call or use WhatsApp.' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'Could not reach the server. Please call or use WhatsApp.' });
  }
}
