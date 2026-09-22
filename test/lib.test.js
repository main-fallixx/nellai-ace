import test from 'node:test';
import assert from 'node:assert/strict';
import { validate, clean } from '../src/lib/validate.js';
import { buildMessage, buildWhatsAppUrl } from '../src/lib/whatsapp.js';

const ok = { name: 'Senthil Kumar', phone: '9876543210', pickup: 'A', drop: 'B', date: '2099-01-01', slot: 'Morning' };
test('valid form passes', () => assert.deepEqual(validate(ok), {}));
test('rejects bad phone, short name, past date, empty fields', () => {
  const e = validate({ name: 'A', phone: '12345', pickup: '', drop: '', date: '2000-01-01', slot: '' });
  assert.deepEqual(Object.keys(e).sort(), ['date', 'drop', 'name', 'phone', 'pickup', 'slot']);
});
test('rejects malformed date', () => assert.ok(validate({ ...ok, date: 'tomorrow' }).date));
test('clean strips angle brackets/control chars and caps length', () => {
  assert.equal(clean('<b>hi</b>\n\tthere', 50), 'b hi /b there');
  assert.equal(clean('x'.repeat(500), 10).length, 10);
});
test('WhatsApp URL is correctly encoded and round-trips', () => {
  const msg = buildMessage({ ...ok, mode: 'Local', goods: 'Cartons & bags', weight: '300 kg', helper: true, roundTrip: false, notes: 'Gate #2 ₹?' }, 1250);
  const url = buildWhatsAppUrl('+91 98765-43210', msg);
  assert.ok(url.startsWith('https://wa.me/919876543210?text='));
  assert.equal(decodeURIComponent(url.split('?text=')[1]), msg);
  assert.ok(!url.includes(' ') && !url.includes('&'));
});
test('no number gives empty URL', () => assert.equal(buildWhatsAppUrl('', 'x'), ''));
