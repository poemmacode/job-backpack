# 026 - Browser Extension - Plan

## Architecture

```
Browser Extension
├── manifest.json
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/
│   └── scraper.js (content script)
├── background/
│   └── service-worker.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png

Job Backpack API
├── /api/extension/save (POST)
└── /api/extension/check (GET)
```

## Manifest V3

```json
{
  "manifest_version": 3,
  "name": "Job Backpack",
  "version": "1.0.0",
  "description": "Save jobs directly from job boards to Job Backpack",
  "permissions": ["activeTab", "storage", "scripting"],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "content_scripts": [
    {
      "matches": [
        "*://*.linkedin.com/jobs/*",
        "*://*.indeed.com/*",
        "*://*.glassdoor.com/*",
        "*://*.wellfound.com/*"
      ],
      "js": ["content/scraper.js"]
    }
  ],
  "background": {
    "service_worker": "background/service-worker.js"
  }
}
```

## Content Scrapers

### LinkedIn

```javascript
function scrapeLinkedIn() {
  return {
    title: document.querySelector('.job-details-jobs-unified-top-card__job-title')?.textContent?.trim(),
    company: document.querySelector('.job-details-jobs-unified-top-card__company-name')?.textContent?.trim(),
    location: document.querySelector('.job-details-jobs-unified-top-card__bullet')?.textContent?.trim(),
    salary: document.querySelector('.job-details-jobs-unified-top-card__salary')?.textContent?.trim(),
    url: window.location.href
  };
}
```

### Indeed

```javascript
function scrapeIndeed() {
  return {
    title: document.querySelector('.jobsearch-JobInfoHeader-title')?.textContent?.trim(),
    company: document.querySelector('[data-testid="inlineHeader-companyName"]')?.textContent?.trim(),
    location: document.querySelector('[data-testid="inlineHeader-companyLocation"]')?.textContent?.trim(),
    salary: document.querySelector('.jobsearch-JobInfoHeader-salary')?.textContent?.trim(),
    url: window.location.href
  };
}
```

### Glassdoor

```javascript
function scrapeGlassdoor() {
  return {
    title: document.querySelector('.JobDetails_jobTitle__GLyJ1')?.textContent?.trim(),
    company: document.querySelector('.JobDetails_employerHeader__ZMvBn')?.textContent?.trim(),
    location: document.querySelector('.JobDetails_location__rKuJD')?.textContent?.trim(),
    salary: document.querySelector('.JobDetails_salary__pVlJK')?.textContent?.trim(),
    url: window.location.href
  };
}
```

## Popup UI

```
┌─────────────────────────────────────┐
│  🎒 Job Backpack                   │
├─────────────────────────────────────┤
│                                     │
│  Title: [Senior React Developer]    │
│  Company: [TechCorp]                │
│  Location: [Remote]                 │
│  Salary: [$120-150k]               │
│  URL: [https://...]                 │
│                                     │
│  Notes: [Quick note...]            │
│                                     │
│  [Save to Job Backpack]            │
│                                     │
│  ─────────────────────────────────  │
│  ⚙️ Settings                       │
└─────────────────────────────────────┘
```

## API Endpoint

### POST /api/extension/save

```typescript
// src/app/api/extension/save/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key required' }, { status: 401 });
  }

  const user = await prisma.user.findFirst({
    where: { apiKey },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
  }

  const body = await request.json();
  const { title, company, location, url, salary, notes } = body;

  const job = await prisma.job.create({
    data: {
      title,
      company,
      location,
      url,
      salary,
      notes: notes ? `${notes}\n\nSaved via Browser Extension` : 'Saved via Browser Extension',
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true, job });
}
```

## Files to Create

### Extension (separate folder)

- `extension/manifest.json`
- `extension/popup/popup.html`
- `extension/popup/popup.css`
- `extension/popup/popup.js`
- `extension/content/linkedin.js`
- `extension/content/indeed.js`
- `extension/content/glassdoor.js`
- `extension/background/service-worker.js`
- `extension/icons/` (icon files)

### API (in main app)

- `src/app/api/extension/save/route.ts`
- `src/app/api/extension/check/route.ts`

### UI (in main app)

- `src/app/dashboard/extension/page.tsx` - Setup instructions
- `src/features/extension/components/ExtensionSetup.tsx`
