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
	$('body').on('click', '.move', dialogMove);
	$('body').on('click', '.randomize', dialogRandom);
	$('body').on('click', '.rangedAttack', dialogAttack);	
	$('body').on('click', 'input[name=moveType]', dialogMoveType);

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

		printResult(lookup[id].name,'goes Full Defense!');
		
		doRound();
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









$.extend($.ui.dialog.prototype.options, { autoOpen: false, height: "auto", width: "auto", modal: true });









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
			console.groupCollapsed('populate: x =',x,'and y =',y);

			var minRange = (x != undefined ? x : lookup[id].getMinRange()),
				maxRange = (y != undefined ? y : lookup[id].getMaxRange());
			
			console.log('maxRange:',maxRange);

			this.empty();
				console.log('clearing out existing entries');

			if (x === undefined) this.append('<option value="undefined">None');

			if (lookup[id].shiftTarget != undefined && this.attr('id') === 'opponents') {
				console.log('adding shift target id',lookup[id].shiftTarget.id);

				this.append('<option value="' + lookup[id].shiftTarget.id + '">&raquo; ' + lookup[id].shiftTarget.name);
			} else for (var h = minRange; h <= maxRange; h++) {
				console.log("populating target list; minRange is",minRange,"maxRange is",maxRange);
				
				// using for in because lookup isn't an array lol
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
							(range != undefined && x === 'rangedAttack' ? ' (' + range + ')' : ''));
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
				var stat = $(this).attr('id'),
					type = $(this).attr('type');

				if (type === undefined) type = $(this).prop('tagName').toLowerCase();

				if (String(stat).match('^range-')) {
					var target = String(stat).replace('range-', ''),
						range = lookup[id].getRange(lookup[target]);

					$(this).val(range);
					
					$('.range').trigger('change');
				} else if (String(stat).match('^hostile-')) {
					var target = String(stat).replace('hostile-', ''),
						hostile = lookup[id].getHostility(lookup[target]);

					$(this).val(hostile);
					
					$('.range').trigger('change');
				} else if (stat) {
					if (type === 'checkbox')
						$(this).prop('checked', lookup[id][stat]);
					else if (type != "select")
						$(this).val(lookup[id][stat]);
				}
				
				console.log('stat/type:',stat,type);
			});
			console.groupEnd();
		}

		if (action === 'getDelayTicks') {
			console.groupCollapsed('getDelayTicks');

			var ticks = [];

			ticks.push(lookup[id].initiative);

			for (var j in lookup) {
				if (lookup[j].initiative < lookup[id].initiative && lookup[j].initiative != ticks[ticks.length - 1]) {
					ticks.push(lookup[j].initiative);
				}
			}

			this.empty();
				console.log('clearing out existing entries');

			for (var k in ticks) this.append('<option value="'+ticks[k]+'">'+ticks[k]+'');

			console.groupEnd();
			return this;
		}
	};
}(jQuery));