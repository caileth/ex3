var AIM_BONUS = 3,
	CLASH_BONUS_WITHERING = 3,
	CLASH_BONUS_DECISIVE = 1,
	CLASH_PENALTY = -2,
	DECISIVE_MISS_PENALTY_HIGH = -3,
	DECISIVE_MISS_PENALTY_LOW = -2,
	DECISIVE_MISS_PENALTY_THRESHOLD = 10,
	DEFAULT_DIE_SIDE = 10,
	DEFAULT_DOUBLES = 10,
	DEFAULT_NUM_DICE = 5,
	DEFAULT_TARGET = 7,
	DELAYED_ATTACK_PENALTY = -2,
	DIALOG = $('#dialog'),
	DIALOG_FORM = $('#dialog-form'),
	DIALOG_FORM_INPUTS = $('#dialog-form :input'),
	DIALOG_FORM_NUMBERS = $('#dialog-form :input[type=number]:not(#initiative)'),
	DISENGAGE_COST = -2,
	FULL_DEFENSE_BONUS = 2,
	GEAR_DATABASE,
	INITIATIVE_BREAK_BONUS = 5,
	INITIATIVE_RESET_TURNS = 3,
	INITIATIVE_RESET_VALUE = 3,
	GLYPHS_HEALTH = ['&#9675;','&#8856;','&#8855;','&#9679;'],
	GLYPHS_LUNAR = ['&#9679;','&#9790;','&#9675;'],
	GLYPHS_SIDEREAL = ['&#9791;','&#9792;','&#9794;','&#9795;','&#9796;'],
	GLYPHS_SOLAR = ['&#9788;','&#9679;','&#9683;','&#9675;','&#9673;'],
	JB_DIFFICULTY = 0,
	JB_DOUBLES = false,
	JB_EXTRA_SUX = 3,
	JB_TARGET = 7,
	NAMES_DATABASE,
	RANGE_TRACK = ['Close','Short','Medium','Long','Extreme'],
	RESULTS_WINDOW = $("#results"),
	ROUND = 0,
	SCENE = new Scene(),
	SPECIALTY_DIE_BONUS = 1,
	WITHERING_PENALTY_INITIATIVE = 15,
	WOUND_PENALTY_BRUISED = 0,
	WOUND_PENALTY_INJURED = -1,
	WOUND_PENALTY_WOUNDED = -2,
	WOUND_PENALTY_MAIMED = -4;

var AIM_WINDOW =	'<label for="aimTargets">Target:</label>' +
					'<select id="aimTargets"></select><br>';

var ATTACK_WINDOW =	'<label for="opponents">Target:</label>' +
					'<select id="opponents"></select><br>' +
					'<label for="attackTick">Attack on tick:</label>' +
					'<select id="attackTick"></select><br>' +
					'<label for="attackIsDecisive">Attack Type:</label>' +
					'<input type="radio" name="attackIsDecisive" id="withering" value="false"><label for="withering">Withering</label>' +
					'<input type="radio" name="attackIsDecisive" id="decisive" value="true"><label for="decisive">Decisive</label><br>' +
					'<label for="attackStunt">Attacking Stunt:</label>' +
					'<input type="radio" name="attackStunt" id="stuntAttackNone" value="0"><label for="stuntAttackNone">None</label>' +
					'<input type="radio" name="attackStunt" id="stuntAttackOne" value="1"><label for="stuntAttackOne">1-point</label>' +
					'<input type="radio" name="attackStunt" id="stuntAttackTwo" value="2"><label for="stuntAttackTwo">2-point</label>' +
					'<input type="radio" name="attackStunt" id="stuntAttackThree" value="3"><label for="stuntAttackThree">3-point</label><br>' +
					'<label for="defendStunt">Defending Stunt:</label>' +
					'<input type="radio" name="defendStunt" id="stuntDefendNone" value="0"><label for="stuntDefendNone">None</label>' +
					'<input type="radio" name="defendStunt" id="stuntDefendOne" value="1"><label for="stuntDefendOne">1-point</label>' +
					'<input type="radio" name="defendStunt" id="stuntDefendTwo" value="2"><label for="stuntDefendTwo">2-point</label>' +
					'<input type="radio" name="defendStunt" id="stuntDefendThree" value="3"><label for="stuntDefendThree">3-point</label><br>' +
					'<label for="attackSpecialty">Applicable specialty on attack?</label>' +
					'<input type="checkbox" id="specialtyAttack"><br>' +
					'<label for="defenseSpecialty">Applicable specialty on defense?</label>' +
					'<input type="checkbox" id="specialtyDefense"><br>' +
					'<label for="attackModifiers">Attack modifier(s): ' +
					'<input type="number" id="attackModifiers" value="0" min="-5" max="0">';

var DEBUG_WINDOW =	'<label for="active">Active: </label><input type="checkbox" id="active">' + '<br>' +
					'<label for="initiative">Initiative: </label><input type="number" id="initiative">' + '<br>' +
					'<label for="crashedBy">Crashed By: </label><select id="crashedBy"></select>' + '<br>' +
					'<label for="shiftTarget">Shifting Vs: </label><select id="shiftTarget"></select>' + '<br>' +
					'<label for="bashing">Bashing: </label><input type="number" id="bashing">' + '<br>' +
					'<label for="lethal">Lethal: </label><input type="number" id="lethal">' + '<br>' +
					'<label for="aggravated">Aggravated: </label><input type="number" id="aggravated">';

