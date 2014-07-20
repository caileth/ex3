$(function() {
	var DEFAULT_NUM_DICE = 5,
		DEFAULT_DIE_SIDE = 10,
		DEFAULT_TARGET = 7,
		numDice = $("#numDice"),
		resultsWindow = $("#results"),
		rollButton = $("#roll"),
		targetNumber = $("#targetNumber");

	$(rollButton).click(function() {		
		var doubleRule = $("input[name=doubleRule]:checked").val();
		printRoll(numDice.val(), DEFAULT_DIE_SIDE, targetNumber.val(), doubleRule);
	});

	function printRoll(numDice, sides, targetNumber, doubleRule) {
		console.groupCollapsed(numDice + "d" + sides + "@" + targetNumber + "; double rule: " + doubleRule);

		var result = diceRoller(numDice, sides),
			successes = successChecker(result, targetNumber, doubleRule);

		resultsWindow.append("Rolled: ");
		for (var roll in result) {
			resultsWindow.append(result[roll] + " ");
		}
		resultsWindow.append("\n" + successes + " successes!" + "\n");

		// scrolls results window to bottom as new results come in
		resultsWindow.scrollTop(resultsWindow[0].scrollHeight - resultsWindow.height());

		console.groupEnd();
	}

	function successChecker(roll, target, doubleRule) {
		if (!target) target = DEFAULT_TARGET;

		var successes = 0,
			rolledAOne = false;

		for (var die in roll) {
			if (roll[die] >= target) {
				if (roll[die] >= doubleRule) successes++;
				successes++;
			}
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