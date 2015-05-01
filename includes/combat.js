function aim(id, target) {
	console.groupCollapsed("Aim");

	var lookup = lookupByID(SCENE.combatants),
		attacker = lookup[id],
		defender = lookup[target];

	attacker.shiftTarget = undefined;
		console.log('setting attacker shift target to undefined');

	attacker.aimTarget = defender;
		console.log('Setting',defender.name,'as',attacker.name + '\'s Aim target');

	attacker.active = false;
	console.groupEnd();
	DIALOG.dialog('close');

	printResult(attacker.name,'takes Aim against',defender.name,'&hellip;');

	doRound();
}









function attack(id, target) {
	console.groupCollapsed('Attack!');

	var lookup = lookupByID(SCENE.combatants),
		attacker = lookup[id],
		defender = lookup[target];

	var attackIsDecisive = $('input[name=attackIsDecisive]:checked').val() === 'true',
		attackModifiers = parseInt($('#attackModifiers').val()),
		attackSpecialty = $('#attackSpecialty').prop('checked'),
		attackStunt = parseInt($('input[name=attackStunt]:checked').val()),
		attackTick = parseInt($('#attackTick').val()),
		attackWound = attacker.getWoundPenalty(),
		defendSpecialty = $('#defendSpecialty').prop('checked'),
		defendStunt = parseInt($('input[name=defendStunt]:checked').val());

	attacker.shiftTarget = undefined;
		console.log('setting attacker shift target to undefined');

	attackStunt = stunt(attackStunt);
	defendStunt = stunt(defendStunt);
		console.log('stunts:',attackStunt,'vs.',defendStunt);

	if (!isNaN(attackWound)) attackModifiers += attackWound;			// apply wound penalties if applicable
	if (attacker.aimTarget === defender) attackModifiers += AIM_BONUS;	// apply aim bonus if applicable
	attacker.aimTarget = undefined;										// reset aim target for attacker either way

	if (attacker.initiative != attackTick) attacker.initiative += DELAYED_ATTACK_PENALTY;

	SCENE.pendingAttacks.push(new PendingAttack(attackTick, attacker, defender, attackModifiers, attackStunt, defendStunt, attackIsDecisive, attackSpecialty, defendSpecialty));
		console.log('new attack pushed:',SCENE.pendingAttacks);

	attacker.active = false;

	defender.onslaught++;
		console.log(defender.name,'is now at',defender.onslaught,'Onslaught penalty');

	console.groupEnd();

	DIALOG.dialog('close');
	doRound();
}

function resolveAttack(attack) {
	console.groupCollapsed('Resolving',attack.attacker.name + '\'s attack versus',attack.defender.name);

	var attackAuto = attack.attackStunt.auto, // presumably will add Charm hooks here eventually
		attackPool = attack.attackModifiers + attack.attackStunt.dice,
		targetDefense = attack.defender.getDefense(attack.defendSpecialty) + attack.defendStunt.static;

		console.log('Attack modifiers:',attack.attackModifiers);
		console.log('Attack stunt level:',attack.attackStunt);
		console.log('Defend stunt level:',attack.defendStunt);
		console.log('Decisive?',attack.isDecisive);

	if (attack.attackStunt.level > 0) printResult(attack.attacker.name,'uses a',attack.attackStunt.level,'point stunt!');
	if (attack.defendStunt.level > 0) printResult(attack.defender.name,'uses a',attack.defendStunt.level,'point stunt!');

	if (attack.isDecisive) attackPool += attack.attacker.getDecisivePool();
	else attackPool += attack.attacker.getWitheringPool();

	if (attack.attackSpecialty) attackPool += SPECIALTY_DIE_BONUS;

	printResult(attack.attacker.name,'attempts a',(attack.isDecisive ? 'Decisive' : 'Withering'),'Attack','('+attackPool,'dice) against',attack.defender.name,'('+targetDefense,'defense)!');

	makeAttackRoll(attack.attacker, attack.defender, attackAuto, attackPool, targetDefense, attack.isDecisive);

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

	printResult('CLASH!',first.name,'vs.',second.name + '!');

	if (attack.isDecisive && secondAttack.isDecisive) result = opposedRoll(first.getDecisivePool(), second.getDecisivePool());
	else if (!attack.isDecisive && !secondAttack.isDecisive) result = opposedRoll(first.getWitheringPool(), second.getWitheringPool());
	else if (attack.isDecisive) result = opposedRoll(first.getDecisivePool(), second.getWitheringPool());
	else result = opposedRoll(first.getWitheringPool(), second.getDecisivePool());

	if (result > 0) {
		printResult(first.name,'wins with',result,'net successes!');
		if (attack.isDecisive) checkDecisiveDamage(first, second, result, true);
		else checkWitheringDamage(first, second, result, true);
		second.onslaught += CLASH_PENALTY;
	} else if (result < 0) {
		result = Math.abs(result);
		printResult(second.name,'wins with',result,'net successes!');
		if (secondAttack.isDecisive) checkDecisiveDamage(second, first, result, true);
		else checkWitheringDamage(second, first, result, true);
		first.onslaught += CLASH_PENALTY;
	} else {
		printResult(first.name,'and',second.name,'Clash&mdash;but it\'s indecisive!');
	}
}

