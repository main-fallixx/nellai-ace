import { useState } from 'react';
import Icon from './Icon.jsx';
import { NAV } from '../content.js';
import { displayPhone, telHref } from '../config.js';
import { track } from '../lib/analytics.js';
import { WaBtn } from './ui.jsx';

export const Logo = ({ light }) => (
  <a className="logo" href="#top" aria-label="Nellai Ace Logistics home">
    {/* Replace with your real logo: put it at public/images/logo.png and swap this <svg> for <img src="/images/logo.png"> */}
    <svg width="40" height="40" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="12" fill="#0e1c2f"/><path d="M10 22h26v20H10zM36 28h9l7 7v7H36z" fill="#fe6500"/><circle cx="20" cy="44" r="5" fill="#eaf1ff"/><circle cx="44" cy="44" r="5" fill="#eaf1ff"/></svg>
    <span><b style={light ? { color: '#eaf1ff' } : null}>Nellai Ace</b><small>LOGISTICS<br />SOUTHERN TN</small></span>
  </a>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="hdr" id="top">
      <div className="topbar"><div className="wrap between">
        <span className="dot-text"><i className="dot live" />Serving Tirunelveli, Thoothukudi &amp; Kanniyakumari | Mon-Sun 6:00 AM - 10:00 PM</span>
        <span className="topr">
          <a href={telHref()} onClick={() => track('call_click', { where: 'topbar' })}><Icon n="phone" size={11} /> Direct Dispatch: {displayPhone()}</a>
          <em lang="ta">தமிழ் சேவை உண்டு</em>
        </span>
      </div></div>
      <div className="nav"><div className="wrap between">
        <Logo />
        <nav id="mainnav" className={open ? 'open' : ''} aria-label="Main">
          {NAV.map(([t, h], i) => <a key={h} href={h} className={i === 0 ? 'active' : ''} onClick={() => setOpen(false)}>{t}</a>)}
        </nav>
        <div className="navcta">
          <WaBtn cls="btn-wa" where="header" text="Hello, I would like to book a Tata Ace.">WhatsApp Book</WaBtn>
          <a className="btn btn-orange hide-sm" href="#estimator">Request Quotation</a>
          <button className="burger" aria-label="Toggle menu" aria-expanded={open} aria-controls="mainnav" onClick={() => setOpen((o) => !o)}><Icon n={open ? 'x' : 'menu'} size={20} /></button>
        </div>
      </div></div>
    </header>
  );
}
