function dialogAddCombatant() {
	var edit = ($(this).attr("class") === "edit"),
		id = $(this).parent().attr("id");

	DIALOG_FORM.html(STATS_WINDOW);

	DIALOG.dialog({
		title: (edit ? "Edit combatant" : "Add combatant"),
		autoOpen: false, height: "auto", width: "auto", modal: true,
		close: (edit ? function(){closeEdit(id);} : function(){closeAdd();})});

	if (edit === true) {
		console.groupCollapsed("Editing");
		$("#dialog-form :input").Ex3('getStats', id);
		DIALOG.dialog("option", "buttons", [
			{ text: "Edit combatant", click: function() {
				recordStats(id);
				SCENE.printCombatants();
				DIALOG.dialog("close");
			}},
			{ text: "Cancel", click: function() {
				DIALOG.dialog("close");
			}}]);
	} else {
		console.groupCollapsed("Adding");
		for (var i in SCENE.combatants) {
			var lookup = lookupByID(SCENE.combatants),
				them = SCENE.combatants[i],
				us = lookup[id];
	
			if (us != them) {
				DIALOG_FORM.append('<br>\nRange to ' + them.name + ': ');
				DIALOG_FORM.append('<input type="number" class="range" id="range-' + them.id + '" value="1" min="0" max="4">');
				DIALOG_FORM.append('<label for="range-' + them.id + '">Short</label>');
			}
		}
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
}

function dialogDebug() {
	var id = $(this).parent().attr("id"),
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

	for (i in SCENE.combatants) {
		var them = SCENE.combatants[i],
			us = lookup[id];

		if (us != them) {
			DIALOG_FORM.append('<br>\nRange to ' + them.name + ': ');
			DIALOG_FORM.append('<input type="number" class="range" id="range-' + them.id + '" value="1" min="0" max="4">');
			DIALOG_FORM.append('<label for="range-' + them.id + '">Short</label>');
		}
	}

	DIALOG.dialog({
		title: "Debug", autoOpen: false, height: "auto", width: "auto", modal: true,
		buttons: {
			Edit: function() {
				recordStats(id);
				lookup[id].recordDamage();
				doRound();
				DIALOG.dialog("close");
			},
			Cancel: function() {
				DIALOG.dialog("close");
			}
		},
		close: function() {
			closeEdit(id);
		}
	});

	$("#dialog-form :input").Ex3('getStats', id);
	$("#crashedBy").Ex3('populate', id, 'addNone');
	$("#shiftTarget").Ex3('populate', id, 'addNone');

	DIALOG.dialog("open");
}



function addCombatant() {
	var x = SCENE.combatants.length;
	console.log("Adding combatant — current length of SCENE.combatants is",x);

	SCENE.combatants.push(new Combatant());
	recordStats(SCENE.combatants[x].id);

	if (ROUND > 0) {		
		SCENE.combatants[x].initiative = SCENE.combatants[x].joinBattle();

		RESULTS_WINDOW.append(SCENE.combatants[x].name + " joins battle at tick " + SCENE.combatants[x].initiative + "\n");
		scrollToBottom();
	}

	DIALOG.dialog("close");
}

function closeAdd() {
	var addCombatantForm = DIALOG_FORM.on("submit", function(event) {
		event.preventDefault();
		addCombatant(SCENE.combatants);
	});

	addCombatantForm[0].reset();
}

function closeEdit(id) {
	var editCombatantForm = DIALOG_FORM.on("submit", function(event) {
		event.preventDefault();
		recordStats(id);
		DIALOG.dialog("close");
	});

	editCombatantForm[0].reset();
}

function recordStats(id) {
	console.groupCollapsed("record stats",id);

	DIALOG_FORM_INPUTS.refresh();

	var lookup = lookupByID(SCENE.combatants);
		console.log(lookup);

	console.log("refreshing dialog form inputs selector");
	console.log(DIALOG_FORM_INPUTS);

	DIALOG_FORM_INPUTS.each(function() {
		var evalStr,
			stat = $(this).attr('id'),
			type = $(this).attr('type'),
			value = $(this).val();

		if (type === undefined) type = $(this).prop('tagName').toLowerCase();

		if (String(stat).match("^range-")) {
			var target = String(stat).replace('range-', ''),
				range = {value: value};
				// range = {new Range(lookup[id], lookup[target], value)};
			
			// SCENE.ranges.push(range);
			lookup[id].setRange(lookup[target], value);
		} else if (stat === "crashedBy")
			lookup[id].crashedBy = lookup[value];
		else if (stat === "shiftTarget")
			lookup[id].shiftTarget = lookup[value];
		else if (stat) {
			if (type === "text") {
				evalStr = "lookup['"+id+"']."+stat+" = '"+sanitize(value)+"'";
			} else if (type === "checkbox") {
				value = $(this).prop('checked');
				evalStr = "lookup['"+id+"']."+stat+" = "+value;
			} else if (type != "select") {
				evalStr = "lookup['"+id+"']."+stat+" = parseInt("+value+")";
			}

			console.log(stat,type,value,evalStr);

			eval(evalStr);
		}
	});

	console.groupEnd();
}









function dialogAim() {
	console.groupCollapsed('Aim Button');
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
			title: "Aim", autoOpen: false, height: "auto", width: "auto", modal: true,
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

		$("#aimTargets").Ex3('populate', id, "rangedAttack");

		DIALOG.dialog("open");
	} else {
		console.log("There's nobody to aim at!");
	}
	
	console.groupEnd();
}









function dialogAttack() {
	console.groupCollapsed("Attack Button");

	var attackForm,
		id = $(this).parent().attr("id"),
		lookup = lookupByID(SCENE.combatants),
		populateExtra = ($(this).prop('class') === "rangedAttack" ? "rangedAttack" : undefined);

	if (SCENE.combatants.length > 1 && (populateExtra === "rangedAttack" || lookup[id].getMinRange() === 0)) {
		DIALOG_FORM.html(ATTACK_WINDOW);

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
		$("#opponents").Ex3('populate', id, populateExtra);
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
}









function dialogFlurry() {
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
}









function dialogRange() {
	var id = $(this).attr('id'),
		range = parseInt($(this).val());

	range = Math.max(range, RANGE_TRACK.length + 1);
	$('label[for=' + id + ']').html(RANGE_TRACK[range]);
}









function joinBattle() {
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
}