# Honeyscar Voidmend

**Player Name:** _______
**Genotype:** Altered Human
**Character Class:** Examiner
**Level:** 1
**Cryptic Alliance:** None
**Home Town:** Tech III settlement (assumed)
**Tech Level:** III
**Family:** —
**Base Stock Abilities:** None (Altered Human — no natural base-stock attacks/abilities)

---

## Attributes

| Attribute | Score | Modifier | Linked Derived Attribute | Value |
|---|---|---|---|---|
| PS | 10 | 0 | THAC Melee | 0 |
| DX | 11 | 0 | THAC Ranged | 0 |
| CN | 18 | +3 | Health | 13 |
| MS | 13 | +1 | Mental Defense (MD) | 11 |
| IN | 17 | +3 | Use Artifacts | 4 |
| CH | 13 | +1 | Robot Recognition | 19 |
| SN | 14 | — | Perception | 17 |

**Damage Bonus:** —
**Stealth:** 0
**Remain Unseen:** 3
**Max Lift (short/long):** 100 kg / 50 kg
**Base Armor Class:** 10

---

## Speed Chart

| Mode | Value |
|---|---|
| Walk | 12 |
| Trot x2 | 24 |
| Run x3 | 36 |
| Fly | — |
| Swim | 3 |

---

## Combat Block

| Field | Value |
|---|---|
| AC w/Armor | 10 (unarmored) |
| Force Field | none |
| Hits on Force Field | — |
| Hit Points | 64 |
| Wounds | 0 |

---

## Class Skills (Examiner)

| Skill | Points |
|---|---|
| Jury-Rig | 6 |
| Repair Artifact | 6 |
| Read Schematics | 3 |
| Avoid Artifact Disaster | 1 |

**Domars:** 330
**Experience Points:** 0 (2,000 XP to reach Level 2)

---

## Physical Mutations

| # | Mutation | MP | Notes/Bonuses |
|---|---|---|---|
| 1 | Heightened physical attribute | — | Randomly boosted CN by +6 (12 → 18) |
| 2 | Attraction odor (D) | — | Strong musky scent, trackable up to 10km by creatures with Heightened Smell; doubles predator encounter odds in the wild |

---

## Mental Mutations

| # | Mutation | MP | MHAC | Notes/Bonuses |
|---|---|---|---|---|
| 1 | Mental invisibility* | 11 | 0 | Range 25m. Successfully-affected creatures can't sense the character at all |
| 2 | Total healing* | 15 | +2 | Duplicate result, kept (+2d4 to MP). Recovers 7 HP/hour of active concentration, or halts/reverses poison/disease/radiation |

---

## Notes / Gaps in Data

- Examiner's starting Tech IV artifact was **not generated** — the loot/equipment roll tables referenced by the rule (`gw4e_equipment.json: techLevelArtifactTables.techIV`) were not available in this session's extracted data.
- Cryptic Alliance was skipped — full alliance write-ups are not yet extracted from the rulebook.
- Page 2 (Equipment/Artifacts/Adventure Notes) omitted — no actual starting gear items were rolled, only starting currency (330 domars).

---

## Generation Trace (for validation)

**Attribute rolls (4d6-drop-lowest, except SN 3d6):**
- PS: [4,2,2,4], drop 2 → 10
- DX: [5,4,2,1], drop 1 → 11
- CN: [1,3,6,3], drop 1 → 12 (base, pre-mutation)
- MS: [5,1,4,4], drop 1 → 13
- IN: [5,3,6,6], drop 3 → 17
- CH: [3,6,4,2], drop 2 → 13
- SN: [6,5,3] → 14

**Mutation count roll:** d6 = 2 → 2 physical, 3 mental mutations

**Physical mutation rolls (d100):**
- 37 → Heightened physical attribute (range 34-37)
- 5 → Attraction odor (D) (range 05)

**Heightened Physical Attribute target roll:** CN chosen (random PS/DX/CN pick); increase = 6 − 0 (original CN modifier) = 6, applied 12 → 18

**Mental mutation rolls (d100):**
- 47 → Mental invisibility* (range 46-47)
- 87 → Total healing* (range 86-87)
- 87 → Total healing* (duplicate; player chose to KEEP)

**Power score rolls (4d6-drop-lowest):**
- Mental Invisibility MP: [1,3,4,4], drop 1 → 11 (modifier 0)
- Total Healing MP (base): [2,3,2,4], drop 2 → 9
- Duplicate bonus 2d4: [3,3] → 6
- Total Healing MP final: 9 + 6 = 15 (modifier +2)

**Hit points roll:** 18d6 (CN score = 18) = [3,4,3,3,1,6,6,1,3,1,3,3,3,6,4,6,2,6] → total 64

**Starting domars roll:** 1d10 = 8 → 250 + (8×10) = 330

**Skill point allocation (16 points, "fixer" build, user-directed):**
Jury-Rig 6, Repair Artifact 6, Read Schematics 3, Avoid Artifact Disaster 1
