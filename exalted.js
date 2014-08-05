$(function() {
	var GEAR_DATABASE, NAMES_DATABASE,
		DEFAULT_DIE_SIDE = 10,
		DEFAULT_DOUBLES = 10,
		DEFAULT_NUM_DICE = 5,
		DEFAULT_TARGET = 7,
		INITIATIVE_BREAK_BONUS = 5,
		INITIATIVE_RESET_TURNS = 3,
		INITIATIVE_RESET_VALUE = 3,
		JB_DIFFICULTY = 0,
		JB_DOUBLES = false,
		JB_EXTRA_SUX = 3,
		JB_TARGET = 7,
		WITHERING_PENALTY_INITIATIVE = 15,
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
		dialogFormNumbers = $("#dialog-form :input[type=number]"),
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
			'<label for="damage">Weapon Damage: </label><input type="number" id="damage" value="7" min="7" max="14"/><br/>' +
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
		this.initiativePending = 0;
		this.active = true;
		this.crashedAndWithered = false;
		this.turnsInCrash = 0;

		this.getName = function() {
			return this.name;
		}
		this.getDamage = function() {
			return this.strength + this.damage;
		}
		this.getJoinBattlePool = function() {
			return this.awareness + this.wits;
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
		this.getRushPool = function() {
			return this.dexterity + this.athletics;
		};
		this.getDisengagePool = function() {
			return this.dexterity + this.dodge;
		};
		this.getSoak = function() {
			return this.stamina + this.armor;
		}
		this.joinBattle = function() {
			console.groupCollapsed(this.name,"joins battle");
			var pool = this.getJoinBattlePool();console.log("JB pool:",pool);
			var roll = diceRoller(pool, DEFAULT_DIE_SIDE);console.log("JB roll:",pool);
			var suxx = Math.max(successChecker(roll, JB_TARGET, JB_DOUBLES), 0);console.log("JB sux:",suxx);
			var initiative = suxx + JB_EXTRA_SUX;console.log("JB initiative:",initiative);
			console.groupEnd();return initiative;
		};		
	}









	function PendingAttack(tick, source, target, damage, isDecisive) {
		this.tick = tick;
		this.tiebreaker = Math.random();
		this.source = source;
		this.target = target;
		this.damage = damage;
		this.isDecisive = isDecisive;
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
		var attackForm,
			id = $(this).parent().attr("id"),
			lookup = lookupByID(combatants);

		attackForm = dialogForm.on("submit", function(event) {
			event.preventDefault();
			attack(id);
		});

		dialogForm.html(attackWindow);

		dialog.dialog({
			title: "Attack",
			autoOpen: false,
			height: "auto",
			width: "auto",
			modal: true,
			buttons: {
				Attack: function() {
					attack(id);
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









	function attack(id) {
		console.groupCollapsed("Attack!",id);

		var attackAuto, attackPool, attackRoll, attackSuccesses, attackThreshold, damage, damageRoll,
			lookup = lookupByID(combatants),
			attackModifiers = parseInt($("#attackModifiers").val()),
			attackStunt = parseInt($("input[name=attackStunt]:checked").val()),
			attackIsDecisive = parseInt($("#attackIsDecisive").val()),
			damageDoubles = DEFAULT_DOUBLES,
			damagePool = lookup[id].getDamage(),
			defendStunt = parseInt($("input[name=defendStunt]:checked").val()),
			target = $("#opponents option:selected").val(),
			targetDodge = lookup[target].getEvasionPool(),
			targetParry = lookup[target].getParryPool(),
			targetSoak = lookup[target].getSoak(),
			targetDefense = Math.max(targetDodge, targetParry);

		attackPool = attackModifiers;
		
		if (attackIsDecisive) {
			attackPool += lookup[id].getDecisivePool();
			damageDoubles = false;
			resultsWindow.append(lookup[id].name + " attempts a DECISIVE ATTACK against " + lookup[target].name + "!\n");
		} else {
			attackPool += lookup[id].getWitheringPool();
			resultsWindow.append(lookup[id].name + " attempts a Withering Attack (" + attackPool +
				" dice) against " + lookup[target].name + " (" + targetDefense + " defense)!\n");
		}

		if (attackStunt > 0) {
			resultsWindow.append(lookup[id].name + " uses a " + attackStunt + "-point stunt!\n");
			attackPool += 2;
			attackAuto = attackStunt - 1;
			// lookup[id].willpower += attackStunt - 1;
		}

		if (defendStunt > 0) {
			resultsWindow.append(lookup[target].name + " uses a " + defendStunt + "-point stunt!\n");
			targetDefense += defendStunt;
			// lookup[target].willpower += attackStunt - 1;
		}

		attackRoll = diceRoller(attackPool, DEFAULT_DIE_SIDE);
		attackSuccesses = successChecker(attackRoll, DEFAULT_TARGET, DEFAULT_DOUBLES, attackAuto);
		attackThreshold = attackSuccesses - targetDefense;

		resultsWindow.append(lookup[id].name + " rolls: " + attackRoll + "\n");
		if (attackSuccesses < 0) resultsWindow.append("BOTCH!\n");
		else if (attackThreshold >= 0) resultsWindow.append("Success! " + attackThreshold + " net successes!\n");
		else resultsWindow.append("Failure!\n");

		if (attackSuccesses > 0 && attackThreshold >= 0) {
			resultsWindow.append("Attacker base damage pool: " + damagePool + "; Defender soak: " + targetSoak + "\n");

			damagePool += (attackThreshold - targetSoak);
			damagePool = Math.max(damagePool, lookup[id].overwhelming, 1);
			damageRoll = diceRoller(damagePool, DEFAULT_DIE_SIDE);
			damage = Math.max(successChecker(damageRoll, DEFAULT_TARGET, damageDoubles),0);

			resultsWindow.append(lookup[id].name + " rolls " + damage + " damage! (" + damageRoll + ")\n");
		}

		if (damage > 0) {
			if (lookup[id].initiative != lookup[target].initiative) {
				if (attackIsDecisive) {
					// stuff happens
				} else {
					resolveWitheringAttack(id, target, damage);
				}
			} else {
				resultsWindow.append("Combatants at same initiative, holding resolution until end of tick\n");
				pendingAttacks[pendingAttacks.length] = new PendingAttack(lookup[id].initiative, id, target, damage, attackIsDecisive);
			}
		}

		lookup[id].active = false;

		dialog.dialog("close");
		doRound();
		console.groupEnd();
	}

	function resolveWitheringAttack(sourceID, targetID, damage) {
		console.groupCollapsed("Resolve Withering Attack");

		var isTargetCrashed, lookup = lookupByID(combatants),
			wasTargetCrashed = lookup[targetID].initiative < 1,
			witheringPenalty = lookup[sourceID].initiative >= WITHERING_PENALTY_INITIATIVE;

		lookup[sourceID].initiative++;
		resultsWindow.append(lookup[sourceID].name + " gains an Initiative for a successful Withering Attack.\n");

		if (lookup[targetID].crashedAndWithered) {
			lookup[sourceID].initiative += Math.min(1, damage);
			resultsWindow.append(lookup[targetID].name + " is in Crash and has already been withered. " +
				lookup[sourceID].name + " gains " + Math.min(1, damage) + " Initiative");
		} else if (witheringPenalty) {
			lookup[sourceID].initiative += Math.ceil(damage / 2);
			resultsWindow.append(lookup[sourceID].name + " is over " + WITHERING_PENALTY_INITIATIVE +
				" Initiative and gains only " + Math.ceil(damage / 2) + " from the attack");
		} else {
			lookup[sourceID].initiative += damage;
			resultsWindow.append(lookup[sourceID].name + " gains " + damage + " Initiative");
		}
		
		lookup[targetID].initiative -= damage;
		resultsWindow.append("&mdash;" + lookup[targetID].name + " loses " + damage + "!\n");

		isTargetCrashed = lookup[targetID].initiative < 1;
		console.log("is target crashed?",isTargetCrashed);

		if (wasTargetCrashed != isTargetCrashed) {
			lookup[sourceID].initiative += INITIATIVE_BREAK_BONUS;
			resultsWindow.append(lookup[sourceID].name+" gains Initiative Break bonus!\n");
		}

		if (isTargetCrashed) lookup[targetID].crashedAndWithered = true;

		console.groupEnd();
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
			if (stat) eval(evalStr);
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
		var names = ["Reborn Vermillion Havoc","Chejop Kejak","The Scarlet Empress","The Ebon Dragon","The Unconquered Sun","Invincible Sword Princess","Killfuck Soulshitter"],
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

			// set tick to highest active initiative
			// resolve all pending damage at higher initiative than current tick
			// if no actives, resolve all pending damage and reset active status

			if (whoseTurn) {
				resolvePendingDamage(whoseTurn);
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

	function resolvePendingDamage(tick) {
		console.groupCollapsed("resolving pending damage at tick",tick);
		pendingAttacks.sort(sortByTiebreaker);console.log("sorting pendingAttacks",pendingAttacks);

		for (i in pendingAttacks) {
			if (pendingAttacks[i].tick > tick || !tick) {
				var damage = pendingAttacks[i].damage,
					lookup = lookupByID(combatants),
					sourceID = pendingAttacks[i].source,
					targetID = pendingAttacks[i].target;

				resultsWindow.append("Resolving " + lookup[sourceID].name + "'s attack vs. " + lookup[targetID].name + " for " + damage + " damage\n");

				if (pendingAttacks[i].isDecisive) {
					// resolve decisive attack
				} else {
					resolveWitheringAttack(sourceID, targetID, damage);
				}

				pendingAttacks.splice(i, 1);
				resolvePendingDamage(tick);
			}
		}
		console.groupEnd();
	}

	function resetActiveStatus() {
		resolvePendingDamage();

		for (i in combatants) {
			combatants[i].active = true;
			combatants[i].crashedAndWithered = false;
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
			$("#combatants > tbody:last").append('<tr class="' + 
				(combatants[i].active ? '' : 'inactive ') +
				(combatants[i].initiative > 0 ? '' : 'crashed ') +
				'playerBubble">' + 
				'<td name="' + combatants[i].name + '" id="' + combatants[i].id + '" class="player">' +
				'<span class="initiative">' + combatants[i].initiative + '</span>' +
				'<span class="name">' + combatants[i].name + '</span><br/>' +
				'<span class="stats">' +
				'Join Battle: ' + combatants[i].getJoinBattlePool() +
				' &bull; Withering: ' + combatants[i].getWitheringPool() +
				' &bull; Decisive: ' + combatants[i].getDecisivePool() +
				' &bull; Parry: ' + combatants[i].getParryPool() +
				' &bull; Evade: ' + combatants[i].getEvasionPool() +
				' &bull; Rush: ' + combatants[i].getRushPool() +
				' &bull; Disengage: ' + combatants[i].getDisengagePool() +
				'</span><br/>' +
				'<input type="button" class="attack" value="Attack"/>' +
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
		console.groupCollapsed("success checker");
		var successes, rolledAOne = false;

		if (!target) target = DEFAULT_TARGET;
		if (!auto) auto = 0;
		
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
		if (!numDice) numDice = DEFAULT_NUM_DICE;
		if (!sides) sides = DEFAULT_DIE_SIDE;
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
		if (!sides) sides = DEFAULT_DIE_SIDE;
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
		$("#overwhelming").val(weaponStats[2]);
		$("#defense").val(weaponStats[3]);

		console.log("new value for #weaponPicker is",weaponVal,":",weaponStats);
		console.log("new value for #armorPicker is",armorVal,":",armorStats);
		console.groupEnd();
	}
});