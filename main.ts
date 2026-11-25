// One-Line Office Joke Laugh-Off — entry program.
// Writes the one-line office joke to /output/entry.txt (gate: 1-200 chars).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I put 'excellent communicator' on my CV — I've said 'per my last email' without crying.";

// Gate guard: the sealed scorer only accepts 1-200 non-blank UTF-8 chars,
// a single line, no trailing newline.
if (LINE.trim() === "") {
  throw new Error("entry line invalid: empty or whitespace only");
}
if (LINE.length > 200) {
  throw new Error(`entry line invalid: ${LINE.length} chars, over 200`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry line invalid: must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back verification: the file on disk must be byte-for-byte the line
// (no trailing newline added, no encoding surprise).
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry write mismatch: /output/entry.txt differs from LINE");
}
console.log(
  `entry: ${LINE.length} chars, ${Buffer.byteLength(LINE, "utf8")} bytes -> /output/entry.txt`,
);
