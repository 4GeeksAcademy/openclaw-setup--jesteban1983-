# SKILL: diario_aprendizaje_docs

## Purpose

Transformar notas rapidas del dia en una entrada estructurada de aprendizaje y guardarla en Google Docs.

## Input

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
    description: Lista de 3 a 6 aprendizajes.
  blockers:
    type: array
    items:
      type: string
  next_action:
    type: string
  reflection:
    type: string
```

## Connected Tools

- Google Docs
- Google Drive

## Behavior

1. Construir un documento con formato fijo:
   - Aprendi hoy
   - Bloqueadores
   - Siguiente accion
   - Reflexion breve
2. Si no se recibe `date`, usar fecha actual.
3. Nombrar documento con convencion: YYYY-MM-DD - Diario de aprendizaje.
4. Guardar en carpeta por defecto OpenClaw/Entregas.
5. Devolver id/enlace y resumen de contenido creado.

## Output Format

```yaml
status: success | failed
doc_id: string
doc_title: string
doc_url: string
message: string
```

## Prompting Notes

- Mantener tono claro y accionable.
- Evitar texto motivacional vacio.
- Si Drive/Docs falla, devolver error con causa y accion recomendada.

## Example Invocation

Input:

```json
{
  "learning_points": [
    "Reconecte Composio con OpenClaw",
    "Valide creacion de eventos en Calendar",
    "Entendi mejor la estructura de configuracion"
  ],
  "blockers": ["CLI openclaw no disponible en este entorno"],
  "next_action": "Validar openclaw doctor en el entorno correcto"
}
```

Output esperado:

```yaml
status: success
doc_id: "1A2B3C"
doc_title: "2026-07-14 - Diario de aprendizaje"
doc_url: "https://docs.google.com/document/d/1A2B3C"
message: "Entrada guardada en OpenClaw/Entregas."
```