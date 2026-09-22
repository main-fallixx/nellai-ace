import { useState } from 'react';
import Icon from './Icon.jsx';
import { Head, CallBtn, WaBtn } from './ui.jsx';
import { Logo } from './Header.jsx';
import { SERVICES, FITS, NOFIT, CREDS, CORRIDORS, DISTRICTS, STEPS, REVIEWS, FAQ } from '../content.js';
import { config, displayPhone, telHref } from '../config.js';
import { track } from '../lib/analytics.js';

const Services = () => (
  <section className="sec" id="services"><div className="wrap">
    <Head center tag="PRACTICAL TRANSPORT CATEGORIES" title="Tailored Goods Carrier Services for South TN" sub="Engineered for narrow town bazaar lanes, national highways, and agricultural mandi pickups where larger lorries cannot enter." />
    <div className="grid4">{SERVICES.map((s) => (
      <article className="card svc" key={s.title}><div><span className="ico-b"><Icon n={s.icon} size={22} /></span><h3>{s.title}</h3><p className="muted">{s.text}</p></div>
        <dl className="meta">{s.meta.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl></article>))}</div>
  </div></section>
);

const Specs = () => (
  <section className="sec sec-blue" id="fleet"><div className="wrap">
    <div className="between end head-row"><Head pill={false} tag="SPECIFICATIONS & LEGAL COMPLIANCE" title="Know Exactly What Fits in our Tata Ace Gold" sub="We adhere strictly to legal axle weight regulations (750 kg max) to ensure zero transit delays at RTO check-posts and complete cargo safety." /><span className="dimpill">Deck: 7.2 ft (L) × 4.8 ft (W) × 5.0 ft (H)</span></div>
    <div className="grid12">
      <div className="c6 card pad">
        <h3 className="h3i"><Icon n="box" size={20} />Capacity &amp; Cargo Fitment Guide</h3>
        <p className="lbl green"><Icon n="check" size={15} /> FITS COMFORTABLY (APPROVED LOADS)</p>
        <ul className="fit">{FITS.map(([a, b]) => <li key={a}><Icon n="check" size={12} className="green" /><span><b>{a}</b>{b}</span></li>)}</ul>
        <p className="lbl red top"><Icon n="x" size={15} /> STRICTLY PROHIBITED OR CANNOT FIT</p>
        <ul className="fit nofit">{NOFIT.map(([a, b, c]) => <li key={a}><Icon n="x" size={11} className="red" /><span>{a}{b && <b>{b}</b>}{c}</span></li>)}</ul>
      </div>
      <div className="c6 card pad">
        <h3 className="h3i"><Icon n="shield" size={20} />Commercial Carrier Credentials</h3>
        <div className="creds">{CREDS.map(([i, t, d]) => <div key={t}><b><Icon n={i} size={15} />{t}</b><p className="muted sm">{d}</p></div>)}</div>
        <div className="dim"><span className="cap">DIMENSIONAL FOOTPRINT</span>
          <svg viewBox="0 0 384 115" role="img" aria-label="Side view of the Tata Ace deck, 7.2 feet long and 5 feet high"><rect x="19" y="43" width="211" height="48" fill="none" stroke="#0e1c2f" strokeWidth="2" rx="2" /><path d="M230 53h55l22 20v18h-77z" fill="none" stroke="#0e1c2f" strokeWidth="2" /><circle cx="67" cy="91" r="13" fill="#0e1c2f" /><circle cx="269" cy="91" r="13" fill="#0e1c2f" /><path d="M19 34h211M9 43v48" stroke="#fe6500" strokeWidth="1.5" /><text x="125" y="26" fontSize="10.5" fontWeight="700" fill="#0b1c30">Deck Length: 7.2 ft</text><text x="6" y="70" fontSize="9.6" fontWeight="600" fill="#0b1c30" transform="rotate(-90 12 70)">5.0 ft</text></svg></div>
      </div>
    </div>
  </div></section>
);

function Coverage() {
  const q = 'Tirunelveli, Tamil Nadu';
  return (
    <section className="sec" id="coverage"><div className="wrap">
      <div className="between end head-row"><Head tag="NETWORK REACH" title="Key Transport Corridors Across South Tamil Nadu" sub="Direct road transit without transshipment delays. Point-to-point guaranteed mini-truck delivery." /><span className="row"><i className="dot g" /> Zero Transshipment • Single Direct Driver</span></div>
      <div className="grid3">{CORRIDORS.map((c) => (
        <article className="card cor" key={c.title}><div className="between"><span className={`ctag ${c.hot ? 'hot' : ''}`}>{c.tag}</span><b className="km">{c.km}</b></div><h3>{c.title}</h3><p className="muted sm">{c.text}</p>
          <div className="between cfoot"><span className="row muted"><Icon n="clock" size={13} />{c.time}</span><b className="o">{c.price}</b></div></article>))}</div>
      <p className="fine">Corridor distances and price ranges are indicative; the driver confirms the final fare.</p>
      <div className="card pad zones"><h3>Daily Coverage Towns &amp; Industrial Zones</h3>
        {DISTRICTS.map(([t, col, items]) => <div key={t}><p className="dl" style={{ color: col }}>{t}</p><div className="pills">{items.map((i) => <span key={i}>{i}</span>)}</div></div>)}</div>
      <div className="map" id="contact">
        {config.mapsKey
          ? <iframe title="Service area map – Tirunelveli, Thoothukudi and Kanniyakumari" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps/embed/v1/search?key=${encodeURIComponent(config.mapsKey)}&q=${encodeURIComponent(q)}&zoom=9`} />
          : <div className="ph"><Icon n="pin" size={30} /><p>Google Map appears here once <code>VITE_GOOGLE_MAPS_EMBED_KEY</code> is set.</p></div>}
        <a className="btn btn-pale" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.address || q)}`}><Icon n="pin" size={14} />Open in Google Maps</a>
      </div>
    </div></section>
  );
}

const Steps = () => (
  <section className="sec sec-blue"><div className="wrap">
    <Head center tag="DIRECT COORDINATION" title="How to Book Your Tata Ace Trip in 3 Easy Steps" sub="No automated app confusion or hidden broker commissions. You deal straight with the vehicle owner." />
    <div className="grid3">{STEPS.map((s, i) => (
      <article className="card step" key={s.title}><span className={`num ${s.cls}`}>{i + 1}</span><h3>{s.title}</h3><p className="muted">{s.text.replace('{owner}', config.ownerName || 'The driver')}</p><b className={`stag ${s.green ? 'green' : s.cls === 'orange' ? 'o' : ''}`}>{s.tag}</b></article>))}</div>
  </div></section>
);

const Reviews = () => !config.showSample ? null : (
  <section className="sec" id="reviews"><div className="wrap">
    <div className="between end head-row"><div><div className="stars">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} n="star" size={17} fill />)}<b>4.9 / 5.0 Rating</b></div><h2>Trusted by Commercial Merchants Across Nellai &amp; Tuticorin</h2></div><span className="semi">Over 1,200+ trips completed safely</span></div>
    <div className="grid3">{REVIEWS.map((r) => (
      <figure className="card rev" key={r.who}><div><div className="stars sm">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} n="star" size={15} fill />)}</div><blockquote>“{r.text}”</blockquote></div><figcaption><b>{r.who}</b><small>{r.where}</small><Icon n="shield" size={18} className="green" /></figcaption></figure>))}</div>
  </div></section>
);

