# 027 - Email Import / Parsing - Plan

## Architecture

```
Email Import
├── API Endpoints
│   ├── POST /api/emails/ingest (receive forwarded emails)
│   ├── POST /api/emails/upload (upload .eml files)
│   └── GET  /api/emails/history (list processed emails)
├── Parsers
│   ├── LinkedInParser
│   ├── IndeedParser
│   ├── GenericParser
│   └── ParserFactory
├── Storage
│   ├── emails table (raw email storage)
│   └── email_jobs table (email → job mapping)
└── UI
    ├── /dashboard/import (upload + history)
    └── EmailPreview component
```

## Database Schema

```prisma
model ImportedEmail {
  id            String   @id @default(uuid())
  userId        String
  subject       String?
  from          String?
  rawEmail      String   @db.Text
  parsedData    Json?
  status        String   @default("pending") // pending, processed, error
  jobId         String?
  createdAt     DateTime @default(now())
  
  user          User     @relation(fields: [userId], references: [id])
  job           Job?     @relation(fields: [jobId], references: [id])
}
```

## Parser Logic

### LinkedIn Parser

```typescript
function parseLinkedInEmail(html: string) {
  const title = extractBetween(html, '<h1>', '</h1>') 
    || extractPattern(html, /(?:Job Title|Position)[:\s]*([^\n<]+)/i);
  
  const company = extractPattern(html, /(?:Company|at)\s*([^\n<]+)/i);
  const location = extractPattern(html, /(?:Location)[:\s]*([^\n<]+)/i);
  const url = extractUrl(html, /linkedin\.com\/jobs\/view\/\d+/);
  
  return { title, company, location, url };
}
```

### Indeed Parser

```typescript
function parseIndeedEmail(html: string) {
  const title = extractPattern(html, /(?:Job Title|Position)[:\s]*([^\n<]+)/i);
  const company = extractPattern(html, /(?:Company|Employer)[:\s]*([^\n<]+)/i);
  const location = extractPattern(html, /(?:Location)[:\s]*([^\n<]+)/i);
  const url = extractUrl(html, /indeed\.com\/viewjob/);
  
  return { title, company, location, url };
}
```

### Generic Parser

```typescript
function parseGenericEmail(text: string) {
  // Try common patterns
  const title = extractPattern(text, /(?:position|job title|role)[:\s]*([^\n]+)/i);
  const company = extractPattern(text, /(?:company|employer|at)\s*([^\n]+)/i);
  const location = extractPattern(text, /(?:location|where)[:\s]*([^\n]+)/i);
  const url = extractUrl(text, /https?:\/\/[^\s]+/);
  
  return { title, company, location, url };
}
```

## Files to Create

### API

- `src/app/api/emails/ingest/route.ts`
- `src/app/api/emails/upload/route.ts`
- `src/app/api/emails/history/route.ts`

### Lib

- `src/features/emails/lib/parsers/linkedin.ts`
- `src/features/emails/lib/parsers/indeed.ts`
- `src/features/emails/lib/parsers/generic.ts`
- `src/features/emails/lib/parsers/index.ts`
- `src/features/emails/lib/extractors.ts`

### UI

- `src/app/dashboard/import/page.tsx`
- `src/features/emails/components/EmailUpload.tsx`
- `src/features/emails/components/EmailPreview.tsx`
- `src/features/emails/components/EmailHistory.tsx`

### Database

- `prisma/schema.prisma` (add ImportedEmail model)

## Email Ingest Flow

```
1. User forwards email to jobs@jobbackpack.app
2. Email service receives → POST /api/emails/ingest
3. System identifies user by recipient address
4. Parser extracts job data from email content
5. Preview shown to user (or auto-save if configured)
6. Job created in database
7. ImportedEmail record created with status
```

## Upload Flow

```
1. User goes to /dashboard/import
2. User selects .eml or .msg file
3. File uploaded to POST /api/emails/upload
4. Server parses email content
5. Preview shown with extracted data
6. User confirms → Job created
7. ImportedEmail record created
```
