# ZYNIQ Cloud Landing Page (`ZYNIQ-CLOUD-LP`)
Next.js 14 with TypeScript, Tailwind CSS, and Framer Motion.

This project contains the **ZYNIQ Cloud** (`https://zyniq.cloud`) landing page along with the shared ZYNIQ ecosystem marketing pages.

---

## ☁️ Primary Landing Page: ZYNIQ Cloud (`/cloud`)

- **Tagline**: *"SOVEREIGN CLOUD. DARK MATTER SECURITY."*
- **Description**: Sovereign smart cloud hosting built for everyone — from DevOps engineers to beginners. Protected by AI-powered Dark Matter security.
- **Key Sections**:
  - **Hero Section**: 3D geometric grid with sovereign cloud typography & floating security shields.
  - **Trust Bar**: 99.999% SLA, 24/7 AI Monitoring, <5ms edge latency, 12+ global regions.
  - **Why ZYNIQ Cloud**: High-availability compute, automated backups, zero-trust network, self-healing clusters.
  - **Services Grid**: Dedicated Servers, Cloud VPS, Managed Kubernetes, Web Hosting, Storage Share & Object Storage.
  - **Dark Matter Security**: Autonomous threat defense, DDoS mitigation, and intrusion prevention.
  - **Pricing Tiers**: Starter ($4/mo), Professional ($19/mo), Enterprise (Custom).
  - **Compliance**: SOC 2 Type II, ISO 27001, GDPR, HIPAA, PCI DSS, CSA STAR.
  - **Waitlist & Onboarding**: Direct CTA with email waitlist integration.

---

## 🛠️ Quick Start

### 1. Development Server
```bash
npm run dev
```
Open [http://localhost:3555](http://localhost:3555) (or [http://localhost:3555/cloud](http://localhost:3555/cloud)).

### 2. Production Build
```bash
npm run build
npm start
```

### 3. Docker
```bash
docker build -t zyniq-cloud-lp .
docker run -p 3555:3555 zyniq-cloud-lp
```

---

## 📁 Project Structure

```
ZYNIQ-CLOUD-LP/
├── app/
│   ├── cloud/             # ☁️ ZYNIQ Cloud landing page (page.tsx, layout.tsx)
│   ├── core/              # ZYNIQ Core landing page
│   ├── solutions/         # ZYNIQ Solutions landing page
│   ├── studio/            # ZYNIQ Studio landing page
│   ├── page.tsx           # Default route (redirects directly to /cloud)
│   ├── layout.tsx         # Root layout with fonts, loading screen, and navigation
│   └── globals.css        # Global Tailwind styles
├── components/
│   ├── HeroVisuals/
│   │   └── CloudVisual.tsx # ZYNIQ Cloud 3D canvas / particle visual
│   ├── CustomCursor.tsx    # Branded interactive cursor
│   ├── Navbar.tsx          # Architectural navigation bar
│   ├── Footer.tsx          # Unified ZYNIQ footer
│   ├── WaitlistForm.tsx    # Waitlist collection form
│   └── PreFooterSecurity.tsx # Dark Matter security banner
├── styles/
│   ├── z-navbar.css        # Z-Framework navbar styles
│   ├── z-tokens.css        # Design tokens
│   └── z-fonts.css         # Typography imports
├── public/                 # Static assets, SVG logos, brand icons
├── Dockerfile              # Standalone container build
└── package.json            # Dependencies & scripts
```

---

© 2026 ZYNIQ Cloud. All rights reserved.
# ZYNIQ-CLOUD-LP