function makeAttackRoll(attacker, defender, attackAuto, attackPool, targetDefense, isDecisive) {
	console.groupCollapsed('makeAttackRoll');

	var attackRoll = diceRoller(attackPool),
		attackSuccesses = successChecker(attackRoll, undefined, undefined, attackAuto),
		attackThreshold = attackSuccesses - Math.max(targetDefense, 0);

	console.log('attackThreshold is',attackThreshold);

	if (attackThreshold >= 0) {
		printResult(attacker.name,'succeeds at +' + attackThreshold + '! (' + attackRoll + ')');
		if (isDecisive) checkDecisiveDamage(attacker, defender);
		else checkWitheringDamage(attacker, defender, attackThreshold);
	} else {
		// botch stuff?
		printResult(attacker.name,'fails! (' + attackRoll + ')');
		if (isDecisive) {
			var initLoss = (attacker.initiative > DECISIVE_MISS_PENALTY_THRESHOLD ? DECISIVE_MISS_PENALTY_HIGH : DECISIVE_MISS_PENALTY_LOW);
			printResult(attacker.name,'takes',initLoss,'Initiative!');
			attacker.initiative += initLoss;
		}
	}

	console.log('makeAttackRoll finished');
	console.groupEnd();
}

function checkWitheringDamage(attacker, defender, attackThreshold, clash) {
	var damagePool = Math.max((attacker.getDamage() + attackThreshold - defender.getSoak()), attacker.overwhelming, 1),
		damageRoll = diceRoller(damagePool),
		damage = Math.max(successChecker(damageRoll),0);

	printResult(attacker.name,'rolls',damagePool,'dice and inflicts',damage,'damage! (' + damageRoll + ')');
	console.log('Raw damage',attacker.getDamage(),'Threshold:',attackThreshold,'Soak:',defender.getSoak(),'Overwhelm:',attacker.overwhelming,'Final pool:',damagePool);

	if (clash) {
		printResult(attacker.name,'gains',CLASH_BONUS_WITHERING,'automatic damage for a successful Clash!');
		damage += CLASH_BONUS_WITHERING;
	}		

	if (damage > 0)
		resolveWitheringDamage(attacker, defender, damage);
}

function checkDecisiveDamage(attacker, defender, attackThreshold, clash) {
	console.groupCollapsed('checkDecisiveDamage');

	var damageRoll = diceRoller(attacker.initiative),
		damage = successChecker(damageRoll, undefined, false);

	if (defender.initiative < 1 || attacker.initiative > defender.hardness) {
		if (clash) {
			damage += CLASH_BONUS_DECISIVE;
				console.log('Clash detected');
		} else {
				console.log('No clash');
		}

		if (attacker.doesLethal) {
			defender.lethal += damage;
				console.log('Attacker does lethal');
		} else {
			defender.bashing += damage;
				console.log('Attacker doesn\'t do lethal');
		}

		printResult(attacker.name + ' inflicts ' + damage + ' damage on ' + attacker.initiative + ' dice! (' + damageRoll + ')\n');

		defender.recordDamage();
	} else {
		printResult('It doesn\'t penetrate ' + defender.name + '\'s Hardness!\n');
		console.log(defender.name,"balls so hard motherfuckas wanna fine him");
		for (var i = 0; i < 3; i++) console.log("That shit cray");
	}

	attacker.initiative = INITIATIVE_RESET_VALUE;
		console.log("Resetting attacker initiative");

	console.groupEnd();
}

