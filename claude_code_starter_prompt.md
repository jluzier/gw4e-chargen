PROJECT: Gamma World 4E Character Generator (standalone HTML app)

GOAL
Build a single-page, dependency-light HTML/CSS/JS app that runs the full GAMMA WORLD
4th Edition character generation process (genotype -> attributes -> mutations -> class
-> skills -> derived attributes -> cryptic alliance -> equipment), producing a
formatted character sheet, a generated two-part name, and flavor text - matching the
process I already validated conversationally in Claude chat.

DATA SOURCE - GROUND TRUTH
Four JSON files contain ALL the game rules. Treat them as the single source of truth.
Do not invent rules, formulas, dice notations, or table values not present in these
files. If something needed for a feature isn't in the JSON (e.g. Cryptic Alliance
write-ups aren't extracted yet), stub that step out gracefully rather than guessing
rules content.

  1. gw4e_character_generation.json - core process: genotypes, attribute generation
     (formulas + modifier table), mutation roll tables (physical/mental/plant d100
     tables with roll ranges only), character classes + skills, derived attribute
     formulas, level advancement, starting equipment formula.
  2. gw4e_mutation_effects.json - full mechanical effect text for every mutation
     named in file #1's roll tables (120 entries: physical/mental/plant-only).
     Keyed by exact mutation name string (including trailing * and (D) markers).
  3. gw4e_equipment.json - Loot Table mechanism, Tech III-VI Artifact roll tables
     (incl. nested Armor & Weapons sub-tables), Warheads/Grenades/Guidance tables,
     Common Equipment/Weapons/Armor price tables, Artifact weapon/armor stat tables.
  4. gw4e_character_sheet_template.json - field layout/structure only, mirroring
     the official printed character sheet (pp.193-194), for consistent output
     formatting.

Embed these four JSON files directly in the app (as JS constants or fetched local
files bundled alongside the HTML) so the app works fully offline with no server.

CORE REQUIREMENTS

1. Deterministic rules engine (pure JS, no LLM involved):
   - Implement all dice notations exactly as specified (4d6-L = roll 4d6, drop
     lowest, sum remaining 3; 2d4+X = roll 2d4 add stock value X; d100 table
     lookups against roll ranges; etc).
   - Walk the 8-step process as an interactive wizard UI, one step per screen/panel:
     genotype pick (with base animal/plant stock sub-picker where relevant, and the
     humanoid-traits decision for animals/plants) -> attribute rolls (show each die
     roll, not just the total - this was important for auditability in testing) ->
     mutation rolls (enforce the 1-physical/1-mental defect limit, reroll additional
     defects automatically; implement the duplicate-mutation rule: prompt whether to
     keep-and-boost or reroll) -> class pick (validate Esper's mutation-power-score
     requirement) -> skill point allocation (min 1, max 8 per skill, must sum to the
     class's total) -> derived attribute calculation (apply genotype/class bonuses
     correctly, including special cases like Sentient Plant's "never recognized as
     human" Robot Recognition override) -> cryptic alliance (optional, currently
     just a skip/placeholder since data isn't extracted) -> starting equipment
     (roll domars via the formula; optionally let the user spend it against the
     Common Equipment/Weapons/Armor tables, or roll Loot for a found item; if class
     is Examiner, resolve their bonus Tech IV item via gw4e_equipment.json's
     techLevelArtifactTables.techIV, including the nested armorAndWeaponsSubtable).
   - For every roll, show the actual dice results in an expandable "roll log" panel,
     the same way I showed rolls in chat (e.g. "4d6-L = [5,2,6,1], drop the 1 -> 13").
     This is a deliberate transparency/trust feature - don't just show final numbers.
   - Cross-reference mutation names against gw4e_mutation_effects.json so each rolled
     mutation displays its real mechanical effect, not just its name.

2. Character sheet output:
   - Render using the field structure in gw4e_character_sheet_template.json
     (pageOneFields for the main stat block; pageTwoFields only if equipment/gear
     was actually determined).
   - Support both on-screen display and a clean print/PDF-friendly view.

3. Character roster / persistence:
   - Use localStorage (this is a standalone app, not a claude.ai artifact, so
     localStorage is fine here) to save generated characters across sessions.
   - Basic list/load/delete UI for saved characters.

4. Claude API integration for name + flavor text (ISOLATED, OPTIONAL MODULE):
   - Put this behind a single clearly-marked function (e.g. generateFlavorText())
     that takes the finished character's rolled data as input.
   - Requires the user to supply their own Anthropic API key (store it in
     localStorage, never hardcode it); show a settings panel for entering it.
   - If no key is configured, the app must still fully function - just skip name/
     flavor generation, or offer a simple non-LLM fallback (template-based name
     from genotype + top mutation).
   - When a key IS present, call the API with a system prompt built from this style
     guide (reproduce faithfully - this was tuned conversationally and validated):

     ---
     Generate TWO things for this GAMMA WORLD 4th Edition character, grounded
     specifically in their actual rolled stats/mutations/defects (never generic):

     1. A two-part name where each half traces to something specific about the
        character (genotype/base stock, and a signature mutation or trait) -
        not decorative, actually derivable from the rolls. One-line reasoning.

     2. Flavor text in the rulebook's own narrative voice: played completely
        straight, no jokes or self-aware humor - the comedy comes from narrating
        an absurd mutant premise with total sincerity, 1950s-creature-feature
        style. Short, punchy, slightly melodramatic sentences; concrete physical
        detail over abstract character study. Two modes - default to short
        vignette/field-observation (3-5 sentences) unless backstory (2-3
        paragraphs) is requested. Weave in class skills or notable derived
        attributes as character traits where natural. Never modern slang, irony,
        or meta-commentary. Original writing only - do not reference or imitate
        specific copyrighted book passages, just the tone.
     ---

   - Pass the character's genotype/class/attributes/mutations/defects as structured
     data in the user message so the model has concrete rolls to ground the text in.

TECH constraints
   - Single HTML file preferred (inline CSS/JS) for portability, OR a small set of
     files (index.html, app.js, data/*.json) if that's cleaner for Claude Code to
     maintain - your call, optimize for something I can keep iterating on easily.
   - No build step / no framework unless you think it's clearly warranted for this
     scope - keep it simple, this is a personal-use tool.
   - Should run by just opening the HTML file in a browser (or a trivial local
     server if fetch() of local JSON files requires it due to CORS).

FIRST MILESTONE
Get the deterministic engine working end-to-end for steps 1-6 (through derived
attributes) with the roll log and character sheet display, WITHOUT the Claude API
piece yet. Confirm that against a couple of known-good test characters before
adding the flavor-text module and equipment/cryptic-alliance steps on top.
