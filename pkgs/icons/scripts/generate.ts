#!/usr/bin/env node

import { glob } from "glob";
import { writeFile } from "node:fs/promises";
import { cpus } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";

console.log("⚡️ Generating icon modules\n");

console.log("🔵 Searching svgs...");
const distDir = "dist";
const svgPaths = await glob(resolve(distDir, "**/*.svg"));
const svgsCount = svgPaths.length;

console.log(`🟢 Found ${svgsCount} svgs`);

console.log("🔵 Generating svgs...");
let completed = 0;
progressBar(completed, svgsCount);

await promiseQueue(
  svgPaths.map((path) => async () => {
    const relPath = relative("dist", path);
    const relDir = dirname(relPath);
    const name = basename(relPath, ".svg");
    const id = camelCase(join("icon", relDir, name));

    const tsPath = path.replace(/\.svg$/, ".ts");
    await writeFile(
      tsPath,
      `import type { IconId } from "../../src/index.js";
import url from "./${name}.svg?no-inline";

const ${id} = url as IconId;
export default ${id};`,
    );
  }),
  cpus().length,
);

console.log("\n💚 Icon modules generated!");

function progressBar(completed: number, total: number) {
  const percent = completed / total;

  const terminalWidth = process.stdout.columns || 80;
  const barLength = Math.max(10, terminalWidth - 2);

  const filledLength = Math.round(barLength * percent);
  const bar = "█".repeat(filledLength) + "-".repeat(barLength - filledLength);

  resetStdout();
  process.stdout.write(`[${bar}]`);

  if (completed === total) resetStdout();
}

function resetStdout() {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
}

function camelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

function promiseQueue<Type>(
  promises: Array<() => Promise<Type>>,
  max: number,
): Promise<Type[]> {
  const queue: Array<() => void> = [];

  const all = Promise.all<Type>(
    new Array(promises.length).fill(null).map((_, index) => {
      const promise = new Promise<void>((resolve) => {
        queue[index] = () => {
          // Trigger the queue promise
          resolve();
          // Return it, so the worker function can wait for
          return promise;
        };
      }).then(() => promises[index]!());
      return promise;
    }),
  );

  async function next() {
    const promise = queue.shift();
    if (!promise) return;
    await promise();
    return next();
  }

  // Create the worker functions
  Promise.all(new Array(max).fill(null).map(() => next()));

  return all;
}
