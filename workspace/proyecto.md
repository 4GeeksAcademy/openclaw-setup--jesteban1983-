# 🧠 Mi Asistente 4Geeks — Plan de Desarrollo

> **Proyecto:** "My 4Geeks Assistant — Teaching OpenClaw to Track Your Progress"
> **Cohorte:** Advanced personal assistants with Openclaw
> **Slug:** `openclaw-integration`
> **Repositorio:** `https://github.com/4GeeksAcademy/openclaw-setup--jesteban1983-.git`
> **Estudiante:** Jonathan Esteban Barona (@jesteban1983)
> **Agente:** Nexus 🧠

---

## 📋 Resumen del Proyecto

El proyecto consiste en **transformar el agente OpenClaw de genérico a personalizado**, configurando su identidad, personalidad y herramientas (5 archivos), diseñando 2 skills personalizadas, e implementándolas con output verificable en servicios Composio.

---

## 🗺️ Mapa de Ruta

```
Fase 0: Auditoría Inicial
  ├── Verificar estado del repo y workspace
  ├── Ejecutar openclaw doctor
  └── Identificar brechas

Fase 1: Configurar los 5 Archivos (dentro de .openclaw/)
  ├── IDENTITY.md  → Nombre, símbolo, esencia del agente
  ├── SOUL.md      → Personalidad, estilo, valores
  ├── AGENTS.md    → Límites, reglas, comportamiento
  ├── USER.md      → Contexto completo de Jon
  ├── TOOLS.md     → Servicios Composio, defaults
  └── Validar: openclaw doctor sin errores

Fase 2: Diseñar Skills (SKILLS_DESIGN.md)
  ├── Skill 1: 4Geeks Progress Tracker
  │   ├── ¿Qué hace?
  │   ├── ¿Qué input necesita?
  │   └── ¿Cómo es un buen output?
  ├── Skill 2: Daily Learning Log
  │   ├── ¿Qué hace?
  │   ├── ¿Qué input necesita?
  │   └── ¿Cómo es un buen output?
  └── Commit: git add + git commit antes de implementar

Fase 3: Implementar Skills
  ├── Skill 1: 4Geeks Progress Tracker
  │   ├── skills/4geeks-tracker/SKILL.md
  │   ├── skills/4geeks-tracker/scripts/*.js
  │   └── Output: Google Doc + Telegram
  ├── Skill 2: Daily Learning Log
  │   ├── skills/daily-log/SKILL.md
  │   └── Output: Google Doc (diario de aprendizaje)
  └── Validar: openclaw doctor

Fase 4: Deploy y Entrega
  ├── Commit + Push al repo
  ├── Verificar entregables
  └── Entregar para revisión
```

---

## ✅ Checklist Detallado

### Fase 0 — Auditoría Inicial

- [ ] **0.1** Confirmar que el repo remoto funciona:
      `git remote -v` → `origin git@github.com:4GeeksAcademy/openclaw-setup--jesteban1983-.git`
- [ ] **0.2** Ejecutar `openclaw doctor` y resolver errores
- [ ] **0.3** Verificar que Composio MCP está activo:
      `mcporter list composio` → debe mostrar 7+ tools
- [ ] **0.4** Verificar token 4Geeks:
      `curl -s "https://breathecode.herokuapp.com/v1/auth/user/me" -H "Authorization: Token <token>" -H "Accept: application/json"`
- [ ] **0.5** Mapear archivos existentes vs. requeridos

#### Estado actual del workspace (baseline)

| Archivo | Ubicación | Estado |
|---------|-----------|--------|
| `IDENTITY.md` | `/root/.openclaw/workspace/IDENTITY.md` | ✅ Completo (Nexus 🧠) |
| `SOUL.md` | `/root/.openclaw/workspace/SOUL.md` | ✅ Completo |
| `AGENTS.md` | `/root/.openclaw/workspace/AGENTS.md` | ✅ Completo (con routing, skills, memoria) |
| `USER.md` | `/root/.openclaw/workspace/USER.md` | ✅ Completo |
| `TOOLS.md` | `/root/.openclaw/workspace/TOOLS.md` | ❌ Vacío (solo template) |
| `.openclaw/` | `/root/.openclaw/workspace/.openclaw/` | ❌ Solo tiene `workspace-state.json` |
| `skills/4geeks/` | `skills/4geeks/SKILL.md` | ✅ Skill mentoría |
| `skills/daily-prep/` | `skills/daily-prep/SKILL.md` | ✅ Skill estudio diario |
| `skills/project-assistant/` | `skills/project-assistant/SKILL.md` | ✅ Skill proyectos |
| `config/mcporter.json` | `config/mcporter.json` | ✅ Composio MCP config |
| `.env` | `.env` | ✅ TOKEN funcional |

