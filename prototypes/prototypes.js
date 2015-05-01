function PendingAttack(tick, attacker, defender, attackModifiers, attackStunt, defendStunt, isDecisive, attackSpecialty, defendSpecialty) {
	this.tick = tick;
	this.tiebreaker = Math.random();
	this.attacker = attacker;
	this.defender = defender;
	this.attackModifiers = attackModifiers;
	this.attackStunt = attackStunt;
	this.defendStunt = defendStunt;
	this.isDecisive = isDecisive;
	this.attackSpecialty = attackSpecialty;
	this.defendSpecialty = defendSpecialty;
}
