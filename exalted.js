$(function() {
	DIALOG.refresh();
	DIALOG_FORM.refresh();
	RESULTS_WINDOW.refresh();









	$("body").on("change", ".range", function() {
		var id = $(this).attr('id'),
			range = parseInt($(this).val());

		switch (range) {
			case 0:
				$("label[for=" + id + "]").html("Close");
				break;
			case 1:
				$("label[for=" + id + "]").html("Short");
				break;
			case 2:
				$("label[for=" + id + "]").html("Medium");
				break;
			case 3:
				$("label[for=" + id + "]").html("Long");
				break;
			default:
				$("label[for=" + id + "]").html("Extreme");
				break;
		}
	});

	$("body").on("click", ".edit, #addCombatant", function() {
		console.groupCollapsed("Adding or editing");

		DIALOG_FORM.html(STATS_WINDOW);

		var addButtons, editButtons,
			edit = false,
			id = $(this).parent().attr("id"),
			lookup = lookupByID(SCENE.combatants);

		for (i in SCENE.combatants) {
			var them = SCENE.combatants[i],
				us = lookup[id];

			if (us != them) {
				DIALOG_FORM.append('<br>\nRange to ' + them.name + ': ');
				DIALOG_FORM.append('<input type="number" class="range" id="range-' + them.id + '" value="1" min="0" max="4">');
				DIALOG_FORM.append('<label for="range-' + them.id + '">Short</label>');
			}
		}

		if ($(this).attr("class") === "edit") {
			edit = true;
			console.log("Edit?",edit);
		}

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
			'<label for="active">Active: </label><input type="checkbox" id="active">' + '<br>' +
			'<label for="initiative">Initiative: </label><input type="number" id="initiative">' + '<br>' +
			'<label for="crashedBy">Crashed By: </label><select id="crashedBy"></select>' + '<br>' +
			'<label for="shiftTarget">Shifting Vs: </label><select id="shiftTarget"></select>' + '<br>' +
			'<label for="bashing">Bashing: </label><input type="number" id="bashing">' + '<br>' +
			'<label for="lethal">Lethal: </label><input type="number" id="lethal">' + '<br>' +
			'<label for="aggravated">Aggravated: </label><input type="number" id="aggravated">'
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
		$("#crashedBy").Ex3('populate', id, 'addNone');
		$("#shiftTarget").Ex3('populate', id, 'addNone');

		DIALOG.dialog("open");
	});

	$("body").on('click', '.flurry', function() {
		DIALOG_FORM.html(FLURRY_WINDOW);

		DIALOG.dialog({
			title: "McFlurry",
			autoOpen: false,
			height: "auto",
			width: "auto",
			modal: true,
			buttons: {
				"I Hate You": function() {
					DIALOG.dialog("close");
				},
				"Delicious!": function() {
					DIALOG.dialog("close");
				}
			},
			close: function() {
				DIALOG.dialog("close");
			}
		});

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

		if (action === 'populate') {
			console.groupCollapsed("populating target list");

			var maxRange = (extra === 'rangeAttack' ? lookup[id].getMaxRange() : 0);
			console.log("maxRange:",maxRange);

			this.empty();
				console.log("clearing out existing entries");

			if (extra === 'addNone') this.append('<option value="undefined">None</option>');

			if (lookup[id].shiftTarget != undefined && this.attr('id') === "opponents") {
				console.log("adding shift target id",lookup[id].shiftTarget.id);
				this.append('<option value="' + lookup[id].shiftTarget.id + '">&raquo; ' +	lookup[id].shiftTarget.name + '</option>');
			} else for (var h = 0; h <= maxRange; h++) {
				for (var i in lookup) {
					var range = lookup[id].getRange(lookup[i]),
						sourceIsNotTarget = (i != id),
						targetInitiativeIsSet = (lookup[i].initiative != undefined),
						targetRangeIsCorrect = (range === h);

					console.log("looking for range",h,"target range is",range);
					
					if (sourceIsNotTarget && targetInitiativeIsSet && targetRangeIsCorrect) {
						console.log("adding",lookup[i].name);

						this.append(
							'<option value="' + i +'">' +
							(lookup[id].aimTarget	=== lookup[i] ? '* ' : '') +
							(lookup[id].crashedBy	=== lookup[i] ? '~ ' : '') +
							(lookup[id].shiftTarget	=== lookup[i] ? '&raquo; ' : '') +
							lookup[i].name +
							(range != undefined && extra === 'rangeAttack' ? ' (' + range + ')' : '') +
							'</option>');
					} else {
						console.log("skipping",i);
					}
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

				if (String(stat).match("^range-")) {
					var target = String(stat).replace('range-', ''),
						range = lookup[id].getRange(lookup[target]);

					$(this).val(range);
					
					$(".range").trigger("change");
				} else if (stat) {
					if (type === "checkbox")
						evalStr = "$(this).prop('checked', lookup['"+id+"']."+stat+")";
					else if (type != "select")
						evalStr = "$(this).val(lookup['"+id+"']."+stat+")";
				}
				
				console.log(stat,type,evalStr);

				eval(evalStr);
			});
		}

		if (action === "getDelayTicks") {
			console.groupCollapsed("getting valid ticks");

			var ticks = new Array();

			ticks.push(lookup[id].initiative);

			for (var j in lookup) {
				if (lookup[j].initiative < lookup[id].initiative && lookup[j].initiative != ticks[ticks.length - 1]) {
					ticks.push(lookup[j].initiative);
				}
			}

			this.empty();
				console.log("clearing out existing entries");

			for (var k in ticks) this.append('<option value="'+ticks[k]+'">'+ticks[k]+'</option>');

			console.groupEnd();
			return this;
		}
	};
}(jQuery));