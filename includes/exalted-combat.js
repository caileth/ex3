function attack(id, target) {
	console.groupCollapsed("Attack!");

	var lookup		= lookupByID(SCENE.combatants),
		attacker	= lookup[id],
		defender	= lookup[target];

	var attackIsDecisive	= $("input[name=attackIsDecisive]:checked").val() == "true",
		attackModifiers		= parseInt($("#attackModifiers").val()),
		attackStunt			= parseInt($("input[name=attackStunt]:checked").val()),
		attackWound			= attacker.getWoundPenalty();
		defendStunt			= parseInt($("input[name=defendStunt]:checked").val());

	attacker.isShifting = false;
		console.log("setting attacker shift to false");

	attackStunt = stunt(attackStunt);
	defendStunt = stunt(defendStunt);
		console.log("stunts:",attackStunt,"vs.",defendStunt);

	// add in attacker wound penalties if applicable (otherwise this function probably shouldn't be called in the first place)
	if (!isNaN(attackWound)) attackModifiers += attackWound;

	SCENE.pendingAttacks.push(new PendingAttack(attacker.initiative, attacker, defender, attackModifiers, attackStunt, defendStunt, attackIsDecisive));
		console.log("new attack pushed:",SCENE.pendingAttacks);

	attacker.active = false;

	defender.onslaught++;
		console.log(defender.name+" is now at -"+defender.onslaught+" Onslaught penalty");

	console.groupEnd();

	DIALOG.dialog("close");
	doRound();
}

function resolveAttack(attacker, defender, attackModifiers, attackStunt, defendStunt, isDecisive) {
	console.groupCollapsed("Resolving " + attacker.name + "'s attack versus " + defender.name);

	var attackAuto = attackStunt.auto, // presumably will add Charm hooks here eventually
		attackPool = attackModifiers + attackStunt.dice,
		targetDefense = defender.getDefense() + defendStunt.static;

		console.log("Attack modifiers:",attackModifiers);
		console.log("Attack stunt level:",attackStunt);
		console.log("Defend stunt level:",defendStunt);
		console.log("Decisive?",isDecisive);

	if (attackStunt.level > 0) RESULTS_WINDOW.append(attacker.name + " uses a " + attackStunt.level + "-point stunt!\n");
	if (defendStunt.level > 0) RESULTS_WINDOW.append(defender.name + " uses a " + defendStunt.level + "-point stunt!\n");

	if (isDecisive) attackPool += attacker.getDecisivePool();
	else attackPool += attacker.getWitheringPool();

	RESULTS_WINDOW.append(attacker.name + " attempts a " + (isDecisive ? "Decisive" : "Withering") + " Attack (" + attackPool + " dice) against " + defender.name + " (" + targetDefense + " defense)!\n");

	makeAttackRoll(attacker, defender, attackAuto, attackPool, targetDefense, isDecisive);

	console.groupEnd();
}

function resolveClashAttack(attack, secondAttack) {
	// resolve clash attack
	// successful withering Clash adds 3 points Init damage after roll
	// successful decisive Clash adds 1 point automatic damage
	// loser takes -2 Defense until his next turn (stack with onslaught?)

	var first = attack.attacker,
		second = secondAttack.attacker,
		result;

	RESULTS_WINDOW.append("CLASH! "+first.name+" vs. "+second.name,"!"+"\n");

	if (attack.isDecisive && secondAttack.isDecisive) result = opposedRoll(first.getDecisivePool(), second.getDecisivePool());
	else if (!attack.isDecisive && !secondAttack.isDecisive) result = opposedRoll(first.getWitheringPool(), second.getWitheringPool());
	else if (attack.isDecisive) result = opposedRoll(first.getDecisivePool(), second.getWitheringPool());
	else result = opposedRoll(first.getWitheringPool(), second.getDecisivePool());

	if (result > 0) {
		RESULTS_WINDOW.append(first.name+" wins with "+result+" net successes!\n");
		if (attack.isDecisive) checkDecisiveDamage(first, second, result, true);
		else checkWitheringDamage(first, second, result, true);
		second.onslaught += CLASH_PENALTY;
	} else if (result < 0) {
		result = Math.abs(result);
		RESULTS_WINDOW.append(second.name+" wins with "+result+" net successes!\n");
		if (secondAttack.isDecisive) checkDecisiveDamage(second, first, result, true);
		else checkWitheringDamage(second, first, result, true);
		first.onslaught += CLASH_PENALTY;
	} else {
		RESULTS_WINDOW.append(first.name+" and "+second.name+" Clash&mdash;but it's indecisive!\n");
		RESULTS_WINDOW.append("Clash indecisive!\n");
	}
}

