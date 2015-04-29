function Combatant() {
	// from stack overflow @ http://goo.gl/imz8Cf
	this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
	this.active = true;

	this.crashedAndWithered = false;
	this.turnsInCrash = 0;
	this.onslaught = 0;

	this.bashing	= 0;
	this.lethal		= 0;
	this.aggravated = 0;

	this.healthTrack = [
		[0],	// -0 bruised
		[0,0],	// -1 injured
		[0,0],	// -2 wounded
		[0],	// -4 maimed
		[0]		// incapacitated
	];

	this.healthTrack[-1] = this.healthTrack[1];
	this.healthTrack[-2] = this.healthTrack[2];
	this.healthTrack[-4] = this.healthTrack[3];
	this.healthTrack.inc = this.healthTrack[4];

	this.vectors = [];
}

Combatant.prototype.getDamage = function() {
	return this.strength + this.damage;
};

Combatant.prototype.getJoinBattlePool = function() {
	var pool = this.awareness + this.wits;
		console.log("Join Battle pool:",pool);

	return pool;
};

Combatant.prototype.getWitheringPool = function() {
	return this.dexterity + this.combat + this.accuracy;
};

Combatant.prototype.getDecisivePool = function() {
	return this.dexterity + this.combat;
};

Combatant.prototype.getParryPool = function(specialty) {
	if (specialty) return Math.ceil((this.dexterity + this.combat + SPECIALTY_DIE_BONUS) / 2) + this.defense;
	else return Math.ceil((this.dexterity + this.combat) / 2) + this.defense;
};

Combatant.prototype.getEvasionPool = function(specialty) {
	if (specialty) return Math.ceil((this.dexterity + this.dodge + SPECIALTY_DIE_BONUS) / 2) + this.mobility;
	else return Math.ceil((this.dexterity + this.dodge) / 2) + this.mobility;
};

Combatant.prototype.getDefense = function(specialty) {
	if (isNaN(this.getWoundPenalty())) return 0;
	else return Math.max(this.getParryPool(specialty), this.getEvasionPool(specialty), 0) - this.onslaught;
}

Combatant.prototype.getRushPool = function() {
	return this.dexterity + this.athletics;
};

Combatant.prototype.getDisengagePool = function() {
	return this.dexterity + this.dodge;
};

Combatant.prototype.getSoak = function() {
	return this.stamina + this.armor;
};

Combatant.prototype.joinBattle = function() {
	console.groupCollapsed(this.name,"joins battle");

	var pool = this.getJoinBattlePool(),
		roll = diceRoller(pool, DEFAULT_DIE_SIDE),
		suxx = Math.max(successChecker(roll, JB_TARGET, JB_DOUBLES), 0),
		initiative = suxx + JB_EXTRA_SUX;
	
	console.log("JB sux:",suxx);
	console.log("JB initiative:",initiative);
	console.groupEnd();

	return initiative;
};

Combatant.prototype.resetHealthTrack = function() {
	console.log("resetting health track");
	for (i in this.healthTrack) {
		for (j in this.healthTrack[i]) {
			this.healthTrack[i][j] = 0;
		}
	}
};

Combatant.prototype.recordDamage = function() {
	console.groupCollapsed("Record Damage");

	var lastHLTrackPos = this.healthTrack.length - 1,
		lastHLPos = this.healthTrack[lastHLTrackPos].length - 1,
		pending = [],
		wound;

	pending[1] = this.bashing,
	pending[2] = this.lethal,
	pending[3] = this.aggravated;

	console.log("pending:",pending);

	this.resetHealthTrack();

	doDamage(pending, 3, 0, this.healthTrack);
	doDamage(pending, 2, 0, this.healthTrack);
	doDamage(pending, 1, 0, this.healthTrack);

	if (this.healthTrack[lastHLTrackPos][lastHLPos] === 1) {
		doDamage(pending, 1, 1, this.healthTrack);
			console.log("Upconverting extra bashing");
	}

	wound = this.getWoundPenalty();

	if (isNaN(wound)) {
		this.active = false;
		this.initiative = undefined;
	}

	if (wound === 'incapacitated') printResult(this.name,'is Incapacitated!');
	if (wound === 'dead') printResult(this.name,'is DEAD!');

	console.groupEnd();

	function doDamage(type, level, replacementLevel, healthTrack) {
		console.groupCollapsed("Do Damage",type,level,replacementLevel);
		for (i in healthTrack) {
			var track = healthTrack[i];
			for (j in track) {
				console.log("cursor at healthTrack["+i+"]["+j+"]: "+track[j]);
				if (track[j] === replacementLevel && type[level] > 0) {
					console.log("wound at target level detected,",type[level],"damage to go");
					if (level === replacementLevel) track[j] = replacementLevel + 1;
					else track[j] = level;
					type[level]--;
					console.log("done.",type[level]," to go");
				}
			}
		}
		console.groupEnd();
	}
}

