function printRoll(numDice, sides, targetNumber, doubleRule, difficulty) {
	console.groupCollapsed(numDice + "d" + sides + "@" + targetNumber + "; double rule: " + doubleRule);

	var result = diceRoller(numDice, sides),
		successes = successChecker(result, targetNumber, doubleRule),
		threshold = successes - difficulty;

	printResult("Rolled: ");
	for (var roll in result) printResult(result[roll] + " ");
	if (successes < 0) {
		printResult("\n" + "BOTCH!" + "\n");
		console.log('BOTCH at threshold',threshold);
	} else if (threshold < 0) {
		printResult("\nFailure! (" + threshold + " success[es].)\n");
		console.log('Failure at threshold',threshold);
	} else if (threshold === 0) {
		printResult("\nSuccess! (no threshold successes.)\n");
		console.log('Success at threshold',threshold);
	} else {
		printResult("\nSuccess at threshold " + threshold + "!\n");
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









function lookupByID(array) {
	console.groupCollapsed("lookup by ID");
	var result = {};
	for (var i = 0; i < array.length; i++) {
		result[array[i].id] = array[i];
		console.log("setting",array[i].name,"to lookup[",array[i].id,"]");
	}
	console.groupEnd();
	return result;
}

function opposedRoll(first, second) {
	var a = successChecker(diceRoller(first)),
		b = successChecker(diceRoller(second));

	return a - b;
}

function sanitize(str) {
	return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function scrollToBottom() {
	RESULTS_WINDOW.scrollTop(RESULTS_WINDOW[0].scrollHeight - RESULTS_WINDOW.height());
}

function stunt(level) {
	switch (level) {
		case 1: return {"level": 1, "dice": 2, "successes": 0, "willpower": 0, "static": 1};
		case 2: return {"level": 2, "dice": 2, "successes": 1, "willpower": 1, "static": 2};
		case 3: return {"level": 3, "dice": 2, "successes": 2, "willpower": 2, "static": 3};
		default: return {"level": 0, "dice": 0, "successes": 0, "willpower": 0, "static": 0};
	}
}









function printResult() {
	var result = '';

	for (var i = 0; i < arguments.length; i++) {
		result += arguments[i];

		if (i + 1 != arguments.length) result += ' ';
	}

	console.log(result);
	RESULTS_WINDOW.prepend(result + '<br>\n');
}