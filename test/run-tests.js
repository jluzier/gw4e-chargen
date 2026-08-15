// Node test harness for the GW4E engine (no browser needed).
// 1) Replays the exact dice sequence behind SAMPLE-honeyscar_voidmend.md via a
//    scripted RNG and asserts the engine reproduces every golden value.
// 2) Generates a handful of fresh random characters across genotype/class
//    combos and prints full sheets + roll logs for manual spot-checking.

require('../data/generation.js');
require('../data/mutationEffects.js');
require('../data/equipment.js');
require('../data/sheetTemplate.js');
require('../engine.js');

const GW4E = global.GW4E;

let failures = 0;
function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    failures++;
    console.error(`FAIL: ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok   ${label} = ${JSON.stringify(actual)}`);
  }
}

// --- Scripted RNG -----------------------------------------------------
// Queue of face values consumed in call order; each call to rng() pops the
// next {sides, value} pair and returns a float that rollDie(sides,...) will
// map back to `value`.
function makeScriptedRng(queue) {
  let i = 0;
  return function () {
    if (i >= queue.length) throw new Error('Scripted RNG exhausted at call ' + i);
    const { sides, value } = queue[i++];
    return (value - 1 + 0.5) / sides;
  };
}

function d6(v) { return { sides: 6, value: v }; }
function d3(v) { return { sides: 3, value: v }; }
function d10(v) { return { sides: 10, value: v }; }
function d100(v) { return { sides: 100, value: v }; }

console.log('=== Replaying golden sample: Honeyscar Voidmend (Altered Human Examiner) ===');
console.log('NOTE: SAMPLE-honeyscar_voidmend.md records mental roll 87 -> "Total healing*", but');
console.log('gw4e_character_generation.json currently maps d100 86-87 -> "Thought imitation" and');
console.log('88-91 -> "Total healing*". The JSON is treated as ground truth, so this replay uses');
console.log('roll 90 instead of 87 to land on Total healing* and reproduce the same downstream math.\n');

const queue = [
  // PS 4d6-L [4,2,2,4]
  d6(4), d6(2), d6(2), d6(4),
  // DX 4d6-L [5,4,2,1]
  d6(5), d6(4), d6(2), d6(1),
  // CN 4d6-L [1,3,6,3] (altered human, min 8 - result 12, no floor needed)
  d6(1), d6(3), d6(6), d6(3),
  // MS 4d6-L [5,1,4,4]
  d6(5), d6(1), d6(4), d6(4),
  // IN 4d6-L [5,3,6,6]
  d6(5), d6(3), d6(6), d6(6),
  // CH 4d6-L [3,6,4,2]
  d6(3), d6(6), d6(4), d6(2),
  // SN 3d6 [6,5,3]
  d6(6), d6(5), d6(3),
  // mutation count d6 = 2
  d6(2),
  // physical #1: d100=37 -> Heightened physical attribute
  d100(37),
  // heightened-attribute d3 pick = 3 -> CN
  d3(3),
  // physical #2: d100=05 -> Attraction odor (D)
  d100(5),
  // mental #1: d100=47 -> Mental invisibility*
  d100(47),
  // MP roll [1,3,4,4] drop 1 -> 11
  d6(1), d6(3), d6(4), d6(4),
  // mental #2: d100=90 -> Total healing* (NOTE: sample transcript said roll 87,
  // but current ground-truth JSON maps 86-87 to "Thought imitation" and 88-91
  // to "Total healing*" - using 90 here to replay the same mechanics against
  // the current data; see discrepancy note printed below)
  d100(90),
  // MP roll [2,3,2,4] drop 2 -> 9
  d6(2), d6(3), d6(2), d6(4),
  // mental #3: d100=90 -> Total healing* again (duplicate, kept)
  d100(90),
  // duplicate bonus 2d4 [3,3] -> 6
  { sides: 4, value: 3 }, { sides: 4, value: 3 },
  // hit points 18d6 (CN boosted to 18)
  d6(3), d6(4), d6(3), d6(3), d6(1), d6(6), d6(6), d6(1), d6(3), d6(1), d6(3), d6(3), d6(3), d6(6), d6(4), d6(6), d6(2), d6(6),
  // starting domars 1d10 = 8
  d10(8),
];

