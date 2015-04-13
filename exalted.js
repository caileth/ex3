$(function() {
	DIALOG.refresh();
	DIALOG_FORM.refresh();
	RESULTS_WINDOW.refresh();
	
	$('body').on('change', '#armorPicker', doPickerStats);
	$('body').on('change', '#weaponPicker', doPickerStats);
	$('body').on('change', '.range', dialogRange);

	$('body').on('click', '#addCombatant', dialogAddCombatant);
	$('body').on('click', '#joinBattle', joinBattle);
	$('body').on('click', '.aim', dialogAim);
	$('body').on('click', '.attack', dialogAttack);
	$('body').on('click', '.debug', dialogDebug);
	$('body').on('click', '.edit', dialogAddCombatant);
	$('body').on('click', '.flurry', dialogFlurry);
	$('body').on('click', '.rangedAttack', dialogAttack);

	$('body').on('click', '#roll', function() {		
		var difficulty = $('#difficulty').val(),
			doubleRule = $('input[name=doubleRule]:checked').val(),
			numDice = $('#numDice').val(),
			targetNumber = $('#targetNumber').val();

		printRoll(numDice, undefined, targetNumber, doubleRule, difficulty);
	});

	$('body').on('click', '.fullDefense', function() {
		var id = $(this).parent().attr("id"),
			lookup = lookupByID(SCENE.combatants);

		lookup[id].onslaught -= FULL_DEFENSE_BONUS;
		lookup[id].initiative -= 1;
		lookup[id].active = false;
		doRound();

		RESULTS_WINDOW.append(lookup[id].name + " goes Full Defense!\n");
	});

	$('body').on('click', '.move', function() {
		var id = $(this).parent().attr("id"),
			moveForm;

		DIALOG_FORM.html(MOVE_WINDOW);

		moveForm = DIALOG_FORM.on("submit", function(event) {
			event.preventDefault();
			move(id, $("#opponents option:selected").val());
		});

		DIALOG.dialog({
			title: 'Move', autoOpen: false, height: 'auto', width: 'auto', modal: true,
			buttons: {
				Move: function() {
					move(id, $("#moveTargets option:selected").val());
				},
				Cancel: function() {
					DIALOG.dialog('close');
				}
			},
			close: function() {
				moveForm[0].reset();
			}
		});

		$('#moveTargets').Ex3('populate', id, 1); // can't move to a target at range 0, you're already there

		DIALOG.dialog('open');
	});

	$('body').on('click', '.randomize', function() {
		console.groupCollapsed('Random Button');
		randomNameGenerator(NAMES_DATABASE);
		randomStatsGenerator();
		console.groupEnd();
	});

	$('body').on('click', '.remove', function() {
		console.groupCollapsed('remove');

		var id = $(this).parent().attr('id');

		for (var i in SCENE.combatants)
			for (var j in SCENE.combatants[i].vectors)
				if (SCENE.combatants[i].vectors[j].target.id === id)
					SCENE.combatants[i].vectors.splice(j,1);
			
		for (var k in SCENE.combatants)
			if (SCENE.combatants[k].id === id)
				SCENE.combatants.splice(k,1);

		if (SCENE.combatants.length === 0)
			ROUND = 0;

		doRound();
		console.groupEnd();
	});

	$('body').on('click', '.twink', function() {
		console.groupCollapsed('Twink Button');
		twinkNameGenerator();
		twinkStatsGenerator();
		console.groupEnd();
	});
});









$.extend({alert: function(message, title) {
	$("<div></div>").dialog({
		buttons: { "OK": function() { $(this).dialog("close"); } },
		close: function(event, ui) { $(this).remove(); },
		height: 'auto', width: 'auto',
		resizable: false, title: title, modal: true
	}).text(message);
}});









(function($) {
	// selector refresh mini-plugin by Esailija @ Stack Overflow (http://goo.gl/U1YyEm)
	$.fn.refresh = function() {
		var elems = $(this.selector);
		this.splice(0, this.length);
		this.push.apply(this, elems);
		return this;
	};









	$.fn.Ex3 = function(action, id, x, y) {
		var lookup = lookupByID(SCENE.combatants);		

		if (action === 'populate') {
			console.groupCollapsed('populate');

			var maxRange = (y != undefined ? y : lookup[id].getMaxRange());
			console.log('maxRange:',maxRange);

			this.empty();
				console.log('clearing out existing entries');

			if (x === undefined) this.append('<option value="undefined">None</option>');

			if (lookup[id].shiftTarget != undefined && this.attr('id') === 'opponents') {
				console.log('adding shift target id',lookup[id].shiftTarget.id);
				this.append('<option value="' + lookup[id].shiftTarget.id + '">&raquo; ' +	lookup[id].shiftTarget.name + '</option>');
			} else for (var h = 0; h <= maxRange; h++) {
				for (var i in lookup) {
					var range = lookup[id].getRange(lookup[i]),
						sourceIsNotTarget = (i != id),
						targetInitiativeIsSet = (lookup[i].initiative != undefined),
						targetRangeIsCorrect = (range === h);

					console.log('looking for range',h,'target range is',range);
					
					if (sourceIsNotTarget && targetInitiativeIsSet && targetRangeIsCorrect) {
						console.log('adding',lookup[i].name);

						this.append(
							'<option value="' + i +'">' +
							(lookup[id].aimTarget	=== lookup[i] ? '* ' : '') +
							(lookup[id].crashedBy	=== lookup[i] ? '~ ' : '') +
							(lookup[id].shiftTarget	=== lookup[i] ? '&raquo; ' : '') +
							lookup[i].name +
							(range != undefined && x === 'rangedAttack' ? ' (' + range + ')' : '') +
							'</option>');
					} else {
						console.log("skipping",i);
					}
				}
			}
			console.groupEnd();
			return this;
		}

		if (action === 'getStats') {
			console.groupCollapsed('getStats');
			this.each(function() {
				var evalStr,
					stat = $(this).attr('id'),
					type = $(this).attr('type');

				if (type === undefined) type = $(this).prop('tagName').toLowerCase();

				if (String(stat).match('^range-')) {
					var target = String(stat).replace('range-', ''),
						range = lookup[id].getRange(lookup[target]);

					$(this).val(range);
					
					$('.range').trigger('change');
				} else if (stat) {
					if (type === 'checkbox')
						evalStr = "$(this).prop('checked', lookup['"+id+"']."+stat+")";
					else if (type != "select")
						evalStr = "$(this).val(lookup['"+id+"']."+stat+")";
				}
				
				console.log('stat/type/evalStr:',stat,type,evalStr);
				eval(evalStr);
			});
			console.groupEnd();
		}

		if (action === 'getDelayTicks') {
			console.groupCollapsed('getDelayTicks');

			var ticks = new Array();

			ticks.push(lookup[id].initiative);

			for (var j in lookup) {
				if (lookup[j].initiative < lookup[id].initiative && lookup[j].initiative != ticks[ticks.length - 1]) {
					ticks.push(lookup[j].initiative);
				}
			}

			this.empty();
				console.log('clearing out existing entries');

			for (var k in ticks) this.append('<option value="'+ticks[k]+'">'+ticks[k]+'</option>');

			console.groupEnd();
			return this;
		}
	};
}(jQuery));