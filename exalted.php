<!DOCTYPE html>
<html>
<head>
<title>exalted 3 stuff</title>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
<style>
	@font-face{font-family:Albertus;src:url(includes/AlbertusMTStd.otf);}
	@font-face{font-family:Missive;src:url(includes/Missive.ttf);}
	@font-face{font-family:Goudy;src:url(includes/GoudyStd.otf);}

	h1,h2,h3{display:inline;}
	h1{font:300% Albertus;text-transform:uppercase;}
	h2,h3,.name{font-family:Missive;}
	h2,.name{font-size:200%;}
	h3{font-size:150%;}
	html{height:100%;border-left:solid crimson 50px;}
	body,textarea,input[type=button]{font-family:Goudy;}
	textarea{width:71em;height:10em;}
	input[type=number]{width:2.5em;}

	.initiative{font:375% Missive;float:left;}
	.player{border:1px solid black;border-radius:25px;margin:1em;vertical-align:middle;}
	.remove{float:right;}
	.ui-widget{font-size:.75em;}
</style>
<script src="https://code.jquery.com/jquery-2.1.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.0/jquery-ui.min.js"></script>
<script src="./exalted.js"></script>
</head>
<body>
	<h1>Ex3e Toolkit</h1><br/>

	<div>
		<h2>Results</h2><br/>
		<textarea id="results" readonly tabindex="-1"></textarea>
	</div>

	<div id="roller">	
		<h3>How many times have I coded a die roller, seriously</h3><br/>
		<input type="number" id="numDice" value="10" min="1" max="25"/>
			<input type="button" id="roll" value="d10"/>@ <input type="number" id="targetNumber" value="7" min="1" max="10"/>,
			Difficulty <input type="number" id="difficulty" value="1" min="0" max="5"/><br/>		
		Double Rule: <input type="radio" name="doubleRule" value="10" checked/>10s
			<input type="radio" name="doubleRule" value="9"/>9s
			<input type="radio" name="doubleRule" value="8"/>8s
			<input type="radio" name="doubleRule" value="false"/>None
	</div>

	<table id="combatants">
		<tr>
			<th colspan="9">Combatants</th>
		</tr>
		<tr>
			<th colspan="9">
				<input type="button" id="joinBattle" value="Join Battle"/>
				<input type="button" id="addCombatant" value="Add Combatant"/>
			</td>
		</tr>
	</table>

	<div id="dialog-form" title="Add new combatant">
		<form id="newPlayerForm">
			<input type="text" id="name" placeholder="New Player" autofocus/><br/>
			<label for="dexterity">Dexterity:</label><input type="number" id="dexterity" value="1" min="1" max="5"/><br/>
			<label for="wits">Wits:</label><input type="number" id="wits" value="1" min="1" max="5"/><br/>
			<!-- <label for="athletics">Athletics:</label><input type="number" id="athletics" value="0" min="0" max="5"/><br/>
			<label for="awareness">Awareness:</label><input type="number" id="awareness" value="0" min="0" max="5"/><br/>
			<label for="dodge">Dodge:</label><input type="number" id="dodge" value="0" min="0" max="5"/><br/>
			<label for="combat">Combat Ability:</label><input type="number" id="combat" value="0" min="0" max="5"/><br/>
			<label for="accuracy">Weapon Accuracy:</label><input type="number" id="accuracy" value="0" min="0" max="5"/><br/>
			<label for="defense">Weapon Defense:</label><input type="number" id="defense" value="0" min="0" max="5"/><br/>
			<label for="mobility">Mobility Penalty:</label><input type="number" id="mobility" value="0" min="-5" max="0"/> -->
		</form>
	</div>
</body>
</html>