// Auto-generated from gw4e_cryptic_alliances.json — do not hand-edit; regenerate from source JSON.
(function (root) {
  root.GW4E_CRYPTIC_ALLIANCES = {
  "_meta": {
    "source": "TSR 07514 - Gamma World, 4th Edition (1992 boxed set rulebook), Chapter 8: Cryptic Alliances, pp. 127-139",
    "purpose": "Structured data for all 13 Cryptic Alliances referenced but not detailed in gw4e_character_generation.json's crypticAlliance section (chargen step 7). Paraphrased mechanical/organizational data - not the book's narrative prose.",
    "usageNote": "Each alliance has a 'playerCharacterEligible' flag - several (The Created, Knights of Genetic Purity, Seekers) are explicitly NPC-only per the book and should not be offered as a chargen choice. 'Traditional' and 'Reformed' represent an internal split of belief/approach within most alliances; a player choosing that alliance should also pick (or be asked) which wing their character follows, as it can affect roleplay and, in a couple of cases, what actions are permitted."
  },
  "generalRules": {
    "description": "From gw4e_character_generation.json's crypticAlliance section: joining is always optional, never required, and a character can never belong to more than one at a time. Full write-ups below.",
    "tradeoff": "Each alliance grants tangible Benefits (bonuses, discounts, starting gear, etc.) in exchange for Restrictions (behavioral obligations) and typically an Experience Point Bonus for advancing the alliance's goals during an adventure. Violating Restrictions can lead to expulsion or worse at GM discretion."
  },
  "alliances": {
    "archivists": {
      "displayName": "The Archivists",
      "alternateName": "Servants of the Eye",
      "playerCharacterEligible": true,
      "concept": "A primitive, artifact-worshipping alliance. Members venerate artifacts of the ancients (functioning or not) and offer their finds to deactivated robots they treat as gods; membership skews toward poor, uneducated true men, though all genotypes are welcome. Temple locations are kept secret.",
      "traditional": "Actively hunts down and deactivates robots and active machines, believing them inhabited by evil spirits, then carts them to a temple.",
      "reformed": "Believes machines are only the physical symbol of their gods; only seeks/takes artifacts that are unused or have naturally stopped functioning.",
      "symbol": "An eye within a triangle, usually worn as jewelry, kept out of casual view.",
      "benefits": "+3 Robot Recognition and +3 Use Artifacts, but only when trying to deactivate a robot or machine.",
      "restrictions": "All artifacts of value a member acquires must be deactivated and placed in a temple (an artifact not 'doing something' counts as deactivated even if functional). Members can carry/use artifacts so long as they regularly donate valuable ones to the temple.",
      "experiencePointBonus": "Bonus for placing artifacts at an Archivist temple, scaled to the item's unusualness (e.g. an airplane might earn 10,000 xp; a blow dryer only 10 xp). Only the single highest-value item placed per visit counts; a weekly visit cadence is the guideline minimum.",
      "notes": "The Archivists will buy any artifact (working or not) at standard price, and will even buy junk/baubles/curiosities if accompanied by a donation. They maintain trained robot-hunter squads armed with sanctioned Tech V/VI weapons."
    },
    "brotherhoodOfThought": {
      "displayName": "Brotherhood of Thought",
      "alternateName": null,
      "playerCharacterEligible": true,
      "concept": "Founded by a legendary true man, Ashintin, on ideals of nonaggression and personal choice/freedom, aiming to unify all intelligent creatures into peaceful coexistence. Loosely organized - members mostly just try to live up to the ideals individually. Weak ties to the Seekers and White Hand; opposes Purists and Friends of Entropy. Wandering groups often try to include one member of each genotype (plants are underrepresented).",
      "traditional": "Will reluctantly use violence to stop violence - will hurt or kill a sentient creature if necessary to prevent greater destruction.",
      "reformed": "Will never strike a sentient creature, even to save their own life; will only try to persuade, never prevent by force.",
      "symbol": "An infinity sign traced in the air or on the forehead.",
      "benefits": "+3 bonus to Charisma in any attribute check made to convince creatures to act peacefully or to calm a heated situation.",
      "restrictions": "Cannot attack creatures except in self-defense or to prevent imminent violence/destruction (within the next few rounds).",
      "experiencePointBonus": "Once per adventure, a member can double the XP they'd normally get for resolving a conflict without combat.",
      "notes": "Better suited as an NPC alliance than a player one - tangible rewards are few. Works best in small mixed-genotype groups. Members favor simple robes; fighters carry axes/quarterstaves, clergy use maces and shields, bishops go unarmed but may wear Tech IV/V armor."
    },
    "theCreated": {
      "displayName": "The Created",
      "alternateName": "Machinists",
      "playerCharacterEligible": false,
      "concept": "A rumored (possibly mythical) society of androids/artificial life that believes artificial life (androids, robots, computers) is superior to natural life, aiming for the complete dominance of created life over organic life. Extremely secretive, congregating in hidden enclaves within ancient ruins where they rebuild artifacts.",
      "traditional": "Natural life is inferior but shouldn't be actively harmed/destroyed unless a whole race/significant group poses a threat.",
      "reformed": "Views all natural sentient life as a threat to their supremacy and destroys it whenever possible, though logic may occasionally spare an individual for a greater plot.",
      "symbol": "A clenched fist, raised shoulder-high, used as a salute.",
      "benefits": "Computers and robots always react positively toward members.",
      "restrictions": "NOT open to player characters. Members must always place the group's needs above their own or any individual's welfare/life.",
      "experiencePointBonus": "Not applicable - not a player-eligible alliance.",
      "notes": "Only androids/robots can belong; members act on pure logic and cannot understand emotion or personal need. Rumored to secretly run automated manufacturing plants and covertly trade technology. Strongest rumored lead is the unexplored city of Datun in the Wild Lands."
    },
    "followersOfTheVoice": {
      "displayName": "Followers of the Voice",
      "alternateName": "Programmers",
      "playerCharacterEligible": true,
      "concept": "Believe the world was created by a computer and worship any ancient computer they find as a minor deity, always searching for the 'creator computer.' Secretive about their existence; secret bases tend to be in ancient ruins near old computer installations, often well-equipped with artifacts.",
      "traditional": "Anything a computer says/communicates is literal truth, to be obeyed instantly and precisely, even unto death.",
      "reformed": "Interprets the computer god's old messages in light of current social conditions rather than taking them literally.",
      "symbol": "A computer chip or a disk, frequently tattooed in places not visible in public.",
      "benefits": "+3 Robot Recognition bonus when dealing with computers or trying to extract information from/program them.",
      "restrictions": "Must obey the instructions of any computer encountered (with some interpretive latitude). Once a year must contact an active computer and ask for a quest/instructions. Forbidden from destroying a computer or clearly computer-controlled property.",
      "experiencePointBonus": "100 xp x current level per adventure for obeying a computer's orders, if one was encountered that adventure (GM should be lenient interpreting requests).",
      "notes": "Tends to associate with Archivists and the Created; opposed by most other alliances, especially Restorationists. Typical members are idealistic middle-class craftsmen/businessmen who see computers as the ultimate incorruptible authority."
    },
    "healers": {
      "displayName": "Healers",
      "alternateName": "The White Hand",
      "playerCharacterEligible": true,
      "concept": "A monastic healing order founded shortly after the cataclysm, dedicated to treating the sick and injured of any race, alliance, or sentience level. Some run hospitals; others wander healing all who cross their path, rarely carrying valuable artifacts for fear of theft.",
      "traditional": "Will help any creature, sentient or not, risking life and limb - so long as there's a real chance of successfully treating the patient (won't recklessly die for a hopeless case).",
      "reformed": "Often demands payment for services, though will still do occasional charity work; tends to help nonsentient creatures only occasionally.",
      "symbol": "The outstretched hand and the caduceus, usually painted on belongings, especially healing equipment.",
      "benefits": "Starts with a Medikit V. Can bandage a character in half the normal time. A patient under a Healer's constant supervision heals at twice the normal resting rate (2 pts/day). Cannot accelerate regenerated healing.",
      "restrictions": "Must try to bandage/heal any wounded or sick sentient creature encountered (a hopeless case can instead be humanely put out of its misery). Not required to risk life/safety to heal.",
      "experiencePointBonus": "100 xp x current level once per adventure for healing a sentient creature/character outside the party (insignificant animals don't count).",
      "notes": "Can still fight and kill if necessary, but must avoid killing when possible and tend enemy wounds once a threat has passed, if it's safe to do so. Alliance hospitals sell a fresh Medikit V to members at half price."
    },
    "ironSociety": {
      "displayName": "The Iron Society",
      "alternateName": null,
      "playerCharacterEligible": true,
      "genotypeRestriction": "Altered Humans only",
      "concept": "A militant mutant-supremacist alliance formed in reaction to the Knights of Genetic Purity's persecution of altered humans; believes altered humans are genetically destined to replace Homo sapiens. Extremely secretive, with an internal telepathic enforcement/counter-intelligence arm (the Thought Police) that hunts down traitors. Has warred with the Purists for over a century - Purists have the tech advantage, the Iron Society has the mutation advantage.",
      "traditional": "Hunts down and destroys all true men, actively working to eliminate pure strain humans. (Player characters are NOT allowed to take this view.)",
      "reformed": "Despises only the Knights of Genetic Purity specifically, not all true men (who are merely seen as inferior); works to promote altered humans' condition generally. (Player character members must take this view.)",
      "symbol": "A hammer in a circle; also minted onto an identifying coin passed between members.",
      "benefits": "Can buy a Tech IV or Tech V weapon from the alliance at 50% cost, but only as part of a plot against the Knights of Genetic Purity or another significant threat to mutantkind (GM rolls once on the Tech V and Tech VI weapon loot tables and offers a choice of the results; only one purchase).",
      "restrictions": "Must actively stop any threat to mutants, particularly Knights of Genetic Purity activity, and generally promote the condition of mutantkind.",
      "experiencePointBonus": "100 xp x current level per adventure for preventing a serious threat to mutants/mutantkind or causing the Knights of Genetic Purity significant trouble - must be a stature-appropriate, personally risky or clever action, not a minor one (GM's judgment).",
      "notes": "A powerful but internally divided alliance - traditionalists and reformists sometimes fight each other as fiercely as their common enemy. Members tend to be rigid extremists willing to die for the cause."
    },
    "knightsOfGeneticPurity": {
      "displayName": "Knights of Genetic Purity",
      "alternateName": "Purists",
      "playerCharacterEligible": false,
      "genotypeRestriction": "True (pure strain) men only",
      "concept": "A fear-and-hatred-driven alliance focused on exterminating altered humans, blaming them for the world's ills; largely indifferent to sentient animals/plants. Universally despised by other alliances for their genocidal creed. Well-equipped, having seized an ancient installation at New Waskum early in their history; frequently raid towns/villages hunting altered humans.",
      "traditional": "Zealously hunts mutants to kill, believing their purpose is to wipe out the altered human population.",
      "reformed": "Believes mutants will die out naturally due to inherent weakness; tends to enslave rather than kill them.",
      "symbol": "A red square with an unbalanced scale, prominently displayed.",
      "benefits": "Each member carries a fully functional weapon artifact; blasters are a particular favorite.",
      "restrictions": "NOT open to player characters. Designed as an NPC antagonist faction specifically opposed to mutant player characters.",
      "experiencePointBonus": "Not applicable - not a player-eligible alliance.",
      "notes": "There is a secret underground movement within Bastion (the Knights' home city) among true men whose own children have mutated, aiming to overthrow the Knights and peacefully heal genetic deviation instead."
    },
    "peaceBrigade": {
      "displayName": "Peace Brigade",
      "alternateName": null,
      "playerCharacterEligible": true,
      "concept": "A splinter group from the Restorationists focused on preserving and improving civilization at the village/town level, by force of 'help' if necessary. Offers to educate and improve public works/defenses for remote villages in exchange for a tax; if a village refuses, the Brigade may move in and do the work anyway, leveling and rebuilding as they see fit, then returns yearly to collect a (higher) tax.",
      "traditional": "Prefers to persuade societies that progress is good and is willing to wait a generation for minds to change.",
      "reformed": "Zealous about quality-of-life and defense, sometimes removing all local predators or forcing people into underground dwellings as 'ultimate' defensible housing - takes protection to extremes.",
      "symbol": "A crossed shovel and sword on a blue field, emblazoned on member equipment and structures they leave behind.",
      "benefits": "Members start the game with a set of building tools and construction knowledge; anything they build with it is guaranteed structurally sound (though no faster or cheaper), limited to small/medium building projects with simple mechanical operations.",
      "restrictions": "Cannot be a member of any army/military force, nor assist one, especially one besieging a town (may still help defend a village, but without formally joining/taking orders/uniform/pay).",
      "experiencePointBonus": "100 xp x current level, once per adventure, for successfully introducing a superior way of living or improving a village/town/clan's defenses - must be something of lasting value, not just defeating a monster of the moment.",
      "notes": "Members are certain they know best; well-intentioned but sometimes destructive in method, and nearly impossible to dissuade once they've decided to fortify a town."
    },
    "radioactivists": {
      "displayName": "The Radioactivists",
      "alternateName": null,
      "playerCharacterEligible": true,
      "concept": "A fringe cult believing in 'divine radiant glory' - members deliberately expose themselves to radiation repeatedly, hoping for beneficial mutation; those who mutate well are considered blessed, defects are seen as punishment for transgressions. Mostly altered humans plus some mutated animals; keeps membership secret and tends to live/work near hazardous radiation sources. A rumored, nearly-unrecognizable mutant supreme leader is said to direct the alliance toward its (poorly understood) goal of spreading radioactivity worldwide.",
      "traditional": "Wants to establish public shrines at existing radioactive sites for worshippers to visit, without spreading contamination further.",
      "reformed": "Actively wants to increase global radiation levels; practices a crude form of fortune-telling by irradiating captured creatures and reading the outcome (death = bad omen, survival = good, mutation = favor).",
      "symbol": "The triple triangle, in yellow, orange, or red, hidden on clothing/belongings.",
      "benefits": "Character gets two extra mutations (one physical, one mental) - these CAN be defects even if the character already has a defect of that type.",
      "restrictions": "Must keep alliance membership secret, even from other alliance members. Not mandatory, but should try to expose themselves to radiation whenever they find it; gets double the exposure amount if it results in even a defect mutation.",
      "experiencePointBonus": "100 xp x current level if the character voluntarily exposes themself to enough radiation to cause harm at least once during the adventure (doubled if it also causes a mutation, even a defect).",
      "notes": "Since exact membership is hard to keep secret from fellow members (who can count a character's mutations and guess), a character may want two mutations kept deliberately unrevealed as their 'secret' badge rather than needing new ones. Typical members are poor, downtrodden, resentful of wealth/status."
    },
    "ranksOfTheFit": {
      "displayName": "The Ranks of the Fit",
      "alternateName": "Bonapartists",
      "playerCharacterEligible": true,
      "concept": "A militaristic alliance founded by the mutated bear 'Emperor Napoleon I,' who once conquered vast territories; now several cities are each ruled by a Bonapartist supreme high commander vying to reunite the ranks. Creed holds that animals are naturally superior to other life forms, subjugation of 'inferior' races is necessary, and the military is paramount. Anyone can join, but only animals may hold rank of major or above (rarely insects/lizards/birds; mostly mammals).",
      "traditional": "Many hate humans outright.",
      "reformed": "Wants to conquer the world in order to establish a government where military and civilian elements rule equally (animals still predestined to run the military half).",
      "symbol": "Tricorner hats for uniformed military; secret operatives carry a stylized dagger-through-triangle symbol.",
      "benefits": "Enforcers get +3 Combat Leadership bonus. All character classes add +3 to the morale rating of anyone they're leading. A Bonapartist's troops hold greater loyalty/courage while he's present (bonus doesn't apply when leading other PCs).",
      "restrictions": "Must belong to an army or military organization at all times; if ousted from one, must immediately seek to join another.",
      "experiencePointBonus": "100 xp x current level once per adventure for participating in an NPC-involving military action (guerrilla actions involving only PCs don't count).",
      "notes": "Bonapartists default to military solutions to problems (blockades, sieges, raids) and see mutated animals as naturally superior to other sentient races - not necessarily malicious, just how they see the world."
    },
    "restorationists": {
      "displayName": "Restorationists",
      "alternateName": null,
      "playerCharacterEligible": true,
      "concept": "Primarily pure strain and altered humans (any sentient welcome) dedicated to recovering ancient technology and restoring Gamma Terra to its pre-cataclysm state. Holds vast stores of information from distant ancient sites and influences many large towns; hires mercenaries aggressively to recover artifacts/knowledge but won't attack without provocation.",
      "traditional": "Believes complete dominance of an area is necessary to secure and restore it; the technology of the ancients must be used to control the populace if progress is to be made.",
      "reformed": "Believes society must be restored by peaceable means, even advocating treaties with groups like the Seekers or Knights of Genetic Purity.",
      "symbol": "A rising sun over the ocean, usually flown on flags rather than carried personally.",
      "benefits": "10% discount on artifacts purchased from the alliance. Once per adventure can request a free repair (if the repair would further alliance goals, provably) or free analysis of an artifact (assume the alliance's Use Artifacts skill is 10 for this, auto-solving complexity <=12 items; full analysis takes a week).",
      "restrictions": "Not allowed to destroy pre-cataclysm information (books, tapes, computer files, etc.) under any circumstances, even if it would fall into hostile hands.",
      "experiencePointBonus": "100 xp x current level once per adventure for retrieving significant ancient information and turning it over to a Restorationist center (trivial/useless bits don't count).",
      "notes": "Restorationists buy and sell artifacts (even broken junk, for spare parts), paying at least 10% under actual value depending on condition; they will only evaluate/repair equipment for alliance members."
    },
    "seekers": {
      "displayName": "Seekers",
      "alternateName": "New Dawn",
      "playerCharacterEligible": false,
      "concept": "An anti-technology alliance that blames advanced machines/technology for the cataclysm. Lives in small-to-medium agricultural communities, refusing any powered tool or machine, favoring animal-drawn carts, oil lamps, and wind/water power. Considers true men and altered humans the only 'true races'; treats animals/plants respectfully but as inferior second-class servants with no voice in community decisions. Friendly only with the Brotherhood of Thought; actively hates Restorationists, Programmers, and Archivists.",
      "traditional": "Maintains a lengthy, detailed list of permitted/forbidden machines and actively seeks out and destroys any machine on the forbidden list.",
      "reformed": "Uses an elaborate testing system to judge whether a given machine is 'too advanced' rather than a fixed list; broadly, anything electric or otherwise powered is taboo.",
      "symbol": "A wheat stalk against an oval, placed on buildings rather than carried.",
      "benefits": "None.",
      "restrictions": "NOT open to player characters.",
      "experiencePointBonus": "Not applicable - not a player-eligible alliance.",
      "notes": "Despite rejecting artifacts, Seekers are not defenseless - they keep cannons and flintlocks, and members with powerful mutations can capably defend home and family. A militant splinter faction is emerging that wants to actively hunt and destroy artifacts everywhere, even ones owned peacefully by outsiders."
    },
    "zoopremists": {
      "displayName": "Zoopremists",
      "alternateName": null,
      "playerCharacterEligible": true,
      "concept": "Originally dedicated to serving all sentient animal species as a common, freely-mingling society; has since splintered into two factions, neither following the original creed. Current Zoopremists believe thinking beasts are the rightful heirs of the world, superior to humans (including altered humans, whom they don't wish to kill, merely subjugate as servants); sentient plants are considered irrelevant. Attracts many young animals, though most leave upon reaching adulthood - those who stay tend to become alliance leadership.",
      "left": "Leftist Zoopremists have formed a secret society devoted to destroying anything/anybody standing in the way of new animal supremacy, wholly embracing terrorism.",
      "right": "Rightist Zoopremists are militant animal-rights activists interested in furthering animals' role in the new world; not a terrorist organization, don't advertise, but don't go out of their way to hide their alliance either.",
      "symbol": "A bull's head; members also use a secret hand sign (thumb and forefinger curled to look like an animal's horns).",
      "benefits": "Skilled at making and using bombs that function like high-explosive grenades/warheads. Damage/radius scale with the Zoopremist's level (see table: Level 1-2 = 3d4 dmg/5m radius/100 domars in components; 3-4 = 3d6/10m/250; 5-6 = 3d8/15m/500; 7-8 = 3d10/20m/1000; 9+ = 3d12/25m/2500). Bombs are lit-fuse (up to 10m fuse length); take 4 hours to pack and prepare the fuse, 10 minutes to place properly.",
      "restrictions": "Must avenge any threat or discrimination against animals; must generally promote the condition of animals wherever possible, and specifically try to stop/discredit the Ranks of the Fit (whom the Zoopremists secretly oppose).",
      "experiencePointBonus": "100 xp x current level per adventure for thwarting a serious threat to mutated animals, causing the Ranks of the Fit trouble, or otherwise significantly aiding mutated animals - must be stature-appropriate, GM's judgment.",
      "notes": "Can be disruptive as player characters; GM may want to restrict them to an NPC-only alliance depending on the group."
    }
  }
};
})(typeof window !== 'undefined' ? window : global);
