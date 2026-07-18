#!/usr/bin/env node

const fs = require("fs");

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i += 1) {
    const part = argv[i];
    if (!part.startsWith("--")) continue;
    const key = part.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      out[key] = true;
      continue;
    }
    out[key] = next;
    i += 1;
  }
  return out;
}

function readJsonFromInput(inputPath) {
  if (inputPath) {
    return JSON.parse(fs.readFileSync(inputPath, "utf8"));
  }
  const stdin = fs.readFileSync(0, "utf8");
  return JSON.parse(stdin);
}

function taskTitle(task) {
  return task?.title || task?.task_title || task?.name || `task-${task?.id || "unknown"}`;
}

function cohortSlug(task) {
  return (
    task?.cohort?.slug ||
    task?.academy_cohort?.slug ||
    task?.cohort_slug ||
    task?.cohortSlug ||
    "unknown"
  );
}

function dueDate(task) {
  return task?.due_date || task?.delivery_date || task?.revision_due_date || null;
}

function formatDate(date) {
  if (!date) return "sin fecha";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "sin fecha";
  return parsed.toISOString().slice(0, 10);
}

function buildReport(payload) {
  const tasks = Array.isArray(payload?.tasks) ? payload.tasks : [];
  const byCohort = {};

  for (const task of tasks) {
    const slug = cohortSlug(task);
    byCohort[slug] = (byCohort[slug] || 0) + 1;
  }

  const urgent = [...tasks]
    .filter((task) => dueDate(task))
    .sort((a, b) => new Date(dueDate(a)).getTime() - new Date(dueDate(b)).getTime())
    .slice(0, 8);

  const today = new Date().toISOString().slice(0, 10);
  const title = `Progreso 4Geeks - ${today}`;

  const cohortLines = Object.entries(byCohort)
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => `- ${slug}: ${count}`)
    .join("\n") || "- sin datos";

  const urgentLines = urgent
    .map((task, idx) => `${idx + 1}. ${taskTitle(task)} (cohorte: ${cohortSlug(task)}, entrega: ${formatDate(dueDate(task))})`)
    .join("\n") || "1. Sin tareas con fecha de entrega";

  const markdown = [
    `# ${title}`,
    "",
    "## Resumen",
    `- Total tareas consultadas: ${tasks.length}`,
    `- Estado consultado: ${payload?.filters?.task_status || "PENDING"}`,
    `- Cohorte filtrada: ${payload?.filters?.cohort_slug || "todas"}`,
    "",
    "## Pendientes por cohorte",
    cohortLines,
    "",
    "## Tareas urgentes",
    urgentLines,
    "",
    "## Proximos pasos sugeridos",
    "1. Completar primero tareas con fecha mas cercana.",
    "2. Bloquear 2 sesiones de enfoque de 60 minutos para la cohorte principal.",
    "3. Cerrar el dia con actualizacion de daily-learning-log."
  ].join("\n");

  return {
    generated_at: new Date().toISOString(),
    report_title: title,
    stats: {
      total: tasks.length,
      pending: tasks.length,
      by_cohort: byCohort
    },
    markdown
  };
}

function main() {
  const args = parseArgs(process.argv);
  const jsonOut = args["json-out"] || "";
  const markdownOut = args["markdown-out"] || "";

  const input = readJsonFromInput(args.input || "");
  const report = buildReport(input);

  if (jsonOut) {
    fs.writeFileSync(jsonOut, JSON.stringify(report, null, 2));
  }
  if (markdownOut) {
    fs.writeFileSync(markdownOut, `${report.markdown}\n`);
  }

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

main();
