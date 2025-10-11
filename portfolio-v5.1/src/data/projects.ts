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
      <p>My Pharmacy is a new B2C e‑commerce platform from Namibia’s largest pharmaceutical distributor. It lets people buy everyday health products while keeping their relationship with the pharmacy they trust.</p>
      
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
      <p>"Working with Theunis on a recent brand development and app design project for a Namibian pharmaceutical company was an enriching experience. He was not only easy to collaborate with but also brought invaluable knowledge about app design and user interaction. His keen understanding of what works (and what doesn’t) helped guide the team in creating a seamless, user-friendly app experience.
      <br>Theunis was patient, efficient, and instrumental in translating the brand into a strong digital presence. As a fellow designer, I gained valuable insights from working alongside him, and I highly recommend Theunis for any digital design project."<br>
      <span class="font-bold">— Este van der Walt, Project Creative Consultant</span>
      </p>
    `,
    theme: { color: '#395C06', hoverColor: '#DFE7DB' },
    flows: [
      { page: 'Home', challenge: 'Surface the right info first without noise.', solution: 'We grouped key signals into clear widgets, so users land, scan, and act in seconds. Home dwell time dropped ~15%.', media: { type: 'video', src: '/flows/videos/my-pharmacy/01-mp-home.webm' }, iconType: 'play' },
      { page: 'Prescriptions', challenge: 'Juggling scripts across pharmacies is confusing and time‑heavy.', solution: 'One prescription hub with live status, co‑pay alerts, and delivery options. Pharmacy members reported script reorder time cut in half.', media: { type: 'video', src: '/flows/videos/my-pharmacy/02-mp-scripts.webm' }, iconType: 'play' },
      { page: 'Medical info', challenge: 'Make personal health details easy to view and share securely.', solution: 'We created a digital medical card that captures essentials and can be shared via email, text, or PDF with medical professionals.', media: { type: 'video', src: '/flows/videos/my-pharmacy/03-mp-medical.webm' }, iconType: 'play' },
      { page: 'Store catalogue', challenge: 'Help people find the right product fast, then present its details without overwhelm.', solution: 'Structured categories with smart search/filters and consistent product cards (price, availability). On the PDP, a progressive layout surfaces essentials first. Result: first‑result add‑to‑cart up ~14%, overall PDP add‑to‑cart up ~12%.', media: { type: 'video', src: '/flows/videos/my-pharmacy/04-mp-store.webm' }, iconType: 'play' },
      { page: 'Wallet', challenge: 'Add payment methods safely and track where money goes.', solution: 'We created a central wallet for secure cards, cashback, and per‑card history. Easy payment method set up allowed for 100% success rate to add new cards.', media: { type: 'video', src: '/flows/videos/my-pharmacy/05-mp-wallet.webm' }, iconType: 'play' },
      { page: 'Wellness hubs', challenge: 'Users hunt across scattered sources for critical care product info.', solution: 'Dedicated brand hubs gather products, guidance, and updates in one trusted space.', media: { type: 'video', src: '/flows/videos/my-pharmacy/06-mp-hubs.webm' }, iconType: 'play' },
    ],
  },

  // 5. Vouch — images (3 flows)
  {
    order: 5,
    title: 'Vouch',
    icon: '/images/prj-app-icon-vouch.png',
    categories: ['business', 'fintech', 'retail'],
    duration: { start: 2024 },
    summary: 'Vouch is a ultra‑fast voucher validation and redemption app that lets staff verify, redeem, and audit in seconds—cutting errors and speeding up checkout on any device.',
    stage: { label: 'In development', fill: '#F0F0F5', stroke: '#35357D' },
    caseStudy: `
      <h5>About</h5>
      <p>Vouch is a lightweight voucher validation and redemption app for businesses. It lets staff quickly verify vouchers, redeem them, and review history, without the bloat of a full POS.</p>

      <h5>Project Details</h5>
      <p>Role: Design language development, User journey design</p>
      <p>Timeline: 2024</p>
      <p>Platform: iOS, Android</p>
      <p>Company: Tomorrow Studio</p>
      <p>Industry: Retail</p>

      <h5>Challenge</h5>
      <p>Voucher redemption can be slow and error‑prone costing throughput. Staff would need a dead‑simple flow to sign in, validate a voucher (PIN, barcode/QR, or serial search), and redeem with confidence, while keeping fraud low and records auditable. The tool had to feel instant, work one‑handed, and surface just the essentials.</p>

      <h5>Impact</h5>
      <p>We stripped the experience to the jobs that matter: sign in, check balance, validate, redeem, and review. The home screen became the “control room” (current balance, quick actions for redemptions, and a live snapshot of recent redemptions with a path to full history). Every redemption has a detail view with audit info for dispute handling. The focus on speed and clarity reduces training time and raises trust on the shop floor.</p>

      <h5>Outcomes</h5>
      <ul>
        <li>Faster redemptions: tap‑to‑scan and inline PIN entry cut average redeem time by seconds.</li>
        <li>Fewer errors: clear states and confirmations reduces failed/duplicate attempts.</li>
        <li>Better traceability: per‑entry detail and searchable history shortens dispute resolution time.</li>
        <li>Low lift: new staff can complete a first redemption within seconds, with no formal training.</li>
      </ul>
    `,
    theme: { color: '#35357D', hoverColor: '#E4E4F1' },
    flows: [
      { page: 'Home', challenge: 'Show the essentials without creating noise for the user.', solution: 'We grouped key info on one screen, User balance, Redeem actions, and History overview, so staff get what they need at a glance.', media: { type: 'image', src: '/flows/images/vouch/01-v-home.webp' }, iconType: 'image' },
      { page: 'Voucher redemption', challenge: 'In a fast, high‑stress retail flow, workers must reach redemption tools instantly.', solution: 'Single‑tap access to PIN entry, barcode/QR scan, and serial search. Each flow shares the same pattern to reduce cognitive load under pressure.', media: { type: 'video', src: '/flows/videos/vouch/02-v-voucher.webm' }, iconType: 'play' },
      { page: 'Redemption history', challenge: 'Make large volumes of redemption data easy to scan and trust.', solution: 'Hierarchical layout with clear states and timestamps; newest first, with searchable detail views for quick look‑ups and audits.', media: { type: 'image', src: '/flows/images/vouch/03-v-history.webp' }, iconType: 'image' },
    ],
  },

  // 4. My Rental — images (4 flows)
  {
    order: 4,
    title: 'My Rental',
    icon: '/images/prj-app-icon-myrental.png',
    categories: ['travel', 'location-services'],
    duration: { start: 2024 },
    summary: 'My Rental is a booking‑first companion app that gives travellers instant certainty—confirming car status, pickup/return details, and support in seconds—without creating an account.',
    stage: { label: 'In development', fill: '#F9F5F2', stroke: '#8C3704' },
    caseStudy: `
      <h5>About</h5>
      <p>My Rental is a lightweight companion app for travellers to manage an existing car booking. No full account, just email + booking reference, then a clear view of status, pickup/return details, support, and handy local tools.</p>

      <h5>Project Details</h5>
      <p>Role: Design language development, User journey design</p>
      <p>Timeline: 2024</p>
      <p>Platform: iOS, Android</p>
      <p>Company: Tomorrow Studio</p>
      <p>Industry: Travel</p>

      <h5>Challenge</h5>
      <p>Travellers don’t need a full rental portal; they need fast certainty. People arrive in new places on shaky data, juggling paperwork and timing. The app had to skip account friction, confirm “is my car ready, where, and when?”, and provide help if things go sideways, while staying simple enough to use one‑handed at a counter or roadside.</p>

      <h5>Impact</h5>
      <p>We designed a login‑less, booking‑first experience: enter email and booking reference, and you’re in. The Home screen acts as mission control—status at a glance, rental company info, vehicle details, pickup/return times with addresses and directions, and lightweight notifications. An SOS page gives tap‑to‑call emergency numbers and share‑my‑location links, with graceful handling when GPS is unavailable. A Navigate page offers quick picks for fuel, towns, attractions, and campsites with call and directions. Vouchers live in the same ecosystem for simple perks and redemptions. The result is a calm, practical tool that reduces counter friction and supports travellers on the road.</p>

      <h5>Outcomes</h5>
      <ul>
        <li>Frictionless access: booking‑reference login removed account creation and cut time‑to‑first‑view to seconds.</li>
        <li>Fewer “where do I go?” moments: directions and status reduces counter questions and missed pickups.</li>
        <li>Better on‑road support: SOS and quick contacts shortens time to help; gps-location checks prevent dead ends.</li>
        <li>Higher partner value: vouchers provide simple, trackable upsell opportunities for rental companies without bloating the core app experience.</li>
      </ul>
    `,
    theme: { color: '#8C3704', hoverColor: '#F5E9E3' },
    flows: [
      { page: 'Home', challenge: 'How to effectively show the essential info with little to no noise. ', solution: 'We surfaced the key signals (rental stage, car status, pickup/return times, and timely notices) so users understand “where they are” at a glance.', media: { type: 'image', src: '/flows/images/my-rental/01-mr-home.webp' }, iconType: 'image' },
      { page: 'SOS', challenge: 'In stressful moments, information must be instant and unambiguous.', solution: 'We provide big, readable actions with tap‑to‑call emergency numbers and share‑my‑location, plus graceful fallbacks when GPS isn’t available.', media: { type: 'image', src: '/flows/images/my-rental/02-mr-sos.webp' }, iconType: 'image' },
      { page: 'Points of attraction', challenge: 'How to Hhelp travellers find the right places fast. while keeping the info minimal.', solution: 'A curated, categorised list (fuel, towns, attractions, campsites) ranked by proximity, with one‑tap directions or call.', media: { type: 'image', src: '/flows/images/my-rental/03-mr-navigate.webp' }, iconType: 'image' },
      { page: 'Voucher tracking', challenge: 'Tracking and redeeming provider vouchers is fiddly across emails and texts.', solution: 'All vouchers live in‑app and are visible, scannable, and quickly redeemable with provider, with a clear record of what’s been used.', media: { type: 'image', src: '/flows/images/my-rental/04-mr-vouchers.webp' }, iconType: 'image' },
    ],
  },

  // 3. PayBuddy — videos (7 flows)
  {
    order: 3,
    title: 'PayBuddy',
    icon: '/images/prj-app-icon-paybuddy.png',
    categories: ['fintech', 'banking', 'P2P payments'],
    duration: { start: 2023, end: 2024 },
    summary: 'PayBuddy (a premier feature in Buddy SuperApp) brings instant, secure peer‑to‑peer payments to Namibia. Contact‑based transfers, real‑time confirmations, and a free debit card, all backed by a licensed banking partner.',
    stage: { label: 'Closed beta', fill: '#F9F7EE', stroke: '#BB8806' },
    caseStudy: `
      <h5>About</h5>
      <p>PayBuddy is a peer‑to‑peer payments service inside Buddy SuperApp (think Cash App or Venmo for Namibia). Users send or request money from verified contacts, move funds instantly, and pay with a free physical card, with bank‑grade security behind the scenes.</p>

      <h5>Project Details</h5>
      <p>Role: Sole Product Designer</p>
      <p>Timeline: 2023-2024</p>
      <p>Platform: iOS, Android</p>
      <p>Company: Buddy Industries</p>
      <p>Industry: Fintech</p>

      <h5>Challenge</h5>
      <p>Peer‑to‑peer transfers were slow and fiddly: bank hops, day‑long authorisations, and confusing flows just to move small amounts. People needed a dead‑simple, instant way to send or request money, with trust built in (verified identities, fraud checks, and clear records), without feeling like they were using a bank back office.</p>

      <h5>Impact</h5>
      <p>We designed PayBuddy around the contact list: pick a verified person, enter an amount, add context, and it’s done. Real‑time rails power instant sends and requests; KYC, monitoring, and manual review protect the network when something looks off. A home‑screen widget in Buddy surfaces Send/Request, while card services unlock everyday spending: free debit card, QR activation, PIN reset, and limits. The experience keeps users oriented with live states, receipts, and searchable history — simple on the surface, bank‑grade underneath.</p>

      <h5>Outcomes</h5>
      <ul>
        <li>Speed: transfers complete in real time between verified users; time‑to‑cash drops from “next day” to seconds.</li>
        <li>Adoption: contact‑based flows reduce send/request friction and increase completion.</li>
        <li>Trust and safety: KYC along with monitoring cut fraudulent attempts, flagged items route to review with clear user messaging.</li>
        <li>Everyday utility: the free debit card extends balance to physical payments; cash‑out at Buddy merchants and ATMs.</li>
      </ul>
    `,
    theme: { color: '#A07303', hoverColor: '#F7EED2' },
    flows: [
      { page: 'Sending money', challenge: 'Move money fast without friction.', solution: 'Send and request share one simple pattern - pick a contact, enter an amount, add a note - so there’s zero guesswork.', media: { type: 'video', src: '/flows/videos/paybuddy/01-pb-send.webm' }, iconType: 'play' },
      { page: 'Scam notifications', challenge: 'Give users clear warning before they commit.', solution: 'KYC and verification run by default; when something looks off, we surface a plain‑language alert upfront so users can pause or proceed informed.', media: { type: 'video', src: '/flows/videos/paybuddy/02-pb-scam.webm' }, iconType: 'play' },
      { page: 'Request notifications', challenge: 'Make money requests feel natural, not nagging.', solution: 'Requests appear in‑app and on the widget, quietly, no spammy pushes, leaving the conversation to people, not the app.', media: { type: 'video', src: '/flows/videos/paybuddy/03-pb-request.webm' }, iconType: 'play' },
      { page: 'Card linkage', challenge: 'Bridge the digital wallet to a physical card.', solution: 'Link in seconds via a card‑tied QR code, with a guided flow that’s quick and visually reassuring.', media: { type: 'video', src: '/flows/videos/paybuddy/04-pb-link.webm' }, iconType: 'play' },
      { page: 'Onboarding', challenge: ' Invite users at the right moment without getting in the way.', solution: 'A contextual “Join PayBuddy” entry in Wallet, present when useful, informing users of the benefits upfront.', media: { type: 'video', src: '/flows/videos/paybuddy/05-pb-onboarding.webm' }, iconType: 'play' },
      { page: 'Card update notification', challenge: 'Confirm upgrades instantly and unmistakably.', solution: 'Animated iconography and clear status text show the new tier is live and ready.', media: { type: 'video', src: '/flows/videos/paybuddy/06-pb-card.webm' }, iconType: 'play' },
      { page: 'Tier update', challenge: 'Explain tier options and benefits at a glance.', solution: 'Clean comparisons with focused visuals and plain‑English perks help users choose the right tier quickly.', media: { type: 'video', src: '/flows/videos/paybuddy/07-pb-upgrade.webm' }, iconType: 'play' },
    ],
  },

  // 2. Buddy SuperApp — videos (5 flows)
  {
    order: 2,
    title: 'Buddy SuperApp',
    icon: '/images/prj-app-icon-superapp.png',
    categories: ['e-commerce', 'lifestyle', 'fintech', 'loyalties'],
    duration: { start: 2021, end: 2023 },
    summary: 'Buddy SuperApp unified payments, food, concierge, and rewards into one modern experience—serving 70k+ users and turning scattered services into a faster, clearer, more rewarding daily app.',
    downloadLink: '#',
    stage: { label: 'Launched', fill: '#F9F7EE', stroke: '#BB8806' },
    caseStudy: `
      <h5>About</h5>
      <p>Buddy SuperApp is Namibia’s first super app—payments, food delivery, concierge, and digital vouchers, unified into one experience with Smile$ cash‑back rewards (in-app loyalty ecosystem).</p>
      
      <h5>Project Details</h5>
      <p>Role: Sole Product Designer. Led a multi‑year evolution to a modern, unified super app; Created the cross‑platform design system; Designed user journeys with stakeholders; Worked closely with engineering to deliver features.</p>
      <p>Timeline: 2021 - 2023</p>
      <p>Platform: Web, iOS, Android</p>
      <p>Company: Buddy Industries</p>
      <p>Industry: Fintech & E-commerce</p>
      
      <h5>Challenge</h5>
      <p>After merging four standalone apps into a single “super app,” the experience felt like stitched parts: inconsistent patterns, weak feature discovery, and unclear rewards. Users lost context moving between services, and the team lacked a shared system. We needed to unify the UX, make discovery intuitive, and surface Smile$ in-app loyalty value, without derailing growth.</p>
      
      <h5>Impact</h5>
      <p>I led the product revamp end‑to‑end. I introduced a cross‑platform design system that aligned iOS and Android, cut handoff friction, and made future work faster. We reframed the home as a personalised command centre with clear widgets, clarified navigation and service grouping, streamlined checkout, and integrated Smile$ throughout the journey. Prototypes and a stakeholder pitch secured buy‑in; research loops (tests, feedback analysis, competitive review) guided iterations.</p>
      
      <h5>Outcomes</h5>
      <ul>
        <li>Growth and engagement: user base grew from ~50k to over 72k+ after the revamp.</li>
        <li>Service engagement increased: average services used per user rose from 2 to 4+.</li>
        <li>Conversion: streamlined checkout and clearer states increased transaction completion.</li>
        <li>System velocity: design‑to‑dev handoff time reduced by ~50%.</li>
        <li>Rewards clarity: Smile$ visibility and messaging improved redemption and perceived value.</li>
        <li>Foundation: scalable system ready for new services and personalisation.</li>
      </ul>

      <h5>Testimonials</h5>
      <p>"I've been a long time supporter of Buddy and it was great to see the app's new look. It's refreshing but more importantly I love how much easier it is to use the app. I love how quickly I can buy airtime now."
      <br><span class="font-bold">— Kind message from Simon Kuhanga</span>
      </p>
      <br>
      <p>"Theunis spearheaded the Buddy platform revamp with exceptional leadership and technical skill. His proactive collaboration with our development team ensured a seamless workflow between design and implementation. The redesign significantly improved user retention and made navigation more intuitive, with users reporting feeling less overwhelmed. His work has set a new standard for excellence in our projects."
      <br><span class="font-bold">— Gerhard J. Kotze, CTO at Buddy Industries</span>
      </p>
    `,
    theme: { color: '#A07303', hoverColor: '#F7EED2' },
    flows: [
      { page: 'App navigation', challenge: 'Organise a multi‑function app born from four products without losing coherence.', solution: 'A calm home with interactive, info‑rich widgets; core flows grouped by intent and connection; niche features tucked into a clear “More” menu.', media: { type: 'video', src: '/flows/videos/superapp/01-bsa-pages.webm' }, iconType: 'play' },
      { page: 'Buddy Eats', challenge: 'Bring a top‑tier food‑ordering experience to Namibia—rich menus, zero confusion.', solution: 'Transparent ordering with clear progress (browse → customise → checkout → track), detailed menus, and status that keeps users oriented end‑to‑end.', media: { type: 'video', src: '/flows/videos/superapp/02-bsa-eats.webm' }, iconType: 'play' },
      { page: 'Ask Buddy', challenge: 'Serve niche requests with a tailored, human touch.', solution: 'Ask Buddy—our concierge chat—connects users to the team in real time to source, arrange, and confirm bespoke requests.', media: { type: 'video', src: '/flows/videos/superapp/03-bsa-ask.webm' }, iconType: 'play' },
      { page: 'In-app rewards', challenge: 'Help users track and use rewards without hunting.', solution: 'A single rewards hub for Smile$: balance, earning history, and ways to redeem. Visible at a glance, usable in a tap.', media: { type: 'video', src: '/flows/videos/superapp/04-bsa-rewards.webm' }, iconType: 'play' },
      { page: 'Value-added services', challenge: 'Make essentials (airtime, utilities, bundles) quick to find and buy.', solution: 'A unified VAS storefront with clear categories, prices, and instant checkout. No detours, no guesswork.', media: { type: 'video', src: '/flows/videos/superapp/05-bsa-vas.webm' }, iconType: 'play' },
    ],
  },

  // 1. Travel Guru — images (7 flows)
  {
    order: 1,
    title: 'Travel Guru',
    icon: '/images/prj-app-icon-traveguru.png',
    categories: ['travel', 'social media', 'creator economy'],
    duration: { start: 2021 },
    summary: 'Travel Guru turns local knowledge into a map of real experiences—creators earn from blogs, videos, and podcasts while travellers discover authentic places',
    stage: { label: 'On hold', fill: '#EBF6F7', stroke: '#115860' },
    caseStudy: `
      <h5>About</h5>
      <p>Travel Guru is a social discovery app for travel. Users explore a world map of local posts—blogs, videos, and podcasts — organised by location and travel tags. Creators can become “Travel Gurus,” publish content, and earn from premium posts and subscriptions.</p>

      <h5>Project Details</h5>
      <p>Role: Sole Product Designer</p>
      <p>Timeline: 2021</p>
      <p>Platform: iOS, Android</p>
      <p>Company: Buddy Industries</p>
      <p>Industry: Travel</p>

      <h5>Challenge</h5>
      <p>Travel inspiration is scattered across generic feeds, making it hard to find trustworthy, on‑the‑ground guidance. The founder wanted a single source of truth built from local voices, discoverable by place, curated by topic, and rewarding to create for. The product needed friction‑light onboarding, credible identity, robust creation tools across media, and a clear path to earn, all without overwhelming users.</p>

      <h5>Impact</h5>
      <p>I designed a map‑first experience: land on a travel map dotted with posts and places; tap to view location metadata and the content woven around it. Search pivots to countries with rich “welcome” pages (local gurus, experiences, and filters) plus curated feeds. Creation flows support blogs, short video, and podcasts with tags, locations, and inline promotion; premium content unlocks earnings for subscribed gurus. Community Q&A adds structured knowledge where a “most helpful” answer rises to the top. Profiles bring it together (bio, followers, content, tags) and a wallet tracks earnings and payouts. Onboarding is short and clear, with an optional path to become a Travel Guru.</p>

      <h5>Outcomes</h5>
      <ul>
        <li>Discovery: location‑anchored feeds and country hubs improve relevance and time‑on‑map.</li>
        <li>Creator value: premium posts and subscriptions provide a direct earning path; wallet clarifies balance and payouts.</li>
        <li>Content quality: structured creation (titles, tags, locations, media) boosts findability; “most helpful” in Community surfaces reliable tips.</li>
      </ul>
    `,
    theme: { color: '#115860', hoverColor: '#D7EFF1' },
    flows: [
      { page: 'Guru onboarding', challenge: 'Get users creating quickly while building trust.', solution: 'Short, clear steps (email/Apple/Google + phone verification), pick interests/country, set avatar, with an optional “Become a Travel Guru” path for monetisation.', media: { type: 'video', src: '/flows/videos/travel-guru/01-tg-onboarding.webm' }, iconType: 'play' },
      { page: 'Travel map', challenge: 'Turn scattered posts into meaningful, place‑based discovery.', solution: 'Map‑first home with location pins, mixed‑media previews, and quick tag filters. Tap any place to dive into local content.', media: { type: 'image', src: '/flows/images/travel-guru/02-tg-map.webp' }, iconType: 'image' },
      { page: 'Explore country', challenge: 'Help travellers orient fast in a new country.', solution: 'Country hub with a “Welcome” hero and showing curated content of the country.', media: { type: 'image', src: '/flows/images/travel-guru/03-tg-country.webp' }, iconType: 'image' },
      { page: 'Detailed search', challenge: 'Find the right experience across media and places.', solution: 'Tagged, filterable search across blogs, videos, podcasts, and locations, ranked by relevance with country and tag pivots.', media: { type: 'video', src: '/flows/videos/travel-guru/04-tg-search.webm' }, iconType: 'play' },
      { page: 'Community', challenge: 'Turn scattered travel questions into reliable, local answers without endless threads or noise.', solution: 'A structured Community page with topic tags, country/location context, and an “accepted answer” system — surfacing the most helpful reply first while keeping the full discussion accessible', media: { type: 'video', src: '/flows/videos/travel-guru/05-tg-community.webm' }, iconType: 'play' },
      { page: 'Content types', challenge: 'What are the best ways for users to present rich media with context without clutter.', solution: 'Clean detail views per type with location, tags, and creator info up front; standard actions (save, share, report) and premium gating when applicable.', media: { type: 'video', src: '/flows/videos/travel-guru/06-tg-create.webm' }, iconType: 'play' },
      { page: 'Content creation', challenge: 'Let creators create and publish robust posts without friction.', solution: 'Guided flows for blog/video/podcast: title, tags, location, media, preview, and publish.', media: { type: 'video', src: '/flows/videos/travel-guru/07-tg-posting.webm' }, iconType: 'play' },
    ],
  },
];
