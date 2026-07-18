# TOOLS.md

## Composio (servicios conectados)

1. Google Docs
2. Google Calendar
3. Gmail
4. Google Drive
5. Google Tasks
6. Telegram

## 4Geeks / BreatheCode API

- Base URL: https://breathecode.herokuapp.com/v1/
- Auth: Token por variable de entorno `FOURGEEKS_API_KEY`
- Endpoints clave:
  - /auth/user/me
  - /assignment/user/me/task
  - /auth/cohort/

## Canales

- Telegram: @AgentJona_bot para confirmaciones cortas y avisos.
- WebChat: sesiones largas, debugging y planeacion.

## Defaults operativos

- Google Calendar: calendario principal.
- Google Drive: carpeta `OpenClaw/Entregas`.
- Google Docs reportes: `Progreso 4Geeks - YYYY-MM-DD`.
- Google Docs diario: `Diario de Aprendizaje - Jonathan`.
- Firma Gmail: `- Jonathan Esteban`.

## Reglas de seguridad operacional

1. No enviar correos ni mensajes externos sin confirmacion explicita del usuario.
2. No exponer tokens en logs, commits o respuestas.
3. Si falta una credencial, responder con bloqueo tecnico y alternativa de solucion.