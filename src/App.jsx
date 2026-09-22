import { lazy, Suspense, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero, { Announce } from './components/Hero.jsx';
import Estimator from './components/Estimator.jsx';
import { config } from './config.js';

const Lower = lazy(() => import('./components/Lower.jsx')); // below-the-fold code split

function useStructuredData() {
  useEffect(() => {
    const d = { '@context': 'https://schema.org', '@type': 'MovingCompany', name: 'Nellai Ace Logistics', description: 'Tata Ace mini-truck goods transport in Tirunelveli, Thoothukudi and Kanniyakumari.', areaServed: ['Tirunelveli', 'Thoothukudi', 'Kanniyakumari'].map((n) => ({ '@type': 'AdministrativeArea', name: `${n}, Tamil Nadu, India` })), openingHours: 'Mo-Su 06:00-22:00' };
    if (config.siteUrl) d.url = config.siteUrl;
    if (config.phone) d.telephone = `+${config.phone}`;
    if (config.address) d.address = { '@type': 'PostalAddress', streetAddress: config.address, addressCountry: 'IN' };
    const s = document.createElement('script'); s.type = 'application/ld+json'; s.text = JSON.stringify(d);
    document.head.appendChild(s); return () => s.remove(); // no ratings/reviews emitted: only add once they are real & verifiable
  }, []);
}

export default function App() {
  useStructuredData();
  return (
    <>
      <a className="skip" href="#estimator">Skip to booking form</a>
      <Header />
      <main><Announce /><Hero /><Estimator /><Suspense fallback={<div className="wrap" style={{ minHeight: 600 }} aria-busy="true" />}><Lower /></Suspense></main>
    </>
  );
}
