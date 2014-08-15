$(function() {
	var combatants = new Array(),
		pendingAttacks = new Array(),
		round = 0;

	DIALOG.refresh();
	DIALOG_FORM.refresh();
	RESULTS_WINDOW.refresh();









	$("body").on("click", ".edit, #addCombatant", function() {
		console.groupCollapsed("Adding or editing");

		DIALOG_FORM.html(STATS_WINDOW);console.log("Populating dialogbox");

		var addButtons, editButtons,
			edit = false,
			id = $(this).parent().attr("id");

		if ($(this).attr("class") === "edit") edit = true;console.log("Edit?",edit);

		if (edit) {
			DIALOG_FORM.append('<br/><label for="initiative">Initiative: </label><input type="number" id="initiative" value="0"/>');
			getStats(id, combatants);
		}

		DIALOG.dialog({
			title: (edit ? "Edit combatant" : "Add combatant"),
			autoOpen: false,
			height: "auto",
			width: "auto",
			modal: true,
			close: (edit ? function(){editClose(id, combatants);} : function(){addClose(combatants);})});

		if (edit) {
			DIALOG.dialog("option", "buttons", [
				{ text: "Edit combatant", click: function() {
					editCombatant(id, combatants);
					doRound();
				}},
				{ text: "Cancel", click: function() {
					DIALOG.dialog("close");
				}}]);
		} else {
			DIALOG.dialog("option", "buttons", [
				{ text: "Add combatant", click: function() {
					addCombatant(combatants);
					doRound();
				}},
				{ text: "Cancel", click: function() {
					DIALOG.dialog("close");
				}}]);
		}

		DIALOG.dialog("open");

		console.groupEnd();
	});

	$("body").on( "click", ".attack", function() {
		if (combatants.length > 1) {	
			DIALOG_FORM.html(ATTACK_WINDOW);

			var attackForm,
				id = $(this).parent().attr("id"),
				lookup = lookupByID(combatants);
	
			attackForm = DIALOG_FORM.on("submit", function(event) {
				event.preventDefault();
				attack(id, $("#opponents option:selected").val());
			});
	
			DIALOG.dialog({
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
						DIALOG.dialog("close");
					}
				},
				close: function() {
					attackForm[0].reset();
				}
			});
	
			populateTargetList(id);
	
			if (lookup[id].initiative < 1) $("#decisive").prop('disabled', true);
	
			DIALOG.dialog("open");
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
			}
		}

		doRound();
		console.groupEnd();
	});

	$(document).on('change', '#armorPicker, #weaponPicker', function() {
		doPickerStats();
	});

	$("#joinBattle").click(function() {
		console.groupCollapsed("joinBattle clicked");
		console.log(combatants.length,"combatants");
		if(combatants.length > 1) {
			RESULTS_WINDOW.append("\n---\n");
			for (i in combatants) {
				var joinBattlePool = combatants[i].getJoinBattlePool(),
					joinBattleRoll = diceRoller(joinBattlePool),
					joinBattleSuxx = Math.max(successChecker(joinBattleRoll, JB_TARGET, JB_DOUBLES), 0);
				combatants[i].initiative = joinBattleSuxx + JB_EXTRA_SUX;
				RESULTS_WINDOW.append(combatants[i].name + " joins battle at initiative " + combatants[i].initiative + "\n");
			}
			scrollToBottom();
			doRound();
		} else {
			RESULTS_WINDOW.append("\nNot enough combatants!");
		}
		console.groupEnd();
	});

	$("#roll").click(function() {		
		var difficulty = $("#difficulty").val(),
			doubleRule = $("input[name=doubleRule]:checked").val(),
			numDice = $("#numDice").val(),
			targetNumber = $("#targetNumber").val();

		printRoll(numDice, undefined, targetNumber, doubleRule, difficulty);
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

		DIALOG.dialog("close");
		doRound();
	}

	function resolveAttack(attacker, defender, attackModifiers, attackStunt, defendStunt, isDecisive) {
		var attackAuto = attackStunt.auto, // presumably will add Charm hooks here eventually
			attackPool = attackModifiers + attackStunt.dice,
			targetDefense = defender.getDefense() + defendStunt.static;

		if (attackStunt.level > 0) RESULTS_WINDOW.append(attacker.name + " uses a " + attackStunt.level + "-point stunt!\n");
		if (defendStunt.level > 0) RESULTS_WINDOW.append(defender.name + " uses a " + defendStunt.level + "-point stunt!\n");

		if (isDecisive) attackPool += attacker.getDecisivePool();
		else attackPool += attacker.getWitheringPool();

		RESULTS_WINDOW.append(attacker.name + " attempts a " + (isDecisive ? "Decisive" : "Withering") + " Attack (" + attackPool + " dice) against " + defender.name + " (" + targetDefense + " defense)!\n");

		makeAttackRoll(attacker, defender, attackAuto, attackPool, targetDefense, isDecisive);
	}

	function makeAttackRoll(attacker, defender, attackAuto, attackPool, targetDefense, isDecisive) {
		var attackRoll = diceRoller(attackPool),
			attackSuccesses = successChecker(attackRoll, undefined, undefined, attackAuto),
			attackThreshold = attackSuccesses - Math.max(targetDefense, 0);

		RESULTS_WINDOW.append(attacker.name + " rolls: " + attackRoll + "\n");

		if (attackThreshold >= 0) {
			RESULTS_WINDOW.append("Success! " + attackThreshold + " net successes!\n");
			if (isDecisive) checkDecisiveDamage(attacker, defender);
			else checkWitheringDamage(attacker, defender, attackThreshold);
		} else {
			// botch stuff?
			RESULTS_WINDOW.append("Failure!\n");
			if (isDecisive) {
				var initLoss = (attacker.initiative > DECISIVE_MISS_PENALTY_THRESHOLD ? DECISIVE_MISS_PENALTY_HIGH : DECISIVE_MISS_PENALTY_LOW);
				RESULTS_WINDOW.append(attacker.name + " fails Decisive attack and loses " + initLoss + " Initiative!\n");
				attacker.initiative -= initLoss;
			}
		}
	}

	function checkWitheringDamage(attacker, defender, attackThreshold) {
		var damagePool = Math.max((attacker.getDamage() + attackThreshold - defender.getSoak()), attacker.overwhelming, 1),
			damageRoll = diceRoller(damagePool),
			damage = Math.max(successChecker(damageRoll),0);
			
		RESULTS_WINDOW.append("Attacker base damage pool: " + damagePool + "; Defender soak: " + defender.getSoak() + "\n");
		RESULTS_WINDOW.append(attacker.name + " rolls " + damage + " damage! (" + damageRoll + ")\n");

		if (damage > 0) resolveWitheringDamage(attacker, defender, damage);
	}

	function checkDecisiveDamage(attacker, defender, attackThreshold) {
		var damageRoll = diceRoller(attacker.initiative),
			damage = successChecker(damageRoll, undefined, false);

		if (attacker.doesLethal) {
			defender.lethal += damage;
		} else {
			defender.bashing += damage;
		}

		RESULTS_WINDOW.append(attacker.name + " rolls: " + damageRoll + "\n");
		RESULTS_WINDOW.append(defender.name + " takes " + damage + " damage!\n");

		defender.recordDamage();

		attacker.initiative = INITIATIVE_RESET_VALUE;
	}

	function resolveWitheringDamage(attacker, defender, damage) {
		var isTargetCrashed,
			wasTargetCrashed = defender.initiative < 1,
			witheringPenalty = attacker.initiative >= WITHERING_PENALTY_INITIATIVE;

		attacker.initiative++;
		RESULTS_WINDOW.append(attacker.name + " gains an Initiative for a successful Withering Attack.\n");

		if (defender.crashedAndWithered) {
			attacker.initiative += Math.min(1, damage);
			RESULTS_WINDOW.append(defender.name + " is in Crash and has already been withered. " +
				attacker.name + " gains " + Math.min(1, damage) + " Initiative");
		} else if (witheringPenalty) {
			attacker.initiative += Math.ceil(damage / 2);
			RESULTS_WINDOW.append(attacker.name + " is over " + WITHERING_PENALTY_INITIATIVE +
				" Initiative and gains only " + Math.ceil(damage / 2) + " from the attack");
		} else {
			attacker.initiative += damage;
			RESULTS_WINDOW.append(attacker.name + " gains " + damage + " Initiative");
		}
		
		defender.initiative -= damage;
		RESULTS_WINDOW.append("&mdash;" + defender.name + " loses " + damage + "!\n");

		isTargetCrashed = defender.initiative < 1;
		console.log("is target crashed?",isTargetCrashed);

		if (wasTargetCrashed != isTargetCrashed) {
			attacker.initiative += INITIATIVE_BREAK_BONUS;
			RESULTS_WINDOW.append(attacker.name+" gains Initiative Break bonus!\n");
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

	function doRound() {
		console.groupCollapsed("Do Round");

		if (combatants.length > 1) {
			var whoseTurn = whoseTurnIsIt();
			console.log(">1 combatant detected. Highest tick is",whoseTurn);

			// 1. set tick to highest active initiative
			// 2. resolve all pending damage at higher initiative than current tick
			// 3. if no actives, resolve all pending damage and reset active status

			if (whoseTurn != null) {
				resolvePendingAttacks(whoseTurn);
				RESULTS_WINDOW.append("Tick " + whoseTurn + "\n");
			} else {
				iterateCrashCounter();
				resetActiveStatus();
				RESULTS_WINDOW.append("Round is over!\n");
				doRound();
			}
		}

		combatants.print();
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
				RESULTS_WINDOW.append(combatants[j].name + " achieves Initiative Reset!\n");
			}
		}
	}

	function resolvePendingAttacks(tick) {
		console.groupCollapsed("resolving pending damage at tick",tick);
		
		pendingAttacks.sort(sortByTiebreaker);

		for (i in pendingAttacks) {
			var attack = pendingAttacks[i];
			if (attack.tick > tick || !tick) {
				RESULTS_WINDOW.append("Resolving " + attack.attacker.name + "'s attack vs. " + attack.defender.name + "\n");

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
			second = secondAttack.attacker,
			result;

		console.groupCollapsed("Clash attack:",first.name,"vs.",second.name,"!");

		if (attack.isDecisive && secondAttack.isDecisive) result = opposedRoll(first.getDecisivePool(), second.getDecisivePool());
		else if (!attack.isDecisive && !secondAttack.isDecisive) result = opposedRoll(first.getWitheringPool(), second.getWitheringPool());
		else if (attack.isDecisive) result = opposedRoll(first.getDecisivePool(), second.getWitheringPool());
		else result = opposedRoll(first.getWitheringPool(), second.getDecisivePool());

		if (result > 0) {
			// first attack wins
			console.log(first.name,"wins with",result,"net successes!");
		} else if (result < 0) {
			// second attack wins
			console.log(second.name,"wins with",result,"net successes!");
		} else {
			// it's a tie, report it
			console.log("Clash indecisive!");
		}

		console.groupEnd();
	}

	function opposedRoll(first, second) {
		var a = successChecker(first),
			b = successChecker(second);

		return a - b;
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

	combatants.print = function() {
		console.groupCollapsed("printCombatants");
		$("tr.playerBubble").remove();console.log("deleting existing player list");

		this.sort(sortbyInitiative);

		for (var i = 0; i < this.length; i++) {
			console.log("printing",this[i].name);
			var wound = this[i].getWoundPenalty();
			$("#combatants > tbody:last").append('<tr class="' + 
				(wound === 'dead' ? 'dead ' : 
					(wound === 'incapacitated' ? 'incapacitated ' :
						(!this[i].active ? 'inactive ' :
							(this[i].initiative < 1 ? 'crashed ' : '')))) +
				'playerBubble">' + 
				'<td name="' + this[i].name + '" id="' + this[i].id + '" class="player">' +
				'<span class="initiative">' + this[i].initiative + '</span>' +
				'<span class="name">' + this[i].name +
				(wound === 'dead' ? ' (DEAD) ' :
					(wound === 'incapacitated' ? ' (Incapacitated) ' : '')) +
				'</span><br/>' +
				'<span class="stats">' +
				'Join Battle: ' + this[i].getJoinBattlePool() +
				' &bull; Withering: ' + this[i].getWitheringPool() +
				' &bull; Decisive: ' + this[i].getDecisivePool() +
				' &bull; Parry: ' + this[i].getParryPool() +
				' &bull; Evade: ' + this[i].getEvasionPool() +
				' &bull; Rush: ' + this[i].getRushPool() +
				' &bull; Disengage: ' + this[i].getDisengagePool() +
				'<br/>' +
				'<b>Health:</b> ' + this[i].getHealthTrackHTML() +
				'</span><br/>' +
				'<input type="button" class="attack" value="Attack"' + (isNaN(wound) ? ' disabled' : '') +'/>' +
				'<input type="button" class="edit" value="Edit"/>' +
				'<input type="button" class="remove" value="X"/>' +
				'</td></tr>');
		}

		console.log("done printing combatants");

		console.groupEnd();
	};

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
});