// Gamma World 4E character generation engine — pure logic, no DOM.
// Consumes the GW4E_GENERATION / GW4E_MUTATION_EFFECTS / GW4E_EQUIPMENT /
// GW4E_SHEET_TEMPLATE / GW4E_CRYPTIC_ALLIANCES globals defined in data/*.js.
// Runs identically in a browser <script> or under Node (via vm).

(function (root) {
  'use strict';

  const GEN = root.GW4E_GENERATION;
  const MUT_FX = root.GW4E_MUTATION_EFFECTS;
  const ALLIANCES = root.GW4E_CRYPTIC_ALLIANCES;

  // ---------------------------------------------------------------------
  // Dice
  // ---------------------------------------------------------------------

  function rollDie(sides, rng) {
    return 1 + Math.floor(rng() * sides);
  }

  function rollNdX(n, sides, rng) {
    const rolls = [];
    for (let i = 0; i < n; i++) rolls.push(rollDie(sides, rng));
    return rolls;
  }

  // 4d6-L: roll four d6, drop the single lowest, sum the rest.
  function roll4d6DropLowest(rng) {
    const rolls = rollNdX(4, 6, rng);
    const sorted = rolls.slice().sort((a, b) => a - b);
    const dropped = sorted[0];
    const kept = sorted.slice(1);
    const total = kept.reduce((a, b) => a + b, 0);
    return {
      formula: '4d6-L',
      rolls,
      dropped,
      kept,
      total,
      describe() {
        return `4d6-L = [${rolls.join(',')}], drop the ${dropped} → ${total}`;
      },
    };
  }

  function roll3d6(rng) {
    const rolls = rollNdX(3, 6, rng);
    const total = rolls.reduce((a, b) => a + b, 0);
    return {
      formula: '3d6',
      rolls,
      total,
      describe() {
        return `3d6 = [${rolls.join(',')}] → ${total}`;
      },
    };
  }

  function roll2d4(rng) {
    const rolls = rollNdX(2, 4, rng);
    const total = rolls.reduce((a, b) => a + b, 0);
    return {
      formula: '2d4',
      rolls,
      total,
      describe() {
        return `2d4 = [${rolls.join(',')}] → ${total}`;
      },
    };
  }

  function rollNdSum(n, sides, rng, label) {
    const rolls = rollNdX(n, sides, rng);
    const total = rolls.reduce((a, b) => a + b, 0);
    return {
      formula: label || `${n}d${sides}`,
      rolls,
      total,
      describe() {
        return `${label || `${n}d${sides}`} = [${rolls.join(',')}] → ${total}`;
      },
    };
  }

  function rollD100(rng) {
    const v = rollDie(100, rng);
    return v; // 1-100, where 100 represents "00"
  }

  function rollD20(rng) {
    return rollDie(20, rng);
  }

  function rollD10(rng) {
    return rollDie(10, rng);
  }

  function rollD6(rng) {
    return rollDie(6, rng);
  }

  function rollD3(rng) {
    return rollDie(3, rng);
  }

  // ---------------------------------------------------------------------
  // Roll log
  // ---------------------------------------------------------------------

  class RollLog {
    constructor() {
      this.entries = [];
    }
    add(label, detail) {
      this.entries.push({ label, detail: detail || '' });
      return this;
    }
    addRoll(label, rollResult) {
      this.entries.push({ label, detail: rollResult.describe() });
      return this;
    }
  }

  // ---------------------------------------------------------------------
  // Attribute modifiers
  // ---------------------------------------------------------------------

  function parseScoreRange(rangeStr) {
    const parts = String(rangeStr).split('-').map((s) => s.trim());
    if (parts.length === 1) {
      const v = parseInt(parts[0], 10);
      return [v, v];
    }
    return [parseInt(parts[0], 10), parseInt(parts[1], 10)];
  }

  function attributeModifier(score) {
    const table = GEN.attributeGeneration.attributeModifiersTable.rows;
    if (score < 1) score = 1;
    for (const row of table) {
      const [min, max] = parseScoreRange(row.scoreRange);
      if (score >= min && score <= max) return row.modifier;
    }
    // extensionRule: beyond the table's last row, every additional pair of
    // scores adds +1 more modifier point.
    const lastRow = table[table.length - 1];
    const [, lastMax] = parseScoreRange(lastRow.scoreRange);
    const lastMod = lastRow.modifier;
    const stepsBeyond = Math.ceil((score - lastMax) / 2);
    return lastMod + stepsBeyond;
  }

  function formatModifier(mod) {
    if (mod > 0) return `+${mod}`;
    return String(mod);
  }

  // ---------------------------------------------------------------------
  // Genotype / base stock lookups
  // ---------------------------------------------------------------------

  function getGenotypeKeys() {
    return Object.keys(GEN.genotypes);
  }

  function getGenotype(key) {
    return GEN.genotypes[key];
  }

  function getBaseAnimalStock(name) {
    return GEN.genotypes.mutatedAnimal.baseAnimalStockList.entries.find((e) => e.name === name);
  }

  function getBasePlantStock(name) {
    return GEN.genotypes.sentientPlant.basePlantStockList.entries.find((e) => e.name === name);
  }

  // Best-effort parse of the free-text "notes" field on base animal stock
  // entries into speed numbers, e.g. "Base speed 15 (10 bipedal), 8 in water."
  function parseAnimalSpeeds(notes) {
    const result = { walking: null, bipedal: null, swim: null, fly: null };
    if (!notes) return result;
    let m = notes.match(/Base speed (\d+)(?:\s*\((\d+)\s*bipedal\))?/i);
    if (m) {
      result.walking = parseInt(m[1], 10);
      if (m[2]) result.bipedal = parseInt(m[2], 10);
    }
    m = notes.match(/swims? at (\d+)/i);
    if (m) result.swim = parseInt(m[1], 10);
    m = notes.match(/flying base speed (\d+)/i);
    if (m) result.fly = parseInt(m[1], 10);
    return result;
  }

  // ---------------------------------------------------------------------
  // Step 2: attribute generation
  // ---------------------------------------------------------------------

  const ATTR_ORDER = ['PS', 'DX', 'CN', 'MS', 'IN', 'CH', 'SN'];

  function generateAttributes(character, rng, log) {
    const genotypeKey = character.genotype;
    const attrs = {};

    if (genotypeKey === 'mutatedAnimal') {
      const stock = getBaseAnimalStock(character.baseStock);
      for (const attr of ['PS', 'DX', 'CN']) {
        const r = roll2d4(rng);
        const stockVal = stock[attr];
        const total = r.total + stockVal;
        log.add(`${attr} (2d4 + ${attr}[stock ${stockVal}])`, `${r.describe()}, +${stockVal} (stock) → ${total}`);
        attrs[attr] = { score: total, rolls: r.rolls, formula: `2d4+${stockVal}` };
      }
      for (const attr of ['MS', 'IN', 'CH']) {
        const r = roll3d6(rng);
        log.addRoll(attr, r);
        attrs[attr] = { score: r.total, rolls: r.rolls, formula: '3d6' };
      }
      const snRoll = roll4d6DropLowest(rng);
      log.addRoll('SN', snRoll);
      attrs.SN = { score: snRoll.total, rolls: snRoll.rolls, formula: '4d6-L' };
    } else if (genotypeKey === 'sentientPlant') {
      for (const attr of ['PS', 'DX', 'MS', 'IN', 'CH']) {
        const r = roll3d6(rng);
        log.addRoll(attr, r);
        attrs[attr] = { score: r.total, rolls: r.rolls, formula: '3d6' };
      }
      const cnRoll = roll3d6(rng);
      const cnTotal = cnRoll.total + 2;
      log.add('CN (3d6 +2 sentient plant bonus)', `${cnRoll.describe()}, +2 → ${cnTotal}`);
      attrs.CN = { score: cnTotal, rolls: cnRoll.rolls, formula: '3d6+2' };
      const snRoll = roll4d6DropLowest(rng);
      log.addRoll('SN', snRoll);
      attrs.SN = { score: snRoll.total, rolls: snRoll.rolls, formula: '4d6-L' };
    } else {
      // pureStrainHuman / alteredHuman
      const isPSH = genotypeKey === 'pureStrainHuman';
      for (const attr of ['PS', 'DX']) {
        const r = roll4d6DropLowest(rng);
        log.addRoll(attr, r);
        attrs[attr] = { score: r.total, rolls: r.rolls, formula: '4d6-L' };
      }
      const cnRoll = roll4d6DropLowest(rng);
      if (isPSH) {
        const total = cnRoll.total + 3;
        log.add('CN (4d6-L +3 PSH bonus)', `${cnRoll.describe()}, +3 → ${total}`);
        attrs.CN = { score: total, rolls: cnRoll.rolls, formula: '4d6-L+3' };
      } else {
        let total = cnRoll.total;
        let note = cnRoll.describe();
        if (total < 8) {
          note += ' (below minimum 8, raised to 8)';
          total = 8;
        }
        log.add('CN (4d6-L, min 8 for Altered Human)', note);
        attrs.CN = { score: total, rolls: cnRoll.rolls, formula: '4d6-L*(min 8)' };
      }
      const msRoll = roll4d6DropLowest(rng);
      log.addRoll('MS', msRoll);
      attrs.MS = { score: msRoll.total, rolls: msRoll.rolls, formula: '4d6-L' };
      for (const attr of ['IN', 'CH']) {
        const r = roll4d6DropLowest(rng);
        if (isPSH) {
          const total = r.total + 3;
          log.add(`${attr} (4d6-L +3 PSH bonus)`, `${r.describe()}, +3 → ${total}`);
          attrs[attr] = { score: total, rolls: r.rolls, formula: '4d6-L+3' };
        } else {
          log.addRoll(attr, r);
          attrs[attr] = { score: r.total, rolls: r.rolls, formula: '4d6-L' };
        }
      }
      const snRoll = roll3d6(rng);
      log.addRoll('SN', snRoll);
      attrs.SN = { score: snRoll.total, rolls: snRoll.rolls, formula: '3d6' };
    }

    for (const attr of ATTR_ORDER) {
      attrs[attr].modifier = attributeModifier(attrs[attr].score);
    }
    return attrs;
  }

  // ---------------------------------------------------------------------
  // Step 3: mutations
  // ---------------------------------------------------------------------

  function parseRollRange(rollStr) {
    const clean = String(rollStr).trim();
    const parts = clean.split('-').map((s) => s.trim());
    const parseVal = (v) => (v === '00' ? 100 : parseInt(v, 10));
    if (parts.length === 1) {
      const v = parseVal(parts[0]);
      return [v, v];
    }
    return [parseVal(parts[0]), parseVal(parts[1])];
  }

  function lookupD100Entry(entries, rollValue) {
    for (const e of entries) {
      const [min, max] = parseRollRange(e.roll);
      if (rollValue >= min && rollValue <= max) return e;
    }
    throw new Error(`No table entry found for roll ${rollValue}`);
  }

  function getMutationTable(tableKey) {
    // tableKey: 'physical' | 'mental' | 'plant'
    if (tableKey === 'physical') return GEN.mutations.physicalMutationsTable.entries;
    if (tableKey === 'mental') return GEN.mutations.mentalMutationsTable.entries;
    if (tableKey === 'plant') return GEN.mutations.plantMutationsTable.entries;
    throw new Error(`Unknown mutation table ${tableKey}`);
  }

  function isDefect(name) {
    return / \(D\)\s*$/.test(name);
  }

  function hasPowerScore(name) {
    return /\*\s*$/.test(name);
  }

  function getMutationEffect(name) {
    return (
      MUT_FX.physicalMutations[name] ||
      MUT_FX.mentalMutations[name] ||
      MUT_FX.plantOnlyMutations[name] ||
      null
    );
  }

  // Special roll-table outcomes that require follow-up resolution instead of
  // naming an actual mutation.
  const SPECIAL_OUTCOMES = {
    'Roll one plant mutation': { type: 'rollOnTable', table: 'plant', count: 1 },
    'Roll two plant mutations': { type: 'rollOnTable', table: 'plant', count: 2 },
    'Pick one plant mutation': { type: 'pick', table: 'plant' },
    'Roll one physical mutation': { type: 'rollOnTable', table: 'physical', count: 1 },
    'Roll two physical mutations': { type: 'rollOnTable', table: 'physical', count: 2 },
    'Pick one physical mutation': { type: 'pick', table: 'physical' },
    'Roll one mental mutation': { type: 'rollOnTable', table: 'mental', count: 1 },
    'Roll two mental mutations': { type: 'rollOnTable', table: 'mental', count: 2 },
    'Pick one mental mutation': { type: 'pick', table: 'mental' },
  };

  function mutationCountByD6(rng, log) {
    const roll = rollD6(rng);
    const row = GEN.mutations.mutationCountByD6Roll.rows.find((r) => r.d6Roll === roll);
    log.add('Mutation count (1d6)', `d6 = ${roll} → ${row.physicalMutations} physical, ${row.mentalMutations} mental`);
    return { physical: row.physicalMutations, mental: row.mentalMutations, roll };
  }

  // Rolls ONE mutation name off a table, transparently resolving chained
  // "roll again" special outcomes and defect-limit rerolls. Does NOT resolve
  // "pick one" outcomes (returns a pending pick request) or duplicates
  // (returns a pending duplicate decision) - the caller/UI must resolve
  // those via resolvePick()/finalizeMutation().
  function rollMutationName(tableKey, character, rng, log, depth) {
    depth = depth || 0;
    if (depth > 10) throw new Error('Mutation roll recursion too deep');
    const entries = getMutationTable(tableKey);
    const rollValue = rollD100(rng);
    const entry = lookupD100Entry(entries, rollValue);
    const displayRoll = rollValue === 100 ? '00' : String(rollValue).padStart(2, '0');
    log.add(`${tableLabel(tableKey)} mutation (d100)`, `d100 = ${displayRoll} → ${entry.mutation}`);

    const special = SPECIAL_OUTCOMES[entry.mutation];
    if (special) {
      if (special.type === 'pick') {
        return { pending: 'pick', table: special.table, sourceTable: tableKey };
      }
      if (special.type === 'rollOnTable') {
        const results = [];
        for (let i = 0; i < special.count; i++) {
          const r = rollMutationName(special.table, character, rng, log, depth + 1);
          results.push(r);
        }
        return special.count === 1 ? results[0] : { pending: 'multi', results };
      }
    }

    const defectBucket = tableKey === 'mental' ? 'mental' : 'physical';
    if (isDefect(entry.mutation)) {
      if (character.defectCounts[defectBucket] >= 1) {
        log.add('Defect limit reached', `${defectBucket} defect limit already met — rerolling`);
        return rollMutationName(tableKey, character, rng, log, depth + 1);
      }
    }

    return { name: entry.mutation, sourceTable: tableKey, defectBucket, roll: rollValue };
  }

  function tableLabel(tableKey) {
    if (tableKey === 'physical') return 'Physical';
    if (tableKey === 'mental') return 'Mental';
    if (tableKey === 'plant') return 'Plant';
    return tableKey;
  }

  function rollPowerScore(rng, log, mutationName) {
    const r = roll4d6DropLowest(rng);
    log.add(`${mutationName} power score (4d6-L)`, r.describe());
    return r.total;
  }

  // Same roll as rollPowerScore, but also returns the individual dice
  // (rollPowerScore's return contract stays a bare number - other callers
  // and the golden-sample test depend on that).
  function rollPowerScoreDetailed(rng, log, mutationName) {
    const r = roll4d6DropLowest(rng);
    log.add(`${mutationName} power score (4d6-L)`, r.describe());
    return { total: r.total, rolls: r.rolls };
  }

  // Finalizes a resolved (non-pending) mutation name roll: checks for
  // duplicates against the character's existing mutations. If it's a fresh
  // duplicate, returns a pending decision instead of mutating character
  // state — caller must invoke finalizeDuplicateDecision() next.
  function checkDuplicate(character, name) {
    return character.mutations.find((m) => m.name === name) || null;
  }

  function buildMutationRecord(name, sourceTable, defectBucket, rng, log) {
    const record = {
      name,
      sourceTable,
      isDefect: isDefect(name),
      powerScore: null,
    };
    if (hasPowerScore(name)) {
      const ps = rollPowerScoreDetailed(rng, log, name);
      record.powerScore = ps.total;
      record.powerScoreRolls = ps.rolls;
    }
    if (isDefect(name)) {
      character_incrementDefect(defectBucket);
    }
    return record;
  }

  // module-level hook set by addMutationToCharacter to avoid needing a
  // character reference inside buildMutationRecord
  let character_incrementDefect = function () {};

  function addMutationToCharacter(character, name, sourceTable, defectBucket, rng, log) {
    character_incrementDefect = function (bucket) {
      character.defectCounts[bucket] = (character.defectCounts[bucket] || 0) + 1;
    };
    const record = buildMutationRecord(name, sourceTable, defectBucket, rng, log);
    character_incrementDefect = function () {};
    character.mutations.push(record);
    return record;
  }

  function applyDuplicateKeep(character, existingRecord, rng, log) {
    if (existingRecord.powerScore !== null) {
      const bonus = roll2d4(rng);
      log.add(`Duplicate ${existingRecord.name} kept — power score bonus (2d4)`, bonus.describe());
      existingRecord.powerScore += bonus.total;
      existingRecord.duplicateBonus = (existingRecord.duplicateBonus || 0) + bonus.total;
      existingRecord.duplicateBonusRolls = bonus.rolls;
    } else {
      existingRecord.doubled = true;
      log.add(`Duplicate ${existingRecord.name} kept`, 'No power score — character gets double effect (or an extra use/round), player/GM picks the doubled element.');
    }
    existingRecord.duplicateCount = (existingRecord.duplicateCount || 1) + 1;
  }

  // Special mechanical effect: "Heightened physical/mental attribute"
  // randomly boosts one of three attributes; increase = max(2, 6 - original modifier).
  function applyHeightenedAttribute(character, isPhysical, rng, log) {
    const pool = isPhysical ? ['PS', 'DX', 'CN'] : ['MS', 'IN', 'CH'];
    const pick = rollD3(rng);
    const attr = pool[pick - 1];
    const original = character.attributes[attr];
    const increase = Math.max(2, 6 - original.modifier);
    const newScore = original.score + increase;
    log.add(`Heightened ${isPhysical ? 'physical' : 'mental'} attribute target (d3)`, `d3 = ${pick} → ${attr}`);
    log.add(`${attr} boosted`, `increase = 6 - (${formatModifier(original.modifier)}) = ${increase} (min 2) → ${original.score} + ${increase} = ${newScore}`);
    original.score = newScore;
    original.modifier = attributeModifier(newScore);
    return { attr, increase, newScore };
  }

  // ---------------------------------------------------------------------
  // Step 4/5: classes and skills
  // ---------------------------------------------------------------------

  function getClassKeys() {
    return Object.keys(GEN.characterClasses);
  }

  function getClassDef(key) {
    return GEN.characterClasses[key];
  }

  function characterHasMentalMutationWithPowerScore(character) {
    return character.mutations.some((m) => m.sourceTable === 'mental' && m.powerScore !== null);
  }

  function isClassAvailable(classKey, character) {
    if (classKey === 'esper') {
      return characterHasMentalMutationWithPowerScore(character);
    }
    return true;
  }

  function validateSkillAllocation(classKey, allocation) {
    const def = getClassDef(classKey);
    const skills = def.skills.list;
    const errors = [];
    let sum = 0;
    for (const skill of skills) {
      const v = allocation[skill];
      if (typeof v !== 'number' || !Number.isInteger(v)) {
        errors.push(`${skill}: must be a whole number`);
        continue;
      }
      if (v < 1 || v > 8) {
        errors.push(`${skill}: must be between 1 and 8 (got ${v})`);
      }
      sum += v;
    }
    if (sum !== def.skillPoints) {
      errors.push(`Total allocated (${sum}) must equal ${def.skillPoints}`);
    }
    return { valid: errors.length === 0, errors, sum };
  }

  // ---------------------------------------------------------------------
  // Step 7: cryptic alliance (optional)
  // ---------------------------------------------------------------------

  function getAllianceKeys() {
    return Object.keys(ALLIANCES.alliances);
  }

  function getAlliance(key) {
    return ALLIANCES.alliances[key];
  }

  function getPlayerEligibleAllianceKeys() {
    return getAllianceKeys().filter((k) => ALLIANCES.alliances[k].playerCharacterEligible);
  }

  // Alliance data marks restrictions as free text (e.g. "Altered Humans
  // only") rather than a structured genotype key, so match it against the
  // genotype's own display name rather than hardcoding which alliance goes
  // with which genotype.
  function alliancePermitsGenotype(allianceKey, genotypeKey) {
    const alliance = getAlliance(allianceKey);
    if (!alliance || !alliance.genotypeRestriction) return true;
    const genotype = getGenotype(genotypeKey);
    if (!genotype) return true;
    return alliance.genotypeRestriction.toLowerCase().includes(genotype.displayName.toLowerCase());
  }

  // Alliances split into "traditional"/"reformed" wings, except Zoopremists
  // which uses "left"/"right" - detect whichever pair is present rather than
  // assuming one naming scheme.
  function getAllianceWings(allianceKey) {
    const alliance = getAlliance(allianceKey);
    if (!alliance) return null;
    if (alliance.traditional && alliance.reformed) {
      return [
        { key: 'traditional', label: 'Traditional', description: alliance.traditional },
        { key: 'reformed', label: 'Reformed', description: alliance.reformed },
      ];
    }
    if (alliance.left && alliance.right) {
      return [
        { key: 'left', label: 'Left', description: alliance.left },
        { key: 'right', label: 'Right', description: alliance.right },
      ];
    }
    return null;
  }

  // ---------------------------------------------------------------------
  // Step 6: derived attributes
  // ---------------------------------------------------------------------

  const RR_PENALTY_REGEX = /Altered humans get (-?\d+) Robot Recognition/i;

  function computeRobotRecognitionMutationPenalty(character) {
    if (character.genotype !== 'alteredHuman') return { total: 0, sources: [] };
    let total = 0;
    const sources = [];
    for (const m of character.mutations) {
      const fx = getMutationEffect(m.name);
      if (!fx) continue;
      const match = fx.effect.match(RR_PENALTY_REGEX);
      if (match) {
        const val = parseInt(match[1], 10);
        total += val;
        sources.push({ mutation: m.name, penalty: val });
      }
    }
    return { total, sources };
  }

  function computeBaseSpeed(character) {
    const genotype = getGenotype(character.genotype);
    if (character.genotype === 'mutatedAnimal') {
      const stock = getBaseAnimalStock(character.baseStock);
      const parsed = parseAnimalSpeeds(stock.notes);
      return {
        walking: character.tookHumanoidBipedal && parsed.bipedal !== null ? parsed.bipedal : parsed.walking,
        swim: parsed.swim,
        fly: parsed.fly,
        raw: stock.notes,
      };
    }
    return { walking: genotype.baseSpeed.walking, swim: genotype.baseSpeed.swimming, fly: null, raw: null };
  }

  function calculateDerivedAttributes(character, rng, log) {
    const a = character.attributes;
    const genotypeKey = character.genotype;
    const classKey = character.characterClass;
    const classDef = classKey ? getClassDef(classKey) : null;
    const derived = {};

    const enforcerBonus = classKey === 'enforcer' ? 1 : 0;
    const esperBonus = classKey === 'esper' ? 1 : 0;
    const examinerBonus = classKey === 'examiner' ? 1 : 0;
    const scoutBonus = classKey === 'scout' ? 1 : 0;

    derived.thacMelee = a.PS.modifier + enforcerBonus;
    derived.thacRanged = a.DX.modifier + enforcerBonus;
    derived.ac = 10 + a.DX.modifier;
    derived.md = 10 + a.MS.modifier + esperBonus;
    derived.health = 10 + a.CN.modifier;
    derived.useArtifacts = a.IN.modifier + examinerBonus;
    derived.perception = a.SN.score + a.IN.modifier + scoutBonus;

    let stealth = a.DX.modifier + scoutBonus;
    if (genotypeKey === 'mutatedAnimal') stealth += 2;
    derived.stealth = stealth;

    let remainUnseen = a.IN.modifier + scoutBonus;
    if (genotypeKey === 'sentientPlant') remainUnseen += 2;
    derived.remainUnseen = remainUnseen;

    derived.damageBonus = a.PS.modifier;

    derived.maxLiftShortKg = 10 * a.PS.score;
    derived.maxLiftLongKg = 5 * a.PS.score;

    const speed = computeBaseSpeed(character);
    derived.speed = {
      walk: speed.walking !== null ? speed.walking + a.DX.modifier : null,
      trotX2: speed.walking !== null ? (speed.walking + a.DX.modifier) * 2 : null,
      runX3: speed.walking !== null ? (speed.walking + a.DX.modifier) * 3 : null,
      swim: speed.swim !== null ? speed.swim : null,
      fly: speed.fly !== null ? speed.fly : null,
      baseNote: speed.raw,
    };

    if (genotypeKey === 'sentientPlant') {
      derived.robotRecognition = { fixed: true, text: 'Never recognized as human (Sentient Plant)' };
    } else {
      let rr = 20;
      const genotype = getGenotype(genotypeKey);
      if (genotypeKey === 'alteredHuman') rr -= 2;
      if (genotypeKey === 'mutatedAnimal') {
        rr -= character.tookAnyHumanoidTrait ? 6 : 8;
      }
      rr += examinerBonus;
      const mutPenalty = computeRobotRecognitionMutationPenalty(character);
      rr += mutPenalty.total;
      derived.robotRecognition = { fixed: false, value: rr, mutationPenaltySources: mutPenalty.sources };
    }

    // Hit points: 1d6 per point of raw CN score (not the modifier).
    const hpRoll = rollNdSum(a.CN.score, 6, rng, `${a.CN.score}d6`);
    log.addRoll('Hit points', hpRoll);
    let hp = hpRoll.total;
    if (classKey === 'enforcer') {
      hp += a.CN.modifier;
      log.add('Enforcer starting HP bonus', `+CN modifier (${formatModifier(a.CN.modifier)}) → ${hp}`);
    }
    derived.hitPoints = hp;
    derived.hitPointsRolls = hpRoll.rolls;

    // Starting domars.
    const domarsRoll = rollNdSum(1, 10, rng, '1d10');
    const domars = 250 + domarsRoll.total * 10;
    log.add('Starting domars', `250 + (1d10=${domarsRoll.total} × 10) → ${domars}`);
    derived.domars = domars;
    derived.domarsD10 = domarsRoll.rolls[0];

    return derived;
  }

  // ---------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------

  root.GW4E = {
    dice: { rollDie, rollNdX, roll4d6DropLowest, roll3d6, roll2d4, rollNdSum, rollD100, rollD20, rollD10, rollD6, rollD3 },
    RollLog,
    attributeModifier,
    formatModifier,
    getGenotypeKeys,
    getGenotype,
    getBaseAnimalStock,
    getBasePlantStock,
    parseAnimalSpeeds,
    generateAttributes,
    ATTR_ORDER,
    parseRollRange,
    lookupD100Entry,
    getMutationTable,
    isDefect,
    hasPowerScore,
    getMutationEffect,
    SPECIAL_OUTCOMES,
    mutationCountByD6,
    rollMutationName,
    rollPowerScore,
    checkDuplicate,
    addMutationToCharacter,
    applyDuplicateKeep,
    applyHeightenedAttribute,
    getClassKeys,
    getClassDef,
    characterHasMentalMutationWithPowerScore,
    isClassAvailable,
    validateSkillAllocation,
    getAllianceKeys,
    getAlliance,
    getPlayerEligibleAllianceKeys,
    alliancePermitsGenotype,
    getAllianceWings,
    calculateDerivedAttributes,
    computeRobotRecognitionMutationPenalty,
    computeBaseSpeed,
  };
})(typeof window !== 'undefined' ? window : global);