var FLURRY_WINDOW =	'<img src="http://wac.450f.edgecastcdn.net/80450F/thefw.com/files/2012/07/Pie-Mcflurry.png" alt="SEE WHAT I DID THERE" id="mcFlurry">';

var MOVE_WINDOW =	'<label for="moveType">Action:</label>' +
					'<input type="radio" name="moveType" value="move" id="move"><label for="move">Move</label>' +
					'<input type="radio" name="moveType" value="disengage" id="disengage"><label for="disengage">Disengage</label>' +
					'<input type="radio" name="moveType" value="rush" id="rush"><label for="rush">Rush</label>' +
					'<input type="radio" name="moveType" value="riseFromProne" id="riseFromProne"><label for="riseFromProne">Rise from Prone</label>' +
					'<input type="radio" name="moveType" value="takeCover" id="takeCover"><label for="takeCover">Take Cover</label>' +
					'<br><label for="moveTargets">Target:</label><select id="moveTargets"></select>';

var STATS_WINDOW =	'<input type="text" id="name" placeholder="New Player" autofocus>' +
					'<input type="button" class="randomize">' +
					'<input type="button" class="twink"><br>' +
					'<label for="strength">Strength:</label> <input type="number" id="strength" value="1" min="1" max="5"><br>' +
					'<label for="dexterity">Dexterity:</label> <input type="number" id="dexterity" value="1" min="1" max="5"><br>' +
					'<label for="stamina">Stamina:</label> <input type="number" id="stamina" value="1" min="1" max="5"><br>' +
					'<label for="wits">Wits:</label> <input type="number" id="wits" value="1" min="1" max="5"><br>' +
					'<label for="athletics">Athletics:</label> <input type="number" id="athletics" value="0" min="0" max="5"><br>' +
					'<label for="awareness">Awareness:</label> <input type="number" id="awareness" value="0" min="0" max="5"><br>' +
					'<label for="dodge">Dodge:</label> <input type="number" id="dodge" value="0" min="0" max="5"><br>' +
					'<label for="combat">Combat Ability:</label> <input type="number" id="combat" value="0" min="0" max="5"><br>' +
					'<label for="weaponPicker">Weapon:</label> <select id="weaponPicker">' +
					'<option value="weapon.mortal.light">Unarmed' +
					'<option value="weapon.mortal.light">Light Mortal Weapon' +
					'<option value="weapon.mortal.medium">Medium Mortal Weapon' +
					'<option value="weapon.mortal.heavy">Heavy Mortal Weapon' +
					'<option value="weapon.artifact.light">Light Artifact Weapon' +
					'<option value="weapon.artifact.medium">Medium Artifact Weapon' +
					'<option value="weapon.artifact.heavy">Heavy Artifact Weapon</select><br>' +
					'<label for="armorPicker">Armor:</label> <select id="armorPicker">' +
					'<option value="armor.none.unarmored">Unarmored' +
					'<option value="armor.mortal.light">Light Mortal Armor' +
					'<option value="armor.mortal.medium">Medium Mortal Armor' +
					'<option value="armor.mortal.heavy">Heavy Mortal Armor' +
					'<option value="armor.artifact.light">Light Artifact Armor' +
					'<option value="armor.artifact.medium">Medium Artifact Armor' +
					'<option value="armor.artifact.heavy">Heavy Artifact Armor</select><br>' +
					'<label for="accuracy">Weapon Accuracy:</label> <input type="number" id="accuracy" value="4" min="0" max="5"><br>' +
					'<label for="damage">Weapon Damage:</label> <input type="number" id="damage" value="7" min="7" max="14">' +
					'<input type="checkbox" id="doesLethal"><label for="doesLethal"> Lethal?</label><br>' +
					'<label for="overwhelming">Weapon Overwhelming:</label> <input type="number" id="overwhelming" value="0" min="-1" max="4"><br>' +
					'<label for="defense">Weapon Defense:</label> <input type="number" id="defense" value="0" min="-1" max="1"><br>' +
					'<label for="armor">Armor Soak:</label> <input type="number" id="armor" value="0" min="0" max="12"><br>' +
					'<label for="hardness">Armor Hardness:</label> <input type="number" id="hardness" value="0" min="0" max="10"><br>' +
					'<label for="mobility">Mobility Penalty:</label> <input type="number" id="mobility" value="0" min="-2" max="0">';

$.getJSON('./json/gear.json', function(data) {
	// exaltedgear.json syntax:
	// "GEAR_DATABASE" : {
	//   "weapon" : { "mortal/artifact" : { "weight" : [accuracy, damage, overwhelming, defense] } },
	//   "armor" : { "mortal/artifact" : { "weight" : [soak, hardness, mobility penalty] } }
	// }

	GEAR_DATABASE = data;
});

$.getJSON('./json/names.json', function(data) {
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
