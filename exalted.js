$(function() {
	var round = 0;

	DIALOG.refresh();
	DIALOG_FORM.refresh();
	RESULTS_WINDOW.refresh();









	$("body").on("click", ".edit, #addCombatant", function() {
		console.groupCollapsed("Adding or editing");

		DIALOG_FORM.html(STATS_WINDOW);console.log("Populating dialogbox");

		var addButtons, editButtons,
			edit = false,
			id = $(this).parent().attr("id");

		if ($(this).attr("class") === "edit") edit = true;console.log("Edit?",edit);

		if (edit) {
			DIALOG_FORM.append('<br/><label for="initiative">Initiative: </label><input type="number" id="initiative" value="0"/>');
			getStats(id, combatants);
		}

		DIALOG.dialog({
			title: (edit ? "Edit combatant" : "Add combatant"),
			autoOpen: false,
			height: "auto",
			width: "auto",
			modal: true,
			close: (edit ? function(){editClose(id, combatants);} : function(){addClose(combatants);})});

		if (edit) {
			DIALOG.dialog("option", "buttons", [
				{ text: "Edit combatant", click: function() {
					editCombatant(id, combatants);
					doRound();
				}},
				{ text: "Cancel", click: function() {
					DIALOG.dialog("close");
				}}]);
		} else {
			DIALOG.dialog("option", "buttons", [
				{ text: "Add combatant", click: function() {
					addCombatant(combatants);
					doRound();
				}},
				{ text: "Cancel", click: function() {
					DIALOG.dialog("close");
				}}]);
		}

		DIALOG.dialog("open");

		console.groupEnd();
	});

	$("body").on( "click", ".attack", function() {
		console.groupCollapsed("Attack Button");
		if (combatants.length > 1) {	
			DIALOG_FORM.html(ATTACK_WINDOW);

			var attackForm,
				id = $(this).parent().attr("id"),
				lookup = lookupByID(combatants);
	
			attackForm = DIALOG_FORM.on("submit", function(event) {
				event.preventDefault();
				attack(id, $("#opponents option:selected").val());
			});
	
			DIALOG.dialog({
				title: "Attack",
				autoOpen: false,
				height: "auto",
				width: "auto",
				modal: true,
				buttons: {
					Attack: function() {
						attack(id, $("#opponents option:selected").val());
					},
					Cancel: function() {
						DIALOG.dialog("close");
					}
				},
				close: function() {
					attackForm[0].reset();
				}
			});
	
			populateTargetList(id);
	
			if (lookup[id].initiative < 1) $("#decisive").prop('disabled', true);
	
			DIALOG.dialog("open");
		} else console.log("There's nobody to attack!");
		console.groupEnd();
	});

	$("body").on('click', '.randomize', function() {
		randomNameGenerator(NAMES_DATABASE);
		randomStatsGenerator();
	});

	$("body").on('click', '.twink', function() {
		twinkNameGenerator();
		twinkStatsGenerator();
	});

	$("body").on('click', '.remove', function() {
		console.groupCollapsed("remove");

		var id = $(this).parent().attr("id");

		for (var i = 0; i < combatants.length; i++) {
			if (combatants[i].id === id) {
				combatants.splice(i,1);
			}
		}

		doRound();
		console.groupEnd();
	});

	$(document).on('change', '#armorPicker, #weaponPicker', function() {
		doPickerStats();
	});

	$("#joinBattle").click(function() {
		console.groupCollapsed("joinBattle clicked");
		console.log(combatants.length,"combatants");
		if(combatants.length > 1) {
			RESULTS_WINDOW.append("\n---\n");
			for (var i = 0; i < combatants.length; i++) {
				var joinBattlePool = combatants[i].getJoinBattlePool(),
					joinBattleRoll = diceRoller(joinBattlePool),
					joinBattleSuxx = Math.max(successChecker(joinBattleRoll, JB_TARGET, JB_DOUBLES), 0);
				combatants[i].initiative = joinBattleSuxx + JB_EXTRA_SUX;
				RESULTS_WINDOW.append(combatants[i].name + " joins battle at initiative " + combatants[i].initiative + "\n");
			}
			scrollToBottom();
			doRound();
		} else {
			RESULTS_WINDOW.append("\nNot enough combatants!");
		}
		console.groupEnd();
	});

	$("#roll").click(function() {		
		var difficulty = $("#difficulty").val(),
			doubleRule = $("input[name=doubleRule]:checked").val(),
			numDice = $("#numDice").val(),
			targetNumber = $("#targetNumber").val();

		printRoll(numDice, undefined, targetNumber, doubleRule, difficulty);
	});
});