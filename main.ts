// A food-picture-01 entry (Node 22, standard library only): its picture is the entry.png beside this file, and
// the program copies it to /output/entry.png. The picture is a photorealistic double smash burger — glossy
// brioche bun, molten cheddar cascading over two crispy-edged patties, steam rising, dark slate background —
// generated for this entry and resized to 1024x1024 (JPEG bytes, 270,497 bytes, within the 1 MiB gate).
// The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels, and the judge sees exactly
// the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');

// The grader hands us a writable /output, but creating the directory when it is
// missing keeps local runs (MAKEFUN_OUTPUT_DIR=out) working without a mkdir first.
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

copyFileSync(src, dest);

// Fail loudly instead of silently shipping a truncated copy: the gate scores
// exactly the bytes in this file, and the two graded runs must match byte for byte.
if (statSync(dest).size !== statSync(src).size) {
  throw new Error(`entry.png copy incomplete: ${statSync(dest).size} of ${statSync(src).size} bytes`);
}
