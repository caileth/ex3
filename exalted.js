$(function() {
	var DEFAULT_NUM_DICE = 5,
		DEFAULT_DIE_SIDE = 10,
		DEFAULT_TARGET = 7,
		numDice = $("#numDice"),
		resultsWindow = $("#results"),
		rollButton = $("#roll"),
		targetNumber = $("#targetNumber");

	$(rollButton).click(function() {
		console.groupCollapsed(numDice.val() + "d" + DEFAULT_DIE_SIDE + "@" + targetNumber.val());
		printRoll(numDice.val(), DEFAULT_DIE_SIDE, targetNumber.val());
		console.groupEnd();
	});

	function printRoll(numDice, sides, targetNumber) {
		var result = diceRoller(numDice, sides),
			successes = successChecker(result, targetNumber);

		resultsWindow.append("Rolled: ");
		for (var roll in result) {
			resultsWindow.append(result[roll] + " ");
		}
		resultsWindow.append("\n" + successes + " successes!" + "\n");

		// scrolls results window to bottom as new results come in
		resultsWindow.scrollTop(resultsWindow[0].scrollHeight - resultsWindow.height());
	}

	function successChecker(roll, target) {
		if (!target) target = DEFAULT_TARGET;

		var successes = 0,
			rolledAOne = false;

		for (var die in roll) {
			if (roll[die] >= target) successes++;
			if (roll[die] === 1) rolledAOne = true;
		}

		if (rolledAOne && successes === 0) successes = -1;

		return successes;
	}

	function diceRoller(numDice, sides) {
		if (!numDice) numDice = DEFAULT_NUM_DICE;
		if (!sides) sides = DEFAULT_DIE_SIDE;
		console.log("Rolling",numDice,sides,"sided dice");

		var result = Array(numDice);

		for (var i = 0; i < numDice; i++) {
			result[i] = dieRoller(sides);
		}

		return result;
	}

	function dieRoller(sides) {
		if (!sides) sides = DEFAULT_DIE_SIDE;
		console.log("Rolling a %i-sided die",sides);

		var result = Math.floor((Math.random() * sides) + 1);console.log("Rolled a",result);
		return result;
	}
});