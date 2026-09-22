// All page copy lives here. Items marked SAMPLE came from the Figma mock-up and are NOT verified facts:
// replace them with real data before launch (see README "Content you must verify").
export const NAV = [['Services', '#services'], ['Fleet & Capacity', '#fleet'], ['Route Coverage', '#coverage'], ['Rate Estimator', '#estimator'], ['Verified Reviews', '#reviews'], ['Contact & Map', '#contact']];

export const MODES = ['Local (<30 km)', 'Intercity Corridor', 'Full Day (8 Hrs)'];
export const PICKUPS = ['Tirunelveli Town / Wholesale Mandi', 'Palayamkottai', 'Pettai Industrial Estate', 'Melapalayam', 'Gangaikondan SIPCOT', 'Other (write in landmark box)'];
// base = fare in INR taken from the design (Thoothukudi only). null => "confirmed on call". Owner must set real rates.
export const DROPS = [
  { label: 'Thoothukudi VOC Port Area (48 km)', base: 950 },
  { label: 'Nagercoil / Vadasery Market', base: null },
  { label: 'Tenkasi / Ambasamudram', base: null },
  { label: 'Kanniyakumari Town Hub', base: null },
  { label: 'Other (write in landmark box)', base: null },
];
export const GOODS = ['Commercial / Shop Stock & Cartons', 'Household / Room Shifting', 'Industrial / Hardware & Motors', 'Agri Produce & Perishables'];
export const WEIGHTS = ['Light Load (up to 300 kg)', 'Medium Load (300 - 550 kg)', 'Heavy Load (550 - 750 kg)'];
export const SLOTS = ['Early Morning (6:00 AM - 9:00 AM)', 'Morning (9:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 4:00 PM)', 'Evening (4:00 PM - 8:00 PM)'];
export const HELPER_FEE = 300; // from design: "+₹300 flat" — confirm with owner

