# SKILLS_DESIGN.md

## Skill 1: 4Geeks Progress Tracker

### Que hace?

Consulta la API de BreatheCode para obtener tareas del estudiante, filtra por estado y cohorte, y genera un reporte estructurado listo para Google Docs.

### Que input necesita?

- Solicitud del usuario en texto natural.
  - Ejemplo: "Nexus, revisa mi progreso en 4Geeks".
- Opcional: `cohort_slug` para enfocar el reporte.
- Contexto preconfigurado:
  - token en `FOURGEEKS_API_KEY`
  - base URL en `TOOLS.md`
  - perfil del usuario en `USER.md`

### Como es un buen output?

- Documento con titulo `Progreso 4Geeks - YYYY-MM-DD`.
- Contenido minimo:
  - resumen numerico (total y pendientes)
  - distribucion por cohorte
  - top tareas urgentes
  - siguientes pasos accionables
- Notificacion corta opcional por Telegram.
- Verificacion:
  - reporte generado (markdown)
  - payload preparado para crear Google Doc via Composio

---

## Skill 2: Daily Learning Log

### Que hace?

Transforma bullets de aprendizaje diario en una entrada estructurada de diario, lista para append en Google Docs.

### Que input necesita?

- Lista de aprendizajes en lenguaje natural.
- Opcional: bloqueadores, siguiente accion y reflexion.
- Opcional: fecha explicita (si no, usa fecha actual).

### Como es un buen output?

- Entrada con secciones fijas:
  - Conceptos
  - Ejercicios
  - Descubrimientos
  - Bloqueadores
  - Siguiente accion
  - Reflexion
- Documento destino: `Diario de Aprendizaje - Jonathan`.
- Verificacion:
  - entrada en markdown generada
  - payload preparado para append en Google Docs via Composio

---

## Criterio transversal de calidad

1. Toda skill debe producir salida verificable (id, payload o log).
2. Si falta credencial, debe fallar de forma clara y accionable.
3. No se inventan ids de documentos, mensajes ni respuestas API.
