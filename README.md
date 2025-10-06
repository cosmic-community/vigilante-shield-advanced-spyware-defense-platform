# Vigilante Shield - Advanced Spyware Defense Platform

![App Preview](https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=300&fit=crop&auto=format)

A comprehensive security platform designed for journalists, activists, and high-risk individuals facing sophisticated digital threats. Vigilante Shield provides real-time threat intelligence, URL analysis, and step-by-step device hardening guides - all while maintaining complete user privacy.

## Features

- 🛡️ **Threat Intelligence Dashboard** - Real-time visualization of global cyber threats from AlienVault OTX and VirusTotal APIs
- 🔍 **Link & SMS Analyzer** - Instant URL threat assessment with multi-layered security analysis
- 📱 **Security Hardening Wizard** - Interactive guides for iOS Lockdown Mode and Android device hardening
- ⚠️ **Threat Education** - Comprehensive database of threat types with protection methods
- ❓ **FAQ System** - Searchable knowledge base with expert security guidance
- 🔒 **Privacy-First** - Zero personal data collection, local-only progress tracking

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e420d9260d9dd939d1c1a0&clone_repository=68e42416260d9dd939d1c1c5)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "**Project:** "Vigilante Shield" - A web app for journalists and activists to proactively defend against advanced spyware.
> 
> **Goal:** Build a prototype with three core features that provide threat intelligence, analyze suspicious links, and guide device hardening.
> 
> **Core Features:**
> 1. Threat Intelligence Dashboard: Fetches and displays recent malicious domains and IPs from the AlienVault OTX API. Data is shown on an interactive map or timeline.
> 2. Link & SMS Analyzer: A tool to check suspicious URLs. The backend will: Compare the URL against a database of known threats, analyze domain registration details to flag suspiciously new domains, and return a simple risk assessment (Low, Medium, High).
> 3. Security Hardening Wizard: An interactive, step-by-step guide for securing iOS/Android. It tracks progress and includes steps like enabling Lockdown Mode, reviewing app permissions, and enabling 2FA, with clear explanations for each step.
> 
> **Technical Stack:**
> Frontend: React.js
> Backend: Python (FastAPI)
> Database: PostgreSQL (for cached threat data and anonymized user progress)
> APIs: AlienVault OTX and VirusTotal for threat intelligence and URL scanning.
> Security: Implement HTTPS, Content Security Policy (CSP), and input sanitization.
> 
> **User Flow:**
> 1. Landing page with three main tools.
> 2. Link Analyzer is instantly accessible.
> 3. Hardening Wizard saves progress locally/anonymously.
> 4. Dashboard shows the global threat context.
> 
> **Guiding Principles:**
> Privacy-first: No personal data storage; all analysis is anonymized.
> Clear Disclaimers: The app is an aid, not a guarantee, against sophisticated threats.
> User Empowerment: Educate users by explaining the why behind security steps.
> 
> **First Task:** Generate the Python (FastAPI) backend endpoint that accepts a URL, checks it via the AlienVault OTX API, and returns a risk analysis."

### Code Generation Prompt

> Based on the content model I created for "Vigilante Shield" - A web app for journalists and activists to proactively defend against advanced spyware, now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Content Management**: Cosmic CMS
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: Bun
- **Runtime**: Node.js

## Getting Started

### Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account with your content bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Security Guides with Related Content

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all security guides with depth for related content
const response = await cosmic.objects
  .find({ type: 'security-guides' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const guides = response.objects as SecurityGuide[]
```

### Querying Threat Categories by Severity

```typescript
// Get critical threats
const response = await cosmic.objects
  .find({ 
    type: 'threat-categories',
    'metadata.severity_level': 'critical'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const criticalThreats = response.objects as ThreatCategory[]
```

### Fetching FAQs by Category

```typescript
// Get FAQs for a specific category
const response = await cosmic.objects
  .find({ 
    type: 'faqs',
    'metadata.category': 'threats'
  })
  .props(['id', 'title', 'slug', 'metadata'])

const faqList = response.objects as FAQ[]
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS to manage all security content. The content model includes:

- **Security Guides**: Step-by-step tutorials for device hardening
- **Threat Categories**: Educational content about different security threats
- **FAQs**: Common questions and expert answers organized by category

All content can be updated through the Cosmic dashboard without requiring code changes, making it easy to keep security guidance current as threats evolve.

## Deployment Options

### Deploy to Vercel

The fastest way to deploy this Next.js application:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy" button above
2. Connect your GitHub account
3. Add your environment variables in the Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify's dashboard
4. Deploy!

### Manual Deployment

1. Build the production bundle:
   ```bash
   bun run build
   ```

2. Start the production server:
   ```bash
   bun run start
   ```

Remember to set your environment variables in your hosting platform's dashboard.

---

Built with [Cosmic](https://www.cosmicjs.com) - The Headless CMS for modern web applications
<!-- README_END -->