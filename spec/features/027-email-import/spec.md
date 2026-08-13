# 027 - Email Import / Parsing - Specification

## Overview

Sistema para importar ofertas de empleo desde emails. Los usuarios pueden forward emails de ofertas de trabajo a una dirección especial, o subir archivos .eml/.msg, y el sistema extrae automáticamente los datos de la vacante.

## Goals

- Recibir emails con ofertas de empleo y extraer datos automáticamente
- Parsear diferentes formatos de emails de job listings
- Crear jobs automáticamente con los datos extraídos
- Permitir importar archivos .eml/.msg manualmente
- Detectar duplicate emails para evitar jobs duplicados

## User Stories

1. Como usuario, quiero forward emails de ofertas a `jobs@jobbackpack.app` para que se guarden automáticamente
2. Como usuario, quiero subir archivos .eml/.msg para importar ofertas
3. Como usuario, quiero ver una preview de lo que se va a importar antes de confirmar
4. como usuario, quiero ver el historial de emails importados
5. Como usuario, quiero que el sistema detecte si una oferta ya fue importada

## Scope

### Incluido

- Email forwarding ingestion (receive emails via API endpoint)
- Parser para emails de: LinkedIn, Indeed, Glassdoor, empresas genéricas
- Extractor de datos: título, empresa, ubicación, salario, descripción, URL
- Upload de archivos .eml/.msg
- Preview antes de guardar
- Deduplicación por URL o título+empresa
- Log de emails procesados

### No incluido

- Integration con proveedores de email (SendGrid, Mailgun)
- Auto-forwarding setup desde Gmail/Outlook
- Parseo de adjuntos (PDFs, imágenes)
- OCR para imágenes de ofertas
- Integración con calendario

## Acceptance Criteria

- [ ] Endpoint POST /api/extension/save acepta emails raw
- [ ] Parser extrae datos de LinkedIn job emails
- [ ] Parser extrae datos de Indeed job emails
- [ ] Parser extrae datos de emails genéricos
- [ ] Upload de archivos .eml funciona
- [ ] Preview muestra datos antes de guardar
- [ ] Deduplicación previene jobs duplicados
- [ ] Log de emails procesados visible en UI
- [ ] UI en /dashboard/import muestra historial

## Technical Notes

- Usar librería `mailparser` para parsear emails
- Almacenar emails raw en Supabase Storage o tabla dedicada
- Endpoint público para recibir emails (con verificación básica)
- Parser extensible con estrategias por remitente
- Los archivos .eml se parsean client-side o server-side