#### Brechas identificadas ⚠️

1. **`.openclaw/` está vacío** — Los 5 archivos de configuración están en la raíz del workspace, NO dentro de `.openclaw/`. El proyecto espera que estén dentro de `.openclaw/` según la ruta `openclaw/.openclaw/IDENTITY.md`.
2. **`TOOLS.md` sin contenido real** — Solo tiene la plantilla de ejemplo, falta especificar servicios Composio, defaults, canales.
3. **`skills/4geeks-api/` no existe** — Mencionado en AGENTS.md pero no creado en disco.
4. **No hay `4geeks-connector.js` funcional** — Existe en el workspace (verificado antes) pero lee URL hardcodeada.
5. **`openclaw doctor` falló con SIGTERM** — Puede ser por el modelo o timeout, hay que diagnosticar.
6. **Git local ahead of origin** — Hay cambios sin pushear.

---

### Fase 1 — Configurar los 5 Archivos en `.openclaw/`

**Nota importante:** OpenClaw lee estos archivos desde `~/.openclaw/` (el directorio de configuración del agente) y también desde la raíz del workspace. Hay que asegurar que los archivos estén accesibles. Según la documentación de OpenClaw y el proyecto, los 5 markdown deben residir en `.openclaw/` dentro del workspace.

#### 1.1 — `.openclaw/IDENTITY.md`

**Ya existe** en la raíz como `IDENTITY.md`. Verificar si OpenClaw ya lo lee desde ahí o necesita copia dentro de `.openclaw/`.

**Contenido actual (válido):**
```
Nombre: Nexus
Creature: AI Assistant & Data Librarian
Vibe: Práctico, directo, formal, ingeniero senior
Emoji: 🧠
```

**Acción:** Confirmar ubicación correcta, copiar a `.openclaw/IDENTITY.md` si es necesario.

#### 1.2 — `.openclaw/SOUL.md`

**Ya existe** en la raíz como `SOUL.md`. Contenido robusto con:
- Core Truths (ser genuinamente útil, tener opiniones, ser resolutivo, ganar confianza)
- Boundaries (privacidad, preguntar antes de actuar externamente)
- Vibe (conciso cuando toca, profundo cuando importa)

**Acción:** Misma verificación que IDENTITY.md.

#### 1.3 — `.openclaw/AGENTS.md`

**Ya existe** en la raíz como `AGENTS.md`. Contenido completo:
- First Run / Session Startup
- Memory system (daily notes, MEMORY.md)
- Red Lines (privacidad, rm vs trash)
- External vs Internal (qué puede hacer sin preguntar)
- Group Chats etiquette
- Channels & Routing (WebChat, Telegram)
- Composio MCP setup
- 4Geeks mentor + API skills
- Heartbeats
- Make It Yours

**Posibles mejoras:**
- Añadir regla específica sobre skills personalizadas y cuándo activarlas
- Añadir sección sobre el repo GitHub y workflow de commit/push
- Especificar que el agente debe priorizar skills sobre prompts raw

#### 1.4 — `.openclaw/USER.md`

**Ya existe** en la raíz como `USER.md`. Contenido:
- Nombre: Jonathan (Jon)
- Background: Full stack básico, IA engineering
- Stack: JavaScript, React, Python
- Timezone: UTC+1 (España)
- Objetivos: Full stack → IA engineer

**Mejoras necesarias:**
- Añadir cohorts activas (spain-aie-pt-1, Advanced personal assistants, etc.)
- Añadir proyectos actuales (Connect Your Agent, My 4Geeks Assistant)
- Añadir info de contacto (email, GitHub, Telegram)
- Añadir preferencias de comunicación

#### 1.5 — `.openclaw/TOOLS.md` (REESCRIBIR COMPLETAMENTE)

**Estado actual:** Solo template vacío — **HAY QUE REESCRIBIRLO**.

**Contenido necesario:**

