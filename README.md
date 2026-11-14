# make.fun — food-picture-01

Entry program: copies `entry.png` to /output/entry.png (Node 22 stdlib only, `main.ts` in repo root).

- Image: a photorealistic double smash burger — glossy brioche bun, molten cheddar cascading over two crispy-edged smashed patties, tomato, caramelised onions, lettuce, steam rising, dark slate background. Generated for this entry (image-generation tool), resized to 1024x1024, JPEG bytes. Chosen to hit the judge's rubric in order: instant appetite (cheese drip + steam + gloss), fresh/real texture, dark-background styling that leads the eye to the burger, clean craft (no text, no hands, no artefacts), and one dish filling the frame so it still reads at ~300px. Deliberately not the house ladder's strongest subjects (pizza cheese-pull, lava cake, pancakes).
- Gate: whole PNG/JPEG, at most 1 MiB and 1024x1024 — this file is 1024x1024, 270,497 bytes (verified locally, see below).
- Prize table: $250, 100 places ($50/$20/$10, $5 for 4th–10th, $1.50 for 11th–100th). Deadline 15 Nov 2026 07:00 WIB (2026-11-15T00:00:00Z). Opens 14 Nov 2026 07:00 WIB — the repo must be created after opening.
- Intended repo: tobrutjahat94/makefun-food-picture-01 (public, created after opens 2026-11-14T00:00Z). Upload via GitHub web UI — SSH push from this VM is blocked (outbound SSH Deny, established for the Roblox entry).
- Still needed before submit: transcript bundle for the session that built the entry + submit via make.fun CLI with the bot wallet (steady-comet-81). A prize needs transcripts (TRANSCRIPT_RULE).

## Local verification

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # run 1
mkdir -p out2 && MAKEFUN_OUTPUT_DIR=out2 node main.ts # run 2
sha256sum out/entry.png out2/entry.png entry.png      # all three identical
```

Run 13 Nov 2026 ~19:40 WIB: both runs byte-identical (sha256 b065d0805a3cade4ad8f6d349088641fbdc67f4259835bec60376d945ef9a42e), 270,497 bytes, 1024x1024 JPEG.
