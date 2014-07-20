$(function() {
	var DEFAULT_NUM_DICE = 5,
		DEFAULT_DIE_SIDE = 10,
		rollButton = $("#roll"),
		numDice = $("#numDice").val();

	$(rollButton).click(function() {
		console.group("Dice roller clicked");
		diceRoller(numDice, 10);
		console.groupEnd();
	});

	function diceRoller(numDice, sides) {
		if (!numDice) numDice = DEFAULT_NUM_DICE;
		if (!sides) sides = DEFAULT_DIE_SIDE;
		console.log("Rolling",numDice,sides,"sided dice");

		for (var i = 0; i < numDice; i++) {
			dieRoller(sides);
		}
	}

	function dieRoller(sides) {
		if (!sides) sides = DEFAULT_DIE_SIDE;
		console.log("Rolling a %i-sided die",sides);

		var result = Math.floor((Math.random() * sides) + 1);console.log("Rolled a",result);
		return result;
	}
});