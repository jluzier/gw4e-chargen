# gw4e-chargen

A Gamma World 4th Edition Rules character generator app, built in HTML with Claude Code.

Open `index.html` in a browser — no build step, no server required.

## Acknowledgments

**Gamma World** is a tabletop roleplaying game originally published by TSR, Inc.
(now part of Wizards of the Coast, a subsidiary of Hasbro). This is an
unofficial, non-commercial fan-made tool and is not affiliated with,
endorsed by, or sponsored by Wizards of the Coast or Hasbro. "Gamma World"
and related trademarks are the property of their respective owners.

The rules data in `data/*.js` (genotypes, attribute formulas, mutation
tables and effects, equipment tables, character sheet layout) is drawn from
*Gamma World, 4th Edition* (TSR 07514, 1992 boxed set) for personal,
non-commercial use, and represents mechanical data (numbers, tables,
formulas) rather than the rulebook's original prose/flavor text. See each
data file's `_meta.source` field for the specific chapter/page range it was
extracted from.

Dice-rolling animation uses [sarahRosannaBusch/dice](https://github.com/sarahRosannaBusch/dice)
(MIT License), itself derived from Anton Natarov's original 3D dice roller,
vendored locally under `vendor/dice/` (see `vendor/dice/ATTRIBUTION.md`) and
recolored to this app's theme. It bundles [three.js](https://github.com/mrdoob/three.js/)
and [cannon.js](https://github.com/schteppe/cannon.js) for 3D rendering and physics.
