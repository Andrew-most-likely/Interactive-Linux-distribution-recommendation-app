# Project plan — interactive Linux distro recommender

## Core idea

A playful, drag-and-drop alternative to the standard Linux "quiz" recommendation
sites. Instead of answering abstract questions, the user drags in specific,
named things they actually use — games, dev tools, browsers, security
preferences — into tabs (Games, Work, Security, etc.), and watches distro
match scores update live.

## Why this is different from what's already out there

Every existing tool in this space (Linux Distro Chooser, Distrochooser,
DistroWiz, PickMyDistro, and similar) is a text-based questionnaire that asks
about *categories* of need ("do you game?") and returns a static, one-shot
verdict. None of them:

- let you drag in specific named software
- explain *why* a distro fits or what you're trading off by choosing it
- source their compatibility claims from real, current data
- remember you or evolve their recommendation as your needs change

Those four gaps are the plan.

## Confirmed differentiators (in priority order)

1. **Tactile, item-level input** — drag in actual games/tools/preferences, not
   abstract survey answers. (Prototyped and validated in this conversation.)
2. **Honest, sourced data** — pull real compatibility data (e.g. ProtonDB
   tiers, anti-cheat status) rather than editorializing. Tradeoff explanations
   are grounded in current facts, not vibes.
3. **Output as an artifact, not just a verdict** — the result is something
   useful to keep: a personalized setup checklist with copyable commands
   (e.g. "enable RPM Fusion," "install Steam + GameMode") tailored to exactly
   what was dragged in.
4. **Ongoing relationship, not one-shot** — optional login lets someone's
   picks and match history persist and evolve over time ("you added Rust and
   dropped CS2 — here's how your match shifted").
5. **Distro-family clustering** — when several distros score near-identically,
   surface them as a short list with an honest blurb on what actually differs
   (DE, release cadence, package manager), instead of forcing one false-precise
   winner.

*(Explicitly rejected: leaning into a "college student" niche angle — decided
this narrows the audience without adding real value.)*

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + Vite | Needed for the drag-and-drop interactivity |
| Drag and drop | `@dnd-kit` | Modern, actively maintained (`react-beautiful-dnd` is not) |
| Hosting | GitHub Pages (custom domain via GitHub Pro, ~$10/yr) | Free, matches "no ongoing cost" requirement |
| Auth | Firebase Authentication (email/password + Google sign-in) | Free up to 50k MAU on the Spark plan; avoid phone/SMS auth, which is billed even on free tier |
| Data | Firestore | Free tier: 1 GiB storage, 50k reads/day, 20k writes/day — comfortably enough for this scale |
| External data | ProtonDB API (game compatibility tiers); "Are We Anti-Cheat Yet" data (needs confirming whether a formal API exists, or if this requires periodic scraping/syncing) | Grounds tradeoff claims in real data instead of editorial judgment |

Everything runs client-side against Firebase's SDKs directly — no custom
server to build, patch, or host.

## Data model (draft)

**Item** (a draggable game/tool/preference):
```ts
{
  id: string,
  category: "games" | "work" | "security" | ...,
  label: string,
  weights: { [distroId: string]: number },   // scoring nudge per distro
  tradeoffs: { [distroId: string]: string }, // human-written explanation, only where meaningful
  externalData?: { protonDbTier?: string, anticheatStatus?: string } // for games
}
```

**Distro**:
```ts
{
  id: string,
  name: string,
  family: "beginner-friendly" | "gaming" | "arch-based" | "debian-based" |
          "fedora-based" | "immutable" | "security-privacy" | "lightweight",
  attributes: { driverFreshness: number, stability: number, gamingOptimization: number, ... }
}
```

**User profile** (Firestore, only for logged-in users):
```ts
{
  uid: string,
  savedSetups: [{ items: string[], timestamp, matchedDistro }],
  history: [...] // for the "ongoing relationship" feature
}
```

## Distro family taxonomy (starting point)

- Beginner-friendly: Mint, Ubuntu, Zorin, Pop!_OS
- Gaming-focused: Bazzite, Nobara, PikaOS, CachyOS
- Arch-based: Arch, Manjaro, EndeavourOS, Garuda
- Debian-based: Debian, MX Linux, antiX
- Fedora-based: Fedora Workstation, Nobara, Ultramarine
- Immutable/atomic: Bazzite, Silverblue, Vanilla OS, Kinoite
- Security/privacy: Tails, Qubes, Kicksecure, Whonix
- Lightweight/older hardware: antiX, Puppy Linux, Bodhi

To be expanded — goal is as broad coverage as reasonably maintainable.

## Phased roadmap

**Phase 1 — MVP**
- Scaffold React + Vite project
- Build one tab (Games) fully: drag-and-drop, live scoring, tradeoff notes
- Small hand-picked item database (~15-20 items) and distro list (~8-10 distros)
- No auth yet — fully anonymous, in-browser only

**Phase 2 — Full core loop**
- Add Work and Security tabs
- Add distro-family clustering / "close call" view
- Add the checklist-artifact output
- Integrate ProtonDB data for games

**Phase 3 — Persistence and growth**
- Add Firebase Auth + Firestore (optional login)
- Add "ongoing relationship" history/revisit feature
- Expand item and distro databases significantly
- Add anti-cheat data source (pending confirmation of a usable data feed)

## Open decisions (small, can resolve during build)

- **Login required vs. optional to use the tool at all** — leaning optional
  (anonymous use always works; login unlocks saving/history).
- **Checklist vs. downloadable install script** — leaning checklist with
  copyable commands first (lower liability, still useful); a real script
  generator could come later.
- **Tradeoff authoring: per item-vs-distro vs. per dimension** — per-dimension
  is far less writing (one note per mismatch type, reusable across items) at
  the cost of slightly more generic phrasing; worth prototyping both on a
  couple of examples before committing.
