<!DOCTYPE html>

<html>

<head>
	<meta charset="UTF-8">
	<title>Exalted Stuff</title>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">

	<style>
		@font-face{font-family:Albertus;src:url(assets/AlbertusMTStd.otf);}
		@font-face{font-family:Missive;src:url(assets/Missive.ttf);}
		@font-face{font-family:Goudy;src:url(assets/GoudyStd.otf);}

		h1,h2,h3{display:inline;}
		h1{font:500% Albertus;text-transform:uppercase;}
		h2,h3,.name{font-family:Missive;}
		h2,.name{font-size:200%;}
		h3{font-size:150%;}
		html{height:100%;}
		body{border-left:solid crimson 50px;margin:0;}
		body,textarea,input[type=button]{font-family:Goudy;}
		table{width:600px;padding:1em;}
		textarea{width:85em;height:30em;}
		input[type=number]{width:3em;}
		body > div{margin:1em;}
		body > div.ui-widget-overlay.ui-front {margin:0em;}

		#combatants{width:71em;}
		#name {width:25em;}
		
		.inactive{font-style:italic;background-color:#444;width:75%;height:75%;}
		.crashed{background-color:purple;}
		.incapacitated{background-color:#FE5A1D;color:white;font-style:italic;}
		.dead{background-color:red;color:white;font-style:italic;}
		.initiative{font:750% Missive;float:left;margin-right:.1em;}
		.player{position:relative;border:1px solid black;border-radius:25px;margin:1em;vertical-align:middle;padding:1em;}
		.randomize{background-image:url('/img/ten_sided_die_16.png');background-repeat:no-repeat;background-position:top left;width:20px;height:20px;}
		.remove{position:absolute;top:50%;right:1em;transform:translateY(-50%);-moz-transform:translateY(-50%);-webkit-transform:translateY(-50%);}
		.twink{background-image:url('/img/cbe_16.png');background-repeat:no-repeat;background-position:top left;width:20px;height:20px;}
		.ui-widget{font-size:.75em;}
	</style>

	<script src="https://code.jquery.com/jquery-2.1.0.min.js"></script>
	<script src="https://code.jquery.com/ui/1.11.0/jquery-ui.min.js"></script>
	<script src="./prototypes/prototypes.js"></script>
	<script src="./prototypes/Scene.js"></script>
	<script src="./prototypes/Combatant.js"></script>
	<script src="./includes/defines.js"></script>
	<script src="./includes/utils.js"></script>
	<script src="./includes/dialogs.js"></script>
	<script src="./includes/randomCrap.js"></script>
	<script src="./includes/combat.js"></script>
	<script src="./exalted.js"></script>
</head>

<body>
	<h1>Exalted 3rd Combat Simulator</h1><br>

	<div>
		<h2>Results</h2><br>
		<textarea id="results" readonly tabindex="-1"></textarea>
	</div>

	<div id="roller">	
		<h3>Basic Die Roller</h3><br>
		<input type="number" id="numDice" value="10" min="1" max="25">
		<input type="button" id="roll" value="d10">@ <input type="number" id="targetNumber" value="7" min="1" max="10">,
		Difficulty <input type="number" id="difficulty" value="1" min="0" max="5"><br>		
		Double Rule: <input type="radio" name="doubleRule" value="10" checked>10s
		<input type="radio" name="doubleRule" value="9">9s
		<input type="radio" name="doubleRule" value="8">8s
		<input type="radio" name="doubleRule" value="false">None
	</div>

	<div id="combatants">
		<h3>Combatants</h3><br>
			<input type="button" id="addCombatant" value="Add Combatant">
			<input type="button" id="joinBattle" value="Join Battle!">
		<table id="combatants"><tbody></tbody></table>
	</div>

	<div id="dialog"><form id="dialog-form"></form></div>
</body>

</html>