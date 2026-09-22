import Icon from './Icon.jsx';
import { config, displayPhone, telHref, waHref } from '../config.js';
import { track } from '../lib/analytics.js';

export const CallBtn = ({ children, cls = 'btn-navy', where }) => (
  <a className={`btn ${cls}`} href={telHref()} onClick={() => track('call_click', { where })}>
    <Icon n="phone" size={15} />{children ?? <>Call Driver: {displayPhone()}</>}
  </a>
);
export const WaBtn = ({ children, cls = 'btn-orange', where, text = '' }) => (
  <a className={`btn ${cls}`} href={waHref(text)} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click', { where })}>
    <Icon n="chat" size={16} />{children}
  </a>
);
export const Head = ({ tag, title, sub, center, pill = true, light }) => (
  <div className={`head ${center ? 'center' : ''}`}>
    <span className={`tag ${pill ? 'pill' : ''} ${light ? 'tag-light' : ''}`}>{tag}</span>
    <h2>{title}</h2>
    {sub && <p className="sub">{sub}</p>}
  </div>
);
export const noPhone = !config.phone;
