# Plan Ejecutable de Implementacion (Orden Exacto)

Objetivo: completar la entrega cumpliendo todos los requisitos de [context.md](context.md) sin riesgo de rechazo en revision.

## Reglas de ejecucion del plan

1. No saltar fases.
2. No mezclar commits de fases distintas.
3. Cada fase cierra solo si cumple su Definition of Done (DoD).
4. Si una fase falla, no avanzar: corregir y repetir validacion.

## Fase 0 - Preflight tecnico

### Objetivo
Confirmar que el entorno puede ejecutar OpenClaw y que las conexiones base estan sanas antes de editar entregables.

### Pasos ejecutables
1. Verificar CLI:

```bash
command -v openclaw
```

2. Si no existe, instalar o activar el entorno donde ya estaba funcionando OpenClaw (segun tu setup previo).
3. Ejecutar diagnostico:

```bash
openclaw doctor
```

4. Guardar evidencia del resultado (captura o log en workspace).

### DoD (Definition of Done)
- El comando openclaw responde en terminal.
- openclaw doctor termina sin errores.
- Existe evidencia guardada de la ejecucion.

### Gate de calidad (No-Go)
- Si openclaw doctor tiene errores, no iniciar Fase 1.

---

## Fase 1 - Personalizacion completa de los 5 archivos

### Objetivo
Convertir los 5 archivos en configuracion especifica y no generica del agente.

### Alcance minimo obligatorio
- [IDENTITY.md](IDENTITY.md)
- [SOUL.md](SOUL.md)
- [AGENTS.md](AGENTS.md)
- [USER.md](USER.md)
- [TOOLS.md](TOOLS.md)

### Pasos ejecutables
1. Definir identidad concreta: nombre, simbolo, vibe, avatar en [IDENTITY.md](IDENTITY.md).
2. Definir estilo operativo en [SOUL.md](SOUL.md):
   - Gestion de incertidumbre.
   - Cuado pregunta vs cuando ejecuta.
   - Tono contigo.
3. Definir limites inamovibles en [AGENTS.md](AGENTS.md):
   - Regla clara de privacidad.
   - Regla clara de stop-and-ask antes de acciones externas.
4. Completar contexto real del usuario en [USER.md](USER.md): nombre, proyectos activos, objetivos, horarios, preferencias.
5. Completar convenciones de herramientas en [TOOLS.md](TOOLS.md):
   - Calendario por defecto.
   - Carpeta Drive por defecto.
   - Firma de Gmail.
   - Canal/usuario Telegram.
6. Re-ejecutar:

```bash
openclaw doctor
```

### DoD (Definition of Done)
- Los 5 archivos contienen contenido especifico real (sin placeholders).
- En los 5 archivos hay decisiones operativas concretas.
- openclaw doctor sigue en verde despues de editar.

### Gate de calidad (No-Go)
- Si queda texto plantilla vacio o ambiguo, no avanzar a Fase 2.

---

## Fase 2 - Diseño formal previo de skills

### Objetivo
Documentar el diseno antes de implementar cualquier skill.

### Entregable obligatorio
- [SKILLS_DESIGN.md](SKILLS_DESIGN.md)

### Pasos ejecutables
1. Crear [SKILLS_DESIGN.md](SKILLS_DESIGN.md) en raiz.
2. Para cada skill (minimo 2), responder exactamente:
   - Que hace esta skill.
   - Que input necesita el agente.
   - Como es un buen output (formato, destino y criterio de exito).
3. Alinear cada skill con lo definido en [USER.md](USER.md) y [SOUL.md](SOUL.md).
4. Commit exclusivo del diseno (sin implementacion de skills):

```bash
git add SKILLS_DESIGN.md
git commit -m "Add skills design before implementation"
```

### DoD (Definition of Done)
- [SKILLS_DESIGN.md](SKILLS_DESIGN.md) existe y responde las 3 preguntas para al menos 2 skills.
- El commit del diseno existe antes de cualquier archivo de implementacion de skills.

### Gate de calidad (No-Go)
- Si no hay commit previo del diseno, la entrega puede ser rechazada.

---

## Fase 3 - Implementacion de Skill 1

### Objetivo
Implementar la primera skill como skill formal de OpenClaw (no prompt manual).

