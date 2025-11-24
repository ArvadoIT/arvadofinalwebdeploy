# Arvado Website - Complete Component & Architecture Documentation

## Project Overview

**Project Name:** Arvado  
**Type:** Premium Digital Growth Studio Marketing Website  
**Framework:** Next.js 14.2.15 (App Router)  
**Language:** TypeScript  
**Styling:** Tailwind CSS  
**Animation:** Framer Motion 11.3.31  
**3D Graphics:** React Three Fiber + Drei  
**Smooth Scroll:** Lenis 1.3.14  

---

## Tech Stack & Dependencies

### Core
- **Next.js:** 14.2.15 (React 18.3.1)
- **TypeScript:** 5.6.3
- **Tailwind CSS:** 3.4.14
- **Framer Motion:** 11.3.31 (animations)
- **Lenis:** 1.3.14 (smooth scrolling)

### 3D & Graphics
- **@react-three/fiber:** 8.15.21
- **@react-three/drei:** 9.103.0
- **three:** 0.181.1

### Icons & UI
- **lucide-react:** 0.460.0

---

## Typography System

The site uses 9 Google Fonts loaded via Next.js font optimization:

1. **Inter** (`--font-inter`) - Primary sans-serif
2. **Playfair Display** (`--font-glass`) - Serif for glass theme
3. **Space Grotesk** (`--font-frozen`) - Sans-serif for frozen theme
4. **Poppins** (`--font-water`) - Sans-serif for water theme
5. **Bebas Neue** (`--font-metal`) - Display for metal theme
6. **Cinzel** (`--font-step1`) - Serif
7. **Raleway** (`--font-step2`) - Sans-serif
8. **Montserrat** (`--font-step3`) - Sans-serif
9. **Lora** (`--font-step4`) - Serif

---

## Color Palette & Design System

