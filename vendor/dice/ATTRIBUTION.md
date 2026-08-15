# Vendored: 3D Dice Roller

Source: https://github.com/sarahRosannaBusch/dice (MIT License)
Derived from Anton Natarov's original 3D dice roller (2014).
Vendored 2026-08-15 for the GW4E character generator's dice-roll animations.

Files:
- `dice.js` — the roller itself (edited locally: see the `vars` block for
  GW4E theme colors, diverges from upstream).
- `libs/three.min.js`, `libs/cannon.min.js`, `libs/teal.js` — unmodified
  upstream dependencies (three.js, cannon.js, and a small DOM helper).

No CDN, no build step — plain `<script>` tags, same pattern as the rest of
this project's data/*.js and engine.js.
