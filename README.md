# Steep

**[Try it live →](https://andrew-most-likely.github.io/Interactive-Linux-distribution-recommendation-app/)**

![Deploy status](https://github.com/Andrew-most-likely/Interactive-Linux-distribution-recommendation-app/actions/workflows/deploy.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/license-MIT-c17c56)
![Built with React + Vite + TypeScript](https://img.shields.io/badge/stack-React%20%2B%20Vite%20%2B%20TypeScript-2a2b30)

An interactive, drag-and-drop Linux distro recommender. Instead of a
text-based questionnaire, you drag in the specific games, tools, and
preferences you actually use, pick your GPU, and watch match scores for 25
distros update live, with honest, individually-reasoned explanations of
the tradeoffs each one involves.

No login, no tracking, no server. Everything runs client-side in your
browser.

## Why this is different

Most distro-picker sites ask abstract questions ("do you game?") and hand
back a single flat verdict. Steep instead:

- Lets you drag in **specific, named software**, not vague categories
- Lets you **rank picks by importance** so your top priorities actually
  move the results
- Flags a distro **red** when something you picked genuinely won't run on
  it (e.g. gaming on Qubes OS), instead of quietly burying it in the score
- Factors in your **actual GPU**, NVIDIA's proprietary driver cares about
  kernel freshness far more than AMD/Intel's open-source stack does
- Explains *why* each distro landed where it did, not just a number

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Project structure

```
src/
  data/
    dimensions.ts     # the underlying axes distros are scored on
    distros.ts         # 25 distros + attribute scores + blurb per dimension
    items.ts            # curated draggable items per category
    hardware.ts        # GPU vendor options and their driver-freshness weight
    compatibility.ts   # per-distro driver/hardware notes shown on /distros
    icons.tsx          # real cover art / logos / brand icons per item & distro
  lib/
    scoring.ts          # turns picks + GPU + ranking into distro scores
  components/
    MatchMeter.tsx      # signature score visualization
    Pool.tsx            # droppable "Available" list (click or drag to add)
    DraggableItem.tsx
    DropZone.tsx         # "Your setup": rank, reorder, and remove picks
    SetupChip.tsx
    DragPreview.tsx      # the visual shown in dnd-kit's DragOverlay
    HardwareSelect.tsx   # GPU vendor picker
    FloatingShapes.tsx   # ambient background animation
    ScorePanel.tsx
  App.tsx                # the matcher (route "/")
  CompatibilityPage.tsx  # distro compatibility reference (route "/distros")
  main.tsx                # HashRouter + route table
  theme.css               # design tokens (quiet dark palette, single muted accent)
```

## How scoring works

Each distro has a 0–10 score on a handful of dimensions (driver freshness,
stability, gaming performance, isolation, ease of use). Each draggable item
declares how much it needs from each dimension. Your GPU vendor is injected
as an implicit top-priority pick, and each item's rank in "Your setup"
scales how much it influences the result.

If a distro is meaningfully weak in a dimension an item cares about, a
tradeoff note is generated automatically. If it's *critically* weak on
something an item critically depends on, the distro is flagged red as
fundamentally incompatible rather than just penalized.

To add a new item: add it to `items.ts` with a requirements object. To add
a new distro: add it to `distros.ts` with an attributes object and a blurb.
No other code changes needed. Scoring and tradeoffs are derived
automatically.

## Deploying to GitHub Pages

This repo already ships a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds and deploys `main` to Pages on
every push. If you fork it:

1. In your fork's Settings → Pages, set the source to "GitHub Actions."
2. If your Pages site will live at `https://<user>.github.io/<repo>/` (not
   a custom domain at the root), update `base` in `vite.config.ts` to
   `'/<repo>/'`.
3. Push to `main`, the workflow builds and deploys automatically.

## License

MIT. See [LICENSE](LICENSE).
