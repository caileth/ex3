function dialogAddCombatant() {
	var edit = ($(this).attr("class") === "edit"),
		source = $(this).parent.data('combatant'),
		id = source.id;

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
		
		dialogVectors(id);
		
		DIALOG.dialog("option", "buttons", [
			{ text: "Add combatant", click: function() {
				addCombatant();
				SCENE.printCombatants();
			}},
			{ text: "Cancel", click: function() {
				DIALOG.dialog("close");
			}}]);
	}

	randomNameGenerator(NAMES_DATABASE);
	randomStatsGenerator();

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

	dialogVectors(id);

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
	$("#crashedBy").Ex3('populate', id, undefined);
	$("#shiftTarget").Ex3('populate', id, undefined);

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
		var stat = $(this).attr('id'),
			type = $(this).attr('type'),
			value = $(this).val();

		if (type === undefined) type = $(this).prop('tagName').toLowerCase();

		if (String(stat).match("^range-")) {
			var target = String(stat).replace('range-', ''),
				range = {value: value};
				
			lookup[id].setRange(lookup[target], value);
		} else if (String(stat).match("^hostile-")) {
			// uhh I'll figure this out later
		} else if (stat === "crashedBy")
			lookup[id].crashedBy = lookup[value];
		else if (stat === "shiftTarget")
			lookup[id].shiftTarget = lookup[value];
		else if (stat) {
			if (type === "text") {
				lookup[id][stat] = sanitize(value);
			} else if (type === "checkbox") {
				value = $(this).prop('checked');
				lookup[id][stat] = value;
			} else if (type != "select") {
				lookup[id][stat] = parseInt(value);
			}

			console.log(stat,type,value);
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

		$("#aimTargets").Ex3('populate', id, 0);

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
		maxRange = ($(this).prop('class') === "rangedAttack" ? undefined : 0);

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
	$("#opponents").Ex3('populate', id, 0, maxRange);
	$("#attackTick").Ex3('getDelayTicks', id);

	if (lookup[id].initiative < 1) $("#decisive").prop('disabled', true);

	DIALOG.dialog("open");

	$("#withering").prop('checked', true);
	$("#stuntAttackOne").prop('checked', true);
	$("#stuntDefendOne").prop('checked', true);
	
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









function dialogMove() {
	var id = $(this).parent().attr("id"),
		lookup = lookupByID(SCENE.combatants),
		moveForm = DIALOG_FORM.on("submit", function(event) {
			event.preventDefault();
			move(id, $("#moveTargets option:selected").val());
		});
	
	DIALOG_FORM.html(MOVE_WINDOW);
	
	$("#moveTargets, label[for=moveTargets]").hide();

	DIALOG.dialog({
		title: 'Move', autoOpen: false, height: 'auto', width: 'auto', modal: true,
		buttons: {
			Move: function() {
				move(id, $('input[name=moveType]:checked').val(), $("#moveTargets option:selected").val());
			},
			Cancel: function() {
				DIALOG.dialog('close');
			}
		},
		close: function() {
			moveForm[0].reset();
		}
	});

	if (lookup[id].getMinRange() < 1) $("#move, label[for=move]").hide(); // can't Move normally if Engaged
	else $("#disengage, label[for=disengage]").hide();

	$('#moveTargets').Ex3('populate', id, 1); // can't move to a target at range 0, you're already there

	DIALOG.dialog('open');
}

function dialogMoveType() {
	var type = $('input[name=moveType]:checked');

	if (type.val() === 'move') $("#moveTargets, label[for=moveTargets]").show();
}









function dialogRandom() {
	console.groupCollapsed('Random Button');
	randomNameGenerator(NAMES_DATABASE);
	randomStatsGenerator();
	console.groupEnd();
}









function dialogRange() {
	var id = $(this).attr('id'),
		range = parseInt($(this).val());

	console.log("dialogRange, id",id,"range",range);
	range = Math.min(range, RANGE_TRACK.length);
	console.log("displayed range",range,RANGE_TRACK[range]);

	$('label[for="' + id + '"]').html(RANGE_TRACK[range]);
}









function dialogVectors(id) {
	for (var i in SCENE.combatants) {
		var lookup = lookupByID(SCENE.combatants),
			them = SCENE.combatants[i],
			us = lookup[id];

		if (us != them) {
			DIALOG_FORM.append(
				'<br>\n' + them.name + ': ' + 'Range ' +
				'<input type="number" class="range" id="range-' + them.id + '" value="1" min="0" max="4">' +
				'<label for="range-' + them.id + '">Short</label>'
				/*+'<label for="hostile-"' + them.id + '>Hostile?</label>'+
				'<input type="checkbox" id="hostile-' + them.id + '">'*/
			);
		}
	}
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
			current.hasMoved = false;
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