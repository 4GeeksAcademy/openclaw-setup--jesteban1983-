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

function readInput(inputPath) {
  if (!inputPath) {
    const stdin = fs.readFileSync(0, "utf8");
    return JSON.parse(stdin);
  }
  return JSON.parse(fs.readFileSync(inputPath, "utf8"));
}

function classify(points) {
  const sections = {
    conceptos: [],
    ejercicios: [],
    descubrimientos: []
  };

  for (const raw of points) {
    const point = String(raw || "").trim();
    if (!point) continue;
    const lower = point.toLowerCase();

    if (/(ejercicio|practica|implement|script|codigo|debug)/.test(lower)) {
      sections.ejercicios.push(point);
      continue;
    }
    if (/(descubri|patron|insight|me di cuenta|aprendi que)/.test(lower)) {
      sections.descubrimientos.push(point);
      continue;
    }
    sections.conceptos.push(point);
  }

  return sections;
}

function bulletList(items, emptyText) {
  if (!items || items.length === 0) return `- ${emptyText}`;
  return items.map((item) => `- ${item}`).join("\n");
}

function buildEntry(input) {
  const date = input.date || new Date().toISOString().slice(0, 10);
  const learningPoints = Array.isArray(input.learning_points) ? input.learning_points : [];
  const blockers = Array.isArray(input.blockers) ? input.blockers : [];
  const nextAction = input.next_action || "Definir siguiente tarea concreta para manana.";
  const reflection = input.reflection || "Avance sostenido con foco en ejecucion y evidencia.";

  if (learningPoints.length === 0) {
    throw new Error("learning_points is required and must include at least one item");
  }

  const sections = classify(learningPoints);
  const markdown = [
    `## ${date}`,
    "",
    "### Conceptos",
    bulletList(sections.conceptos, "Sin conceptos clasificados hoy."),
    "",
    "### Ejercicios",
    bulletList(sections.ejercicios, "Sin ejercicios registrados hoy."),
    "",
    "### Descubrimientos",
    bulletList(sections.descubrimientos, "Sin descubrimientos registrados hoy."),
    "",
    "### Bloqueadores",
    bulletList(blockers, "Sin bloqueadores relevantes."),
    "",
    "### Siguiente accion",
    `- ${nextAction}`,
    "",
    "### Reflexion",
    `- ${reflection}`,
    ""
  ].join("\n");

  return {
    generated_at: new Date().toISOString(),
    doc_title: "Diario de Aprendizaje - Jonathan",
    entry_date: date,
    sections,
    markdown
  };
}

function main() {
  const args = parseArgs(process.argv);
  const input = readInput(args.input || "");
  const entry = buildEntry(input);

  if (args["json-out"]) {
    fs.writeFileSync(args["json-out"], JSON.stringify(entry, null, 2));
  }
  if (args["markdown-out"]) {
    fs.writeFileSync(args["markdown-out"], `${entry.markdown}\n`);
  }

  process.stdout.write(`${JSON.stringify(entry, null, 2)}\n`);
}

main();
