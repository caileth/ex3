$(function() {
	var DEFAULT_DIE_SIDE = 10,
		DEFAULT_NUM_DICE = 5,
		DEFAULT_TARGET = 7,
		JB_DIFFICULTY = 0,
		JB_DOUBLES = false,
		JB_EXTRA_SUX = 3,
		JB_TARGET = 7,
		addCombatantDialog, addCombatantForm,
		awareness = $("#awareness"),
		combatantIndex = 0,
		combatants = new Array(),
		joinBattle = $("#joinBattle"),
		name = $("#name"),
		numCombatants = 0,
		resultsWindow = $("#results"),
		rollButton = $("#roll"),
		wits = $("#wits");

	$(joinBattle).click(function() {
		console.groupCollapsed("joinBattle clicked");
		console.log(numCombatants,"combatants");
		if(numCombatants > 1) {
			resultsWindow.append("\n---\n");
			for (i in combatants) {
				var joinBattlePool = combatants[i].getJoinBattle(),
					joinBattleRoll = diceRoller(joinBattlePool, DEFAULT_DIE_SIDE),
					joinBattleSuxx = Math.max(successChecker(joinBattleRoll, JB_TARGET, JB_DOUBLES), 0);
				combatants[i].initiative = joinBattleSuxx + JB_EXTRA_SUX;
				resultsWindow.append(combatants[i].name + " joins battle at initiative " + combatants[i].initiative + "\n");
			}
			scrollToBottom();
			printCombatants();
		} else {
			resultsWindow.append("\nNot enough combatants!");
		}
		console.groupEnd();
	});

	$("body").on('click', '.remove', function() {
		var id = $(this).parent().attr("id");console.log("removing id",id);
		console.log(combatants[id].name,"removed, theoretically");
		combatants.splice(id,1);
		printCombatants();
		numCombatants--;
	});
 
    $("body").on( "click", ".witheringAttack", function() {
    	var id = $(this).parent().attr("id");
    	populateTargetList(id);
		witheringAttackDialog.dialog("open");
    });
 
    $("#addCombatant").on( "click", function() {
		addCombatantDialog.dialog("open");
    });

	$(rollButton).click(function() {		
		var difficulty = $("#difficulty").val(),
			doubleRule = $("input[name=doubleRule]:checked").val(),
			numDice = $("#numDice").val(),
			targetNumber = $("#targetNumber").val();

		printRoll(numDice, DEFAULT_DIE_SIDE, targetNumber, doubleRule, difficulty);
	});

    function populateTargetList(id) {
    	for (current in combatants)
    		if (current != id)
    			$("#opponents").append('<option value="' + current + '">' + combatants[current].name + '</option>');
    }

	function witheringAttack() {
		// stuff happens
	}

	function Combatant(name) {
		this.name = name;
		this.awareness = 0;
		this.wits = 1;
		this.getJoinBattle = getJoinBattle;
	}

	function getJoinBattle() {
		return this.awareness + this.wits;
	}

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

	function successChecker(roll, target, doubleRule) {
		if (!target) target = DEFAULT_TARGET;

		var successes = 0,
			rolledAOne = false;

		for (var die in roll) {
			if (roll[die] >= target) {
				if (doubleRule && roll[die] >= doubleRule) successes++;
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
		console.groupCollapsed("dieRoller");
		if (!sides) sides = DEFAULT_DIE_SIDE;
		var result = Math.floor((Math.random() * sides) + 1);
		console.log("Rolled a " + result + " on a " + sides + "-sided die");
		console.groupEnd();return result;
	}

	function addCombatant() {
		console.groupCollapsed("addCombatant");
		combatantIndex++;console.log("combatantIndex is now",combatantIndex);
		numCombatants++;console.log("numCombatants is now",numCombatants);

		combatants[combatantIndex] = new Combatant(name.val());
		combatants[combatantIndex].awareness = parseInt(awareness.val());
		combatants[combatantIndex].wits = parseInt(wits.val());
		combatants[combatantIndex].initiative = 0;

		printCombatants();console.groupEnd();
	}

	function printCombatants() {
		console.groupCollapsed("printCombatants");
		$("tr.playerBubble").remove();console.log("deleting existing player list");

		combatants.sort(sortbyInitiative);

		for (current in combatants) {
			$("#combatants > tbody:last").append('<tr class="playerBubble">' + 
				'<td name="' + combatants[current].name + '" id="' + current + '" class="player">' +
				'<span class="initiative">' + combatants[current].initiative + '</span>' +
				'<span class="name">' + combatants[current].name + '</span><br/>' +
				'<input type="button" class="witheringAttack" value="Withering Attack"/>' +
				'<input type="button" class="decisiveAttack" value="Decisive Attack"/>' +
				'<input type="button" class="remove" value="X"/>' +
				'</td></tr>');
			addCombatantDialog.dialog("close");
		}

		console.log("done printing combatants");
		console.groupEnd();
	}

	function sortbyInitiative(a, b) {
		if (a.initiative > b.initiative) return -1;
		else if (a.initiative < b.initiative) return 1;
		else return 0;
	}

	function sortbyName(a, b) {
		if (a.name > b.name) return 1;
		else if (a.name < b.name) return -1;
		else return 0;
	}

    addCombatantDialog = $("#addCombatantForm").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Add combatant": addCombatant,
			Cancel: function() {
				addCombatantDialog.dialog("close");
			}
		},
		close: function() {
			addCombatantForm[0].reset();
      	}
    });
 
    addCombatantForm = addCombatantDialog.find("form").on("submit", function( event ) {
		event.preventDefault();
		addCombatant();
    });

    witheringAttackDialog = $("#witheringAttackForm").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Withering Attack": witheringAttack,
			Cancel: function() {
				witheringAttackDialog.dialog("close");
			}
		},
		close: function() {
			witheringAttackForm[0].reset();
      	}
    });
 
    witheringAttackForm = witheringAttackDialog.find("form").on("submit", function( event ) {
		event.preventDefault();
		witheringAttack();
    });
 
    $("#witheringAttack").on( "click", function() {
		witheringAttackDialog.dialog("open");
    });
});