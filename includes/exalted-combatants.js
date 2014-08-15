function CombatantsList(){};

CombatantsList.prototype = new Array;

CombatantsList.prototype.iterateCrashCounter = function() {
	for (var i = 0; i < this.length; i++) {
		if (this[i].initiative < 1) this[i].turnsInCrash++;
		else this[i].turnsInCrash = 0;
	}

	for (var j = 0; j < this.length; j++) {
		if (this[j].turnsInCrash >= INITIATIVE_RESET_TURNS) {
			this[j].initiative = INITIATIVE_RESET_VALUE;
			this[j].turnsInCrash = 0;
			RESULTS_WINDOW.append(this[j].name + " achieves Initiative Reset!\n");
		}
	}
};

CombatantsList.prototype.print = function() {
	console.groupCollapsed("printCombatantsList");

	$("tr.playerBubble").remove();
		console.log("deleting existing player list");

	this.sort(sortbyInitiative);

	for (var i = 0; i < this.length; i++) {
		console.log("printing",this[i].name);
		var wound = this[i].getWoundPenalty();
		$("#combatants > tbody:last").append('<tr class="' + 
			(wound === 'dead' ? 'dead ' : 
				(wound === 'incapacitated' ? 'incapacitated ' :
					(!this[i].active ? 'inactive ' :
						(this[i].initiative < 1 ? 'crashed ' : '')))) +
			'playerBubble">' + 
			'<td name="' + this[i].name + '" id="' + this[i].id + '" class="player">' +
			'<span class="initiative">' + this[i].initiative + '</span>' +
			'<span class="name">' + this[i].name +
			(wound === 'dead' ? ' (DEAD) ' :
				(wound === 'incapacitated' ? ' (Incapacitated) ' : '')) +
			'</span><br/>' +
			'<span class="stats">' +
			'Join Battle: ' + this[i].getJoinBattlePool() +
			' &bull; Withering: ' + this[i].getWitheringPool() +
			' &bull; Decisive: ' + this[i].getDecisivePool() +
			' &bull; Parry: ' + this[i].getParryPool() +
			' &bull; Evade: ' + this[i].getEvasionPool() +
			' &bull; Rush: ' + this[i].getRushPool() +
			' &bull; Disengage: ' + this[i].getDisengagePool() +
			'<br/>' +
			'<b>Health:</b> ' + this[i].getHealthTrackHTML() +
			'</span><br/>' +
			'<input type="button" class="attack" value="Attack"' + (isNaN(wound) ? ' disabled' : '') +'/>' +
			'<input type="button" class="edit" value="Edit"/>' +
			'<input type="button" class="remove" value="X"/>' +
			'</td></tr>');
	}

	console.log("done printing CombatantsList");

	console.groupEnd();
};

CombatantsList.prototype.resetActiveStatus = function() {
	for (var i = 0; i < this.length; i++) {
		if (isNaN(this[i].getWoundPenalty())) this[i].active = false;
		else this[i].active = true;
		this[i].crashedAndWithered = false;
	}
};

CombatantsList.prototype.resetOnslaught = function(tick) {
	for (var i = 0; i < this.length; i++) {
		if (this[i].initiative === tick || tick === undefined) this[i].onslaught = 0;
	}
};

CombatantsList.prototype.whoseTurnIsIt = function() {
	console.groupCollapsed("Whose turn is it?");
	var highestInitiative = null;

	for (var i = 0; i < this.length; i++) {
		if (this[i].active) {
			var current = this[i].initiative;
			if (highestInitiative === null || current > highestInitiative) highestInitiative = current;
			console.log(this[i].name,"is active at tick",current,"— highest Initiative is now",highestInitiative);
		}
	}

	console.groupEnd();
	return highestInitiative;
};









function PendingAttacksList(){};

PendingAttacksList.prototype = new Array;

PendingAttacksList.prototype.resolve = function(tick) {
	console.groupCollapsed("resolving pendings attacks before "+(tick ? "tick "+tick : "end of turn"));
	
	this.sort(sortByTiebreaker);
		console.log("sorting pending attacks by initiative, then tiebreaker",this);

	for (var i = 0; i < this.length; i++) {
		var attack = this[i];
		if (attack.tick > tick || tick === undefined) {
			console.log(attack.attacker.name + "'s attack vs. " + attack.defender.name + " is up for resolution\n");

			var j = this.clashAttackCheck(attack.tick, attack.attacker);
				console.log("Clash attack check:",j);

			if (j) {
				var secondAttack = this[j];
				resolveClashAttack(attack, secondAttack);
			} else {
				resolveAttack(attack.attacker, attack.defender, attack.attackModifiers, attack.attackStunt, attack.defendStunt, attack.isDecisive);
			}

			if (j) this.splice(j, 1);
			this.splice(i, 1);
			this.resolve(tick);
		}
	}
	console.groupEnd();
};

PendingAttacksList.prototype.clashAttackCheck = function(tick, attacker) {
	console.groupCollapsed("clash attack check on tick",tick,"for",attacker.name);
	console.log("pendingAttacks length is",this.length);
	for (var i = 0; i < this.length; i++) {
		var current = this[i];
		console.log("checking",current);
		if (current.tick === tick && current.defender === attacker) {
			console.log("CLASH FOUND");
			return i;
		}
	}
	console.groupEnd();
	return false;
};









function sortbyInitiative(a, b) {
	if (a.active && !b.active) return -1;
	else if (!a.active && b.active) return 1;
	else {
		if (a.initiative > b.initiative) return -1;
		else if (a.initiative < b.initiative) return 1;
		else return 0;
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