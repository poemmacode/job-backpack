# 011 - Attachments - Plan

## Architecture

### Prisma Schema

```prisma
model Attachment {
  id            String   @id @default(uuid())
  name          String
  url           String
  size          Int
  type          String
  applicationId String
  application   Application @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  createdAt     DateTime @default(now())

  @@index([applicationId])
}
```

### Supabase Storage

- Bucket: `attachments`
- Policy: Autenticados pueden subir
- Policy: Solo propio usuario puede leer

### Data Layer

```
src/features/attachments/
├── repositories/attachments.ts
├── actions/attachments.ts
├── components/
│   ├── AttachmentForm.tsx
│   ├── AttachmentCard.tsx
│   └── AttachmentList.tsx
├── types.ts
└── index.ts
```

### Server Actions

```typescript
uploadAttachment(applicationId: string, file: File)
deleteAttachment(id: string, userId: string)
getAttachments(applicationId: string)
```

## Data Flow

```
ApplicationDetailPage
  └── AttachmentSection (Client)
        ├── AttachmentForm (upload)
        └── AttachmentList
              └── AttachmentCard (download/delete)
```

## Design

### AttachmentSection en Application Detail

```
┌─────────────────────────────────────────┐
│ Attachments (2)                         │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ [Choose File] Resume.pdf    [Upload]│ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 📄 Resume.pdf                       │ │
│ │ 245 KB • Uploaded 2 days ago        │ │
│ │                    [Download] [Delete]│ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 📄 Cover Letter.docx               │ │
│ │ 128 KB • Uploaded 3 days ago        │ │
│ │                    [Download] [Delete]│ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### File Validation

- Max size: 10MB
- Allowed types: application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpeg, image/png

## Testing

- Verificar upload de archivos
- Verificar validación de tipo y tamaño
- Verificar descarga
- Verificar eliminación con confirmación
- Verificar que solo usuario dueño puede CRUD
