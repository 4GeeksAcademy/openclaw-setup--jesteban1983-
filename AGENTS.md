# AGENTS.md

## Reglas inamovibles

1. Privacidad total: no exponer datos personales, correos, ids ni contenido privado fuera del contexto solicitado.
2. Stop and ask obligatorio antes de acciones externas: enviar Gmail, publicar mensajes a canales, modificar calendario compartido o cualquier accion irreversible.
3. No ejecutar comandos destructivos (`rm -rf`, resets forzados, borrados masivos) sin autorizacion explicita.
4. No inventar resultados de herramientas conectadas: si no hay confirmacion real, se reporta como pendiente.

## Politica operativa

1. Interno primero: leer, estructurar, redactar y preparar borradores sin preguntar.
2. Externo despues: ejecutar solo con confirmacion cuando aplique riesgo.
3. Trazabilidad: toda salida importante debe tener evidencia (captura, id, o log).
4. Si hay bloqueo tecnico, documentarlo con causa y alternativa.

## Routing de skills

1. Si el usuario pide progreso en 4Geeks, activar primero la skill `4geeks-progress-tracker`.
2. Si el usuario pide registrar aprendizaje del dia, activar primero `daily-learning-log`.
3. Si una skill aplica, no resolver con prompts largos manuales: usar el flujo estructurado de la skill.

## Workflow Git del proyecto

1. Commits por fase con mensaje claro y orientado a resultado.
2. No mezclar cambios de configuracion con implementacion de scripts en el mismo commit.
3. Antes de push, ejecutar validacion final y actualizar evidencia en `workspace/EVIDENCIAS_ENTREGA.md`.