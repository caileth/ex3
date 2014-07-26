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
		table{width:600px;}
		textarea{width:71em;height:10em;}
		input[type=number]{width:2.5em;}

		#combatants tr:first-of-type{text-transform:uppercase;background-color:gold;}

		.initiative{font:375% Missive;float:left;}
		.player{border:1px solid black;border-radius:25px;margin:1em;vertical-align:middle;padding:1em;}
		.remove{float:right;position:relative;top:50%;transform:translateY(-50%);-moz-transform:translateY(-50%);-webkit-transform:translateY(-75%);}
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

	<div id="combatants">
		<h3>Combatants</h3><br/>
			<input type="button" id="addCombatant" value="Add Combatant"/>
			<input type="button" id="joinBattle" value="Reroll Join Battle"/>
		<table id="combatants"><tbody></tbody></table>
	</div>

	<div id="dialog"><form id="dialog-form"></form></div>
</body>
</html>