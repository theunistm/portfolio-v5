# Development Plan – Portfolio & Explorations Site

## 1. Site Structure Overview
- **Home Page** (continuous scroll)
  - Interactive bio section (always at top)
  - Chronological project sections
  - Each project:
    - Project header
    - Highlighted flows list
    - Phone mockup video preview
    - Case study link → opens slide-in panel
- **Explorations Page** (separate route)
  - Grid of cards (image or interactive UI component)
- **Global Elements**
  - Background static noise texture
  - Floating bottom nav
  - Footer/social links

---

## 2. Component Inventory

### Global Components
1. `<BackgroundStatic>` – Canvas or CSS noise texture, fixed position
2. `<FloatingNav>` – Fixed bottom centre, active page highlight, hides on case study open
3. `<Footer>` – Social icons, copyright, resume link
4. `<Tooltip>` – Reusable for “Challenge” and “Solution” text
5. `<PixelHoverBar>` – Reusable hover effect with vertical banding

### Home Page Components
1. `<BioSectionInteractive>`
   - Displays initial bio text with clickable highlighted words
   - Expands inline to reveal more detail
   - Supports **nested expansions** (newly revealed text can also have clickable words)
   - Smooth animated transitions
   - Data-driven (JSON or Markdown with custom syntax for expansion triggers)
2. `<ProjectSection>` – Wraps all project content
3. `<ProjectHeader>` – Title + icon, tags, description, case study link
4. `<FlowList>` – Flows with hover highlight, tooltips, triggers `<PhonePreview>`
5. `<PhonePreview>` – Static iPhone frame, video swaps on hover
6. `<CaseStudyPanel>` – Slide-in from left, text content, background blur, hides nav

### Explorations Page Components
1. `<ExplorationsGrid>` – Responsive grid layout
2. `<ExplorationCard>` – Title, year, content (image or interactive UI)
3. `<InteractiveUI>` – Placeholder for coded UI experiments

---

## 3. Interaction Logic
- **Interactive Bio**
  - Click highlighted word → expands inline with more detail
  - Newly revealed text can also contain clickable words for further expansion
  - Smooth transition animations for text changes
  - State persists while scrolling
- **Hover on Flow List Item**
  - Highlight bar appears (pixelated vertical banding)
  - `<PhonePreview>` updates video source
- **Hover on Challenge/Solution**
  - Tooltip appears with short text
- **Click Case Study Link**
  - `<CaseStudyPanel>` slides in
  - Background content blurs (static noise remains)
  - Floating nav animates out
- **Close Case Study**
  - Panel slides out
  - Blur removed
  - Floating nav returns

---

## 4. Suggested Tech Stack
- **Framework:** Astro (lightweight, supports partial React if needed)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (if React) or GSAP (if vanilla)
- **CMS:** Netlify CMS (free, Git-based)
- **Hosting:** Netlify (free tier, CI/CD from GitHub)
- **Media:** `.webp` for images, `.webm` for videos

---

## 5. Optimal Build Order (Windsurf IDE)

### Phase 1 – Setup
- Create GitHub repo
- Install Astro + Tailwind
- Add global styles (typography, colours from Figma)
- Implement `<BackgroundStatic>`

### Phase 2 – Global Components
- Build `<FloatingNav>` + `<Footer>`
- Add `<Tooltip>` + `<PixelHoverBar>` utilities

### Phase 3 – Home Page
- Build `<BioSectionInteractive>` with nested expansion logic
- Build `<ProjectSection>` with `<ProjectHeader>`, `<FlowList>`, `<PhonePreview>`
- Implement hover → video swap logic
- Add accent colour change per project

### Phase 4 – Case Study Panel
- Build `<CaseStudyPanel>` with slide-in animation
- Add background blur + nav hide logic

### Phase 5 – Explorations Page
- Build `<ExplorationsGrid>` + `<ExplorationCard>`
- Implement `<InteractiveUI>` placeholder for coded components

### Phase 6 – CMS Integration
- Configure Netlify CMS for projects + explorations
- Test adding content via CMS

### Phase 7 – Polish & Launch
- Add animations (Framer Motion/GSAP)
- Optimise images/videos
- Add SEO meta tags + sitemap
- Deploy to Netlify

---

## 6. Key Dev Tips
- Keep static noise as a **separate fixed layer** so it’s unaffected by blur
- Use **CSS variables** for accent colours
- Lazy-load videos to avoid performance hits
- Keep interactive UI in Explorations **self-contained**
- Store interactive bio content in a **nested JSON structure** for easy editing

Example bio data structure:
```json
{
  "text": "I'm a product designer based in [Windhoek].",
  "expansions": {
    "Windhoek": {
      "text": "Windhoek, Namibia — where I work on [e-commerce] projects.",
      "expansions": {
        "e-commerce": {
          "text": "E-commerce apps for healthcare and retail."
        }
      }
    }
  }
}
```