# GW4E Chargen — Backlog

Tracks what's done vs. outstanding against `claude_code_starter_prompt.md`. Update as items land.

## Done (Milestone 1)

- Deterministic engine (`engine.js`) for chargen steps 1–6: genotype → attributes → mutations → class → skills → derived attributes.
- Interactive wizard UI (`ui.js`, `index.html`, `style.css`) walking those steps one panel at a time.
- Expandable Roll Log panel showing every individual die roll (not just totals).
- Mutation duplicate handling (keep & boost vs. reroll) and defect-limit auto-reroll.
- Mutation effect text cross-referenced from `gw4e_mutation_effects.json`.
- Character sheet rendering matching `gw4e_character_sheet_template.json` field layout, with print CSS.
- Node test harness (`test/run-tests.js`) replaying the golden sample plus fresh random spot-check characters.

## Done (post-Milestone 1)

- **Persistent "character cart" sidebar.** Sticky right-hand panel visible on every step, showing genotype/base stock, attribute scores+modifiers, mutations rolled so far (with defect/power-score badges) plus a live Esper-eligibility flag, chosen class, skill allocation, and final derived stats — updates as the character builds instead of only appearing on the final sheet. Also fixed a layout bug where the old fixed-position roll log panel could cover the skill-point input fields; roll log now lives in-flow in the same sidebar column.

- **Attribute tooltips.** Hovering (or tab-focusing) any PS/DX/CN/MS/IN/CH/SN abbreviation — in the Attributes step table, the cart sidebar, and the final character sheet — shows its name and description, sourced from `gw4e_attribute_descriptions.md` via `data/attributeDescriptions.js`. Positioned with JS (`position: fixed`, clamped to viewport) rather than pure CSS so it can't be clipped by the sidebar's scroll container.

- **Real 3D animated dice rolling**, replacing the earlier flat-square CSS prototype. Vendored [sarahRosannaBusch/dice](https://github.com/sarahRosannaBusch/dice) (MIT, three.js + cannon.js, no build step, no CDN — `vendor/dice/`) rather than build custom polyhedron geometry; it supports forcing a die to land on a specific value, which is what lets our engine.js RNG stay the sole source of truth for the actual roll while the physics tumble is purely a visual replay.
  - Theming pass 2 (first pass's pale parchment faces glared out under the library's bright overhead spotlight): dice are now irradiated green (`#4f7a33`) with hazard-amber numerals (`#ffcf40`), `shininess` dropped 40→12, specular darkened, and spotlight intensity dropped 2.0→1.2 — all in `vendor/dice/dice.js`'s `vars` block plus the two `reinit()`/light-constructor lines that weren't originally exposed as `vars`. Dice are also ~65% larger (stage bumped to 360×220, and the library's auto-scale-from-container-size formula changed from `/8` to `/5` divisor).
  - Settled result now stays on screen for 1200ms (`SETTLE_PAUSE_MS` in `diceVisuals.js`) before the wizard continues — was 0ms (moved on the instant the physics settled), so a fast roll could feel like it flickered past.
  - Attribution: `vendor/dice/LICENSE` (verbatim upstream MIT text) + `vendor/dice/ATTRIBUTION.md`, credited in-app via a footer on every page (links to the repo) and in `README.md`'s new Acknowledgments section, alongside a fan-tool disclaimer for the Gamma World/TSR/Wizards of the Coast game data.
  - Wired into: the Attributes step (each attribute's dice replay sequentially, revealing its table row as it settles — including the cart sidebar, which had to be gated on the same reveal-progress state to avoid spoiling values early), every mutation d100 lookup (rendered as a genuine two-die percentile pair — the library's `d100` type is actually a tens-only 0/10/.../90 die and needs a d10 "ones" companion), power-score and duplicate-bonus rolls (4d6/2d4), and the finalize-character moment (single d10 for Domars; Hit Points use an instant flourish, not a full tumble, since a single character can roll 20+ d6 for HP).
  - `engine.js` got small additive-only changes so ui.js can replay the individual dice, not just totals: `rollPowerScoreDetailed`, `duplicateBonusRolls`, `hitPointsRolls`, `domarsD10`. Golden-sample test still passes unchanged.
  - Diagnosed and ruled out what looked like a real library bug (roll completion callback never firing) — it was `requestAnimationFrame` throttling on a backgrounded browser tab, not the library; confirmed by manually stepping the physics loop. `diceVisuals.js` still carries a 5s safety timeout so a real stalled roll (e.g. user alt-tabs mid-roll) can't leave the wizard stuck.
  - Respects `prefers-reduced-motion` (falls back to instant, per earlier decision).

- **Step 7 — Cryptic Alliance.** Optional, skippable step inserted between Skills and the final Character Sheet, backed by the newly-extracted `gw4e_cryptic_alliances.json` (all 13 alliances, full write-ups). Only the 10 `playerCharacterEligible` alliances are offered (The Created, Knights of Genetic Purity, and Seekers are NPC-only and excluded); the one alliance with a `genotypeRestriction` (Iron Society — Altered Humans only) greys out its choice card for ineligible genotypes via a generic substring match against the restriction text, rather than a hardcoded mapping, so it generalizes if more restricted alliances are added later. Alliances with a traditional/reformed (or, for the Zoopremists, left/right) split show a second wing-picker card with the wing descriptions and the alliance's Symbol/Benefits/Restrictions/XP Bonus once one is chosen. Selection (or explicit skip) is reflected live in the cart sidebar and on the final sheet (`Cryptic Alliance: <name> (<wing>)` or `None`, plus an `Alliance Benefits` line when one is picked). New engine.js helpers (`getAllianceKeys`, `getAlliance`, `getPlayerEligibleAllianceKeys`, `alliancePermitsGenotype`, `getAllianceWings`) are pure lookups over the data — no RNG involved, so nothing here touches the golden-sample test.

## Outstanding

- **Step 8 — Starting equipment.** Domars are rolled and shown on the sheet, but nothing spends them yet: no UI against `gw4e_equipment.json`'s Common Equipment/Weapons/Armor tables, no Loot Table roll, no Examiner Tech IV bonus-item resolution (incl. the nested `armorAndWeaponsSubtable`).
- **Character roster / persistence.** No localStorage save/load/delete UI yet — each session is a single throwaway character.
- **Claude API flavor-text module.** `generateFlavorText()` isolated function, API key settings panel, two-part name + narrative generation per the tuned style guide in the starter prompt. Must degrade gracefully with no key configured.
- **Wizard back-navigation.** Currently only "Start Over" (full reset) exists; no way to revisit an earlier step without losing later progress.
- **Mutation sub-mechanics left as descriptive text only** (not auto-applied to the sheet): Multiple limbs (1d4 count), Size change (%), New body parts (d10 pick), Oversized limbs (%), Heightened sense (d6 pick). Only "Heightened physical/mental attribute" is auto-resolved, since it structurally changes an attribute score the rest of the sheet depends on.
- **Print/PDF polish.** Basic `@media print` rules exist; not yet visually tuned against the two-page layout in `gw4e_character_sheet_template.json` (page 2 / equipment block has no renderer yet since nothing rolls equipment).

## Resolved data discrepancy

`SAMPLE-honeyscar_voidmend.md`'s mental mutation roll of 87 was recorded as "Total healing*", but `gw4e_character_generation.json` maps d100 86–87 to "Thought imitation" and 88–91 to "Total healing*". Checked against the rulebook (2026-08-15): the JSON is correct — the sample transcript had a transcription error from the original chat session. No data fix needed; `test/run-tests.js` already replays against the correct JSON ranges.