function makeAttackRoll(attacker, defender, attackAuto, attackPool, targetDefense, isDecisive) {
	console.groupCollapsed("makeAttackRoll");
	var attackRoll = diceRoller(attackPool),
		attackSuccesses = successChecker(attackRoll, undefined, undefined, attackAuto),
		attackThreshold = attackSuccesses - Math.max(targetDefense, 0);

	console.log("attackThreshold is",attackThreshold);

	if (attackThreshold >= 0) {
		RESULTS_WINDOW.append(attacker.name + " succeeds at +" + attackThreshold + "! (" + attackRoll + ")\n");
		if (isDecisive) checkDecisiveDamage(attacker, defender);
		else checkWitheringDamage(attacker, defender, attackThreshold);
	} else {
		// botch stuff?
		RESULTS_WINDOW.append(attacker.name + " fails! (" + attackRoll + ")\n");
		if (isDecisive) {
			var initLoss = (attacker.initiative > DECISIVE_MISS_PENALTY_THRESHOLD ? DECISIVE_MISS_PENALTY_HIGH : DECISIVE_MISS_PENALTY_LOW);
			RESULTS_WINDOW.append(attacker.name + " loses " + initLoss + " Initiative!\n");
			attacker.initiative -= initLoss;
		}
	}

	console.log("makeAttackRoll finished");
	console.groupEnd();
}

function checkWitheringDamage(attacker, defender, attackThreshold, clash) {
	var damagePool = Math.max((attacker.getDamage() + attackThreshold - defender.getSoak()), attacker.overwhelming, 1),
		damageRoll = diceRoller(damagePool),
		damage = Math.max(successChecker(damageRoll),0);

	console.log("Raw damage",attacker.getDamage(),"Threshold:",attackThreshold,"Soak:",defender.getSoak(),"Overwhelm:",attacker.overwhelming,"Final pool:",damagePool);
	RESULTS_WINDOW.append(attacker.name + " rolls " + damagePool + " dice and inflicts " + damage + " damage! (" + damageRoll + ")\n");

	if (clash) {
		RESULTS_WINDOW.append(attacker.name+" gains "+CLASH_BONUS_WITHERING+" automatic damage for a successful Clash!\n");
		damage += CLASH_BONUS_WITHERING;
	}		

	if (damage > 0) {
		attacker.initiative++;
		RESULTS_WINDOW.append(attacker.name + " gains an Initiative for a successful Withering Attack.\n");
		resolveWitheringDamage(attacker, defender, damage);
	}
}

function checkDecisiveDamage(attacker, defender, attackThreshold, clash) {
	console.groupCollapsed("checkDecisiveDamage");

	var damageRoll = diceRoller(attacker.initiative),
		damage = successChecker(damageRoll, undefined, false);

	if (defender.initiative < 1 || attacker.initiative > defender.hardness) {
		if (clash) {
			damage += CLASH_BONUS_DECISIVE;
				console.log("Clash detected");
		} else {
				console.log("No clash");
		}

		if (attacker.doesLethal) {
			defender.lethal += damage;
				console.log("Attacker does lethal");
		} else {
			defender.bashing += damage;
				console.log("Attacker doesn't do lethal");
		}

		RESULTS_WINDOW.append(attacker.name + " inflicts " + damage + " damage on " + attacker.initiative + " dice! (" + damageRoll + ")\n");

		defender.recordDamage();
	} else {
		RESULTS_WINDOW.append("It doesn't penetrate" + defender.name + "'s Hardness!\n");
		console.log(defender.name,"balls so hard motherfuckas wanna fine him");
		for (var i = 0; i < 3; i++) console.log("That shit cray");
	}

	attacker.initiative = INITIATIVE_RESET_VALUE;
		console.log("Resetting attacker initiative");

	console.groupEnd();
}

