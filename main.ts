// A food-picture-01 entry (Node 22, standard library only): its picture is the entry.png beside this file, and
// the program copies it to /output/entry.png. The picture is a photorealistic double smash burger — glossy
// brioche bun, molten cheddar cascading over two crispy-edged patties, steam rising, dark slate background —
// generated for this entry and resized to 1024x1024 (JPEG bytes, 270,497 bytes, within the 1 MiB gate).
// The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels, and the judge sees exactly
// the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const SRC = new URL('./entry.png', import.meta.url);
const OUTPUT_NAME = 'entry.png';

function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

function sha256(file: string | URL): string {
  return createHash('sha256').update(readFileSync(file)).digest('hex');
}

function copyEntry(outDir: string): string {
  if (!existsSync(SRC)) {
    throw new Error(`entry.png missing next to main.ts: ${SRC.pathname}`);
  }

  // The grader hands us a writable /output, but creating the directory when it is
  // missing keeps local runs (MAKEFUN_OUTPUT_DIR=out) working without a mkdir first.
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const dest = join(outDir, OUTPUT_NAME);
  copyFileSync(SRC, dest);
  return dest;
}

// Fail loudly instead of silently shipping a truncated or corrupted copy: the gate scores
// exactly the bytes in this file, and the two graded runs must match byte for byte.
// Size alone cannot catch a same-length corruption, so the copy must also hash
// byte-identical to the source.
function verifyCopy(dest: string): void {
  const srcSize = statSync(SRC).size;
  const destSize = statSync(dest).size;
  if (destSize !== srcSize) {
    throw new Error(`entry.png copy incomplete: ${destSize} of ${srcSize} bytes`);
  }
  const srcHash = sha256(SRC);
  const destHash = sha256(dest);
  if (destHash !== srcHash) {
    throw new Error(`entry.png copy hash mismatch: output ${destHash} != source ${srcHash}`);
  }
}

const outDir = resolveOutputDir();
const dest = copyEntry(outDir);
verifyCopy(dest);
console.log(`copied entry.png (${statSync(dest).size} bytes, sha256 ${sha256(dest)}) -> ${dest}`);
