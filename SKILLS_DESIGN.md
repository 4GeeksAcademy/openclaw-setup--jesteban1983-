# SKILLS_DESIGN.md

## Skill 1: Evento de Calendar Inteligente

### 1) Que hace esta skill?

Convierte una instruccion en lenguaje natural (por ejemplo, "sesion de estudio el jueves por la tarde, 2 horas") en un evento completo de Google Calendar con horario, duracion y recordatorio por defecto.

### 2) Que input necesita el agente?

- Texto libre con:
  - titulo del evento
  - fecha o referencia temporal
  - franja horaria aproximada o hora exacta
  - duracion opcional
  - notas opcionales
- Si faltan campos, la skill usa valores por defecto desde TOOLS.md (duracion 60 min, reminder 30 min, timezone America/Santo_Domingo).
- De los 5 archivos ya sabe:
  - tono directo (SOUL.md)
  - reglas de stop-and-ask en acciones externas (AGENTS.md)
  - contexto del usuario y prioridad del proyecto (USER.md)

### 3) Como es un buen output?

- Destino: Google Calendar (evento creado) y resumen breve de confirmacion.
- Formato de salida:
  - id de evento
  - fecha y hora final
  - duracion
  - reminder aplicado
- Criterio de exito:
  - el evento aparece en Calendar
  - la confirmacion coincide con los datos creados

---

## Skill 2: Diario de Aprendizaje a Google Docs

### 1) Que hace esta skill?

Recibe 3-6 puntos de aprendizaje del dia y los transforma en una entrada estructurada en un Google Doc de diario de aprendizaje.

### 2) Que input necesita el agente?

- Fecha del dia (si falta, usar fecha actual).
- Lista de aprendizajes en bullets.
- Opcional: bloqueadores, siguiente accion, y una reflexion corta.
- De los 5 archivos ya sabe:
  - estilo de redaccion claro y accionable (SOUL.md)
  - carpeta de destino en Drive y convencion de nombre (TOOLS.md)
  - contexto del proyecto actual (USER.md)

### 3) Como es un buen output?

- Destino: Google Docs (documento creado o actualizado).
- Formato de salida:
  - titulo del documento
  - enlace o id
  - secciones: Aprendi hoy, Bloqueadores, Siguiente accion
- Criterio de exito:
  - el documento existe en Drive
  - contiene estructura consistente y util para revision semanal