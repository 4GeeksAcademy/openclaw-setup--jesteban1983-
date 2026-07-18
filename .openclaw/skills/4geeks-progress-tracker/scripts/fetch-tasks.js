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

function getCohortSlug(task) {
  return (
    task?.cohort?.slug ||
    task?.academy_cohort?.slug ||
    task?.cohort_slug ||
    task?.cohortSlug ||
    "unknown"
  );
}

async function main() {
  const args = parseArgs(process.argv);
  const token = process.env.FOURGEEKS_API_KEY;
  const status = args.status || "PENDING";
  const cohortSlug = args.cohort || args["cohort-slug"] || "";
  const outPath = args.out || "";
  const baseUrl = process.env.FOURGEEKS_API_BASE_URL || "https://breathecode.herokuapp.com/v1";

  if (!token) {
    console.error("Missing FOURGEEKS_API_KEY environment variable");
    process.exit(2);
  }

  const url = new URL(`${baseUrl.replace(/\/$/, "")}/assignment/user/me/task`);
  url.searchParams.set("task_status", status);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Token ${token}`,
      Accept: "application/json"
    }
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`4Geeks API error ${res.status}: ${body.slice(0, 500)}`);
    process.exit(3);
  }

  const data = await res.json();
  const allTasks = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
  const filtered = cohortSlug
    ? allTasks.filter((task) => getCohortSlug(task) === cohortSlug)
    : allTasks;

  const payload = {
    fetched_at: new Date().toISOString(),
    source: url.toString(),
    filters: {
      task_status: status,
      cohort_slug: cohortSlug || null
    },
    total_tasks: filtered.length,
    tasks: filtered
  };

  const text = JSON.stringify(payload, null, 2);
  if (outPath) {
    fs.writeFileSync(outPath, text);
    console.log(`Saved tasks payload to ${outPath}`);
    return;
  }

  process.stdout.write(`${text}\n`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
