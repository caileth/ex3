function Scene() {
	this.combatants = new Array();
	this.pendingAttacks = new Array();
}

Scene.prototype.iterateCrashCounter = function() {
	for (i in this.combatants) {
		var current = this.combatants[i];
		if (current.initiative < 1) current.turnsInCrash++;
		else current.turnsInCrash = 0;
	}

	for (j in this.combatants) {
		var current = this.combatants[j];
		if (current.turnsInCrash >= INITIATIVE_RESET_TURNS && current.initiative != undefined) {
			current.initiative = INITIATIVE_RESET_VALUE;
			current.crashRecovery = ROUND;
			current.turnsInCrash = 0;
			RESULTS_WINDOW.append(current.name + " achieves Initiative Reset!\n");
		}
	}
};

Scene.prototype.printCombatants = function() {
	console.groupCollapsed("printCombatantsList");

	$("tr.playerBubble").remove();
		console.log("deleting existing player list");

	this.combatants.sort(sortByInitiative);

	for (i in this.combatants) {
		var current = this.combatants[i],
			inCrash = current.initiative < 1,
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

		if (current.initiative != undefined) stats += '<span class="initiative">' + current.initiative + '</span>';
				
		stats += '<span class="name">' + current.name;
		if (wound === 'dead') stats += ' (DEAD) ';
		if (wound === 'incapacitated') stats += ' (Incapacitated) ';
		stats += '</span><br>';
		
		stats += '<span class="stats">';
		if (!isNaN(wound)) {
			stats += 'Join Battle: ' + current.getJoinBattlePool() +
					' &bull; Withering: ' + current.getWitheringPool() +
					' &bull; Decisive: ' + current.getDecisivePool() +
					' &bull; Defense: ' + current.getDefense() +
					' &bull; Rush: ' + current.getRushPool() +
					' &bull; Disengage: ' + current.getDisengagePool() +
					' &bull; Soak: ' + current.getSoak() +
					' &bull; Hardness: ' + (inCrash ? '0' : current.hardness) +
					'<br>';
		}
		stats += '<b>Health:</b> ' + current.getHealthTrackHTML();
		stats += '</span><br>';
		
		if (current.initiative != undefined) {
			stats += '<input type="button" class="attack" value="Attack"';
			if (current.getMinRange() != 0) stats += ' disabled';
			stats += '>' +
					 '<input type="button" class="rangedAttack" value="Ranged Attack">' +
					 '<input type="button" class="aim" value="Aim">' +
					 '<input type="button" class="fullDefense" value="Full Defense"' + (inCrash ? ' disabled' : '') +'>' +
					 '<input type="button" class="move" value="Move"';
			if (current.hasMoved === true) stats += ' disabled';
			stats += '>' +
					 '<input type="button" class="flurry" value="Flurry">' +
					 '<br>';
		}

		stats += current.getRangeHTML();

		stats +=
			'<input type="button" class="edit" value="Edit">' +
			'<input type="button" class="debug" value="ST">' +
			'<input type="button" class="remove" value="&#10006;">';
			
		stats += '</td></tr>';

		$("#combatants > tbody:last").append(stats);
	}

	console.log("done printing CombatantsList");

	console.groupEnd();
};

Scene.prototype.resetActiveStatus = function() {
	console.log("Active status reset for all capacitated combatants");
	for (i in this.combatants) {
		var current = this.combatants[i];

		if (!isNaN(current.getWoundPenalty()))
			current.active = true;

		if (current.active === true && current.initiative > 0)
			current.crashedBy = undefined;

		current.crashedAndWithered = false;

		current.hasMoved = false;
	}
};

Scene.prototype.resetOnslaught = function(tick) {
	console.log("Onslaught reset for tick",tick);
	for (i in this.combatants) {
		var current = this.combatants[i];
		if (current.initiative === tick || tick === null) current.onslaught = 0;
	}
};

Scene.prototype.whoseTurnIsIt = function() {
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

Scene.prototype.isAnybodyOutThere = function() {
	for (i in this.combatants) {
		if (!isNaN(this.combatants[i].getWoundPenalty())) return true;
	}
	return false;
}

Scene.prototype.resolve = function(tick) {
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
				resolveAttack(attack);
			}

				console.log("pendingAttacks length before splice (i is",i,"):",this.pendingAttacks.length);
			this.pendingAttacks.splice(i, 1);
				console.log("pendingAttacks length after splice:",this.pendingAttacks.length);

			this.resolve(tick);
		}
	}
	console.groupEnd();
};

Scene.prototype.clashAttackCheck = function(tick, attacker) {
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









function sortByInitiative(a, b) {
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