import { useState } from 'react';
import Icon from './Icon.jsx';
import { CallBtn, WaBtn } from './ui.jsx';
import { config } from '../config.js';

export function Announce() {
  return (
    <div className="announce"><div className="wrap between">
      <span className="row"><i className="ico-o"><Icon n="route" size={11} /></i><b>Daily Scheduled Run:</b> <span className="muted">Tirunelveli Town ⇄ Thoothukudi SIPCOT &amp; VOC Port (Morning &amp; Evening departures)</span></span>
      {config.showSample && <span className="green row"><Icon n="check" size={13} /> 1 Vehicle Ready for Dispatch in Vannarpettai</span>}
    </div></div>
  );
}

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);
  const chips = [['clock', '15-Min', 'Quote Dispatch'], ['shield', '100%', 'Tarpaulin Cover'], ...(config.showSample ? [['pin', '45+', 'Regional Hubs'], ['star', '4.9 / 5.0', 'Local Business Rating']] : [])];
  return (
    <section className="hero"><div className="wrap grid12">
      <div className="c7 hero-l">
        <span className="badge"><i className="dot o" />VERIFIED LOCAL OWNER-OPERATOR • ON-TIME PICKUP • SOUTH TAMIL NADU</span>
        <h1>Reliable Tata Ace Goods Transport in <em>Tirunelveli,</em> <em>Thoothukudi</em> &amp; Kanniyakumari</h1>
        <p className="lead">Professional mini-truck logistics for local merchants, wholesale rice &amp; banana mandis, light industrial fabricators, and household shifting. Direct driver-owner coordination, honest kilometer rates, and 100% weather-proof canvas protection.</p>
        <div className="actions"><CallBtn where="hero" /><WaBtn where="hero" text="Hello, I would like to book a Tata Ace.">WhatsApp Booking</WaBtn><a className="btn btn-pale" href="#estimator"><Icon n="route" size={14} />Estimate Fare ↓</a></div>
        <div className="chips">{chips.map(([i, a, b]) => <div key={b} className="chip"><b><Icon n={i} size={14} className="o" />{a}</b><span>{b}</span></div>)}</div>
      </div>
      <aside className="c5 vcard">
        <div className="photo">
          {imgOk
            ? <img src="/images/tata-ace.jpg" alt="Tata Ace mini truck loaded with cargo and netting" width="640" height="432" fetchpriority="high" onError={() => setImgOk(false)} />
            : <div className="ph"><Icon n="truck" size={48} /><span>Add your real vehicle photo at<br /><code>public/images/tata-ace.jpg</code></span></div>}
          <span className="live"><i className="dot live" />Available • Vannarpettai Stand</span>
          <span className="permit">TN-72 Commercial Permit</span>
        </div>
        <div className="vbody">
          <div className="between"><div><h2>Tata Ace Gold (High Deck)</h2><p className="muted sm">Commercial Goods Carrier • Open Metal Cage</p></div><span className="lim">750 KG LIMIT</span></div>
          <div className="specs">{[['7.2 × 4.8 ft', 'Bed Dimension'], ['750 kg', 'Max Payload'], ['Heavy Net', '+ Tarpaulin']].map(([a, b]) => <div key={b}><b>{a}</b><span>{b}</span></div>)}</div>
          <div className="guar"><Icon n="badge" size={16} /> RC, Commercial Insurance, RTO Fitness &amp; Fastag NH 44 Active</div>
        </div>
      </aside>
    </div></section>
  );
}
