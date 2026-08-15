// Tooltip text for the seven primary attributes, sourced from
// gw4e_attribute_descriptions.md — do not hand-edit; update the source .md
// and mirror changes here.
(function (root) {
  root.GW4E_ATTRIBUTE_DESCRIPTIONS = {
    PS: { name: 'Physical Strength', description: 'Raw muscle power. Determines how much you can lift, push, or carry, and drives melee THAC and hand-weapon damage.' },
    DX: { name: 'Dexterity', description: 'How nimble and accurate you are. Drives ranged THAC, Armor Class, Stealth, and combat initiative.' },
    CN: { name: 'Constitution', description: 'How much punishment your body can take. Determines Hit Points and resistance to poison, radiation, and disease (Health).' },
    MS: { name: 'Mental Strength', description: 'Willpower. The basis of mental combat — determines Mental Defense (MD) and factors into using mental mutations.' },
    IN: { name: 'Intelligence', description: 'Logic and problem-solving. Governs your ability to figure out artifacts (Use Artifacts) and stay hidden (Remain Unseen).' },
    CH: { name: 'Charisma', description: 'Social and psychological presence. Shapes how NPCs and other creatures react to you.' },
    SN: { name: 'Senses', description: 'Overall sensory sharpness — sight, hearing, smell, etc. combined into one base score, the foundation for Perception.' },
  };
})(typeof window !== 'undefined' ? window : global);