Combatant.prototype.getWoundPenalty = function() {
	var lastNonEmpty = findLastGreaterThan(this.healthTrack, 0),
		result;

	if (!lastNonEmpty) result = 0;
	else if (lastNonEmpty.track === 0) result = WOUND_PENALTY_BRUISED;
	else if (lastNonEmpty.track === 1) result = WOUND_PENALTY_INJURED;
	else if (lastNonEmpty.track === 2) result = WOUND_PENALTY_WOUNDED;
	else if (lastNonEmpty.track === 3) result = WOUND_PENALTY_MAIMED;
	else if (lastNonEmpty.track === 4 && lastNonEmpty.level > 1) result = "dead";
	else result = "incapacitated";

	console.log("Wound Penalty for",this.name,"is",result);

	return result;

	function findLastGreaterThan(array, value) {
		for (var i = array.length - 1; i >= 0; i--) {
			for (var j = array[i].length - 1; j >= 0; j--) {
				if (array[i][j] > value) {
					var result = {"track" : i, "wound" : j, "level" : array[i][j]};
					console.log("found last wound:",result);
					return result;
				}
			}
		}
		return false;
	}
};

Combatant.prototype.getRange = function(a) {
	for (var i in this.vectors) {
		if (this.vectors[i].target === a) {
			console.log("getRange: match! range to",this.vectors[i].target.name,"is",this.vectors[i].range.value);
			return this.vectors[i].range.value;
		}
	} console.log("getRange: no match"); return undefined;
}

Combatant.prototype.setRange = function(target, range) {
	console.group("setRange target:",target.name,"range:",range);

	range = parseInt(range);
	var newRange = {value: range},
		oldRange = this.getRange(target);

	if (oldRange === 0 && range != 0)
		this.refreshRangeBands();

	console.group("normal range behavior:");
	if (oldRange === undefined) {
		this.vectors.push({target: target, range: newRange});
		target.vectors.push({target: this, range: newRange});
		console.log("range is undefined; pushing new vectors for both combatants");
	} else for (var i in this.vectors) {
		console.log("range exists; setting to",range);
		if (this.vectors[i].target === target)
			this.vectors[i].range.value = range;
	} console.groupEnd();
	
	if (oldRange != 0 && range === 0)
		this.mergeRangeBands(target);

	console.groupEnd();
}

Combatant.prototype.refreshRangeBands = function() {
	console.group("moving out of zero range:");
	for (var i in this.vectors) {
		var currentRange = this.vectors[i];
		if (currentRange.range.value != 0) {
			var refresh = {value: currentRange.range.value};
			console.log("refreshing current range");
			currentRange.range = refresh;
			for (var j in currentRange.target.vectors) {
				var targetRange = currentRange.target.vectors[j];
				if (targetRange.target === this) {
					console.log("refreshing target range");
					targetRange.range = refresh;
				}
			}
		}
	} console.groupEnd();
}

Combatant.prototype.mergeRangeBands = function(a) {
	console.group("moving into zero range");
	for (var i in this.vectors) {
		for (var j in a.vectors) {
			if (this.vectors[i].target === a.vectors[j].target) {
				console.log("matching this.vectors to a.vectors");
				this.vectors[i].range = a.vectors[j].range;
				var target = this.vectors[i].target;
				for (var k in target.vectors) {
					console.log("matching target vectors to a.vectors");
					if (target.vectors[k].target === this) {
						target.vectors[k].range = a.vectors[j].range;
					}
				}
			}
		}
	} console.groupEnd();
}

Combatant.prototype.getRangeMinMax = function(operator) {	
	var result;

	console.groupCollapsed("getRangeMinMax",operator);

	for (var i in this.vectors) {
		var curVal = this.vectors[i].range.value;
		console.log("curVal",curVal,"— result",result);
		if (result === undefined || (operator === '>' && curVal > result) || (operator === '<' && curVal < result)) {
			result = curVal;
			console.log("new result is",result);
		}
	}

	console.log("returning",result);
	console.groupEnd();

	return result;
}

Combatant.prototype.getMaxRange = function() {
	return this.getRangeMinMax('>');
}

Combatant.prototype.getMinRange = function() {
	return this.getRangeMinMax('<');
}

