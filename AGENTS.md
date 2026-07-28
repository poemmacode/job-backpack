# AGENTS.md

# Job Backpack

Job Backpack es una aplicación web para ayudar a profesionales de tecnología a organizar y dar seguimiento a sus postulaciones de empleo.

Este proyecto sigue una metodología **Specification Driven Development (SDD)**.

La misión, visión, alcance y objetivos del producto se encuentran en:

spec/constitution/mission.md

Todo el desarrollo debe alinearse con ese documento.

---

# Fuente de verdad

Siempre consultar los documentos en este orden:

1. spec/features/*/spec.md
2. spec/features/*/plan.md
3. spec/features/*/tasks.md
4. spec/constitution/*
5. AGENTS.md

Si existe cualquier contradicción:

Detenerse y pedir aclaración.

Nunca asumir.

---

# Flujo obligatorio

Para cualquier feature nueva:

1. Revisar `spec/constitution/`
2. Revisar `roadmap.md`
3. Crear la siguiente carpeta incremental

```
spec/features/NNN-feature-name
```

4. Escribir `spec.md`
5. Escribir `plan.md`
6. Escribir `tasks.md`
7. Esperar aprobación
8. Implementar únicamente las tareas marcadas
9. Ejecutar lint
10. Ejecutar tests
11. Verificar build
12. Actualizar documentación
13. Marcar tareas completadas
14. Actualizar roadmap.mp

Nunca saltarse pasos.

---

# Implementación

Nunca implementar funcionalidades que no estén descritas en:

```
spec.md
```

Si surge una mejora:

No implementarla.

Agregarla como idea futura en:

```
spec/constitution/roadmap.md
```

---

# Cambios pequeños

Incluso para cambios pequeños:

- actualizar tasks.md
- marcar progreso
- explicar qué cambió

---

# Arquitectura

Toda decisión debe respetar:

```
spec/constitution/tech-stack.md
```

No modificar la arquitectura sin aprobación.

---

# Dependencias

No instalar nuevas dependencias.

Primero justificar:

- por qué
- alternativas
- impacto

Esperar aprobación.

---

# Calidad

Antes de terminar:

- tests pasando
- lint pasando
- build exitoso

No considerar una tarea finalizada si alguno falla.

---

# Documentación

Si cambia:

- arquitectura
- estructura
- variables de entorno
- comandos
- decisiones técnicas

Actualizar la documentación correspondiente.

La documentación es parte del entregable.

---

# Dudas

Si la confianza es menor al 80%:

Preguntar.

Nunca inventar reglas de negocio.

---

# Objetivo

Construir código listo para producción que pueda mantenerse durante años.
