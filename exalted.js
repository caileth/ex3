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
			getStats(id);
		}

		DIALOG.dialog({
			title: (edit ? "Edit combatant" : "Add combatant"),
			autoOpen: false,
			height: "auto",
			width: "auto",
			modal: true,
			close: (edit ? function(){editClose(id);} : function(){addClose();})});

		if (edit) {
			DIALOG.dialog("option", "buttons", [
				{ text: "Edit combatant", click: function() {
					editCombatant(id);
					doRound();
				}},
				{ text: "Cancel", click: function() {
					DIALOG.dialog("close");
				}}]);
		} else {
			DIALOG.dialog("option", "buttons", [
				{ text: "Add combatant", click: function() {
					addCombatant();
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
		if (SCENE.combatants.length > 1) {	
			DIALOG_FORM.html(ATTACK_WINDOW);

			var attackForm,
				id = $(this).parent().attr("id"),
				lookup = lookupByID(SCENE.combatants);
	
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
		console.groupCollapsed("Random Button");
		randomNameGenerator(NAMES_DATABASE);
		randomStatsGenerator();
		console.groupEnd();
	});

	$("body").on('click', '.twink', function() {
		console.groupCollapsed("Twink Button");
		twinkNameGenerator();
		twinkStatsGenerator();
		console.groupEnd();
	});

	$("body").on('click', '.remove', function() {
		console.groupCollapsed("remove");

		var id = $(this).parent().attr("id");

		for (i in SCENE.combatants) {
			if (SCENE.combatants[i].id === id) {
				SCENE.combatants.splice(i,1);
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
		console.log(SCENE.combatants.length,"combatants");
		if (SCENE.combatants.length > 1) {
			RESULTS_WINDOW.append("\n---\n");
			for (i in SCENE.combatants) {
				var joinBattlePool = SCENE.combatants[i].getJoinBattlePool(),
					joinBattleRoll = diceRoller(joinBattlePool),
					joinBattleSuxx = Math.max(successChecker(joinBattleRoll, JB_TARGET, JB_DOUBLES), 0);
				SCENE.combatants[i].initiative = joinBattleSuxx + JB_EXTRA_SUX;
				RESULTS_WINDOW.append(SCENE.combatants[i].name + " joins battle at initiative " + SCENE.combatants[i].initiative + "\n");
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