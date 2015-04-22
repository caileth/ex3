function Combatant() {
  // from stack overflow @ http://goo.gl/imz8Cf
  this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
  this.active = true;

  this.crashedAndWithered = false;
  this.turnsInCrash = 0;
  this.onslaught = 0;

  this.bashing  = 0;
  this.lethal   = 0;
  this.aggravated = 0;

  this.healthTrack = [
    [0],  // -0 bruised
    [0,0],  // -1 injured
    [0,0],  // -2 wounded
    [0],  // -4 maimed
    [0]   // incapacitated
  ];

  this.healthTrack[-1] = this.healthTrack[1];
  this.healthTrack[-2] = this.healthTrack[2];
  this.healthTrack[-4] = this.healthTrack[3];
  this.healthTrack.inc = this.healthTrack[4];

  this.vectors = [];
}

Combatant.prototype.getHealthTrackHTML = function() {
  var result = '';
  for (var i = 0; i < this.healthTrack.length; i++) {
    var track = this.healthTrack[i];
    result += DEFAULT_HEALTH_TRACK[i]+':';
    for (var j = 0; j < track.length; j++) result += GLYPHS_HEALTH[track[j]];
    result += ' ';
  }
  return result;
};

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

Combatant.prototype.getStatBlock = function() {
  var statBlock =
      'Join Battle: ' + this.getJoinBattlePool() +
      ' &bull; Withering: ' + this.getWitheringPool() +
      ' &bull; Decisive: ' + this.getDecisivePool() +
      ' &bull; Defense: ' + this.getDefense() +
      ' &bull; Rush: ' + this.getRushPool() +
      ' &bull; Disengage: ' + this.getDisengagePool() +
      ' &bull; Soak: ' + this.getSoak() +
      ' &bull; Hardness: ' + (this.initiative < 1 ? '0' : this.hardness) + '<br>' +
      '<b>Health:</b> ' + this.getHealthTrackHTML() + 
      '<br>' + this.getRangeHTML();

  return statBlock;
}

Combatant.prototype.getControlPanel = function() {
  var result = $('<span class="controlPanel"></span>');

  if (this.initiative != undefined) {
    var buttons = [
        $('<input type="button" class="attack" value="Attack">'),
        $('<input type="button" class="rangedAttack" value="Ranged Attack">'),
        $('<input type="button" class="aim" value="Aim">'),
        $('<input type="button" class="fullDefense" value="Full Defense">'),
        $('<input type="button" class="move" value="Move">'),
        $('<input type="button" class="flurry" value="Flurry">'),
        $('<input type="button" class="edit" value="Edit">'),
        $('<input type="button" class="debug" value="ST">'),
        $('<input type="button" class="remove" value="&#10006;">')];

    if (this.getMinRange() != 0) buttons[0].prop('disabled', true);
    if (this.initiative < 1) buttons[3].prop('disabled', true);
    if (this.hasMoved === true) buttons[4].prop('disabled', true);

    result.append(buttons);
  }

  return result;
}

Combatant.prototype.getInitiative = function() {
  return this.initiative || '-';
}

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
};

Combatant.prototype.getRange = function(a) {
  for (var i = 0; i < this.vectors.length; i++) {
    if (this.vectors[i].target === a) {
      console.log("getRange: match! range to",this.vectors[i].target.name,"is",this.vectors[i].range.value);
      return this.vectors[i].range.value;
    }
  } console.log("getRange: no match"); return undefined;
}

Combatant.prototype.getRangeHTML = function() {
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
  } else for (var i = 0; i < this.vectors.length; i++) {
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

  for (var i = 0; i < this.vectors.length; i++) {
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
  for (var i = 0; i < this.vectors.length; i++) {
    for (var j = 0; j < a.vectors.length; j++) {
      if (this.vectors[i].target === a.vectors[j].target) {
        console.log("matching this.vectors to a.vectors");
        this.vectors[i].range = a.vectors[j].range;
        var target = this.vectors[i].target;
        for (var k = 0; k < target.vectors.length; k++) {
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

  for (var i = 0; i < this.vectors.length; i++) {
    var curVal = this.vectors[i].range.value;
    console.log("curVal",curVal,"— result",result);
    if (result === undefined || (operator === '>' && curVal > result) || (operator === '<' && curVal < result)) {
      result = curVal;
      console.log("new result is",result);
    }
  } console.log("returning",result);
  
  console.groupEnd();

  return result;
}

Combatant.prototype.getMaxRange = function() {
  return this.getRangeMinMax('>');
}

Combatant.prototype.getMinRange = function() {
  return this.getRangeMinMax('<');
}

Combatant.prototype.disengage = function() {
  for (var i = 0; i < this.vectors.length; i++) {
    if (this.vectors[i].range.value === 0) {
      console.log("setting zero range to 1");
      this.setRange(this.vectors[i].target, 1);
    }
  }
}