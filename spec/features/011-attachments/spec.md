# 011 - Attachments - Specification

## Overview

Sistema de adjuntos para permite al usuario subir y gestionar archivos relacionados con sus aplicaciones, como CVs, cartas de presentación, ofertas de trabajo, y otros documentos relevantes.

## Goals

- Subir archivos (PDF, DOC, DOCX, JPG, PNG)
- Listar adjuntos por aplicación
- Descargar adjuntos
- Eliminar adjuntos con confirmación
- Mostrar información del archivo (nombre, tamaño, fecha)

## User Stories

1. Como usuario, quiero subir archivos a una aplicación
2. Como usuario, quiero ver todos los archivos adjuntos de una aplicación
3. Como usuario, quiero descargar un archivo adjunto
4. Como usuario, quiero eliminar un archivo adjunto
5. Como usuario, quiero ver el tamaño y fecha de cada archivo

## Scope

### Incluido

- Modelo Attachment en Prisma
- Upload de archivos (max 10MB)
- Tipos permitidos: PDF, DOC, DOCX, JPG, PNG
- Storage en Supabase Storage
- CRUD de adjuntos
- UI en página de detalle de aplicación

### No incluido

- Preview de archivos
- Edición de archivos
- Versionado
- Drag & drop
- Multiple upload

## Acceptance Criteria

- [ ] Modelo Attachment creado en Prisma
- [ ] Subir archivo desde página de detalle
- [ ] Listar archivos con nombre, tamaño, fecha
- [ ] Descargar archivo
- [ ] Eliminar archivo con confirmación
- [ ] Validar tipo y tamaño de archivo
- [ ] Mostrar errores de upload

## Technical Notes

- Usar Supabase Storage para archivos
- Crear bucket 'attachments' en Supabase
- Modelo Attachment con url, name, size, type
- Server action para upload con validación
- Links de descarga con token firmado
