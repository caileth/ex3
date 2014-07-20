$(function() {
	var DEFAULT_DIE_SIDE = 10,
		DEFAULT_NUM_DICE = 5,
		DEFAULT_TARGET = 7,
		dexterity = $("#dexterity"),
		dialog, form,
		joinBattle = $("#joinBattle"),
		name = $("#name"),
		resultsWindow = $("#results"),
		rollButton = $("#roll"),
		wits = $("#wits");

	$(joinBattle).click(function() {
		// figure this out later

		/*$("td.player").each(function(index) {
			var name = $(this).attr("name");
			combatant = new combatant(name);

		});*/
	});

	$(rollButton).click(function() {		
		var difficulty = $("#difficulty").val(),
			doubleRule = $("input[name=doubleRule]:checked").val(),
			numDice = $("#numDice").val(),
			targetNumber = $("#targetNumber").val();

		printRoll(numDice, DEFAULT_DIE_SIDE, targetNumber, doubleRule, difficulty);
	});

	function combatant(name) {
		this.name = name;
		this.dex = 1;
		this.wits = 1;
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
		console.groupCollapsed("Rolling",numDice,sides,"sided dice");

		var result = Array(numDice);

		for (var i = 0; i < numDice; i++) {
			result[i] = dieRoller(sides);
		}

		console.groupEnd();
		return result;
	}

	function dieRoller(sides) {
		if (!sides) sides = DEFAULT_DIE_SIDE;
		var result = Math.floor((Math.random() * sides) + 1);
		console.log("Rolled a " + result + " on a " + sides + "-sided die");
		return result;
	}

	function addCombatant() {
		$("#combatants").append('<tr><td name="' + name.val() + '" class="player">' +
			'<span class="initiative">0</span>' +
			'<span class="name">' + name.val() + '</span><br/>' +
			'<span class="buttons">Add buttons here</span>' +
			'</td></tr>');
		dialog.dialog("close");
	}

    dialog = $("#dialog-form").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Add combatant": addCombatant,
			Cancel: function() {
				dialog.dialog("close");
			}
		},
		close: function() {
			form[0].reset();
      	}
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
		event.preventDefault();
		addCombatant();
    });
 
    $("#addCombatant").on( "click", function() {
		dialog.dialog( "open" );
    });
});