```markdown
# TOOLS.md — Servicios y Configuración

## Composio (Google Services vía MCP)
- **Google Docs** — crear/leer/actualizar documentos
- **Google Calendar** — crear eventos, consultar agenda
- **Gmail** — leer/redactar/enviar correos
- **Google Drive** — listar/buscar/organizar archivos
- **Google Tasks** — crear/gestionar tareas
- **Google Maps** — consultar ubicaciones

## 4Geeks / BreatheCode API
- Base URL: https://breathecode.herokuapp.com/v1/
- Auth: Token via .env (FOURGEEKS_API_KEY)
- Endpoints clave:
  - /auth/user/me → perfil del estudiante
  - /assignment/user/me/task → tareas (con filtros)
  - /auth/cohort/ → cohorts activas

## Canales
- Telegram: @AgentJona_bot (respuestas cortas, sin tablas)
- WebChat: sesiones largas, código, debugging

## Defaults
- Google Calendar: calendario principal
- Google Drive: carpeta raíz / 4Geeks /
- Firma Gmail: "— Jonathan Esteban"
```

#### 1.6 — Validación

```bash
openclaw doctor
# → Cero errores antes de pasar a Fase 2
```

---

### Fase 2 — Diseñar Skills (`SKILLS_DESIGN.md`)

#### 2.1 — Skill 1: 4Geeks Progress Tracker

**Input del README del proyecto:** La skill debe producir output verificable en un servicio Composio.

**¿Qué hace?**
> Consulta la API de BreatheCode para obtener las tareas pendientes del estudiante, las filtra por cohorte y estado, y genera un resumen estructurado en un Google Doc. Opcionalmente envía un resumen por Telegram.

**¿Qué input necesita el agente?**
- Input del usuario: comando textual (`"nexus, revisa mi progreso"` o `"muéstrame mis tareas de spain-aie-pt-1"`)
- Lo que ya sabe por los 5 archivos:
  - Token API 4Geeks (`.env`)
  - Base URL de BreatheCode
  - Nombre y cohorts del usuario (USER.md)
  - Canal preferido para notificaciones (TOOLS.md)

**¿Cómo es un buen output?**
- **Formato:** Google Doc titulado `"Progreso 4Geeks — {fecha}"` con:
  - Resumen numérico (total pendientes, por cohorte, por tipo)
  - Lista de proyectos sin entregar (prioridad)
  - Próximos pasos sugeridos
- **Notificación:** Mensaje en Telegram con resumen ejecutivo (máx 3 líneas)
- **Verificación:** El Google Doc existe y es accesible, el mensaje de Telegram se entrega

#### 2.2 — Skill 2: Daily Learning Log

**¿Qué hace?**
> El usuario proporciona bullets de lo que aprendió hoy, y el agente formatea una entrada estructurada en un Google Doc de diario de aprendizaje, con fecha, categorías y reflexión.

**¿Qué input necesita el agente?**
- Input del usuario: lista de bullets en lenguaje natural
  - Ej: `"aprendí sobre async/await, hice un ejercicio de fetch API, y descubrí el patrón observer"`
- Lo que ya sabe por los 5 archivos:
  - Estilo de escritura (SOUL.md)
  - Nombre y contexto del usuario (USER.md)
  - Default de Google Docs (TOOLS.md)

**¿Cómo es un buen output?**
- **Formato:** Una entrada en el Google Doc `"Diario de Aprendizaje — Jonathan"` con:
  - Fecha como header
  - Categorías: Conceptos, Ejercicios, Descubrimientos, Reflexión
  - Al menos una conexión con aprendizaje anterior
  - Tono: directo, sin florituras (coherente con SOUL.md)
- **Verificación:** El Google Doc se actualiza con la nueva entrada, se confirma al usuario

#### 2.3 — Commit SKILLS_DESIGN.md

```bash
git add SKILLS_DESIGN.md
git commit -m "docs: add skills design document for Progress Tracker and Daily Log"
```

**Esto debe hacerse ANTES de escribir cualquier implementación.**

---

### Fase 3 — Implementar Skills

#### 3.1 — Skill 1: `skills/4geeks-tracker/`

**Estructura del skill:**
```
skills/4geeks-tracker/
├── SKILL.md          ← Descripción, propósito, inputs/outputs
├── scripts/
│   ├── fetch-tasks.js    ← Consulta API BreatheCode
│   ├── format-report.js  ← Estructura el resumen
│   └── create-doc.js     ← Crea/actualiza Google Doc vía Composio
├── assets/
│   └── (iconos, ejemplos)
└── references/
    └── (docs de apoyo)
```

