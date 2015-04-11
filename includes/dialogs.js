function editCombatant(id) {
	console.groupCollapsed("editCombatant");

	recordStats(id, SCENE.combatants);
	DIALOG.dialog("close");console.log("closing dialog");

	console.groupEnd();
}

function addCombatant() {
	var i = SCENE.combatants.length;
	console.log("Adding combatant — current length of SCENE.combatants is",i);

	SCENE.combatants.push(new Combatant());
	recordStats(SCENE.combatants[i].id, SCENE.combatants);

	if (ROUND > 0) {		
		SCENE.combatants[i].initiative = SCENE.combatants[i].joinBattle();

		RESULTS_WINDOW.append(SCENE.combatants[i].name + " joins battle at tick " + SCENE.combatants[i].initiative + "\n");
		scrollToBottom();
	}

	DIALOG.dialog("close");
}

function editClose(id) {
	var editCombatantForm = DIALOG_FORM.on("submit", function(event) {
		event.preventDefault();
		editCombatant(id, SCENE.combatants);
	});

	editCombatantForm[0].reset();
}

function addClose() {
	var addCombatantForm = DIALOG_FORM.on("submit", function(event) {
		event.preventDefault();
		addCombatant(SCENE.combatants);
	});

	addCombatantForm[0].reset();
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