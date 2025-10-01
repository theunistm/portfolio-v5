// Project data for the work section
import type { ProjectProps } from '../components/work/types';

export const projects: ProjectProps[] = [
  // 6. My Pharmacy — videos (6 flows)
  {
    order: 6,
    title: 'My Pharmacy',
    icon: '/images/prj-app-icon-mypharm.png',
    categories: ['e-commerce', 'personal health', 'lifestyle'],
    duration: { start: 2023, end: 2024 },
    summary:
      'My Pharmacy is a multi-tenancy shopping app connecting 20k+ users with over 200+ pharmacies all over Namibia. A first for the country.',
    downloadLink: 'https://apps.apple.com/na/app/my-pharmacy-shop-rewards/id6508166679',
    stage: { label: 'Launched', fill: '#F2F7F3', stroke: '#395C06' },
    caseStudy: `
      <h5>About</h5>
      <p>AMy Pharmacy is a new B2C e‑commerce platform from Namibia’s largest pharmaceutical distributor. It lets people buy everyday health products while keeping their relationship with the pharmacy they trust.</p>
      
      <h5>Project Details</h5>
      <p>Role: Design system development, User journey design, Process implementation</p>
      <p>Timeline: 2023 - 2024</p>
      <p>Platform: Web, iOS, Android</p>
      <p>Company: Nampharm</p>
      <p>Industry: Healthcare</p>
      
      <h5>Challenge</h5>
      <p>In mid‑2023 Nampharm asked us to build a B2C platform. The challenge wasn’t just UI: their stack was built for wholesale. We needed a customer‑friendly experience on top of distributor systems; new integrations, translation layers, and environments. All without making pharmacies feel sidelined. The product had to be simple for the public, yet give member pharmacies clear visibility and control.</p>
      
      <h5>Impact</h5>
      <p>By making pharmacies the hero (brand, storefront, and messaging) trust transferred from B2B to B2C without breaking relationships. The translation layer let us keep Nampharm’s operational truth while presenting clean, shoppable data to customers. The design system accelerated delivery and made ongoing development faster and more consistent.
      <br>I was the sole product designer, partnering closely with engineering and stakeholders.<br>
        <ul>
          <li>Framed the B2B→B2C shift as a “pharmacy‑first” experience: customers shop, but they still buy “from their pharmacy”.</li>
          <li>Mapped end‑to‑end journeys such as product search, order fulfillment, transaction completion, prescription management, user's pharmacy selection, and other.</li>
          <li>Designed the in-app systems for the loyalty points (Community Coins).</li>
          <li>Created a brand aligned Design System.</li>
        </ul>
      </p>
      
      <h5>Outcomes</h5>
      <ul>
        <li>Faster path to purchase: improvments made across search → product → add to cart → purchase, brought about a 10% increase in completion rate.</li>
        <li>Higher checkout follow‑through after simplifying RX steps and payment hand‑off, up 11%</li>
        <li>Clearer prescription management increased feature uptake and repeat use.</li>
        <li>Home Page layout improved feature discovery across the app.</li>
        <li>Higher pharmacy satisfaction: strong uptake of white‑label stores; Home Page emphasises the chosen pharmacy which reinforced perceived ownership.</li>
      </ul>

      <h5>Testimonials</h5>
      <p>Working with Theunis on a recent brand development and app design project for a Namibian pharmaceutical company was an enriching experience. He was not only easy to collaborate with but also brought invaluable knowledge about app design and user interaction. His keen understanding of what works (and what doesn’t) helped guide the team in creating a seamless, user-friendly app experience.
      <br>Theunis was patient, efficient, and instrumental in translating the brand into a strong digital presence. As a fellow designer, I gained valuable insights from working alongside him, and I highly recommend Theunis for any digital design project.<br>
      <span class="font-bold">— Este van der Walt, Project Creative Consultant</span>
      </p>
    `,
    theme: { color: '#395C06' },
    flows: [
      { page: 'Home', challenge: 'Surface the right info first without noise.', solution: 'We grouped key signals into clear widgets, so users land, scan, and act in seconds. Home dwell time dropped ~15%.', media: { type: 'video', src: '/flows/videos/my-pharmacy/01-mp-home.mp4' } },
      { page: 'Prescriptions', challenge: 'Juggling scripts across pharmacies is confusing and time‑heavy.', solution: 'One prescription hub with live status, co‑pay alerts, and delivery options. Pharmacy members reported script reorder time cut in half.', media: { type: 'video', src: '/flows/videos/my-pharmacy/02-mp-scripts.mp4' } },
      { page: 'Medical info', challenge: 'Make personal health details easy to view and share securely.', solution: 'We created a digital medical card that captures essentials and can be shared via email, text, or PDF with medical professionals.', media: { type: 'video', src: '/flows/videos/my-pharmacy/03-mp-medical.mp4' } },
      { page: 'Store catalogue', challenge: 'Help people find the right product fast, then present its details without overwhelm.', solution: 'Structured categories with smart search/filters and consistent product cards (price, availability). On the PDP, a progressive layout surfaces essentials first. Result: first‑result add‑to‑cart up ~14%, overall PDP add‑to‑cart up ~12%.', media: { type: 'video', src: '/flows/videos/my-pharmacy/04-mp-store.mp4' } },
      { page: 'Wallet', challenge: 'Add payment methods safely and track where money goes.', solution: 'We created a central wallet for secure cards, cashback, and per‑card history. Easy payment method set up allowed for 100% success rate to add new cards.', media: { type: 'video', src: '/flows/videos/my-pharmacy/05-mp-wallet.mp4' } },
      { page: 'Wellness hubs', challenge: 'Users hunt across scattered sources for critical care product info.', solution: 'Dedicated brand hubs gather products, guidance, and updates in one trusted space.', media: { type: 'video', src: '/flows/videos/my-pharmacy/06-mp-hubs.mp4' } },
    ],
  },

  // 5. Vouch — images (3 flows)
  {
    order: 5,
    title: 'Vouch',
    icon: '/images/prj-app-icon-vouch.png',
    categories: ['fintech', 'mobile', 'trust'],
    duration: { start: 2022, end: 2023 },
    summary: 'Peer-powered validation to build trust in transactions and profiles.',
    stage: { label: 'In development', fill: '#F0F0F5', stroke: '#35357D' },
    caseStudy: `
      <h2>About</h2><p>Concise overview goes here.</p>
      <h2>Challenge</h2><p>Single paragraph explaining the challenge.</p>
      <h2>Impact</h2><p>Key impact statement.</p>
      <h2>Project Details</h2><p>Role, timeline, platform, company, industry.</p>
      <h2>Outcomes</h2><ul><li>Outcome 1</li><li>Outcome 2</li></ul>
    `,
    theme: { color: '#35357D' },
    flows: [
      { page: 'Profile', challenge: 'Establish signal without noise', solution: 'Weighted endorsements', media: { type: 'image', src: '/flows/images/vouch/vouch-01.jpg' } },
      { page: 'Invite', challenge: 'Quickly request vouches', solution: 'Contact shortcuts', media: { type: 'image', src: '/flows/images/vouch/vouch-02.jpg' } },
      { page: 'Feed', challenge: 'Trust digestibility', solution: 'Contextual snippets', media: { type: 'image', src: '/flows/images/vouch/vouch-03.jpg' } },
    ],
  },

  // 4. My Rental — images (4 flows)
  {
    order: 4,
    title: 'My Rental',
    icon: '/images/prj-app-icon-myrental.png',
    categories: ['real estate', 'rentals', 'tools'],
    duration: { start: 2021, end: 2022 },
    summary: 'Streamlined rental discovery and application workflows.',
    stage: { label: 'In development', fill: '#F9F5F2', stroke: '#8C3704' },
    caseStudy: `
      <h2>About</h2><p>Concise overview goes here.</p>
      <h2>Challenge</h2><p>Single paragraph explaining the challenge.</p>
      <h2>Impact</h2><p>Key impact statement.</p>
      <h2>Project Details</h2><p>Role, timeline, platform, company, industry.</p>
      <h2>Outcomes</h2><ul><li>Outcome 1</li><li>Outcome 2</li></ul>
    `,
    theme: { color: '#8C3704' },
    flows: [
      { page: 'Browse', challenge: 'Inventory overload', solution: 'Facet filters + save searches', media: { type: 'image', src: '/flows/images/my-rental/my-rental-01.jpg' } },
      { page: 'Listing', challenge: 'Clarity of terms', solution: 'Readable, compact details', media: { type: 'image', src: '/flows/images/my-rental/my-rental-02.jpg' } },
      { page: 'Apply', challenge: 'Friction in forms', solution: 'Guided steps + autofill', media: { type: 'image', src: '/flows/images/my-rental/my-rental-03.jpg' } },
      { page: 'Status', challenge: 'Status opacity', solution: 'Transparent tracking', media: { type: 'image', src: '/flows/images/my-rental/my-rental-04.jpg' } },
    ],
  },

  // 3. PayBuddy — videos (7 flows)
  {
    order: 3,
    title: 'PayBuddy',
    icon: '/images/prj-app-icon-paybuddy.png',
    categories: ['payments', 'fintech', 'mobile'],
    duration: { start: 2020, end: 2021 },
    summary: 'Fast, reliable P2P and merchant payments with clear flows.',
    stage: { label: 'Closed beta', fill: '#F9F7EE', stroke: '#BB8806' },
    caseStudy: `
      <h2>About</h2><p>Concise overview goes here.</p>
      <h2>Challenge</h2><p>Single paragraph explaining the challenge.</p>
      <h2>Impact</h2><p>Key impact statement.</p>
      <h2>Project Details</h2><p>Role, timeline, platform, company, industry.</p>
      <h2>Outcomes</h2><ul><li>Outcome 1</li><li>Outcome 2</li></ul>
    `,
    theme: { color: '#A07303' },
    flows: [
      { page: 'Home', challenge: 'Action discoverability', solution: 'Prioritized quick actions', media: { type: 'video', src: '/flows/videos/paybuddy/paybuddy-01.mp4' } },
      { page: 'Send', challenge: 'Recipient errors', solution: 'Verified recipients', media: { type: 'video', src: '/flows/videos/paybuddy/paybuddy-02.mp4' } },
      { page: 'Request', challenge: 'Clumsy splits', solution: 'Smart splitting', media: { type: 'video', src: '/flows/videos/paybuddy/paybuddy-03.mp4' } },
      { page: 'Pay', challenge: 'Merchant UX fragmentation', solution: 'Unified payment sheet', media: { type: 'video', src: '/flows/videos/paybuddy/paybuddy-04.mp4' } },
      { page: 'History', challenge: 'Traceability', solution: 'Rich receipts', media: { type: 'video', src: '/flows/videos/paybuddy/paybuddy-05.mp4' } },
      { page: 'Cards', challenge: 'Card lifecycle clarity', solution: 'Status + controls', media: { type: 'video', src: '/flows/videos/paybuddy/paybuddy-06.mp4' } },
      { page: 'Settings', challenge: 'Security vs ease', solution: 'Risk-tiered controls', media: { type: 'video', src: '/flows/videos/paybuddy/paybuddy-07.mp4' } },
    ],
  },

  // 2. Buddy SuperApp — videos (5 flows)
  {
    order: 2,
    title: 'Buddy SuperApp',
    icon: '/images/prj-app-icon-superapp.png',
    categories: ['superapp', 'platform', 'mobile'],
    duration: { start: 2019, end: 2020 },
    summary: 'Multiple services unified in a coherent, scalable superapp.',
    downloadLink: '#',
    stage: { label: 'Launched', fill: '#F9F7EE', stroke: '#BB8806' },
    caseStudy: `
      <h2>About</h2><p>Concise overview goes here.</p>
      <h2>Challenge</h2><p>Single paragraph explaining the challenge.</p>
      <h2>Impact</h2><p>Key impact statement.</p>
      <h2>Project Details</h2><p>Role, timeline, platform, company, industry.</p>
      <h2>Outcomes</h2><ul><li>Outcome 1</li><li>Outcome 2</li></ul>
    `,
    theme: { color: '#A07303' },
    flows: [
      { page: 'Hub', challenge: 'Service sprawl', solution: 'Cards + deep links', media: { type: 'video', src: '/flows/videos/superapp/superapp-01.mp4' } },
      { page: 'Transport', challenge: 'ETAs + pricing clarity', solution: 'Predictive fares', media: { type: 'video', src: '/flows/videos/superapp/superapp-02.mp4' } },
      { page: 'Food', challenge: 'Menu complexity', solution: 'Hierarchy + quick add', media: { type: 'video', src: '/flows/videos/superapp/superapp-03.mp4' } },
      { page: 'Wallet', challenge: 'Cross-service balance', solution: 'Unified wallet', media: { type: 'video', src: '/flows/videos/superapp/superapp-04.mp4' } },
      { page: 'Inbox', challenge: 'Over-notification', solution: 'Digest + focus', media: { type: 'video', src: '/flows/videos/superapp/superapp-05.mp4' } },
    ],
  },

  // 1. Travel Guru — images (7 flows)
  {
    order: 1,
    title: 'Travel Guru',
    icon: '/images/prj-app-icon-traveguru.png',
    categories: ['travel', 'planning', 'mobile'],
    duration: { start: 2018, end: 2019 },
    summary: 'Smart trip planning with collaborative itineraries and bookings.',
    stage: { label: 'On hold', fill: '#EBF6F7', stroke: '#115860' },
    caseStudy: `
      <h2>About</h2><p>Concise overview goes here.</p>
      <h2>Challenge</h2><p>Single paragraph explaining the challenge.</p>
      <h2>Impact</h2><p>Key impact statement.</p>
      <h2>Project Details</h2><p>Role, timeline, platform, company, industry.</p>
      <h2>Outcomes</h2><ul><li>Outcome 1</li><li>Outcome 2</li></ul>
    `,
    theme: { color: '#115860' },
    flows: [
      { page: 'Explore', challenge: 'Option overwhelm', solution: 'Curated themes', media: { type: 'image', src: '/flows/images/travel-guru/travel-guru-01.jpg' } },
      { page: 'Itinerary', challenge: 'Collab friction', solution: 'Realtime edits', media: { type: 'image', src: '/flows/images/travel-guru/travel-guru-02.jpg' } },
      { page: 'Booking', challenge: 'Fragmented steps', solution: 'Unified checkout', media: { type: 'image', src: '/flows/images/travel-guru/travel-guru-03.jpg' } },
      { page: 'Tickets', challenge: 'Docs scatter', solution: 'Central vault', media: { type: 'image', src: '/flows/images/travel-guru/travel-guru-04.jpg' } },
      { page: 'Maps', challenge: 'Context loss', solution: 'Day overlays', media: { type: 'image', src: '/flows/images/travel-guru/travel-guru-05.jpg' } },
      { page: 'Share', challenge: 'Invite clarity', solution: 'Simple links', media: { type: 'image', src: '/flows/images/travel-guru/travel-guru-06.jpg' } },
      { page: 'Tips', challenge: 'Local knowledge', solution: 'Trusted lists', media: { type: 'image', src: '/flows/images/travel-guru/travel-guru-07.jpg' } },
    ],
  },
];