export const SERVICES = [
  { icon: 'store', title: 'Local Shop & Retail Mandi', text: 'Wholesale stock redistribution between Tirunelveli Town, Palayamkottai Market, and Melapalayam. Perfect for FMCG, provisions, textile bundles, and plastic products.', meta: [['Average Turnaround:', 'Within 45 Mins'], ['Load Suitability:', 'Up to 750 kg Boxes']] },
  { icon: 'home', title: 'Small House & Room Shifting', text: 'Stress-free 1 BHK and bachelor room relocation. Protective moving pads for washing machines, fridges, cots, mattresses, and kitchen cartons with ratcheted side-rail tie-downs.', meta: [['Safety Gear:', 'Ropes, Tarps & Foam'], ['Labor Service:', 'Helper On-Demand']] },
  { icon: 'truck', title: 'Industrial & Port Transit', text: 'Daily feeder runs to Thoothukudi VOC Port, Spic Nagar chemical belts, and Pettai / Gangaikondan industrial estates. Handling fabricated hardware, spare pumps, and electrical motors.', meta: [['Route:', 'NH 138 / NH 44'], ['Documentation:', 'E-Way Bill & Gate Pass']] },
  { icon: 'leaf', title: 'Agri Produce & Perishables', text: 'Early morning 4:30 AM farm-gate collection for Thamirabarani banana bunches, Ambasamudram paddy sacks, chillies, and coconuts directly delivering to Nagercoil or Nellai wholesale yards.', meta: [['Dispatch Time:', '4:30 AM onwards'], ['Deck Type:', 'Ventilated Open Cage']] },
];
export const FITS = [['15 to 22 Standard Moving Cartons', ' (corrugated goods & retail parcels)'], ['1 Queen-Size Bed Frame + 1 Mattress + 1 Washing Machine + 1 Fridge', ''], ['12 to 15 Sacks of Rice / Fertilizer', ' (strictly within 750 kg threshold)'], ['Electrical conduit bundles, motors & light metal fabrication', ' (under 7.5 ft)'], ['Agricultural banana stems, vegetable crates & plantain bunches', '']];
export const NOFIT = [['Loads exceeding ', '750 kg gross', ' (no overloading permitted under RTO rules)'], ['Long construction iron bars exceeding ', '10 feet in length', ''], ['Hazardous industrial raw chemicals, unlicensed combustibles, or flammables', '', '']];
// SAMPLE claims from the design — verify each (driver record, insurance, Fastag plazas) before publishing.
export const CREDS = [['badge', 'Driver Verification', 'Commercial Heavy/Goods Transport endorsement with 12+ years accident-free record.'], ['shield', 'Goods Vehicle Policy', 'Comprehensive commercial insurance with zero-depreciation coverage.'], ['zap', 'National Highway Fastag', 'Active automated toll fast-pass across Gangaikondan, Nanguneri, and Tuticorin plazas.'], ['rain', 'Weather Protection', 'Industrial tarpaulin + double nylon cargo net covering every single trip free of cost.']];
export const CORRIDORS = [
  { tag: 'NH 138 Corridor', hot: true, km: '~50 km', title: 'Tirunelveli ⇄ Thoothukudi Port', text: 'Connecting Vannarpettai, Palayamkottai, Vagaikulam, Spic Nagar, and VOC Port container terminals.', time: '~55 mins transit', price: '₹1,300 - ₹1,600' },
  { tag: 'NH 44 Expressway', km: '~72 km', title: 'Nellai ⇄ Nagercoil Mandi', text: 'Serving Nanguneri SEZ, Valliyur commercial yard, Kavalkinaru windmill junction, and Vadasery market.', time: '~85 mins transit', price: '₹1,900 - ₹2,300' },
  { tag: 'SH 39 Corridor', km: '~53 km', title: 'Nellai ⇄ Tenkasi & Ambasamudram', text: 'Serving Cheranmahadevi, Alangulam, Surandai, and Tenkasi agriculture supply chain points.', time: '~65 mins transit', price: '₹1,400 - ₹1,750' },
];
export const DISTRICTS = [
  ['TIRUNELVELI DISTRICT:', '#fe6500', ['Tirunelveli Town', 'Palayamkottai High Ground', 'Pettai Industrial Estate', 'Melapalayam', 'Thazhaiyuthu', 'Gangaikondan SIPCOT', 'Nanguneri SEZ', 'Valliyur', 'Ambasamudram', 'Kallidaikurichi']],
  ['THOOTHUKUDI DISTRICT:', '#a33e00', ['VOC Port Wharf Area', 'SIPCOT Phase 1 & Phase 2', 'Spic Nagar', 'Millerpuram', 'Kovilpatti Match & Textile Zone', 'Tiruchendur Temple Road', 'Kayalpattinam', 'Ettayapuram']],
  ['KANNIYAKUMARI DISTRICT:', '#009844', ['Nagercoil Vadasery Market', 'Marthandam', 'Kanniyakumari Town Hub', 'Thuckalay', 'Suchindram', 'Kavalkinaru Junction']],
];
export const STEPS = [
  { title: 'Submit Trip Details', text: 'Fill the quotation form above or send a 10-second WhatsApp audio / message with your pickup street, destination, and goods type.', tag: 'Instant Estimate', cls: 'orange' },
  { title: 'Owner Calls to Confirm', text: '{owner} will call you back within 15 minutes to confirm the exact pickup timing, toll details, and lock the truck on schedule.', tag: 'Zero Advance Required', cls: 'navy', green: true },
  { title: 'Punctual Loading & Transit', text: 'Tata Ace arrives at your doorstep or shop. Goods loaded securely with tie-downs and waterproof covers. Delivered safely to destination.', tag: 'Pay After Satisfied Unloading', cls: 'pale' },
];
// SAMPLE testimonials from the design — hidden unless VITE_SHOW_SAMPLE_CONTENT=true. Replace with real, permissioned reviews.
export const REVIEWS = [
  { text: 'We regularly move electrical pipe bundles and fittings from Palayamkottai depot to construction sites in Tuticorin. Muthiah arrives 15 minutes before the requested time and drives very responsibly. Most reliable Tata Ace driver in Nellai.', who: 'Murugan Hardware & Electricals', where: 'Palayamkottai, Tirunelveli' },
  { text: 'Shifted my 1 BHK house from NGO Colony to Thoothukudi. We were worried because of sudden evening rain, but the Tata Ace was completely covered with heavy double tarpaulin. Not a single carton got wet. Highly recommended!', who: 'S. Rajendran, SBI Officer', where: 'NGO Colony, Tirunelveli' },
  { text: 'Every Tuesday we transport 50 bunches of banana and vegetable crates from Ambasamudram to Nagercoil Vadasery mandi. Driver is ready at 4:30 AM sharp. Honest pricing with zero bargaining hassle.', who: 'Karthik Agri Traders', where: 'Ambasamudram Road' },
];
export const FAQ = [
  ['How is the Tata Ace transport fare calculated?', 'The fare depends on the route and distance, the load, and whether you need a loading helper. Tolls are charged as per actuals. Use the estimator above for an indication; the driver confirms the final amount on the call before you lock the truck.'],
  ['Do you provide loading and unloading labor support?', `Yes, a loading helper can be added to any trip (the estimator shows the helper charge). Tell us the floor and access details in the landmark box so the right help is sent.`],
  ['What happens if it rains during transit?', 'Every trip is covered with an industrial tarpaulin and a cargo net at no extra charge.'],
  ['Is early morning or night highway transit available?', 'Early-morning runs (from 4:30 AM) are available for agri and mandi loads. Night highway trips depend on driver availability, so please confirm on the call.'],
  ['How do I pay for the trip?', 'No advance is needed to request a booking. Payment is made directly to the driver after your goods are unloaded to your satisfaction.'],
];
