import { useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { Head, CallBtn } from './ui.jsx';
import { MODES, PICKUPS, DROPS, GOODS, WEIGHTS, SLOTS, HELPER_FEE } from '../content.js';
import { config } from '../config.js';
import { validate, localDate, clean } from '../lib/validate.js';
import { buildMessage, buildWhatsAppUrl } from '../lib/whatsapp.js';
import { track } from '../lib/analytics.js';

const init = () => ({ mode: MODES[0], name: '', phone: '', pickup: PICKUPS[0], drop: DROPS[0].label, goods: GOODS[0], weight: WEIGHTS[1], date: '', slot: SLOTS[0], helper: true, roundTrip: false, notes: '', website: '' });
const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

function Field({ id, label, req, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{req && <span className="o" aria-hidden="true"> *</span>}</label>
      {children}
      {error && <p className="err" id={`${id}-e`} role="alert">{error}</p>}
    </div>
  );
}

export default function Estimator() {
  const [f, setF] = useState(init);
  const [errs, setErrs] = useState({});
  const [st, setSt] = useState({ s: 'idle' });
  const t0 = useRef(Date.now());
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const a11y = (k) => ({ id: k, 'aria-invalid': !!errs[k], 'aria-describedby': errs[k] ? `${k}-e` : undefined });

  const drop = DROPS.find((d) => d.label === f.drop);
  const total = drop?.base != null && f.mode !== MODES[2] ? drop.base + (f.helper ? HELPER_FEE : 0) : null;
  const data = { ...f, name: clean(f.name, 80), notes: clean(f.notes, 300), mode: f.mode };
  const msg = buildMessage(data, total);

  const check = () => {
    const e = validate(f); setErrs(e);
    const first = Object.keys(e)[0];
    if (first) { document.getElementById(first)?.focus(); return false; }
    return true;
  };
  const save = () => fetch('/api/enquiry', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, estimate: total, elapsed: Date.now() - t0.current }),
  });

  const sendWa = () => {
    if (!check()) return;
    const url = buildWhatsAppUrl(config.whatsapp, msg);
    track('whatsapp_click', { where: 'estimator' }); track('form_submit', { via: 'whatsapp' });
    if (!url) return setSt({ s: 'error', msg: 'WhatsApp number is not configured yet. Please use the callback request or call us.' });
    window.open(url, '_blank', 'noopener,noreferrer');
    save().catch(() => {}); // best-effort copy of the enquiry; WhatsApp does not depend on it
    setSt({ s: 'ok', msg: 'WhatsApp opened with your trip details. Press send in WhatsApp to reach the driver.' });
  };
  const callback = async () => {
    if (!check()) return;
    setSt({ s: 'loading' }); track('form_submit', { via: 'callback' });
    try {
      const r = await save(); const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { track('form_success'); setSt({ s: 'ok', msg: 'Request received. The driver will call you to confirm availability and the final fare.' }); setF(init()); t0.current = Date.now(); }
      else { if (j.errors) setErrs(j.errors); setSt({ s: 'error', msg: j.error || 'We could not send your request. Please call or use WhatsApp.' }); }
    } catch { setSt({ s: 'error', msg: 'Network problem. Please check your connection, or call / WhatsApp us directly.' }); }
  };

  return (
    <section className="sec sec-blue" id="estimator"><div className="wrap">
      <div className="between end head-row">
        <Head tag="RATE CALCULATOR" pill={false} title="Get an Instant Trip Quotation or WhatsApp Booking" sub="Select your corridor and load category. Instant transparent estimates with no surge charges. Connect directly with the truck operator for prompt dispatch." />
        <p className="disc"><Icon n="clock" size={13} /> Requests confirm vehicle availability and driver review before final payment lock. Tolls &amp; helper charges itemized transparently.</p>
      </div>
      <div className="grid12">
        <form className="c7 card form" noValidate onSubmit={(e) => e.preventDefault()} aria-label="Trip quotation request">
          <fieldset><legend>Transit Mode</legend>
            <div className="modes" role="radiogroup" aria-label="Transit mode">{MODES.map((m) => <button type="button" key={m} role="radio" aria-checked={f.mode === m} className={f.mode === m ? 'on' : ''} onClick={() => setF((p) => ({ ...p, mode: m }))}>{m}</button>)}</div>
          </fieldset>
          <div className="two">
            <Field id="name" label="Customer / Trader Name" req error={errs.name}><input {...a11y('name')} value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" maxLength={80} /></Field>
            <Field id="phone" label="Mobile Phone (10 Digits)" req error={errs.phone}><input {...a11y('phone')} value={f.phone} onChange={set('phone')} placeholder="10-digit mobile number" inputMode="numeric" autoComplete="tel-national" maxLength={12} /></Field>
          </div>
          <div className="two">
            <Field id="pickup" label="Pickup Hub / Point" req error={errs.pickup}><select {...a11y('pickup')} value={f.pickup} onChange={set('pickup')}>{PICKUPS.map((o) => <option key={o}>{o}</option>)}</select></Field>
            <Field id="drop" label="Drop-off Destination" req error={errs.drop}><select {...a11y('drop')} value={f.drop} onChange={set('drop')}>{DROPS.map((o) => <option key={o.label}>{o.label}</option>)}</select></Field>
          </div>
          <div className="two">
            <Field id="goods" label="Goods Category"><select id="goods" value={f.goods} onChange={set('goods')}>{GOODS.map((o) => <option key={o}>{o}</option>)}</select></Field>
            <Field id="weight" label="Estimated Weight"><select id="weight" value={f.weight} onChange={set('weight')}>{WEIGHTS.map((o) => <option key={o}>{o}</option>)}</select></Field>
          </div>
          <div className="two">
            <Field id="date" label="Trip Date" req error={errs.date}><input {...a11y('date')} type="date" min={localDate()} value={f.date} onChange={set('date')} /></Field>
            <Field id="slot" label="Preferred Slot" req error={errs.slot}><select {...a11y('slot')} value={f.slot} onChange={set('slot')}>{SLOTS.map((o) => <option key={o}>{o}</option>)}</select></Field>
          </div>
          <fieldset><legend>Transit Add-ons &amp; Labor</legend>
            <div className="addons">
              <label className="addon"><input type="checkbox" checked={f.helper} onChange={set('helper')} /><span><b>1 Loading Helper</b><small>+₹{HELPER_FEE} flat</small></span></label>
              <label className="addon"><input type="checkbox" checked={f.roundTrip} onChange={set('roundTrip')} /><span><b>Round Trip</b><small className="brown">Return-trip terms on call</small></span></label>
              <label className="addon"><input type="checkbox" checked readOnly disabled /><span><b>Heavy Rain Cover</b><small className="green">Included Free</small></span></label>
            </div>
          </fieldset>
          <Field id="notes" label="Landmark / Delivery Instructions (Optional)"><input id="notes" value={f.notes} onChange={set('notes')} placeholder="e.g. Near SPIC Main Gate, warehouse entrance on left side" maxLength={300} /></Field>
          <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></label></div>
        </form>

        <div className="c5 side">
          <div className="card price">
            <div className="between pr-head">
              <div><span className="cap">ESTIMATED BASE FARE</span><div className="fare">{total != null ? <><b>{inr(total)}</b> <small>approx.</small></> : <b className="fare-sm">Confirmed on call</b>}</div></div>
              <div className="rt"><span className="fixed">{total != null ? 'Fixed Rate Corridor' : 'Rate on request'}</span><small>{drop?.label.match(/\(([^)]+)\)/) ? `Distance: ~${drop.label.match(/\(([^)]+)\)/)[1]}` : 'Distance: on confirmation'}</small></div>
            </div>
            <dl className="rows">
              <div><dt>Selected Vehicle:</dt><dd>Tata Ace Gold (750 kg)</dd></div>
              <div><dt>Base Transit &amp; Fuel:</dt><dd>{drop?.base != null ? inr(drop.base) : 'On confirmation'}</dd></div>
              <div><dt>Loading Helper Charge:</dt><dd>{f.helper ? inr(HELPER_FEE) : '—'}</dd></div>
              <div><dt>NH Tolls &amp; Fastag:</dt><dd className="reg">As Per Toll Plaza Actuals</dd></div>
            </dl>
            <div className="preview"><span className="cap"><Icon n="chat" size={11} /> WHATSAPP MESSAGE PAYLOAD PREVIEW:</span><p>{msg}</p></div>
            <div className="ctas">
              <button type="button" className="btn btn-orange big" onClick={sendWa} disabled={st.s === 'loading'}><Icon n="chat" size={17} />Send to Driver on WhatsApp</button>
              <button type="button" className="btn btn-navy big" onClick={callback} disabled={st.s === 'loading'}>{st.s === 'loading' ? <><span className="spin" aria-hidden="true" />Sending…</> : <><Icon n="phone" size={14} />Request Callback &amp; Lock Truck</>}</button>
            </div>
            <div className="status" aria-live="polite">{st.s === 'ok' && <p className="okmsg" role="status"><Icon n="check" size={14} /> {st.msg}</p>}{st.s === 'error' && <p className="errmsg" role="alert"><Icon n="x" size={14} /> {st.msg}</p>}</div>
            <div className="seals"><span><Icon n="shield" size={12} /> No Advance for Booking</span><span><Icon n="check" size={12} /> Pay After Delivery</span></div>
          </div>
          <div className="callbox"><span className="ico-c"><Icon n="phone" size={16} /></span><div><b>Prefer Direct Tamil Voice Call?</b><small>Dispatch Desk • 6:00 AM to 10:00 PM</small></div><CallBtn cls="btn-black sm" where="callbox">Call Now</CallBtn></div>
        </div>
      </div>
    </div></section>
  );
}