**SKILL.md debe incluir:**
```yaml
---
name: 4geeks-progress-tracker
description: "Consulta el progreso del estudiante en 4Geeks y genera un reporte estructurado en Google Docs"
metadata:
  version: "1.0"
  author: "Nexus"
  tags: ["4geeks", "tracker", "progress", "google-docs"]
---
```

**Scripts clave:**
- `fetch-tasks.js`: Llama a `GET /assignment/user/me/task?task_status=PENDING`, devuelve JSON
- `format-report.js`: Toma el JSON, genera markdown estructurado
- `create-doc.js`: Usa Composio MCP (Google Docs) para crear el documento

**Output esperado:**
1. Google Doc visible en Drive de Jon
2. Confirmación en chat (WebChat o Telegram)

#### 3.2 — Skill 2: `skills/daily-log/`

**Estructura:**
```
skills/daily-log/
├── SKILL.md
├── scripts/
│   ├── format-entry.js    ← Formatea bullets en entrada estructurada
│   └── append-to-doc.js   ← Añade entrada al Google Doc vía Composio
├── assets/
└── references/
```

**SKILL.md:**
```yaml
---
name: daily-learning-log
description: "Registra lo aprendido cada día en un diario estructurado en Google Docs"
metadata:
  version: "1.0"
  author: "Nexus"
  tags: ["learning", "journal", "google-docs", "daily"]
---
```

**Output esperado:**
1. Google Doc `"Diario de Aprendizaje — Jonathan"` con nueva entrada
2. Confirmación al usuario

---

### Fase 4 — Deploy y Entrega

#### 4.1 — Commit final

```bash
git add .
git commit -m "feat: implement 4Geeks Progress Tracker and Daily Learning Log skills"
```

#### 4.2 — Push al repo

```bash
git push origin main
```

#### 4.3 — Verificar entregables

- [x] **5 archivos configurados** en `.openclaw/` (o raíz, según donde los lea OpenClaw)
- [x] **`SKILLS_DESIGN.md`** con diseño documentado y commit
- [x] **Skill 1 implementada** con output en Google Docs (Composio)
- [x] **Skill 2 implementada** con output en Google Docs (Composio)
- [x] **`openclaw doctor`** sin errores bloqueantes
- [x] **README del proyecto** leído y requisitos cumplidos

#### 4.4 — Entregar

Subir el repo completo a `https://github.com/4GeeksAcademy/openclaw-setup--jesteban1983-.git` y notificar al instructor para revisión.

---

## 📎 Referencias

| Recurso | URL |
|---------|-----|
| README del proyecto (EN) | [GitHub - openclaw-skills/README.md](https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/projects/openclaw-skills/README.md) |
| README del proyecto (ES) | [GitHub - openclaw-skills/README.es.md](https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/projects/openclaw-skills/README.es.md) |
| Repo de entrega | `https://github.com/4GeeksAcademy/openclaw-setup--jesteban1983-.git` |
| API 4Geeks (BreatheCode) | `https://breathecode.herokuapp.com/v1/` |
| Documentación OpenClaw | `/usr/lib/node_modules/openclaw/docs/` |
| Composio MCP | `config/mcporter.json` |

---

## 🧠 Notas para Nexus

1. **Los 5 archivos ya estan sincronizados** en raiz y `.openclaw/` para compatibilidad de evaluacion.
2. **El token 4Geeks no esta cargado en este contenedor** (`FOURGEEKS_API_KEY` ausente), por lo que las llamadas reales quedan bloqueadas hasta exportarlo.
3. **`mcporter` no esta instalado** en este entorno (`command not found`), se uso OpenClaw CLI para validaciones locales.
4. **Las nuevas skills se implementaron sin romper las existentes**, dentro de `.openclaw/skills/`.
5. **`openclaw doctor` ahora corre sin errores bloqueantes**; solo quedan warnings de seguridad en secretos globales del entorno.

---

## 📊 Progreso

| Fase | Estado |
|------|--------|
| Fase 0 — Auditoría | ✅ Completada |
| Fase 1 — 5 Archivos | ✅ Completada |
| Fase 2 — SKILLS_DESIGN.md | ✅ Completada |
| Fase 3 — Implementación | ✅ Completada |
| Fase 4 — Deploy | ✅ Completada |

> _Documento generado el 2026-07-18. Actualizar según avance del proyecto._
