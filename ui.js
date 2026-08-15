// Wizard UI wiring for the GW4E character generator. Depends on engine.js
// (window.GW4E) and the data/*.js globals having already loaded.

(function () {
  'use strict';

  const GEN = window.GW4E_GENERATION;
  const STEP_ORDER = ['genotype', 'attributes', 'mutations', 'humanoidTraits', 'class', 'skills', 'sheet'];
  const STEP_LABELS = {
    genotype: '1. Genotype',
    attributes: '2. Attributes',
    mutations: '3. Mutations',
    humanoidTraits: '4. Humanoid Traits',
    class: '5. Class',
    skills: '6. Skills',
    sheet: '7. Character Sheet',
  };

  let state = null;

  function freshState() {
    return {
      step: 'genotype',
      character: {
        genotype: null,
        baseStock: null,
        attributes: null,
        mutations: [],
        defectCounts: { physical: 0, mental: 0 },
        tookAnyHumanoidTrait: false,
        tookHumanoidBipedal: false,
        characterClass: null,
        skillAllocation: null,
        derived: null,
        name: '',
      },
      log: new GW4E.RollLog(),
      completedSteps: new Set(),
      mutation: null,
      attributesRevealed: new Set(),
      sheetRevealed: false,
    };
  }

  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function attrAbbrHtml(attr) {
    return `<span class="attr-abbr" data-attr="${attr}" tabindex="0">${attr}</span>`;
  }

  // -----------------------------------------------------------------
  // Nav + roll log chrome
  // -----------------------------------------------------------------

  function renderNav() {
    const nav = document.getElementById('stepNav');
    nav.innerHTML = '';
    for (const key of STEP_ORDER) {
      if (key === 'humanoidTraits' && !genotypeUsesHumanoidTraits()) continue;
      const pill = el(`<span class="step-pill">${STEP_LABELS[key]}</span>`);
      if (key === state.step) pill.classList.add('current');
      else if (state.completedSteps.has(key)) pill.classList.add('done');
      nav.appendChild(pill);
    }
  }

  function genotypeUsesHumanoidTraits() {
    const g = state.character.genotype;
    return g === 'mutatedAnimal' || g === 'sentientPlant';
  }

  function renderRollLog() {
    const body = document.getElementById('rollLogBody');
    const count = document.getElementById('rollLogCount');
    count.textContent = String(state.log.entries.length);
    body.innerHTML = state.log.entries
      .map((e) => `<div class="roll-log-entry"><span class="roll-log-label">${escapeHtml(e.label)}</span><span class="roll-log-detail">${escapeHtml(e.detail)}</span></div>`)
      .join('');
    body.scrollTop = body.scrollHeight;
  }

  function renderCart() {
    const body = document.getElementById('cartBody');
    const c = state.character;
    const sections = [];

    if (c.genotype) {
      const g = GW4E.getGenotype(c.genotype);
      sections.push(`<div class="cart-section"><span class="cart-label">Genotype</span>${escapeHtml(g.displayName)}${c.baseStock ? ' (' + escapeHtml(c.baseStock) + ')' : ''}</div>`);
    } else {
      sections.push('<div class="cart-section cart-empty">Genotype not yet chosen</div>');
    }

    if (c.attributes && state.attributesRevealed.size > 0) {
      let rows = '';
      for (const attr of GW4E.ATTR_ORDER) {
        if (!state.attributesRevealed.has(attr)) continue;
        const a = c.attributes[attr];
        rows += `<tr><td>${attrAbbrHtml(attr)}</td><td>${a.score}</td><td>${GW4E.formatModifier(a.modifier)}</td></tr>`;
      }
      sections.push(`<div class="cart-section"><span class="cart-label">Attributes</span><table class="cart-attr-table"><tbody>${rows}</tbody></table></div>`);
    } else if (c.genotype) {
      sections.push('<div class="cart-section cart-empty">Attributes not yet rolled</div>');
    }

    if (c.genotype && c.genotype !== 'pureStrainHuman') {
      if (c.mutations.length > 0) {
        const physCount = c.mutations.filter((m) => m.sourceTable !== 'mental').length;
        const mentalCount = c.mutations.filter((m) => m.sourceTable === 'mental').length;
        let items = '';
        for (const m of c.mutations) {
          let badges = '';
          if (m.isDefect) badges += ' <span class="badge badge-defect">D</span>';
          if (m.powerScore !== null) badges += ` <span class="badge badge-power">MP ${m.powerScore}</span>`;
          items += `<li>${escapeHtml(m.name)}${badges}</li>`;
        }
        const hasMentalPower = GW4E.characterHasMentalMutationWithPowerScore(c);
        sections.push(`<div class="cart-section"><span class="cart-label">Mutations</span>${physCount} physical, ${mentalCount} mental<ul class="cart-mut-list">${items}</ul>
          <span class="cart-esper-flag ${hasMentalPower ? 'ok' : 'bad'}">${hasMentalPower ? '✓ Esper eligible' : '✗ Not Esper-eligible yet'}</span>
        </div>`);
      } else if (c.attributes) {
        sections.push('<div class="cart-section cart-empty">Mutations not yet rolled</div>');
      }
    } else if (c.genotype === 'pureStrainHuman') {
      sections.push('<div class="cart-section cart-empty">No mutations (Pure Strain Human)</div>');
    }

    if (c.characterClass) {
      const cls = GW4E.getClassDef(c.characterClass);
      sections.push(`<div class="cart-section"><span class="cart-label">Class</span>${escapeHtml(cls.displayName)}</div>`);
    }

    if (c.skillAllocation) {
      let items = '';
      for (const [skill, pts] of Object.entries(c.skillAllocation)) items += `<li>${escapeHtml(skill)}: ${pts}</li>`;
      sections.push(`<div class="cart-section"><span class="cart-label">Skills</span><ul class="cart-mut-list">${items}</ul></div>`);
    }

    if (c.derived && state.sheetRevealed) {
      sections.push(`<div class="cart-section"><span class="cart-label">Derived</span>HP ${c.derived.hitPoints} · AC ${c.derived.ac} · Domars ${c.derived.domars}</div>`);
    }

    body.innerHTML = sections.join('');
  }

  document.getElementById('rollLogToggle').addEventListener('click', () => {
    const body = document.getElementById('rollLogBody');
    const btn = document.getElementById('rollLogToggle');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    body.hidden = expanded;
  });

  document.getElementById('startOverBtn').addEventListener('click', () => {
    if (confirm('Start a new character? Current progress will be lost.')) init();
  });

  function goToStep(key) {
    state.completedSteps.add(state.step);
    state.step = key;
    render();
  }

  function render() {
    renderNav();
    const wizard = document.getElementById('wizard');
    wizard.innerHTML = '';
    const renderers = {
      genotype: renderGenotypeStep,
      attributes: renderAttributesStep,
      mutations: renderMutationsStep,
      humanoidTraits: renderHumanoidTraitsStep,
      class: renderClassStep,
      skills: renderSkillsStep,
      sheet: renderSheetStep,
    };
    renderers[state.step](wizard);
    renderRollLog();
    renderCart();
  }

  // -----------------------------------------------------------------
  // Step 1: Genotype
  // -----------------------------------------------------------------

  function renderGenotypeStep(wizard) {
    const card = el('<div class="card"></div>');
    card.appendChild(el('<h2>Step 1 — Choose a Genotype</h2>'));
    const grid = el('<div class="choice-grid"></div>');
    for (const key of GW4E.getGenotypeKeys()) {
      const g = GW4E.getGenotype(key);
      const btn = el(`<button type="button" class="choice-card" data-genotype="${key}">
        <span class="choice-title">${escapeHtml(g.displayName)}</span>
        <span class="choice-sub">${escapeHtml(Array.isArray(g.mutations) ? g.mutations.join(', ') : g.mutations)}</span>
      </button>`);
      if (state.character.genotype === key) btn.classList.add('selected');
      btn.addEventListener('click', () => selectGenotype(key));
      grid.appendChild(btn);
    }
    card.appendChild(grid);
    wizard.appendChild(card);

    if (state.character.genotype === 'mutatedAnimal') {
      wizard.appendChild(renderBaseStockPicker('mutatedAnimal'));
    } else if (state.character.genotype === 'sentientPlant') {
      wizard.appendChild(renderBaseStockPicker('sentientPlant'));
    } else if (state.character.genotype) {
      wizard.appendChild(renderGenotypeContinue());
    }
  }

  function selectGenotype(key) {
    state.character.genotype = key;
    state.character.baseStock = null;
    render();
  }

  function renderBaseStockPicker(genotypeKey) {
    const isAnimal = genotypeKey === 'mutatedAnimal';
    const list = isAnimal
      ? GEN.genotypes.mutatedAnimal.baseAnimalStockList.entries
      : GEN.genotypes.sentientPlant.basePlantStockList.entries;
    const card = el(`<div class="card"><h3>${isAnimal ? 'Base Animal Stock' : 'Base Plant Stock'}</h3></div>`);
    const grid = el('<div class="choice-grid"></div>');
    for (const entry of list) {
      const btn = el(`<button type="button" class="choice-card" data-stock="${escapeHtml(entry.name)}">
        <span class="choice-title">${escapeHtml(entry.name)}</span>
        <span class="choice-sub">${escapeHtml(entry.notes)}</span>
      </button>`);
      if (state.character.baseStock === entry.name) btn.classList.add('selected');
      btn.addEventListener('click', () => {
        state.character.baseStock = entry.name;
        render();
      });
      grid.appendChild(btn);
    }
    card.appendChild(grid);
    if (state.character.baseStock) card.appendChild(renderGenotypeContinue());
    return card;
  }

  function renderGenotypeContinue() {
    const row = el('<div class="btn-row"></div>');
    const btn = el('<button type="button" class="btn">Continue to Attribute Rolls →</button>');
    btn.addEventListener('click', () => goToStep('attributes'));
    row.appendChild(btn);
    return row;
  }

  // -----------------------------------------------------------------
  // Step 2: Attributes
  // -----------------------------------------------------------------

  function renderAttributesStep(wizard) {
    const card = el('<div class="card"><h2>Step 2 — Roll Attributes</h2></div>');
    const genotype = GW4E.getGenotype(state.character.genotype);
    card.appendChild(el(`<p class="hint">Genotype: <strong>${escapeHtml(genotype.displayName)}</strong>${state.character.baseStock ? ' (' + escapeHtml(state.character.baseStock) + ')' : ''}</p>`));

    if (!state.character.attributes) {
      const btn = el('<button type="button" class="btn">Roll All Seven Attributes</button>');
      btn.addEventListener('click', () => {
        state.character.attributes = GW4E.generateAttributes(state.character, Math.random, state.log);
        state.attributesRevealed = new Set();
        render();
        revealAttributesSequentially();
      });
      card.appendChild(btn);
    } else {
      const allRevealed = state.attributesRevealed.size === GW4E.ATTR_ORDER.length;
      if (!allRevealed) {
        card.appendChild(el('<div class="dice-anchor" id="attrDiceAnchor"></div>'));
      }
      const table = el('<table class="data-table"><thead><tr><th>Attribute</th><th>Score</th><th>Modifier</th></tr></thead><tbody></tbody></table>');
      const tbody = table.querySelector('tbody');
      for (const attr of GW4E.ATTR_ORDER) {
        const revealed = state.attributesRevealed.has(attr);
        const a = state.character.attributes[attr];
        const score = revealed ? a.score : '—';
        const mod = revealed ? GW4E.formatModifier(a.modifier) : '—';
        tbody.appendChild(el(`<tr${revealed ? '' : ' class="hint"'}><td>${attrAbbrHtml(attr)}</td><td>${score}</td><td>${mod}</td></tr>`));
      }
      card.appendChild(table);
      if (allRevealed) {
        const row = el('<div class="btn-row"></div>');
        const next = el('<button type="button" class="btn">Continue to Mutations →</button>');
        next.addEventListener('click', () => goToStep('mutations'));
        row.appendChild(next);
        card.appendChild(row);
      }
    }
    wizard.appendChild(card);
  }

  async function revealAttributesSequentially() {
    for (const attr of GW4E.ATTR_ORDER) {
      const anchor = document.getElementById('attrDiceAnchor');
      if (anchor && window.DiceVisuals) {
        await DiceVisuals.animateAttribute(anchor, state.character.attributes[attr]);
      }
      state.attributesRevealed.add(attr);
      if (state.step === 'attributes') render();
    }
  }

  // -----------------------------------------------------------------
  // Step 3: Mutations
  // -----------------------------------------------------------------

  function renderMutationsStep(wizard) {
    const card = el('<div class="card"><h2>Step 3 — Roll Mutations</h2></div>');

    if (state.character.genotype === 'pureStrainHuman') {
      card.appendChild(el('<p class="hint">Pure Strain Humans cannot be mutated. Skipping to the next step.</p>'));
      const next = el('<button type="button" class="btn">Continue →</button>');
      next.addEventListener('click', () => goToStep(genotypeUsesHumanoidTraits() ? 'humanoidTraits' : 'class'));
      card.appendChild(next);
      wizard.appendChild(card);
      return;
    }

    if (!state.mutation) {
      card.appendChild(el('<div class="dice-anchor" id="mutationCountDiceAnchor"></div>'));
      const btn = el('<button type="button" class="btn">Roll Mutation Count (1d6)</button>');
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        const counts = GW4E.mutationCountByD6(Math.random, state.log);
        const anchor = document.getElementById('mutationCountDiceAnchor');
        if (anchor && window.DiceVisuals) {
          await DiceVisuals.animateSingleDie(anchor, 6, counts.roll);
        }
        state.mutation = {
          physicalTotal: counts.physical,
          mentalTotal: counts.mental,
          physicalDone: 0,
          mentalDone: 0,
          currentSlotTable: null,
          rawQueue: [],
          pendingUI: null,
        };
        render();
      });
      card.appendChild(btn);
      wizard.appendChild(card);
      return;
    }

    const m = state.mutation;
    card.appendChild(el(`<p class="hint">Physical mutations: ${m.physicalDone}/${m.physicalTotal} &nbsp;•&nbsp; Mental mutations: ${m.mentalDone}/${m.mentalTotal}</p>`));

    const notDone = m.physicalDone < m.physicalTotal || m.mentalDone < m.mentalTotal;
    if (notDone) {
      card.appendChild(el('<div class="dice-anchor" id="mutationDiceAnchor"></div>'));
    }

    const mutList = el('<div id="mutationList"></div>');
    for (const rec of state.character.mutations) mutList.appendChild(renderMutationRecord(rec));
    card.appendChild(mutList);

    if (m.pendingUI) {
      card.appendChild(m.pendingUI);
    } else if (m.physicalDone < m.physicalTotal || m.mentalDone < m.mentalTotal) {
      const table = m.physicalDone < m.physicalTotal ? (state.character.genotype === 'sentientPlant' ? 'plant' : 'physical') : 'mental';
      const btn = el(`<button type="button" class="btn">Roll Next ${table === 'mental' ? 'Mental' : 'Physical'} Mutation</button>`);
      btn.addEventListener('click', () => startMutationSlot(table));
      card.appendChild(btn);
    } else {
      const row = el('<div class="btn-row"></div>');
      const next = el('<button type="button" class="btn">Continue →</button>');
      next.addEventListener('click', () => goToStep(genotypeUsesHumanoidTraits() ? 'humanoidTraits' : 'class'));
      row.appendChild(next);
      card.appendChild(row);
    }

    wizard.appendChild(card);
  }

  function renderMutationRecord(rec) {
    const fx = GW4E.getMutationEffect(rec.name);
    const div = el(`<div class="mutation-record${rec.isDefect ? ' defect' : ''}"></div>`);
    let meta = rec.sourceTable === 'mental' ? 'Mental' : rec.sourceTable === 'plant' ? 'Plant' : 'Physical';
    if (rec.powerScore !== null) meta += ` · MP ${rec.powerScore} (${GW4E.formatModifier(GW4E.attributeModifier(rec.powerScore))})`;
    if (rec.duplicateCount > 1) meta += ` · rolled ${rec.duplicateCount}× (kept & boosted)`;
    div.innerHTML = `<span class="mutation-name">${escapeHtml(rec.name)}</span>${rec.isDefect ? '<span class="badge badge-defect">DEFECT</span>' : ''}
      <div class="mutation-meta">${escapeHtml(meta)}</div>
      <div class="mutation-effect">${fx ? escapeHtml(fx.effect) : '<em>No effect text found in gw4e_mutation_effects.json for this name.</em>'}</div>`;
    return div;
  }

  function ensureMutationDiceAnchor() {
    return document.getElementById('mutationDiceAnchor');
  }

  async function startMutationSlot(tableKey) {
    const m = state.mutation;
    m.currentSlotTable = tableKey;
    m.rawQueue = [{ table: tableKey }];
    await processNextRawRoll();
  }

  async function processNextRawRoll() {
    const m = state.mutation;
    if (m.rawQueue.length === 0) {
      completeMutationSlot();
      return;
    }
    const item = m.rawQueue.shift();
    const res = item.table
      ? GW4E.rollMutationName(item.table, state.character, Math.random, state.log)
      : item.resolved;

    if (res.pending === 'pick') {
      m.pendingUI = renderPickDecision(res.table, (chosenName) => {
        m.pendingUI = null;
        finalizeRawRollResult({ name: chosenName, sourceTable: res.table, defectBucket: res.table === 'mental' ? 'mental' : 'physical' });
      });
      render();
      return;
    }
    if (res.pending === 'multi') {
      m.rawQueue.unshift(...res.results.map((r) => ({ resolved: r })));
      await processNextRawRoll();
      return;
    }

    if (typeof res.roll === 'number' && window.DiceVisuals) {
      const anchor = ensureMutationDiceAnchor();
      if (anchor) await DiceVisuals.animateD100(anchor, res.roll);
    }

    await finalizeRawRollResult(res);
  }

  async function finalizeRawRollResult(res) {
    const m = state.mutation;
    const dup = GW4E.checkDuplicate(state.character, res.name);
    if (dup) {
      m.pendingUI = renderDuplicateDecision(res, dup, async (keep) => {
        m.pendingUI = null;
        if (keep) {
          GW4E.applyDuplicateKeep(state.character, dup, Math.random, state.log);
          if (dup.duplicateBonusRolls && window.DiceVisuals) {
            const anchor = ensureMutationDiceAnchor();
            if (anchor) await DiceVisuals.animateDice(anchor, 4, dup.duplicateBonusRolls);
          }
          render();
        } else {
          m.rawQueue.unshift({ table: res.sourceTable === 'mental' ? 'mental' : m.currentSlotTable });
        }
        await processNextRawRoll();
      });
      render();
      return;
    }
    const record = GW4E.addMutationToCharacter(state.character, res.name, res.sourceTable, res.defectBucket, Math.random, state.log);
    if (record.powerScoreRolls && window.DiceVisuals) {
      const anchor = ensureMutationDiceAnchor();
      if (anchor) await DiceVisuals.animateDice(anchor, 6, record.powerScoreRolls);
    }
    if (res.name === 'Heightened physical attribute') GW4E.applyHeightenedAttribute(state.character, true, Math.random, state.log);
    if (res.name === 'Heightened mental attribute') GW4E.applyHeightenedAttribute(state.character, false, Math.random, state.log);
    render();
    await processNextRawRoll();
  }

  function completeMutationSlot() {
    const m = state.mutation;
    if (m.currentSlotTable === 'mental') m.mentalDone++;
    else m.physicalDone++;
    render();
  }

  function renderPickDecision(tableKey, onChoose) {
    const entries = GW4E.getMutationTable(tableKey);
    const names = [...new Set(entries.map((e) => e.mutation).filter((n) => !GW4E.SPECIAL_OUTCOMES[n]))];
    const box = el(`<div class="decision-box"><strong>Pick one ${tableKey} mutation:</strong></div>`);
    const select = el('<select></select>');
    for (const n of names) select.appendChild(el(`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`));
    box.appendChild(select);
    const confirm = el('<button type="button" class="btn" style="margin-left:0.6rem">Confirm Pick</button>');
    confirm.addEventListener('click', () => onChoose(select.value));
    box.appendChild(confirm);
    return box;
  }

  function renderDuplicateDecision(newRes, existingRecord, onDecision) {
    const box = el(`<div class="decision-box">
      <strong>Duplicate mutation rolled: ${escapeHtml(newRes.name)}</strong>
      <p class="hint">You already have this mutation. Keep it (boost power score by 2d4, or double its effect) or reroll for something new?</p>
    </div>`);
    const row = el('<div class="btn-row"></div>');
    const keepBtn = el('<button type="button" class="btn">Keep &amp; Boost</button>');
    keepBtn.addEventListener('click', () => onDecision(true));
    const rerollBtn = el('<button type="button" class="btn btn-secondary">Reroll Instead</button>');
    rerollBtn.addEventListener('click', () => onDecision(false));
    row.appendChild(keepBtn);
    row.appendChild(rerollBtn);
    box.appendChild(row);
    return box;
  }

  // -----------------------------------------------------------------
  // Step 4: Humanoid Traits
  // -----------------------------------------------------------------

  function renderHumanoidTraitsStep(wizard) {
    if (!genotypeUsesHumanoidTraits()) {
      goToStep('class');
      return;
    }
    const isAnimal = state.character.genotype === 'mutatedAnimal';
    const card = el('<div class="card"><h2>Step 4 — Humanoid Traits</h2></div>');
    card.appendChild(el(`<p class="hint">Taking ANY trait below forfeits the bonus physical mutation you'd get for taking none.</p>`));

    const options = isAnimal
      ? GEN.genotypes.mutatedAnimal.rules.humanoidTraits.options
      : ['Talk (non-human voice)', 'Manipulate tools (max 2 appendages declared tool-capable)', 'Smell/taste simultaneously'];

    const boxes = [];
    for (const opt of options) {
      const id = 'ht_' + boxes.length;
      const wrap = el(`<div><label><input type="checkbox" id="${id}"> ${escapeHtml(opt)}</label></div>`);
      card.appendChild(wrap);
      boxes.push({ input: wrap.querySelector('input'), label: opt });
    }

    if (state.character.baseStock) {
      const stock = isAnimal ? GW4E.getBaseAnimalStock(state.character.baseStock) : GW4E.getBasePlantStock(state.character.baseStock);
      if (stock) card.appendChild(el(`<p class="hint"><strong>${escapeHtml(state.character.baseStock)} base stock notes:</strong> ${escapeHtml(stock.notes)}</p>`));
    }

    card.appendChild(el('<div class="dice-anchor" id="humanoidBonusDiceAnchor" style="display:none"></div>'));

    const row = el('<div class="btn-row"></div>');
    const confirm = el('<button type="button" class="btn">Confirm Humanoid Traits</button>');
    confirm.addEventListener('click', () => {
      const bipedalOpt = options.find((o) => /bipedal/i.test(o));
      const anyChecked = boxes.some((b) => b.input.checked);
      state.character.tookAnyHumanoidTrait = anyChecked;
      state.character.tookHumanoidBipedal = bipedalOpt ? boxes.find((b) => b.label === bipedalOpt).input.checked : false;
      state.log.add('Humanoid traits', anyChecked ? boxes.filter((b) => b.input.checked).map((b) => b.label).join('; ') : 'None taken — bonus physical mutation granted');
      if (!anyChecked) {
        const bonusTable = state.character.genotype === 'sentientPlant' ? 'plant' : 'physical';
        state.mutation.rawQueue = [{ table: bonusTable }];
        state.mutation.currentSlotTable = 'physical'; // bonus still counts as a physical-side mutation
        state.mutation.bonusPending = true;
        const anchor = document.getElementById('humanoidBonusDiceAnchor');
        if (anchor) anchor.style.display = '';
        processBonusMutation();
      } else {
        renderRollLog();
        goToStep('class');
      }
    });
    row.appendChild(confirm);
    card.appendChild(row);
    wizard.appendChild(card);
  }

  async function processBonusMutation() {
    const m = state.mutation;
    if (m.rawQueue.length === 0) {
      render();
      const wizard = document.getElementById('wizard');
      const card = wizard.querySelector('.card');
      const row = el('<div class="btn-row"></div>');
      const next = el('<button type="button" class="btn">Continue to Class →</button>');
      next.addEventListener('click', () => goToStep('class'));
      row.appendChild(next);
      card.appendChild(row);
      return;
    }
    const item = m.rawQueue.shift();
    const res = item.table
      ? GW4E.rollMutationName(item.table, state.character, Math.random, state.log)
      : item.resolved;
    if (res.pending === 'pick') {
      const wizard = document.getElementById('wizard');
      const card = wizard.querySelector('.card');
      const box = renderPickDecision(res.table, (chosenName) => {
        finalizeBonusMutation({ name: chosenName, sourceTable: res.table, defectBucket: res.table === 'mental' ? 'mental' : 'physical' });
      });
      card.appendChild(box);
      return;
    }
    if (res.pending === 'multi') {
      m.rawQueue.unshift(...res.results.map((r) => ({ resolved: r })));
      await processBonusMutation();
      return;
    }
    if (typeof res.roll === 'number' && window.DiceVisuals) {
      const anchor = document.getElementById('humanoidBonusDiceAnchor');
      if (anchor) await DiceVisuals.animateD100(anchor, res.roll);
    }
    await finalizeBonusMutation(res);
  }

  async function finalizeBonusMutation(res) {
    const record = GW4E.addMutationToCharacter(state.character, res.name, res.sourceTable, res.defectBucket, Math.random, state.log);
    if (record.powerScoreRolls && window.DiceVisuals) {
      const anchor = document.getElementById('humanoidBonusDiceAnchor');
      if (anchor) await DiceVisuals.animateDice(anchor, 6, record.powerScoreRolls);
    }
    if (res.name === 'Heightened physical attribute') GW4E.applyHeightenedAttribute(state.character, true, Math.random, state.log);
    if (res.name === 'Heightened mental attribute') GW4E.applyHeightenedAttribute(state.character, false, Math.random, state.log);
    await processBonusMutation();
  }

  // -----------------------------------------------------------------
  // Step 5: Class
  // -----------------------------------------------------------------

  function renderClassStep(wizard) {
    const card = el('<div class="card"><h2>Step 5 — Choose a Class</h2></div>');
    const grid = el('<div class="choice-grid"></div>');
    for (const key of GW4E.getClassKeys()) {
      const cls = GW4E.getClassDef(key);
      const available = GW4E.isClassAvailable(key, state.character);
      const btn = el(`<button type="button" class="choice-card" data-class="${key}" ${available ? '' : 'disabled'}>
        <span class="choice-title">${escapeHtml(cls.displayName)}</span>
        <span class="choice-sub">${escapeHtml(cls.concept)}</span>
        ${cls.requirements ? `<span class="choice-sub">Requires: ${escapeHtml(cls.requirements.join('; '))}</span>` : ''}
        ${!available ? '<span class="choice-sub" style="color:#c25b4a">Not eligible — no mental mutation with a power score rolled.</span>' : ''}
      </button>`);
      if (state.character.characterClass === key) btn.classList.add('selected');
      if (available) btn.addEventListener('click', () => selectClass(key));
      grid.appendChild(btn);
    }
    card.appendChild(grid);
    wizard.appendChild(card);

    if (state.character.characterClass) {
      wizard.appendChild(renderClassContinue());
    }
  }

  function selectClass(key) {
    state.character.characterClass = key;
    state.character.skillAllocation = null;
    render();
  }

  function renderClassContinue() {
    const row = el('<div class="card"></div>');
    const cls = GW4E.getClassDef(state.character.characterClass);
    row.appendChild(el(`<p class="hint">${cls.skillPoints} skill points to distribute across: ${cls.skills.list.join(', ')}</p>`));
    const btn = el('<button type="button" class="btn">Continue to Skills →</button>');
    btn.addEventListener('click', () => goToStep('skills'));
    row.appendChild(btn);
    return row;
  }

  // -----------------------------------------------------------------
  // Step 6: Skills
  // -----------------------------------------------------------------

  function renderSkillsStep(wizard) {
    const cls = GW4E.getClassDef(state.character.characterClass);
    const card = el(`<div class="card"><h2>Step 6 — Distribute Skill Points</h2><p class="hint">${cls.displayName}: ${cls.skillPoints} points total, 1-8 per skill.</p></div>`);

    const inputs = {};
    for (const skill of cls.skills.list) {
      const row = el(`<div class="skill-row">
        <label>${escapeHtml(skill)}<br><span class="hint" style="font-size:0.8rem">${escapeHtml(cls.skills.details[skill] || '')}</span></label>
      </div>`);
      const input = el(`<input type="number" min="1" max="8" value="1">`);
      row.appendChild(input);
      inputs[skill] = input;
      card.appendChild(row);
    }

    const sumLine = el('<div class="skill-sum"></div>');
    card.appendChild(sumLine);

    function updateSum() {
      const allocation = {};
      for (const skill of cls.skills.list) allocation[skill] = parseInt(inputs[skill].value, 10) || 0;
      const result = GW4E.validateSkillAllocation(state.character.characterClass, allocation);
      sumLine.textContent = `Total: ${result.sum} / ${cls.skillPoints}` + (result.valid ? ' ✓' : '');
      sumLine.className = 'skill-sum ' + (result.valid ? 'ok' : 'bad');
      continueBtn.disabled = !result.valid;
      return { allocation, result };
    }

    for (const skill of cls.skills.list) inputs[skill].addEventListener('input', updateSum);

    const row = el('<div class="btn-row"></div>');
    const continueBtn = el('<button type="button" class="btn">Continue to Character Sheet →</button>');
    continueBtn.addEventListener('click', () => {
      const { allocation } = updateSum();
      state.character.skillAllocation = allocation;
      goToStep('sheet');
    });
    row.appendChild(continueBtn);
    card.appendChild(row);
    wizard.appendChild(card);
    updateSum();
  }

  // -----------------------------------------------------------------
  // Step 7: Sheet
  // -----------------------------------------------------------------

  async function revealSheetSequentially() {
    const d = state.character.derived;
    const anchor = document.getElementById('sheetDiceAnchor');
    if (anchor && window.DiceVisuals && typeof d.domarsD10 === 'number') {
      await DiceVisuals.animateSingleDie(anchor, 10, d.domarsD10);
      anchor.textContent = 'Rolling Hit Points…';
      await DiceVisuals.flourish(anchor);
    }
    state.sheetRevealed = true;
    if (state.step === 'sheet') render();
  }

  function renderSheetStep(wizard) {
    if (!state.character.derived) {
      state.character.derived = GW4E.calculateDerivedAttributes(state.character, Math.random, state.log);
    }
    if (!state.sheetRevealed) {
      const card = el('<div class="card"><h2>Step 7 — Finalizing Character</h2></div>');
      card.appendChild(el('<div class="dice-anchor" id="sheetDiceAnchor"></div>'));
      wizard.appendChild(card);
      revealSheetSequentially();
      return;
    }
    const c = state.character;
    const d = c.derived;
    const genotype = GW4E.getGenotype(c.genotype);
    const cls = GW4E.getClassDef(c.characterClass);

    const controls = el('<div class="btn-row"></div>');
    const nameInput = el(`<input type="text" placeholder="Character name" value="${escapeHtml(c.name || '')}" style="padding:0.4rem;font-family:inherit;background:var(--panel-alt);color:var(--text);border:1px solid var(--border);border-radius:4px;">`);
    nameInput.addEventListener('input', () => {
      c.name = nameInput.value;
      wizard.querySelector('.sheet-name').textContent = c.name || '(unnamed)';
    });
    controls.appendChild(nameInput);
    const printBtn = el('<button type="button" class="btn">Print / Save as PDF</button>');
    printBtn.addEventListener('click', () => window.print());
    controls.appendChild(printBtn);
    wizard.appendChild(controls);

    const sheet = el('<div class="sheet"></div>');

    sheet.appendChild(el(`<h2 class="sheet-name">${escapeHtml(c.name || '(unnamed)')}</h2>`));
    sheet.appendChild(el(`<div class="sheet-section">
      <div class="field-line"><span class="field-label">Genotype:</span>${escapeHtml(genotype.displayName)}${c.baseStock ? ' (' + escapeHtml(c.baseStock) + ')' : ''}</div>
      <div class="field-line"><span class="field-label">Character Class:</span>${escapeHtml(cls.displayName)}</div>
      <div class="field-line"><span class="field-label">Level:</span>1</div>
      <div class="field-line"><span class="field-label">Cryptic Alliance:</span>None (not yet resolved — full alliance write-ups not extracted from source data)</div>
      <div class="field-line"><span class="field-label">Home Town / Tech Level:</span>Tech III settlement (assumed)</div>
      <div class="field-line"><span class="field-label">Base Stock Abilities:</span>${escapeHtml(baseStockAbilitiesText(c))}</div>
    </div>`));

    const attrTable = el('<table class="data-table"><thead><tr><th>Attribute</th><th>Score</th><th>Modifier</th><th>Linked Derived</th><th>Value</th></tr></thead><tbody></tbody></table>');
    const linked = {
      PS: ['THAC Melee', d.thacMelee],
      DX: ['THAC Ranged', d.thacRanged],
      CN: ['Health', d.health],
      MS: ['Mental Defense (MD)', d.md],
      IN: ['Use Artifacts', d.useArtifacts],
      CH: ['Robot Recognition', d.robotRecognition.fixed ? d.robotRecognition.text : d.robotRecognition.value],
      SN: ['Perception', d.perception],
    };
    const tbody = attrTable.querySelector('tbody');
    for (const attr of GW4E.ATTR_ORDER) {
      const a = c.attributes[attr];
      const [label, val] = linked[attr];
      tbody.appendChild(el(`<tr><td>${attrAbbrHtml(attr)}</td><td>${a.score}</td><td>${GW4E.formatModifier(a.modifier)}</td><td>${escapeHtml(label)}</td><td>${escapeHtml(String(val))}</td></tr>`));
    }
    sheet.appendChild(el('<h3>Attributes</h3>'));
    sheet.appendChild(attrTable);
    sheet.appendChild(el(`<div class="sheet-section">
      <div class="field-line"><span class="field-label">Damage Bonus:</span>${d.damageBonus === 0 ? '—' : GW4E.formatModifier(d.damageBonus)}</div>
      <div class="field-line"><span class="field-label">Stealth:</span>${d.stealth}</div>
      <div class="field-line"><span class="field-label">Remain Unseen:</span>${d.remainUnseen}</div>
      <div class="field-line"><span class="field-label">Max Lift:</span>${d.maxLiftShortKg} kg short / ${d.maxLiftLongKg} kg long</div>
      <div class="field-line"><span class="field-label">Base Armor Class:</span>${d.ac}</div>
    </div>`));

    sheet.appendChild(el('<h3>Speed</h3>'));
    sheet.appendChild(el(`<table class="data-table"><thead><tr><th>Walk</th><th>Trot x2</th><th>Run x3</th><th>Fly</th><th>Swim</th></tr></thead>
      <tbody><tr><td>${fmtSpeed(d.speed.walk)}</td><td>${fmtSpeed(d.speed.trotX2)}</td><td>${fmtSpeed(d.speed.runX3)}</td><td>${fmtSpeed(d.speed.fly)}</td><td>${fmtSpeed(d.speed.swim)}</td></tr></tbody></table>`));

    sheet.appendChild(el('<h3>Combat</h3>'));
    sheet.appendChild(el(`<div class="sheet-section">
      <div class="field-line"><span class="field-label">AC w/Armor:</span>${d.ac} (unarmored)</div>
      <div class="field-line"><span class="field-label">Force Field:</span>none</div>
      <div class="field-line"><span class="field-label">Hit Points:</span>${d.hitPoints}</div>
      <div class="field-line"><span class="field-label">Wounds:</span>0</div>
    </div>`));

    sheet.appendChild(el('<h3>Class Skills</h3>'));
    const skillTable = el('<table class="data-table"><thead><tr><th>Skill</th><th>Points</th></tr></thead><tbody></tbody></table>');
    const stbody = skillTable.querySelector('tbody');
    for (const skill of cls.skills.list) {
      stbody.appendChild(el(`<tr><td>${escapeHtml(skill)}</td><td>${c.skillAllocation[skill]}</td></tr>`));
    }
    sheet.appendChild(skillTable);
    sheet.appendChild(el(`<div class="sheet-section">
      <div class="field-line"><span class="field-label">Domars:</span>${d.domars}</div>
      <div class="field-line"><span class="field-label">Experience Points:</span>0 (2,000 XP to reach Level 2)</div>
    </div>`));

    const physMuts = c.mutations.filter((m) => m.sourceTable !== 'mental');
    const mentalMuts = c.mutations.filter((m) => m.sourceTable === 'mental');

    sheet.appendChild(el('<h3>Physical Mutations</h3>'));
    sheet.appendChild(mutationTable(physMuts, false));
    sheet.appendChild(el('<h3>Mental Mutations</h3>'));
    sheet.appendChild(mutationTable(mentalMuts, true));

    sheet.appendChild(el(`<div class="sheet-section">
      <h3>Notes / Gaps</h3>
      <p class="hint">Cryptic Alliance skipped (full write-ups not yet extracted from source data). Starting equipment/loot not yet rolled — Domars shown above per the starting-funds formula only. Page 2 (Equipment/Artifacts) omitted.</p>
    </div>`));

    wizard.appendChild(sheet);
  }

  function fmtSpeed(v) {
    return v === null || v === undefined ? '—' : String(v);
  }

  function baseStockAbilitiesText(c) {
    if (c.genotype === 'mutatedAnimal' && c.baseStock) return GW4E.getBaseAnimalStock(c.baseStock).notes;
    if (c.genotype === 'sentientPlant' && c.baseStock) return GW4E.getBasePlantStock(c.baseStock).notes;
    return 'None';
  }

  function mutationTable(list, isMental) {
    if (list.length === 0) return el('<p class="hint">None.</p>');
    const table = el(`<table class="data-table"><thead><tr><th>#</th><th>Mutation</th><th>MP</th>${isMental ? '<th>MHAC</th>' : ''}<th>Notes/Bonuses</th></tr></thead><tbody></tbody></table>`);
    const tbody = table.querySelector('tbody');
    list.forEach((m, i) => {
      const fx = GW4E.getMutationEffect(m.name);
      const mp = m.powerScore !== null ? String(m.powerScore) : '—';
      const mhac = m.powerScore !== null ? GW4E.formatModifier(GW4E.attributeModifier(m.powerScore)) : '—';
      const notes = fx ? fx.effect : '';
      tbody.appendChild(el(`<tr><td>${i + 1}</td><td>${escapeHtml(m.name)}</td><td>${mp}</td>${isMental ? `<td>${mhac}</td>` : ''}<td>${escapeHtml(notes)}</td></tr>`));
    });
    return table;
  }

  // -----------------------------------------------------------------
  // Attribute tooltips
  // -----------------------------------------------------------------

  function initAttrTooltips() {
    const tip = document.getElementById('attrTooltip');
    const descriptions = window.GW4E_ATTRIBUTE_DESCRIPTIONS;

    function show(target) {
      const info = descriptions[target.getAttribute('data-attr')];
      if (!info) return;
      tip.innerHTML = `<strong>${escapeHtml(info.name)}</strong>${escapeHtml(info.description)}`;
      tip.hidden = false;
      const rect = target.getBoundingClientRect();
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      let left = rect.left + rect.width / 2 - tw / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
      let top = rect.top - th - 8;
      if (top < 8) top = rect.bottom + 8;
      tip.style.left = `${left}px`;
      tip.style.top = `${top}px`;
    }
    function hide() {
      tip.hidden = true;
    }

    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('.attr-abbr');
      if (t) show(t);
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('.attr-abbr')) hide();
    });
    document.addEventListener('focusin', (e) => {
      const t = e.target.closest('.attr-abbr');
      if (t) show(t);
    });
    document.addEventListener('focusout', (e) => {
      if (e.target.closest('.attr-abbr')) hide();
    });
    window.addEventListener('scroll', hide, true);
  }

  function init() {
    state = freshState();
    render();
  }

  initAttrTooltips();
  init();
})();
