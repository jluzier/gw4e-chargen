// Auto-generated from gw4e_character_generation.json — do not hand-edit; regenerate from source JSON.
(function (root) {
  root.GW4E_GENERATION = {
  "_meta": {
    "source": "TSR 07514 - Gamma World, 4th Edition (1992 boxed set rulebook)",
    "purpose": "Structured rules data extracted for a personal-use interactive character generator. Mechanical data only (numbers, tables, formulas) - not a reproduction of the book's prose/flavor text.",
    "pagesCovered": "Chapter 2: Character Generation (pp. 8-25) plus Base Animal/Plant Stock lists and the d100 Mutation tables",
    "companionFile": "gw4e_mutation_effects.json - full mechanical effect text for every mutation named in the roll tables below (Chapter 3: Mutations, pp. 26-47). Keyed by mutation name, exact string match against the 'mutation' field in physicalMutationsTable/mentalMutationsTable/plantMutationsTable.",
    "companionFile2": "gw4e_equipment.json - Loot Table mechanism, Tech III-VI Artifact roll tables (including the Examiner's starting Tech IV item), Common Equipment/Weapons/Armor price tables, and Artifact Weapons/Armor stat tables (Chapter 6: Equipment, pp. 78-96).",
    "stillToExtract": [
      "Cryptic Alliances chapter full write-ups (pp. 127-139) - chargen only covers the concept, not the actual alliance options"
    ]
  },
  "characterGenerationProcess": [
    "1. Pick a genotype",
    "2. Roll the seven attributes",
    "3. Roll the mutations (if any)",
    "4. Pick a character class",
    "5. Distribute class skill points",
    "6. Calculate the derived attributes",
    "7. Pick a cryptic alliance (if any)",
    "8. Determine starting equipment"
  ],
  "genotypes": {
    "pureStrainHuman": {
      "displayName": "Pure Strain Human",
      "mutations": "none (cannot be mutated)",
      "bonuses": [
        "+3 to Constitution, Intelligence and Charisma rolls",
        "+2 bonus with the Use Artifacts ability",
        "+2 bonus to Health against radiation hazards"
      ],
      "baseSpeed": {
        "walking": 12,
        "swimming": 3
      }
    },
    "alteredHuman": {
      "displayName": "Altered Human",
      "mutations": "physical and mental mutations",
      "bonuses": [],
      "penalties": [
        "-2 penalty to Robot Recognition"
      ],
      "baseSpeed": {
        "walking": 12,
        "swimming": 3
      }
    },
    "mutatedAnimal": {
      "displayName": "Mutated Animal",
      "mutations": "physical and mental mutations",
      "bonuses": [
        "+2 bonus to Stealth",
        "Retains some natural abilities from animal heritage",
        "Bonus physical mutation if no humanoid traits taken"
      ],
      "penalties": [
        "-6 penalty to Robot Recognition (or -8 if no optional humanoid characteristics taken)"
      ],
      "baseSpeed": "derived from base animal stock (see baseAnimalStockList)",
      "rules": {
        "basicsAtCreation": "Player must pick a real-world base animal stock. Cannot pick an already-established mutant race (e.g. sleeth, hoop) - only ordinary real-world animals.",
        "minimumSize": "Mutated animals must start a minimum of one meter tall/long; size-change mutation can adjust later.",
        "maxHeightIfNormallyOverOneMeter": "3 meters walking upright, unless size change (larger) mutation rolled",
        "humanoidTraits": {
          "description": "After determining physical/mental mutations, the player may choose to add any or all humanoid traits below. Taking ANY of them forfeits the bonus physical mutation for taking none.",
          "options": [
            "Talk (voice is non-human sounding)",
            "Bipedal / upright walking stance",
            "Manipulate tools and objects (paws/claws/tail/trunk becomes hand-like; no new limbs grow)"
          ]
        },
        "bipedalSizeAdjustment": "If size adjusted, bipedal animal is 1.5m tall (1m body + ~0.5m legs)",
        "twoThirdsSpeedRule": "Animals walking on two legs, when that species doesn't normally do so, use two-thirds of their normal base speed",
        "statRollFormula": "2d4 + (base PS/DX/CN value from Base Animal Stock List) for Physical Strength, Dexterity, Constitution. Mental attributes (IN, MS, CH) are standard 3d6 as for other genotypes.",
        "npcAverageStockAdjustment": "For an NPC with average attributes, add 5 to the base animal stock value instead of rolling 2d4."
      },
      "baseAnimalStockList": {
        "columns": [
          "name",
          "PS",
          "DX",
          "CN",
          "notes"
        ],
        "entries": [
          {
            "name": "Alligator",
            "PS": 15,
            "DX": 3,
            "CN": 12,
            "notes": "Tail slap 1d8 dmg at -2 THAC. Bite 2d6 dmg. Natural AC 13 before DX modifiers. Base speed 15 (10 bipedal), 8 in water."
          },
          {
            "name": "Armadillo",
            "PS": 5,
            "DX": 6,
            "CN": 5,
            "notes": "Claw/claw/bite 1d3/1d3/1d2. Has total carapace and night vision as mutations. Base speed 12 (8 bipedal)."
          },
          {
            "name": "Badger",
            "PS": 8,
            "DX": 7,
            "CN": 6,
            "notes": "Two claw attacks 1d6/1d6 dmg. Base speed 8 (6 bipedal). Has night vision as mutation. Can burrow at 1 m/min."
          },
          {
            "name": "Bat",
            "PS": 2,
            "DX": 7,
            "CN": 4,
            "notes": "Bite 1d4 dmg. Flying base speed 18, walking 4 (5 bipedal). Has sonar, heightened hearing, diminished sight (D) as mutations."
          },
          {
            "name": "Bear",
            "PS": 16,
            "DX": 7,
            "CN": 13,
            "notes": "Claw/claw/bite 1d8/1d8/1d6 dmg. Base speed 15 (10 bipedal). Has heightened smell as mutation."
          },
          {
            "name": "Boar",
            "PS": 13,
            "DX": 5,
            "CN": 10,
            "notes": "Tusk attack 1d6; if charging +2 THAC and 1d6+2. Base speed 17 (11 bipedal)."
          },
          {
            "name": "Bull",
            "PS": 16,
            "DX": 3,
            "CN": 14,
            "notes": "Horn attack 1d6; if charging +2 THAC and 2d6+2 dmg. Base speed 16 (11 bipedal)."
          },
          {
            "name": "Camel",
            "PS": 14,
            "DX": 3,
            "CN": 13,
            "notes": "Bite 1d4 dmg. Survives hot/dry conditions 2x as long, half water needed. Base speed 16 (11 bipedal)."
          },
          {
            "name": "Chameleon",
            "PS": 3,
            "DX": 10,
            "CN": 5,
            "notes": "No natural attack. Has chameleon power and regeneration mutations. Base speed 12 (8 bipedal)."
          },
          {
            "name": "Cheetah",
            "PS": 13,
            "DX": 10,
            "CN": 8,
            "notes": "Claw/claw/bite 1d4/1d4/1d6 dmg. Base speed 36 (24 bipedal) for 2 rounds, then base speed 18 (12 bipedal); must rest 10 min to regain top speed. Has heightened vision as mutation."
          },
          {
            "name": "Cougar",
            "PS": 15,
            "DX": 13,
            "CN": 11,
            "notes": "Claw/claw/bite 1d6/1d6/1d6 dmg. Leap 3 meters. Base speed 18 (12 bipedal). Has heightened hearing, heightened smell, night vision as mutations."
          },
          {
            "name": "Crab",
            "PS": 8,
            "DX": 4,
            "CN": 6,
            "notes": "Two pincers 1d8/1d8 dmg. Can breathe water (salt or fresh). Base speed 10 (6 in water). Has total carapace as mutation. No walking upright position."
          },
          {
            "name": "Deer",
            "PS": 12,
            "DX": 14,
            "CN": 9,
            "notes": "Antlers 1d4 dmg, +2 THAC and 1d6+1 dmg in a charge. Has heightened hearing as mutation. Base speed 20 (14 bipedal)."
          },
          {
            "name": "Duck",
            "PS": 2,
            "DX": 6,
            "CN": 4,
            "notes": "Paddles in water at speed 3. Immune to chilling effects of cold water. Has wings but flies at speed 18. Walks at base speed 5 (6 in bipedal humanoid form)."
          },
          {
            "name": "Elephant",
            "PS": 18,
            "DX": 4,
            "CN": 16,
            "notes": "Tusks 2d6 dmg, if charging 3d6 dmg. Base speed 18 (12 bipedal). Has a prehensile trunk with half the animal's PS. Has heightened hearing as mutation."
          },
          {
            "name": "Fox",
            "PS": 7,
            "DX": 11,
            "CN": 5,
            "notes": "Bite 1d6 dmg. Base speed 19 (12 bipedal). Has heightened smell, heightened hearing, night vision as mutations."
          },
          {
            "name": "Frog",
            "PS": 7,
            "DX": 4,
            "CN": 6,
            "notes": "Can leap 12m forward, 5m high. Can breathe water. Base speed 15 (10 bipedal), swims at 12."
          },
          {
            "name": "Gorilla",
            "PS": 16,
            "DX": 10,
            "CN": 11,
            "notes": "Bite 1d6 dmg. Climbing attempts one difficulty level easier than normal. Can swing grip-to-grip at speed 6. +2 bonus for Robot Recognition. Base speed 13, even if walking upright."
          },
          {
            "name": "Grasshopper",
            "PS": 7,
            "DX": 6,
            "CN": 6,
            "notes": "Exoskeleton base AC 14. Has multiple limbs (legs) as mutation. Base walking speed 6 (even if upright); jumps 15m (7 vertically); wings assist jumping."
          },
          {
            "name": "Hawk",
            "PS": 3,
            "DX": 13,
            "CN": 5,
            "notes": "Claw/claw/bite 1d6/1d6/1d4 dmg. Has wings, flying base speed 30. Walking base speed 4 (even if upright). Heightened vision as mutation."
          },
          {
            "name": "Horse",
            "PS": 14,
            "DX": 10,
            "CN": 11,
            "notes": "Kick/kick 1d6/1d6 dmg. Base speed 24 (16 bipedally)."
          },
          {
            "name": "Kangaroo",
            "PS": 7,
            "DX": 11,
            "CN": 6,
            "notes": "Can jump 13m forward, 3m up. Base speed 15, even if walking upright."
          },
          {
            "name": "Monkey",
            "PS": 10,
            "DX": 14,
            "CN": 5,
            "notes": "Bite 1d3 dmg. Climbing attempts two difficulty levels easier than normal. Can swing grip-to-grip at speed 6. +1 bonus for Robot Recognition. Base speed 12, even if walking upright."
          },
          {
            "name": "Mosquito",
            "PS": 5,
            "DX": 7,
            "CN": 5,
            "notes": "Bite 1d4, drains 1 pt blood/round automatically. Anesthetic proboscis doesn't wake sleeping victims. Needs 6 pts blood for food/water per day. Has multiple limbs (legs) and wings (flight speed 12) as mutations. Base speed 6 (even upright)."
          },
          {
            "name": "Octopus",
            "PS": 7,
            "DX": 10,
            "CN": 7,
            "notes": "Assumed land-dwelling, air-breathing. Has gills, chameleon power, multiple limbs (arms and legs) as mutations. Base speed 8 (even upright), swims at 6. Climbing smooth surfaces one difficulty level easier (suction cups)."
          },
          {
            "name": "Ostrich",
            "PS": 12,
            "DX": 6,
            "CN": 10,
            "notes": "Kick 1d6 dmg. Base speed 16, even if walking upright. Has vestigial wings (purely ornamental, no flight)."
          },
          {
            "name": "Otter",
            "PS": 9,
            "DX": 12,
            "CN": 5,
            "notes": "Bite 1d6 dmg. Base speed 9 (6 bipedally), swims at 6. Immune to chilling effects of cold water."
          },
          {
            "name": "Porcupine",
            "PS": 5,
            "DX": 6,
            "CN": 4,
            "notes": "Bite 1d3 dmg. Has quills (can't be thrown) that do 1d6 if grabbed. Base speed 9 (6 bipedal)."
          },
          {
            "name": "Praying Mantis",
            "PS": 9,
            "DX": 7,
            "CN": 8,
            "notes": "Claw/claw 1d8/1d8 dmg. +2 bonus to Remain Unseen in green vegetation. Has multiple limbs (legs) as mutation. Exoskeleton base AC 14. Base speed 12, even if walking upright."
          },
          {
            "name": "Raccoon",
            "PS": 6,
            "DX": 10,
            "CN": 6,
            "notes": "Bite 1d4 dmg. Has night vision as mutation. Paws manipulate tools naturally. Base speed 10 (7 bipedally)."
          },
          {
            "name": "Rhinoceros",
            "PS": 16,
            "DX": 2,
            "CN": 14,
            "notes": "Horn 1d6+1 dmg, +2 THAC and 2d6+2 dmg on a charge. Has heightened smell and diminished sight (D) as mutations. Base speed 18 (12 bipedal). Natural AC 12 before DX modifiers."
          },
          {
            "name": "Sea Lion (Seal)",
            "PS": 6,
            "DX": 11,
            "CN": 8,
            "notes": "Bite 1d4 dmg. Base speed 5 (7 bipedally); swims at 10. Can hold breath 12 rounds. Has heightened smell (underwater only) as mutation."
          },
          {
            "name": "Shark",
            "PS": 8,
            "DX": 7,
            "CN": 10,
            "notes": "Assumed adapted for land-dwelling. Bite 1d12 dmg naturally. Has gills and heightened smell (underwater only) as mutations. Base speed 7 (walking upright), swims at 10. 5% chance/round of combat of entering bloodlust; must attack with bite until end of battle."
          },
          {
            "name": "Sheep, Bighorn",
            "PS": 11,
            "DX": 14,
            "CN": 9,
            "notes": "Head butt 1d6+1 dmg, +2 THAC and 1d6+3 dmg on a charge. Survives cold/dry conditions twice as long as normal. Base speed 14 (9 bipedal)."
          },
          {
            "name": "Skunk",
            "PS": 5,
            "DX": 4,
            "CN": 4,
            "notes": "Bite 1d3 dmg. Has gas generation (bad-smelling musk) and night vision as mutations. Base speed 10 (7 bipedally)."
          },
          {
            "name": "Snake",
            "PS": 13,
            "DX": 11,
            "CN": 4,
            "notes": "Bite 1d6+1 dmg plus poison (intensity 1d6). Has infravision as mutation. Base speed 12. No 'walking upright' position."
          },
          {
            "name": "Spider",
            "PS": 7,
            "DX": 8,
            "CN": 7,
            "notes": "Bite 1d4 dmg plus poison, intensity 1d6+1. Has multiple limbs (arms/legs), giving +5 DX against being knocked down. Climbing attempts one difficulty level easier. Base speed 12, even if walking upright."
          },
          {
            "name": "Squirrel, Flying",
            "PS": 6,
            "DX": 15,
            "CN": 4,
            "notes": "Has air sail as mutation but glides at speed 12. Base speed 9 (6 bipedal). Bite 1d3 dmg. +3 bonus for climbing."
          },
          {
            "name": "Termite",
            "PS": 6,
            "DX": 6,
            "CN": 6,
            "notes": "Bite 1d6 dmg. Exoskeleton base AC 14. Has multiple limbs (legs) as mutation. Base speed 10 (even upright). Burrows at speed 3 through earth/wood."
          },
          {
            "name": "Tiger",
            "PS": 16,
            "DX": 11,
            "CN": 12,
            "notes": "Claw/claw/bite 1d8/1d8/1d10 dmg. Has heightened smell and night vision as mutations. Base speed 16 (11 bipedal). Swims at 4."
          },
          {
            "name": "Turtle",
            "PS": 1,
            "DX": 2,
            "CN": 6,
            "notes": "Has total carapace as mutation. Swims at 6. Can hold breath 5 minutes. Base speed 6 (4 bipedal)."
          },
          {
            "name": "Wasp",
            "PS": 6,
            "DX": 9,
            "CN": 7,
            "notes": "Sting 1d6 dmg plus poison, intensity 1d4+1. Exoskeleton AC 14. Has multiple limbs (legs) as mutation. Base speed 8 (even upright). Climbing one difficulty level easier. Has wings, flying base speed 21."
          },
          {
            "name": "Weasel",
            "PS": 9,
            "DX": 12,
            "CN": 5,
            "notes": "Bite 1d6 dmg. Has night vision as mutation. Base speed 14 (9 bipedally)."
          },
          {
            "name": "Wolf",
            "PS": 9,
            "DX": 12,
            "CN": 8,
            "notes": "Bite 1d6 dmg. Has heightened smell and heightened hearing as mutations. Base speed 17 (11 bipedal)."
          }
        ]
      }
    },
    "sentientPlant": {
      "displayName": "Sentient Plant",
      "mutations": "plant mutations (fewer defects than other genotypes)",
      "bonuses": [
        "+2 bonus to Remain Unseen",
        "+2 initial Constitution bonus",
        "Bonus physical mutation if no humanoid traits taken",
        "+1 Constitution every level"
      ],
      "restrictions": [
        "No ability to command or control robots",
        "Needs sun and soil instead of food"
      ],
      "baseSpeed": {
        "walking": 9,
        "swimming": 3
      },
      "rules": {
        "generalDescription": "Not derived from a real-world species; instead built from a general plant CLASS (see basePlantStockList). All special abilities not listed in the base class must come from mutation rolls.",
        "sizeFromConstitution": "Roughly 1 meter of height per 5 points of Constitution. Grows larger as it advances in level (gains +1 CN/level).",
        "sustenance": "3 hours bright sunlight OR 6 hours dim sunlight per day (plant can be fully active during this); same water needs as human/animal, drawn from soil. Missing this for a day causes same consequences as a human/animal missing food/water for a day.",
        "appendagesAndOrgans": "Player decides how many appendages the plant has and where vital organ equivalents (brain, sensory organs, digestive system, secondary vital organ/heart) are located. None can initially manipulate objects/use tools.",
        "humanoidTraitsNote": "Like mutated animals, can optionally take ability to talk and/or use tools (max 2 appendages initially declared tool-capable) and/or smell/taste simultaneously. Not taking any of these traits grants a bonus physical mutation, using the Plant Mutations table. Mental mutations rolled same as any other character."
      },
      "basePlantStockList": {
        "columns": [
          "name",
          "notes"
        ],
        "entries": [
          {
            "name": "Brush",
            "notes": "Most nondescript bushes, weeds, grasses. +3 bonus to Remain Unseen. Gets one extra physical mutation."
          },
          {
            "name": "Flower",
            "notes": "All flowering plants. +3 CH bonus. Gets one extra mental mutation."
          },
          {
            "name": "Fungi",
            "notes": "Not truly a plant but included here; needs soil, not sunlight. +3 MD bonus."
          },
          {
            "name": "Succulent",
            "notes": "Cacti and desert plants. Only need water half as often. Automatically get the thorns or spikes mutation."
          },
          {
            "name": "Tree",
            "notes": "+3 PS bonus and the total carapace mutation automatically. Player chooses evergreen or not; evergreens have -2 Health penalty vs. fire (extra point of damage per die from fire/cold attacks)."
          },
          {
            "name": "Vine",
            "notes": "+2 DX bonus. Can automatically manipulate tools without taking the humanoid attribute for it (still eligible for the bonus mutation if they decline other humanoid traits)."
          }
        ]
      }
    }
  },
  "attributeGeneration": {
    "attributeDefinitions": {
      "PS": "Physical Strength - raw muscle power; lift/carry capacity; melee THAC and damage",
      "DX": "Dexterity - nimbleness/accuracy; ranged THAC, AC, Stealth, combat initiative",
      "CN": "Constitution - damage/hit point capacity; resistance to poison, radiation, disease (Health)",
      "MS": "Mental Strength - willpower; general mental-combat attribute per p.16 framing. Precisely: MS modifier determines MD (mental defense, 10 + MS mod). MS does NOT directly set MHAC - each mental mutation's own power score (MP) determines that mutation's individual MHAC (see derivedAttributes.formulas.MHAC, p.24).",
      "IN": "Intelligence - logic/problem solving; Use Artifacts, Remain Unseen",
      "CH": "Charisma - social/psychological presence; influences reactions of others",
      "SN": "Senses - single value for overall sensory acuity; base for individual sense modifiers"
    },
    "attributesByGenotype": {
      "columns": [
        "attribute",
        "pureStrainHuman",
        "alteredHuman",
        "mutatedAnimal",
        "sentientPlant"
      ],
      "rows": [
        {
          "attribute": "PS",
          "pureStrainHuman": "4d6-L",
          "alteredHuman": "4d6-L",
          "mutatedAnimal": "2d4+PS(stock)",
          "sentientPlant": "3d6"
        },
        {
          "attribute": "DX",
          "pureStrainHuman": "4d6-L",
          "alteredHuman": "4d6-L",
          "mutatedAnimal": "2d4+DX(stock)",
          "sentientPlant": "3d6"
        },
        {
          "attribute": "CN",
          "pureStrainHuman": "4d6-L+3",
          "alteredHuman": "4d6-L* (min score 8)",
          "mutatedAnimal": "2d4+CN(stock)",
          "sentientPlant": "3d6* (+2 bonus per sentient plant genotype rule)"
        },
        {
          "attribute": "MS",
          "pureStrainHuman": "4d6-L",
          "alteredHuman": "4d6-L",
          "mutatedAnimal": "3d6",
          "sentientPlant": "3d6"
        },
        {
          "attribute": "IN",
          "pureStrainHuman": "4d6-L+3",
          "alteredHuman": "4d6-L",
          "mutatedAnimal": "3d6",
          "sentientPlant": "3d6"
        },
        {
          "attribute": "CH",
          "pureStrainHuman": "4d6-L+3",
          "alteredHuman": "4d6-L",
          "mutatedAnimal": "3d6",
          "sentientPlant": "3d6"
        },
        {
          "attribute": "SN",
          "pureStrainHuman": "3d6",
          "alteredHuman": "3d6",
          "mutatedAnimal": "4d6-L",
          "sentientPlant": "4d6-L"
        },
        {
          "attribute": "MP (Mutation Power)",
          "pureStrainHuman": null,
          "alteredHuman": "4d6-L (rolled separately per mutation, where applicable)",
          "mutatedAnimal": "4d6-L (rolled separately per mutation, where applicable)",
          "sentientPlant": "4d6-L (rolled separately per mutation, where applicable)"
        }
      ],
      "notation": "4d6-L means roll four six-sided dice, drop the lowest single die, add the remaining three. 2d4+X means roll two four-sided dice and add the base animal-stock value X for that attribute."
    },
    "attributeModifiersTable": {
      "columns": [
        "scoreRange",
        "modifier"
      ],
      "rows": [
        {
          "scoreRange": "1",
          "modifier": -4
        },
        {
          "scoreRange": "2-3",
          "modifier": -3
        },
        {
          "scoreRange": "4-5",
          "modifier": -2
        },
        {
          "scoreRange": "6-7",
          "modifier": -1
        },
        {
          "scoreRange": "8-12",
          "modifier": 0
        },
        {
          "scoreRange": "13-14",
          "modifier": 1
        },
        {
          "scoreRange": "15-16",
          "modifier": 2
        },
        {
          "scoreRange": "17-18",
          "modifier": 3
        },
        {
          "scoreRange": "19-20",
          "modifier": 4
        },
        {
          "scoreRange": "21-22",
          "modifier": 5
        },
        {
          "scoreRange": "23-24",
          "modifier": 6
        },
        {
          "scoreRange": "25-26",
          "modifier": 7
        }
      ],
      "extensionRule": "Table continues beyond 26; every additional pair of scores adds +1 more modifier point."
    },
    "carryingCapacity": {
      "shortDistance": "10 kg (about 25 lb) per point of PS - lift/push/pull, or carry a short distance (few meters)",
      "longDistance": "5 kg per point of PS - sustained carrying over distance"
    }
  },
  "mutations": {
    "generalRules": {
      "whoGetsMutations": "All characters except Pure Strain Humans have mutations. Determined randomly (not chosen), except final humanoid/tool-use traits for animals/plants.",
      "defects": "Mutation table entries marked (D) are defects. Player characters are allowed only ONE physical defect and ONE mental defect; any additional defect roll is rerolled until a beneficial mutation results.",
      "minimumMutations": "A character gets at least five mutations total. Player may choose to have fewer, but must decide before rolling the physical/mental split or any specific mutation.",
      "numberOfMutationsRoll": "Roll 1d6 to find the number of PHYSICAL mutations; look up on the Mutations count table below. All remaining mutations (out of the 5+ total) are mental. A roll of 6 on the physical die = 0 physical mutations. A roll of 5 = 0 mental mutations.",
      "extraMutationResults": "If a specific mutation roll grants an extra physical mutation as its effect, this does NOT change the number of mental mutations already determined by the count roll.",
      "mutationPowerScore": "Mutations with a power score are marked with an asterisk (*) on the tables. Power score (MP) is rolled as 4d6-L, same formula as primary attributes for altered humans. Not all mutations have a power score (some are simply true/false, like extra arms).",
      "rollingDuplicates": {
        "rule": "It's possible to roll the same mutation twice+ during character creation. Player may keep the duplicate or reroll it.",
        "ifKeptWithPowerScore": "Add 2d4 to the mutation's power score.",
        "ifKeptWithoutPowerScore": "Character gets twice as many / twice as much of whatever the mutation offers (GM/player picks the doubled element - range, duration, number of affected creatures, etc.) OR an extra use per round, whichever makes more sense for that mutation."
      }
    },
    "mutationCountByD6Roll": {
      "columns": [
        "d6Roll",
        "physicalMutations",
        "mentalMutations"
      ],
      "rows": [
        {
          "d6Roll": 1,
          "physicalMutations": 1,
          "mentalMutations": 4
        },
        {
          "d6Roll": 2,
          "physicalMutations": 2,
          "mentalMutations": 3
        },
        {
          "d6Roll": 3,
          "physicalMutations": 3,
          "mentalMutations": 2
        },
        {
          "d6Roll": 4,
          "physicalMutations": 4,
          "mentalMutations": 1
        },
        {
          "d6Roll": 5,
          "physicalMutations": 5,
          "mentalMutations": 0
        },
        {
          "d6Roll": 6,
          "physicalMutations": 0,
          "mentalMutations": 5
        }
      ]
    },
    "_note_on_tables_below": "These d100 tables list mutation NAMES and roll ranges only, as printed in the Character Generation chapter's summary tables (p.18). Full rules text / mechanical effect for each named mutation lives in the dedicated Mutations chapter (pp. 26-47), which is the next extraction pass. (D) = defect. (*) = has a power score.",
    "physicalMutationsTable": {
      "diceType": "d100",
      "entries": [
        {
          "roll": "01",
          "mutation": "Achilles heel (D)"
        },
        {
          "roll": "02",
          "mutation": "Air sail"
        },
        {
          "roll": "03",
          "mutation": "Allergy (D)"
        },
        {
          "roll": "04",
          "mutation": "Anti-life leech"
        },
        {
          "roll": "05",
          "mutation": "Attraction odor (D)"
        },
        {
          "roll": "06-07",
          "mutation": "Bodily control*"
        },
        {
          "roll": "08-12",
          "mutation": "Body change (D)"
        },
        {
          "roll": "13-14",
          "mutation": "Carapace*"
        },
        {
          "roll": "15",
          "mutation": "Chameleon power*"
        },
        {
          "roll": "16",
          "mutation": "Chemical susceptibility (D)"
        },
        {
          "roll": "17",
          "mutation": "Density control (self)*"
        },
        {
          "roll": "18",
          "mutation": "Diminished sense (D)"
        },
        {
          "roll": "19",
          "mutation": "Doubled pain (D)"
        },
        {
          "roll": "20-21",
          "mutation": "Dual brain"
        },
        {
          "roll": "22-23",
          "mutation": "Electrical generation*"
        },
        {
          "roll": "24",
          "mutation": "Energy absorption*"
        },
        {
          "roll": "25",
          "mutation": "Energy metamorphosis*"
        },
        {
          "roll": "26",
          "mutation": "Energy reflection*"
        },
        {
          "roll": "27",
          "mutation": "Energy sensitivity (D)"
        },
        {
          "roll": "28",
          "mutation": "Fadeout (D)"
        },
        {
          "roll": "29",
          "mutation": "Gas generation*"
        },
        {
          "roll": "30",
          "mutation": "Gills"
        },
        {
          "roll": "31-32",
          "mutation": "Hands of power*"
        },
        {
          "roll": "33",
          "mutation": "Heightened balance"
        },
        {
          "roll": "34-37",
          "mutation": "Heightened physical attribute"
        },
        {
          "roll": "38",
          "mutation": "Heightened precision"
        },
        {
          "roll": "39-41",
          "mutation": "Heightened sense"
        },
        {
          "roll": "42",
          "mutation": "Heightened speed*"
        },
        {
          "roll": "43",
          "mutation": "Horns or antlers"
        },
        {
          "roll": "44-45",
          "mutation": "Immunity"
        },
        {
          "roll": "46-47",
          "mutation": "Infravision"
        },
        {
          "roll": "48",
          "mutation": "Kinetic absorption*"
        },
        {
          "roll": "49",
          "mutation": "Metamorphosis*"
        },
        {
          "roll": "50-54",
          "mutation": "Multiple limbs"
        },
        {
          "roll": "55-58",
          "mutation": "New body parts"
        },
        {
          "roll": "59",
          "mutation": "Night vision"
        },
        {
          "roll": "60",
          "mutation": "Nocturnal (D)"
        },
        {
          "roll": "61-62",
          "mutation": "Oversized limbs"
        },
        {
          "roll": "63",
          "mutation": "Photodependent (D)"
        },
        {
          "roll": "64",
          "mutation": "Photogeneration*"
        },
        {
          "roll": "65",
          "mutation": "Photosynthetic skin"
        },
        {
          "roll": "66",
          "mutation": "Poison*"
        },
        {
          "roll": "67",
          "mutation": "Poor dual brain (D)"
        },
        {
          "roll": "68",
          "mutation": "Poor respiration (D)"
        },
        {
          "roll": "69",
          "mutation": "Quills or spines"
        },
        {
          "roll": "70-71",
          "mutation": "Radiating eyes*"
        },
        {
          "roll": "72-73",
          "mutation": "Regeneration*"
        },
        {
          "roll": "74",
          "mutation": "Shapechange*"
        },
        {
          "roll": "75-77",
          "mutation": "Size change"
        },
        {
          "roll": "78-79",
          "mutation": "Skeletal enhancement"
        },
        {
          "roll": "80",
          "mutation": "Skin structure change (D)"
        },
        {
          "roll": "81-82",
          "mutation": "Sonar*"
        },
        {
          "roll": "83",
          "mutation": "Sonic blast*"
        },
        {
          "roll": "84",
          "mutation": "Sound imitation"
        },
        {
          "roll": "85-87",
          "mutation": "Transfusion*"
        },
        {
          "roll": "88",
          "mutation": "Ultravision"
        },
        {
          "roll": "89",
          "mutation": "Vocal imitation"
        },
        {
          "roll": "90",
          "mutation": "Wings*"
        },
        {
          "roll": "91-92",
          "mutation": "Roll one plant mutation"
        },
        {
          "roll": "93-95",
          "mutation": "Pick one physical mutation"
        },
        {
          "roll": "96-00",
          "mutation": "Roll two physical mutations"
        }
      ]
    },
    "mentalMutationsTable": {
      "diceType": "d100",
      "entries": [
        {
          "roll": "01",
          "mutation": "Beguiling*"
        },
        {
          "roll": "02-03",
          "mutation": "Confusion*"
        },
        {
          "roll": "04",
          "mutation": "Death field generation*"
        },
        {
          "roll": "05",
          "mutation": "Density control (others)*"
        },
        {
          "roll": "06",
          "mutation": "Devolution*"
        },
        {
          "roll": "07-09",
          "mutation": "Directional sense"
        },
        {
          "roll": "10-13",
          "mutation": "Displacement*"
        },
        {
          "roll": "14-17",
          "mutation": "Duality"
        },
        {
          "roll": "18-21",
          "mutation": "Empathy*"
        },
        {
          "roll": "22",
          "mutation": "Fear generation*"
        },
        {
          "roll": "23-25",
          "mutation": "Force field generation*"
        },
        {
          "roll": "26-30",
          "mutation": "Heightened mental attribute"
        },
        {
          "roll": "31",
          "mutation": "Hostility field (D)"
        },
        {
          "roll": "32",
          "mutation": "Illusion generation*"
        },
        {
          "roll": "33",
          "mutation": "Intuition*"
        },
        {
          "roll": "34-36",
          "mutation": "Levitation*"
        },
        {
          "roll": "37",
          "mutation": "Life leech*"
        },
        {
          "roll": "38",
          "mutation": "Magnetic control*"
        },
        {
          "roll": "39-40",
          "mutation": "Mass mind*"
        },
        {
          "roll": "41-44",
          "mutation": "Mental blast*"
        },
        {
          "roll": "45",
          "mutation": "Mental control*"
        },
        {
          "roll": "46-47",
          "mutation": "Mental invisibility*"
        },
        {
          "roll": "48",
          "mutation": "Mental multiplier*"
        },
        {
          "roll": "49",
          "mutation": "Mental paralysis*"
        },
        {
          "roll": "50",
          "mutation": "Mental reflection*"
        },
        {
          "roll": "51",
          "mutation": "Mentally defenseless (D)"
        },
        {
          "roll": "52",
          "mutation": "Molecular disruption*"
        },
        {
          "roll": "53",
          "mutation": "Periodic amnesia (D)"
        },
        {
          "roll": "54",
          "mutation": "Phobia (D)"
        },
        {
          "roll": "55-56",
          "mutation": "Photokinesis*"
        },
        {
          "roll": "57",
          "mutation": "Plant/animal control*"
        },
        {
          "roll": "58",
          "mutation": "Psychometry*"
        },
        {
          "roll": "59-61",
          "mutation": "Pyro/cryokinesis*"
        },
        {
          "roll": "62",
          "mutation": "Repulsion field*"
        },
        {
          "roll": "63",
          "mutation": "Seizures (D)"
        },
        {
          "roll": "64-65",
          "mutation": "Stunning force*"
        },
        {
          "roll": "66",
          "mutation": "Summoning*"
        },
        {
          "roll": "67",
          "mutation": "Symbiotic attachment*"
        },
        {
          "roll": "68-71",
          "mutation": "Telekinesis*"
        },
        {
          "roll": "72-74",
          "mutation": "Telekinetic hand*"
        },
        {
          "roll": "75-77",
          "mutation": "Telekinetic flight*"
        },
        {
          "roll": "78-81",
          "mutation": "Telepathy*"
        },
        {
          "roll": "82-83",
          "mutation": "Teleport object*"
        },
        {
          "roll": "84-85",
          "mutation": "Teleportation*"
        },
        {
          "roll": "86-87",
          "mutation": "Thought imitation"
        },
        {
          "roll": "88-91",
          "mutation": "Total healing*"
        },
        {
          "roll": "92",
          "mutation": "Will force*"
        },
        {
          "roll": "93-95",
          "mutation": "Pick one mental mutation"
        },
        {
          "roll": "96-00",
          "mutation": "Roll two mental mutations"
        }
      ]
    },
    "plantMutationsTable": {
      "diceType": "d100",
      "note": "Used by Sentient Plant characters for their physical-side mutations.",
      "entries": [
        {
          "roll": "01",
          "mutation": "Achilles heel (D)"
        },
        {
          "roll": "02-04",
          "mutation": "Adaptation"
        },
        {
          "roll": "05",
          "mutation": "Air sail"
        },
        {
          "roll": "06",
          "mutation": "Allergy (D)"
        },
        {
          "roll": "07-08",
          "mutation": "Allurement*"
        },
        {
          "roll": "09-10",
          "mutation": "Anti-life leech"
        },
        {
          "roll": "11",
          "mutation": "Attraction odor (D)"
        },
        {
          "roll": "12",
          "mutation": "Bodily control*"
        },
        {
          "roll": "13-14",
          "mutation": "Carapace*"
        },
        {
          "roll": "15-16",
          "mutation": "Carnivorous jaws*"
        },
        {
          "roll": "17-18",
          "mutation": "Chameleon power*"
        },
        {
          "roll": "19",
          "mutation": "Chemical susceptibility (D)"
        },
        {
          "roll": "20-21",
          "mutation": "Contact poison sap*"
        },
        {
          "roll": "22",
          "mutation": "Density control (self)*"
        },
        {
          "roll": "23-24",
          "mutation": "Dissolving juices*"
        },
        {
          "roll": "25",
          "mutation": "Doubled pain (D)"
        },
        {
          "roll": "26",
          "mutation": "Dual brain"
        },
        {
          "roll": "27",
          "mutation": "Electrical generation*"
        },
        {
          "roll": "28",
          "mutation": "Energy absorption*"
        },
        {
          "roll": "29",
          "mutation": "Energy metamorphosis*"
        },
        {
          "roll": "30",
          "mutation": "Energy reflection*"
        },
        {
          "roll": "31",
          "mutation": "Energy sensitivity (D)"
        },
        {
          "roll": "32-33",
          "mutation": "Explosive seeds*"
        },
        {
          "roll": "34-36",
          "mutation": "Finger vines*"
        },
        {
          "roll": "37-39",
          "mutation": "Fruit*"
        },
        {
          "roll": "40-41",
          "mutation": "Gas bags*"
        },
        {
          "roll": "42",
          "mutation": "Gas generation*"
        },
        {
          "roll": "43-46",
          "mutation": "Heightened physical attribute"
        },
        {
          "roll": "47-48",
          "mutation": "Heightened sense"
        },
        {
          "roll": "49",
          "mutation": "Immunity"
        },
        {
          "roll": "50",
          "mutation": "Infravision"
        },
        {
          "roll": "51",
          "mutation": "Kinetic absorption*"
        },
        {
          "roll": "52-56",
          "mutation": "Multiple limbs"
        },
        {
          "roll": "57-59",
          "mutation": "New body parts"
        },
        {
          "roll": "60-64",
          "mutation": "Oversized limbs"
        },
        {
          "roll": "65",
          "mutation": "Photodependent (D)"
        },
        {
          "roll": "66",
          "mutation": "Photogeneration*"
        },
        {
          "roll": "67-68",
          "mutation": "Poison*"
        },
        {
          "roll": "69-70",
          "mutation": "Poisonous thorns*"
        },
        {
          "roll": "71",
          "mutation": "Poor dual brain (D)"
        },
        {
          "roll": "72-73",
          "mutation": "Projectile seeds*"
        },
        {
          "roll": "74-75",
          "mutation": "Razor edged leaves"
        },
        {
          "roll": "76-77",
          "mutation": "Regeneration*"
        },
        {
          "roll": "78",
          "mutation": "Shapechange*"
        },
        {
          "roll": "79",
          "mutation": "Size change"
        },
        {
          "roll": "80",
          "mutation": "Sonar*"
        },
        {
          "roll": "81",
          "mutation": "Sonic blast*"
        },
        {
          "roll": "82",
          "mutation": "Spore cloud*"
        },
        {
          "roll": "83-85",
          "mutation": "Squeeze vines*"
        },
        {
          "roll": "86",
          "mutation": "Thorns or spikes"
        },
        {
          "roll": "87",
          "mutation": "Transfusion*"
        },
        {
          "roll": "88-89",
          "mutation": "Ultravision"
        },
        {
          "roll": "90",
          "mutation": "Vocal imitation"
        },
        {
          "roll": "91-92",
          "mutation": "Roll one physical mutation"
        },
        {
          "roll": "93-95",
          "mutation": "Pick one plant mutation"
        },
        {
          "roll": "96-00",
          "mutation": "Roll two plant mutations"
        }
      ]
    }
  },
  "characterClasses": {
    "enforcer": {
      "displayName": "Enforcer",
      "concept": "Warrior class, dedicated to mastering body and skills of war; protects the party and defeats threats with skill at arms.",
      "startingBonuses": [
        "Initial +1 THAC (both melee and ranged)",
        "+CN hit points (bonus hit points equal to CN modifier)"
      ],
      "perLevelAdvancement": [
        "+1 THAC bonus (to both melee and ranged THAC)",
        "+1 on all physical mutation power scores",
        "CN bonus to hit points (negative bonuses ignored), in addition to normal 1d6 increase"
      ],
      "skillPoints": 12,
      "skills": {
        "list": [
          "Combat Leadership",
          "Makeshift Weapon/Armor",
          "Size-Up Opponent"
        ],
        "details": {
          "Combat Leadership": "Lead a group of NPCs in a stressful combat situation. NPCs must be noncombatants or no more than half the enforcer's level. One check per group per battle. Can lead 3 people per level.",
          "Makeshift Weapon/Armor": "Create a functional weapon/armor from non-weapon materials; on success it works as its nearest equivalent from the equipment tables; on failure it does half damage / falls apart.",
          "Size-Up Opponent": "Determine roughly how tough an opponent is (AC, THAC, and damage potential) via GM description rather than numbers. Does not reveal mental attacks/poison/hidden powers. Usable once per person until next level gained."
        }
      }
    },
    "esper": {
      "displayName": "Esper",
      "concept": "Master of mental discipline; the realm of the mind is his battlefield.",
      "requirements": [
        "Must have at least one mental mutation with a power score"
      ],
      "startingBonuses": [
        "Initial +1 MD"
      ],
      "perLevelAdvancement": [
        "+1 MD bonus",
        "+1 bonus on all mental mutation power scores"
      ],
      "skillPoints": 16,
      "skills": {
        "list": [
          "Hypnosis",
          "Identify Mental Power",
          "Photographic Memory",
          "Sense Mental Powers"
        ],
        "details": {
          "Hypnosis": "Same mechanic as Photographic Memory but used on other willing, sentient, living characters; can retrieve lost memories or verify truthfulness. Hypnotized characters cannot lie (unless faking hypnosis). Takes at least 10 minutes.",
          "Identify Mental Power": "By analyzing clues, identify the exact mutational power that caused an effect. Only works on successful mental attacks (need enough info); doesn't have to have affected the esper personally.",
          "Photographic Memory": "Recall specific past events/details in full clarity on a successful roll.",
          "Sense Mental Powers": "Detect the presence of unusual (mutant) mental powers in a living creature by spending a round looking/concentrating. Once per month per character/creature TYPE (genetically stable races like hoops/sleeths only need one roll per race per month)."
        }
      }
    },
    "examiner": {
      "displayName": "Examiner",
      "concept": "Most prized class for deciphering the uses of ancient artifacts; scholars of the old world's technology.",
      "requirements": [
        "Must come from at least a Tech III culture"
      ],
      "startingBonuses": [
        "Starts the game with a Tech IV item, rolled from the loot tables (weapons assumed to have 4d6 rounds of ammo; powered items include a chemical power cell). Resolve via gw4e_equipment.json: techLevelArtifactTables.techIV (roll d20; a 15-20 result sends you to its nested armorAndWeaponsSubtable for a specific weapon/armor item instead of a general artifact).",
        "Initial +1 to Use Artifacts and Robot Recognition"
      ],
      "perLevelAdvancement": [
        "+1 bonus to Use Artifacts"
      ],
      "skillPoints": 16,
      "skills": {
        "list": [
          "Avoid Artifact Disaster",
          "Jury-Rig",
          "Read Schematics",
          "Repair Artifact"
        ],
        "details": {
          "Avoid Artifact Disaster": "On a Dangerous Event or Artifact Breaks result when examining artifacts, roll this skill (secretly, by the GM) to avoid the disaster and reroll on the chart. Cannot be used to avoid False Function, Assumed Useless, or Assumed Broken results.",
          "Jury-Rig": "Create improvised devices from parts/scraps, up to Tech IV items. Max complexity handleable = 20 + Jury-Rig rating. GM determines feasibility given available materials/time.",
          "Read Schematics": "Read/interpret the arcane symbology of the ancients found on schematics, blueprints, control panels, signage, etc. One roll per symbol/piece of information sought.",
          "Repair Artifact": "Repair a fully-understood, successfully-examined artifact. Requires at least 1 day of ownership/tinkering per point of complexity. Difficulty = base difficulty (from artifact Condition) + modifiers for Complexity and Tech Level (see repairDifficultyTables below)."
        }
      },
      "repairDifficultyTables": {
        "baseDifficultyByCondition": {
          "columns": [
            "difficulty",
            "label",
            "artifactCondition"
          ],
          "rows": [
            {
              "difficulty": 0,
              "label": "Easy",
              "artifactCondition": "Minor repair necessary"
            },
            {
              "difficulty": 5,
              "label": "Challenging",
              "artifactCondition": "Significant repair necessary"
            },
            {
              "difficulty": 10,
              "label": "Tough",
              "artifactCondition": "Major repair necessary"
            },
            {
              "difficulty": 15,
              "label": "Nearly impossible",
              "artifactCondition": "Vital components are missing"
            }
          ]
        },
        "complexityModifier": {
          "columns": [
            "artifactComplexity",
            "difficultyModifier"
          ],
          "rows": [
            {
              "artifactComplexity": "1-5",
              "difficultyModifier": 0
            },
            {
              "artifactComplexity": "6-10",
              "difficultyModifier": 1
            },
            {
              "artifactComplexity": "11-15",
              "difficultyModifier": 2
            },
            {
              "artifactComplexity": "16-20",
              "difficultyModifier": 3
            },
            {
              "artifactComplexity": "21-25, etc.",
              "difficultyModifier": "+4, etc."
            }
          ]
        },
        "techLevelModifier": {
          "columns": [
            "artifactTechLevel",
            "difficultyModifier"
          ],
          "rows": [
            {
              "artifactTechLevel": "Tech Level <= III",
              "difficultyModifier": 0
            },
            {
              "artifactTechLevel": "Tech Level IV",
              "difficultyModifier": 1
            },
            {
              "artifactTechLevel": "Tech Level V",
              "difficultyModifier": 3
            },
            {
              "artifactTechLevel": "Tech Level VI",
              "difficultyModifier": 5
            }
          ]
        }
      }
    },
    "scout": {
      "displayName": "Scout",
      "concept": "At home in the wilderness; guides the party, provides shelter and food away from civilization.",
      "startingBonuses": [
        "Initial +1 Perception, Stealth and Remain Unseen"
      ],
      "perLevelAdvancement": [
        "+1 bonus to Perception, Stealth and Remain Unseen",
        "Each level advanced, can place 1 point on any derived attribute, mutation power, or class skill (instead of the general 'one point every EVEN level' rule other classes use - the scout gets this benefit every level, not just even ones; NOTE: scout does not additionally get the standard 2-points-on-even-levels rule)"
      ],
      "skillPoints": 20,
      "skills": {
        "list": [
          "Detect Ambush/Trap",
          "Hunting",
          "Navigate",
          "Tracking",
          "Wilderness Survival"
        ],
        "details": {
          "Detect Ambush/Trap": "Identify a potential ambush or trap situation in the wilderness on success. Does not detect the absence of one.",
          "Hunting": "Find enough food/water for 5 people for a day on success; takes 1-4 hours. Also used to identify edible plants/animals.",
          "Navigate": "Tell direction and identify distance to major landmarks. Roll needed whenever losing sight of an important landmark or facing a choice of directions. Max once per 3 hours, usually once/day.",
          "Tracking": "Track creatures in natural terrain only (not in towns/villages). Works in abandoned urban/man-made environments where signs remain fresh/undisturbed. Adverse conditions (rain, crossed trails, age) increase difficulty. Roll once an hour to see if the trail is lost.",
          "Wilderness Survival": "Find adequate shelter, avoid environmental hazards (floods, forest fires, avalanches, etc.)."
        }
      }
    }
  },
  "commonSkillsByClass": {
    "description": "Percent chance a character of each class innately knows these everyday skills (read/write, swim, ride). Can also be learned in play from another character/NPC at GM's discretion.",
    "columns": [
      "characterClass",
      "readWrite",
      "swim",
      "ride"
    ],
    "rows": [
      {
        "characterClass": "Enforcer",
        "readWrite": "10%",
        "swim": "50%",
        "ride": "100%"
      },
      {
        "characterClass": "Esper",
        "readWrite": "50%",
        "swim": "25%",
        "ride": "10%"
      },
      {
        "characterClass": "Examiner",
        "readWrite": "100%",
        "swim": "10%",
        "ride": "25%"
      },
      {
        "characterClass": "Scout",
        "readWrite": "25%",
        "swim": "100%",
        "ride": "50%"
      }
    ]
  },
  "derivedAttributes": {
    "description": "Secondary stats computed from primary attribute modifiers. AD&D-like function names given in the book for reference (THAC/THAC0, AC, etc.) - GAMMA WORLD uses ascending values where bigger is better, unlike AD&D THAC0.",
    "formulas": {
      "THAC_melee": "PS modifier (base combat skill to hit in melee; 0 = average 1st-level score)",
      "THAC_ranged": "DX modifier (base combat skill to hit at range)",
      "AC": "10 + DX modifier (Armor Class; higher is better in this game, unlike AD&D's AC; AC0 unprotected human = AC20 in AD&D terms per book's own comparison)",
      "MHAC": "Each mental mutation with a power score has its OWN separate MHAC value, equal to that mutation's power score (MP) modifier - NOT a single character-wide score, and NOT directly derived from MS. Used exactly like THAC (0 = average for a first-level mutation's power score, bigger is better). p.24.",
      "MD": "10 + MS modifier (mental defense value used same way as THAC, for using mental mutations)",
      "hitPoints": "(CN) d6 -- roll 1d6 per point of Constitution; NOTE: the CN attribute MODIFIER is not used for hit points, only the raw CN score as number of d6 rolled",
      "health": "10 + CN modifier (resistance to poison/radiation/disease; equivalent to a saving throw; 10 = average 1st-level score)",
      "useArtifacts": "IN modifier (ability to figure out how an artifact works; 0 = average 1st level)",
      "perception": "SN score + IN modifier (ability to notice something without actively looking for it; 10 = average 1st level)",
      "stealth": "DX modifier (ability to move quietly/not be discovered; 0 = average 1st level)",
      "remainUnseen": "IN modifier (ability to hide/stay undetected; 0 = average 1st level)",
      "speed": "Base speed (by genotype/animal stock) +/- DX modifier",
      "robotRecognition": "20 +/- Robot Recognition modifiers (base score is a flat 20; altered humans -2, mutated animals -6 [or -8 with no humanoid traits], further mutation-based penalties may apply; this is the character's ability to be recognized as human by robots/computers, NOT a percentage chance to recognize robots). SPECIAL CASE: Sentient Plants are never recognized as human by robots, regardless of modifiers (p.24) - the formula does not apply to this genotype; treat as a fixed 'never recognized' state."
    }
  },
  "techLevel": {
    "description": "The Game Master determines the starting town/locale, which sets the campaign's starting tech level. Most Gamma Terra towns are Tech Level III. Characters generally should not be from a tech level higher than their starting town (max Tech Level III unless GM sets a higher campaign ceiling). Artifact use and equipment purchase rules assume Tech III characters with ready access to Tech III items."
  },
  "crypticAlliance": {
    "description": "Optional at character creation and any later point in the game. Never required. A character can never belong to more than one cryptic alliance at the same time.",
    "tradeoffs": "Alliance gives advantages (often artifacts or information) but demands loyalty to the alliance's aims/likes/dislikes; shirking duty can lead to expulsion or harsher penalties.",
    "fullDetailsLocation": "Full write-ups of each specific cryptic alliance are in the dedicated 'Cryptic Alliances' chapter (pp. 127-139) - not yet extracted into this datasheet."
  },
  "startingEquipment": {
    "description": "GM determines how much starting money characters have; depends on the local economy/region and any sponsoring agency (e.g., a faction funding the party might grant free Tech III items instead of cash).",
    "suggestedFormula": "250 + (1d10 x 10) domars (the setting's currency) as a rule-of-thumb starting amount.",
    "usageNote": "With a typical roll, characters can afford armor, weapons and some reasonable supplies; buying mounts and lots of supplies may mean forgoing extra weapons/best armor.",
    "fullTablesLocation": "See gw4e_equipment.json for the full Common Equipment/Weapons/Armor price tables to spend domars on, plus the Loot Table mechanism and Tech III-VI Artifact tables (the Examiner class's starting Tech IV item is resolved using techLevelArtifactTables.techIV in that file)."
  },
  "levelAdvancement": {
    "rulesPerLevel": [
      "+1d6 hit points each level",
      "+1 point to each of the character's class skills each level",
      "Every EVEN level attained (2, 4, 6...), +1 point to place on any mutation power score, class skill, or derived attribute (not raw attributes like PS/IN/etc.) - see eligibleDerivedAttributes below",
      "Some genotypes and character classes grant additional bonuses every level (see genotype/class bonus lists elsewhere in this datasheet)"
    ],
    "eligibleDerivedAttributesForLevelPoints": [
      "THAC melee",
      "THAC ranged",
      "AC",
      "Health",
      "special Health score",
      "MD",
      "Use Artifacts",
      "Robot Recognition",
      "Perception",
      "Stealth",
      "Remain Unseen",
      "Hit Points"
    ],
    "excludedFromLevelPoints": [
      "damage",
      "speed"
    ],
    "scoutException": "The Scout class's even-level bonus procedure is slightly different (see Scout class description - scout gets a free point every level, not just even levels, but does not get the extra even-level point on top of that).",
    "experiencePointsPerLevel": {
      "columns": [
        "level",
        "experiencePoints"
      ],
      "rows": [
        {
          "level": 1,
          "experiencePoints": 2000
        },
        {
          "level": 2,
          "experiencePoints": 4000
        },
        {
          "level": 3,
          "experiencePoints": 8000
        },
        {
          "level": 4,
          "experiencePoints": 16000
        },
        {
          "level": 5,
          "experiencePoints": 32000
        },
        {
          "level": 6,
          "experiencePoints": 64000
        },
        {
          "level": 7,
          "experiencePoints": 125000
        },
        {
          "level": 8,
          "experiencePoints": 250000
        },
        {
          "level": 9,
          "experiencePoints": 500000
        },
        {
          "level": "10+",
          "experiencePoints": "+250,000 ca. per additional level"
        }
      ]
    }
  }
};
})(typeof window !== 'undefined' ? window : global);
