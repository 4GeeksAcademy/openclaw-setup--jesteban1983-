---
name: 4geeks-progress-tracker
description: "Consulta el progreso del estudiante en 4Geeks y genera un reporte estructurado listo para Google Docs"
metadata:
  version: "1.0.0"
  author: "Nexus"
  tags: ["4geeks", "tracker", "progress", "google-docs"]
---

# 4Geeks Progress Tracker

## Goal

Obtener tareas del estudiante desde BreatheCode, construir un resumen accionable y preparar salida verificable para Google Docs (y opcionalmente Telegram).

## Inputs

```yaml
type: object
required:
  - request
properties:
  request:
    type: string
    description: Solicitud natural del usuario para revisar progreso.
  cohort_slug:
    type: string
    description: Filtra tareas por cohorte, por ejemplo spain-aie-pt-1.
  task_status:
    type: string
    description: Estado a consultar en API. Por defecto PENDING.
```

## Scripts

1. `scripts/fetch-tasks.js`
   - Llama a `/assignment/user/me/task`.
   - Requiere `FOURGEEKS_API_KEY`.
2. `scripts/format-report.js`
   - Convierte JSON de tareas a markdown.
3. `scripts/create-doc.js`
   - Prepara payload Composio para crear Google Doc.
   - En modo `--execute` intenta ejecutar comando externo definido por `COMPOSIO_DOCS_EXEC`.

## Local runbook

```bash
node .openclaw/skills/4geeks-progress-tracker/scripts/fetch-tasks.js --status PENDING --out /tmp/tasks.json
node .openclaw/skills/4geeks-progress-tracker/scripts/format-report.js --input /tmp/tasks.json --json-out /tmp/report.json
node .openclaw/skills/4geeks-progress-tracker/scripts/create-doc.js --report /tmp/report.json
```

## Output contract

```yaml
status: success | blocked | failed
report_title: string
stats:
  total: integer
  pending: integer
doc_payload:
  tool: string
  title: string
```

## Verification

- Si no hay credenciales: `status: blocked` con razon tecnica.
- Si hay ejecucion externa: devolver respuesta real del tool (sin inventar IDs).
