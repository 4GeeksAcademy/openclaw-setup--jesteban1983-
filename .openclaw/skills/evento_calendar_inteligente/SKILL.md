# SKILL: evento_calendar_inteligente

## Purpose

Crear eventos de Google Calendar a partir de lenguaje natural, aplicando defaults definidos en TOOLS.md.

## Input

```yaml
type: object
required:
  - request
properties:
  request:
    type: string
    description: Descripcion libre del evento (titulo, fecha, hora/duracion opcional).
  reminder_minutes:
    type: integer
    description: Recordatorio manual. Si falta, usar 30.
  calendar_id:
    type: string
    description: Si falta, usar calendario principal.
```

## Connected Tools

- Google Calendar

## Behavior

1. Interpretar el texto `request` y extraer: titulo, fecha, hora, duracion y notas.
2. Si falta duracion, usar 60 minutos.
3. Si falta reminder, usar 30 minutos.
4. Si faltan datos criticos (fecha/hora no resolvibles), pedir aclaracion minima.
5. Antes de crear en calendar, aplicar regla de confirmacion si hay ambiguedad alta.
6. Crear evento y devolver confirmacion estructurada.

## Output Format

```yaml
status: success | needs_clarification | failed
event_id: string
title: string
start: ISO-8601
end: ISO-8601
reminder_minutes: integer
message: string
```

## Prompting Notes

- Tono: directo y practico.
- No inventar IDs ni enlaces.
- Si falla la creacion, reportar causa exacta y siguiente paso.

## Example Invocation

Input:

```json
{
  "request": "Sesion de estudio de IA el jueves por la tarde por 2 horas"
}
```

Output esperado:

```yaml
status: success
event_id: "abc123"
title: "Sesion de estudio de IA"
start: "2026-07-16T15:00:00-04:00"
end: "2026-07-16T17:00:00-04:00"
reminder_minutes: 30
message: "Evento creado en calendario principal."
```