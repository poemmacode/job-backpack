## spec/ - Spec Driven Development

Documentacion viva del proyecto. Organizada para el desarrollo dirigido por especificacion: primero se escribe la spec, luego el plan,luego las tareas y solo entonces se toca el codigo.

## Estructura

```
spec/
    constitution/      <- Reglas estables del proyecto
        mission.md     <- Que construimos y para quien?
        tech-stack.md  <- Tecnologias, modelo de datos y convenciones
        roadmap.md     <- Orden de las features
    features/                    <- Una carpeta por feature
        001-project-setup
            spec.md              <- Que hace mas criterios de aceptacion
            plan.md              <- Como se implementa
            tasks.md             <- Checklist de tareas
```

## Flujo para una feature nueva

1. Crear `spec/features/NNN-nombre/` (siguiente numero incremental libre)
2. Escribir `spec.md`: que hace, por que y criterios de aceptacion medibles
3. Escribir `plan.md`: Enfoque tecnico y decisiones, respetando `constitution/tech-stack.md`.
4. Desglozar en `tasks.md`: y marcar el progress
5. Implementar y validar (`node --check script.js`) + revision local en visual
6. Actualizar `constitution/roadmap.md` mover la feature a hecho