Combatant.prototype.printRow = function() {
	var playerBubble = $('<tr class="playerBubble"></tr>'),
		wound = this.getWoundPenalty();

	if (wound === 'dead') playerBubble.addClass('dead');
	else if (wound === 'incapacitated') playerBubble.addClass('incapacitated');
	else if (!this.active) playerBubble.addClass('inactive');
	else if (this.initiative < 1) playerBubble.addClass('crashed');

	playerBubble.append(this.printTD());

	return playerBubble;
};

Combatant.prototype.printTD = function() {
	var playerTD = $('<td class="player" name="' + this.name + '"></td>');

	playerTD.append(this.printInitiative());
	playerTD.append(this.printName());
	playerTD.append('<br>');
	playerTD.append(this.printStats());
	playerTD.append('<br>');
	playerTD.append(this.printControls());
	playerTD.append('<br>');
	playerTD.append(this.printRange());

	return playerTD;
};

Combatant.prototype.printInitiative = function() {
	var init = this.initiative || '-';

	return $('<span class="initiative">' + init + '</span>');
};

Combatant.prototype.printName = function() {
	var span = $('<span class="name">' + this.name + '</span>');

	if (this.getWoundPenalty() === 'dead') span.append(' (DEAD)');
	if (this.getWoundPenalty() === 'incapacitated') span.append(' (Incapacitated)');

	return span;
};

Combatant.prototype.printStats = function() {
	var span = $('<span class="stats"></span>');

	if (!isNaN(this.getWoundPenalty())) {
		span.append(
			'<abbr title="Join Battle">JB</abbr>: ' + this.getJoinBattlePool() + ' &bull; ' +
			'<abbr title="Withering">Wi</abbr>: ' + this.getWitheringPool() + ' &bull; ' +
			'<abbr title="Decisive">Dc</abbr>: ' + this.getDecisivePool() + ' &bull; ' +
			'<abbr title="Defense">Df</abbr>: ' + this.getDefense() + ' &bull; ' +
			'<abbr title="Rush">Ru</abbr>: ' + this.getRushPool() + ' &bull; ' +
			'<abbr title="Disengage">Ds</abbr>: ' + this.getDisengagePool() + ' &bull; ' +
			'<abbr title="Soak">So</abbr>: ' + this.getSoak() + ' &bull; ' +
			'<abbr title="Hardness">Ha</abbr>: ' + (this.initiative < 1 ? '0' : this.hardness) + '<br>');
	} span.append('<b>Health:</b> ' + this.printHealth());

	return span;
};

Combatant.prototype.printHealth = function() {
	var result = '',
		trackLabels = [
			'<abbr title="Bruised">-0</abbr>',
			'<abbr title="Injured">-1</abbr>',
			'<abbr title="Maimed">-2</abbr>',
			'<abbr title="Crippled">-4</abbr>',
			'<abbr title="Incapacitated">Inc</abbr>'];

	for (var i = 0; i < this.healthTrack.length; i++) {
		var track = this.healthTrack[i];
		result += trackLabels[i]+':';
		for (var j = 0; j < track.length; j++) result += GLYPHS_HEALTH[track[j]];
		result += ' ';
	}
	return result;
};

Combatant.prototype.printControls = function() {
	var span = $('<span></span>'),
		init = this.initiative;

	span.attr('id', this.id);

	if (init != undefined) {
		span.append(
			'<input type="button" class="attack" value="Attack"' + (this.getMinRange() != 0 ? ' disabled' : '') + '>' +
			'<input type="button" class="rangedAttack" value="Ranged Attack">' +
			'<input type="button" class="aim" value="Aim">' +
			'<input type="button" class="fullDefense" value="Full Defense"' + (init < 1 ? ' disabled' : '') +'>' +
			'<input type="button" class="move" value="Move"' + (this.hasMoved === true ? ' disabled' : '') +'>' +
			'<input type="button" class="flurry" value="Flurry">' +
			'<br>');
	}

	span.append(
		'<input type="button" class="edit" value="Edit">' +
		'<input type="button" class="debug" value="ST">' +
		'<input type="button" class="remove" value="&#10006;">');

	return span;
};

Combatant.prototype.printRange = function() {
	var result = '';
	if (this.vectors.length > 0) {
		result += '<b>Ranges:</b> ';
		for (var i = 0; i < this.vectors.length; i++) {
			result += this.vectors[i].target.name;
			result += ': ';
			result += this.vectors[i].range.value;
			result += (i + 1 < this.vectors.length ? '; ' : '');
		}
		result += '<br>';
	}
	return result;
};