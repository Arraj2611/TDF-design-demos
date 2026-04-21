import type { ReactNode } from 'react';

export type Lang = 'en' | 'mr';

// ---- shared atom types (match the bundle verbatim) ----

export interface Stat {
  n: string;
  l: string;
}

export interface Filter {
  k: string;
  l: string;
  c: number;
}

export interface Logo {
  m: string;
  n: string;
  c: string;
  k: string;
  id: string;
}

export interface TimelineEntry {
  y: string;
  c: string;
  t: string;
  a?: boolean;
}

export interface SidebarItem {
  y: string;
  t: string;
}

export interface FacilityItem {
  num: string;
  name: string;
  tag: string;
  desc: string;
  stats: Stat[];
  tests: string[];
}

export interface Highlight {
  k: string;
  v: string;
}

export interface NewsFeature {
  cat: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
}

export interface NewsSmall {
  cat: string;
  title: string;
  ph: string;
}

export interface NewsSecondary {
  d: string;
  m: string;
  cat: string;
  t: string;
}

export interface EventItem {
  featured?: boolean;
  d: string;
  m: string;
  type: string;
  title: string;
  sub: string;
  venue: string;
  cta: string;
}

// ---- section interfaces ----

export interface Nav {
  about: string;
  members: string;
  board: string;
  facilities: string;
  news: string;
  events: string;
  solapur: string;
  contact: string;
  join: string;
}

export interface Top {
  est: string;
  phone: string;
  email: string;
}

export interface Hero {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  stats: Stat[];
  corner: ReactNode;
}

export interface AboutSidebar {
  title: string;
  items: SidebarItem[];
}

export interface About {
  kicker: string;
  num: string;
  title: ReactNode;
  lede: string;
  body: string[];
  sidebar: AboutSidebar;
  timelineTitle: string;
  timelineMeta: string;
  timeline: TimelineEntry[];
}

export interface Facilities {
  kicker: string;
  num: string;
  title: ReactNode;
  lede: string;
  items: FacilityItem[];
}

export interface Solapur {
  kicker: string;
  num: string;
  title: ReactNode;
  lede: string;
  facts: Stat[];
  paras: string[];
  highlights: Highlight[];
}

export interface Members {
  kicker: string;
  num: string;
  title: ReactNode;
  lede: string;
  stats: Stat[];
  filters: Filter[];
  logos: Logo[];
}

export interface CommitteeTabs {
  board: string;
  committee: string;
}

export interface Committee {
  kicker: string;
  num: string;
  title: ReactNode;
  lede: string;
  tabs: CommitteeTabs;
  boardNote: string;
  committeeNote: string;
}

export interface News {
  kicker: string;
  num: string;
  title: ReactNode;
  lede: string;
  feature: NewsFeature;
  small: NewsSmall[];
  secondary: NewsSecondary[];
}

export interface EventsTabs {
  upcoming: string;
  past: string;
}

export interface Events {
  kicker: string;
  num: string;
  title: ReactNode;
  lede: string;
  tabs: EventsTabs;
  upcoming: EventItem[];
  past: EventItem[];
}

export interface Contact {
  kicker: string;
  num: string;
  title: ReactNode;
  lede: string;
}

export interface Foot {
  tag: string;
  explore: string;
  resources: string;
  connect: string;
  resourceItems: string[];
  connectItems: string[];
  copy: string;
  right: string[];
}

export interface Content {
  nav: Nav;
  top: Top;
  hero: Hero;
  about: About;
  facilities: Facilities;
  solapur: Solapur;
  members: Members;
  committee: Committee;
  news: News;
  events: Events;
  contact: Contact;
  foot: Foot;
}

// ---- data (ported verbatim from bundle content.jsx) ----