const rng = makeScriptedRng(queue);
const log = new GW4E.RollLog();

const character = {
  genotype: 'alteredHuman',
  baseStock: null,
  characterClass: 'examiner',
  mutations: [],
  defectCounts: { physical: 0, mental: 0 },
  tookAnyHumanoidTrait: false,
  tookHumanoidBipedal: false,
};

character.attributes = GW4E.generateAttributes(character, rng, log);

assertEqual(character.attributes.PS.score, 10, 'PS score');
assertEqual(character.attributes.DX.score, 11, 'DX score');
assertEqual(character.attributes.CN.score, 12, 'CN score (pre-mutation)');
assertEqual(character.attributes.MS.score, 13, 'MS score');
assertEqual(character.attributes.IN.score, 17, 'IN score');
assertEqual(character.attributes.CH.score, 13, 'CH score');
assertEqual(character.attributes.SN.score, 14, 'SN score');

const mutCount = GW4E.mutationCountByD6(rng, log);
assertEqual(mutCount.physical, 2, 'physical mutation count');
assertEqual(mutCount.mental, 3, 'mental mutation count');

// Physical #1: Heightened physical attribute
let r = GW4E.rollMutationName('physical', character, rng, log);
assertEqual(r.name, 'Heightened physical attribute', 'physical mutation #1 name');
GW4E.addMutationToCharacter(character, r.name, r.sourceTable, r.defectBucket, rng, log);
const heightened = GW4E.applyHeightenedAttribute(character, true, rng, log);
assertEqual(heightened.attr, 'CN', 'heightened attribute target');
assertEqual(character.attributes.CN.score, 18, 'CN score after heightened boost');

// Physical #2: Attraction odor (D)
r = GW4E.rollMutationName('physical', character, rng, log);
assertEqual(r.name, 'Attraction odor (D)', 'physical mutation #2 name');
GW4E.addMutationToCharacter(character, r.name, r.sourceTable, r.defectBucket, rng, log);

// Mental #1: Mental invisibility*
r = GW4E.rollMutationName('mental', character, rng, log);
assertEqual(r.name, 'Mental invisibility*', 'mental mutation #1 name');
let rec1 = GW4E.addMutationToCharacter(character, r.name, r.sourceTable, r.defectBucket, rng, log);
assertEqual(rec1.powerScore, 11, 'Mental invisibility power score');

// Mental #2: Total healing*
r = GW4E.rollMutationName('mental', character, rng, log);
assertEqual(r.name, 'Total healing*', 'mental mutation #2 name');
let rec2 = GW4E.addMutationToCharacter(character, r.name, r.sourceTable, r.defectBucket, rng, log);
assertEqual(rec2.powerScore, 9, 'Total healing power score (pre-duplicate)');

// Mental #3: Total healing* again -> duplicate, kept
r = GW4E.rollMutationName('mental', character, rng, log);
assertEqual(r.name, 'Total healing*', 'mental mutation #3 name (duplicate roll)');
const dup = GW4E.checkDuplicate(character, r.name);
if (!dup) { failures++; console.error('FAIL: expected duplicate to be found for Total healing*'); }
GW4E.applyDuplicateKeep(character, dup, rng, log);
assertEqual(dup.powerScore, 15, 'Total healing power score after duplicate keep');
assertEqual(character.mutations.length, 4, 'total distinct mutation records (2 physical + 2 mental)');

character.characterClass = 'examiner';
const derived = GW4E.calculateDerivedAttributes(character, rng, log);

assertEqual(derived.thacMelee, 0, 'THAC melee');
assertEqual(derived.thacRanged, 0, 'THAC ranged');
assertEqual(derived.ac, 10, 'AC');
assertEqual(derived.md, 11, 'MD');
assertEqual(derived.health, 13, 'Health');
assertEqual(derived.useArtifacts, 4, 'Use Artifacts');
assertEqual(derived.perception, 17, 'Perception');
assertEqual(derived.stealth, 0, 'Stealth');
assertEqual(derived.remainUnseen, 3, 'Remain Unseen');
assertEqual(derived.damageBonus, 0, 'Damage Bonus');
assertEqual(derived.maxLiftShortKg, 100, 'Max Lift short (kg)');
assertEqual(derived.maxLiftLongKg, 50, 'Max Lift long (kg)');
assertEqual(derived.speed.walk, 12, 'Speed walk');
assertEqual(derived.speed.trotX2, 24, 'Speed trot x2');
assertEqual(derived.speed.runX3, 36, 'Speed run x3');
assertEqual(derived.speed.swim, 3, 'Speed swim');
assertEqual(derived.robotRecognition.value, 19, 'Robot Recognition');
assertEqual(derived.hitPoints, 64, 'Hit points');
assertEqual(derived.domars, 330, 'Domars');