### Pasos ejecutables
1. Crear estructura/archivo de skill en la ruta esperada por tu proyecto OpenClaw.
2. Definir:
   - Nombre de skill.
   - Input schema.
   - Flujo de herramientas (Composio/Telegram/etc.).
   - Formato de salida.
3. Inyectar convenciones de [TOOLS.md](TOOLS.md) y tono de [SOUL.md](SOUL.md).
4. Probar con input personal real.
5. Guardar evidencia de ejecucion.
6. Commit de Skill 1.

### DoD (Definition of Done)
- Skill 1 existe como implementacion formal en el repo.
- Skill 1 corre con input real y produce output util.
- Hay evidencia verificable de la prueba.

### Gate de calidad (No-Go)
- Si Skill 1 solo funciona como prompt en chat, no cuenta.

---

## Fase 4 - Implementacion de Skill 2

### Objetivo
Implementar una segunda skill formal, distinta y reutilizable.

### Pasos ejecutables
1. Crear Skill 2 en la estructura formal de OpenClaw.
2. Definir input/output y reglas de uso.
3. Asegurar que al menos una de las dos skills escriba en servicio conectado (Docs/Calendar/Gmail/Tasks/Drive) o envie por Telegram.
4. Probar con input real personal.
5. Guardar evidencia.
6. Commit de Skill 2.

### DoD (Definition of Done)
- Skill 2 implementada como skill formal.
- Skill 2 probada con input real.
- Al menos una skill con output verificado en servicio conectado.

### Gate de calidad (No-Go)
- Si no hay output externo verificado, no cumple rubric.

---

## Fase 5 - Validacion funcional y de estilo

### Objetivo
Demostrar que los outputs reflejan configuracion del agente y no respuesta generica.

### Pasos ejecutables
1. Ejecutar ambas skills con casos reales.
2. Validar que el tono y decision making coinciden con [SOUL.md](SOUL.md).
3. Validar que contexto personal usado coincide con [USER.md](USER.md).
4. Validar defaults operativos segun [TOOLS.md](TOOLS.md).
5. Registrar evidencia (capturas/logs) en [workspace/](workspace/).

### DoD (Definition of Done)
- Hay evidencia de 2 ejecuciones exitosas de skills.
- Se observa estilo/tono propio consistente con archivos de configuracion.

### Gate de calidad (No-Go)
- Si los outputs parecen genericos o no usan contexto personal, riesgo alto de observacion.

---

## Fase 6 - Control final de rubrica

### Objetivo
Cierre de cumplimiento total antes de entregar.

### Checklist final (todo en true)
1. 5 archivos personalizados y especificos.
2. openclaw doctor sin errores.
3. [SKILLS_DESIGN.md](SKILLS_DESIGN.md) creado y commiteado antes de implementar skills.
4. 2 skills OpenClaw implementadas formalmente.
5. 1+ skill con output verificado en servicio conectado o Telegram.
6. Sin nuevas APIs/OAuth externos configurados.
7. Outputs alineados a identidad/soul/user/tools.
8. Puedes explicar el razonamiento de cada skill (tarea, input, output).

### Comandos de verificacion sugeridos

```bash
git log --oneline --decorate --name-only -n 30
openclaw doctor
```

### DoD (Definition of Done)
- Checklist final completo sin pendientes.
- Evidencia ordenada y localizable.
- Repo listo para compartir.

---

## Fase 7 - Empaquetado de entrega

### Objetivo
Publicar la entrega con trazabilidad clara para evaluacion.

### Pasos ejecutables
1. Organizar evidencias (capturas/logs) en [workspace/](workspace/).
2. Confirmar que no hay archivos temporales irrelevantes.
3. Commit final:

```bash
git add .
git commit -m "Finalize OpenClaw customization and skills delivery"
git push origin main
```

4. Compartir URL del repositorio segun instrucciones del instructor.

### DoD (Definition of Done)
- Cambios publicados en GitHub.
- Evaluador puede seguir el orden de fases por historial de commits.

---

## Estrategia anti-rechazo (resumen rapido)

1. Primero entorno (doctor verde).
2. Luego personalizacion de 5 archivos.
3. Luego diseno y commit previo.
4. Luego 2 skills formales.
5. Luego evidencia y cierre de rubrica.

Si respetas este orden exacto, reduces al minimo los puntos de rechazo por forma, trazabilidad y validacion.