// Pure module: used by the browser form AND the serverless function.
export const PHONE_RE = /^[6-9]\d{9}$/;
export const LIMITS = { name: 80, pickup: 120, drop: 120, goods: 80, weight: 60, slot: 60, mode: 40, notes: 300 };
export const clean = (v, max = 200) =>
  String(v ?? '').replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
export const localDate = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function validate(f, now = new Date()) {
  const e = {};
  if (clean(f.name, LIMITS.name).length < 2) e.name = 'Please enter your name (at least 2 characters).';
  if (!PHONE_RE.test(String(f.phone || '').replace(/[\s-]/g, ''))) e.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (!clean(f.pickup)) e.pickup = 'Choose a pickup point.';
  if (!clean(f.drop)) e.drop = 'Choose a drop-off destination.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date || '')) e.date = 'Select the trip date.';
  else if (f.date < localDate(now)) e.date = 'Trip date cannot be in the past.';
  if (!clean(f.slot)) e.slot = 'Choose a preferred time slot.';
  return e;
}
