function randomStatsGenerator() {
	var armorOptions = $('#armorPicker option'),
		weaponOptions = $('#weaponPicker option'),
		randomArmor = ~~(Math.random() * armorOptions.length),
		randomWeapon = ~~(Math.random() * weaponOptions.length);

	console.groupCollapsed('Stats generator');
	DIALOG_FORM_NUMBERS.refresh();
	DIALOG_FORM_NUMBERS.each(function(){
		$(this).val(randomStats($(this)));
	});
	console.groupEnd();

	armorOptions.eq(randomArmor).prop('selected', true);
	weaponOptions.eq(randomWeapon).prop('selected', true);
	doPickerStats();

	$('.range').trigger('change'); // update range display
}

function randomNameGenerator(data) {
	console.groupCollapsed('Name generator');
	var localeCount = Object.keys(data).length,
		localeID = ~~(Math.random() * localeCount),
		locale = Object.keys(data)[localeID],
		templateGroupCount = Object.keys(data[locale].templates).length,
		templateGroupID = ~~(Math.random() * templateGroupCount),
		templateGroup = Object.keys(data[locale].templates)[templateGroupID],
		wordGroupsCount = Object.keys(data[locale].words).length,
		templateCount = Object.keys(data[locale].templates[templateGroup]).length,
		templateID = ~~(Math.random() * templateCount),
		template = data[locale].templates[templateGroup][templateID],
		output = '';

	console.log('Locale:',locale);
	console.log('# Template groups:',templateGroupCount);
	console.log('# Word groups:',wordGroupsCount);
	console.log('Template group: #' + templateGroupID + ' ' + templateGroup);
	console.log('Template:',templateID,template);

	for (var i in template) {
		var wordGroup = data[locale].words[template[i]],
			numWords = wordGroup.length,
			word = ~~(Math.random() * numWords);

		output += wordGroup[word];
	} console.log('Result:',output);

	output = output.trim();

	$('#name').val(output);

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
	var armorVal = $('#armorPicker option:selected').val().split('.'),
		armorStats = GEAR_DATABASE[armorVal[0]][armorVal[1]][armorVal[2]],
		weaponVal = $('#weaponPicker option:selected').val().split('.'),
		weaponStats = GEAR_DATABASE[weaponVal[0]][weaponVal[1]][weaponVal[2]];
	
	console.log('gear picker',armorVal,weaponVal,armorStats,weaponStats);

	$('#armor').val(armorStats[0]);
	$('#hardness').val(armorStats[1]);
	$('#mobility').val(armorStats[2]);
	$('#accuracy').val(weaponStats[0]);
	$('#damage').val(weaponStats[1]);
	$('#doesLethal').prop('checked', weaponStats[4]);
	$('#overwhelming').val(weaponStats[2]);
	$('#defense').val(weaponStats[3]);
}

function randomStats(thing) {
	var min = parseInt(thing.attr('min')),
		max = parseInt(thing.attr('max')),
		diff = max - min,
		randomVal = ~~(Math.random() * diff) + min;

	console.log('min:',min);
	console.log('max:',max);
	console.log('diff:',diff);
	console.log('new value:',randomVal);

	return randomVal;
}
