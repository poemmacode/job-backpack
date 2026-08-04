# 026 - Browser Extension - Specification

## Overview

Extension de Chrome que permite a los usuarios guardar vacantes directamente desde sitios web de empleo (LinkedIn, Indeed, Glassdoor, etc.) con un clic. Extrae automáticamente los datos de la vacante y los envía a Job Backpack.

## Goals

- Guardar jobs directamente desde cualquier sitio de empleo
- Extraer datos automáticamente (título, empresa, ubicación, URL)
- Sincronizar con la app web de Job Backpack
- Facilitar el proceso de captura de oportunidades

## User Stories

1. Como usuario, quiero hacer clic en el icono de la extensión para guardar la vacante actual
2. Como usuario, quiero ver los datos extraídos antes de guardar
3. Como usuario, quiero agregar notas rápidas al guardar
4. Como usuario, quiero ver si la vacante ya está guardada
5. Como usuario, quiero acceder rápidamente a mi lista de jobs guardados
6. Como usuario, quiero configurar mi API key de Job Backpack

## Scope

### Incluido

- Extension Chrome (Manifest V3)
- Icono en la toolbar con popup
- Detección automática de páginas de job listings
- Extracción de: título, empresa, ubicación, URL, salario (si disponible)
- Popup con formulario pre-llenado
- Botón de guardado rápido
- Indicador de job ya guardado
- Configuración de API key
- Soporte para: LinkedIn, Indeed, Glassdoor, Wellfound

### No incluido

- Sync automático en background
- Múltiples profiles de guardado
- Captura de screenshots
- Apply directo desde la extensión
- Notificaciones de nuevos jobs
- Soporte para Firefox/Safari (primero Chrome)

## Acceptance Criteria

- [ ] Extension Chrome creada con Manifest V3
- [ ] Popup funcional con formulario
- [ ] Detección de páginas de job listings
- [ ] Extracción automática de datos
- [ ] Guardado en Job Backpack via API
- [ ] Indicador de job ya guardado
- [ ] Configuración de API key
- [ ] Funciona en LinkedIn
- [ ] Funciona en Indeed
- [ ] Funciona en Glassdoor
- [ ] Funciona en Wellfound

## Technical Notes

- Manifest V3 (requerido por Chrome)
- Content scripts para inyectar en páginas
- Background service worker para comunications
- Popup HTML/CSS/JS simple
- Almacenar API key en chrome.storage
- API endpoint en Job Backpack para recibir jobs
- Chrome Web Store deployment (proceso separado)
