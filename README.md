# Steep (working title)

An interactive, drag-and-drop Linux distro recommender. Instead of a
text-based questionnaire, you drag in the specific games/tools/preferences
you actually use, and watch match scores update live, with honest
explanations of the tradeoffs each distro involves.

This is the **Phase 1 MVP** described in the project plan: one tab set
(Games / Work / Security), a small hand-picked item and distro database, and
no login yet (that's Phase 3).

## Run it locally

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open the URL it prints (usually http://localhost:5173).

## Project structure

\`\`\`
src/
  data/
    dimensions.ts   # the underlying axes distros are scored on
    distros.ts       # distro list + attribute scores per dimension
    items.ts          # draggable items + how much each cares about each dimension
  lib/
    scoring.ts        # turns picked items into distro scores + tradeoff text
  components/
    MatchMeter.tsx    # signature score visualization
    DraggableItem.tsx
    DropZone.tsx
    ScorePanel.tsx
  App.tsx              # ties it all together
  theme.css            # design tokens (quiet dark palette, single muted accent)
\`\`\`

## How scoring works

Each distro has a 0-10 score on a handful of dimensions (driver freshness,
stability, gaming performance, isolation, ease of use). Each draggable item
declares how much it needs from each dimension. Dragging an item in nudges
every distro's score up or down based on how well its attributes match that
need, and if a distro is meaningfully weak in a dimension an item cares a
lot about, a tradeoff note is generated automatically from a reusable
per-dimension template (see dimensions.ts).

To add a new item: add it to items.ts with a requirements object. To add a
new distro: add it to distros.ts with an attributes object. No other code
changes needed, scoring and tradeoffs are derived automatically.

## Deploying to GitHub Pages

1. Push this project to a GitHub repo.
2. If your Pages site will live at https://<user>.github.io/<repo>/
   (not a custom domain at the root), update base in vite.config.ts to
   '/<repo>/'.
3. Build: npm run build. Output goes to dist/.
4. Either:
   - Use GitHub's built-in Pages GitHub Actions workflow (Settings, Pages,
     "GitHub Actions", choose a static site workflow that runs
     npm run build and publishes dist/), or
   - Deploy manually with the gh-pages package:
     \`\`\`bash
     npm install -D gh-pages
     npx gh-pages -d dist
     \`\`\`
     then set Pages to serve from the gh-pages branch.
5. If using a custom domain, add a CNAME file inside public/ containing
   just your domain name, and configure the DNS records GitHub's docs
   specify for your registrar.

## Next steps (see project-plan.md)

- Add Work and Security tab content depth
- Distro-family clustering for close-call results
- Checklist-artifact output
- ProtonDB integration for game compatibility data
- Firebase Auth + Firestore for optional login and persistent history