function resolveWitheringDamage(attacker, defender, damage) {
	console.log("attacker.initiative:",attacker.initiative);
	console.log("defender.initiative:",defender.initiative);

	var wasAttackerCrashed = attacker.initiative < 1,
		wasTargetCrashed = defender.initiative < 1,
		witheringPenalty = attacker.initiative >= WITHERING_PENALTY_INITIATIVE;

	console.log("attacker was crashed before attack resolution?",wasAttackerCrashed);
	console.log("target was crashed before attack resolution?",wasTargetCrashed);

	if (defender.crashedAndWithered) {
		attacker.initiative += Math.min(1, damage);
		printResult(defender.name + " is in Crash and has already been withered. " + attacker.name + " gains " + Math.min(1, damage) + " Initiative; ");
	} else if (witheringPenalty) {
		attacker.initiative += Math.ceil(damage / 2);
		printResult(attacker.name + " is over " + WITHERING_PENALTY_INITIATIVE + " Initiative and gains only " + Math.ceil(damage / 2) + " from the attack; ");
	} else {
		attacker.initiative += damage;
		printResult(attacker.name + " gains " + damage + " Initiative from damage; ");
	}
	
	defender.initiative -= damage;
	printResult(defender.name + " loses " + damage + "!\n");

	var isTargetCrashed = defender.initiative < 1;
	console.log("target is crashed now?",isTargetCrashed);

	if (wasTargetCrashed != isTargetCrashed) {
		if (!defender.crashRecovery || ROUND > defender.crashRecovery + 1) {
			console.log("Round",ROUND,"is 2+ rounds beyond defender's last crash recovery of ",defender.crashRecovery);
			attacker.initiative += INITIATIVE_BREAK_BONUS;
			printResult(attacker.name+" gains +" + INITIATIVE_BREAK_BONUS + " Initiative Break bonus!\n");
		}

		if (wasAttackerCrashed && attacker.crashedBy === defender) {
			// INITIATIVE SHIFT
			printResult("INITIATIVE SHIFT!!!\n");
			console.log("Initiative shift!");
			attacker.initiative = Math.max(attacker.initiative, INITIATIVE_RESET_VALUE);
			attacker.initiative += attacker.joinBattle();
			attacker.active = true;
			attacker.shiftTarget = defender; // should only be able to use new turn for attacking same dude
		}
		defender.crashedBy = attacker;
	}

	var isAttackerCrashed = attacker.initiative < 1;

	if (wasAttackerCrashed != isAttackerCrashed) attacker.crashRecovery = ROUND;

	if (isTargetCrashed) defender.crashedAndWithered = true;
		
	attacker.initiative++;
	printResult(attacker.name + " gains an Initiative for a successful Withering Attack.\n");
}









function doRound() {
	console.groupCollapsed("Do Round");

	RESULTS_WINDOW.refresh();

	if (SCENE.combatants.length > 1 && SCENE.isAnybodyOutThere() && ROUND > 0) {
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

			if (lastLine != tickAnnounce) printResult(tickAnnounce);
		} else {
			SCENE.resetActiveStatus();
			SCENE.iterateCrashCounter();
			SCENE.resetOnslaught(whoseTurn);
			ROUND++;
			printResult("--- ROUND "+ROUND+" ---\n");
			doRound();
		}
	} else {
		console.log("Not enough combatants");
	}
	
	SCENE.printCombatants();
	console.groupEnd();
}









function move(id, type, target) {
	console.groupCollapsed("Move: target is",target);

	var lookup = lookupByID(SCENE.combatants),
		us = lookup[id],
		them = lookup[target];

	var currentRange = us.getRange(them),
		newRange = Math.max(currentRange - 1, 0);

	for (var i in us.vectors) {
		if (us.vectors[i].range.value === 0) {
			console.log("setting zero range to 1");
			us.setRange(us.vectors[i].target, 1);
		}
	}

	if (type === 'move') us.setRange(them, newRange);
	
	us.hasMoved = true;

	DIALOG.dialog("close");

	SCENE.printCombatants();

	console.groupEnd();
}