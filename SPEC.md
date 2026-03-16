# Atlas Funeral Home Marketing Agency Website

## Overview
Build a professional marketing agency website for Atlas, niched into funeral home marketing. 
This is modeled directly on https://delpriorehospitality.com/ (wedding venue marketing agency doing $300k/mo) but adapted for funeral homes with better UI.

## Tech Stack
- React (Vite)
- GSAP + ScrollTrigger for scroll animations
- CSS Modules or styled-components
- Fully responsive (mobile-first)
- Static site (deployable to GitHub Pages)

## Color Palette
- Primary: Deep navy (#1a1a2e or similar)
- Accent: Gold/champagne (#c9a96e or similar)  
- Background: Off-white (#fafaf5) and dark sections alternating
- Text: Dark charcoal on light, white/cream on dark
- Dignified, premium feel — NOT generic corporate

## Page Sections (exact order, match Del Priore structure)

### 1. Hero
- Headline: "America's Leading Funeral Home Marketing Agency"
- Subheadline: "We grow and scale funeral home businesses"
- Body: "We deliver all-inclusive marketing systems for funeral homes. You focus on serving families. We handle the marketing."
- CTA button: "Book Your Call" (links to #contact or calendly placeholder)
- Full-width background with subtle parallax or gradient overlay

### 2. Trust Bar
- Scrolling/marquee logos of funeral homes served (use placeholder logos for now — gray boxes with text like "Smith & Sons", "Heritage Memorial", "Peaceful Rest", etc.)
- Label: "TRUSTED BY FUNERAL HOMES NATIONWIDE"

### 3. Passion & Expertise
- Two side-by-side blocks:
  - PASSION: "We live and breathe funeral home marketing. Every strategy we build stems from our commitment to helping funeral directors connect with families who need them."
  - EXPERTISE: "With proven marketing systems that consistently deliver calls, arrangements, and revenue growth. You bring the funeral home. We bring the playbook."
- CTA: "Book Your Call"

### 4. Testimonials
- Video testimonial section (use placeholder cards with funeral home names and quotes for now)
- Auto-scrolling carousel
- Names: "Heritage Memorial Chapel", "Peaceful Rest Funeral Home", "Golden Gate Memorial", "Evergreen Services", "Dignity First Funeral Home"

### 5. Nationwide Coverage
- "Funeral Home Marketing That Fills Your Calendar"
- Brief copy about coast-to-coast coverage
- Could include a subtle US map or state dots

### 6. Services Grid (4 cards)
- **AI Receptionist**: "Never miss a call. Our 24/7 AI receptionist answers every call, handles family inquiries, and schedules arrangements automatically."
- **Search Engine Optimization**: "Dominate Google when families search for funeral homes in your area. Our proven SEO strategies put you at the top."
- **Website Design**: "Premium, dignified websites that reflect the quality of your services and convert visitors into calls."
- **Reputation Management**: "Build and maintain a 5-star online presence. Automated review generation and response management."

### 7. Process (3 steps)
- Step 1 "Audit & Strategy": "We audit your current presence and identify gaps. Then build a custom strategy for your market."
- Step 2 "Execute": "From SEO to AI agents to ad campaigns, we execute everything. No more juggling vendors."
- Step 3 "Track & Grow": "We track every call, every arrangement, every dollar. Real results. Real accountability."

### 8. Case Studies / Results
- 3 result cards with hard numbers (use realistic placeholders):
  - "Heritage Memorial: 85% increase in monthly calls"
  - "Peaceful Rest: $50,000/year saved on staffing with AI Receptionist"  
  - "Golden Gate: 3x more Google visibility in 6 months"

### 9. Stats Counters (animate on scroll)
- "Funeral Homes Served: 50+"
- "States Covered: 15+"
- "In Additional Revenue Generated: $2M+"

### 10. About Us
- "Atlas is the premier funeral home marketing agency, trusted by funeral homes nationwide."
- "Founded by a team of top-tier engineers and marketing professionals, we started with a simple mission: help funeral homes stop losing calls and start generating their own qualified leads."
- "Our systems combine SEO dominance, AI-powered call handling, and proven lead conversion to create a predictable pipeline of families who need your services."
- CTA: "Book Your Call"

### 11. Support Section
- "24/7 Support"
- "Every client gets direct access to our team. Questions answered fast. Issues resolved immediately."

### 12. Footer
- CTA: "Apply For Free Consultation"
- Contact form or calendly embed placeholder
- Links: Home, Services, About, Contact
- Copyright Atlas 2026

## Animations (GSAP + ScrollTrigger)
- Hero text fade-in on load
- Trust bar infinite horizontal scroll (marquee)
- Services cards stagger in from bottom on scroll
- Stats counters animate/count up when scrolled into view
- Process steps reveal sequentially
- Case study cards slide in
- Smooth scroll between sections (Lenis optional)

## Fonts
- Heading: Playfair Display or similar serif (dignified)
- Body: Inter or similar clean sans-serif

## Images
- Use gradient overlays and abstract shapes instead of stock photos for v1
- Dark, dignified feel
- NO cheesy funeral stock photos

## Deliverable
- Fully working React app
- `npm run build` produces static files for deployment
- All components in separate files
- Responsive: looks great on mobile (375px) and desktop (1400px)
