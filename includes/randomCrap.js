function randomStatsGenerator() {
	var armorOptions = $("#armorPicker option"),
		weaponOptions = $("#weaponPicker option"),
		randomArmor = ~~(Math.random() * armorOptions.length),
		randomWeapon = ~~(Math.random() * weaponOptions.length);

	console.groupCollapsed("Stats generator");
	DIALOG_FORM_NUMBERS.refresh();
	DIALOG_FORM_NUMBERS.each(function(){
		$(this).val(randomStats($(this)));
	});

	armorOptions.eq(randomArmor).prop('selected', true);
	weaponOptions.eq(randomWeapon).prop('selected', true);
	doPickerStats();

	$(".range").trigger("change"); // update range display

	console.groupEnd();
}

function randomNameGenerator(data) {
	console.groupCollapsed("Name generator");
	var localeCount = Object.keys(data).length,
		localeID = ~~(Math.random() * localeCount),
		locale = Object.keys(data)[localeID],
		templateGroupCount = eval("Object.keys(data." + locale + ".templates).length"),
		templateGroupID = ~~(Math.random() * templateGroupCount),
		templateGroup = eval("Object.keys(data." + locale + ".templates)[templateGroupID]"),
		wordGroupsCount = eval("Object.keys(data." + locale + ".words).length"),
		templateCount = eval("Object.keys(data." + locale + ".templates." + templateGroup + ").length"),
		templateID = ~~(Math.random() * templateCount),
		template = eval("data." + locale + ".templates."+templateGroup+"["+templateID+"]"),
		output = "";

	console.log("Locale:",locale);
	console.log("# Template groups:",templateGroupCount);
	console.log("# Word groups:",wordGroupsCount);
	console.log("Template group: #" + templateGroupID + " " + templateGroup);
	console.log("Template:",templateID,template);

	for (var i in template) {
		var wordGroup = eval("data." + locale + ".words."+template[i]),
			numWords = wordGroup.length,
			word = ~~(Math.random() * numWords);
		output += wordGroup[word];
	}
	console.log("Result:",output);

	output = output.trim();

	$("#name").val(output);

	console.groupEnd();
}

function twinkNameGenerator() {
	var names = ["Reborn Vermillion Havoc","Chejop Kejak","The Scarlet Empress","The Ebon Dragon","The Unconquered Sun","Invincible Sword Princess","Killfuck Soulshitter","Ma-Ha-Suchi"],
		pick = ~~(Math.random() * names.length);

	$("#name").val(names[pick]);
}

function twinkStatsGenerator() {
	var armorOptions = $("#armorPicker option"),
		weaponOptions = $("#weaponPicker option"),
		lastArmor = armorOptions.length - 1,
		lastWeapon = weaponOptions.length - 1;

	DIALOG_FORM_NUMBERS.refresh();
	DIALOG_FORM_NUMBERS.each(function(){
		if ($(this).attr('class') === 'range') $(this).val(randomStats($(this)));
		else $(this).val(parseInt($(this).attr("max")));
	});

	armorOptions.eq(lastArmor).prop('selected', true);
	weaponOptions.eq(lastWeapon).prop('selected', true);
	doPickerStats();

	$(".range").trigger("change"); // update range display
}

function doPickerStats() {
	console.groupCollapsed("gear picker");
	var armorVal = $("#armorPicker").val(),
		armorStats = eval("GEAR_DATABASE." + armorVal),
		weaponVal = $("#weaponPicker").val(),
		weaponStats = eval("GEAR_DATABASE." + weaponVal);

	$("#armor").val(armorStats[0]);
	$("#hardness").val(armorStats[1]);
	$("#mobility").val(armorStats[2]);
	$("#accuracy").val(weaponStats[0]);
	$("#damage").val(weaponStats[1]);
	$("#doesLethal").prop('checked', weaponStats[4]);
	$("#overwhelming").val(weaponStats[2]);
	$("#defense").val(weaponStats[3]);

	console.log("new value for #weaponPicker is",weaponVal,":",weaponStats);
	console.log("new value for #armorPicker is",armorVal,":",armorStats);
	console.groupEnd();
}

function randomStats(thing) {
	var min = parseInt(thing.attr("min")),
		max = parseInt(thing.attr("max")),
		diff = max - min,
		randomVal = ~~(Math.random() * diff) + min;

	console.log("min:",min);
	console.log("max:",max);
	console.log("diff:",diff);
	console.log("new value:",randomVal);

	return randomVal;
}

function quake() {
	var qDuration = 600;
	
	// the horizontal displacement
	var deltaX = 1;

	// make sure the browser support the moveBy method
	if (window.moveBy) {
		for (var qCounter = 0; qCounter < qDuration; qCounter++) {
			if ((qCounter % 4) === 0) {
				window.moveBy(deltaX, 0); // shake left
			} else if ((qCounter % 4) === 2) { 
				window.moveBy(-deltaX, 0); // shake right
			}
			// speed up or slow down every X cycles
			if ((qCounter % 30) === 0) {
				// speed up halfway 
				if (qCounter < qDuration / 2) { 
					deltaX++;
				} else {
					// slow down after halfway of the duration
					deltaX--;
				}
			}
		}
	} else {
		alert("this is stupid");
	}
}