### Base Colors
- **Background:** `slate-950` (#020617) - Deep dark blue-black
- **Text:** White with opacity variations (white/70, white/60, etc.)
- **Accent:** Sky blue (`sky-500` #0ea5e9) - Primary CTA color
- **Secondary Accents:** Cyan, Purple, Emerald, Amber gradients

### Theme Text Styles (CSS Classes)
- `.text-glass` - Glass theme with gradient and glow
- `.text-frozen` - Frozen theme with blue gradient
- `.text-water` - Water theme with animated cyan gradient
- `.text-metal` - Metal theme with metallic gradient

### Utility Classes
- `.glass-panel` - Glassmorphism effect (border, backdrop blur, bg-white/5)
- `.tag` - Small uppercase tags with tracking
- `.section-heading` - Large uppercase headings
- `.section-subtitle` - Subtitle text styling
- `.service-card` - High-end service card styling with hover effects

---

## Page Structure

### Main Entry Point
- `app/page.tsx` - Renders `PageClient`
- `app/layout.tsx` - Root layout with fonts and metadata
- `app/(marketing)/PageClient.tsx` - Main client component orchestrating all sections

### Current Page Flow (in PageClient.tsx)
1. **Navigation** - Fixed top navigation
2. **CinematicHero** - Hero section with character-by-character animation
3. **ValueGrid** (id: "services") - Services grid
4. **LaunchSequence** (id: "launch") - Process steps
5. **CTA** - Call-to-action section
6. **ContactSimple** (id: "contact") - Contact form
7. **StickyCTA** - Floating CTA button (appears after scroll)
8. **BookCallDock** - Bottom dock CTA

---

## Components Directory Structure

### Active Components (`components_new/`)
These are the components currently in use:

#### 1. CinematicHero.tsx
**Purpose:** Main hero section with cinematic animations

**Features:**
- Character-by-character reveal animation
- Multi-layer parallax background (3 layers at different speeds)
- Floating particle elements (12 animated particles)
- Animated gradient orbs (sky blue, purple, teal)
- Scroll-linked opacity, scale, and parallax transforms
- Tag with pulsing dot indicator
- Two CTA buttons (primary gradient, secondary glass)

**Content:**
- Headline: "Premium web, AI, and growth—crafted into one cinematic story."
- Subheadline: "We ship momentum systems—design, automation, and campaigns that move in sync and compound results."
- CTAs: "Book a call" (primary), "See how we launch" (secondary)

**Animation Details:**
- Characters animate with 3D rotateX effect
- Staggered delays: `(wordIndex * 10 + charIndex) * 0.03`
- Spring physics: stiffness 150, damping 12

---

#### 2. ValueGrid.tsx
**Purpose:** Services showcase grid

**Features:**
- 4 service cards in 2x2 grid
- Each card has icon, category, title, description, bullet points
- Hover effects: scale, border color change, glow halo, sweep animation
- Scroll-triggered reveals with parallax

**Services:**
1. **Premium Web Experiences** (Sparkles icon, cyan)
   - Next.js + Tailwind, built for speed
   - Component libraries that actually scale
   - Story-driven landing pages that convert

2. **AI Assistants & Automations** (Cpu icon, purple)
   - Voice & chat concierge for inbound
   - CRM + calendar + ticketing integrations
   - Automations that remove busywork, not humans

3. **Growth Campaigns** (LineChart icon, emerald)
   - Meta & Google Ads built around offers
   - Localized SEO and content playbooks
   - Review generation and monitoring

4. **Lifecycle Systems** (Workflow icon, amber)
   - Email & SMS journeys that feel human
   - Insight reporting that isn't a spreadsheet dump
   - Attribution you can actually explain

**Styling:**
- Uses `.service-card`, `.service-card-hover`, `.service-card-halo`, `.service-card-sweep` classes
- Number badges (01, 02, 03, 04)
- Category labels with tracking
- Colored bullet dashes matching service theme

---

#### 3. LaunchSequence.tsx
**Purpose:** Process/launch sequence explanation

**Features:**
- 4-step vertical sequence
- Word-by-word animated text reveal
- Border-top separators
- Chapter numbers and labels
- Icon indicators (Target, Palette, Rocket, TrendingUp)

**Steps:**
1. **Strategy & Foundation** (Target icon)
   - "We calm the chaos and find the signal."
   - Persona, pain points, priorities
   - North-star metrics and guardrails
   - 90-day momentum roadmap

2. **Design & Experience** (Palette icon)
   - "Interfaces that look cinematic and feel effortless."
   - Interactive Figma component system
   - Story-driven layout and copy hierarchy
   - Motion language and hover 'aura' states

3. **Build & Integrate** (Rocket icon)
   - "We ship code that flows with the rest of your stack."
   - Next.js + Tailwind, built for speed
   - AI assistant and workflow integrations
   - Performance tuned and SEO-ready

4. **Launch & Optimize** (TrendingUp icon)
   - "Launch like an event. Iterate like a habit."
   - Meta & Google Ads aligned with the funnel
   - Weekly CRO experiments and shipping rhythm
   - Live dashboards that show what's actually working

**Animation:**
- Uses `AnimatedText` component for word-by-word reveal
- Stagger delay: 0.04s per word
- Viewport-triggered animations

---

#### 4. CTA.tsx
**Purpose:** Call-to-action section before contact

**Features:**
- Glass panel container
- Glow orb background animation
- Two CTA buttons
- Scroll-triggered fade-in

**Content:**
- Tag: "Start"
- Heading: "Ready to ship momentum?"
- Subtitle: "Book a 30-minute strategy session to map a focused 90‑day plan."
- Buttons: "Book a strategy session" (primary), "Email the team" (secondary)

---

#### 5. ContactSimple.tsx
**Purpose:** Contact form section

**Features:**
- Simple form with 3 fields (name, email, message)
- FormSubmit.co integration
- Glass panel styling
- Scroll-triggered reveal

**Form Fields:**
- Name (required)
- Email (required, type="email")
- Message/What do you need? (textarea, 4 rows)

**Submission:**
- Action URL: `https://formsubmit.co/hello@arvado.ca`
- Hidden fields: `_captcha=false`, `_template=table`, `_subject=New Arvado inquiry`

---

#### 6. Proof.tsx
**Purpose:** Social proof section (currently not used in PageClient)

**Features:**
- Client logos grid (2x2 on mobile, 4 columns on desktop)
- Testimonial quotes (2 cards)
- Scroll-triggered animations

**Content:**
- Clients: DentaLux Clinics, Aura Nail Labs, Forge Athletics, North & Co. Realty
- Testimonials from Sofia M. (DentaLux) and David L. (Forge Athletics)

---

#### 7. WorkReel.tsx
**Purpose:** Case studies/work showcase (currently not used in PageClient)

**Features:**
- 3-column grid of work items
- Each item shows client, headline result, tag, and CTA

**Work Items:**
- Nail Lounge Collective: "+142% bookings" (Beauty)
- Greenwood Dental: "-36% CPL" (Healthcare)
- Forge Athletics: "3.1x ROAS" (Fitness)

---

### Legacy Components (`components/`)
These exist but are NOT currently used in PageClient:

#### Navigation.tsx
**Purpose:** Fixed top navigation bar

**Features:**
- Magnetic link hover effects (moves with mouse)
- Active section highlighting
- Mobile menu with hamburger
- Scroll-triggered background blur
- Desktop CTA button

**Links:**
- Services (#services)
- Process (#launch)
- Work (#work)
- Contact (#contact)

**Animations:**
- Magnetic effect using `useMotionValue`, `useSpring`, `useTransform`
- Active indicator with `layoutId` for smooth transitions
- Mobile menu slide-down animation

---

#### StickyCTA.tsx
**Purpose:** Floating CTA button (bottom-right)

**Features:**
- Appears after scrolling past 600px
- Magnetic hover effect
- Pulsing glow animation
- Shine sweep on hover
- Animated arrow icon

---

#### BookCallDock.tsx
**Purpose:** Bottom center dock CTA

**Features:**
- Reveals after hero scroll (8-18% scroll progress)
- Magnetic hover effect
- Glass panel styling
- Scroll-linked opacity and Y transform

---

#### MotionProvider.tsx
**Purpose:** Context provider for motion settings

**Features:**
- `reduceMotion` state management
- Respects system `prefers-reduced-motion` preference
- Provides `useMotionSettings()` hook

**Usage:**
- Wraps entire app in PageClient
- Components check `reduceMotion` to disable animations if needed

---

#### Hero.tsx (Legacy)
**Purpose:** Old hero section (replaced by CinematicHero)

**Features:**
- Uses HeroR3FAmbient for 3D background
- MaskedHeadline component
- Sticky chapter layout (160vh height)
- Scroll-linked logo opacity, headline Y, CTA reveal

---

#### HeroR3FAmbient.tsx
**Purpose:** 3D ambient background for hero

**Features:**
- React Three Fiber canvas
- Icosahedron with MeshDistortMaterial
- Animated distortion and rotation
- Multiple point lights (sky blue, purple, green)
- Scroll-linked intensity and Z position
- Respects `reduceMotion` (switches to "demand" frameloop)

---

#### MaskedHeadline.tsx
**Purpose:** Text with shine animation

**Features:**
- Gradient text with animated background position
- Shine animation (2.6s duration, 0.4s delay)
- Used in legacy Hero component

---

#### CaseStudies.tsx
**Purpose:** Sticky case studies section

**Features:**
- Sticky chapter layout (260vh height)
- Scroll-linked slide transitions
- 3 case studies that reveal as you scroll
- Left side: text, Right side: gradient backgrounds

**Case Studies:**
1. Nail Lounge: "+142% bookings"
2. Dental Studio: "-36% CPA"
3. Local Gym: "3.1x ROAS"

---

#### Chapters.tsx
**Purpose:** Four-part launch spine (legacy version)

**Features:**
- Similar to LaunchSequence but different layout
- Left progress rail with animated fill
- Glass panel cards for each chapter
- Snap scroll sections

**Chapters:**
1. Strategy Lab
2. Design Sprints
3. Build & Automate
4. Launch & Scale

---

#### Contact.tsx (Legacy)
**Purpose:** Full-featured contact form (replaced by ContactSimple)

**Features:**
- Two-column layout (info + form)
- FormSubmit.co AJAX submission
- Success/error states with animations
- Contact details with icons (Mail, Phone, MapPin)
- More elaborate animations than ContactSimple

---

#### HowItWorks.tsx
**Purpose:** Process explanation (similar to LaunchSequence)

**Features:**
- 4 stages with parallax effects
- Scroll-triggered progress indicators
- Glow orb backgrounds
- Gradient overlays on hover

---

#### IntroOverlay.tsx
**Purpose:** Initial page load overlay

**Features:**
- Full-screen overlay that fades on scroll
- Blur effect that reduces as you scroll
- Brand introduction animation
- Disappears after 12% scroll progress

---

#### MotionToggle.tsx
**Purpose:** Toggle button for motion preferences

**Features:**
- Fixed bottom-right position
- Toggles `reduceMotion` state
- Visual indicator (dot changes color)

---

#### ResultsCTA.tsx
**Purpose:** CTA section (replaced by CTA.tsx)

**Features:**
- Glass panel container
- Two CTA buttons
- Similar to new CTA but simpler

---

#### RouteTransition.tsx
**Purpose:** Page transition wrapper (not currently used)

**Features:**
- AnimatePresence for route changes
- Blur and fade transitions
- Respects reduceMotion

---

#### Services.tsx (Legacy)
**Purpose:** Services grid (replaced by ValueGrid)

**Features:**
- Similar to ValueGrid but different styling
- 4 services in 2x2 grid
- Scroll parallax effects
- Hover animations

---

#### TrustSignals.tsx
**Purpose:** Social proof (similar to Proof.tsx)

**Features:**
- Client logos grid
- Testimonial quotes
- Two-column layout

---

## Utility Libraries

### lib/lenis.ts
**Purpose:** Smooth scroll implementation

**Features:**
- Lenis instance management
- Smooth anchor link scrolling
- Hash change handling
- Scroll offset: -96px
- RAF-based animation loop
- Global instance access via `getLenisInstance()`

**Hook:** `useLenis(enabled)` - Initializes Lenis in component

---

### lib/scroll-motion.tsx
**Purpose:** Reusable scroll animation components

**Components:**

1. **Reveal**
   - Fade-in and slide-up animation
   - Viewport-triggered (once: true)
   - Customizable delay and Y offset
   - Uses `willChange` optimization

2. **ParallaxY**
   - Vertical parallax effect
   - Customizable from/to values
   - Scroll-linked Y transform

3. **SkewOnScroll**
   - Skew effect based on scroll velocity
   - Max skew angle configurable

4. **StickyChapter**
   - Full-height sticky section
   - Configurable height in vh units
   - Centers content vertically

5. **CountUp**
   - Number counter animation
   - Scroll-triggered counting
   - Configurable from/to values

6. **SectionFade**
   - Crossfade effect for sections
   - Fades in at entry, out at exit
   - Opacity curve: [0, 0.1, 0.9, 1] → [0, 1, 1, 0]

---

## Global Styles (globals.css)

### Base Styles
- Dark color scheme
- Selection styling (sky-500/70)
- Body background: slate-950

### Utility Classes

**Layout:**
- `.site-reveal` - Relative z-10 wrapper
- `.glass-panel` - Glassmorphism effect
- `.tag` - Uppercase tag styling
- `.section-heading` - Large uppercase headings
- `.section-subtitle` - Subtitle text

**Scroll Snap:**
- `.snap-y` - Vertical scroll snap
- `.snap-start` - Snap alignment

**Theme Text Styles:**
- `.text-glass` - Glass theme with gradient
- `.text-frozen` - Frozen theme with blue gradient
- `.text-water` - Animated water gradient
- `.text-metal` - Metallic gradient

**Cinematic Utilities:**
- `.origin-glow` - Radial glow effect
- `.origin-pulse` - Pulsing animation
- `.uilab-strip` - Vertical center strip
- `.shine-sweep` - Horizontal shine sweep
- `.pipeline-line` - Animated pipeline line
- `.control-vignette` - Vignette overlay
- `.control-glow-blue/amber` - Colored glows
- `.metric-scanline` - Scanline effect

**Service Cards:**
- `.service-card` - Base card styling
- `.service-card-inner` - Inner content wrapper
- `.service-card-corner` - Corner badge
- `.service-card-hover` - Hover state
- `.service-card-halo` - Hover glow halo
- `.service-card-sweep` - Top edge sweep animation
- `.service-meta` - Meta text styling

---

## Tailwind Configuration

### Extended Theme
- **Fonts:** All 9 font families mapped
- **Colors:** Custom slate-950 (#020617)
- **Background Images:** Hero grid gradient

### Content Paths
- `./pages/**/*.{js,ts,jsx,tsx,mdx}`
- `./components/**/*.{js,ts,jsx,tsx,mdx}`
- `./app/**/*.{js,ts,jsx,tsx,mdx}`
- `./src/**/*.{js,ts,jsx,tsx,mdx}`

---

## Animation Patterns

### Common Animation Techniques

1. **Scroll-Linked Animations**
   - Uses `useScroll` + `useTransform` from Framer Motion
   - Parallax effects with different speeds
   - Opacity/scale transforms based on scroll progress

2. **Viewport Triggers**
   - `useInView` hook for scroll-triggered animations
   - `once: true` for single-play animations
   - `amount: 0.3` for trigger threshold

3. **Staggered Animations**
   - Character-by-character reveals
   - Word-by-word text animations
   - List item staggers

4. **Spring Physics**
   - Magnetic hover effects using springs
   - Smooth, natural motion
   - Configurable stiffness and damping

5. **Glassmorphism**
   - Backdrop blur effects
   - Semi-transparent backgrounds
   - Border highlights

6. **Glow Effects**
   - Radial gradients with blur
   - Animated scale and opacity
   - Multiple layered glows

---

## Performance Optimizations

1. **Motion Reduction**
   - Respects `prefers-reduced-motion`
   - Components check `reduceMotion` context
   - Disables animations when needed

2. **Will-Change Optimization**
   - Applied during animations
   - Removed after completion
   - Prevents layout thrashing

3. **Lenis Smooth Scroll**
   - RAF-based animation loop
   - Efficient scroll handling
   - Configurable lerp (0.08 default)

4. **React Three Fiber**
   - Demand frameloop when motion reduced
   - Optimized DPR settings
   - Suspense boundaries

5. **Viewport Triggers**
   - Animations only trigger when visible
   - `once: true` prevents re-animations
   - Efficient intersection observers

---

## Current Active Components (PageClient.tsx)

```tsx
<MotionProvider>
  <Navigation />
  <div className="pt-16 w-full overflow-x-hidden">
    <CinematicHero />
    <section id="services">
      <ValueGrid />
    </section>
    <LaunchSequence />
    <CTA />
    <ContactSimple />
  </div>
  <StickyCTA />
  <BookCallDock />
</MotionProvider>
```

---

## Design Philosophy

1. **Cinematic Motion**
   - Character-by-character reveals
   - Multi-layer parallax
   - Smooth, spring-based physics

2. **Glassmorphism**
   - Frosted glass effects
   - Subtle borders and glows
   - Depth through blur

3. **Dark Theme**
   - Deep slate-950 background
   - High contrast text
   - Sky blue accent color

4. **Premium Feel**
   - High-end animations
   - Attention to detail
   - Smooth interactions

5. **Performance First**
   - Respects motion preferences
   - Optimized animations
   - Efficient rendering

---

## Key Interactions

1. **Magnetic Links**
   - Navigation links and CTAs
   - Follow mouse movement
   - Spring-based physics

2. **Scroll Animations**
   - Parallax backgrounds
   - Fade-in reveals
   - Scale transforms

3. **Hover States**
   - Scale transforms
   - Glow effects
   - Border color changes
   - Shine sweeps

4. **Form Interactions**
   - Focus states with scale
   - Smooth transitions
   - Success/error animations

---

## Content Strategy

### Messaging
- **Brand:** Arvado - Premium Digital Growth Studio
- **Value Prop:** Full-stack growth (web, AI, campaigns)
- **Tone:** Premium, cinematic, results-focused
- **Target:** Local businesses, operators hitting aggressive targets

### Key Messages
- "Premium web, AI, and growth—crafted into one cinematic story."
- "We ship momentum systems"
- "Four tightly-linked chapters"
- "One partner across web, AI, and performance"

---

## Next Steps for Gemini

When working with this codebase, consider:

1. **Maintaining Design Consistency**
   - Use existing utility classes
   - Follow animation patterns
   - Respect motion preferences

2. **Performance**
   - Optimize animations
   - Use viewport triggers
   - Respect reduceMotion

3. **Component Structure**
   - Follow existing patterns
   - Use scroll-motion utilities
   - Maintain glassmorphism style

4. **Content Updates**
   - Keep messaging consistent
   - Maintain premium tone
   - Update CTAs as needed

---

## File Structure Summary

```
app/
├── layout.tsx                    # Root layout with fonts
├── page.tsx                      # Entry point
├── globals.css                   # Global styles & utilities
└── (marketing)/
    ├── PageClient.tsx            # Main page orchestrator
    ├── components/               # Legacy components (not all used)
    │   ├── Navigation.tsx        # ✅ Used
    │   ├── StickyCTA.tsx         # ✅ Used
    │   ├── BookCallDock.tsx      # ✅ Used
    │   ├── MotionProvider.tsx    # ✅ Used
    │   └── [other legacy components]
    ├── components_new/           # Active components
    │   ├── CinematicHero.tsx     # ✅ Main hero
    │   ├── ValueGrid.tsx         # ✅ Services grid
    │   ├── LaunchSequence.tsx    # ✅ Process steps
    │   ├── CTA.tsx               # ✅ CTA section
    │   ├── ContactSimple.tsx     # ✅ Contact form
    │   ├── Proof.tsx            # ⚠️ Not used
    │   └── WorkReel.tsx          # ⚠️ Not used
    └── lib/
        ├── lenis.ts              # Smooth scroll
        └── scroll-motion.tsx     # Animation utilities
```

---

**End of Documentation**

