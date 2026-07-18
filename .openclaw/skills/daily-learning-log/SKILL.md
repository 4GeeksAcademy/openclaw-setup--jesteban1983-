---
name: daily-learning-log
description: "Registra lo aprendido cada dia en un diario estructurado y prepara salida para Google Docs"
metadata:
  version: "1.0.0"
  author: "Nexus"
  tags: ["learning", "journal", "daily", "google-docs"]
---

# Daily Learning Log

## Goal

Transformar notas de aprendizaje en una entrada estructurada de diario y preparar el payload para append en Google Docs.

## Inputs

```yaml
type: object
required:
  - learning_points
properties:
  date:
    type: string
    description: Fecha de la entrada. Si falta, usar hoy.
  learning_points:
    type: array
    items:
      type: string
  blockers:
    type: array
    items:
      type: string
  next_action:
    type: string
  reflection:
    type: string
```

## Scripts

1. `scripts/format-entry.js`
   - Recibe JSON con aprendizajes y construye markdown.
2. `scripts/append-to-doc.js`
   - Prepara payload Composio para agregar entrada al documento diario.
   - En modo `--execute` usa comando externo definido por `COMPOSIO_DOCS_EXEC`.

## Local runbook

```bash
node .openclaw/skills/daily-learning-log/scripts/format-entry.js --input /tmp/learning.json --json-out /tmp/entry.json
node .openclaw/skills/daily-learning-log/scripts/append-to-doc.js --entry /tmp/entry.json
```

## Output contract

```yaml
status: success | blocked | failed
doc_title: string
entry_date: string
sections:
  - Conceptos
  - Ejercicios
  - Descubrimientos
  - Bloqueadores
  - Siguiente accion
  - Reflexion
```

## Verification

- Si falta informacion minima: `status: failed` con detalle.
- Si hay ejecucion externa: devolver resultado real del tool sin inventar datos.
