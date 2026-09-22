export function initAnalytics(id) {
  if (!id || typeof document === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}
export const track = (name, params = {}) => {
  try { if (typeof window !== 'undefined' && window.gtag) window.gtag('event', name, params); } catch { /* ignore */ }
};
