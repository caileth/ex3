$(function() {
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

		if (edit) $("#dialog-form :input").Ex3('getStats', id);

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
					SCENE.printCombatants();
				}},
				{ text: "Cancel", click: function() {
					DIALOG.dialog("close");
				}}]);
		} else {
			DIALOG.dialog("option", "buttons", [
				{ text: "Add combatant", click: function() {
					addCombatant();
					SCENE.printCombatants();
				}},
				{ text: "Cancel", click: function() {
					DIALOG.dialog("close");
				}}]);
		}

		DIALOG.dialog("open");

		console.groupEnd();
	});

	$("body").on( "click", ".aim", function() {
		console.groupCollapsed("Aim Button");
		if (SCENE.combatants.length > 1) {	
			DIALOG_FORM.html(AIM_WINDOW);

			var aimForm,
				id = $(this).parent().attr("id"),
				lookup = lookupByID(SCENE.combatants);
	
			aimForm = DIALOG_FORM.on("submit", function(event) {
				event.preventDefault();
				aim(id, $("#aimTargets option:selected").val());
			});
	
			DIALOG.dialog({
				title: "Aim",
				autoOpen: false,
				height: "auto",
				width: "auto",
				modal: true,
				buttons: {
					Aim: function() {
						aim(id, $("#aimTargets option:selected").val());
					},
					Cancel: function() {
						DIALOG.dialog("close");
					}
				},
				close: function() {
					aimForm[0].reset();
				}
			});
	
			$("#aimTargets").Ex3('populate', id);
	
			DIALOG.dialog("open");
		} else {
			console.log("There's nobody to aim at!");
		}
		
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
	
			$("#opponents").Ex3('populate', id);
			$("#attackTick").Ex3('getDelayTicks', id);
	
			if (lookup[id].initiative < 1) $("#decisive").prop('disabled', true);
	
			DIALOG.dialog("open");

			$("#withering").prop('checked', true);
			$("#stuntAttackOne").prop('checked', true);
			$("#stuntDefendOne").prop('checked', true);
		} else {
			console.log("There's nobody to attack!");
		}
		
		console.groupEnd();
	});

	$("body").on('click', '.debug', function() {
		var debugForm,
			id = $(this).parent().attr("id"),
			lookup = lookupByID(SCENE.combatants);

		DIALOG_FORM.html(
			'<label for="active">Active: </label><input type="checkbox" id="active"/>' + '<br/>' +
			'<label for="initiative">Initiative: </label><input type="number" id="initiative"/>' + '<br/>' +
			'<label for="crashedBy">Crashed By: </label><select id="crashedBy"></select>' + '<br/>' +
			'<label for="bashing">Bashing: </label><input type="number" id="bashing"/>' + '<br/>' +
			'<label for="lethal">Lethal: </label><input type="number" id="lethal"/>' + '<br/>' +
			'<label for="aggravated">Aggravated: </label><input type="number" id="aggravated"/>'
		);

		DIALOG.dialog({
			title: "Debug",
			autoOpen: false,
			height: "auto",
			width: "auto",
			modal: true,
			buttons: {
				Edit: function() {
					editCombatant(id);
					lookup[id].recordDamage();
					doRound();
				},
				Cancel: function() {
					DIALOG.dialog("close");
				}
			},
			close: function() {
				editClose(id);
			}
		});

		$("#dialog-form :input").Ex3('getStats', id);

		$("#crashedBy").Ex3('populate', id, true);

		DIALOG.dialog("open");
	});

	$("body").on('click', '.fullDefense', function() {
		var id = $(this).parent().attr("id"),
			lookup = lookupByID(SCENE.combatants);

		lookup[id].onslaught -= FULL_DEFENSE_BONUS;
		lookup[id].initiative -= 1;
		lookup[id].active = false;
		doRound();

		RESULTS_WINDOW.append(lookup[id].name + " goes Full Defense!\n");
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
		if (SCENE.combatants.length > 0) {
			ROUND = 1;
			RESULTS_WINDOW.append("\n--- ROUND 1 ---\n");
			for (i in SCENE.combatants) {
				var current = SCENE.combatants[i],
					joinBattlePool = current.getJoinBattlePool(),
					joinBattleRoll = diceRoller(joinBattlePool),
					joinBattleSuxx = Math.max(successChecker(joinBattleRoll, JB_TARGET, JB_DOUBLES), 0);

				current.initiative = joinBattleSuxx + JB_EXTRA_SUX;
				current.active = true;
				current.crashedAndWithered = false;
				current.turnsInCrash = 0;
				current.onslaught = 0;
				current.bashing	= 0;
				current.lethal = 0;
				current.aggravated = 0;
				current.crashedBy = undefined;
				current.crashRecovery = undefined;
				current.recordDamage();

				RESULTS_WINDOW.append(current.name + " joins battle at initiative " + current.initiative + "\n");
			}
			doRound();
		} else {
			RESULTS_WINDOW.append("\nNot enough combatants!");
		}
		scrollToBottom();
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









(function($) {
	// selector refresh mini-plugin by Esailija @ Stack Overflow (http://goo.gl/U1YyEm)
	$.fn.refresh = function() {
		var elems = $(this.selector);
		this.splice(0, this.length);
		this.push.apply(this, elems);
		return this;
	};









	$.fn.Ex3 = function(action, id, extra) {
		var lookup = lookupByID(SCENE.combatants);

		if (action === "populate") {
			console.groupCollapsed("populating target list");

			this.empty();
				console.log("clearing out existing entries");

			if (extra) this.append('<option value="undefined">None</option>');

			if (lookup[id].shiftTarget != undefined) {
				console.log("adding shift target id",lookup[id].shiftTarget.id);
				this.append('<option value="' + lookup[id].shiftTarget.id + '">' +	lookup[id].shiftTarget.name + '</option>');
			} else for (i in lookup) {
				if (i != id && lookup[i].initiative != undefined) {
					console.log("adding id",i);
					this.append(
						'<option value="' + i + '">' +
						(lookup[id].aimTarget === lookup[i] ? '* ' : '') +
						(lookup[id].crashedBy === lookup[i] ? '~ ' : '') +
						lookup[i].name + '</option>');
				} else {
					console.log("skipping",i);
				}
			}
			console.groupEnd();
			return this;
		}

		if (action === "getStats") {
			this.each(function() {
				var evalStr,
					stat = $(this).attr('id'),
					type = $(this).attr('type');

				if (type === undefined) type = $(this).prop('tagName').toLowerCase();
				
				if (stat) {
					if (type === "checkbox") {
						evalStr = "$(this).prop('checked', lookup['"+id+"']."+stat+")";
					} else if (type === "select") {
						// do nothing
					} else {
						evalStr = "$(this).val(lookup['"+id+"']."+stat+")";
					}
				}
				
				console.log(stat,type,evalStr);

				eval(evalStr);
			});
		}

		if (action === "getDelayTicks") {
			console.groupCollapsed("getting valid ticks");

			var ticks = new Array();

			ticks.push(lookup[id].initiative);

			for (i in lookup) {
				if (lookup[i].initiative < lookup[id].initiative && lookup[i].initiative != ticks[ticks.length - 1]) {
					ticks.push(lookup[i].initiative);
				}
			}

			this.empty();
				console.log("clearing out existing entries");

			for (j in ticks) this.append('<option value="'+ticks[j]+'">'+ticks[j]+'</option>');

			console.groupEnd();
			return this;
		}
	};
}(jQuery));