#!/usr/bin/env node

const fs = require("fs");
const { spawnSync } = require("child_process");

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

function main() {
  const args = parseArgs(process.argv);
  if (!args.entry) {
    console.error("Usage: append-to-doc.js --entry /path/to/entry.json [--execute]");
    process.exit(2);
  }

  const entry = JSON.parse(fs.readFileSync(args.entry, "utf8"));
  const payload = {
    tool: "GOOGLEDOCS_APPEND_TEXT",
    title: entry.doc_title,
    content_markdown: entry.markdown,
    metadata: {
      entry_date: entry.entry_date,
      source: "daily-learning-log"
    }
  };

  if (!args.execute) {
    process.stdout.write(
      `${JSON.stringify({ status: "blocked", reason: "dry-run", doc_payload: payload }, null, 2)}\n`
    );
    return;
  }

  const execCommand = process.env.COMPOSIO_DOCS_EXEC;
  if (!execCommand) {
    process.stdout.write(
      `${JSON.stringify({ status: "blocked", reason: "missing COMPOSIO_DOCS_EXEC", doc_payload: payload }, null, 2)}\n`
    );
    return;
  }

  const child = spawnSync(execCommand, {
    input: JSON.stringify(payload),
    shell: true,
    encoding: "utf8"
  });

  if (child.status !== 0) {
    process.stdout.write(
      `${JSON.stringify(
        {
          status: "failed",
          reason: "external command failed",
          stderr: (child.stderr || "").slice(0, 500),
          doc_payload: payload
        },
        null,
        2
      )}\n`
    );
    process.exit(1);
  }

  process.stdout.write(
    `${JSON.stringify({ status: "success", external_result: child.stdout.trim(), doc_payload: payload }, null, 2)}\n`
  );
}

main();
