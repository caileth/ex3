function printRoll(numDice, sides, targetNumber, doubleRule, difficulty) {
  console.groupCollapsed(numDice + "d" + sides + "@" + targetNumber + "; double rule: " + doubleRule);

  var result = diceRoller(numDice, sides),
    successes = successChecker(result, targetNumber, doubleRule),
    threshold = successes - difficulty;

  RESULTS_WINDOW.append("Rolled: ");
  for (var roll in result) RESULTS_WINDOW.append(result[roll] + " ");
  if (successes < 0) {
    RESULTS_WINDOW.append("\n" + "BOTCH!" + "\n");
    console.log('BOTCH at threshold',threshold);
  } else if (threshold < 0) {
    RESULTS_WINDOW.append("\nFailure! (" + threshold + " success[es].)\n");
    console.log('Failure at threshold',threshold);
  } else if (threshold === 0) {
    RESULTS_WINDOW.append("\nSuccess! (no threshold successes.)\n");
    console.log('Success at threshold',threshold);
  } else {
    RESULTS_WINDOW.append("\nSuccess at threshold " + threshold + "!\n");
    console.log('Success at threshold',threshold);
  }

  scrollToBottom();

  console.groupEnd();
}









function successChecker(roll, target, doubleRule, auto) {
  target = target || DEFAULT_TARGET;
  doubleRule = doubleRule || DEFAULT_DOUBLES;
  auto = auto || 0;

  var rolledAOne = false,
      successes;

  console.groupCollapsed('successChecker: roll',roll,'target',target,'doubleRule',doubleRule,'auto',auto);
  
  successes = auto;

  for (var die = 0; die < roll.length; die++) {
    if (roll[die] >= target) {
      if (doubleRule && roll[die] >= doubleRule) successes++;
      successes++;
    }
    if (roll[die] === 1) rolledAOne = true;
  }

  if (rolledAOne && successes === 0) successes = -1;

  console.log("Total successes:",successes);
  console.groupEnd();
  return successes;
}

function diceRoller(numDice, sides) {
  numDice = numDice || DEFAULT_NUM_DICE;
  sides = sides || DEFAULT_DIE_SIDE;

  var result = [];

  console.groupCollapsed("Rolling",numDice,sides,"sided dice");
  for (var i = 0; i < numDice; i++) result[i] = dieRoller(sides);
  console.groupEnd();
  
  return result;
}

function dieRoller(sides) {  
  sides = sides || DEFAULT_DIE_SIDE;
  
  var result = ~~(Math.random() * sides) + 1;
  
  console.log('dieRoller:',result,'out of',sides,'sides');
  
  return result;
}









function lookupByID(array) {
  console.groupCollapsed("lookup by ID");
  var result = {};

  for (var i = 0; i < array.length; i++) {
    result[array[i].id] = array[i];
    console.log("setting",array[i].name,"to lookup[",array[i].id,"]");
  }

  console.groupEnd();
  return result;
}

function opposedRoll(first, second) {
  var a = successChecker(diceRoller(first)),
      b = successChecker(diceRoller(second));

  return a - b;
}

function sanitize(str) {
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function scrollToBottom() {
  RESULTS_WINDOW.scrollTop(RESULTS_WINDOW[0].scrollHeight - RESULTS_WINDOW.height());
}

function stunt(level) {
  switch (level) {
    case 1: return {"level": 1, "dice": 2, "successes": 0, "willpower": 0, "static": 1};
    case 2: return {"level": 2, "dice": 2, "successes": 1, "willpower": 1, "static": 2};
    case 3: return {"level": 3, "dice": 2, "successes": 2, "willpower": 2, "static": 3};
    default: return {"level": 0, "dice": 0, "successes": 0, "willpower": 0, "static": 0};
  }
}









function findLastGreaterThan(array, value) {
  for (var i = array.length - 1; i >= 0; i--) {
    for (var j = array[i].length - 1; j >= 0; j--) {
      if (array[i][j] > value) {
        var result = {"track" : i, "wound" : j, "level" : array[i][j]};
        console.log("found last wound:",result);
        return result;
      }
    }
  } return false;
}