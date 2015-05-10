function dialogAddCombatant() {
	DIALOG_FORM.html(STATS_WINDOW);

	DIALOG.dialog({
		title: 'Add combatant',
		close: function() {
			closeAdd();}
		});

	console.log('Adding');
	
	dialogVectors();
	
	DIALOG.dialog('option', 'buttons', [
		{ text: 'Add combatant', click: function() {
			addCombatant();
			SCENE.printCombatants();
		}},
		{ text: 'Cancel', click: function() {
			DIALOG.dialog('close');
		}}]);

	DIALOG.dialog('open');
}

function dialogEditCombatant() {
	var id = $(this).parent().data('combatant').id;

	DIALOG_FORM.html(STATS_WINDOW);

	DIALOG.dialog({
		title: 'Edit combatant',
		close: function(){closeEdit(id);}
	});

	console.log('Editing');
	$('#dialog-form :input').Ex3('getStats', id);

	DIALOG.dialog('option', 'buttons', [
		{ text: 'Edit combatant', click: function() {
			recordStats(id);
			SCENE.printCombatants();
			DIALOG.dialog('close');
		}},
		{ text: 'Cancel', click: function() {
			DIALOG.dialog('close');
		}}]);

	DIALOG.dialog('open');
}

function dialogDebug() {
	var id = $(this).parent().attr('id'),
		lookup = lookupByID(SCENE.combatants);

	DIALOG_FORM.html(DEBUG_WINDOW);

	dialogVectors(id);

	DIALOG.dialog({
		title: 'Debug',
		buttons: {
			Edit: function() {
				recordStats(id);
				lookup[id].recordDamage();
				doRound();
				DIALOG.dialog('close');
			},
			Cancel: function() {
				DIALOG.dialog('close');
			}
		},
		close: function() {
			closeEdit(id);
		}
	});

	$('#dialog-form :input').Ex3('getStats', id);
	$('#crashedBy').Ex3('populateHostile', id, undefined);
	$('#shiftTarget').Ex3('populateHostile', id, undefined);

	DIALOG.dialog('open');
}



function addCombatant() {
	var x = SCENE.combatants.length;
	console.log('Adding combatant — current length of SCENE.combatants is',x);

	SCENE.combatants.push(new Combatant());
	recordStats(SCENE.combatants[x].id);

	if (ROUND > 0) {		
		SCENE.combatants[x].initiative = SCENE.combatants[x].joinBattle();

		printResult(SCENE.combatants[x].name,'joins battle at tick',SCENE.combatants[x].initiative);
	}

	DIALOG.dialog('close');
}

function closeAdd() {
	var addCombatantForm = DIALOG_FORM.on('submit', function(event) {
		event.preventDefault();
		addCombatant(SCENE.combatants);
	});

	addCombatantForm[0].reset();
}

function closeEdit(id) {
	var editCombatantForm = DIALOG_FORM.on('submit', function(event) {
		event.preventDefault();
		recordStats(id);
		DIALOG.dialog('close');
	});

	editCombatantForm[0].reset();
}

