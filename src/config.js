const env = import.meta.env;
const digits = (v) => String(v || '').replace(/\D/g, '');
export const config = {
  siteUrl: env.VITE_SITE_URL || '',
  phone: digits(env.VITE_PHONE_E164),
  whatsapp: digits(env.VITE_WHATSAPP_E164 || env.VITE_PHONE_E164),
  ownerName: env.VITE_OWNER_NAME || '',
  address: env.VITE_BUSINESS_ADDRESS || '',
  gaId: env.VITE_GA_ID || '',
  mapsKey: env.VITE_GOOGLE_MAPS_EMBED_KEY || '',
  showSample: env.VITE_SHOW_SAMPLE_CONTENT === 'true',
};
export const displayPhone = () => {
  const p = config.phone;
  return p.length === 12 && p.startsWith('91') ? `+91 ${p.slice(2, 7)} ${p.slice(7)}` : p ? `+${p}` : '+91 XXXXX XXXXX';
};
export const telHref = () => (config.phone ? `tel:+${config.phone}` : '#estimator');
export const waHref = (text = '') =>
  config.whatsapp ? `https://wa.me/${config.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}` : '#estimator';
