var CLASH_BONUS_WITHERING = 3,
	CLASH_BONUS_DECISIVE = 1,
	CLASH_PENALTY = 2,
	DECISIVE_MISS_PENALTY_HIGH = 3,
	DECISIVE_MISS_PENALTY_LOW = 2,
	DECISIVE_MISS_PENALTY_THRESHOLD = 10,
	DEFAULT_DIE_SIDE = 10,
	DEFAULT_DOUBLES = 10,
	DEFAULT_HEALTH_TRACK = ['-0', '-1', '-2', '-4', 'Incapacitated'],
	DEFAULT_NUM_DICE = 5,
	DEFAULT_TARGET = 7,
	DIALOG = $("#dialog"),
	DIALOG_FORM = $("#dialog-form"),
	DIALOG_FORM_INPUTS = $("#dialog-form :input"),
	DIALOG_FORM_NUMBERS = $("#dialog-form :input[type=number]:not(#initiative)"),
	GEAR_DATABASE,
	INITIATIVE_BREAK_BONUS = 5,
	INITIATIVE_RESET_TURNS = 3,
	INITIATIVE_RESET_VALUE = 3,
	GLYPH_EMPTY = '&#9711;',
	GLYPH_AGG = '&#10036;',
	GLYPH_LETHAL = '&#215;',
	GLYPH_BASHING = '&#8260;',
	JB_DIFFICULTY = 0,
	JB_DOUBLES = false,
	JB_EXTRA_SUX = 3,
	JB_TARGET = 7,
	NAMES_DATABASE,
	RESULTS_WINDOW = $("#results"),
	SCENE = new Scene(),
	WITHERING_PENALTY_INITIATIVE = 15,
	WOUND_PENALTY_BRUISED = 0,
	WOUND_PENALTY_INJURED = -1,
	WOUND_PENALTY_WOUNDED = -2,
	WOUND_PENALTY_MAIMED = -4;

var ATTACK_WINDOW =	'<label for="opponents">Target:</label>' +
					'<select id="opponents"></select><br/>' +
					'<label for="attackIsDecisive">Attack Type:</label>' +
					'<input type="radio" name="attackIsDecisive" id="withering" value="false">Withering' +
					'<input type="radio" name="attackIsDecisive" id="decisive" value="true">Decisive<br/>' +
					'<label for="attackStunt">Attacking Stunt:</label>' +
					'<input type="radio" name="attackStunt" value="0"/>None' +
					'<input type="radio" name="attackStunt" value="1"/>1-point' +
					'<input type="radio" name="attackStunt" value="2"/>2-point' +
					'<input type="radio" name="attackStunt" value="3"/>3-point<br/>' +
					'<label for="defendStunt">Defending Stunt:</label>' +
					'<input type="radio" name="defendStunt" value="0"/>None' +
					'<input type="radio" name="defendStunt" value="1"/>1-point' +
					'<input type="radio" name="defendStunt" value="2"/>2-point' +
					'<input type="radio" name="defendStunt" value="3"/>3-point<br/>' +
					'<label for="attackModifiers">Attack modifier(s): ' +
					'<input type="number" id="attackModifiers" value="0" min="-5" max="0"/>';

var STATS_WINDOW =	'<input type="text" id="name" placeholder="New Player" autofocus/>' +
					'<input type="button" class="randomize"/>' +
					'<input type="button" class="twink"/><br/>' +
					'<label for="strength">Strength: </label><input type="number" id="strength" value="1" min="1" max="5"/><br/>' +
					'<label for="dexterity">Dexterity: </label><input type="number" id="dexterity" value="1" min="1" max="5"/><br/>' +
					'<label for="stamina">Stamina: </label><input type="number" id="stamina" value="1" min="1" max="5"/><br/>' +
					'<label for="wits">Wits: </label><input type="number" id="wits" value="1" min="1" max="5"/><br/>' +
					'<label for="athletics">Athletics: </label><input type="number" id="athletics" value="0" min="0" max="5"/><br/>' +
					'<label for="awareness">Awareness: </label><input type="number" id="awareness" value="0" min="0" max="5"/><br/>' +
					'<label for="dodge">Dodge: </label><input type="number" id="dodge" value="0" min="0" max="5"/><br/>' +
					'<label for="combat">Combat Ability: </label><input type="number" id="combat" value="0" min="0" max="5"/><br/>' +
					'<label for="weaponPicker">Weapon: </label><select id="weaponPicker">' +
					'<option value="weapon.mortal.light">Unarmed</option>' +
					'<option value="weapon.mortal.light">Light Mortal Weapon</option>' +
					'<option value="weapon.mortal.medium">Medium Mortal Weapon</option>' +
					'<option value="weapon.mortal.heavy">Heavy Mortal Weapon</option>' +
					'<option value="weapon.artifact.light">Light Artifact Weapon</option>' +
					'<option value="weapon.artifact.medium">Medium Artifact Weapon</option>' +
					'<option value="weapon.artifact.heavy">Heavy Artifact Weapon</option></select><br/>' +
					'<label for="armorPicker">Armor: </label><select id="armorPicker">' +
					'<option value="armor.none.unarmored">Unarmored</option>' +
					'<option value="armor.mortal.light">Light Mortal Armor</option>' +
					'<option value="armor.mortal.medium">Medium Mortal Armor</option>' +
					'<option value="armor.mortal.heavy">Heavy Mortal Armor</option>' +
					'<option value="armor.artifact.light">Light Artifact Armor</option>' +
					'<option value="armor.artifact.medium">Medium Artifact Armor</option>' +
					'<option value="armor.artifact.heavy">Heavy Artifact Armor</option></select><br/>' +
					'<label for="accuracy">Weapon Accuracy: </label><input type="number" id="accuracy" value="4" min="0" max="5"/><br/>' +
					'<label for="damage">Weapon Damage: </label><input type="number" id="damage" value="7" min="7" max="14"/>' +
					'<input type="checkbox" id="doesLethal"/><label for="doesLethal"> Lethal?</label><br/>' +
					'<label for="overwhelming">Weapon Overwhelming: </label><input type="number" id="overwhelming" value="0" min="-1" max="4"/><br/>' +
					'<label for="defense">Weapon Defense: </label><input type="number" id="defense" value="0" min="-1" max="1"/><br/>' +
					'<label for="armor">Armor Soak: </label><input type="number" id="armor" value="0" min="0" max="12"/><br/>' +
					'<label for="hardness">Armor Hardness: </label><input type="number" id="hardness" value="0" min="0" max="10"/><br/>' +
					'<label for="mobility">Mobility Penalty: </label><input type="number" id="mobility" value="0" min="-2" max="0"/>';

$.getJSON('./includes/exaltedgear.json', function(data) {
	// exaltedgear.json syntax:
	// "GEAR_DATABASE" : {
	//   "weapon" : { "mortal/artifact" : { "weight" : [accuracy, damage, overwhelming, defense] } },
	//   "armor" : { "mortal/artifact" : { "weight" : [soak, hardness, mobility penalty] } }
	// }

	GEAR_DATABASE = data;
});

$.getJSON('./includes/exaltedname.json', function(data) {
	// exaltedname.json syntax:
	// (only two locales at the moment are "imperial" and "threshold")
	// "NAMES_DATABASE" : {
	//   "locale" : {
	//     "templates" : { "template" : [wordgroup, wordgroup, wordgroup, ...] }
	//     "words" : { "wordgroup" : [word, word, word, ...] }
	//   },
	//   "locale" : {...},
	//   ...
	// }

	NAMES_DATABASE = data;
});