function resolveWitheringDamage(attacker, defender, damage) {
	var wasAttackerCrashed = attacker.initiative < 1,
		wasTargetCrashed = defender.initiative < 1,
		witheringPenalty = attacker.initiative >= WITHERING_PENALTY_INITIATIVE;

	console.log("target was crashed before attack resolution?",wasTargetCrashed);

	if (defender.crashedAndWithered) {
		attacker.initiative += Math.min(1, damage);
		RESULTS_WINDOW.append(defender.name + " is in Crash and has already been withered. " + attacker.name + " gains " + Math.min(1, damage) + " Initiative; ");
	} else if (witheringPenalty) {
		attacker.initiative += Math.ceil(damage / 2);
		RESULTS_WINDOW.append(attacker.name + " is over " + WITHERING_PENALTY_INITIATIVE + " Initiative and gains only " + Math.ceil(damage / 2) + " from the attack; ");
	} else {
		attacker.initiative += damage;
		RESULTS_WINDOW.append(attacker.name + " gains " + damage + " Initiative from damage; ");
	}
	
	defender.initiative -= damage;
	RESULTS_WINDOW.append(defender.name + " loses " + damage + "!\n");

	var isTargetCrashed = defender.initiative < 1;
	console.log("target is crashed now?",isTargetCrashed);

	if (wasTargetCrashed != isTargetCrashed) {
		attacker.initiative += INITIATIVE_BREAK_BONUS; // unless they've been recently crashed, fix this
		RESULTS_WINDOW.append(attacker.name+" gains +" + INITIATIVE_BREAK_BONUS + " Initiative Break bonus!\n");

		if (wasAttackerCrashed && attacker.crashedBy === defender) {
			// INITIATIVE SHIFT
			RESULTS_WINDOW.append("INITIATIVE SHIFT!!!\n");
			console.log("Initiative shift!");
			attacker.initiative = Math.max(attacker.initiative, INITIATIVE_RESET_VALUE);
			attacker.initiative += attacker.joinBattle();
			attacker.isShifting = true;
			attacker.active = true;
			// should only be able to use new turn for attacking same dude
		}
		defender.crashedBy = attacker;
	}

	if (isTargetCrashed) defender.crashedAndWithered = true;
}

function doRound() {
	console.groupCollapsed("Do Round");

	RESULTS_WINDOW.refresh();

	if (SCENE.combatants.length > 1 && SCENE.isAnybodyOutThere()) {
		var whoseTurn = SCENE.whoseTurnIsIt();
			console.log(">1 combatant detected. Highest tick is",whoseTurn);

		// 1. set tick to highest active initiative
		// 2. resolve all pending damage at higher initiative than current tick
		// 3. if no actives, resolve all pending damage and reset active status

		SCENE.resolve(whoseTurn);
			console.log("Pending attacks resolved");
		
		// refresh in case of initiative shift
		whoseTurn = SCENE.whoseTurnIsIt();
			console.log("whoseTurn refreshed:",whoseTurn);

		if (whoseTurn != null) {
			SCENE.resetOnslaught(whoseTurn);

			var lastLineBreak = RESULTS_WINDOW.val().trim().lastIndexOf("\n"),
				lastLine = RESULTS_WINDOW.val().substr(lastLineBreak + 1),
				tickAnnounce = "Tick " + whoseTurn + "\n";

			console.log(lastLine,"vs.",tickAnnounce,lastLine === tickAnnounce);

			if (lastLine != tickAnnounce) RESULTS_WINDOW.append(tickAnnounce);
		} else {
			SCENE.resetActiveStatus();
			SCENE.iterateCrashCounter();
			SCENE.resetOnslaught();
			ROUND++;
			RESULTS_WINDOW.append("--- ROUND "+ROUND+" ---\n");
			doRound();
		}
	} else {
		console.log("Not enough combatants");
	}

	console.groupEnd();
	SCENE.printCombatants();
	scrollToBottom();
}