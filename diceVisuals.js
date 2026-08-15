// Visual dice-roll layer on top of the (already-authoritative) engine.js RNG.
// Wraps the vendored sarahRosannaBusch/dice library. Every animation here is
// a *replay* of a result engine.js already computed - this module never
// generates game data, only shows it rolling.
//
// The dice_box's CANNON physics walls are sized once at construction from
// its container's dimensions and never resized. To avoid ever touching that
// (a resize would desync the invisible walls from the visible canvas), we
// use ONE fixed-size host element, permanently parked off in the document,
// and reposition it over a per-step anchor via CSS instead of reparenting
// or resizing the dice_box itself.

(function (root) {
  'use strict';

  const STAGE_WIDTH = 360;
  const STAGE_HEIGHT = 220;
  const SETTLE_TIMEOUT_MS = 5000; // safety net: tab-visibility throttling can stall the physics loop
  const SETTLE_PAUSE_MS = 1200; // how long the settled result stays on screen before the wizard moves on

  let box = null;
  let hostEl = null;

  function isAvailable() {
    return typeof DICE !== 'undefined' && typeof THREE !== 'undefined';
  }

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function ensureBox() {
    if (box) return box;
    hostEl = document.getElementById('diceStageHost');
    box = new DICE.dice_box(hostEl);
    return box;
  }

  function positionHostOver(anchorEl) {
    const rect = anchorEl.getBoundingClientRect();
    const left = rect.left + rect.width / 2 - STAGE_WIDTH / 2;
    const top = rect.top + rect.height / 2 - STAGE_HEIGHT / 2;
    hostEl.style.left = `${Math.max(4, left)}px`;
    hostEl.style.top = `${Math.max(4, top)}px`;
  }

  function showHost() {
    hostEl.classList.add('visible');
  }
  function hideHost() {
    hostEl.classList.remove('visible');
  }

  // notation: e.g. "4d6", "1d20", "1d100+1d10"
  // forcedValues: array matching notation's die order, in the units the
  // library expects (d100-type dice want 0/10/.../90, not the true tens digit
  // pre-divided - see percentileParts()).
  function animateNotation(anchorEl, notation, forcedValues) {
    if (!isAvailable() || prefersReducedMotion()) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const b = ensureBox();
      positionHostOver(anchorEl);
      showHost();
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        // Leave the settled dice on screen for a beat before hiding them and
        // letting the caller continue (next die, next reveal, etc.) - without
        // this, the result vanished the instant it landed.
        setTimeout(() => {
          hideHost();
          resolve();
        }, SETTLE_PAUSE_MS);
      };
      const timeoutId = setTimeout(finish, SETTLE_TIMEOUT_MS);
      b.setDice(notation);
      b.start_throw(
        () => forcedValues,
        () => {
          clearTimeout(timeoutId);
          finish();
        }
      );
    });
  }

  // Splits a 1-100 engine roll into the {tens, ones} a physical percentile
  // pair would show. tens is in {0,10,...,90} (the vendored lib's 'd100'
  // type is literally a d10 relabeled 00/10/.../90 - see vendor/dice/dice.js
  // create_d100 - so it needs its own d10 "ones" companion for the full
  // 1-100 range, same as a real two-die percentile roll).
  function percentileParts(value) {
    const tens = Math.floor(value / 10) % 10 * 10;
    const ones = value % 10;
    return { tens, ones };
  }

  function animateD100(anchorEl, value) {
    const { tens, ones } = percentileParts(value);
    return animateNotation(anchorEl, '1d100+1d10', [tens, ones]);
  }

  // attrResult: an entry from character.attributes[X] (has .rolls and .formula)
  function animateAttribute(anchorEl, attrResult) {
    const m = /^(\d+)d(\d+)/.exec(attrResult.formula);
    if (!m || !attrResult.rolls || !attrResult.rolls.length) return Promise.resolve();
    const notation = `${attrResult.rolls.length}d${m[2]}`;
    return animateNotation(anchorEl, notation, attrResult.rolls);
  }

  function animateDice(anchorEl, sides, rolls) {
    if (!rolls || !rolls.length) return Promise.resolve();
    return animateNotation(anchorEl, `${rolls.length}d${sides}`, rolls);
  }

  function animateSingleDie(anchorEl, sides, value) {
    return animateNotation(anchorEl, `1d${sides}`, [value]);
  }

  // For big batches (hit points can be 20-25+ d6) a full physics tumble per
  // die is too slow/chaotic to watch every character. Instant reveal with a
  // brief highlight instead of no feedback at all.
  function flourish(anchorEl) {
    anchorEl.classList.add('dice-flourish');
    setTimeout(() => anchorEl.classList.remove('dice-flourish'), 500);
    return Promise.resolve();
  }

  root.DiceVisuals = {
    isAvailable,
    prefersReducedMotion,
    animateNotation,
    animateD100,
    animateAttribute,
    animateDice,
    animateSingleDie,
    flourish,
    percentileParts,
  };
})(typeof window !== 'undefined' ? window : global);
