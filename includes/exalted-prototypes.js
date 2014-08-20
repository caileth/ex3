function Scene() {
	this.combatants = new Array();

	this.iterateCrashCounter = function() {
		for (i in this.combatants) {
			var current = this.combatants[i];
			if (current.initiative < 1) current.turnsInCrash++;
			else current.turnsInCrash = 0;
		}

		for (j in this.combatants) {
			var current = this.combatants[j];
			if (current.turnsInCrash >= INITIATIVE_RESET_TURNS) {
				current.initiative = INITIATIVE_RESET_VALUE;
				current.turnsInCrash = 0;
				RESULTS_WINDOW.append(current.name + " achieves Initiative Reset!\n");
			}
		}
	};

	this.printCombatants = function() {
		console.groupCollapsed("printCombatantsList");

		$("tr.playerBubble").remove();
			console.log("deleting existing player list");

		this.combatants.sort(sortbyInitiative);

		for (i in this.combatants) {
			var current = this.combatants[i],
				stats = '',
				wound = current.getWoundPenalty();

			console.log("printing",current.name);

			stats += '<tr class="';
			if (wound === 'dead') stats += 'dead ';
			else if (wound === 'incapacitated') stats += 'incapacitated ';
			else if (!current.active) stats += 'inactive ';
			else if (current.initiative < 1) stats += 'crashed ';
			stats += 'playerBubble">';

			stats += '<td name="' + current.name + '" id="' + current.id + '" class="player">';			

			if (wound != 'dead' && wound != 'incapacitated') stats += '<span class="initiative">' + current.initiative + '</span>';
					
			stats += '<span class="name">' + current.name;
			if (wound === 'dead') stats += ' (DEAD) ';
			if (wound === 'incapacitated') stats += ' (Incapacitated) ';
			stats += '</span><br/>';
			
			stats += '<span class="stats">';
			if (wound != 'dead' && wound != 'incapacitated') {
				stats += 'Join Battle: ' + current.getJoinBattlePool() +
						' &bull; Withering: ' + current.getWitheringPool() +
						' &bull; Decisive: ' + current.getDecisivePool() +
						' &bull; Defense: ' + current.getDefense() +
						' &bull; Rush: ' + current.getRushPool() +
						' &bull; Disengage: ' + current.getDisengagePool() +
						'<br/>';
			}
			stats += '<b>Health:</b> ' + current.getHealthTrackHTML();
			stats += '</span><br/>';
			
			stats += '<input type="button" class="attack" value="Attack"' + (isNaN(wound) ? ' disabled' : '') +'/>' +
						'<input type="button" class="edit" value="Edit"/>' +
						'<input type="button" class="debug" value="ST"/>' +
						'<input type="button" class="remove" value="&#x2718;"/>' +
						'</td></tr>';

			$("#combatants > tbody:last").append(stats);
		}

		console.log("done printing CombatantsList");

		console.groupEnd();
	};

	this.resetActiveStatus = function() {
		console.log("Active status reset for all capacitated combatants");
		for (i in this.combatants) {
			var current = this.combatants[i];
			if (isNaN(current.getWoundPenalty())) current.active = false;
			else current.active = true;
			current.crashedAndWithered = false;
		}
	};

	this.resetOnslaught = function(tick) {
		console.log("Onslaught reset for tick",tick);
		for (i in this.combatants) {
			var current = this.combatants[i];
			if (current.initiative === tick || tick === null) current.onslaught = 0;
		}
	};

	this.whoseTurnIsIt = function() {
		console.groupCollapsed("Whose turn is it?");
		var highestInitiative = null;

		for (i in this.combatants) {
			if (this.combatants[i].active) {
				var current = this.combatants[i].initiative;
				if (highestInitiative === null || current > highestInitiative) highestInitiative = current;
				console.log(this.combatants[i].name,"is active at tick",current,"— highest Initiative is now",highestInitiative);
			}
		}
		if (!highestInitiative) console.log("Nobody!");
		console.groupEnd();
		return highestInitiative;
	};

	this.isAnybodyOutThere = function() {
		for (i in this.combatants) {
			if (!isNaN(this.combatants[i].getWoundPenalty())) return true;
		}
		return false;
	}









	this.pendingAttacks = new Array();
	
	this.resolve = function(tick) {
		console.groupCollapsed("resolving pending attacks before "+(tick ? "tick "+tick : "end of turn"));
		
		this.pendingAttacks.sort(sortByTiebreaker);
			console.log("sorting pending attacks by initiative, then tiebreaker",this.pendingAttacks);

		for (var i = 0; i < this.pendingAttacks.length; i++) {
			var attack = this.pendingAttacks[i];
			if (attack.tick > tick || tick === null) {
				console.log(attack.attacker.name + "'s attack vs. " + attack.defender.name + " is up for resolution\n");

				var j = this.clashAttackCheck(attack.tick, attack.attacker);

				if (j) {
					var secondAttack = this.pendingAttacks[j];

						console.log("pendingAttacks length before splice (j is",j,"):",this.pendingAttacks.length);
					resolveClashAttack(attack, secondAttack);
						console.log("pendingAttacks length after splice:",this.pendingAttacks.length);

					this.pendingAttacks.splice(j, 1);
				} else {
					resolveAttack(attack.attacker, attack.defender, attack.attackModifiers, attack.attackStunt, attack.defendStunt, attack.isDecisive);
				}

					console.log("pendingAttacks length before splice (i is",i,"):",this.pendingAttacks.length);
				this.pendingAttacks.splice(i, 1);
					console.log("pendingAttacks length after splice:",this.pendingAttacks.length);

				this.resolve(tick);
			}
		}
		console.groupEnd();
	};

	this.clashAttackCheck = function(tick, attacker) {
		console.groupCollapsed("clash attack check on tick",tick,"for",attacker.name);
		console.log("pendingAttacks length is",this.pendingAttacks.length);
		for (i in this.pendingAttacks) {
			var current = this.pendingAttacks[i];
			console.log("checking",current);
			if (current.tick === tick && current.defender === attacker) {
				console.log("CLASH FOUND");
				return i;
			}
		}
		console.groupEnd();
		return false;
	};
}

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
			for (var j = 0; j < track.length; j++) result += GLYPHS_HEALTH[track[j]];
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









function sortbyInitiative(a, b) {
	if (a.getWoundPenalty() != 'dead' && b.getWoundPenalty() === 'dead') return -1;
	else if (a.getWoundPenalty() === 'dead' && b.getWoundPenalty() != 'dead') return 1;
	else {
		if (a.getWoundPenalty() != 'incapacitated' && b.getWoundPenalty() === 'incapacitated') return -1;
		else if (a.getWoundPenalty() === 'incapacitated' && b.getWoundPenalty() != 'incapacitated') return 1;
		else {
			if (a.active && !b.active) return -1;
			else if (!a.active && b.active) return 1;
			else {
				if (a.initiative > b.initiative) return -1;
				else if (a.initiative < b.initiative) return 1;
				else return 0;
			}
		}
	}
}

function sortByTiebreaker(a, b) {
	if (a.tick > b.tick) return -1;
	else if (a.tick < b.tick) return 1;
	else {
		if (a.tiebreaker > b.tiebreaker) return -1;
		else if (a.tiebreaker < b.tiebreaker) return 1;
		else return 0;
	}
}