// Funniest Forecast for a City That Isn't — make.fun entry.
// Writes the winning one-line forecast to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falling back to /output), then verifies the gate: 1-120 chars, one line,
// not only whitespace. Never deletes the output folder itself.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Vexford: snow flurries of unread emails; dress warm, reply-all storms possible after lunch.";

// Fail fast if the line itself ever drifts out of the gate, before touching
// the output folder.
if (LINE.length < 1 || LINE.length > 120 || LINE.trim().length === 0) {
  throw new Error(`forecast line is ${LINE.length} chars, outside the 1-120 gate`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("forecast line must be a single line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Gate checks: 1-120 chars, single line, not only whitespace.
const written = readFileSync(outPath, "utf8");
if (written.length < 1 || written.length > 120) {
  throw new Error(`entry length ${written.length} outside 1-120 chars`);
}
if (written.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry must be a single line");
}
console.log(`Wrote ${written.length}-char forecast to ${outPath}`);
