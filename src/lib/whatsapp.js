export function buildMessage(f, total) {
  const yn = (b, t) => (b ? t : 'No');
  return [
    `${f.name} requesting trip: ${f.pickup} ➔ ${f.drop}`,
    `Mode: ${f.mode}`,
    `Cargo: ${f.goods} (${f.weight})`,
    `Date: ${f.date} (${f.slot})`,
    `Helper: ${yn(f.helper, 'Yes (1 Helper)')} | Round trip: ${yn(f.roundTrip, 'Yes')}`,
    f.notes ? `Notes: ${f.notes}` : null,
    `Phone: ${f.phone}`,
    total != null ? `Est: ₹${total}` : 'Est: to be confirmed',
  ].filter(Boolean).join(' | ');
}
export function buildWhatsAppUrl(number, text) {
  const n = String(number || '').replace(/\D/g, '');
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : '';
}
