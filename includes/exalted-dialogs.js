function editCombatant(id, combatants) {
	console.groupCollapsed("editCombatant");

	recordStats(id, combatants);
	DIALOG.dialog("close");console.log("closing dialog");

	console.groupEnd();
}

function addCombatant(combatants) {
	console.groupCollapsed("Adding Combatant");

	var i = combatants.length;

	combatants[i] = new Combatant();
	recordStats(combatants[i].id, combatants);
	combatants[i].initiative = combatants[i].joinBattle();

	RESULTS_WINDOW.append(combatants[i].getName() + " joins battle at tick " + combatants[i].initiative + "\n");
	scrollToBottom();

	console.groupEnd();

	DIALOG.dialog("close");
}

function editClose(id, combatants) {
	var editCombatantForm = DIALOG_FORM.on("submit", function(event) {
		event.preventDefault();
		editCombatant(id, combatants);
	});

	editCombatantForm[0].reset();
}

function addClose(combatants) {
	var addCombatantForm = DIALOG_FORM.on("submit", function(event) {
		event.preventDefault();
		addCombatant(combatants);
	});

	addCombatantForm[0].reset();
}

function getStats(id, combatants) {
	DIALOG_FORM_INPUTS.refresh();

	var lookup = lookupByID(combatants);console.log(lookup);

	DIALOG_FORM_INPUTS.each(function() {
		var stat = $(this).attr("id"),
			evalStr = "$(this).val(lookup['"+id+"']."+stat+")";
		
		if (stat === "doesLethal") eval("$(this).prop('checked', lookup['"+id+"']."+stat+")");
		else if (stat === "armorPicker" || stat === "weaponPicker") { /* do nothing */ }
		else if (stat) eval(evalStr);
	});
}

function recordStats(id, combatants) {
	console.groupCollapsed("record stats",id);

	DIALOG_FORM_INPUTS.refresh();

	var lookup = lookupByID(combatants);console.log(lookup);

	console.log("refreshing dialog form inputs selector");
	console.log(DIALOG_FORM_INPUTS);

	DIALOG_FORM_INPUTS.each(function() {
		var evalStr,
			stat = $(this).attr("id"),
			value = $(this).val();

		if (stat) {
			if (stat === "name") evalStr = "lookup['"+id+"']."+stat+" = '"+sanitize(value)+"'";
			else if (stat === "armorPicker" || stat === "weaponPicker") {
				// do nothing
			} else if (stat === "doesLethal") {
				value = $(this).prop('checked');
				evalStr = "lookup['"+id+"'].doesLethal = '"+value+"'";
			} else evalStr = "lookup['"+id+"']."+stat+" = parseInt("+value+")";

			console.log(stat,value);

			eval(evalStr);
		}
	});

	console.groupEnd();
}