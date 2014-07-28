$(function() {
	var DEFAULT_DIE_SIDE = 10,
		DEFAULT_NUM_DICE = 5,
		DEFAULT_TARGET = 7,
		JB_DIFFICULTY = 0,
		JB_DOUBLES = false,
		JB_EXTRA_SUX = 3,
		JB_TARGET = 7,
		NAMES_DATABASE,
		attackWindow = '<label for="opponents">Target:</label>' +
			'<select id="opponents"></select><br/>' +
			'<label for="attackType">Attack Type:</label>' +
			'<input type="radio" name="attackType" value="0">Withering' +
			'<input type="radio" name="attackType" value="1">Decisive<br/>' +
			'<label for="witheringStunt">Stunt:</label>' +
			'<input type="radio" name="witheringStunt" value="0"/>None' +
			'<input type="radio" name="witheringStunt" value="1"/>1-point' +
			'<input type="radio" name="witheringStunt" value="2"/>2-point' +
			'<input type="radio" name="witheringStunt" value="3"/>3-point<br/>',
		combatantIndex = 0,
		combatants = new Array(),
		joinBattleButton = $("#joinBattle"),
		numCombatants = 0,
		resultsWindow = $("#results"),
		rollButton = $("#roll"),
		statsWindow = '<input type="text" id="name" placeholder="New Player" autofocus/>' +
			'<input type="button" class="randomize"/><br/>' +
			'<label for="dexterity">Dexterity: </label><input type="number" id="dexterity" value="1" min="1" max="5"/><br/>' +
			'<label for="wits">Wits: </label><input type="number" id="wits" value="1" min="1" max="5"/><br/>' +
			'<label for="athletics">Athletics: </label><input type="number" id="athletics" value="0" min="0" max="5"/><br/>' +
			'<label for="awareness">Awareness: </label><input type="number" id="awareness" value="0" min="0" max="5"/><br/>' +
			'<label for="dodge">Dodge: </label><input type="number" id="dodge" value="0" min="0" max="5"/><br/>' +
			'<label for="combat">Combat Ability: </label><input type="number" id="combat" value="0" min="0" max="5"/><br/>' +
			'<label for="accuracy">Weapon Accuracy: </label><input type="number" id="accuracy" value="0" min="0" max="5"/><br/>' +
			'<label for="defense">Weapon Defense: </label><input type="number" id="defense" value="0" min="0" max="5"/><br/>' +
			'<label for="mobility">Mobility Penalty: </label><input type="number" id="mobility" value="0" min="-5" max="0"/>';









	$.getJSON('./includes/exaltedname.json', function(data) {
		NAMES_DATABASE = data;
	});









	$("body").on('click', '.activeToggle', function() {		
		var id = $(this).parent().attr("id");
		if (combatants[id].active) combatants[id].active = false;
		else combatants[id].active = true;
		printCombatants();
	});

	$("body").on('click', '.randomize', function() {
		randomNameGenerator(NAMES_DATABASE);
		randomStatsGenerator();
	});

	$("body").on('click', '.remove', function() {
		var id = $(this).parent().attr("id");console.log(combatants[id].name,"removed");
		combatants.splice(id,1);
		printCombatants();
		numCombatants--;
	});

	$(joinBattleButton).click(function() {
		console.groupCollapsed("joinBattle clicked");
		console.log(numCombatants,"combatants");
		if(numCombatants > 1) {
			resultsWindow.append("\n---\n");
			for (i in combatants) {
				var joinBattlePool = combatants[i].getJoinBattlePool(),
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

	$(rollButton).click(function() {		
		var difficulty = $("#difficulty").val(),
			doubleRule = $("input[name=doubleRule]:checked").val(),
			numDice = $("#numDice").val(),
			targetNumber = $("#targetNumber").val();

		printRoll(numDice, DEFAULT_DIE_SIDE, targetNumber, doubleRule, difficulty);
	});









	function Combatant(name) {
		this.name = name;
		this.initiative = 0;
		this.active = true;

		this.getJoinBattlePool = function() {
			return this.awareness + this.wits;
		};
		this.getWitheringPool = function() {
			return this.dexterity + this.combat + this.accuracy;
		};
		this.getDecisivePool = function() {
			return this.dexterity + this.combat;
		};
		this.getParryPool = function() {
			return Math.ceil((this.dexterity + this.combat) / 2) + this.defense;
		};
		this.getEvasionPool = function() {
			return Math.ceil((this.dexterity + this.dodge) / 2) + this.mobility;
		};
		this.getRushPool = function() {
			return this.dexterity + this.athletics;
		};
		this.getDisengagePool = function() {
			return this.dexterity + this.dodge;
		};
		this.joinBattle = function() {
			console.groupCollapsed(this.name,"joins battle");
			var pool = this.getJoinBattlePool();console.log("JB pool:",pool);
			var roll = diceRoller(pool, DEFAULT_DIE_SIDE);console.log("JB roll:",pool);
			var suxx = Math.max(successChecker(roll, JB_TARGET, JB_DOUBLES), 0);console.log("JB sux:",suxx);
			var initiative = suxx + JB_EXTRA_SUX;console.log("JB initiative:",initiative);
			console.groupEnd();return initiative;
		};		
	}








 
    $("body").on( "click", ".attack", function() {
		$("#dialog-form").html(attackWindow);

		$("#dialog").dialog({
			title: "Attack",
			autoOpen: false,
			height: "auto",
			width: 350,
			modal: true,
			buttons: {
				"Attack": attack,
				Cancel: function() {
					$("#dialog").dialog("close");
				}
			},
			close: function() {
				attackForm[0].reset();
			}
		});

		var attackForm = $("#dialog-form").on("submit", function( event ) {
			event.preventDefault();
			attack();
		});

		var id = $(this).parent().attr("id");
		populateTargetList(id);
		$("#dialog").dialog("open");
    });

	function attack() {
		// stuff happens
		$("#dialog").dialog("close");
	}

    function populateTargetList(id) {
    	console.groupCollapsed("populating target list");
    	$("#opponents").empty();console.log("clearing out existing entries");
    	for (current in combatants) {
    		if (current != id) {
    			console.log("adding id",current);
    			$("#opponents").append('<option value="' + current + '">' + combatants[current].name + '</option>');
    		} else {
    			console.log("skipping",current);
    		}
    	}
    	console.groupEnd();
    }









	$("body").on("click", ".edit, #addCombatant", function() {
		console.groupCollapsed("Adding or editing");

		$("#dialog-form").html(statsWindow);console.log("Populating dialogbox");

		var addButtons, editButtons,
			edit = false,
			name = $("#name"),
			dexterity = $("#dexterity"),
			wits = $("#wits"),
			awareness = $("#awareness"),
			athletics = $("#athletics"),
			dodge = $("#dodge"),
			combat = $("#combat"),
			accuracy = $("#accuracy"),
			defense = $("#defense"),
			mobility = $("#mobility");

		if ($(this).attr("class") === "edit") edit = true;console.log("Edit?",edit);

		if (edit) {
			var id = $(this).parent().attr("id");

			name.val(combatants[id].name);
			dexterity.val(combatants[id].dexterity);
			wits.val(combatants[id].wits);
			awareness.val(combatants[id].awareness);
			athletics.val(combatants[id].athletics);
			dodge.val(combatants[id].dodge);
			combat.val(combatants[id].combat);
			accuracy.val(combatants[id].accuracy);
			defense.val(combatants[id].defense);
			mobility.val(combatants[id].mobility);
		}

		$("#dialog").dialog({
			title: (edit ? "Edit combatant" : "Add combatant"),
			autoOpen: false,
			height: "auto",
			width: 350,
			modal: true,
			close: (edit ? editClose : addClose)});

		if (edit) {
			$("#dialog").dialog("option", "buttons", [
				{ text: "Edit combatant", click: editCombatant },
				{ text: "Cancel", click: function() {
					$("#dialog").dialog("close");
				}}]);
		} else {
			$("#dialog").dialog("option", "buttons", [
				{ text: "Add combatant", click: addCombatant },
				{ text: "Cancel", click: function() {
					$("#dialog").dialog("close");
				}}]);
		}

		$("#dialog").dialog("open");

		console.groupEnd();

		function addCombatant() {
			console.groupCollapsed("Adding Combatant");
			combatantIndex++;console.log("combatantIndex is now",combatantIndex);
			numCombatants++;console.log("numCombatants is now",numCombatants);

			combatants[combatantIndex] = new Combatant(name.val());
			recordStats(combatantIndex);
			combatants[combatantIndex].initiative = combatants[combatantIndex].joinBattle();

			printCombatants();console.groupEnd();

			$("#dialog").dialog("close");
		}

		function editCombatant() {
			recordStats(id);
			printCombatants();
			$("#dialog").dialog("close");
		}

		function editClose() {
			var editCombatantForm = $("#dialog-form").on("submit", function(event) {
				event.preventDefault();
				editCombatant();
			});

			editCombatantForm[0].reset();
		}

		function addClose() {
			var addCombatantForm = $("#dialog-form").on("submit", function(event) {
				event.preventDefault();
				addCombatant();
			});

			addCombatantForm[0].reset();
		}

		function recordStats(i) {
			combatants[i].dexterity = parseInt(dexterity.val());
			combatants[i].wits = parseInt(wits.val());
			combatants[i].awareness = parseInt(awareness.val());
			combatants[i].athletics = parseInt(athletics.val());
			combatants[i].dodge = parseInt(dodge.val());
			combatants[i].combat = parseInt(combat.val());
			combatants[i].accuracy = parseInt(accuracy.val());
			combatants[i].defense = parseInt(defense.val());
			combatants[i].mobility = parseInt(mobility.val());
		}
	});









	function randomStatsGenerator() {
		console.groupCollapsed("Stats generator");
		$("#dialog-form :input[type=number]").each(function(){
			var min = parseInt($(this).attr("min")),
				max = parseInt($(this).attr("max")),
				diff = max - min,
				randomVal = Math.floor(Math.random() * diff) + min;

			console.log("min:",min);
			console.log("max:",max);
			console.log("diff:",diff);
			console.log("new value:",randomVal);

			$(this).val(randomVal);
		});
		console.groupEnd();
	}

	function randomNameGenerator(data) {
		console.groupCollapsed("Name generator");
		var localeCount = Object.keys(data).length,
			localeID = Math.floor((Math.random() * localeCount)),
			locale = Object.keys(data)[localeID],
			templateGroupCount = eval("Object.keys(data." + locale + ".templates).length"),
			templateGroupID = Math.floor((Math.random() * templateGroupCount)),
			templateGroup = eval("Object.keys(data." + locale + ".templates)[templateGroupID]"),
			wordGroupsCount = eval("Object.keys(data." + locale + ".words).length"),
			templateCount = eval("Object.keys(data." + locale + ".templates." + templateGroup + ").length"),
			templateID = Math.floor((Math.random() * templateCount)),
			template = eval("data." + locale + ".templates."+templateGroup+"["+templateID+"]"),
			output = "";

		console.log("Locale:",locale);
		console.log("# Template groups:",templateGroupCount);
		console.log("# Word groups:",wordGroupsCount);
		console.log("Template group: #" + templateGroupID + " " + templateGroup);
		console.log("Template:",templateID,template);

		for (var i in template) {
			var wordGroup = eval("data." + locale + ".words."+template[i]),
				numWords = wordGroup.length,
				word = Math.floor((Math.random() * numWords));
			output += wordGroup[word];
		}
		console.log("Result:",output);

		output = output.trim();

		$("#name").val(output);

		console.groupEnd();
	}









	function printCombatants() {
		console.groupCollapsed("printCombatants");
		$("tr.playerBubble").remove();console.log("deleting existing player list");

		combatants.sort(sortbyInitiative);

		for (current in combatants) {
			$("#combatants > tbody:last").append('<tr class="' + 
				(combatants[current].active ? '' : 'inactive ') +
				'playerBubble">' + 
				'<td name="' + combatants[current].name + '" id="' + current + '" class="player">' +
				'<span class="initiative">' + combatants[current].initiative + '</span>' +
				'<span class="name">' + combatants[current].name + '</span><br/>' +
				'<span class="stats">' +
				'Join Battle: ' + combatants[current].getJoinBattlePool() +
				' &bull; Withering Attack: ' + combatants[current].getWitheringPool() +
				' &bull; Decisive Attack: ' + combatants[current].getDecisivePool() +
				' &bull; Parry: ' + combatants[current].getParryPool() +
				' &bull; Evade: ' + combatants[current].getEvasionPool() +
				' &bull; Rush: ' + combatants[current].getRushPool() +
				' &bull; Disengage: ' + combatants[current].getDisengagePool() +
				'</span><br/>' +
				'<input type="button" class="attack" value="Attack"/>' +
				'<input type="button" class="edit" value="Edit"/>' +
				'<input type="button" class="activeToggle" value="Toggle Active"/>' +
				'<input type="button" class="remove" value="X"/>' +
				'</td></tr>');
		}

		console.log("done printing combatants");
		console.groupEnd();
	}

	function sortbyInitiative(a, b) {
		if (a.active && !b.active) return -1;
		else if (!a.active && b.active) return 1;
		else {
			if (a.initiative > b.initiative) return -1;
			else if (a.initiative < b.initiative) return 1;
			else return 0;
		}
	}

	function sortbyName(a, b) {
		if (a.name > b.name) return 1;
		else if (a.name < b.name) return -1;
		else return 0;
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
});