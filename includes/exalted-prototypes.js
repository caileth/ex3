function Combatant() {
	// from stack overflow @ http://goo.gl/imz8Cf
	this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
	this.initiative = 0;
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

	this.getHealthTrackHTML = function() {
		var result = '';
		for (var i = 0; i < this.healthTrack.length; i++) {
			var track = this.healthTrack[i];
			result += DEFAULT_HEALTH_TRACK[i]+':';
			for (var j = 0; j < track.length; j++) {
				switch (track[j]) {
					case 0:
						result += GLYPH_EMPTY;
						break;
					case 1:
						result += GLYPH_BASHING;
						break;
					case 2:
						result += GLYPH_LETHAL;
						break;
					case 3:
						result += GLYPH_AGG;
						break;
				}
			}
			result += ' ';
		}
		return result;
	}
	this.getName = function() {
		return this.name;
	};
	this.getDamage = function() {
		return this.strength + this.damage;
	};
	this.getJoinBattlePool = function() {
		var pool = this.awareness + this.wits;
			console.log("Join Battle pool:",pool);

		return pool;
	};
	this.getWitheringPool = function() {
		return this.dexterity + this.combat + this.accuracy;
	};
	this.getDecisivePool = function() {
		return this.dexterity + this.combat;
	};
	this.getParryPool = function() {
		return Math.ceil((this.dexterity + this.combat) / 2) + this.defense;
	};
	this.getEvasionPool = function() {
		return Math.ceil((this.dexterity + this.dodge) / 2) + this.mobility;
	};
	this.getDefense = function() {
		if (isNaN(this.getWoundPenalty())) return 0;
		else return Math.max(this.getParryPool(), this.getEvasionPool()) - this.onslaught;
	}
	this.getRushPool = function() {
		return this.dexterity + this.athletics;
	};
	this.getDisengagePool = function() {
		return this.dexterity + this.dodge;
	};
	this.getSoak = function() {
		return this.stamina + this.armor;
	};
	this.joinBattle = function() {
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
	this.resetHealthTrack = function() {
		console.log("resetting health track");
		for (i in this.healthTrack) {
			for (j in this.healthTrack[i]) {
				this.healthTrack[i][j] = 0;
			}
		}
	};
	this.recordDamage = function() {
		console.groupCollapsed("Record Damage");

		var lastHLTrackPos = this.healthTrack.length - 1,
			lastHLPos = this.healthTrack[lastHLTrackPos].length - 1,
			pending = new Array(),
			wound;

		pending[1] = this.bashing,
		pending[2] = this.lethal,
		pending[3] = this.aggravated;

		console.log(pending);

		this.resetHealthTrack();

		doDamage(pending, 3, 0, this.healthTrack);
		doDamage(pending, 2, 0, this.healthTrack);
		doDamage(pending, 1, 0, this.healthTrack);

		if (this.healthTrack[lastHLTrackPos][lastHLPos] === 1) doDamage(pending, 1, 1, this.healthTrack);

		wound = this.getWoundPenalty();

		if (isNaN(wound)) this.active = false;

		if (wound === 'incapacitated') RESULTS_WINDOW.append(this.name + " is Incapacitated!\n");
		if (wound === 'dead') RESULTS_WINDOW.append(this.name + " is DEAD!\n");

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
	this.getWoundPenalty = function() {
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
}









function PendingAttack(tick, attacker, defender, attackModifiers, attackStunt, defendStunt, isDecisive) {
	this.tick				= tick;
	this.tiebreaker			= Math.random();
	this.attacker			= attacker;
	this.defender			= defender;
	this.attackModifiers	= attackModifiers;
	this.attackStunt		= attackStunt;
	this.defendStunt		= defendStunt;
	this.isDecisive			= isDecisive;
}