function recordStats(id) {
	console.groupCollapsed('record stats',id);

	DIALOG_FORM_INPUTS.refresh();

	var lookup = lookupByID(SCENE.combatants);
		console.log(lookup);

	console.log('refreshing dialog form inputs selector');
	console.log(DIALOG_FORM_INPUTS);

	DIALOG_FORM_INPUTS.each(function() {
		var stat = $(this).attr('id'),
			type = $(this).attr('type'),
			value = $(this).val();

		if (type === undefined) type = $(this).prop('tagName').toLowerCase();

		if (String(stat).match('^range-')) {
			var target = String(stat).replace('range-', ''),
				range = {value: value};
				
			lookup[id].setRange(lookup[target], value);
		} else if (String(stat).match('^hostile-')) {
			// uhh I'll figure this out later
			var target = String(stat).replace('hostile-', ''),
				hostile = $(this).prop('checked');

			lookup[id].setHostility(lookup[target], hostile);
		} else if (stat === 'crashedBy')
			lookup[id].crashedBy = lookup[value];
		else if (stat === 'shiftTarget')
			lookup[id].shiftTarget = lookup[value];
		else if (stat) {
			if (type === 'text') {
				lookup[id][stat] = sanitize(value);
			} else if (type === 'checkbox') {
				value = $(this).prop('checked');
				lookup[id][stat] = value;
			} else if (type !== 'select') {
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
			id = $(this).parent().attr('id'),
			lookup = lookupByID(SCENE.combatants);

		aimForm = DIALOG_FORM.on('submit', function(event) {
			event.preventDefault();
			aim(id, $('#aimTargets option:selected').val());
		});

		DIALOG.dialog({
			title: 'Aim',
			buttons: {
				Aim: function() {
					aim(id, $('#aimTargets option:selected').val());
				},
				Cancel: function() {
					DIALOG.dialog('close');
				}
			},
			close: function() {
				aimForm[0].reset();
			}
		});

		$('#aimTargets').Ex3('populateHostile', id, 0);

		DIALOG.dialog('open');
	} else {
		console.log('There\'s nobody to aim at!');
	}
	
	console.groupEnd();
}









function dialogAttack() {
	console.groupCollapsed('Attack Button');

	var attackForm,
		id = $(this).parent().attr('id'),
		lookup = lookupByID(SCENE.combatants),
		maxRange = ($(this).prop('class') === 'rangedAttack' ? undefined : 0);

	DIALOG_FORM.html(ATTACK_WINDOW);

	attackForm = DIALOG_FORM.on('submit', function(event) {
		event.preventDefault();
		attack(id, $('#opponents option:selected').val());
	});

	DIALOG.dialog({
		title: 'Attack',
		buttons: {
			Attack: function() {
				attack(id, $('#opponents option:selected').val());
			},
			Cancel: function() {
				DIALOG.dialog('close');
			}
		},
		close: function() {
			attackForm[0].reset();
		}
	});
	$('#opponents').Ex3('populateHostile', id, 0, maxRange);
	$('#attackTick').Ex3('getDelayTicks', id);

	if (lookup[id].initiative < 1) $('#decisive').prop('disabled', true);

	DIALOG.dialog('open');

	$('#withering').prop('checked', true);
	$('#stuntAttackOne').prop('checked', true);
	$('#stuntDefendOne').prop('checked', true);
	
	console.groupEnd();
}









function dialogFlurry() {
	DIALOG_FORM.html(FLURRY_WINDOW);

	DIALOG.dialog({
		title: 'McFlurry',
		buttons: {
			'I Hate You': function() {
				DIALOG.dialog('close');
			},
			'Delicious!': function() {
				DIALOG.dialog('close');
			}
		},
		close: function() {
			DIALOG.dialog('close');
		}
	});

	DIALOG.dialog('open');
}









function dialogMove() {
	var id = $(this).parent().attr('id'),
		lookup = lookupByID(SCENE.combatants),
		moveForm = DIALOG_FORM.on('submit', function(event) {
			event.preventDefault();
			move(id, $('#moveTargets option:selected').val());
		});
	
	DIALOG_FORM.html(MOVE_WINDOW);
	
	$('#moveTargets, label[for=moveTargets]').hide();

	DIALOG.dialog({
		title: 'Move',
		buttons: {
			Move: function() {
				move(id, $('input[name=moveType]:checked').val(), $('#moveTargets option:selected').val());
			},
			Cancel: function() {
				DIALOG.dialog('close');
			}
		},
		close: function() {
			moveForm[0].reset();
		}
	});

	if (lookup[id].getMinRange({hostile: true}) < 1) $('#move, label[for=move]').hide(); // can't Move normally if Engaged
	else $('#disengage, label[for=disengage]').hide();

	$('#moveTargets').Ex3('populate', id, 1); // can't move to a target at range 0, you're already there

	DIALOG.dialog('open');
}

function dialogMoveType() {
	var type = $('input[name=moveType]:checked');

	if (type.val() === 'move') $('#moveTargets, label[for=moveTargets]').show();
}









function dialogRandom() {
	console.log('Random Button');
	randomNameGenerator(NAMES_DATABASE);
	randomStatsGenerator();
}









function dialogRange() {
	var id = $(this).attr('id'),
		range = parseInt($(this).val());

	console.log('dialogRange, id',id,'range',range);
	range = Math.min(range, RANGE_TRACK.length);
	console.log('displayed range',range,RANGE_TRACK[range]);

	$('label[for="' + id + '"]').html(RANGE_TRACK[range]);
}









function dialogVectors(id) {
	for (var i in SCENE.combatants) {
		var lookup = lookupByID(SCENE.combatants),
			them = SCENE.combatants[i],
			us = lookup[id];

		if (us !== them) {
			DIALOG_FORM.append(
				'<br>\n' + them.name + ': ' + '<br>\n' +
				'&bull; Range: <input type="number" class="range" id="range-' + them.id + '" value="1" min="0" max="4">' +
				'(<label for="range-' + them.id + '">Short</label>)<br>\n&bull; ' +
				'<label for="hostile-"' + them.id + '>Hostile:</label>' +
				'<input type="checkbox" id="hostile-' + them.id + '" checked>');
		}
	}
}









function joinBattle() {
	console.groupCollapsed('joinBattle clicked');
	console.log(SCENE.combatants.length,'combatants');
	if (SCENE.combatants.length > 0) {
		ROUND = 1;
		
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

			printResult(current.name,'joins battle at initiative',current.initiative);
		}

		printResult('--- ROUND 1 ---');
		doRound();
	} else {
		printResult('Not enough combatants!');
	}
	console.groupEnd();
}
