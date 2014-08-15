var combatants = new CombatantsList(),
	pendingAttacks = new PendingAttacksList();

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

	pendingAttacks.push(new PendingAttack(attacker.initiative, attacker, defender, attackModifiers, attackStunt, defendStunt, attackIsDecisive));
		console.log(pendingAttacks);

	attacker.active = false;
		console.log("Setting",attacker.name,"to inactive");
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

	console.groupCollapsed("Clash attack:",first.name,"vs.",second.name,"!");

	if (attack.isDecisive && secondAttack.isDecisive) result = opposedRoll(first.getDecisivePool(), second.getDecisivePool());
	else if (!attack.isDecisive && !secondAttack.isDecisive) result = opposedRoll(first.getWitheringPool(), second.getWitheringPool());
	else if (attack.isDecisive) result = opposedRoll(first.getDecisivePool(), second.getWitheringPool());
	else result = opposedRoll(first.getWitheringPool(), second.getDecisivePool());

	if (result > 0) {
		console.log(first.name,"wins with",result,"net successes!");
		if (attack.isDecisive) checkDecisiveDamage(first, second, result, true);
		else checkWitheringDamage(first, second, result, true);
		second.onslaught += CLASH_PENALTY;
	} else if (result < 0) {
		console.log(second.name,"wins with",result,"net successes!");
		if (secondAttack.isDecisive) checkDecisiveDamage(second, first, result, true);
		else checkWitheringDamage(second, first, result, true);
		first.onslaught += CLASH_PENALTY;
	} else {
		RESULTS_WINDOW.append(first.name+" and "+second.name+" Clash&mdash;but it's indecisive!\n");
		console.log("Clash indecisive!");
	}

	console.groupEnd();
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

function checkWitheringDamage(attacker, defender, attackThreshold, clash) {
	var damagePool = Math.max((attacker.getDamage() + attackThreshold - defender.getSoak()), attacker.overwhelming, 1),
		damageRoll = diceRoller(damagePool),
		damage = Math.max(successChecker(damageRoll),0);

	if (clash) damage += CLASH_BONUS_WITHERING;
		
	RESULTS_WINDOW.append("Attacker base damage pool: " + damagePool + "; Defender soak: " + defender.getSoak() + "\n");
	RESULTS_WINDOW.append(attacker.name + " rolls " + damage + " damage! (" + damageRoll + ")\n");

	if (damage > 0) resolveWitheringDamage(attacker, defender, damage);
}

function checkDecisiveDamage(attacker, defender, attackThreshold, clash) {
	var damageRoll = diceRoller(attacker.initiative),
		damage = successChecker(damageRoll, undefined, false);

	if (clash) damage += CLASH_BONUS_DECISIVE;

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
		var whoseTurn = combatants.whoseTurnIsIt();
		console.log(">1 combatant detected. Highest tick is",whoseTurn);

		// 1. set tick to highest active initiative
		// 2. resolve all pending damage at higher initiative than current tick
		// 3. if no actives, resolve all pending damage and reset active status

		if (whoseTurn != null) {
			pendingAttacks.resolve(whoseTurn);
			combatants.resetOnslaught(whoseTurn);
			RESULTS_WINDOW.append("Tick " + whoseTurn + "\n");
		} else {
			pendingAttacks.resolve();
			combatants.resetActiveStatus();
			combatants.iterateCrashCounter();
			combatants.resetOnslaught();
			RESULTS_WINDOW.append("Round is over!\n");
			doRound();
		}
	}

	combatants.print();
	scrollToBottom();
	console.groupEnd();
}