const en: Content = {
  nav: {
    about: 'About TDF',
    members: 'Members',
    board: 'Board & Committee',
    facilities: 'Facilities',
    news: 'Newsletter',
    events: 'Events',
    solapur: 'About Solapur',
    contact: 'Contact',
    join: 'Become a member',
  },
  top: {
    est: 'Est. 2002 · Solapur, Maharashtra',
    phone: '+91 96991 23418',
    email: 'tdf.textile@gmail.com',
  },
  hero: {
    eyebrow: 'Textile Development Foundation',
    title: ["Weaving Solapur's", <em key="i">industrial future</em>, ', one loom at a time.'],
    sub: "A member-driven association of power loom owners, mill operators, and textile entrepreneurs. Founded to modernise, advocate for, and globally position the city once known as Girangaon — the Mill Town of the Deccan.",
    stats: [
      { n: '1995', l: 'Founded by young Solapur industrialists' },
      { n: '15,000+', l: 'Power looms active in the city today' },
      { n: '240+', l: 'Member units across spinning, weaving, processing' },
      { n: '2019', l: 'First international expo held in Solapur' },
    ],
    corner: ['Lat 17.6599° N', 'Lng 75.9064° E', <span key="b" className="big">Solapur</span>],
  },
  about: {
    kicker: 'About Us',
    num: '01',
    title: ['From ', <em key="i">Girangaon</em>, ' to a global textile hub.'],
    lede: 'Founded in 1995 by a group of young, like-minded textile industrialists, TDF exists to transform the Solapur power loom sector — from traditional practices with thin margins into a progressive, growth-oriented, globally competitive industry.',
    body: [
      'The Solapur power loom industry has a rich legacy of craftsmanship, artistic excellence, and family-run enterprise. Yet for decades it punched below its weight — not from lack of capability, but from gaps in marketing, modern management, and technological adaptation. In 1995, a group of young textile industrialists came together to do something about it, and the Textile Development Foundation was born.',
      'Since then TDF has worked through industry interactions, seminars, symposiums, workshops, training, and exposure visits to advanced textile clusters in India and abroad. The aim has always been the same — broaden perspectives and encourage the adoption of modern technology and management techniques across member units.',
      'In 2019, TDF took a bold step: organising an international-level exhibition in Solapur despite no air connectivity and vocal skepticism. The Vibrant Terry Towel Expo & Summit 2019 brought dignitaries, manufacturers, traders, buyers, and international delegates onto one platform. It was a turning point — Solapur went from regional mill town to recognised textile hub.',
      "Now we move toward Vibrant Terry Towel Expo & Summit 2026 with greater confidence and ambition. The impact spills far beyond textiles — into transport, hospitality, tourism, IT and services, enriching the cultural and economic fabric of the region. The path is clear: every industrialist who engages with TDF's programmes strengthens the cluster as a whole.",
    ],
    sidebar: {
      title: 'Key Milestones',
      items: [
        { y: '1761', t: 'Peshwa invites weaver communities to Solapur.' },
        { y: '1877', t: 'Solapur Spinning & Weaving Mills founded.' },
        { y: '1984', t: 'Diversification into terry towels begins.' },
        { y: '1995', t: 'Textile Development Foundation established.' },
        { y: '2019', t: 'Vibrant Terry Towel Expo & Summit 2019 held.' },
        { y: '2026', t: 'VTTES 2026 — scaling international participation.' },
      ],
    },
    timelineTitle: "From the Peshwa's patronage to the world stage",
    timelineMeta: 'Scroll →',
    timeline: [
      { y: '1761', c: 'Patronage', t: 'Koshtis, Salis & Sangars settle in Solapur under Peshwa Madhavrao-I.' },
      { y: '1877', c: 'First Mill', t: 'Seth Morarji Gokuldas founds Solapur Spinning & Weaving Mills.', a: true },
      { y: '1925', c: 'Co-operation', t: 'Co-operative Societies Act rescues handloom owners from moneylenders.' },
      { y: '1962', c: 'Federation', t: "Federation of weavers' co-operatives set up." },
      { y: '1980', c: 'MIDC Era', t: 'Power loom units begin shifting to MIDC industrial estate.', a: true },
      { y: '1984', c: 'Terry Towels', t: 'Kshirsagar family diversifies into terry towel production on four looms.' },
      { y: '1992', c: 'Peak', t: "Textile industry's golden age concludes; ₹650 cr USSR export order era." },
      { y: '1995', c: 'TDF Founded', t: 'Young industrialists establish Textile Development Foundation.', a: true },
      { y: '2005', c: 'Capacity', t: 'Seminars, workshops and exposure visits become regular programming.' },
      { y: '2019', c: 'Going International', t: 'Vibrant Terry Towel Expo & Summit 2019 puts Solapur on the world map.', a: true },
      { y: '2026', c: 'The Next Chapter', t: 'VTTES 2026 — scaling global participation and business opportunities.', a: true },
    ],
  },
  facilities: {
    kicker: 'Facilities',
    num: '03',
    title: ['Five centres. ', <em key="i">One campus.</em>],
    lede: 'Shared infrastructure that individual units could not afford alone — a testing laboratory, a design studio, a training floor, and (equally importantly) a game zone and recreational lounge where the cluster actually socialises, networks, and cuts deals over chai.',
    items: [
      {
        num: 'a',
        name: 'Textile Testing Laboratory',
        tag: 'NABL · Ready',
        desc: 'Fibre, yarn and fabric testing under IS, ISO and AATCC protocols. Bundles of raw cotton to finished terry — colour fastness, GSM, tensile strength, shrinkage, absorbency, pH.',
        stats: [
          { n: '38', l: 'Test standards' },
          { n: '24 hr', l: 'Turnaround' },
          { n: '₹300+', l: 'Members rate / test' },
        ],
        tests: [
          'Colour fastness (wash, rub, light)',
          'GSM & thread count',
          'Tensile & tear strength',
          'Water absorbency (terry)',
          'Dimensional stability',
          'pH & residual alkalinity',
        ],
      },
      {
        num: 'b',
        name: 'Textile Design Centre',
        tag: 'CAD · Jacquard',
        desc: "In-house studio for original motifs, colourways and weave structures. Dobby & jacquard card punching, CAD simulation, buyer sample development — so Solapur no longer borrows Surat's designs.",
        stats: [
          { n: '6', l: 'Design stations' },
          { n: '2,400+', l: 'Motifs archived' },
          { n: '72 hr', l: 'Sample-to-loom' },
        ],
        tests: [
          'Original motif development',
          'CAD weave simulation',
          'Jacquard card punching',
          'Dobby pattern libraries',
          'Buyer-specific sampling',
          'Trend & colourway briefs',
        ],
      },
      {
        num: 'c',
        name: 'Textile Training Centre',
        tag: 'Skill India · Affiliated',
        desc: 'Hands-on courses for loom operators, fitters, supervisors, and entrepreneurs. Residential batches with industry placement — building the skilled workforce the cluster desperately needs.',
        stats: [
          { n: '12', l: 'Course modules' },
          { n: '1,800+', l: 'Alumni placed' },
          { n: '96%', l: 'Placement rate' },
        ],
        tests: [
          'Power loom operator (90 day)',
          'Loom fixer & mechanic (120 day)',
          'Supervisor cum quality checker',
          'Dyeing & finishing assistant',
          'Export documentation',
          'Entrepreneurship bootcamp',
        ],
      },
      {
        num: 'd',
        name: 'Game Zone',
        tag: 'Open · 16:00–22:00',
        desc: 'Carrom, table tennis, snooker, and a four-board chess corner. Built for the next generation — sons, daughters, and second-generation entrepreneurs who grew up in our mills — to keep them connected to the cluster after college.',
        stats: [
          { n: '4', l: 'Snooker tables' },
          { n: '6', l: 'Carrom boards' },
          { n: '240', l: 'Youth members' },
        ],
        tests: [
          'Snooker (English & pool)',
          'Table tennis — two tables',
          'Carrom — weekly tournaments',
          'Chess corner',
          'Foosball & air hockey',
          'Youth industry mixer — first Saturday',
        ],
      },
      {
        num: 'e',
        name: "Members' Recreational Zone",
        tag: 'Members only',
        desc: 'A quieter floor above the game zone — card tables, a reading room with trade journals, a lending library, and a covered terrace for evening gatherings. Where buyer meetings become friendships and cluster decisions actually get made.',
        stats: [
          { n: '80', l: 'Seat reading room' },
          { n: '12', l: 'Card & rummy tables' },
          { n: 'Daily', l: 'Evening chai' },
        ],
        tests: [
          'Card & rummy tables',
          'Trade journal reading room',
          'Lending library (1,200 titles)',
          'Covered evening terrace',
          'Members-only dining hall',
          'Private meeting rooms (book ahead)',
        ],
      },
    ],
  },
  solapur: {
    kicker: 'About Solapur',
    num: '08',
    title: ['The city of ', <em key="i">chaddars, towels & the Siddheshwar fair.</em>],
    lede: "Solapur sits at the crossroads of Maharashtra, Karnataka and Telangana — a 430-year-old weaving centre that became, by turns, the Deccan's mill town, India's chaddar capital, and today the world's largest terry-towel cluster outside Gujarat. Understanding the city is the first step to understanding TDF.",
    facts: [
      { n: '1.1 M', l: 'City population' },
      { n: '17.66° N', l: 'Latitude · 458m ASL' },
      { n: '₹8,400 Cr', l: 'Annual textile turnover' },
      { n: '35%', l: "India's chaddar output" },
    ],
    paras: [
      "Founded around 1590 as a fortified garrison on the Bhima river basin, the city's name — Solapur, from the 16 villages (solah pur) that were said to have merged into it — has been recorded in Bahmani, Adil Shahi, Mughal, Nizam and Peshwa chronicles. Its fort still stands on the eastern edge of the old town.",
      'The weaver communities — Padmashali, Koshti, Devang Sali, Sangar — arrived in successive waves from Andhra and Karnataka under Peshwa patronage between 1761 and 1790. Their chaddars, dulais, dhotis and pagotis clothed the Deccan for a century before the first composite mill arrived.',
      "The Siddheshwar Yatra — a week-long January fair honouring the 12th-century yogi Siddharameshwar — is one of Maharashtra's largest: 800,000 pilgrims, a week of kirtan, and a rural textile market that still sets the cluster's annual pricing. Solapur is also the birthplace of Mahadaji Shinde's cavalry, Vishnubuva Brahmachari's social reform, and the nationwide 1930 martyr salute to Mallappa Dhanshetti.",
    ],
    highlights: [
      { k: 'Geography', v: 'Deccan plateau · semi-arid · Bhima basin · 275 km SE of Pune, 460 km W of Hyderabad.' },
      { k: 'Languages', v: 'Marathi (official), Kannada, Telugu, Dakhni Urdu — all spoken daily in the mill wards.' },
      { k: 'Landmarks', v: 'Siddheshwar temple tank · Bhuikot Fort · Hutatma Smarak · Solapur University (1969).' },
      { k: 'Cuisine', v: 'Bhakri, pithla, shenga chutney, mutton rassa, kadaknath biryani. Chai every two hours.' },
      { k: 'Connectivity', v: 'Mumbai–Chennai rail mainline · NH-65 · Solapur Airport (domestic, commissioned 2023).' },
      { k: 'Industries', v: 'Textiles · beedi (second-largest producer in India) · oilseeds · cement · sugar.' },
    ],
  },
  members: {
    kicker: 'Members',
    num: '02',
    title: ['240 units. ', <em key="i">One voice.</em>],
    lede: "From family power loom workshops in Hirachand Nagar to composite mills on the MIDC estate — our membership represents every link in Solapur's textile value chain.",
    stats: [
      { n: '240', l: 'Member units' },
      { n: '62', l: 'Exporter members' },
      { n: '18,400', l: 'Workers employed collectively' },
      { n: '₹4,200 Cr', l: 'Combined annual turnover' },
    ],
    filters: [
      { k: 'all', l: 'All members', c: 240 },
      { k: 'towel', l: 'Terry Towels', c: 128 },
      { k: 'chaddar', l: 'Chaddars', c: 44 },
      { k: 'spinning', l: 'Spinning', c: 22 },
      { k: 'processing', l: 'Processing & Dyeing', c: 31 },
      { k: 'export', l: 'Exporters', c: 62 },
    ],
    logos: [
      { m: 'SM', n: 'Shivanjali Textiles', c: 'Terry · Export', k: 'towel', id: 'TDF/01' },
      { m: 'KT', n: 'Kshirsagar Terry Mills', c: 'Terry Towels', k: 'towel', id: 'TDF/02' },
      { m: 'VC', n: 'Vishnu Chaddar Co.', c: 'Chaddars', k: 'chaddar', id: 'TDF/04' },
      { m: 'AY', n: 'Adinath Yarn Spinners', c: 'Spinning', k: 'spinning', id: 'TDF/07' },
      { m: 'SW', n: 'Swastik Weaves', c: 'Terry · Jacquard', k: 'towel', id: 'TDF/09' },
      { m: 'LK', n: 'Laxmi Karagiri Mills', c: 'Chaddars', k: 'chaddar', id: 'TDF/11' },
      { m: 'NT', n: 'Neelkanth Textiles', c: 'Processing', k: 'processing', id: 'TDF/12' },
      { m: 'MG', n: 'Morarji Group', c: 'Composite · Export', k: 'export', id: 'TDF/14' },
      { m: 'RD', n: 'Raj Dyeing Works', c: 'Processing', k: 'processing', id: 'TDF/17' },
      { m: 'JR', n: 'Jamshree Ratansingji', c: 'Heritage · Chaddar', k: 'chaddar', id: 'TDF/19' },
      { m: 'PT', n: 'Patil Terry Expo', c: 'Export · Terry', k: 'export', id: 'TDF/21' },
      { m: 'DS', n: 'Deshmukh Spinners', c: 'Spinning', k: 'spinning', id: 'TDF/23' },
      { m: 'SB', n: 'Sahyadri Broadlooms', c: 'Terry Towels', k: 'towel', id: 'TDF/26' },
      { m: 'GT', n: 'Godavari Textile Mills', c: 'Composite', k: 'export', id: 'TDF/28' },
      { m: 'HP', n: 'Hiranand Processing', c: 'Processing & Dye', k: 'processing', id: 'TDF/31' },
      { m: 'MN', n: 'Maratha Weaving Co.', c: 'Chaddars', k: 'chaddar', id: 'TDF/33' },
      { m: 'BT', n: 'Bhimashankar Terry', c: 'Terry · Export', k: 'export', id: 'TDF/36' },
      { m: 'SV', n: 'Shiv Vastra Udyog', c: 'Terry Towels', k: 'towel', id: 'TDF/39' },
    ],
  },
  committee: {
    kicker: 'Board & Committee',
    num: '03',
    title: ['The people ', <em key="i">behind the foundation.</em>],
    lede: 'An elected Board of Directors sets direction; a Working Committee of industry veterans, second-generation entrepreneurs, and technical specialists runs day-to-day policy, advocacy, and member services. Current term: 2024–2027.',
    tabs: { board: 'Board of Directors', committee: 'Working Committee' },
    boardNote: 'Elected every three years by the General Body. Oversees finance, strategy, and statutory compliance.',
    committeeNote: 'Appointed by the Board. Meets monthly; runs member services, events, facilities, advocacy.',
  },
  news: {
    kicker: 'TDF Newsletter',
    num: '04',
    title: ['From the ', <em key="i">shop floor</em>, ' to policy corridors.'],
    lede: 'Curated reporting on GST, power tariffs, export duties, technology upgrades, and the stories of our member units. Updated weekly by the TDF secretariat.',
    feature: {
      cat: 'Featured · Policy',
      date: '12 April 2026',
      title: "Maharashtra's ₹240 cr textile package: what it means for Solapur power loom owners",
      excerpt: "The state cabinet's revised interest subsidy scheme — now extended to units under 25 HP — could cover nearly 82% of TDF's active membership. We break down eligibility, the application window, and the three catches that every owner should read before signing.",
      tag: 'Exclusive',
    },
    small: [
      { cat: 'Market', title: 'Cotton yarn prices ease 4.2% as monsoon forecasts firm up', ph: "Yarn Merchants' Assn. data" },
      { cat: 'Technology', title: 'Rapier vs. air-jet: what 40 Solapur units learned in 2025', ph: 'Case study · 8 min read' },
    ],
    secondary: [
      { d: '09', m: 'Apr', cat: 'Export', t: 'USA buyer delegation visit to Solapur terry clusters confirmed for June.' },
      { d: '02', m: 'Apr', cat: 'Policy', t: 'GST rationalisation on bed linen & terry: TDF submits representation to GoI.' },
      { d: '28', m: 'Mar', cat: 'Power', t: 'MSEDCL tariff revision; industrial slab jumps by ₹0.38/unit from April.' },
      { d: '24', m: 'Mar', cat: 'Training', t: 'Three-day Jacquard maintenance workshop concludes at TDF centre.' },
      { d: '19', m: 'Mar', cat: 'Finance', t: 'SIDBI opens dedicated credit line for loom modernisation under TUFS.' },
      { d: '14', m: 'Mar', cat: 'Awards', t: 'Patil Terry Expo wins national export excellence award for FY25.' },
    ],
  },
  events: {
    kicker: 'Events',
    num: '05',
    title: ["What we're ", <em key="i">hosting next.</em>],
    lede: 'Expos, buyer-seller meets, technical seminars, and factory visits. Members register free; the wider trade and public are warmly welcomed.',
    tabs: { upcoming: 'Current & Upcoming', past: 'Past Events' },
    upcoming: [
      {
        featured: true,
        d: '18',
        m: 'Nov 2026',
        type: 'Flagship · International Summit',
        title: 'Vibrant Terry Towel Expo & Summit 2026',
        sub: 'Three days. 200+ exhibitors. 40 countries. Solapur on the world textile map.',
        venue: 'Siddheshwar Smarak Mandir Ground\nSolapur, Maharashtra',
        cta: 'Register →',
      },
      {
        d: '22',
        m: 'May',
        type: 'Seminar',
        title: 'GST & export documentation refresher',
        sub: 'With Chartered Accountant Ravindra Hegde & EPC Mumbai representatives.',
        venue: 'TDF Training Centre, Hotgi Road',
        cta: 'RSVP',
      },
      {
        d: '07',
        m: 'Jun',
        type: 'Buyer-Seller Meet',
        title: 'USA terry towel buyer delegation',
        sub: 'Curated one-on-one meetings. Pre-registration & sample catalogue required.',
        venue: 'Hotel Balaji Sarovar Premiere',
        cta: 'Apply',
      },
      {
        d: '19',
        m: 'Jul',
        type: 'Technical Workshop',
        title: 'Loom modernisation under TUFS — site clinic',
        sub: 'Hands-on walkthrough at two member units with SITRA specialists.',
        venue: 'MIDC Chincholi, Solapur',
        cta: 'Join',
      },
      {
        d: '03',
        m: 'Sep',
        type: 'Advocacy',
        title: 'Quarterly meeting with District Industries Centre',
        sub: 'Agenda: power tariff, MSME credit, octroi review, ETP compliance.',
        venue: 'DIC Office, Solapur Collectorate',
        cta: 'Open to members',
      },
    ],
    past: [
      {
        d: '14',
        m: 'Mar 2026',
        type: 'Conclave',
        title: 'Solapur Terry & Chaddar Conclave 2026',
        sub: 'Fourth edition. 1,100 delegates, 46 speaking sessions across two halls.',
        venue: 'Hotel Tripursundari, Solapur',
        cta: 'View gallery →',
      },
      {
        d: '28',
        m: 'Feb 2026',
        type: 'Training',
        title: 'Jacquard card punching — three-day intensive',
        sub: 'Conducted by Coimbatore-based master weavers; 42 participants from member units.',
        venue: 'TDF Training Centre, Hotgi Road',
        cta: 'Report',
      },
      {
        d: '09',
        m: 'Jan 2026',
        type: 'Delegation',
        title: 'Incoming Uzbek buyer-seller meet',
        sub: 'Eleven buyers. ₹48 cr of indicative orders across 17 member units.',
        venue: 'Hotel Balaji Sarovar',
        cta: 'Summary',
      },
      {
        d: '22',
        m: 'Nov 2025',
        type: 'Advocacy',
        title: 'Pre-budget memorandum to Govt. of Maharashtra',
        sub: 'Joint submission with Solapur Zilla Yantramag Dharak Sangh on power subsidy & GST.',
        venue: 'Mantralaya, Mumbai',
        cta: 'Read',
      },
      {
        d: '08',
        m: 'Oct 2025',
        type: 'Expo',
        title: 'Texfair Solapur — 7th edition',
        sub: '92 exhibitors, 6,400 footfalls, ₹12 cr spot orders. Terry towel pavilion sold out.',
        venue: 'Park Chowk Ground',
        cta: 'Gallery',
      },
      {
        d: '17',
        m: 'Aug 2025',
        type: 'Study Tour',
        title: 'Member delegation to Heimtextil India, Delhi',
        sub: '24 mill owners; two MoUs signed with European home-textile agents.',
        venue: 'Pragati Maidan, New Delhi',
        cta: 'Highlights',
      },
    ],
  },
  contact: {
    kicker: 'Contact Us',
    num: '06',
    title: ['Visit us in the ', <em key="i">textile city.</em>],
    lede: 'Our secretariat is housed on Hotgi Road, a short walk from the MIDC estate where much of our membership operates. Walk-ins are welcome between 10:30 and 17:30 on working days.',
  },
  foot: {
    tag: "An association of power loom owners, mill operators, and textile entrepreneurs working for the collective modernisation of Solapur's textile industry.",
    explore: 'Explore',
    resources: 'Resources',
    connect: 'Connect',
    resourceItems: ['Policy briefs', 'Member handbook', 'Annual report 2024–25', 'Press kit'],
    connectItems: ['LinkedIn', 'YouTube', 'WhatsApp updates', 'Newsletter'],
    copy: '© 2026 Textile Development Foundation, Solapur. Regd. under the Societies Act.',
    right: ['Privacy', 'Terms', 'Sitemap'],
  },
};