function Faq() {
  return (
    <section className="sec sec-blue"><div className="wrap narrow">
      <Head center pill={false} tag="TRANSIT CLARIFICATIONS" title="Frequently Asked Questions" />
      <div className="faq">{FAQ.map(([q, a]) => <details key={q}><summary>{q}<Icon n="down" size={14} className="chev" /></summary><p className="muted">{a}</p></details>)}</div>
    </div></section>
  );
}

const Cta = () => (
  <section className="cta"><div className="wrap between">
    <div><span className="tag tag-o">READY FOR DISPATCH</span><h3>Need a Tata Ace Mini-Truck Today in Tirunelveli?</h3><p>Direct dispatch from Vannarpettai stand. Fast arrival to Palayamkottai, Pettai, Town, or Thoothukudi highway within 25 minutes.</p><small className="fine light">Arrival time depends on driver availability and traffic.</small></div>
    <div className="row gap"><CallBtn cls="btn-white" where="cta_banner">{displayPhone()}</CallBtn><WaBtn where="cta_banner" text="Hello, I need a Tata Ace today.">WhatsApp Owner Now</WaBtn></div>
  </div></section>
);

const Footer = () => (
  <footer className="foot"><div className="wrap">
    <div className="fgrid">
      <div><Logo light /><p>On-demand, reliable mini-truck transport services for commercial merchants, agricultural producers, and industrial traders across Southern Tamil Nadu.</p></div>
      <div><h4>Tata Ace Fleet Specs</h4>{[['Payload Capacity:', '750 kg'], ['Cargo Deck:', '7.2 ft × 4.8 ft'], ['Bed Type:', 'Open High-Deck']].map(([a, b]) => <div className="frow" key={a}><span>{a}</span><b>{b}</b></div>)}</div>
      <div><h4>Direct Route Coverage</h4><ul>{['Tirunelveli Central ⇄ Thoothukudi Port', 'Palayamkottai ⇄ Nagercoil Mandi', 'Valliyur ⇄ Kanniyakumari Hub', 'Ambasamudram ⇄ Tenkasi Border', 'Spic Nagar ⇄ SIPCOT Industrial Area'].map((r) => <li key={r}>{r}</li>)}</ul></div>
      <div><h4>Quick Contacts</h4><ul className="qc">
        <li><Icon n="phone" size={14} /><a href={telHref()} onClick={() => track('call_click', { where: 'footer' })}>{displayPhone()}</a></li>
        <li><Icon n="chat" size={14} />WhatsApp Dispatch Available</li>
        <li className="dim"><Icon n="pin" size={14} />{config.address || 'Vannarpettai, Tirunelveli'}</li></ul></div>
    </div>
    <p className="fdisc"><b>Dispatch Disclaimer:</b> <span>Quotation requests are subject to real-time truck availability and route verification by dispatch operators - not an automated payment lock. Tolls across NH 44 and loading/unloading labor charges quoted separately.</span></p>
    <div className="between fbot"><span>© {new Date().getFullYear()} Nellai Ace Logistics. Commercial Goods Carrier Services.</span><span className="fl"><a href="#top">Terms of Transit</a><a href="#top">Privacy Policy</a></span></div>
  </div></footer>
);

export default function Lower() { return <><Services /><Specs /><Coverage /><Steps /><Reviews /><Faq /><Cta /><Footer /></>; }
