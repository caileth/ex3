$(function() {
	var GEAR_DATABASE, NAMES_DATABASE,
		DECISIVE_MISS_PENALTY_HIGH = 3,
		DECISIVE_MISS_PENALTY_LOW = 2,
		DECISIVE_MISS_PENALTY_THRESHOLD = 10,
		DEFAULT_DIE_SIDE = 10,
		DEFAULT_DOUBLES = 10,
		DEFAULT_HEALTH_TRACK = ['-0', '-1', '-2', '-4', 'Incapacitated'],
		DEFAULT_NUM_DICE = 5,
		DEFAULT_TARGET = 7,
		INITIATIVE_BREAK_BONUS = 5,
		INITIATIVE_RESET_TURNS = 3,
		INITIATIVE_RESET_VALUE = 3,
		GLYPH_EMPTY = '&#9711;',
		GLYPH_AGG = '&#10036;',
		GLYPH_LETHAL = '&#215;',
		GLYPH_BASHING = '&#8260;',
		JB_DIFFICULTY = 0,
		JB_DOUBLES = false,
		JB_EXTRA_SUX = 3,
		JB_TARGET = 7,
		WITHERING_PENALTY_INITIATIVE = 15,
		WOUND_PENALTY_BRUISED = 0,
		WOUND_PENALTY_INJURED = -1,
		WOUND_PENALTY_WOUNDED = -2,
		WOUND_PENALTY_MAIMED = -4,
		attackWindow = '<label for="opponents">Target:</label>' +
			'<select id="opponents"></select><br/>' +
			'<label for="attackIsDecisive">Attack Type:</label>' +
			'<input type="radio" name="attackIsDecisive" id="withering" value="false">Withering' +
			'<input type="radio" name="attackIsDecisive" id="decisive" value="true">Decisive<br/>' +
			'<label for="attackStunt">Attacking Stunt:</label>' +
			'<input type="radio" name="attackStunt" value="0"/>None' +
			'<input type="radio" name="attackStunt" value="1"/>1-point' +
			'<input type="radio" name="attackStunt" value="2"/>2-point' +
			'<input type="radio" name="attackStunt" value="3"/>3-point<br/>' +
			'<label for="defendStunt">Defending Stunt:</label>' +
			'<input type="radio" name="defendStunt" value="0"/>None' +
			'<input type="radio" name="defendStunt" value="1"/>1-point' +
			'<input type="radio" name="defendStunt" value="2"/>2-point' +
			'<input type="radio" name="defendStunt" value="3"/>3-point<br/>' +
			'<label for="attackModifiers">Attack modifier(s): ' +
			'<input type="number" id="attackModifiers" value="0" min="-5" max="0"/>',
		combatants = new Array(),
		combatantsCount = 0,
		dialog = $("#dialog"),
		dialogForm = $("#dialog-form"),
		dialogFormInputs = $("#dialog-form :input"),
		dialogFormNumbers = $("#dialog-form :input[type=number] :not(#initiative)"),
		guid = (function(){function s4(){return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);}return function(){return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();};})(),
		joinBattleButton = $("#joinBattle"),
		pendingAttacks = new Array(),
		resultsWindow = $("#results"),
		rollButton = $("#roll"),
		round = 0,
		statsWindow = '<input type="text" id="name" placeholder="New Player" autofocus/>' +
			'<input type="button" class="randomize"/>' +
			'<input type="button" class="twink"/><br/>' +
			'<label for="strength">Strength: </label><input type="number" id="strength" value="1" min="1" max="5"/><br/>' +
			'<label for="dexterity">Dexterity: </label><input type="number" id="dexterity" value="1" min="1" max="5"/><br/>' +
			'<label for="stamina">Stamina: </label><input type="number" id="stamina" value="1" min="1" max="5"/><br/>' +
			'<label for="wits">Wits: </label><input type="number" id="wits" value="1" min="1" max="5"/><br/>' +
			'<label for="athletics">Athletics: </label><input type="number" id="athletics" value="0" min="0" max="5"/><br/>' +
			'<label for="awareness">Awareness: </label><input type="number" id="awareness" value="0" min="0" max="5"/><br/>' +
			'<label for="dodge">Dodge: </label><input type="number" id="dodge" value="0" min="0" max="5"/><br/>' +
			'<label for="combat">Combat Ability: </label><input type="number" id="combat" value="0" min="0" max="5"/><br/>' +
			'<label for="weaponPicker">Weapon: </label><select id="weaponPicker">' +
			'<option value="weapon.mortal.light">Unarmed</option>' +
			'<option value="weapon.mortal.light">Light Mortal Weapon</option>' +
			'<option value="weapon.mortal.medium">Medium Mortal Weapon</option>' +
			'<option value="weapon.mortal.heavy">Heavy Mortal Weapon</option>' +
			'<option value="weapon.artifact.light">Light Artifact Weapon</option>' +
			'<option value="weapon.artifact.medium">Medium Artifact Weapon</option>' +
			'<option value="weapon.artifact.heavy">Heavy Artifact Weapon</option></select><br/>' +
			'<label for="armorPicker">Armor: </label><select id="armorPicker">' +
			'<option value="armor.none.unarmored">Unarmored</option>' +
			'<option value="armor.mortal.light">Light Mortal Armor</option>' +
			'<option value="armor.mortal.medium">Medium Mortal Armor</option>' +
			'<option value="armor.mortal.heavy">Heavy Mortal Armor</option>' +
			'<option value="armor.artifact.light">Light Artifact Armor</option>' +
			'<option value="armor.artifact.medium">Medium Artifact Armor</option>' +
			'<option value="armor.artifact.heavy">Heavy Artifact Armor</option></select><br/>' +
			'<label for="accuracy">Weapon Accuracy: </label><input type="number" id="accuracy" value="4" min="0" max="5"/><br/>' +
			'<label for="damage">Weapon Damage: </label><input type="number" id="damage" value="7" min="7" max="14"/>' +
			'<input type="checkbox" id="doesLethal"/><label for="doesLethal"> Lethal?</label><br/>' +
			'<label for="overwhelming">Weapon Overwhelming: </label><input type="number" id="overwhelming" value="0" min="-1" max="4"/><br/>' +
			'<label for="defense">Weapon Defense: </label><input type="number" id="defense" value="0" min="-1" max="1"/><br/>' +
			'<label for="armor">Armor Soak: </label><input type="number" id="armor" value="0" min="0" max="12"/><br/>' +
			'<label for="hardness">Armor Hardness: </label><input type="number" id="hardness" value="0" min="0" max="10"/><br/>' +
			'<label for="mobility">Mobility Penalty: </label><input type="number" id="mobility" value="0" min="-2" max="0"/>';

	$.getJSON('./includes/exaltedgear.json', function(data) {
		// exaltedgear.json syntax:
		// "GEAR_DATABASE" : {
		//   "weapon" : { "mortal/artifact" : { "weight" : [accuracy, damage, overwhelming, defense] } },
		//   "armor" : { "mortal/artifact" : { "weight" : [soak, hardness, mobility penalty] } }
		// }

		GEAR_DATABASE = data;
	});

	$.getJSON('./includes/exaltedname.json', function(data) {
		// exaltedname.json syntax:
		// (only two locales at the moment are "imperial" and "threshold")
		// "NAMES_DATABASE" : {
		//   "locale" : {
		//     "templates" : { "template" : [wordgroup, wordgroup, wordgroup, ...] }
		//     "words" : { "wordgroup" : [word, word, word, ...] }
		//   },
		//   "locale" : {...},
		//   ...
		// }

		NAMES_DATABASE = data;
	});

	// selector refresh mini-plugin by Esailija @ Stack Overflow (http://goo.gl/U1YyEm)
	$.fn.refresh = function() {
	    var elems = $(this.selector);
	    this.splice(0, this.length);
	    this.push.apply(this, elems);
	    return this;
	};









	function Combatant() {
		this.id = guid();
		this.initiative = 0;
		this.active = true;

		this.crashedAndWithered = false;
		this.turnsInCrash = 0;
		this.onslaught = 0;

		this.bashing	= 0;
		this.lethal		= 0;
		this.aggravated = 0;

		this.healthTrack = [
			[0],	// -0 bruised
			[0,0],	// -1 injured
			[0,0],	// -2 wounded
			[0],	// -4 maimed
			[0]		// incapacitated
		];

		this.getHealthTrackHTML = function() {
			var result = '';
			for (var i = 0; i < this.healthTrack.length; i++) {
				var track = this.healthTrack[i];
				result += DEFAULT_HEALTH_TRACK[i]+':';
				for (var j = 0; j < track.length; j++) {
					switch (track[j]) {
						case 0:
							result += GLYPH_EMPTY;
							break;
						case 1:
							result += GLYPH_BASHING;
							break;
						case 2:
							result += GLYPH_LETHAL;
							break;
						case 3:
							result += GLYPH_AGG;
							break;
					}
				}
				result += ' ';
			}
			return result;
		}
		this.getName = function() {
			return this.name;
		};
		this.getDamage = function() {
			return this.strength + this.damage;
		};
		this.getJoinBattlePool = function() {
			var pool = this.awareness + this.wits;
				console.log("Join Battle pool:",pool);

			return pool;
		};
		this.getWitheringPool = function() {
			return this.dexterity + this.combat + this.accuracy;
		};
		this.getDecisivePool = function() {
			return this.dexterity + this.combat;
		};
		this.getParryPool = function() {
			return Math.ceil((this.dexterity + this.combat) / 2) + this.defense;
		};
		this.getEvasionPool = function() {
			return Math.ceil((this.dexterity + this.dodge) / 2) + this.mobility;
		};
		this.getDefense = function() {
			if (isNaN(this.getWoundPenalty())) return 0;
			else return Math.max(this.getParryPool(), this.getEvasionPool()) - this.onslaught;
		}
		this.getRushPool = function() {
			return this.dexterity + this.athletics;
		};
		this.getDisengagePool = function() {
			return this.dexterity + this.dodge;
		};
		this.getSoak = function() {
			return this.stamina + this.armor;
		};
		this.joinBattle = function() {
			console.groupCollapsed(this.name,"joins battle");

			var pool = this.getJoinBattlePool(),
				roll = diceRoller(pool, DEFAULT_DIE_SIDE),
				suxx = Math.max(successChecker(roll, JB_TARGET, JB_DOUBLES), 0),
				initiative = suxx + JB_EXTRA_SUX;
			
			console.log("JB sux:",suxx);
			console.log("JB initiative:",initiative);
			console.groupEnd();

			return initiative;
		};
		this.resetHealthTrack = function() {
			console.log("resetting health track");
			for (i in this.healthTrack) {
				for (j in this.healthTrack[i]) {
					this.healthTrack[i][j] = 0;
				}
			}
		};
		this.recordDamage = function() {
			console.groupCollapsed("Record Damage");

			var lastHLTrackPos = this.healthTrack.length - 1,
				lastHLPos = this.healthTrack[lastHLTrackPos].length - 1,
				pending = new Array(),
				wound;

			pending[1] = this.bashing,
			pending[2] = this.lethal,
			pending[3] = this.aggravated;

			console.log(pending);

			this.resetHealthTrack();

			doDamage(pending, 3, 0, this.healthTrack);
			doDamage(pending, 2, 0, this.healthTrack);
			doDamage(pending, 1, 0, this.healthTrack);

			if (this.healthTrack[lastHLTrackPos][lastHLPos] === 1) doDamage(pending, 1, 1, this.healthTrack);

			wound = this.getWoundPenalty();

			if (isNaN(wound)) this.active = false;

			if (wound === 'incapacitated') resultsWindow.append(this.name + " is Incapacitated!\n");
			if (wound === 'dead') resultsWindow.append(this.name + " is DEAD!\n");

			console.groupEnd();

			function doDamage(type, level, replacementLevel, healthTrack) {
				console.groupCollapsed("Do Damage",type,level,replacementLevel);
				for (i in healthTrack) {
					var track = healthTrack[i];
					for (j in track) {
						console.log("cursor at healthTrack["+i+"]["+j+"]: "+track[j]);
						if (track[j] === replacementLevel && type[level] > 0) {
							console.log("wound at target level detected,",type[level],"damage to go");
							if (level === replacementLevel) track[j] = replacementLevel + 1;
							else track[j] = level;
							type[level]--;
							console.log("done.",type[level]," to go");
						}
					}
				}
				console.groupEnd();
			}
		}
		this.getWoundPenalty = function() {
			var lastNonEmpty = findLastGreaterThan(this.healthTrack, 0),
				result;

			if (!lastNonEmpty) result = 0;
			else if (lastNonEmpty.track === 0) result = WOUND_PENALTY_BRUISED;
			else if (lastNonEmpty.track === 1) result = WOUND_PENALTY_INJURED;
			else if (lastNonEmpty.track === 2) result = WOUND_PENALTY_WOUNDED;
			else if (lastNonEmpty.track === 3) result = WOUND_PENALTY_MAIMED;
			else if (lastNonEmpty.track === 4 && lastNonEmpty.level > 1) result = "dead";
			else result = "incapacitated";

			console.log("Wound Penalty for",this.name,"is",result);

			return result;

			function findLastGreaterThan(array, value) {
				for (var i = array.length - 1; i >= 0; i--) {
					for (var j = array[i].length - 1; j >= 0; j--) {
						if (array[i][j] > value) {
							var result = {"track" : i, "wound" : j, "level" : array[i][j]};
							console.log("found last wound:",result);
							return result;
						}
					}
				}
				return false;
			}
		};
	}









	function PendingAttack(tick, attacker, defender, attackModifiers, attackStunt, defendStunt, isDecisive) {
		this.tick				= tick;
		this.tiebreaker			= Math.random();
		this.attacker			= attacker;
		this.defender			= defender;
		this.attackModifiers	= attackModifiers;
		this.attackStunt		= attackStunt;
		this.defendStunt		= defendStunt;
		this.isDecisive			= isDecisive;
	}









	$("body").on("click", ".edit, #addCombatant", function() {
		console.groupCollapsed("Adding or editing");

		dialogForm.html(statsWindow);console.log("Populating dialogbox");

		var addButtons, editButtons,
			edit = false,
			id = $(this).parent().attr("id");

		if ($(this).attr("class") === "edit") edit = true;console.log("Edit?",edit);

		if (edit) {
			dialogForm.append('<br/><label for="initiative">Initiative: </label><input type="number" id="initiative" value="0"/>');
			getStats(id);
		}

		dialog.dialog({
			title: (edit ? "Edit combatant" : "Add combatant"),
			autoOpen: false,
			height: "auto",
			width: "auto",
			modal: true,
			close: (edit ? editClose : addClose)});

		if (edit) {
			dialog.dialog("option", "buttons", [
				{ text: "Edit combatant", click: editCombatant },
				{ text: "Cancel", click: function() {
					dialog.dialog("close");
				}}]);
		} else {
			dialog.dialog("option", "buttons", [
				{ text: "Add combatant", click: addCombatant },
				{ text: "Cancel", click: function() {
					dialog.dialog("close");
				}}]);
		}

		dialog.dialog("open");

		console.groupEnd();

		function editCombatant() {
			console.groupCollapsed("editCombatant");

			recordStats(id);
			doRound();
			dialog.dialog("close");console.log("closing dialog");

			console.groupEnd();
		}
	});

	$("body").on( "click", ".attack", function() {
		if (combatants.length > 1) {	
			dialogForm.html(attackWindow);

			var attackForm,
				id = $(this).parent().attr("id"),
				lookup = lookupByID(combatants);
	
			attackForm = dialogForm.on("submit", function(event) {
				event.preventDefault();
				attack(id, $("#opponents option:selected").val());
			});
	
			dialog.dialog({
				title: "Attack",
				autoOpen: false,
				height: "auto",
				width: "auto",
				modal: true,
				buttons: {
					Attack: function() {
						attack(id, $("#opponents option:selected").val());
					},
					Cancel: function() {
						dialog.dialog("close");
					}
				},
				close: function() {
					attackForm[0].reset();
				}
			});
	
			populateTargetList(id);
	
			if (lookup[id].initiative < 1) $("#decisive").prop('disabled', true);
	
			dialog.dialog("open");
		} else console.log("There's nobody to attack!");
	});

	$("body").on('click', '.randomize', function() {
		randomNameGenerator(NAMES_DATABASE);
		randomStatsGenerator();
	});

	$("body").on('click', '.twink', function() {
		twinkNameGenerator();
		twinkStatsGenerator();
	});

	$("body").on('click', '.remove', function() {
		console.groupCollapsed("remove");

		var id = $(this).parent().attr("id");

		for (var i in combatants) {
			if (combatants[i].id === id) {
				combatants.splice(i,1);
				combatantsCount--;
			}
		}

		doRound();
		console.groupEnd();
	});

	$(document).on('change', '#armorPicker, #weaponPicker', function() {
		doPickerStats();
	});

	$(joinBattleButton).click(function() {
		console.groupCollapsed("joinBattle clicked");
		console.log(combatantsCount,"combatants");
		if(combatantsCount > 1) {
			resultsWindow.append("\n---\n");
			for (i in combatants) {
				var joinBattlePool = combatants[i].getJoinBattlePool(),
					joinBattleRoll = diceRoller(joinBattlePool, DEFAULT_DIE_SIDE),
					joinBattleSuxx = Math.max(successChecker(joinBattleRoll, JB_TARGET, JB_DOUBLES), 0);
				combatants[i].initiative = joinBattleSuxx + JB_EXTRA_SUX;
				resultsWindow.append(combatants[i].name + " joins battle at initiative " + combatants[i].initiative + "\n");
			}
			scrollToBottom();
			doRound();
		} else {
			resultsWindow.append("\nNot enough combatants!");
		}
		console.groupEnd();
	});

	$(rollButton).click(function() {		
		var difficulty = $("#difficulty").val(),
			doubleRule = $("input[name=doubleRule]:checked").val(),
			numDice = $("#numDice").val(),
			targetNumber = $("#targetNumber").val();

		printRoll(numDice, DEFAULT_DIE_SIDE, targetNumber, doubleRule, difficulty);
	});









	function attack(id, target) {
		var lookup		= lookupByID(combatants),
			attacker	= lookup[id],
			defender	= lookup[target];

		var attackIsDecisive	= $("input[name=attackIsDecisive]:checked").val() == "true",
			attackModifiers		= parseInt($("#attackModifiers").val()),
			attackStunt			= parseInt($("input[name=attackStunt]:checked").val()),
			attackWound			= attacker.getWoundPenalty();
			defendStunt			= parseInt($("input[name=defendStunt]:checked").val());

		attackStunt = stunt(attackStunt);
		defendStunt = stunt(defendStunt);

		console.groupCollapsed(attacker.name,"attacks",defender.name,"!");

		// add in attacker wound penalties if applicable (otherwise this function probably shouldn't be called in the first place)
		if (!isNaN(attackWound)) attackModifiers += attackWound;

		if (attacker.initiative === defender.initiative) {
			pendingAttacks[pendingAttacks.length] = new PendingAttack(this.initiative, attacker, defender, attackModifiers, attackStunt, defendStunt, attackIsDecisive);
		} else {
			resolveAttack(attacker, defender, attackModifiers, attackStunt, defendStunt, attackIsDecisive);
		}

		attacker.active = false;
		defender.onslaught++;

		console.groupEnd();

		dialog.dialog("close");
		doRound();
	}

	function resolveAttack(attacker, defender, attackModifiers, attackStunt, defendStunt, isDecisive) {
		var attackAuto = attackStunt.auto, // presumably will add Charm hooks here eventually
			attackPool = attackModifiers + attackStunt.dice,
			targetDefense = defender.getDefense() + defendStunt.static;

		if (attackStunt.level > 0) resultsWindow.append(attacker.name + " uses a " + attackStunt.level + "-point stunt!\n");
		if (defendStunt.level > 0) resultsWindow.append(defender.name + " uses a " + defendStunt.level + "-point stunt!\n");

		if (isDecisive) attackPool += attacker.getDecisivePool();
		else attackPool += attacker.getWitheringPool();

		resultsWindow.append(attacker.name + " attempts a " + (isDecisive ? "Decisive" : "Withering") + " Attack (" + attackPool + " dice) against " + defender.name + " (" + targetDefense + " defense)!\n");

		makeAttackRoll(attacker, defender, attackAuto, attackPool, targetDefense, isDecisive);
	}

	function makeAttackRoll(attacker, defender, attackAuto, attackPool, targetDefense, isDecisive) {
		var attackRoll = diceRoller(attackPool, DEFAULT_DIE_SIDE),
			attackSuccesses = successChecker(attackRoll, DEFAULT_TARGET, DEFAULT_DOUBLES, attackAuto),
			attackThreshold = attackSuccesses - Math.max(targetDefense, 0);

		resultsWindow.append(attacker.name + " rolls: " + attackRoll + "\n");

		if (attackThreshold >= 0) {
			resultsWindow.append("Success! " + attackThreshold + " net successes!\n");
			if (isDecisive) checkDecisiveDamage(attacker, defender);
			else checkWitheringDamage(attacker, defender, attackThreshold);
		} else {
			// botch stuff?
			resultsWindow.append("Failure!\n");
			if (isDecisive) {
				var initLoss = (attacker.initiative > DECISIVE_MISS_PENALTY_THRESHOLD ? DECISIVE_MISS_PENALTY_HIGH : DECISIVE_MISS_PENALTY_LOW);
				resultsWindow.append(attacker.name + " fails Decisive attack and loses " + initLoss + " Initiative!\n");
				attacker.initiative -= initLoss;
			}
		}
	}

	function checkWitheringDamage(attacker, defender, attackThreshold) {
		var damagePool = Math.max((attacker.getDamage() + attackThreshold - defender.getSoak()), attacker.overwhelming, 1),
			damageRoll = diceRoller(damagePool),
			damage = Math.max(successChecker(damageRoll),0);
			
		resultsWindow.append("Attacker base damage pool: " + damagePool + "; Defender soak: " + defender.getSoak() + "\n");
		resultsWindow.append(attacker.name + " rolls " + damage + " damage! (" + damageRoll + ")\n");

		if (damage > 0) resolveWitheringDamage(attacker, defender, damage);
	}

	function checkDecisiveDamage(attacker, defender, attackThreshold) {
		var damageRoll = diceRoller(attacker.initiative),
			damage = successChecker(damageRoll, DEFAULT_TARGET, false);

		if (attacker.doesLethal) {
			defender.lethal += damage;
		} else {
			defender.bashing += damage;
		}

		resultsWindow.append(attacker.name + " rolls: " + damageRoll + "\n");
		resultsWindow.append(defender.name + " takes " + damage + " damage!\n");

		defender.recordDamage();

		attacker.initiative = INITIATIVE_RESET_VALUE;
	}

	function resolveWitheringDamage(attacker, defender, damage) {
		var isTargetCrashed,
			wasTargetCrashed = defender.initiative < 1,
			witheringPenalty = attacker.initiative >= WITHERING_PENALTY_INITIATIVE;

		attacker.initiative++;
		resultsWindow.append(attacker.name + " gains an Initiative for a successful Withering Attack.\n");

		if (defender.crashedAndWithered) {
			attacker.initiative += Math.min(1, damage);
			resultsWindow.append(defender.name + " is in Crash and has already been withered. " +
				attacker.name + " gains " + Math.min(1, damage) + " Initiative");
		} else if (witheringPenalty) {
			attacker.initiative += Math.ceil(damage / 2);
			resultsWindow.append(attacker.name + " is over " + WITHERING_PENALTY_INITIATIVE +
				" Initiative and gains only " + Math.ceil(damage / 2) + " from the attack");
		} else {
			attacker.initiative += damage;
			resultsWindow.append(attacker.name + " gains " + damage + " Initiative");
		}
		
		defender.initiative -= damage;
		resultsWindow.append("&mdash;" + defender.name + " loses " + damage + "!\n");

		isTargetCrashed = defender.initiative < 1;
		console.log("is target crashed?",isTargetCrashed);

		if (wasTargetCrashed != isTargetCrashed) {
			attacker.initiative += INITIATIVE_BREAK_BONUS;
			resultsWindow.append(attacker.name+" gains Initiative Break bonus!\n");
		}

		if (isTargetCrashed) defender.crashedAndWithered = true;
	}

	function populateTargetList(id) {
		console.groupCollapsed("populating target list");
		$("#opponents").empty();console.log("clearing out existing entries");
		var lookup = lookupByID(combatants);
		for (i in lookup) {
			if (i != id) {
				console.log("adding id",i);
				$("#opponents").append('<option value="' + i + '">' + lookup[i].name + '</option>');
			} else {
				console.log("skipping",i);
			}
		}
		console.groupEnd();
	}









	function addCombatant() {
		console.groupCollapsed("Adding Combatant");
		combatantsCount++;console.log("combatantsCount is now",combatantsCount);

		var i = combatants.length;

		combatants[i] = new Combatant();
		recordStats(combatants[i].id);
		combatants[i].initiative = combatants[i].joinBattle();

		resultsWindow.append(combatants[i].getName() + " joins battle at tick " + combatants[i].initiative + "\n");
		scrollToBottom();

		doRound();console.groupEnd();

		dialog.dialog("close");
	}

	function editClose() {
		var editCombatantForm = dialogForm.on("submit", function(event) {
			event.preventDefault();
			editCombatant();
		});

		editCombatantForm[0].reset();
	}

	function addClose() {
		var addCombatantForm = dialogForm.on("submit", function(event) {
			event.preventDefault();
			addCombatant();
		});

		addCombatantForm[0].reset();
	}

	function getStats(id) {
		dialogFormInputs.refresh();

		var lookup = lookupByID(combatants);console.log(lookup);

		dialogFormInputs.each(function() {
			var stat = $(this).attr("id"),
				evalStr = "$(this).val(lookup['"+id+"']."+stat+")";
			
			if (stat === "doesLethal") eval("$(this).prop('checked', lookup['"+id+"']."+stat+")");
			
			if (stat === "armorPicker" || stat === "weaponPicker") { /* do nothing */ }
			else if (stat) eval(evalStr);
		});
	}

	function recordStats(id) {
		console.groupCollapsed("record stats",id);

		dialogFormInputs.refresh();

		var lookup = lookupByID(combatants);console.log(lookup);

		console.log("refreshing dialog form inputs selector");
		console.log(dialogFormInputs);

		dialogFormInputs.each(function() {
			var evalStr,
				stat = $(this).attr("id"),
				value = $(this).val();

			if (stat) {
				if (stat === "name") evalStr = "lookup['"+id+"']."+stat+" = '"+value+"'";
				else if (stat === "armorPicker" || stat === "weaponPicker") {
					// do nothing
				} else if (stat === "doesLethal") {
					value = $(this).prop('checked');
					evalStr = "lookup['"+id+"'].doesLethal = '"+value+"'";
				} else evalStr = "lookup['"+id+"']."+stat+" = parseInt("+value+")";

				console.log(stat,value);

				eval(evalStr);
			}
		});

		console.groupEnd();
	}

	function lookupByID(array) {
		var result = {};
		for (var i = 0, len = array.length; i < len; i++) {
			result[array[i].id] = array[i];
		}
		return result;
	}









	function randomStatsGenerator() {
		var armorOptions = $("#armorPicker option"),
			weaponOptions = $("#weaponPicker option"),
			randomArmor = ~~(Math.random() * armorOptions.length),
			randomWeapon = ~~(Math.random() * weaponOptions.length);

		console.groupCollapsed("Stats generator");
		dialogFormNumbers.refresh();
		dialogFormNumbers.each(function(){
			var min = parseInt($(this).attr("min")),
				max = parseInt($(this).attr("max")),
				diff = max - min,
				randomVal = ~~(Math.random() * diff) + min;

			console.log("min:",min);
			console.log("max:",max);
			console.log("diff:",diff);
			console.log("new value:",randomVal);

			$(this).val(randomVal);
		});

		armorOptions.eq(randomArmor).prop('selected', true);
		weaponOptions.eq(randomWeapon).prop('selected', true);
		doPickerStats();

		console.groupEnd();
	}

	function randomNameGenerator(data) {
		console.groupCollapsed("Name generator");
		var localeCount = Object.keys(data).length,
			localeID = ~~(Math.random() * localeCount),
			locale = Object.keys(data)[localeID],
			templateGroupCount = eval("Object.keys(data." + locale + ".templates).length"),
			templateGroupID = ~~(Math.random() * templateGroupCount),
			templateGroup = eval("Object.keys(data." + locale + ".templates)[templateGroupID]"),
			wordGroupsCount = eval("Object.keys(data." + locale + ".words).length"),
			templateCount = eval("Object.keys(data." + locale + ".templates." + templateGroup + ").length"),
			templateID = ~~(Math.random() * templateCount),
			template = eval("data." + locale + ".templates."+templateGroup+"["+templateID+"]"),
			output = "";

		console.log("Locale:",locale);
		console.log("# Template groups:",templateGroupCount);
		console.log("# Word groups:",wordGroupsCount);
		console.log("Template group: #" + templateGroupID + " " + templateGroup);
		console.log("Template:",templateID,template);

		for (var i in template) {
			var wordGroup = eval("data." + locale + ".words."+template[i]),
				numWords = wordGroup.length,
				word = ~~(Math.random() * numWords);
			output += wordGroup[word];
		}
		console.log("Result:",output);

		output = output.trim();

		$("#name").val(output);

		console.groupEnd();
	}

	function twinkNameGenerator() {
		var names = ["Reborn Vermillion Havoc","Chejop Kejak","The Scarlet Empress","The Ebon Dragon","The Unconquered Sun","Invincible Sword Princess","Killfuck Soulshitter","Ma-Ha-Suchi"],
			pick = ~~(Math.random() * names.length);

		$("#name").val(names[pick]);
	}

	function twinkStatsGenerator() {
		var armorOptions = $("#armorPicker option"),
			weaponOptions = $("#weaponPicker option"),
			lastArmor = armorOptions.length - 1,
			lastWeapon = weaponOptions.length - 1;

		dialogFormNumbers.refresh();
		dialogFormNumbers.each(function(){
			$(this).val(parseInt($(this).attr("max")));
		});

		armorOptions.eq(lastArmor).prop('selected', true);
		weaponOptions.eq(lastWeapon).prop('selected', true);
		doPickerStats();
	}









	function doRound() {
		console.groupCollapsed("Do Round");

		if (combatantsCount > 1) {
			var whoseTurn = whoseTurnIsIt();
			console.log(">1 combatant detected. Highest tick is",whoseTurn);

			// 1. set tick to highest active initiative
			// 2. resolve all pending damage at higher initiative than current tick
			// 3. if no actives, resolve all pending damage and reset active status

			if (whoseTurn) {
				resolvePendingAttacks(whoseTurn);
				resultsWindow.append("Tick " + whoseTurn + "\n");
			} else {
				iterateCrashCounter();
				resetActiveStatus();
				resultsWindow.append("Round is over!\n");
				doRound();
			}
		}

		printCombatants();
		scrollToBottom();
		console.groupEnd();
	}

	function iterateCrashCounter() {
		for (i in combatants) {
			if (combatants[i].initiative < 1) combatants[i].turnsInCrash++;
			else combatants[i].turnsInCrash = 0;
		}

		for (j in combatants) {
			if (combatants[j].turnsInCrash >= INITIATIVE_RESET_TURNS) {
				combatants[j].initiative = INITIATIVE_RESET_VALUE;
				combatants[j].turnsInCrash = 0;
				resultsWindow.append(combatants[j].name + " achieves Initiative Reset!\n");
			}
		}
	}

	function resolvePendingAttacks(tick) {
		console.groupCollapsed("resolving pending damage at tick",tick);
		
		pendingAttacks.sort(sortByTiebreaker);

		for (i in pendingAttacks) {
			var attack = pendingAttacks[i];
			if (attack.tick > tick || !tick) {
				resultsWindow.append("Resolving " + attack.attacker.name + "'s attack vs. " + attack.defender.name + "\n");

				var j = clashAttackCheck(tick, attack.attacker);

				if (j) {
					var secondAttack = pendingAttacks[j];
					resolveClashAttack(attack, secondAttack);
				} else if (attack.isDecisive) {
					resolveAttack(attack.attacker, attack.defender, attack.attackModifiers, attack.attackStunt, attack.defendStunt);
				} else {
					resolveAttack(attack.attacker, attack.defender, attack.attackModifiers, attack.attackStunt, attack.defendStunt);
				}

				pendingAttacks.splice(i, 1);
				resolvePendingAttacks(tick);
			}
		}
		console.groupEnd();
	}

	function resolveClashAttack(attack, secondAttack) {
		// resolve clash attack
		var first = attack.attacker,
			second = secondAttack.attacker;
		if (attack.isDecisive && secondAttack.isDecisive) {
			//  both decisive
			var firstAttack		= successChecker(first.getDecisivePool()),
				secondAttack	= successChecker(second.getDecisivePool()),
				result			= firstAttack - secondAttack;

			if (result > 0) {
				// first attack wins

			} else if (result < 0) {
				// second attack wins
			} else {
				// it's a tie, nothing happens
			}
		} else if (!attack.isDecisive && !secondAttack.isDecisive) {
			// both withering
		} else if (attack.isDecisive) {
			// first attack decisive, second withering
		} else {
			// first attack withering, second decisive
		}
	}

	function stunt(level) {
		switch (level) {
			case 1: return {"level": 1, "dice": 2, "successes": 0, "willpower": 0, "static": 1};
			case 2: return {"level": 2, "dice": 2, "successes": 1, "willpower": 1, "static": 2};
			case 3: return {"level": 3, "dice": 2, "successes": 2, "willpower": 2, "static": 3};
			default: return {"level": 0, "dice": 0, "successes": 0, "willpower": 0, "static": 0};
		}
	}

	function clashAttackCheck(tick, attacker) {
		for (i in pendingAttacks) {
			var check = pendingAttacks[i];
			if (check.tick === tick && check.defender === attacker) return i;
		}
		return false;
	}

	function resetActiveStatus() {
		resolvePendingAttacks();

		for (i in combatants) {
			if (isNaN(combatants[i].getWoundPenalty()))	combatants[i].active = false;
			else combatants[i].active = true;
			combatants[i].crashedAndWithered = false;
			combatants[i].onslaught = 0;
		}
	}

	function whoseTurnIsIt() {
		var highestInitiative, currentInitiative;

		for (current in combatants) {
			if (combatants[current].active) {
				currentInitiative = combatants[current].initiative;
				if (!highestInitiative || currentInitiative > highestInitiative) highestInitiative = currentInitiative;
			}
		}

		return highestInitiative;
	}

	function printCombatants() {
		console.groupCollapsed("printCombatants");
		$("tr.playerBubble").remove();console.log("deleting existing player list");

		combatants.sort(sortbyInitiative);

		for (i in combatants) {
			console.log("printing",combatants[i].name);
			var wound = combatants[i].getWoundPenalty();
			$("#combatants > tbody:last").append('<tr class="' + 
				(wound === 'dead' ? 'dead ' : 
					(wound === 'incapacitated' ? 'incapacitated ' :
						(!combatants[i].active ? 'inactive ' :
							(combatants[i].initiative < 1 ? 'crashed ' : '')))) +
				'playerBubble">' + 
				'<td name="' + combatants[i].name + '" id="' + combatants[i].id + '" class="player">' +
				'<span class="initiative">' + combatants[i].initiative + '</span>' +
				'<span class="name">' + combatants[i].name +
				(wound === 'dead' ? ' (DEAD) ' :
					(wound === 'incapacitated' ? ' (Incapacitated) ' : '')) +
				'</span><br/>' +
				'<span class="stats">' +
				'Join Battle: ' + combatants[i].getJoinBattlePool() +
				' &bull; Withering: ' + combatants[i].getWitheringPool() +
				' &bull; Decisive: ' + combatants[i].getDecisivePool() +
				' &bull; Parry: ' + combatants[i].getParryPool() +
				' &bull; Evade: ' + combatants[i].getEvasionPool() +
				' &bull; Rush: ' + combatants[i].getRushPool() +
				' &bull; Disengage: ' + combatants[i].getDisengagePool() +
				'<br/>' +
				'<b>Health:</b> ' + combatants[i].getHealthTrackHTML() +
				'</span><br/>' +
				'<input type="button" class="attack" value="Attack"' + (isNaN(wound) ? ' disabled' : '') +'/>' +
				'<input type="button" class="edit" value="Edit"/>' +
				'<input type="button" class="remove" value="X"/>' +
				'</td></tr>');
		}

		console.log("done printing combatants");

		console.groupEnd();
	}

	function sortbyInitiative(a, b) {
		if (a.active && !b.active) return -1;
		else if (!a.active && b.active) return 1;
		else {
			if (a.initiative > b.initiative) return -1;
			else if (a.initiative < b.initiative) return 1;
			else return 0;
		}
	}

	function sortByTiebreaker(a, b) {
		if (a.tick > b.tick) return -1;
		else if (a.tick < b.tick) return 1;
		else {
			if (a.tiebreaker > b.tiebreaker) return -1;
			else if (a.tiebreaker < b.tiebreaker) return 1;
			else return 0;
		}
	}









	// stole this from someone on Stack Overflow
	function scrollToBottom() {
		resultsWindow.scrollTop(resultsWindow[0].scrollHeight - resultsWindow.height());
	}

	function printRoll(numDice, sides, targetNumber, doubleRule, difficulty) {
		console.groupCollapsed(numDice + "d" + sides + "@" + targetNumber + "; double rule: " + doubleRule);

		var result = diceRoller(numDice, sides),
			successes = successChecker(result, targetNumber, doubleRule),
			threshold = successes - difficulty;

		resultsWindow.append("Rolled: ");
		for (var roll in result) resultsWindow.append(result[roll] + " ");
		if (successes < 0) {
			resultsWindow.append("\n" + "BOTCH!" + "\n");
			console.log('BOTCH at threshold',threshold);
		} else if (threshold < 0) {
			resultsWindow.append("\nFailure! (" + threshold + " success[es].)\n");
			console.log('Failure at threshold',threshold);
		} else if (threshold === 0) {
			resultsWindow.append("\nSuccess! (no threshold successes.)\n");
			console.log('Success at threshold',threshold);
		} else {
			resultsWindow.append("\nSuccess at threshold " + threshold + "!\n");
			console.log('Success at threshold',threshold);
		}

		scrollToBottom();

		console.groupEnd();
	}

	function successChecker(roll, target, doubleRule, auto) {
		var successes, rolledAOne = false;

		if (target === undefined) target = DEFAULT_TARGET;
		if (doubleRule === undefined) doubleRule = DEFAULT_DOUBLES;
		if (auto === undefined) auto = 0;

		console.groupCollapsed("success checker",roll,target,doubleRule,auto);
		
		successes = auto;

		console.log("Automatic successes:",auto);

		for (var die in roll) {
			if (roll[die] >= target) {
				if (doubleRule && roll[die] >= doubleRule) successes++;
				successes++;
			}
			if (roll[die] === 1) rolledAOne = true;
		}

		if (rolledAOne && successes === 0) successes = -1;

		console.log("Total successes:",successes);
		console.groupEnd();
		return successes;
	}

	function diceRoller(numDice, sides) {
		if (numDice === undefined) numDice = DEFAULT_NUM_DICE;
		if (sides === undefined) sides = DEFAULT_DIE_SIDE;

		console.groupCollapsed("Rolling",numDice,sides,"sided dice");

		var result = Array(numDice);

		for (var i = 0; i < numDice; i++) {
			result[i] = dieRoller(sides);
		}

		console.groupEnd();
		return result;
	}

	function dieRoller(sides) {
		console.groupCollapsed("dieRoller");
		if (sides === undefined) sides = DEFAULT_DIE_SIDE;
		var result = ~~(Math.random() * sides) + 1;
		console.log("Rolled a " + result + " on a " + sides + "-sided die");
		console.groupEnd();return result;
	}

	function doPickerStats() {
		console.groupCollapsed("gear picker");
		var armorVal = $("#armorPicker").val(),
			armorStats = eval("GEAR_DATABASE." + armorVal),
			weaponVal = $("#weaponPicker").val(),
			weaponStats = eval("GEAR_DATABASE." + weaponVal);

		$("#armor").val(armorStats[0]);
		$("#hardness").val(armorStats[1]);
		$("#mobility").val(armorStats[2]);
		$("#accuracy").val(weaponStats[0]);
		$("#damage").val(weaponStats[1]);
		$("#doesLethal").prop('checked', weaponStats[4]);
		$("#overwhelming").val(weaponStats[2]);
		$("#defense").val(weaponStats[3]);

		console.log("new value for #weaponPicker is",weaponVal,":",weaponStats);
		console.log("new value for #armorPicker is",armorVal,":",armorStats);
		console.groupEnd();
	}
});