const mr: Content = {
  nav: {
    about: 'TDF बद्दल',
    members: 'सदस्य',
    board: 'संचालक व कार्यकारिणी',
    facilities: 'सुविधा',
    news: 'वृत्तपत्र',
    events: 'कार्यक्रम',
    solapur: 'सोलापूरबद्दल',
    contact: 'संपर्क',
    join: 'सदस्य व्हा',
  },
  top: {
    est: 'स्थापना २००२ · सोलापूर, महाराष्ट्र',
    phone: '+९१ ९६९९१ २३४१८',
    email: 'tdf.textile@gmail.com',
  },
  hero: {
    eyebrow: 'टेक्सटाईल डेव्हलपमेंट फाउंडेशन',
    title: ['सोलापूरच्या ', <em key="i">औद्योगिक भविष्याची</em>, ' वीण.'],
    sub: 'पॉवरलूम मालक, गिरणी चालक आणि वस्त्रोद्योग उद्योजकांची सदस्य-चालित संघटना. गिरणगाव म्हणून ओळखल्या जाणाऱ्या या शहराचे आधुनिकीकरण, हक्कांसाठी आवाज, आणि जागतिक ओळख निर्माण करण्यासाठी स्थापन.',
    stats: [
      { n: '१९९५', l: 'सोलापूरच्या युवा उद्योजकांकडून स्थापन' },
      { n: '१५,०००+', l: 'शहरात सध्या कार्यरत पॉवरलूम' },
      { n: '२४०+', l: 'कताई, विणकाम, प्रक्रिया क्षेत्रातील सदस्य' },
      { n: '२०१९', l: 'सोलापुरात पहिले आंतरराष्ट्रीय एक्स्पो' },
    ],
    corner: ['अक्षांश १७.६५९९° उ', 'रेखांश ७५.९०६४° पू', <span key="b" className="big">सोलापूर</span>],
  },
  about: {
    kicker: 'आमच्याबद्दल',
    num: '०१',
    title: [<em key="i">चादरी</em>, ' आणि टेरी टॉवेलचे शहर.'],
    lede: 'टेक्सटाईल डेव्हलपमेंट फाउंडेशन ही सोलापूर शहरातील वस्त्रोद्योगाच्या विकासासाठी कार्यरत असलेली संस्था आहे — शासकीय धोरणांची जाणीव, आधुनिकीकरण, गुणवत्ता नियंत्रण, विपणन यावर कार्यशाळा, आणि पॉवरलूम क्षेत्रासाठी सामूहिक आवाज.',
    body: [
      'पेशवा माधवराव-१ (१७६१–१७७२) यांच्या काळात कोष्टी, साळी व सांगर या विणकर समुदायांना जमीन व राजाश्रयाचे आश्वासन देऊन सोलापुरात आणले गेले. त्यांच्या चादरी, दुलई, धोतर, पागोटी यांची ख्याती संपूर्ण दक्खन व निजाम प्रांतात पसरली.',
      'याच परंपरेमुळे मुंबईचे सेठ मोरारजी गोकुळदास यांनी मार्च १८७७ मध्ये सोलापूर स्पिनिंग अँड वीव्हिंग मिल सुरू केली. नरसिंग गिरजी, लक्ष्मी कॉटन (१८९८), विष्णू कॉटन (१९०८), जमश्री रत्नसिंगजी (१९०९) अशा कंपोझिट गिरण्या लगेच आल्या — आणि शहराला नाव मिळाले: गिरणगाव.',
      'आज फाउंडेशन हा वारसा पुढे नेत आहे. पॉवरलूम क्षेत्राचे प्रतिनिधित्व, शासनाशी समन्वय, सदस्यांमध्ये एकता, आणि मालक-कामगार दोघांचेही कल्याण — हे आमचे कार्य. पुढील अध्याय जागतिक आहे, आणि तो आपण मिळून लिहित आहोत.',
    ],
    sidebar: {
      title: 'महत्त्वाचे टप्पे',
      items: [
        { y: '१७६१', t: 'पेशव्यांकडून विणकर समुदायांना सोलापुरात आमंत्रण.' },
        { y: '१८७७', t: 'सोलापूर स्पिनिंग अँड वीव्हिंग मिलची स्थापना.' },
        { y: '१९२५', t: 'सहकारी कायदा; हातमाग मालकांचे संघटन.' },
        { y: '१९६२', t: 'विणकर सहकारी महासंघाची स्थापना.' },
        { y: '१९८४', t: 'टेरी टॉवेलकडे वाटचाल सुरू.' },
        { y: '२००२', t: 'टेक्सटाईल डेव्हलपमेंट फाउंडेशनची स्थापना.' },
        { y: '२०२६', t: 'व्हायब्रंट टेरी टॉवेल एक्स्पो — जागतिक पदार्पण.' },
      ],
    },
    timelineTitle: 'मागावर दीड शतकाचा प्रवास',
    timelineMeta: 'स्क्रोल करा →',
    timeline: [
      { y: '१७६१', c: 'राजाश्रय', t: 'पेशवा माधवराव-१ यांच्या काळात कोष्टी, साळी व सांगर सोलापुरात स्थायिक.' },
      { y: '१८७७', c: 'पहिली गिरणी', t: 'सेठ मोरारजी गोकुळदास यांनी सोलापूर स्पिनिंग मिल सुरू केली.', a: true },
      { y: '१८९८', c: 'विस्तार', t: 'लक्ष्मी कॉटन मिलची स्थापना.' },
      { y: '१९२५', c: 'सहकार', t: 'सहकारी कायद्यामुळे हातमाग मालकांना सावकारांपासून संरक्षण.' },
      { y: '१९४९', c: 'वित्त', t: 'सोलापूर जिल्हा औद्योगिक सहकारी बँकेची स्थापना.' },
      { y: '१९६२', c: 'महासंघ', t: 'विणकर सहकारी महासंघ स्थापन.' },
      { y: '१९६४', c: 'सहकारी गिरण्या', t: 'सोलापूर सहकारी स्पिनिंग मिल कार्यान्वित.' },
      { y: '१९८०', c: 'MIDC युग', t: 'पॉवरलूम युनिट्स MIDC औद्योगिक वसाहतीकडे.', a: true },
      { y: '१९८४', c: 'टेरी टॉवेल', t: 'क्षीरसागर कुटुंबाने चार मागांवर टेरी टॉवेल उत्पादन सुरू केले.' },
      { y: '१९९२', c: 'शिखर', t: 'वस्त्रोद्योगाचे सुवर्णयुग संपले; ₹६५० कोटींचा USSR निर्यात करार काळ.' },
      { y: '२००२', c: 'TDF स्थापना', t: 'प्रगतिशील उद्योजकांनी टेक्सटाईल डेव्हलपमेंट फाउंडेशनची स्थापना केली.', a: true },
      { y: '२०२६', c: 'जागतिक पदार्पण', t: 'व्हायब्रंट टेरी टॉवेल एक्स्पो अँड समिट २०२६ — सोलापूर जगाच्या नकाशावर.', a: true },
    ],
  },
  members: {
    kicker: 'सदस्य',
    num: '०२',
    title: ['२४० युनिट्स. ', <em key="i">एक आवाज.</em>],
    lede: 'हिराचंद नगरच्या कुटुंब-आधारित पॉवरलूम कारखान्यांपासून MIDC मधील कंपोझिट मिलपर्यंत — आमची सदस्यता सोलापूरच्या वस्त्रोद्योगाच्या प्रत्येक दुव्याचे प्रतिनिधित्व करते.',
    stats: [
      { n: '२४०', l: 'सदस्य युनिट्स' },
      { n: '६२', l: 'निर्यातदार सदस्य' },
      { n: '१८,४००', l: 'एकूण कामगार' },
      { n: '₹४,२०० कोटी', l: 'एकत्रित वार्षिक उलाढाल' },
    ],
    filters: [
      { k: 'all', l: 'सर्व सदस्य', c: 240 },
      { k: 'towel', l: 'टेरी टॉवेल', c: 128 },
      { k: 'chaddar', l: 'चादरी', c: 44 },
      { k: 'spinning', l: 'कताई', c: 22 },
      { k: 'processing', l: 'प्रक्रिया व रंगाई', c: 31 },
      { k: 'export', l: 'निर्यातदार', c: 62 },
    ],
    logos: [
      { m: 'SM', n: 'शिवांजली टेक्सटाईल्स', c: 'टेरी · निर्यात', k: 'towel', id: 'TDF/०१' },
      { m: 'KT', n: 'क्षीरसागर टेरी मिल्स', c: 'टेरी टॉवेल', k: 'towel', id: 'TDF/०२' },
      { m: 'VC', n: 'विष्णू चादर कंपनी', c: 'चादरी', k: 'chaddar', id: 'TDF/०४' },
      { m: 'AY', n: 'आदिनाथ यार्न स्पिनर्स', c: 'कताई', k: 'spinning', id: 'TDF/०७' },
      { m: 'SW', n: 'स्वस्तिक वीव्हज्', c: 'टेरी · जॅकार्ड', k: 'towel', id: 'TDF/०९' },
      { m: 'LK', n: 'लक्ष्मी कारागिरी मिल्स', c: 'चादरी', k: 'chaddar', id: 'TDF/११' },
      { m: 'NT', n: 'नीलकंठ टेक्सटाईल्स', c: 'प्रक्रिया', k: 'processing', id: 'TDF/१२' },
      { m: 'MG', n: 'मोरारजी समूह', c: 'कंपोझिट · निर्यात', k: 'export', id: 'TDF/१४' },
      { m: 'RD', n: 'राज डाईंग वर्क्स', c: 'प्रक्रिया', k: 'processing', id: 'TDF/१७' },
      { m: 'JR', n: 'जमश्री रत्नसिंगजी', c: 'वारसा · चादर', k: 'chaddar', id: 'TDF/१९' },
      { m: 'PT', n: 'पाटील टेरी एक्स्पो', c: 'निर्यात · टेरी', k: 'export', id: 'TDF/२१' },
      { m: 'DS', n: 'देशमुख स्पिनर्स', c: 'कताई', k: 'spinning', id: 'TDF/२३' },
      { m: 'SB', n: 'सह्याद्री ब्रॉडलूम्स', c: 'टेरी टॉवेल', k: 'towel', id: 'TDF/२६' },
      { m: 'GT', n: 'गोदावरी टेक्सटाईल मिल्स', c: 'कंपोझिट', k: 'export', id: 'TDF/२८' },
      { m: 'HP', n: 'हिरानंद प्रोसेसिंग', c: 'प्रक्रिया व रंगाई', k: 'processing', id: 'TDF/३१' },
      { m: 'MN', n: 'मराठा वीव्हिंग कंपनी', c: 'चादरी', k: 'chaddar', id: 'TDF/३३' },
      { m: 'BT', n: 'भीमाशंकर टेरी', c: 'टेरी · निर्यात', k: 'export', id: 'TDF/३६' },
      { m: 'SV', n: 'शिव वस्त्र उद्योग', c: 'टेरी टॉवेल', k: 'towel', id: 'TDF/३९' },
    ],
  },
  committee: {
    kicker: 'संचालक व कार्यकारिणी',
    num: '०३',
    title: ['फाउंडेशनमागील ', <em key="i">माणसे.</em>],
    lede: 'निवडून आलेले संचालक मंडळ दिशा ठरवते; अनुभवी उद्योजक, द्वितीय-पिढीचे उद्योजक व तांत्रिक तज्ञांची कार्यकारिणी दैनंदिन धोरण, प्रतिनिधित्व व सदस्य सेवांचे काम पाहते. कार्यकाळ: २०२४–२०२७.',
    tabs: { board: 'संचालक मंडळ', committee: 'कार्यकारिणी' },
    boardNote: 'सर्वसाधारण सभेकडून दर तीन वर्षांनी निवड — अर्थ, धोरण व कायदेशीर बाबींचे पालन.',
    committeeNote: 'संचालक मंडळाकडून नियुक्ती. दर महिन्याने बैठक; सदस्य सेवा, कार्यक्रम, सुविधा, प्रतिनिधित्व.',
  },
  facilities: {
    kicker: 'सुविधा',
    num: '०४',
    title: ['पाच केंद्रे. ', <em key="i">एकच परिसर.</em>],
    lede: 'एकट्या युनिटला परवडणार नाहीत अशा सामायिक सुविधा — चाचणी प्रयोगशाळा, डिझाईन केंद्र, प्रशिक्षण मजला, आणि तितकेच महत्त्वाचे — गेम झोन आणि सदस्यांचा मनोरंजन कक्ष, जिथे क्लस्टर खरोखर भेटतो, गप्पा मारतो, आणि चहाच्या ग्लासावर निर्णय घेतो.',
    items: [
      {
        num: 'a',
        name: 'वस्त्र चाचणी प्रयोगशाळा',
        tag: 'NABL · तयार',
        desc: 'तंतू, सूत व कापडाची IS, ISO व AATCC मानकांनुसार चाचणी. कच्च्या कापसापासून तयार टेरीपर्यंत — रंगस्थिरता, GSM, ताणशक्ती, आकुंचन, शोषकता, pH.',
        stats: [
          { n: '३८', l: 'चाचणी मानके' },
          { n: '२४ तास', l: 'अहवाल कालावधी' },
          { n: '₹३००+', l: 'सदस्य दर/चाचणी' },
        ],
        tests: [
          'रंगस्थिरता (धुलाई, घर्षण, प्रकाश)',
          'GSM व सूत्रसंख्या',
          'ताण व फाड शक्ती',
          'पाणी शोषकता (टेरी)',
          'आकारमान स्थिरता',
          'pH व अवशिष्ट क्षारता',
        ],
      },
      {
        num: 'b',
        name: 'वस्त्र डिझाईन केंद्र',
        tag: 'CAD · जॅकार्ड',
        desc: 'मूळ नक्षी, रंगसंगती व विणकाम संरचनांसाठी अंतर्गत स्टुडिओ. डॉबी व जॅकार्ड कार्ड पंचिंग, CAD सिम्युलेशन, खरेदीदार सॅम्पल डेव्हलपमेंट.',
        stats: [
          { n: '६', l: 'डिझाईन स्टेशन्स' },
          { n: '२,४००+', l: 'नक्षी संग्रह' },
          { n: '७२ तास', l: 'सॅम्पल ते माग' },
        ],
        tests: [
          'मूळ नक्षी विकास',
          'CAD विणकाम सिम्युलेशन',
          'जॅकार्ड कार्ड पंचिंग',
          'डॉबी पॅटर्न लायब्ररी',
          'खरेदीदार-विशिष्ट सॅम्पलिंग',
          'ट्रेंड व रंगसंगती ब्रीफ',
        ],
      },
      {
        num: 'c',
        name: 'वस्त्र प्रशिक्षण केंद्र',
        tag: 'Skill India · संलग्न',
        desc: 'माग ऑपरेटर, फिटर, सुपरवायझर व उद्योजकांसाठी प्रात्यक्षिक अभ्यासक्रम. निवासी बॅच, उद्योग प्लेसमेंटसह.',
        stats: [
          { n: '१२', l: 'कोर्स मॉड्यूल' },
          { n: '१,८००+', l: 'माजी विद्यार्थी' },
          { n: '९६%', l: 'प्लेसमेंट दर' },
        ],
        tests: [
          'पॉवरलूम ऑपरेटर (९० दिवस)',
          'माग फिक्सर (१२० दिवस)',
          'सुपरवायझर व गुणवत्ता तपासक',
          'रंगाई व फिनिशिंग सहाय्यक',
          'निर्यात कागदपत्रे',
          'उद्योजकता बूटकॅम्प',
        ],
      },
      {
        num: 'd',
        name: 'गेम झोन',
        tag: 'दुपारी ४ ते रात्री १०',
        desc: 'कॅरम, टेबल टेनिस, स्नूकर व चार बोर्डचा बुद्धिबळ कोपरा. पुढच्या पिढीसाठी — कॉलेजनंतरही क्लस्टरशी जोडलेले राहण्यासाठी.',
        stats: [
          { n: '४', l: 'स्नूकर टेबल' },
          { n: '६', l: 'कॅरम बोर्ड' },
          { n: '२४०', l: 'युवा सदस्य' },
        ],
        tests: [
          'स्नूकर (इंग्लिश व पूल)',
          'टेबल टेनिस — दोन टेबल',
          'कॅरम — साप्ताहिक स्पर्धा',
          'बुद्धिबळ कोपरा',
          'फुसबॉल व एअर हॉकी',
          'युवा मिक्सर — पहिला शनिवार',
        ],
      },
      {
        num: 'e',
        name: 'सदस्य मनोरंजन कक्ष',
        tag: 'फक्त सदस्यांसाठी',
        desc: 'गेम झोनच्या वरचा शांत मजला — पत्त्यांची टेबले, व्यापार जर्नल वाचनालय, ग्रंथालय, व संध्याकाळच्या बैठकांसाठी छतावरचा परिसर. जिथे क्लस्टरचे निर्णय खरोखर घेतले जातात.',
        stats: [
          { n: '८०', l: 'आसन वाचनालय' },
          { n: '१२', l: 'पत्ते व रमी टेबल' },
          { n: 'दैनिक', l: 'संध्याकाळचा चहा' },
        ],
        tests: [
          'पत्ते व रमी टेबले',
          'व्यापार जर्नल वाचनालय',
          'ग्रंथालय (१,२०० पुस्तके)',
          'छतावरचा परिसर',
          'सदस्य भोजनगृह',
          'खाजगी बैठक कक्ष',
        ],
      },
    ],
  },
  news: {
    kicker: 'TDF वृत्तपत्र',
    num: '०४',
    title: ['कारखान्याच्या मजल्यावरून ', <em key="i">धोरण कक्षापर्यंत.</em>],
    lede: 'GST, वीज दर, निर्यात शुल्क, तंत्रज्ञान उन्नयन, आणि आमच्या सदस्यांच्या कथा — TDF सचिवालयाकडून दर आठवड्याला अद्ययावत.',
    feature: {
      cat: 'विशेष · धोरण',
      date: '१२ एप्रिल २०२६',
      title: 'महाराष्ट्राचे ₹२४० कोटींचे वस्त्रोद्योग पॅकेज: सोलापूर पॉवरलूम मालकांसाठी काय?',
      excerpt: 'राज्य मंत्रिमंडळाची सुधारित व्याज अनुदान योजना — आता २५ HP खालील युनिट्ससाठीही — TDF च्या जवळपास ८२% सक्रिय सदस्यांना लाभदायक. पात्रता, अर्ज कालावधी, आणि प्रत्येक मालकाने वाचावयाच्या तीन अटी.',
      tag: 'एक्सक्लूझिव्ह',
    },
    small: [
      { cat: 'बाजार', title: 'पावसाच्या अंदाजामुळे कापूस सूत्र दर ४.२% घटले', ph: 'यार्न मर्चंट्स असोसिएशन डेटा' },
      { cat: 'तंत्रज्ञान', title: 'रॅपियर की एअर-जेट: ४० सोलापूर युनिट्सचा २०२५ चा अनुभव', ph: 'केस स्टडी · ८ मिनिटे वाचन' },
    ],
    secondary: [
      { d: '०९', m: 'एप्रिल', cat: 'निर्यात', t: 'अमेरिकन खरेदीदार शिष्टमंडळाची जून मध्ये सोलापूर भेट निश्चित.' },
      { d: '०२', m: 'एप्रिल', cat: 'धोरण', t: 'बेड लिनन व टेरीवरील GST सुलभीकरण: TDF चे केंद्राला निवेदन.' },
      { d: '२८', m: 'मार्च', cat: 'वीज', t: 'MSEDCL दर सुधारणा; औद्योगिक श्रेणीत एप्रिलपासून ₹०.३८/युनिट वाढ.' },
      { d: '२४', m: 'मार्च', cat: 'प्रशिक्षण', t: 'TDF केंद्रात तीन दिवसीय जॅकार्ड देखभाल कार्यशाळा संपन्न.' },
      { d: '१९', m: 'मार्च', cat: 'वित्त', t: 'TUFS अंतर्गत SIDBI ची माग आधुनिकीकरणासाठी विशेष कर्ज योजना.' },
      { d: '१४', m: 'मार्च', cat: 'पुरस्कार', t: 'पाटील टेरी एक्स्पोला FY२५ चा राष्ट्रीय निर्यात उत्कृष्टता पुरस्कार.' },
    ],
  },
  events: {
    kicker: 'कार्यक्रम',
    num: '०६',
    title: ['आम्ही ', <em key="i">पुढे काय करत आहोत.</em>],
    lede: 'एक्स्पो, खरेदीदार-विक्रेता बैठका, तांत्रिक सेमिनार, आणि कारखाना भेटी. सदस्यांसाठी नोंदणी मोफत; व्यापारी व नागरिकांचेही स्वागत.',
    tabs: { upcoming: 'चालू व आगामी', past: 'पूर्वीचे कार्यक्रम' },
    upcoming: [
      {
        featured: true,
        d: '१८',
        m: 'नोव्हें २०२६',
        type: 'फ्लॅगशिप · आंतरराष्ट्रीय समिट',
        title: 'व्हायब्रंट टेरी टॉवेल एक्स्पो अँड समिट २०२६',
        sub: 'तीन दिवस. २००+ प्रदर्शक. ४० देश. सोलापूर जागतिक वस्त्रोद्योग नकाशावर.',
        venue: 'सिद्धेश्वर स्मारक मंदिर मैदान\nसोलापूर, महाराष्ट्र',
        cta: 'नोंदणी →',
      },
      {
        d: '२२',
        m: 'मे',
        type: 'सेमिनार',
        title: 'GST व निर्यात कागदपत्रांवर अद्ययावतीकरण',
        sub: 'सीए रवींद्र हेगडे व EPC मुंबई प्रतिनिधींसह.',
        venue: 'TDF प्रशिक्षण केंद्र, होटगी रोड',
        cta: 'नोंदवा',
      },
      {
        d: '०७',
        m: 'जून',
        type: 'खरेदीदार-विक्रेता बैठक',
        title: 'अमेरिकन टेरी टॉवेल खरेदीदार शिष्टमंडळ',
        sub: 'नियोजित वन-ऑन-वन बैठका. पूर्व-नोंदणी व नमुना कॅटलॉग आवश्यक.',
        venue: 'हॉटेल बालाजी सरोवर प्रिमिअर',
        cta: 'अर्ज करा',
      },
      {
        d: '१९',
        m: 'जुलै',
        type: 'तांत्रिक कार्यशाळा',
        title: 'TUFS अंतर्गत माग आधुनिकीकरण — साइट क्लिनिक',
        sub: 'SITRA तज्ञांसह दोन सदस्य युनिट्समध्ये प्रत्यक्ष प्रात्यक्षिक.',
        venue: 'MIDC चिंचोळी, सोलापूर',
        cta: 'सामील व्हा',
      },
      {
        d: '०३',
        m: 'सप्टें',
        type: 'प्रतिनिधित्व',
        title: 'जिल्हा उद्योग केंद्रासोबत त्रैमासिक बैठक',
        sub: 'विषय: वीज दर, MSME पत, जकात, ETP अनुपालन.',
        venue: 'DIC कार्यालय, सोलापूर जिल्हाधिकारी कार्यालय',
        cta: 'सदस्यांसाठी खुले',
      },
    ],
    past: [
      {
        d: '१४',
        m: 'मार्च २०२६',
        type: 'परिषद',
        title: 'सोलापूर टेरी व चादर परिषद २०२६',
        sub: 'चौथे वर्ष. १,१०० प्रतिनिधी, दोन सभागृहात ४६ सत्रे.',
        venue: 'हॉटेल त्रिपुरसुंदरी, सोलापूर',
        cta: 'गॅलरी →',
      },
      {
        d: '२८',
        m: 'फेब्रु २०२६',
        type: 'प्रशिक्षण',
        title: 'जॅकार्ड कार्ड पंचिंग — तीन दिवसांचे सखोल',
        sub: 'कोइम्बतूरच्या मास्टर विणकरांकडून; ४२ प्रतिनिधी.',
        venue: 'TDF प्रशिक्षण केंद्र, होटगी रोड',
        cta: 'अहवाल',
      },
      {
        d: '०९',
        m: 'जाने २०२६',
        type: 'शिष्टमंडळ',
        title: 'उझ्बेक खरेदीदार-विक्रेता बैठक',
        sub: 'अकरा खरेदीदार. १७ सदस्य युनिट्ससोबत ₹४८ कोटींचे संभाव्य ऑर्डर.',
        venue: 'हॉटेल बालाजी सरोवर',
        cta: 'सारांश',
      },
      {
        d: '२२',
        m: 'नोव्हें २०२५',
        type: 'प्रतिनिधित्व',
        title: 'महाराष्ट्र शासनाला अर्थसंकल्पपूर्व निवेदन',
        sub: 'सोलापूर जिल्हा यंत्रमाग धारक संघासोबत संयुक्त निवेदन.',
        venue: 'मंत्रालय, मुंबई',
        cta: 'वाचा',
      },
      {
        d: '०८',
        m: 'ऑक्टो २०२५',
        type: 'एक्स्पो',
        title: 'टेक्सफेअर सोलापूर — ७ वी आवृत्ती',
        sub: '९२ प्रदर्शक, ६,४०० पाहुणे, ₹१२ कोटी स्पॉट ऑर्डर.',
        venue: 'पार्क चौक मैदान',
        cta: 'गॅलरी',
      },
      {
        d: '१७',
        m: 'ऑगस्ट २०२५',
        type: 'अभ्यास दौरा',
        title: 'हेमटेक्स्टिल इंडिया दिल्ली भेट',
        sub: '२४ मिल मालक; दोन युरोपीय होम-टेक्सटाईल एजंटसोबत MoU.',
        venue: 'प्रगती मैदान, नवी दिल्ली',
        cta: 'ठळक',
      },
    ],
  },
  solapur: {
    kicker: 'सोलापूरबद्दल',
    num: '०८',
    title: ['चादर, टेरी टॉवेल आणि ', <em key="i">सिद्धेश्वर यात्रेचे शहर.</em>],
    lede: 'सोलापूर — महाराष्ट्र, कर्नाटक व तेलंगणाच्या सीमेवरचे ४३० वर्षांचे विणकरी केंद्र. दख्खनची गिरणगाव, भारताची चादर राजधानी, आणि आज गुजरातनंतरचे जगातील सर्वात मोठे टेरी टॉवेल क्लस्टर.',
    facts: [
      { n: '११ लाख', l: 'शहर लोकसंख्या' },
      { n: '१७.६६° उ', l: 'अक्षांश · ४५८ मी उंची' },
      { n: '₹८,४०० कोटी', l: 'वार्षिक वस्त्रोद्योग' },
      { n: '३५%', l: 'भारताचे चादर उत्पादन' },
    ],
    paras: [
      "सुमारे १५९० मध्ये भीमा खोऱ्यात किल्लेबंद ठाणे म्हणून स्थापन — 'सोलह पुर' (सोळा गावांचे मिलन) वरून नाव. बहामनी, आदिलशाही, मुघल, निजाम व पेशवा कागदपत्रांत याचा उल्लेख; किल्ला आजही जुन्या शहराच्या पूर्वेस उभा आहे.",
      'पद्मशाली, कोष्टी, देवांग साळी, सांगर या विणकर समाजांचे स्थलांतर पेशवा राजाश्रयाखाली १७६१ ते १७९० दरम्यान आंध्र व कर्नाटकातून झाले. त्यांच्या चादरी, दुलई, धोतर व पागोटींनी दख्खनला एक शतक वस्त्र पुरवले.',
      'सिद्धेश्वर यात्रा — १२ व्या शतकातील योगी सिद्धरामेश्वर यांच्या स्मृतीतील जानेवारीतील आठवडाभर चालणारा उत्सव — महाराष्ट्रातील सर्वात मोठ्या यात्रांपैकी एक: ८ लाख भाविक, कीर्तन, आणि क्लस्टरच्या वार्षिक किमती ठरवणारा ग्रामीण वस्त्र बाजार.',
    ],
    highlights: [
      { k: 'भूगोल', v: 'दख्खन पठार · अर्धशुष्क · भीमा खोरे · पुण्यापासून २७५ किमी, हैदराबादपासून ४६० किमी.' },
      { k: 'भाषा', v: 'मराठी, कन्नड, तेलुगू, दख्खनी उर्दू — गिरणगावात रोज बोलल्या जाणाऱ्या.' },
      { k: 'ठिकाणे', v: 'सिद्धेश्वर तलाव · भुईकोट किल्ला · हुतात्मा स्मारक · सोलापूर विद्यापीठ.' },
      { k: 'खाद्य', v: 'भाकरी, पिठलं, शेंगा चटणी, मटण रस्सा, कडकनाथ बिर्याणी. दर दोन तासांनी चहा.' },
      { k: 'दळणवळण', v: 'मुंबई–चेन्नई मुख्य रेल्वे · NH-६५ · सोलापूर विमानतळ (२०२३).' },
      { k: 'उद्योग', v: 'वस्त्रोद्योग · बीडी (देशात दुसऱ्या क्रमांकाचे उत्पादन) · तेलबिया · सिमेंट · साखर.' },
    ],
  },
  contact: {
    kicker: 'संपर्क',
    num: '०७',
    title: [<em key="i">वस्त्रनगरी</em>, ' मध्ये आमच्याकडे या.'],
    lede: 'आमचे सचिवालय होटगी रोडवर आहे, MIDC वसाहतीपासून काही मिनिटांच्या अंतरावर जिथे आमचे बहुतांश सदस्य कार्यरत आहेत. कार्यदिवशी १०:३० ते १७:३० दरम्यान भेटीस स्वागत.',
  },
  foot: {
    tag: 'सोलापूरच्या वस्त्रोद्योगाच्या सामूहिक आधुनिकीकरणासाठी कार्यरत पॉवरलूम मालक, गिरणी चालक व उद्योजकांची संघटना.',
    explore: 'विभाग',
    resources: 'साधने',
    connect: 'संपर्क',
    resourceItems: ['धोरण नोट्स', 'सदस्य हस्तपुस्तिका', 'वार्षिक अहवाल २०२४–२५', 'प्रेस किट'],
    connectItems: ['LinkedIn', 'YouTube', 'WhatsApp अद्यतने', 'वृत्तपत्र'],
    copy: '© २०२६ टेक्सटाईल डेव्हलपमेंट फाउंडेशन, सोलापूर. सोसायटी कायद्याअंतर्गत नोंदणीकृत.',
    right: ['गोपनीयता', 'अटी', 'साइटमॅप'],
  },
};

export const CONTENT: Record<Lang, Content> = { en, mr };