console.log('\n--- Full roll log ---');
for (const e of log.entries) console.log(`  ${e.label}: ${e.detail}`);

console.log('\n=== Golden sample replay: ' + (failures === 0 ? 'ALL PASS' : failures + ' FAILURE(S)') + ' ===\n');

// --- Fresh random test characters for spot-checking --------------------

function generateRandomCharacter(genotypeKey, classKey, baseStockName) {
  const rng2 = Math.random;
  const log2 = new GW4E.RollLog();
  const ch = {
    genotype: genotypeKey,
    baseStock: baseStockName || null,
    characterClass: classKey,
    mutations: [],
    defectCounts: { physical: 0, mental: 0 },
    tookAnyHumanoidTrait: true,
    tookHumanoidBipedal: false,
  };
  ch.attributes = GW4E.generateAttributes(ch, rng2, log2);

  if (genotypeKey !== 'pureStrainHuman') {
    const counts = GW4E.mutationCountByD6(rng2, log2);
    const rollSlot = (tableKey, isPhysicalBucket) => {
      let res = GW4E.rollMutationName(tableKey, ch, rng2, log2);
      while (res.pending === 'pick') {
        const entries = GW4E.getMutationTable(res.table);
        const choice = entries[Math.floor(Math.random() * entries.length)].mutation;
        res = { name: choice, sourceTable: res.table, defectBucket: res.table === 'mental' ? 'mental' : 'physical' };
      }
      if (res.pending === 'multi') {
        res = res.results[0]; // simplification for spot-check generation
      }
      const existing = GW4E.checkDuplicate(ch, res.name);
      if (existing) {
        GW4E.applyDuplicateKeep(ch, existing, rng2, log2);
      } else {
        GW4E.addMutationToCharacter(ch, res.name, res.sourceTable, res.defectBucket, rng2, log2);
        if (res.name === 'Heightened physical attribute') GW4E.applyHeightenedAttribute(ch, true, rng2, log2);
        if (res.name === 'Heightened mental attribute') GW4E.applyHeightenedAttribute(ch, false, rng2, log2);
      }
    };
    const physTable = genotypeKey === 'sentientPlant' ? 'plant' : 'physical';
    for (let i = 0; i < counts.physical; i++) rollSlot(physTable);
    for (let i = 0; i < counts.mental; i++) rollSlot('mental');
  }

  const derived = GW4E.calculateDerivedAttributes(ch, rng2, log2);
  return { character: ch, derived, log: log2 };
}

const scenarios = [
  ['pureStrainHuman', 'enforcer', null],
  ['mutatedAnimal', 'scout', 'Wolf'],
  ['sentientPlant', 'esper', 'Vine'],
];

for (const [genotype, classKey, stock] of scenarios) {
  console.log(`\n=== Fresh test character: ${genotype} / ${classKey}${stock ? ' / ' + stock : ''} ===`);
  const { character: ch, derived, log: log2 } = generateRandomCharacter(genotype, classKey, stock);
  console.log('Attributes:', Object.fromEntries(GW4E.ATTR_ORDER.map((k) => [k, `${ch.attributes[k].score} (${GW4E.formatModifier(ch.attributes[k].modifier)})`])));
  console.log('Mutations:', ch.mutations.map((m) => `${m.name}${m.powerScore !== null ? ' [MP ' + m.powerScore + ']' : ''}`));
  console.log('Derived:', {
    thacMelee: derived.thacMelee,
    thacRanged: derived.thacRanged,
    ac: derived.ac,
    md: derived.md,
    health: derived.health,
    hitPoints: derived.hitPoints,
    robotRecognition: derived.robotRecognition,
    speed: derived.speed,
    domars: derived.domars,
  });
}

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed.`);
  process.exit(1);
}
