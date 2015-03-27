/*

CONDITION_DESC_ID	CONDITION_DESC
AFTER_AIM	After taking an Aim action
DAMAGE_MATCH_STAMINA	Requires damage equal to or in excess of target Stamina
TWO_AIMS_AT_EXT_RANGE	Must be used to shorten second Aim action if used from extreme range

EFFECT_DESC_ID	EFFECT_DESC
CONVERT_MOTE_TO_DIE	Converts motes to dice, 1:1
'LOSE_ONE_COVER'	Reduces benefit of cover by 1 (to a minimum of -1)
FULL_COVER_AT_3	Allows attacking opponent in full cover (at +3 defense)
IGNORE_VISUAL_PENS	Ignores visual condition penalties
SEE_THROUGH_COVER	Can see through cover for a tick (possibly not directly combat applicable)
NO_WITHERING_TRANSFER	Initiative damage not transferred to attacker on successful Withering attack
TARGET_KNOCKDOWN	Target knocked down
TARGET_KNOCKBACK	Target knocked back a range band
RUSH_CANCEL	Ends target rush if applicable
AIM_FINISH	Completes Aim action instantly
AIM_CONVERT	Converts Aim bonus dice to non-Charm successes

primary, secondary, tertiary, quaternary, quinary, senary, septenary, octonary, nonary, denary, undenary, duodenary, tredenary, quattuordenary, quindenary, septendenary, octodenary, novemdenary, vigenary, unvigenary, ...

costIncrement?

*/

var charms = [
	// Archery

	{
		'name': 'Wise Arrow',
		'cost': '1m',
		'mins': 'Archery 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'With skill and effort, the Exalt guides her arrow to its mark. The Exalt may use this Charm to supplement a withering or decisive attack, reducing the benefits of cover. The defense bonus of heavy and light cover is reduced by one, while characters under no cover suffer a -1 penalty to their normal defense.	In addition, after taking an aim action, the Solar may activate this Charm to strike an opponent in full cover. The Exalt shoots along an arc or angle that perfectly matches her opponent’s position. So long as there is some opening where an arrow can get through, Wise Arrow treats a character in full cover as if they had a defense of +3.'
	}, {
		'name': 'Sight Without Eyes',
		'cost': '1m',
		'mins': 'Archery 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One tick',
		'prereqs': 'Wise Arrow',
		'desc': 'The Exalt opens her eyes not to the visual world, but to the world of Essence, sensing her target in that fashion. She may make an Archery attack without penalties for visual conditions. Smoke, fog, and pitch darkness are no longer a problem for her, though other factors such as high winds and cover still apply against the attack.	At Archery 5+, Essence 3+, the Solar can momentarily see through cover, perceiving her targets as silhouettes the colors of bright anima.'
	}, {
		'name': 'Force Without Fire',
		'cost': '3m',
		'mins': 'Archery 4, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Withering-only',
		'duration': 'Instant',
		'prereqs': 'Sight Without Eyes',
		'desc': 'The Solar nocks an arrow with purpose, sending a tremulous pulse through her surroundings as she gathers hurricane force into her bowstring. The Solar makes a withering attack from short or close range, and a pulverizing bolt of force surrounds her arrow as it leaps from her bow. If the attack does at least as much damage as her target’s Stamina, that Initiative is lost rather than transferred to the Solar, and the target is knocked down and back an entire range band. This force is sufficient to end a rush against any target.'
	}, {
		'name': 'Accuracy Without Distance',
		'cost': '1m, 1wp',
		'mins': 'Archery 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Force Without Fire',
		'desc': 'The Solar extends her anima through her hands and into her weapons, joining archer, target and arrow into a single being. This Charm allows the Solar to complete an aim action instantly, and converts the subsequent three bonus dice into automatic non-Charm successes. This Charm does not confer the power to make a shot from extreme long range. If the Exalt wishes to use this Charm from extreme long range, she must use it to shorten the second aim action.'
	}, {
		'name': 'Thread the Needle',
		'cost': '2m, 1wp',
		'mins': 'Archery 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Accuracy Without Distance',
		'desc': 'As the Solar draws back her bowstring, she pulls the Essence of the world to the tip of her arrowhead. Harmonizing with distant forces, she fires on an enemy, launching an attack far beyond her bow’s range. This Charm supplements an Archery attack, allowing the Solar to make an attack from extreme long range. She must still take the prerequisite Aim actions (p. XX) in order to do so, and may need to use Wise Arrow, Sight Without Eyes and Awareness Charms to allow her to see targets at long distances and strike around cover. In real terms, this Charm’s maximum range is one mile. This Charm cannot be used to change the range of fixed-range Charms such as Revolving Bow Discipline. If the Exalt uses Thread the Needle in conjunction with Accuracy Without Distance or Seven Omens Shot, drop the Willpower cost from this Charm.'
	}, {
		'name': 'Seven Omens Shot',
		'cost': '3m, 1wp',
		'mins': 'Archery 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Accuracy Without Distance',
		'desc': 'Clearing her mind of all thoughts, the Solar focuses only on the arrow drawn back against her bowstring, feeling for the flow of Essence she needs to make an incredible shot. The Solar must take three consecutive aim actions against the same target in order to use this Charm. Invoking Seven Omens Shot coverts the normal +3 bonus dice from aiming into three automatic non-Charm successes and adds any extra successes on the attack roll to the attack’s raw damage. Killing an opponent with this Charm awards the Solar one point of Willpower.'
	}, {
		'name': 'There Is No Wind',
		'cost': '3m',
		'mins': 'Archery 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Dual',
		'duration': 'Instant',
		'prereqs': 'Sight Without Eyes',
		'desc': 'The Solar graces her shot with unerring precision and fires it along a flow of Essence, causing it to slice through the air between the arrow and its mark. Her attack ignores penalties from non-visual conditions such as high winds, bad weather, flawed ammunition, and so on. In addition, her withering attack accuracy is calculated as if it were made from short range regardless of the distance she is firing from.'
	}, {
		'name': 'Trance of Unhesitating Speed',
		'cost': '4m, 1wp',
		'mins': 'Archery 3, Essence 1',
		'type': 'Simple',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Wise Arrow',
		'desc': 'The Solar strums her bow and fills the air with sharp notes. This Charm allows the Exalt to attack multiple targets, or a single target multiple times, by spreading her total current Initiative between decisive attacks. Each attack must contain at least three Initiative, and extra Initiative must be spread as evenly as possible between shots. For example, an Exalt with 11 Initiative attacking three targets would make two decisive attacks with four raw damage, and a third with only three. In addition, each 10 she rolls on an attack increases the base damage of that attack by one. The Exalt’s Initiative does not reset until she has completed every attack, and she may not make more attacks than she has ammunition or Dexterity.'
	}, {
		'name': 'Arrow Storm Technique',
		'cost': '5m, 1wp',
		'mins': 'Archery 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Trance of Unhesitating Speed',
		'desc': 'Seething with remonstrative ire, the Solar palms a storm of Essence and fills the sky with demonstrative fire. With this attack, the Solar unleashes a barrage of arrows around a focus, striking up to (Essence * 3) targets up to medium range from her initial target. Roll a single attack against the defenses of every target, and then apply damage.	These extra decisive attacks carry a base damage of her Perception—divvy up her current Initiative evenly among the remaining shots to determine the total raw damage of each attack. Arrows reaching out to medium range from her initial target are expressly allowed to ignore the range limitations of her weapon without penalty. The Exalt’s Initiative does not reset until every damage roll has been completed.'
	}, {
		'name': 'Revolving Bow Discipline',
		'cost': '6m, 1wp',
		'mins': 'Archery 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Perilous, Withering-only',
		'duration': 'Instant',
		'prereqs': 'Arrow Storm Technique',
		'desc': 'Holding a host of arrows between each finger, the Solar draws down on her target, firing with profound speed and focus. The Solar may draw and attack a single target repeatedly, launching multiple withering attacks until she either misses or crashes her opponent. Revolving Bow Discipline can only be used within short or close range.	At Essence 4+, the Solar gains one point of temporary Willpower when she crashes a foe with this attack.'
	}, {
		'name': 'Phantom Arrow Technique',
		'cost': '1m',
		'mins': 'Archery 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Palming a mote of Essence, the Lawgiver pulls a thorn from her heart and fires it at the breast of her enemy. With this Charm, the Solar may continue firing her bow even when she has run out of arrows.	In addition, once per scene, the Exalt may suffuse a phantom or physical arrow with the import of one of her Intimacies. Doing so gives her attack a number of non-Charm bonus dice equal to the Intimacy, but also temporarily numbs her to that Intimacy. She may not use this attack again until she has spent significant effort in restoring or remembering the Intimacy, or in the case of a negative Intimacy, has been reminded of why she feels negatively toward it.	Adamant Arrow Technique: At Essence 3+, the Solar may infuse a single phantom or physical arrow per scene with her enduring Essence. So long as she lives, the fired arrow cannot be destroyed or pulled from the target. Such arrows can be moved by cutting away the base into which they have landed—a tree can still be cut down, a wall still reduced to rubble—but the arrow will remain inviolate. Only the Solar who fired this arrow, or one blessed with her permission may remove the arrow from its resting place.'
	}, {
		'name': 'Immaculate Golden Bow',
		'cost': '5m, 1wp',
		'mins': 'Archery 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Phantom Arrow Technique',
		'desc': 'Honing her skill and focusing her will, the Exalt births a stunning varicolored bow from her palm. This Charm creates a weapon with stats identical to a powerbow, described on page XX. The weapon is made of solidified Essence forged in all the colors of Solar anima, and glows like a torch.	For an additional purchase, players may add a custom Evocation to Immaculate Golden Bow. Players should work with their Storyteller to create an Evocation that fits the character’s personality or iconic anima manifestation. In addition, Immaculate Golden Bow has the following power:	Sky-Eater’s Crest: For four motes, Immaculate Golden Bow is transformed for a single turn, growing wings, spines, fins, or other appendages appropriate to the Exalt’s iconic manifestation, providing a barrier of heavy cover against ranged attacks.'
	}, {
		'name': 'Fiery Arrow Attack',
		'cost': '2m',
		'mins': 'Archery 4, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Phantom Arrow Technique',
		'desc': 'Charging her arrow with Essence, the Exalt fires a heavy shot that rends the air as it passes onto her target, lighting the arrow on fire. If the arrow strikes flammable materials, a violent blaze instantly seeks to consume the struck object. This fire is natural, and may spread to surrounding objects or cause combustible materials to explode. When used in a decisive attack against a target, it adds one automatic success to the damage roll. If the attack does at least three health levels of damage, the target catches on fire, and must contend with (Solar’s Essence) lethal damage every turn until she is able to extinguish herself.'
	}, {
		'name': 'Dazzling Flare Attack',
		'cost': '3m',
		'mins': 'Archery 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Fiery Arrow Attack',
		'desc': 'The Solar shoots from her heart; the arrow is part of her. As such, she can sometimes reach out and draw her Essence across an arrow in flight, causing it to flash and flare, surging toward its target like a smite from the sun. This Charm can only be activated on an attack supplemented by Fiery Arrow Attack; when the attack generates at least one 10, this Charm adds one automatic success to the attack, and for each 10 in the roll, it adds one die to the attack’s raw damage. As the name suggests, Dazzling Flare Attack goes off like a spectacular flare that can be seen for miles.'
	}, {
		'name': 'Searing Sunfire Interdiction',
		'cost': '4m, 1wp',
		'mins': 'Archery 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Dazzling Flare Attack',
		'desc': 'The Lawgiver fires an arrow that courses with burning Essence, streaking down like a falling star to explode at her enemy’s feet. This attack is a difficulty 3 gambit made against a target with lower Initiative. This gambit’s Initiative roll is bolstered by the Solar’s Essence, and benefits from double 9s. If successful, it blasts the target out of position, forcing them to act (2 + extra successes on the Initiative roll) ticks later than they would have. If Searing Sunfire Interdiction drops the target to a tick of 0 or less, the target loses their turn for the round. Searing Sunfire Interdiction cannot be used on the same target twice consecutively.	An Essence 3+ repurchase of this Charm allows the Exalt to interdict an opponent with up to (Dexterity) more Initiative than the Solar, lowering the difficulty of the gambit to 2 on the attempt, and waiving the Initiative cost upon success.	An Essence 4+ repurchase of the upgraded Charm resets the Solar’s attack if she drops an opponent from a higher Initiative tick to a lower Initiative tick than her own.	An Essence 5+ repurchase of the second upgrade allows the Solar to use Searing Sunfire Interdiction twice consecutively on the same target, dropping the willpower cost from the second shot.	An Essence 6+ repurchase of the previous upgrade allows the Lawgiver to use this gambit repeatedly against a single target: each time she successfully hits with this gambit, she may immediately fire the gambit again, so long as she has ammunition. If she misses or forces her target to lose a turn, the Charm ends. As with the previous upgrade, waive the willpower cost from all but the first shot. If the Solar stops an opponent from acting, award her a point of willpower.	An Essence 6+ repurchase of the previous upgrade allows the Solar to immediately target a new opponent with the above effect upon dropping another opponent to tick 0 or lower with Searing Sunfire Interdiction.'
	}, {
		'name': 'Solar Spike',
		'cost': '5m, 1wp',
		'mins': 'Archery 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Dazzling Flare Attack',
		'desc': 'The Lawgiver draws a blazing bolt of Essence across her bow and fires it. The attack ignores the range of her weapon, and can be made from long range, or extreme range with an Aim action. The Exalt must have higher Initiative than her target to use this attack; the conjured Spike does not use the Solar’s Initiative to do damage, but instead has a raw damage equal to her current temporary Willpower multiplied by one or the rating of any Intimacy she is trying to uphold or protect. Solar Spike is incompatible with Fiery Arrow Attack and Rain of Feathered Death, and does not reset the Exalt’s Initiative to base on a hit. Solar Spike may only be used once per scene, unless reset by a stunt that causes observing characters or players to feel a sense of awe at the Lawgiver’s combat prowess.'
	}, {
		'name': 'Heart-Eating Incineration',
		'cost': '3m',
		'mins': 'Archery 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Solar Spike',
		'desc': 'The Solar’s judgment scourges her target with devouring flames. She may only pay to use this attack when unleashing Solar Spike, and when her anima is at bonfire. Instead of conjuring Solar Spike, the Solar draws her anima as if she were pulling an arrow from a quiver, her iconic manifestation taking the form of a living, screaming missile. This attack follows the rules of Solar Spike, but adds the Solar’s Initiative to the raw damage of the attack. This does cause the Lawgiver’s Initiative to reset on a hit, but if Heart-Eating Incineration kills her target, the target’s body and soul are engulfed in a torrent of flames and burned away completely, restoring a number of motes to the Solar equal to her Intimacy rating for the target plus the target’s permanent Essence score. Using Heart-Eating Incineration resets the Solar’s anima to the dim level.'
	}, {
		'name': 'Rain of Feathered Death',
		'cost': '3m per duplicate, 1wp',
		'mins': 'Archery 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Phantom Arrow Technique',
		'desc': 'The Lawgiver hones her killing prowess, splitting an arrow into a devastating barrage. The Exalt only needs a single arrow to fire this shot; her one arrow splits into multiple arrows and all are directed against a single target. The Solar may split her shot into a maximum of (Dexterity) arrows. If the attack hits, each created arrow hits with a raw damage equal to the Solar’s current Initiative minus her successes on the first damage roll. Therefore, if she rolls 10 damage dice and gains two successes on the first roll, the second roll will feature eight dice. If that gains four successes, her third damage roll will be four dice. If the Exalt runs out of damage dice due to successful hits, her created arrows cannot do less than (Essence) damage each.'
	}, {
		'name': 'Flashing Vengeance Draw',
		'cost': '3m',
		'mins': 'Archery 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Trance of Unhesitating Speed',
		'desc': 'To invite the wrath of the Bronze Tiger is to invoke one’s own doom. The Solar gains (Essence) automatic successes to her Join Battle result, and if she acts before her target, her first attack is unblockable. Flashing Vengeance Draw is expressly permitted to be used in combination with Charms that boost Join Battle results, so long as they are not based in Melee, Thrown, or Brawl.'
	}, {
		'name': 'Hunter’s Swift Answer',
		'cost': '5m, 1wp',
		'mins': 'Archery 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Flashing Vengeance Draw',
		'desc': 'The Lawgiver suffers no impunities; with terrific speed and ferocious import, she may answer the blades of her transgressors. When the Solar succeeds at a disengage action, she may unleash a withering or decisive Archery attack from close range, even if she has already attacked that turn. This attack must be directed at the one she broke away from.'
	}, {
		'name': 'Finishing Snipe',
		'cost': '7m',
		'mins': 'Archery 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Hunter’s Swift Answer',
		'desc': 'With instincts honed for the kill, the Exalt feels the momentum of battle break and flee her target. When an opponent within range suffers Initiative Crash, the Lawgiver draws on this moment to attack again, even if she has already used a combat action that turn. If she wishes to use Finishing Snipe, the Lawgiver must not be engaged in a Simple action that would prevent her from attacking.'
	},

	// Athletics	
	
	{
		'name': 'Graceful Crane Stance',
		'cost': '3m',
		'mins': 'Athletics 1, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'The Solar draws Essence through her pores and into her bones, suffusing and lightening her form and steadying her step. For the rest of the scene, she has perfect balance, and can stand or run on things too narrow or weak to support her normally, with no chance of falling or breaking through. She can run on a guy wire, stand on a crumbling parapet, and balance on the tip of a pine tree, and many other similar feats, without needing to roll Dexterity + Athletics.'
	}, {
		'name': 'Monkey Leap Technique',
		'cost': '2m',
		'mins': 'Athletics 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Exalt leaps with the speed and grace of a striking hawk. Using this technique, a Solar may automatically leap forward or straight up one range band. A Solar using this Charm can easily leap to the top of a twenty foot wall or cross a Nexus street over rooftops, without having to roll. This Charm counts as the Solar’s movement for the turn. If the Solar continues to leap to a different range band each turn, the cost is reduced to one mote after the first activation.'
	}, {
		'name': 'Soaring Crane Leap',
		'cost': '3m',
		'mins': 'Athletics 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Monkey Leap Technique',
		'desc': 'Striking an efficacious pose, the Exalt catches the wind to slow a fall. This allows her to drop down two range bands without taking damage. In order to survive a very long fall with this Charm, the Solar must use it at least once every three bands. The Exalt can also use this Charm to drift long distances through the air, expending her movement action to float forward a single range band even as she continues to fall. With an adequate amount of thrust, the Exalt can glide across long horizontal distances without falling, equaling her initial movement forward. For example, if she were to leap out over a chasm two range bands across with Monkey Leap Technique, she could then activate Soaring Crane Leap to glide across the second range band on her next turn.'
	}, {
		'name': 'Unbound Eagle Approach',
		'cost': '—(2m)',
		'mins': 'Athletics 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Soaring Crane Leap',
		'desc': 'It is the Solar’s nature to rise above. Meditating on the tyrannical bonds of gravity, the Exalt learns to separate her Essence from that which pulls her down. By paying two extra motes to the activation of Soaring Crane Leap, the Exalt may drift across a horizontal range band without initial thrust, allowing her to plane along low ceilings or avoid traps that might detect a more wild leaping motion. In addition, she can use this Charm on each round after activating Soaring Crane Leap to continue to glide across range bands without dropping down.'
	}, {
		'name': 'Mountain-Crossing Leap Technique',
		'cost': '7m, 1wp',
		'mins': 'Athletics 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Until she stops leaping',
		'prereqs': 'Unbound Eagle Approach',
		'desc': 'The Solar gathers enormous spiritual pressure into her legs launches herself skyward. The Exalt makes a wild leap four range bands forward or three straight up. As the force of her leap is almost uncontrolled, she may not leap fewer than three range bands with this Charm. This Charm stays active every turn until the Solar stops leaping across range bands, making it possible for the Exalt to cross a mountain range in minutes. If this Charm is combined with Monkey Leap Technique, the Exalt can make a controlled leap to the second range band.'
	}, {
		'name': 'Eagle-Wing Style',
		'cost': '5m, 1wp',
		'mins': 'Athletics 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Mountain-Crossing Leap Technique',
		'desc': 'Focusing her Essence down her spine and through her lower extremities, the Exalt repels the ground with a tremendous leap. The Exalt locks onto an aerial target, whether it be a Haslanti skyship or a Stormwind Rider, leaps toward it and begins to soar. This moves her up to two range bands, expending her movement action, and allows her to continue flying one range band through the air on subsequent turns by paying two motes or two initiative per turn. Once she is within combat range of an opponent, attacking is sufficient enough movement to keep her airborne. If she is a ranged fighter, she may also use Unbound Eagle Approach, paying two motes in order to hang in the air, planing along an air current as she takes an aim action. Lastly, the Solar can also channel a burst of speed for two motes, allowing her to rush or disengage from appropriate distances.	If she fails to activate the Charm, gets knocked off-course or otherwise begins to fall, Eagle-Wing Style cannot be reactivated until she touches down and is able to leap again. When used in a combo, Eagle-Wing Style can be activated at the apex of Mountain-Crossing Leap Technique, and costs only four motes to activate.'
	}, {
		'name': 'Bonfire Anima Wings',
		'cost': '--',
		'mins': 'Athletics 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Eagle-Wing Style, Onrush Burst Method',
		'desc': 'Relentless in pursuit of her ideals, the Lawgiver’s anima becomes like a pair of burning wings that carry her across the sky. When using Eagle-Wing Style to engage in aerial combat, and when her anima is at the bonfire level, the Solar’s attacks benefit from the effects of Onrush Burst Method, generating motes that can be used to pay the activation costs of Athletics Charms. When in use, the Solar’s anima typically resolves into wings that resemble an eagle’s, or the Solar’s iconic manifestation.'
	}, {
		'name': 'Foe-Vaulting Method',
		'cost': '3i',
		'mins': 'Athletics 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Graceful Crane Stance, Monkey Leap Technique',
		'desc': 'Fearless in combat, the Solar leaps over her stunned opponent. At close range, if the Exalt has higher Initiative (before cost) than her foe, she may use this Charm on her turn, rolling Dexterity + Athletics against her opponent’s Evasion. If successful, she leaps over her target, creating an opening, and may make a surprise attack (see p. XX) overhead or at their back. This Charm may only be used once per combat, but is reset by landing a decisive attack and building Initiative to 6+.'
	}, {
		'name': 'Lightning Speed',
		'cost': '3m',
		'mins': 'Athletics 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Like a flashing bolt, the Exalt streaks toward her goal, trailing streamers of anima. This Charm can be used to enhance a rush action (see p. XX). The Exalt moves with terrific speed—add one automatic success and reroll all 5s and 6s until 5s and 6s fail to appear. Lightning Speed can also be used each interval of a foot race or other test of speed (see p. XX).'
	}, {
		'name': 'Racing Hare Method',
		'cost': '5m, 1wp',
		'mins': 'Athletics 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One hour',
		'prereqs': 'Lightning Speed',
		'desc': 'Attuned to Essence currents that flow through the world, the Solar moves as if in a waking dream. She travels in flashing sprints and sparking leaps, moving from branch to branch like a skipping stone and leaving dust clouds in her wake. This Charm lasts one hour. During this hour, the Solar moves up to three range bands per turn, depending on the terrain and her ability to move at an uninterrupted clip. If she joins battle, her speed is greatly slowed, as she must focus more completely on her environment. The Solar resumes moving one range band per turn, but the Charm still has an effect: double 9s on rush attempts, and for every 10 rolled on a rush, the Solar gains a point of Initiative. If the Exalt knows the Charm Triumph-Forged God-Body, the rushes instead gain (Essence) bonus dice. These benefits also apply to each interval of a test of speed. If the Lawgiver chooses to renew this technique at the end of an hour, ignore the Willpower cost.'
	}, {
		'name': 'Demon-Wasting Rush',
		'cost': '5m, 1wp',
		'mins': 'Athletics 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Racing Hare Method',
		'desc': 'A Solar with this Charm can attempt a rush from mid range. If successful, she will automatically move one range band closer to her target on her target’s next two turns, in addition to her normal movement.'
	}, {
		'name': 'Onrush Burst Method',
		'cost': '--',
		'mins': 'Athletics 3, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Lightning Speed',
		'desc': 'The Solar learns to channel the exhilaration she feels at chasing an opponent into a burst of adrenal power that restores her spirit. On successfully rushing an opponent, the Exalt gains three motes to be used on Athletics Charms. These motes last until she has taken her next turn.'
	}, {
		'name': 'Winning Stride Discipline',
		'cost': '--',
		'mins': 'Athletics 4, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Lightning Speed',
		'desc': 'Racing against herself, the Solar exults in leaving her competitors behind. In a test of speed, each interval in which the Solar accrues more successes than her fastest opponent garners a spirit-restoring surge: two motes to be used on Athletics Charms on her next turn, or two Initiative.'
	}, {
		'name': 'Arete-Driven Marathon Stride',
		'cost': '--',
		'mins': 'Athletics 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Winning Stride Discipline',
		'desc': 'The Solar trains her body to feel the Essence of those she would outrun, matching their strength with her stride. When she falls behind in a test of speed, every 10 her fastest opponent rolls also counts as a single success to the Solar’s own roll. This Charm also functions in rushes, to aid in countering the target’s attempts to avoid the Solar.'
	}, {
		'name': 'Hurricane Spirit Speed',
		'cost': '1i per success',
		'mins': 'Athletics 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Arete-Driven Marathon Stride',
		'desc': 'Like a living storm, the Exalt gathers momentum and speed as she races over land. In combat, the Exalt may spend Initiative for successes to rush a target. In a test of speed she may use it at each interval.'
	}, {
		'name': 'Godspeed Steps',
		'cost': '4m, 1wp',
		'mins': 'Athletics 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Arete-Driven Marathon Stride, Racing Hare Method',
		'desc': 'The Exalt projects herself forward on a pulse of Essence, faster than a heartbeat, moving like blur. The Exalt may attempt a rush against an opponent up to three range bands away. If successful, she flashes out in a burst of speed, and flashes in at close range to her target that same instant. This Charm removes the flurry penalty for an attack made after a rush. If used in conjunction with Racing Hare Method, the Exalt can rush an opponent up to four range bands distant.'
	}, {
		'name': 'One Extra Step',
		'cost': '--',
		'mins': 'Athletics 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Godspeed Steps',
		'desc': 'Once per scene, the Exalt may take a second movement action on her turn.'
	}, {
		'name': 'Living Wind Approach',
		'cost': '--',
		'mins': 'Athletics 5, Essence 5',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'One Extra Step',
		'desc': 'Once per scene, the Solar may reflexively channel a burst of impossible speed to automatically succeed at a rush. In a test of speed, she may use this to generate one more success than her opponent on any one interval. If multiple Solars use this on the same interval, they all assume a result one greater than the highest number of successes.'
	}, {
		'name': 'Leaping Tiger Attack',
		'cost': '4m, 1wp',
		'mins': 'Athletics 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Dual',
		'duration': 'Instant',
		'prereqs': 'Graceful Crane Stance, Lightning Speed',
		'desc': 'Meditating on the frozen moment, the Lawgiver sees the universe aligning around the neck of her target. Through strength, balance and control, she pulls at the distance between herself and her foe, and flashes in for the kill.	The Exalt may use this Charm as far away as medium range, to instantly flash past her opponent, striking them at close range. If her attack is withering, it deals double damage after soak, but before damage is rolled. If it is decisive, it adds her Essence score to the base damage of the attack.	As the Solar slides past her opponent, she ends the attack standing at close range. This counts as the character’s movement for the round.	In order to use this Charm, the Solar must be at higher Initiative than her opponent, and at 6+ Initiative. Leaping Tiger Attack is explicitly allowed to be used in combination with the Charms of other Abilities, but is incompatible with Thunderbolt Attack Prana and Eagle-Wing Style.'
	}, {
		'name': 'Increasing Strength Exercise',
		'cost': '3m or 3i per dot',
		'mins': 'Athletics 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'The Solar draws remarkable strength from deep within her core. For every three motes of Essence or Initiative the Exalt spends, her Strength score increases by one. Each dot of increase also raises the base damage of her decisive attacks by one. The Solar’s Strength cannot be increased by more than her Essence rating through use of this Charm, and may not grant her more than double her Strength score. Through use of Increasing Strength Exercise, Solars can reach the Strength minimums required to do certain feats of strength (p. XX).'
	}, {
		'name': 'Armor-Eating Strike',
		'cost': '1m',
		'mins': 'Athletics 3, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Increasing Strength Exercise',
		'desc': 'Channeling her strength through her Essence, the Solar’s attacks strike harder and deeper. This Charm supplements a close range decisive attack, allowing the Solar to ignore (Strength) hardness.'
	}, {
		'name': 'Thunderbolt Attack Prana',
		'cost': '4m, 1wp',
		'mins': 'Athletics 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Increasing Strength Exercise, Monkey Leap Technique',
		'desc': 'The Exalt draws down on the Essence around her, pulling it through her upper body, her lungs, her core and down into her legs, and then explodes skyward, rising in a brilliant, Essence-laden arc. This Charm supplements a non-ranged attack which can be made against aerial targets up to short range, or ground targets at short range. The Solar leaps at her target, striking with incredible force—damage is doubled after it is rolled. If the Exalt uses this attack to move to short range, it counts as her movement action for the round. After striking an aerial opponent, the Exalt may fall one range band without taking damage.	Thunderbolt Attack Prana is expressly permitted to be used in conjunction with Charms of other Abilities, and it is suggested that the player use it to create a signature attack that fits the character’s attitude and style.'
	}, {
		'name': 'Ten Ox Meditation',
		'cost': '2m, 3 successes per dot',
		'mins': 'Athletics 5, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'One feat',
		'prereqs': 'Increasing Strength Exercise',
		'desc': 'The Solar magnifies her physical Essence, increasing her ability to move massive loads. This Charm supplements an attempt to lift or break something, allowing the Solar to attempt an action with a prerequisite beyond her current Strength rating. Pay two motes and roll the Exalt’s Strength + Athletics as normal, converting each three successes into a dot of Strength as needed, until the Solar meets the prerequisite. This bonus Strength does not enhance her current dice pool, as this momentary surge of might only establishes whether she can succeed with her current dice. Note that she must still have enough successes remaining, after increasing her Strength, to meet the difficulty requirement of the feat.	On Ten Ox Meditation	For example, the Solar sees a laden wagon sinking into a sand pit. She has Strength 5, and no time to activate Increasing-Strength Exercise—perhaps someone will die if she does not act instantly. According to the rules on page XX, this feat requires Strength 7, and twelve successes on a Strength + Athletics roll. She grabs the hitch, channeling from deep within her reservoirs of might to try to pull it free anyway. The player invokes a full Athletics Excellency, Thunder’s Might and Ten Ox Meditation, rolling eighteen successes. The player spends six of these successes to raise the Solar’s Strength by two—the minimum level to accomplish the feat. Because the player still has twelve successes left over, and has raised the Solar’s Strength to 7, the Exalt is able to pull the wagon from the sand trap immediately.'
	}, {
		'name': 'Thunder’s Might',
		'cost': '5m',
		'mins': 'Athletics 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Increasing Strength Exercise',
		'desc': 'Through intense muscle control, the Solar’s insides erupt with surging Essence power. Reroll all non-successes on a feat of strength.'
	}, {
		'name': 'Power Suffusing Form Technique',
		'cost': '4m',
		'mins': 'Athletics 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Thunder’s Might',
		'desc': 'The Exalt’s body is momentarily framed with surging power. This Charm supplements a feat of strength, adding (Strength) non-Charm bonus dice to the attempt. This is explicitly compatible with the bonus granted by Increasing Strength Exercise.'
	}, {
		'name': 'Legion Aurochs Method',
		'cost': '--',
		'mins': 'Athletics 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Power Suffusing Form Technique',
		'desc': 'Striving toward physical and spiritual perfection, the Solar is an exemplar of physical might. When performing feats of strength, the cost of the Athletics Excellency is permanently reduced to one mote per two dice.'
	}, {
		'name': 'Aegis of Unstoppable Force',
		'cost': '--',
		'mins': 'Athletics 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Legion Aurochs Method',
		'desc': 'The Solar’s might is permanently enhanced, lowering the difficulty of all feats of strength by two.'
	}, {
		'name': 'Nine Aeons Thew',
		'cost': '1m, 1wp',
		'mins': 'Athletics 5, Essence 5',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Aegis of Unstoppable Force',
		'desc': 'Summoning the might of untold forces, the Exalt crosses the threshold of legend. This Charm is the gateway to outrageous shows of physical prowess—the Solar gains double 7s to attempt a feat of strength, and if there is a Strength prerequisite beyond the Solar’s rating, she meets it, even if that prerequisite is 50.'
	}, {
		'name': 'Feather Foot Style',
		'cost': '3m',
		'mins': 'Athletics 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Until the Exalt stops running',
		'prereqs': 'Graceful Crane Stance, Lightning Speed',
		'desc': 'Lightening her step and balancing carefully, the Exalt may run across fluid surfaces. She may dash over unstable surfaces as if they were solid, moving over surfaces no thicker than rice paper without breaking through. At full speed, she may also move across lava or other dangerous surfaces without getting hurt. This effect lasts until the Exalt stops dashing. As long as she is moving at a quick pace, she need not pay the activation cost again.	At Athletics 5+, Essence 2+, the Exalt can pause on unstable surfaces without breaking through, changing the duration of this Charm to “one stunt.” She can walk slowly across the surface of a still pond, pause on the crumbling parapet of a castle to give a speech, and so on. This means that if she is using the Charm to dash across the water to reach a boat, then decides to pause on the water’s surface to address the captain, she must use the Charm twice. If the Exalt is still standing on an unstable surface and is unwilling or unable to renew Feather Foot Style, she becomes subject to the normal laws of gravity and buoyancy. Also note: while she may safely dash across a dangerous surface, standing on top of lava and other dangerous surfaces will cause harm.'
	}, {
		'name': 'Spider Foot Style',
		'cost': '3m',
		'mins': 'Athletics 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': '(Essence +1) turns',
		'prereqs': 'Feather Foot Style',
		'desc': 'With speed and balance heightened to the nth degree, the Solar’s Essence may bond with a surface, allowing her to run up walls or stand upside down on horizontal surfaces such as tree branches, bridge bottoms or overhangs, or to lay flat against a ceiling looking down at her prey. Like Feather Foot Style, if the Solar is unable or unwilling to renew this effect, her preternatural grip dwindles and she may plummet and be subject to falling damage. Spider Foot Style’s effect can be extended for one round by a well-described stunt during a turn in which the Charm is active.'
	}, {
		'name': 'Flashing Marlin Method',
		'cost': '--',
		'mins': 'Athletics 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'The Lawgiver swims as if she was born to water. Purchasing this Charm doubles the Solar’s normal movement through water, allowing her to swim a full range band in a single turn. In addition, when exerting herself, she may hold her breath (Stamina * 3) rounds. This Charm does not confer the ability to swim in armor.'
	}, {
		'name': 'Triumph-Forged God-Body',
		'cost': '--',
		'mins': 'Athletics 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Arete-Driven Marathon Stride, Flashing Marlin Method, Ten Ox Meditation, Unbound Eagle Approach',
		'desc': 'The Solar possesses a body and spirit intensified by thousands of hours of vigorous exercise and meditation. This Charm applies the double 9s rule to every Athletics roll.'
	},

	// Awareness

	{
		'name': 'Sensory Acuity Prana',
		'cost': '5m',
		'mins': 'Awareness 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'A breath of Essence seals the five senses into a more perfect form. The Solar’s senses are heightened and attuned to minute motions and sounds, dim and noisy conditions. She can differentiate between subtle tastes and textures with only the slightest variation. Thus sharpened, it is more difficult for characters to escape her notice, or to deceive her hunting senses. For the rest of the scene, the Exalt’s Awareness rolls benefit from double 9s. In addition, reroll any 5s or 6s the Solar rolls a single time. If the effect of any Unsurpassed (Sense) Discipline applies, reroll 5s and 6s until they cease to appear. Use of Sensory Acuity Prana comes without the danger of sensory overload; the Charm helps the Solar manage her senses more effectively.'
	}, {
		'name': 'Surprise Anticipation Method',
		'cost': '--',
		'mins': 'Awareness 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Sensory Acuity Prana',
		'desc': 'Upon learning this technique, the Solar’s senses guard her from threats she is not consciously aware of. Whenever the Solar is in danger—even if she is not consciously aware of the threat—her relevant senses will home in on the source of danger, enhancing her Awareness to make the threat known to her. Surprise Anticipation Method has two functions. First: for every 9 she rolls on an Awareness check to reveal a hidden enemy, trap, or any source of harm not readily apparent, she gains a single mote of Essence, and for every 10 she gains two. This charge of Essence can only be used to offset the cost of activating Awareness Charms to reveal a threat. Motes returned in this fashion may retroactively lower the cost committed to Awareness Charms of a scene or longer duration, both lowering the committed cost and returning the discounted mote(s) to the Solar’s mote pool. Second: her senses function even when she is asleep or Incapacitated, allowing her to use any of her Awareness Charms subconsciously. A threat revealed to the Solar while she is asleep or unconscious automatically revives her, allowing her to defend herself.	On Surprise Anticipation Method	That’s not a typo. This is a Reflexive Charm with no cost. Surprise Anticipation Method represents a Solar who has honed her senses to a near psychic degree. They act on her behalf to reveal threats to her. Because of the Charm’s function, I chose not to give it a mote cost. Because I wanted to highlight the interaction of the Solar and her senses, I chose not to make it Permanent. Remember, even though I often describe a Charm as doing this or that, Charms are not actors—it is simply easier to communicate the idea to the player in terms of what a Charm does. In reality, Charms only represent the naturally enhanced proclivities of the character in question, pre-existing, validated by the player’s investment of experience points.'
	}, {
		'name': 'Keen Sight Technique',
		'cost': '3m or 6m, 1wp',
		'mins': 'Awareness 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Sensory Acuity Prana',
		'desc': 'The Solar’s visual acuity is heightened to several times that of a normal mortal. The Solar’s optical perception is so sharpened that she is able to use this Charm to further enhance her sight. This Charm represents an array of mechanical benefits: the Solar may perform difficulty 2 or 3 sight-based actions without a roll. She gains an additional two dice to notice hidden persons or devices, to catch sleight of hand and see through disguises. In dim conditions, she sees as well as in broad daylight. Deeper visual hindrances such as dense smoke or fog represent less of a struggle: reduce the difficulty of seeing in such conditions by 1, and remove the -1 penalty to detect hidden threats in such environments. These effects reflect the Exalt’s ability to notice and process hundreds of minute details, as well as to focus and manage light sources more effectively. The Solar’s visual range is also increased: she can see tiny details at 100 yards, quickly count masses of troops, and notice threats well in advance of her position.	Special activation rules: The player may choose to activate Keen Sight Technique by paying six motes, one willpower. Doing so sets the duration of this Charm to Indefinite. Despite being Simple type Charms, each Keen (Sense) Technique can be activated simultaneously by paying the full cost of each. In addition, these Charms are compatible with Sensory Acuity Prana as well as with each other.'
	}, {
		'name': 'Unswerving Eye Method',
		'cost': '3m',
		'mins': 'Awareness 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Keen Sight Technique',
		'desc': 'The Iron Wolf’s gaze cannot be misdirected, and her focus cannot be dissuaded. Even the greatest feats of stealth pale before her genius eyes. When a character attempts to hide from the Solar, steal from her, or cheat her with a quick motion, revert (Essence) of their double successes—typically 10s, but 9s under the effect of double 9s and so on—to single successes. This effect can even contest magic that is considered impossible to notice. The benefit of this Charm only applies to the Solar—it is her eye which is unswerving. The player can choose to activate this Charm after the opposing roll has been made.'
	}, {
		'name': 'Inner Eye Focus',
		'cost': '4m',
		'mins': 'Awareness 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Unswerving Eye Method',
		'desc': 'With flawless gaze and unswerving eye, the Exalt’s vision corrects itself, eating away impurities and anomalies to give her the most perfect view. When contesting a Stealth or Larceny action against the character, this Charm can be used to create a cascading reroll, eliminating non-successes from the Awareness roll as the Solar’s vision corrects itself. After an Awareness roll, record successes and reroll (Essence) non-successes. For each of these dice that turns up a success, reroll another die until the cascade fails to produce any successes. Dice rerolled by Sensory Acuity Prana are not included in the cascade.'
	}, {
		'name': 'Blink',
		'cost': '1wp',
		'mins': 'Awareness 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Inner Eye Focus',
		'desc': 'Cast down into the darkness, the Lawgiver has known an absence of sensation greater than the deepest abyss. The wicked cannot hide, their shadows avail them nothing. With but a thought, the Solar can impel her senses toward greater form. The player may reroll any Awareness roll, maintaining the effects of any Charms she paid for on the initial roll and activating any Charms she wishes to pay for to enhance her second attempt.'
	}, {
		'name': 'Unsurpassed Sight Discipline',
		'cost': '--',
		'mins': 'Awareness 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Keen Sight Technique',
		'desc': 'This Charm permanently upgrades its prerequisite. The Exalt has the eyes of the steeliest raptor. She can spot a field mouse a mile away, read a letter at a hundred yards, and critique the mating habits of insects. In zero visibility environments—such as a silt cloud in the belly of a sunken ship—she sees as if she were in a dense fog, using the rules of Keen Sight Technique. She may pick a face out of a crowd with a casual glance, predict a flash flood by counting distant raindrops, and tell if someone is alive by seeing the blood flow through their skin.	Special activation rules: When Keen Sight Technique is active, any sight-based Awareness Charm is reduced in cost by 1 mote, to a minimum of 1. If the character has learned all three Unsurpassed (Sense) Discipline and activates all three Keen (Sense) Techniques, this discount applies to any Awareness Charm.'
	}, {
		'name': 'Keen Taste and Smell Technique',
		'cost': '3m or 6m, 1wp',
		'mins': 'Awareness 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Sensory Acuity Prana',
		'desc': 'The Exalt’s sense of taste and smell are capable of flawless identification of flavors, textures, and scent profiles. This Charm represents an array of mechanical benefits, as well as two distinct functions of the senses taste and smell. The Solar can recognize an individual by scent alone, and she can tell older scents from new ones, enabling her to tell how recently an individual was present. Add +2 successes to Survival rolls to hunt for food, track a character, or find water, using her sense of smell. This Charm automatically extends the range of these actions to (Essence * 200) yards.	This Charm also creates a library of scents which your character can reference. Upon learning this Charm, the library is populated with the scents of any Major or Defining intimacy the character may have, but it can also include scents outside the confines of intimacies if the Storyteller deems them reasonable, including any scent the character has encountered in the last 24 hours, the smell of a favorite food or drink, or scents linked to strong memories such as love or pain. Entries in a Solar’s scent library can be used to aid in Investigation and Survival rolls, as well as in the smell-based Awareness Charms further up the tree.	This Charm also creates a taste index. Similar to the scent library, the taste index allows the Exalt to immediately recognize any taste she has experienced within the realm of reason. The Solar can identify obscure, complex, or similar flavors, she can deconstruct a meal she has eaten to its basic ingredients, so long as she has experienced most of the flavors at some point in time. The taste index isn’t populated the same way as the scent library; most characters do not have Major or Defining intimacies for flavors. Rather, the Solar may perfectly recognize any flavor the Storyteller considers reasonable. If the character has been a master chef all of her life, her palate is going to be considerably more robust than that of an islander with little contact with the outside world. Conversely, those who have lived or traveled in remote locations may have had access to rare and exotic food, drink, and poison.	This Charm follows the special activation rules of Keen Sight Technique.'
	}, {
		'name': 'Genius Palate Summation',
		'cost': '2m',
		'mins': 'Awareness 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Keen Taste and Smell Technique',
		'desc': 'The Solar’s sense of taste is so intense that she can analyze the emotions that went into preparing a meal or beverage. In a bit of overcooked meat, she might sense the cook’s turmoil; that his mind is not on his work. In a sip of soup salted with arsenic, she might sense the cool, murderous intent of one who is not her normal chef. This Charm acts as an automatically successful read intentions action to determine the emotional state of the one who prepared a meal or poured a drink. The Solar need only sample a single bite of a meal or take a single sip of a drink to gain this understanding.'
	}, {
		'name': 'Foe-Scenting Method',
		'cost': '0m or 2m',
		'mins': 'Awareness 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Keen Taste and Smell Technique',
		'desc': 'The keen nose of the Iron Wolf seeks out those who would attempt to hide. Before an Awareness roll to detect unseen characters, the Solar’s nose automatically counts heads, telling her how many people are in the room, or are within medium range of her. If any scents belong to persons in her scent library, she automatically identifies them. For any unknown, she can further make generally accurate discernments about what kind of being each scent belongs to. Beasts, for example, smell different than humans, as do the undead and spirits. If a scent is not in her library, she can still form a general idea about the creature it belongs to. At this point, the player can choose to pay 2 motes to enhance the Lawgiver’s sense of smell, aiding her in scenting the direction and distance of each target. This adds one automatic success to an Awareness roll to uncover hidden targets.	At Awareness 5+, Essence 3+, the Solar can detect dematerialized spirits with this Charm.'
	}, {
		'name': 'Scent-Honing Prana',
		'cost': '3m',
		'mins': 'Awareness 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Foe-Scenting Method',
		'desc': 'The Lawgiver knows the scent of her kith with the warmth of a lioness, the smell of her enemies with the familiarity of a shark. This Charm adds automatic successes to an Awareness roll to detect hidden characters based on their level of intimacy with the Solar. Minor Intimacies add 1 success, while Major and Defining Intimacies add 2 and 3 respectively. The Solar need not suspect that one of her Ties is hiding nearby; Scent-Honing Prana automatically lends itself to applicable rolls without the Solar knowing, though the player may always choose to disregard its use.'
	}, {
		'name': 'Unsurpassed Taste and Smell Discipline',
		'cost': '--',
		'mins': 'Awareness 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Keen Taste and Smell Technique',
		'desc': 'This Charm permanently upgrades its prerequisite. The Solar can track her prey’s scent with the unerring accuracy of a bloodhound, or find her victim’s scent with the methodical sipping of a serpent. The Exalt adds her Perception or a minimum of 2 automatic successes to any Survival-based rolls to track a character or hunt for food or water using her sense of smell, and extends her range for doing so to (half her Essence rounded up) miles. She also gains the ability to scent moods, making an automatically successful scent-based Read Intentions action to determine a target’s disposition.	She can add scentless, tasteless subjects to her scent library and taste index. She can also add items to her taste index by merely smelling them, as well as reference those tastes by smell alone. With a harmless drop on her tongue, she can identify a poison she has tasted, and she can detect a tasteless poison by the way it dilutes a drink, or acts as an unknown ingredient in a meal whose flavors are well known to her.	In addition, bleeding characters (those with a wound penalty of -1 or greater) and characters who are severely injured (-4 wound penalty) are easier to find. Add 1 or 2 dice to an Awareness roll against the target’s Stealth.	This Charm follows the special activation rules of Unsurpassed Sight Discipline, discounting the cost of taste and smell effects instead of those which enhance sight.'
	}, {
		'name': 'Keen Hearing and Touch Technique',
		'cost': '3m or 6m, 1wp',
		'mins': 'Awareness 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Sensory Acuity Prana',
		'desc': 'The Lawgiver listens with the intensity of an owl, and feels movement in the world like a spider feeling a touch against its web. The Exalt may identify fabrics and minerals with a cursory touch, and can hear at frequencies several times lower than a human. She can listen in clearly on conversations through thick stone walls, hear creatures burrowing in the ground, ants marching on the branches above her head, and other, similar feats. For many actions that would require a difficulty 2 success, the Solar can succeed without a roll. For more difficult actions, the difficulty is lowered, and the Solar gains one automatic success. If she has a specialty that can be logically applied to the roll, the difficulty drops to 1. For example, a Solar who is unfamiliar with art crime will find it slightly more difficult to identify a faked painting by touch than a Solar with an Investigation specialty in detecting forgeries. These benefits do not apply to detecting opponents in stealth.	This Charm follows the special activation rules of Keen Sight Technique.'
	}, {
		'name': 'Studied Ear Espial',
		'cost': '1m',
		'mins': 'Awareness 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Keen Hearing and Touch Technique',
		'desc': 'The Lawgiver’s ears are attuned to the passage of motion. Anything which disturbs the stillness is hers to notice. When a character attempts to move in stealth, the Solar gains +3 dice to spot them.'
	}, {
		'name': 'Knowing Beyond Silence',
		'cost': '2m',
		'mins': 'Awareness 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Studied Ear Espial',
		'desc': 'Even the least sounds fail to escape the Lawgiver’s notice. When attempting to seek out a hidden character with her Awareness, all 1s rolled by her target act as 10s rolled by the Exalt, and all her target’s 2s act as 9s. These 9s are explicitly doubled by Sensory Acuity Prana. Knowing Beyond Silence can be activated after the hiding character’s dice roll.'
	},

	/* 
		Space-Saving Concession (Developer 5, Essence 3)
		Multiple Charms are considered to have the following special activation rules:
		When a Solar is confronted with multiple concealed enemies, her senses are further heightened. The Awareness Excellency and each Reflexive Awareness Charm with an instant duration—except for Blink and Roused Dragon Detection—can have their durations extended to one turn by paying an extra two motes upon activation. If such Charms are combined, a single two mote surcharge extends all of them.
	*/

	{
		'name': 'Eyeless Harbinger Awareness',
		'cost': '3m',
		'mins': 'Awareness 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Keen Hearing and Touch Technique',
		'desc': 'The Solar’s sense of touch is attuned to movement in the world around her. Anything which moves in her presence is subject to her touch. When a hidden character attempts to move across a surface connected to one the Solar is touching, they accrue an additional -2 penalty to their Stealth roll, in addition to the regular -3 penalty detailed on page XX. This Charm functions within short range of the Solar. She can touch a tree trunk and feel something moving in the lowest branches, sense footsteps approaching her in a pitch black hallway, and other, similar feats.	If the Exalt has learned Unsurpassed Hearing and Touch discipline, she can feel such movements out to medium range, and can determine the size, shape and velocity of her target. She can feel a siaka circling beneath her ship, and she can differentiate between a gecko or an assassin lizard climbing down the wall she is leaning against.'
	}, {
		'name': 'Living Pulse Perception',
		'cost': '--',
		'mins': 'Awareness 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Eyeless Harbinger Awareness',
		'desc': 'The Exalt feels the air current around her, and senses even the slightest disruption. In an enclosed space, such as a burial chamber, or a place where high walls or dense foliage stifle gusts of wind, the Exalt can feel the presence of a hidden person displacing the air around her. Add one automatic success to an Awareness roll to detect such a character.'
	}, {
		'name': 'Roused Dragon Detection',
		'cost': '1m, 1wp',
		'mins': 'Awareness 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Knowing Beyond Silence, Living Pulse Perception',
		'desc': 'When fighting blind, the Solar’s second sight rises to see through the Essence of the world, momentarily revealing her target’s location and allowing her to strike. During combat, the Exalt may use this Charm on her turn to strike at a hidden foe within range. If this attack is successful, it does not knock her opponent out of stealth unless they are incapacitated by the blow. Instead, it forces them to change hiding places, making them subject to the penalty for moving in Stealth (see p. XX). If the target can find a different hiding place without changing range bands, this does not use up their movement action for the turn.'
	}, {
		'name': 'Unsurpassed Hearing and Touch Discipline',
		'cost': '--',
		'mins': 'Awareness 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Keen Hearing and Touch Technique',
		'desc': 'This Charm permanently upgrades its prerequisite. The Lawgiver can listen in on a whispered conversation a mile away in still air, or in noisy conditions, such as a raging battlefield, out to long range. She can hear a thunderstorm burgeoning, an army decamping, a tyrant lizard roaring, and other loud noises at (Essence * 5) miles. She can read by passing her fingers over a page and feeling the ink beneath her fingertips. This Charm also confers the following techniques to the Solar:	Conjure Image: For 1 mote, the Exalt can visualize an object she is touching, in sections no larger than a horse’s head. She can identify a familiar face in a pitch black crypt, but might need several activations to visualize the fossil skeleton of an ancient behemoth in a lightless cavern.	Sense Current: For 1 mote, the Exalt can feel the lightest motion of air, orienting herself to the exit in even the most lightless of conditions.	Read the Web: For 5 motes committed, the Exalt can listen in on a conversation behind a thick door, just by touching a connecting wall or surface. She feels the vibrations in her fingertips, and her senses translate them to words she can hear. This is a scene length effect, and its range can be extended up to (Essence * 100) yards by running a wire from the Exalt’s fingertips into a chamber where her targets are speaking.	Sound from Stillness Meditation: For 6m, 1wp, the Solar can take a Simple action lasting five minutes to filter Creation, listening for specific sounds or conversations that have already happened. The Exalt draws audio from the vibrations of sounds stored in her surroundings—usually rocks and trees—and may listen for noises or conversations that happened up to (Essence * 5) hours prior to her arrival with a difficulty 5 Awareness roll. For the duration of the technique, the Solar must remain still, listening intently as she filters out the garbled static and unwanted sounds to reach the media she is searching for. As this technique only lasts five minutes, the Solar can only glean up to half that amount in useful audio.	Unsurpassed Hearing and Touch follows the special activation rules of Unsurpassed Sight Discipline, discounting the cost of hearing and touch effects instead of those which enhance sight. This Charm can never discount the cost of its own techniques.'
	}, {
		'name': 'Dedicated Unerring Ear',
		'cost': '3m per exchange',
		'mins': 'Awareness 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Unsurpassed Hearing and Touch Discipline',
		'desc': 'The Lawgivers can listen across vast spaces for the sound of a favored voice. The Exalt must have activated Keen Hearing and Touch Technique in order to use this Charm. Upon doing so, the Exalt becomes aware any time she is addressed by someone for whom she holds a Major or Defining positive Intimacy, no matter how far away they are. So long as they are in the same plane of existence, the Solar can hear the words of her favored people clearly, as if they were in the same room, so long as they are addressing their speech to her. This Charm’s duration is Indefinite: each time a character addresses the Solar, she has an instant in which she feels a tingle in the base of her skull, telling her to tune her hearing and listen. Upon activating the Charm, she can hear everything her compatriot wishes to say to her, until the character has been silent for ten seconds or longer. The cost of this Charm cannot be reduced by its prerequisite.'
	}, {
		'name': 'Awakening Eye',
		'cost': '5m, 1wp',
		'mins': 'Awareness 4, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Any two Keen (Sense) Techniques',
		'desc': 'At the confluence of mastered senses, the Solar feels second sight growing in her heart. In the moment battle begins, her Awakening Eye reads the flow of Initiative and makes her aware of attacks that will happen in the near future. This Charm supplements a Join Battle roll, creating a cascading reroll of 10s. For every 10 rolled, reroll one non-success. Non-successes which roll 10s are rerolled until a 10 fails to appear in the result. In addition, every rerolled success creates a pool of automatic successes the Solar may use to detect hidden opponents until combat ends. These bonus successes are depleted when the Exalt uses them, though she may choose when and how many successes to use, spreading a number of successes over a number of attempts.'
	}, {
		'name': 'Eye of the Unconquered Sun',
		'cost': '10m, 1wp',
		'mins': 'Awareness 5, Essence 4',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One turn',
		'prereqs': 'Awakening Eye + Any 3 non-Excellency Awareness Charms',
		'desc': 'Solars are the legacy of the Unconquered Sun. It is their destiny to see the world through this age of darkness. When this Charm is used, the Solar’s castemark blazes like a tiny sun, cancelling any Essence-muting magic the Solar may be using, and removing her from stealth. Eyes blazing white, castemark burning, her gaze shines a wide beam of light across everything she searches, twin lamps moving over the terrain out to long range. Everything caught in her stare is subject to the following effects:	• All magical and mundane Stealth effects are cancelled. Solid walls and other opaque objects grow transparent as the Lawgiver’s gaze passes over them, rendering all forms of Stealth automatically unsuccessful.	• Fog lifts, smoke parts, and clouds dissolve under the Solar’s intense focus.	• Dematerialized spirits are forced to materialize.	• All disguise magic is stripped. Mundane disguises tatter and melt away.	• Shapeshifters are forced back into their normal forms and resplendent destinies are temporarily forced into dormancy.	The only way to avoid Eye of the Unconquered Sun is to successfully dodge the Solar’s gaze by applying Evasion against the Solar’s Awareness roll. The Solar’s Awareness roll is enhanced by (Essence) dice, and any 1s rolled are rerolled until 1s fail to appear.	Every character within long range of the Solar who fails to dodge when she uses Eye of the Unconquered Sun is subject to the above effects.	The range of this Charm is extended to extreme range by Unsurpassed Sight Discipline, however, this Charm does not depend on eyesight and may be learned and employed by a blind Exalt. Anyone spotted by Eye of the Unconquered Sun automatically knows it; a bright white glare piercing through a fortress wall or an airship hull is impossible to miss.'
	},

	/*
		Brawl

		WTF, Brawl?
		No, you haven’t missed a rule somewhere. It is unclear how to factor Brawl into the core system. For the playtest: if you favor Martial Arts, you also favor Brawl. However, treat Brawl as a separate Ability for the purposes of your dot rating. You may also find rules that describe punching, kicking, or grappling someone with Martial Arts; Brawl can be swapped with these rules in most cases.
	*/

	{
		'name': 'Fists of Iron Technique',
		'cost': '1m',
		'mins': 'Brawl 1, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'This Charm allows the Exalt to parry lethal damage with her bare hands. In addition, her bare-handed strike does lethal damage and ignores (Essence + Intimacy) soak, including magic that applies soak against decisive attacks. The Intimacy in this context can be a Tie—as the Solar strikes a hated enemy or defends a beloved friend—or a Principle, as the Solar exults in the thrill of violence.'
	}, {
		'name': 'Ox-Stunning Blow',
		'cost': '4m',
		'mins': 'Brawl 3, Essence 2',
		'type': 'Simple',
		'keywords': 'Crippling, Withering-only',
		'duration': 'Instant',
		'prereqs': 'Fists of Iron Technique',
		'desc': 'The Solar pulls explosive Essence from her extremities, causing them to lance through the point of her strike, be it foot, fist, knee, or elbow. Her blow enjoys one automatic success on the attack roll, and (Essence) bonus dice to damage. Ox-Stunning Blow can only be soaked with the target’s Stamina, but unlike a normal withering attack, the Solar does not reap Initiative from this attack. Rather, any Initiative she strips from her opponent is rolled again as dice, and for every two success, the target suffers a -1 penalty to their defenses and dice pools until their onslaught penalty wears off.\n	An Essence 3+ repurchase modifies this Charm so that the Solar gains Initiative from the withering attack in addition to penalizing her opponent with rolled successes.'
	}, {
		'name': 'Knockout Blow',
		'cost': '5m, 1wp, +1m, 1i per die',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Withering-only',
		'duration': 'Instant',
		'prereqs': 'Ox-Stunning Blow',
		'desc': 'The Solar sees a perfect opening and strikes a blow, the apex of her attack suffused by battering Essence. This attack is like a normal withering attack, but the damage is bolstered by doubled 9s. In addition, if the Solar drives her opponent into crash with this attack, they are immediately knocked unconscious. The Solar may further enhance the ferocity of this blow, reflexively paying one mote, one Initiative per die to add to the damage of this attack, to a limit of the Initiative gained by the attack.\n	For example, if the Solar rolls four successes on the damage roll, she may spend up to four motes, four Initiative to add four additional dice to the damage roll.\n	Knockout Blow can only be used once per fight, but can be reset by dodging, parrying, or soaking a withering attack with three or fewer Initiative without suffering crash.'
	}, {
		'name': 'Cancel the Apocalypse',
		'cost': '5m',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Knockout Blow',
		'desc': 'Tearing at an opponent’s anima, the Solar rips away an enemy’s chance for victory. The Exalt can use this Charm upon driving a target into crash, reaching into their soul to rip away at the Essence suffusing them. This Charm deactivates an ongoing Charm of the player’s choosing, but cannot target permanent effects or shintais.'
	}, {
		'name': 'Ferocious Jab',
		'cost': '1m',
		'mins': 'Brawl 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Fists of Iron Technique',
		'desc': 'The Solar strikes her opponent with a fury-enhanced blow. This Charm supplements a physical strike, and adds a number of dice to the damage of a withering or decisive attack equal to the target’s current onslaught penalty.'
	}, {
		'name': 'Quaking Chaos Fist',
		'cost': '4m',
		'mins': 'Brawl 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Ferocious Jab',
		'desc': 'The Solar draws new power at the apex of an attack, sending a surge of chaotic Essence crashing through her foe’s bones and internal organs. This Charm adds extra successes from a decisive attack to the damage roll, and is activated after the attack succeeds.'
	}, {
		'name': 'Adamantine Fists of Battle',
		'cost': '3m',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'Dual',
		'duration': 'Instant',
		'prereqs': 'Quaking Chaos Fist',
		'desc': 'Hardening her fists until they are unbreakable, the Exalt strikes a shattering blow. When this Charm supplements a withering attack made with the Solar’s bare hands, her strike gains an Overwhelming bonus equal to her Strength. For example, the Overwhelming value of a punch attack is 1. If the Solar’s Strength is 5, then her Overwhelming for this attack is 6. On a decisive attack, her attack does lethal damage and doubles 10s. On the tick she uses this Charm, the Lawgiver can parry lethal attacks with her bare hands without a stunt.\n	A repurchase allows the Solar to use a Simple version of this Charm with a duration of one scene and a cost of five motes, one Willpower. This Charm may be activated reflexively for two motes, one Willpower if the Solar uses the supplemental version to successfully damage an opponent.'
	}, {
		'name': 'Heaven Thunder Hammer',
		'cost': '3m',
		'mins': 'Brawl 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Ferocious Jab',
		'desc': 'At the moment of impact, the Solar sends a surge of Essence up her arm or down her leg, multiplying the force of her blow many times over. This Charm is activated after a successful decisive attack. If the damage roll generates at least one success, the target is knocked prone by the force of the blow, and loses a point of Initiative, which is added to the Solar’s base value (typically 3) when her Initiative resets. This blow is forceful, striking with the fury of a hurricane condensed into the Solar’s fist. The more damaging the blow, the more forcefully her opponent will be knocked away from her:\n	For at least three successes, the opponent is lifted and bodily hurled into an object or surface within close range, hitting it with an impact equivalent to falling a short distance (see falling damage, p. XX), destroying any less-obdurate objects they collide with, such as wooden furniture.\n	At four or more successes, the foe is knocked into an object at close range with tremendous force, or is sent sailing a remarkable distance by the force of the blow. If the former, the opponent hits a surface with force sufficient to leave cracks in a stone wall, impacting with a surface as if they had fallen from a medium distance. If the latter, the force of the blow throws them to short range with a short-distance falling impact.\n	At five or more successes, the foe is thrown to short range and suffers an impact like falling from a medium height.\n	The Solar can use Heaven Thunder Hammer to knock her opponent into a high ceiling, forcing them to contend with falling damage on the way down. She might also choose to smash her foe through a weak point in a nearby wall, causing them to suffer a collapse. She might aim to hurl her opponent into a spike protruding from a surface, turning the damage lethal, or knock her enemy from a rooftop, causing them to suffer a fall from a much greater distance. The player should include the environment to enhance this Charm’s effectiveness.'
	}, {
		'name': 'Sledgehammer Fist Punch',
		'cost': '5m',
		'mins': 'Brawl 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Heaven Thunder Hammer',
		'desc': 'The Exalt concentrates her anima around her fist, increasing its weight and hardness as she strikes a blow against an object. This attack is neither withering nor decisive and adds (Strength) automatic successes to the damage roll. This Charm greatly enhances a Strength + Athletics based attempt to punch through an object; if the Solar’s totals approach viability for such a feat, this Charm allows her to greatly speed up the demolition, based on the durability of the object she is striking, and the stunt she wishes to do.\n	For example, a Strength 3, Athletics 3 character who is properly motivated could use this Charm to dash a heavy iron lock from a coffer with the heel of her boot, where a simpler feat might involve a brawler who draws her fist along the cobbles of a street or the stones of a wall, pulping the stony surface into a fine sand to blind her opponent with a punch. Using Sledgehammer Fist Punch to strike an object to enhance an attack in such a way does not count as the Solar’s combat action, but using it to collapse a pillar or kick a stack of barrels down onto someone, or cause some other sort of indirect harm does count as her attack for the turn.'
	}, {
		'name': 'Force-Rending Strike',
		'cost': '5m, 1wp',
		'mins': 'Brawl 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Clash, Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Ferocious Jab',
		'desc': 'The Exalt glances into the aura of violence before her and knows the course of her opponent’s strike, meeting it with a greater violence of her own. This Charm allows the Solar to make a reflexive Brawl-based clash attack (p. XX) against an incoming decisive attack. This does not count as the Solar’s combat action.'
	}, {
		'name': 'Intercepting Fury Smite',
		'cost': '--',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Force-Rending Strike',
		'desc': 'As violence and destruction goes, the Solar is an artist and a savant. This Charm permanently enhances Force-Rending Strike; so long as she is wielding an improvised weapon for the clash, Force-Rending Strike’s cost is reduced to four motes, and the Willpower cost is dropped. Using Intercepting Fury Smite to succeed at a clash forces the Solar to discard her current weapon; it is either destroyed or dropped, forcing her to retrieve it or choose another.'
	}, {
		'name': 'Fire-Eating Fist',
		'cost': '1m',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Intercepting Fury Smite',
		'desc': 'The Solar’s strike is guided by the violence she feels in her foe’s onslaught. This Charm supplements a clash attack. Any 1s rolled by the attacker are converted to automatic successes on the Solar’s clash. If the Solar dissolves an energy attack or burning elemental bolt, her fist becomes wreathed in her attacker’s Essence, enjoying (opponent’s Essence) bonus attack and damage dice on her next attack. Attempting to clash a bolt thrown by an assailant out of range of the Solar’s fist lowers the cost of Force-Rending Strike to four motes, and drops the Willpower cost. Fire-Eating Fist does not create a clash attack on its own, and is expressly permitted to enhance Martial Arts Charms with the Clash keyword.'
	}, {
		'name': 'Vicious Lunge',
		'cost': '1m',
		'mins': 'Brawl 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'In a burst of violence, the Solar launches herself at an opponent, seizing them with tremendous force. This Charm supplements a grapple attempt, adding one automatic success to the attack roll and doubling up to (Strength) 9s.'
	}, {
		'name': 'Unbreakable Grasp',
		'cost': '2m per round preserved',
		'mins': 'Brawl 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Vicious Lunge',
		'desc': 'The Solar tightens her Essence around her limbs, making it nearly impossible to pry her off her opponent. The Exalt may use this Charm when her clinch control is threatened by incoming attacks (see p. XX), paying two motes for every round of control preserved. These motes are paid after the opponent’s attack and damage rolls as needed.'
	}, {
		'name': 'Oak-Curling Clinch',
		'cost': '2m',
		'mins': 'Brawl 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Vicious Lunge',
		'desc': 'Locked in a deadly struggle with her opponent, the Exalt draws on the inner fire of her Essence, channeling savage might into her limbs. This Charm may be used after the Solar has succeeded at a grapple attack, converting extra successes on the grapple attack into bonus dice on the roll for clinch control.'
	}, {
		'name': 'River-Binding Wrath',
		'cost': '2m or 4m',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Oak-Curling Clinch',
		'desc': 'The Exalt leaps through her anima like a burning apparition of glorious anger, capturing a foe in her iron grasp. For two motes, this Charm enhances a grapple attempt or the roll for clinch control, allowing the Solar to reroll 5s and 6s until 5s and 6s fail to appear. For four motes, it enhances both rolls.'
	}, {
		'name': 'Devil-Strangling Attitude',
		'cost': '--(3m)',
		'mins': 'Brawl 5, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Vicious Lunge',
		'desc': 'The fury-driven might of the Lawgiver can crush the life from even the gods. This Charm allows the Solar to make a grapple attack with her full Strength + Brawl pool. At Essence 2+ she may pay three motes to double extra successes on the grapple roll when using Oak-Curling Clinch.'
	}, {
		'name': 'Dragon Coil Technique',
		'cost': '3m',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Devil-Strangling Attitude',
		'desc': 'The Solar wraps her mighty arms around an opponent and attempts to crush the life from them. The Solar gains (Essence) automatic successes to land a grapple attack, and on the roll for clinch control she treats the opponent’s 10s as her own single successes.\n	In addition, when the Solar controls a clinch with Dragon Coil Technique, her withering and decisive savaging attacks and slams enjoy (Essence) bonus dice of damage. The Exalt can choose whether this damage is bashing or lethal. In addition, if the Exalt uses Dragon Coil Technique to defend herself from a grapple and wins control, she can keep control of the grapple rather than merely escaping.\n	In addition, if the Solar uses her Strength + Brawl to land a grapple attack, Dragon Coil Technique expressly allows the Solar to grapple characters of prodigious size—tyrant lizards, river dragons, siaka and other similarly sized beasts are all valid targets for the Solar’s dread grasp. However, creatures of truly titanic proportions such as Juggernaut or Mount Mostath can only be gripped in bits and pieces, with the most likely result being that the Solar tears away a massive chunk of her opponent, rather than being able to exert enough force to hold or throw such a gigantic being.'
	}, {
		'name': 'Ten Calamities Technique',
		'cost': '5m',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'Dual',
		'duration': 'Until the grapple ends',
		'prereqs': 'Dragon Coil Technique',
		'desc': 'While controlling a clinch, the Solar locks a ruinous and painful hold on her captive in an attempt to force their submission. The player can describe this as any kind of signature joint lock, chokehold, or scenery-assisted torment they can imagine, applying the damage roll normally. Remember, savaging attacks always hit, and serve only to boost the damage result, per the rules described on page XX.\n	Each consecutive round the character inflicts damage with a grapple, her raw damage grows—+2 per round for withering or +1 for decisive. Thus, a character who made three withering attacks and then a decisive attack would enjoy bonuses of +2, +4, +6 and +4 respectively. Decisive attacks made with this Charm ignore hardness. Ten Calamities Technique does not enhance throws or slams.'
	}, {
		'name': 'Titan-Straightening Method',
		'cost': '7m, 1wp',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Withering-only',
		'duration': 'Instant',
		'prereqs': 'Ten Calamities Technique',
		'desc': 'Channeling primal strength through a surge of Essence, the Lawgiver winnows and thrashes a clinched opponent in an attempt to shake them apart. The Solar immediately expends all remaining turns of control and makes an equal number of withering savaging attacks.\n	Learning Titan-Straightening Method permanently enhances Dragon Coil Technique, allowing the Solar to use it to grapple impossibly huge opponents for the express purpose of using Titan-Straightening Method. This Charm does not confer the power to lift, slam or hurl such opponents.'
	}, {
		'name': 'Raging Wrath Repeated',
		'cost': '4m, 1wp',
		'mins': 'Brawl 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Ten Calamities Technique',
		'desc': 'The Solar’s surging, destructive Essence is redoubled when she breaks an opponent with her own hands. If the Solar crashes an opponent she is clinching, she may reflexively activate this Charm, resetting her combat action, and restoring all the rounds of control that she had at the start of the clinch.'
	}, {
		'name': 'Crashing Wave Throw',
		'cost': '3m',
		'mins': 'Brawl 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Vicious Lunge',
		'desc': 'The Solar concentrates her anima around the arc of a throw, hurling her opponent like a meteor to the ground. When the Exalt aborts control of a grapple to make a withering or decisive throw (see p. XX), the damage pool is boosted by +2 damage per round of control forfeited by the throw. The Exalt can throw her opponent up to short range. If she used Dragon Coil Technique to establish control of a clinch, she can hurl truly massive opponents across the battlefield.'
	}, {
		'name': 'Shockwave Technique',
		'cost': '6m, 1wp',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Withering-only',
		'duration': 'Instant',
		'prereqs': 'Crashing Wave Throw',
		'desc': 'The Solar burns with Essence, launching a captive at a group of foes. When the Solar hurls her captive at a group of foes, the damage roll is enhanced by 4 dice per round of control forfeited by the throw, as described on page XX. The Solar throws her opponent at a target within short range; her captive goes from her like a meteor, blasting through her target and every opponent within short range of him, applying a single Dexterity + Brawl withering attack with a base damage of seven to all additional opponents. Foes struck by this explosive impact are knocked to the ground, and the damage of the throw is applied to each of them separately. When used in combination with Crashing Wave Throw, not only is the damage of this throw enhanced, but also its range, allowing the Solar to strike enemies out to medium range.\n	Special activation rules: Shockwave Technique can be used once per combat. In order to reset it, the Solar must deal 10+ health levels of damage on a single decisive Brawl attack.'
	}, {
		'name': 'Burning Proof of Authority',
		'cost': '4m',
		'mins': 'Brawl 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Unbreakable Grasp',
		'desc': 'During a clinch the Solar controls with at least two rounds of control remaining, the Lawgiver forces her anima into her hand, gloving it in the scarlet, violet and gold radiance of Solar fire, before driving it into her opponent’s flesh, branding them with the mark of her dominance. This mark is painless and inflicts no damage, but instigates the immediate release of the captive, knocking them prone. So marked, the victim is subject to the Solar’s immediate grasp—when she is in close range of the mark, she may reflexively release the motes committed to the Charm, pulling the opponent back into the clinch. There is no grapple roll, nor a roll to reestablish control; the Exalt resumes control over the captive with the number of rounds of control she had when she branded him.\n	If the Solar does not invoke this power, the brand fades away at the end of the scene and the motes return to her Essence pool. Removing the brand requires that the marked character succeed at a grapple with the Solar and wins at least as many rounds of control as those associated with the brand.'
	}, {
		'name': 'Rapturous Cradle',
		'cost': '1m, 1wp',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Burning Proof of Authority',
		'desc': 'Lifting her hand, the Solar reaches across the shroud of the heavens to find the one she has marked. Pulling on a brand created by Burning Proof of Authority, she may draw a captive into her grasp from as far away as long range. The target does not travel the distance between himself and the Lawgiver, but blurs into her steel embrace as if he had never left it. Using Rapturous Cradle automatically releases the Solar’s commitment to Burning Proof of Authority, removing the brand and resuming its effects in total.'
	}, {
		'name': 'Wicked Dissolve Dust',
		'cost': '4m',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'River-Binding Wrath, Intercepting Fury Smite',
		'desc': 'Feeling the tide of momentum turn against her, the Solar draws a shield against her doom. When in control of a clinch, the Exalt can use Wicked Dissolve Dust to interpose her captive between herself and an incoming decisive attack, enacting a reflexive Dexterity + Brawl clash attack. If her clash succeeds, rather than doing damage to the attacker, all of the damage of the opponent’s decisive attack is transferred to her captive.'
	}, {
		'name': 'Thunderclap Rush Attack',
		'cost': '3m',
		'mins': 'Brawl 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar’s aggression fuels her Essence, quickening her movements, allowing her to blur into combat range of an opponent to make a first strike. This Charm allows the Solar to move a single range band without consuming her movement action, to make an attack regardless of her position in the Initiative order. This attack counts as her turn for the round. If contested by another character using Thunderclap Rush Attack, the better stunt wins. The target of Thunderclap Rush Attack may not use a Clash (p. XX) to defend against the Solar’s attack unless they are using a Charm with the Clash keyword.\n	At Brawl 5+, Essence 3+, the character may add one Willpower to the cost of this Charm—when she uses it against her opponent, it automatically strips (Essence or 5, whichever is lower) Initiative from her target and awards it to her, before the attack is made.\n	On Thunderclap Rush Attack\n	It is possible to crash someone with the Brawl 5+, Essence 3+ upgrade without making an attack. This counts as crashing them with an attack. The Solar is awarded the crash bonus, and any Charms which would trigger by crashing someone, or by gaining a crash bonus are applicable before she makes her attack roll.'
	}, {
		'name': 'Falling Hammer Strike',
		'cost': '1m',
		'mins': 'Brawl 4, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Thunderclap Rush Attack',
		'desc': 'The Solar is as relentless as the coming storm. This Charm supplements a withering or decisive attack, preventing the onslaught penalty to her target’s defense from fading on their next turn. The Solar’s onslaught can only be abated by escaping her long enough to suffer no attack for at least one round. If the Solar is unable or unwilling to attack her target, the effect ends and the target’s defense refreshes as normal. Falling Hammer Strike does not maintain onslaught penalties from other characters’ attacks, nor does it supplement grapple attacks.\nAn example of Falling Hammer Strike\nThe Solar lunges at her target with a vicious left, enhanced by Falling Hammer Strike. On the next round, he attacks first, but his defense doesn’t refresh. She uses the Charm again, and snaps his head back with a shattering uppercut. For this attack, his defense is still at -1. Because she used the Charm twice consecutively, he will be at -2 defense on her next attack.'
	}, {
		'name': 'Hammer on Iron Technique',
		'cost': '5m, 1wp',
		'mins': 'Brawl 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Falling Hammer Strike',
		'desc': 'The Lawgiver suffuses her body with Essence, becoming a virtual killing machine, her arms swinging like triphammers. This Charm creates a series of up to (half Strength or Stamina, rounded up, + 1) attacks against a single target, dividing the Solar’s Initiative up evenly for each strike, adding an amount of bonus Initiative to each blow to ensure that they are even. In addition, for every blow that lands, the damage of the next is increased by the number of 10s in the previous damage roll. Attacks created by this Charm ignore hardness.'
	}, {
		'name': 'One With Violence',
		'cost': '--',
		'mins': 'Brawl 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Falling Hammer Strike',
		'desc': 'The Exalted brawler does not meditate as the monks do, but her violent ruminations are no less weighty. Hers is not the way of blind instinct, but the force-honed circumstance of a natural disaster. This Charm enhances the crash bonus the Exalt earns for driving any target into crash with a Brawl or Martial Arts attack, awarding her extra Initiative equal to her Essence or five, whichever is smaller.'
	}, {
		'name': 'Striving Aftershock Method',
		'cost': '2m',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'One With Violence',
		'desc': 'Driven on by the flow of violence, the Solar hones her Essence into her limbs, assuming a more perfect position for her next strike. After landing a decisive attack which resets her to base Initiative (usually 3), the Solar may use this Charm, adding +2 to her base Initiative value.'
	}, {
		'name': 'Superior Violent Knowledge',
		'cost': '4m',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Striving Aftershock Method',
		'desc': 'The Lawgiver looks beyond her next attack and sees the battle’s course unfold. She may use this Charm at any time to reflexively store up to (Stamina) Initiative. Thenceforth, upon making a decisive attack, she may choose to reflexively release her commitment to Superior Violent Knowledge, pouring stored Initiative into her attack’s raw damage to boost it. This Charm expressly allows the Exalt to launch a decisive attack while crashed.\n	Special activation rules: Using Superior Violent Knowledge at the start of her turn does not affect her place in the attack order of the current round but will be reflected in subsequent rounds. Stored Initiative cannot be targeted or stripped by withering attacks. Unless used, this Charm’s effect wears off at the end of combat.'
	}, {
		'name': 'Lightning Strikes Twice',
		'cost': '1m, 1wp',
		'mins': 'Brawl 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Crashing Wave Throw, Heaven Thunder Hammer',
		'desc': 'After launching an opponent with one of the prerequisite Charms, the Solar channels Essence through her arms and legs and rips through the space between, flashing into her opponent to make an additional attack using any Ability and allowing the Exalt to reflexively draw a weapon to do so. When the Exalt uses Lightning Strikes Twice after using one of the prerequisites to unleash a decisive attack, her Initiative does not roll over until after the extra attack has been completed.\n	Making this attack has slightly different effects depending on whether the Charm was triggered with Crashing Wave Throw or Heaven Thunder Hammer:\n	Crashing Wave Throw: The Solar strikes her opponent after they bounce off a hard surface and take damage from Crashing Wave Throw. If the Exalt chooses this version of Lightning Strikes Twice, she may meet her falling opponent in the air and make a grapple attack with the opponent’s Defense set to 0. Succeeding in the roll for clinch control means the Solar must make an immediate throw or slam, hurling her opponent into further hard surfaces or driving them bodily into the ground.\n	Heaven Thunder Hammer: The Solar must knock her foe to short range on the attack in order to use this Charm. Doing so allows her to flash in to range before they impact, cancelling their impact with scenery to strike them again. In this case, the Solar cannot grapple her opponent, but makes a strike against her as if it were a surprise attack.\n	Using Lightning Strikes Twice counts as the Exalt’s movement action, however it is possible to move several range bands while chaining multiple uses of this Charm.\n	Lightning Strikes Twice can only be used once per combat, but can be reset by gaining 10+ Initiative on a single tick.'
	},

	// Dodge

	{
		'name': 'Reed in the Wind',
		'cost': '2i per 1 Evasion',
		'mins': 'Dodge 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Perilous',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Exalt draws upon her own momentum to bend and flow with opposing forces. For every two Initiative spent in response to an attack, the player may raise the Exalt’s Evasion by one. Reed in the Wind raises the cap on how much the Solar can enhance her Evasion by her Essence. At Dodge 5+, Essence 3+, a successful dodge with Reed in the Wind restores one mote. This bonus may only occur once per round.'
	}, {
		'name': 'Dust Motes Whirling',
		'cost': '2m',
		'mins': 'Dodge 4, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Reed in the Wind',
		'desc': 'The Solar is as elusive as a dust mote whirling through a ray of light. This Charm supplements a disengage attempt, granting double 9s.'
	}, {
		'name': 'Shadow Dancer Method',
		'cost': '--(1m)',
		'mins': 'Dodge 5, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Dust Motes Whirling',
		'desc': 'The Lawgiver dances in and out of the whirling blades of her enemies like one consigned to death. For one mote, she retains the two Initiative that are lost with each disengage attempt. In addition, upon using a disengage action to move away on her opponent’s turn, if she then chooses to close with her opponent, she gains two Initiative automatically, regardless of whether she spent a mote on this Charm’s cost.'
	}, {
		'name': 'Fleet Dreaming Image',
		'cost': '5m',
		'mins': 'Dodge 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Dust Motes Whirling',
		'desc': 'The Solar moves ahead of her enemies and tempts them with the illusion of her presence. This Charm allows the Lawgiver to attempt a disengage action from short range on her turn.'
	}, {
		'name': 'Sunlight Bleeding Away',
		'cost': '4m, 1wp',
		'mins': 'Dodge 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Fleet Dreaming Image',
		'desc': 'The Solar melts across the landscape in a fluidity of motion. This Charm can be activated upon succeeding at a disengage action, allowing the Solar to reflexively retreat in the face of enemy movement twice, rather than once. Thus, if the Solar disengaged successfully, she would move back the first and second time an opponent approached on their turn.'
	}, {
		'name': 'Searing Quicksilver Flight',
		'cost': '--',
		'mins': 'Dodge 4, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Reed in the Wind',
		'desc': 'The Solar’s skill at evasion is such that her dodges wither away at her opponent’s momentum. Upon successfully dodging an attack, her opponent loses one point of Initiative in addition to any other Initiative they may have lost for failing the attack.'
	}, {
		'name': 'Force-Stealing Feint',
		'cost': '--',
		'mins': 'Dodge 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Searing Quicksilver Flight',
		'desc': 'This Charm permanently upgrades its prerequisite; the one point of Initiative lost by the opponent is gained by the Solar.'
	}, {
		'name': 'Seven Shadow Evasion',
		'cost': '4m, 1wp',
		'mins': 'Dodge 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Force-Stealing Feint',
		'desc': 'The Solar’s perfect form is quicker than an eyeblink and more tractile than water. Once per scene, the Solar may invoke this Charm to dodge any attack from any source without a contest. The Solar’s anticipation of harm is so perfect that she can even evade recurring uncountable damage with a single use. As a cyclone tears apart a mountain, the Exalt steps through the vortex unharmed. As the Pole of the Earth spills down atop her, she escapes into the seeps and fissures of the world, moving like a fleeing shadow. This Charm may be reset by using Reed in the Wind to dodge three decisive attacks from dangerous opponents.'
	}, {
		'name': 'Refinement of Flowing Shadows',
		'cost': '--',
		'mins': 'Dodge 5, Essence 5',
		'type': 'Permanent',
		'keywords': 'Perilous',
		'duration': 'Instant',
		'prereqs': 'Seven Shadow Evasion',
		'desc': 'The Exalt becomes one with the nothingness and is reborn. Upon using Seven Shadow Evasion to dodge an attack, the Solar gains a point of bonus Initiative, as well as one extra point of Initiative on her turn, each round until she is struck by a withering or decisive attack. This bonus is cancelled if the Solar enters concealment or is at long or extreme long range from her closest foe.'
	}, {
		'name': 'Safety Between Heartbeats',
		'cost': '5m',
		'mins': 'Dodge 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Force-Stealing Feint',
		'desc': 'In making herself untouchable, the Lawgiver exploits the slightest hesitation, even the pause to draw breath, maximizing her opponent’s failure. The Exalt may use this Charm upon successfully dodging an attack, causing her opponent to lose 1 Initiative for each 1 in the attack result.'
	}, {
		'name': 'Thousand Steps’ Stillness',
		'cost': '5m',
		'mins': 'Dodge 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Safety Between Heartbeats',
		'desc': 'Drawing in all possible avenues of motion, the Solar’s perfect stillness is broken by a ribbon of anima that courses through her body, causing her to flicker and treble like heat haze. When the Exalt successfully dodges, she may use this Charm to gain Initiative equal to the 1s and 2s in the attack roll.'
	}, {
		'name': 'Unbowed Willow Meditation',
		'cost': '--',
		'mins': 'Dodge 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Thousand Steps’ Stillness',
		'desc': 'Harm passes through and over the Lawgiver. Untouched, she only grows stronger. When the Exalt successfully dodges a decisive attack without using a Charm, she steals all of the attacker’s Initiative and crashes them. This Charm does not work against gambits, battle groups or trivial opponents.'
	}, {
		'name': 'Reflex Sidestep Technique',
		'cost': '5m',
		'mins': 'Dodge 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Reed in the Wind',
		'desc': 'The Solar’s preternatural awareness of her surroundings makes her nearly impossible to harm. Even when struck unaware, she may part herself from her foe’s attack, undoing the damage that was done to her. This Charm may be activated in response to an unexpected decisive attack to subtract the Solar’s Evasion from her opponent’s base damage. Reflex Sidestep Technique’s effect does not stack with that of Adamant Skin Technique, and may only be bolstered by the Dodge Excellency and Shadow Over Water.'
	}, {
		'name': 'Drifting Shadow Focus',
		'cost': '3m, 1wp',
		'mins': 'Dodge 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One round',
		'prereqs': 'Reflex Sidestep Technique',
		'desc': 'Like a shadow moving in the darkness, the Lawgiver drifts through the ranks of her enemies, sowing terror and confusion. This Charm is declared before an attack and lasts until the Exalt’s next turn. Upon a successful dodge, it allows the Solar to redirect an attack made against her to any other target within close range.'
	}, {
		'name': 'Leaping Dodge Method',
		'cost': '1m, 2i',
		'mins': 'Dodge 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Reflex Sidestep Technique',
		'desc': 'The Exalt feels the coursing Essence of Creation moving through her. With a thought, she grasps the flow and is carried away. Upon a successful Dodge, the Solar may invoke this Charm, burning her momentum to create a sudden burst of movement. She may leap backward, forward, up or down (if applicable) a single range band.'
	}, {
		'name': 'Drifting Leaf Elusion',
		'cost': '1m',
		'mins': 'Dodge 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Exalt slips away from an attack that would have struck her. When using this Charm, the Solar successfully evades an attack roll bearing equal successes to her Evasion. This Charm may be played after the attack roll is made.'
	}, {
		'name': 'Fourfold Shiver Binding',
		'cost': '4m',
		'mins': 'Dodge 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Drifting Leaf Elusion',
		'desc': 'The Solar enacts a skill which doubles and trebles her body in a shimmering blur, placing it together outside of an attack. Upon successfully applying her Evasion, the Solar may activate Fourfold Shiver Binding to raise her Evasion score by one for the rest of the scene. This bonus is not stackable, and does not count as dice added by a Charm. Fourfold Shiver Binding is incompatible with armor.'
	}, {
		'name': 'Shadow Over Water',
		'cost': '2m',
		'mins': 'Dodge 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Drifting Leaf Elusion',
		'desc': 'Like a shadow on water, the Solar’s presence haunts her enemies with dreams of the untouchable. For an instant, this Charm removes any penalties to the Exalt’s Evasion.'
	}, {
		'name': 'Flow Like Blood',
		'cost': '5m, 1wp',
		'mins': 'Dodge 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Perilous',
		'duration': 'One scene',
		'prereqs': 'Shadow Over Water',
		'desc': 'The Exalt permeates her being with Essence, becoming partly atomized. For the rest of the scene, when dodging attacks by opponents with lower Initiative than her own, the Lawgiver ignores all penalties to her Evasion. Attacks which miss her often seem to pass harmlessly through her dreamlike form. While this Charm is active, Reed in the Wind costs only one Initiative per Evasion, and each round that the Solar remains within close range of an enemy without being struck by an attack—either due to her Evasion, or due to not being attacked—she gains a point of Initiative.'
	}, {
		'name': 'Rumor of Form',
		'cost': '3m per -1',
		'mins': 'Dodge 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Shadow Over Water',
		'desc': 'The Exalt moves her physical Essence around the flow of an attack, partially discorporating. For each 1 that appears in the result of an attack roll, the Exalt may pay three motes, converting that 1 into -1 success to the attack. Rumor of Form also acts as a Stealth attempt—as the Solar passes around the strike, she also vanishes in its wake. For every success the Exalt steals from her opponent’s attack, she gains an automatic success on a reflexive Dexterity + Stealth action.'
	}, {
		'name': 'Way of Whispers Technique',
		'cost': '--',
		'mins': 'Dodge 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Rumor of Form',
		'desc': 'The Exalt’s burgeoning mastery of Dodge releases two of her Charms from the burden of consideration. Upon learning this Charm, using Drifting Leaf Elusion and Rumor of Form no longer count as the use of a Charm in conjunction with Unbowed Willow Meditation.'
	}, {
		'name': 'Vaporous Division',
		'cost': '4m per X',
		'mins': 'Dodge 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Rumor of Form',
		'desc': 'Some even claim to have struck a Solar. This Charm allows the Exalt remove damage from a decisive attack after damage has been rolled, at the cost of four motes per cancelled success. A blow cancelled by this Charm appears at first to strike the Solar before missing entirely. Unless using an attack with special Initiative reset rules, an attack negated by this defense will return the attacker to base Initiative.'
	}, {
		'name': 'Living Bonds Unburdened',
		'cost': '3m, 3i',
		'mins': 'Dodge 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Vaporous Division',
		'desc': 'The Solar casts away her physical bonds and revels in dreams of dissolution and the whirling freedom of flight. Upon using this Charm, the Lawgiver begins to channel her anima into her flesh and must remain immobile until her next turn. During this time, her Evasion becomes inapplicable and her Parry suffers a -1 penalty. On her next turn, roll (Stamina or Wits + Dodge) dice to create a number of temporary -0 Health Levels equal to the roll’s successes. While using this Charm, a Solar who suffers damage solely to any of her -0 Health Levels is considered to have successfully dodged the attack. A dodge created solely by Living Bonds Unburdened does not count as the use of a Charm. This Charm’s effect does not stack.\nSpecial activation rules: The Dodge Excellency may not be used to enhance the roll, but rerolls 5s and 6s until 5s and 6s fail to appear.'
	}, {
		'name': 'Unbridled Shade Attitude',
		'cost': '--',
		'mins': 'Dodge 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Living Bonds Unburdened',
		'desc': 'Like cloud-shadows driven by the sun, the Solar passes over all obstacles, unchanged in her course. The Solar gains one point of Initiative for every -0 health level damaged by a decisive attack.'
	}, {
		'name': 'Harm-Dismissing Meditation',
		'cost': '1m, 1wp',
		'mins': 'Dodge 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One turn',
		'prereqs': 'Living Bonds Unburdened',
		'desc': 'Once per scene, the Lawgiver may deny the very wounds that assail her, striking them from her body’s record. This Charm allows the Solar to retroactively dodge damage she has already received. Standing still and silent, the Exalt focuses on her wounds for a single round in which she does not attack and does not apply her Parry or Evasion. Applying such defenses cancels the Charm. At the end of the round, roll her Dexterity + Dodge, unmodified by Charms, and convert the successes into healed -1 and -2 health levels. The Solar steps outside of the moment when she was hurt, casting aside her wounded form and denying its existence.'
	}, {
		'name': 'Hundred Shadow Ways',
		'cost': '6m',
		'mins': 'Dodge 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Stackable',
		'duration': 'One scene',
		'prereqs': 'Vaporous Division',
		'desc': 'After successfully dodging an attack, the Exalt may activate this Charm to remember a single Charm used in the attack. She feels the spiritual form and pressure as a physical thing and understands how to dodge it. For the remainder of the scene, she perfectly evades the effects of that Charm. Hundred Shadow Ways cannot be used against the Excellency Charm of any Ability, nor can it be used against Sorcery or Evocations. Furthermore, if the Exalt falls into Initiative Crash, the Charm ends.\nOn Hundred Shadow Ways\nSay you’ve used this Charm to lock out Hungry Tiger Technique. An attack enhanced solely by Hungry Tiger Technique automatically fails. Now the opponent throws a combo of Hungry Tiger Technique and Fire and Stones Strike—the attack still occurs, but Hundred Shadow Ways automatically removes the benefit of Hungry Tiger Technique from the attack. This Charm can be used to “learn” as many Charms as the Exalt’s mote pool can afford.'
	},

	// Melee

	{
		'name': 'Excellent Strike',
		'cost': '1m',
		'mins': 'Melee 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Exalt channels Essence through skill, honing her accuracy in order to strike true. Her attack gains one automatic success. Additionally, all 1s that appear are rerolled until no 1s appear in the result, and any successes they garner are added to the initial result.'
	}, {
		'name': 'Hungry Tiger Technique',
		'cost': '1m',
		'mins': 'Melee 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Dual',
		'duration': 'Instant',
		'prereqs': 'Excellent Strike',
		'desc': 'The Solar charges her body and weapon with Essence, unifying the two to unleash a brutal strike that rends her opponent. On a withering attack, extra successes are doubled after the attack roll for the purpose of determining raw damage. On a decisive attack, 10s count as two successes on the damage roll.'
	}, {
		'name': 'Fire and Stones Strike',
		'cost': '1m per die or success',
		'mins': 'Melee 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Dual',
		'duration': 'Instant',
		'prereqs': 'Hungry Tiger Technique',
		'desc': 'The Solar strikes with telling force, burning Essence surging into the body of her target and shattering it from within. On a withering attack, the Exalt spends up to her (Strength) score in motes before making the attack. If the attack hits, each mote spent adds a single die to the post-soak damage of the attack. This strike has the potential to increase minimum damage (see p. XX).\nOn a decisive attack, the Exalt may spend up to (Essence) motes before making the attack to transfer an equal number of extra successes from her attack roll into the raw damage of the blow.'
	}, {
		'name': 'Rising Sun Slash',
		'cost': '1m',
		'mins': 'Melee 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Fire and Stones Strike',
		'desc': 'At the apex of her strike, the Solar channels an inexorable flow of offensive Essence through her weapon, increasing the speed and ferocity of her attack. This Charm is activated after an attack roll has been made, before a defense has been applied, and when the result contains at least one straight set of 7, 8, 9 and 10. Rising Sun Slash converts each straight set in the attack’s result into two additional successes, and these successes do not count as dice added by a Charm.'
	}, {
		'name': 'One Weapon, Two Blows',
		'cost': '3m',
		'mins': 'Melee 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Excellent Strike',
		'desc': 'Sensing an opening, the Solar strikes with surpassing speed. Immediately after making a withering attack which lowers an opponent’s current Initiative from a value greater to a value less than the Solar’s own, she may use this Charm to unleash a second attack against that opponent. This second attack may be withering or decisive.'
	}, {
		'name': 'Peony Blossom Technique',
		'cost': '1m, 1wp',
		'mins': 'Melee 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'One Weapon, Two Blows',
		'desc': 'Drawing her raging anima inward, the Solar’s offense is renewed in a sudden burst of flashing, streaking fire. When the Exalt’s anima is at bonfire, she may use this Charm to make an additional attack, even if she has already attacked that turn. The Exalt moves like ice on hot metal, expelling her anima with her attack and returning her to the dim level.'
	}, {
		'name': 'Iron Whirlwind Attack',
		'cost': '5m, 1wp',
		'mins': 'Melee 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Peony Blossom Technique',
		'desc': 'The Solar becomes a killing blur, unstoppable as she whirls through a storm of blood and steel. This Charm splits the Exalt’s Initiative to make a series of decisive attacks up to a maximum of (the lowest of her Strength, Dexterity, or Stamina). These attacks may be directed at a single target, or multiple targets as the player desires. The player divides the Solar’s Initiative between the attacks when they activate the Charm, for the purpose of determining the damage of each attack. Each attack must have at least one Initiative allocated to it, and unlike normal decisive attack resolution, the Solar does not return to base Initiative until the final attack is resolved, and only loses Initiative for missed attacks if all of her attacks fail to connect. In the case of such a miss, the Exalt loses two Initiative per attack attempted.\nSpecial activation rules: Attack-enhancing Charms such as Excellent Strike and Hungry Tiger Technique need only be paid a single time to enhance every attack in this sequence, but the Melee Excellency must be paid per attack. Iron Whirlwind Attack can be activated directly after using Peony Blossom Technique as if it were a Reflexive Charm.'
	}, {
		'name': 'Invincible Fury of the Dawn',
		'cost': '--',
		'mins': 'Melee 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Iron Whirlwind Attack',
		'desc': 'Drawing in Solar Essence, the Lawgiver is possessed by the soul of combat and moves across the battlefield like a killing wind. This Charm enhances its prerequisite: the Solar may make up to (the highest of her Strength, Dexterity, or Stamina) attacks, and may move a single range band to make each attack. In addition, when she activates Iron Whirlwind Attack, she gains an amount of Initiative to spread between her attacks equal to the number of attacks she intends to make. This extra Initiative vanishes after the attack is completed.'
	}, {
		'name': 'Call the Blade',
		'cost': '1m',
		'mins': 'Melee 1, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Extending her hand, the Solar may summon her weapon with but a thought. This Charm can reach a weapon within short range. Roll (Wits + Melee) at difficulty 4. On a success, the weapon flashes to hand instantly, without traversing the space between. On a failure, the weapon leaps to the Solar’s hand, overcoming friction and gravity to do so. However, it is unable to defeat doors, chains, or other similar obstacles, and even if the path is unobstructed, the weapon does not return until the Solar’s next turn. The Exalt cannot use this power to steal weapons, only to call her own weapon to hand.'
	}, {
		'name': 'Summoning the Loyal Steel',
		'cost': '1m',
		'mins': 'Melee 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Call the Blade',
		'desc': 'With a moment of concentration, the Solar may banish a weapon to the void of Elsewhere. She may reflexively lift commitment to this Charm, summoning her weapon to hand in a flash of Essence.'
	}, {
		'name': 'Glorious Solar Saber',
		'cost': '5m, 1wp',
		'mins': 'Melee 3, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Summoning the Loyal Steel',
		'desc': 'Honing her skill and focusing her will, the Exalt shapes her Essence into the form of a blade. This Charm creates a weapon with stats identical to a daiklave, described on page XX. The weapon is made of solidified Essence forged in all the colors of Solar anima, and glows like a torch. Even a darkly-colored weapon such as a violet blade with a swirling hilt the color of blue flame will exude a shining aura.\nFor an additional purchase, players may add a custom Evocation to Glorious Solar Saber. Players should work with their Storyteller to create an Evocation that fits the character’s personality or iconic anima manifestation. In addition, Glorious Solar Saber has the following power:\nMolten Sun Blade: For one mote, one willpower, the weapon becomes superheated and drips molten flame that burns whatever it touches. The Solar’s next attack will destroy any mortal blade or shield that attempts to parry it. While the effect is active, the Solar may use a blade or spearhead like a blowtorch, melting through stone walls or steel gates at a rate of two feet per turn. If Molten Sun Blade is used in combination with a clash attack against a battle group, and the clash succeeds, the Solar is seen to strike a burning arc around her position, cleaving through the weapons of foes on all sides. The battle group may not attack her again until it has succeeded at a rally action.'
	}, {
		'name': 'Immortal Blade Triumphant',
		'cost': '10m, 1wp',
		'mins': 'Melee 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Glorious Solar Saber',
		'desc': 'The Lawgiver channels the blinding radiance of her anima banner through her weapon, binding blade and soul in a glorious physical manifestation of terrifying power. The Solar may only use this Charm when her anima is at the bonfire level. Her anima crawls over her weapon, suffusing it, and her iconic avatar can be seen to emanate from the blade. For the rest of the scene, her anima is focused around her blade, fluxing and rising with the use of Charms that expel her aura and returning with expenditures of Essence.\nWhile Immortal Blade Triumphant is active, her weapon cannot be disarmed or destroyed, and when she makes attacks, her damage is boosted greatly. Any stunt bonuses to her attacks are also added to her damage rolls, and if she is at the bonfire anima level, (Essence) damage dice are converted into automatic successes.\nShould the Solar need even greater power than this, she may force her anima out through her blade, releasing the Essence committed and terminating this Charm in a single devastating decisive attack. Doing so adds (Essence) automatic successes to the damage roll instead of converting (Essence) dice to automatic successes, and allows the attack to bypass hardness. This attack can only be made at the bonfire anima level. Calling upon this power ends this Charm and resets the Solar’s anima banner to the dim level.'
	}, {
		'name': 'Iron Raptor Technique',
		'cost': '2m',
		'mins': 'Melee 3, Essence 1',
		'type': 'Simple',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Call the Blade, Excellent Strike',
		'desc': 'The Solar hurls her weapon across the sky to seek her foe like a bird of prey. This Charm extends the range of a Melee attack to medium range. The Solar’s weapon returns to her in the same instant that this attack is completed.'
	}, {
		'name': 'Edge of Morning Sunlight',
		'cost': '1m',
		'mins': 'Melee 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Excellent Strike',
		'desc': 'The Lawgiver concentrates on manifesting her Essence through the medium of her weapon. Investing her attack with Solar power, she strikes a vicious blow against demons, undead, and other creatures of darkness. On an attack that accrues at least one success on the damage roll, she may activate this Charm. Her weapon glints at the point of impact, slicing her foe’s corpus with purifying Essence. Roll (Essence) damage dice against her target’s health track. This damage roll ignores hardness.'
	}, {
		'name': 'Corona of Radiance',
		'cost': '5m, 1wp',
		'mins': 'Melee 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Edge of Morning Sunlight',
		'desc': 'The Lawgiver draws her weapon through the air, focusing Essence through her aggression. Her flesh coruscates with Solar energy which gathers around her hand and her weapon when she parries. For the rest of the scene, her parry Defense is raised by 1 against creatures of the night, the Abyssal Exalted, demons and the impure residents of Creation’s underways. In addition, if such creatures strike her without a weapon, they must contend with damage dice equal to the Solar’s Essence. This damage ignores hardness.'
	}, {
		'name': 'Sharp Light of Judgment Stance',
		'cost': '--',
		'mins': 'Melee 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Corona of Radiance',
		'desc': 'Through meditation and practice, the Exalt learns to tap and refine her Solar Essence, sharpening her attacks against the forces of darkness. This Charm permanently enhances Corona of Radiance, Sandstorm-Wind Attack, and Blazing Solar Bolt. Attacks made during Corona of Radiance have their minimum damage increased by the Solar’s Essence, while Sandstorm-Wind Attack and Blazing Solar Bolt gain an additional bonus to raw damage equal to the Solar’s Essence. In addition, the Lawgiver may unleash Edge of Morning Sunlight and the aforementioned Charms against characters for whom she holds negative Major and Defining Intimacies, treating them as if they were creatures of darkness, if they are not already.'
	}, {
		'name': 'Sandstorm-Wind Attack',
		'cost': '4m',
		'mins': 'Melee 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Edge of Morning Sunlight',
		'desc': 'Channeling power into her weapon, the Solar strikes a blow against a distant foe. A colorless ribbon of concentrated force leaps from her blade and arcs toward her target. Sandstorm-Wind Attack strikes an opponent within short range, but otherwise acts like a regular Dexterity + Melee attack. The raw lethal damage of this attack is equal to the extra successes on the attack + the attacker’s Essence. Sandstorm-Wind Attack does not incorporate the Solar’s Initiative into determining its raw damage, and striking a damaging blow with this attack does not return the Solar to base Initiative. This attack cannot be blocked or dodged without a Charm. In addition, if Sandstorm-Wind Attack does at least four health levels of damage, it has a chance to slice off a target’s limb, at the Storyteller’s discretion. Storytellers should only use this effect when dramatically appropriate—ending the fight the moment a character is dismembered, and propelling the mutilated character into a new story. Using Sandstorm-Wind Attack in such a manner automatically ends the scene.\nSpecial activation rules: Sandstorm-Wind Attack can only be used once per combat, but it can be reset by any three-point stunt, be it verbal or physical, so long as it is relevant to the fight at hand. This reset can even occur during a stunt describing Sandstorm-Wind Attack.'
	}, {
		'name': 'Blazing Solar Bolt',
		'cost': '3m, 1wp',
		'mins': 'Melee 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Sandstorm-Wind Attack',
		'desc': 'The Lawgiver hones the force of her judgment into a lambent charge of pure Solar power, and raises her weapon to strike. A powerful stream of energy leaps between her weapon and her Caste Mark, and is unleashed by her attack, flying through the air to lance through her opponent. This attack is made with the Solar’s Dexterity + Melee, enjoying an automatic success for every range band it crosses and doing lethal damage with a base damage of the Exalt’s current temporary Willpower. Blazing Solar Bolt can strike an opponent within medium range, ignores hardness, and cannot be dodged or blocked without a Charm. Against residents of Malfeas or the Underworld and other creatures of darkness, this Charm gains the Aggravated keyword. Damage done by this attack does not include the Solar’s Initiative and does not return her to base Initiative upon success.\nSpecial activation rules: Blazing Solar Bolt can only be used once per combat, but can be reset by landing a decisive attack with 6+ Initiative and then building Initiative to 10+.'
	}, {
		'name': 'Dipping Swallow Defense',
		'cost': '2m',
		'mins': 'Melee 1, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'With speed and grace, the Exalt flashes to her own defense. Even when she is beleaguered she strikes away blows with preternatural accuracy. The Solar can ignore all penalties to parry an attack with her full Defense. In addition, any attack she successfully parries with Dipping Swallow Defense grants her one point of Initiative. This Charm cannot by itself remove the penalties from a surprise attack.'
	}, {
		'name': 'Hail-Shattering Practice',
		'cost': '1m per success',
		'mins': 'Melee 3, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Dipping Swallow Defense',
		'desc': 'The Solar can see the flaws in any strike, and use them to turn aside even the surest smite. The Exalt may pay one mote per 1 or 2 in the attacker’s dice result to remove up to (Essence) successes from the attack. This Charm can be activated after the attack roll is made.'
	}, {
		'name': 'Bulwark Stance',
		'cost': '5m',
		'mins': 'Melee 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Until next turn',
		'prereqs': 'Dipping Swallow Defense',
		'desc': 'The Solar’s mastery of defensive Essence flows guides her weapon to intercept all blows. Until her next turn, the Lawgiver ignores all penalties to her Parry Defense. The Chosen’s definitive guard dampens her foes’ strikes. Any damage roll made against the Solar takes a -1 penalty for each 1 rolled on the attack roll, up to a maximum of the Solar’s Essence rating.'
	}, {
		'name': 'Fivefold Bulwark Stance',
		'cost': '5m, 1wp',
		'mins': 'Melee 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Bulwark Stance',
		'desc': 'Accepting no form of defeat, the Solar gazes along the edge of her blade and sees what it would see. The ebb and flow of battle becomes clear to her; she sees the arcs of incoming attacks as glowing trails of Essence, and moves with impossible, fluid speed to strike the path of all harm. For a full scene, the Exalt may apply her full Parry Defense to all attacks, ignoring all penalties, and reducing the cost to use Bulwark Stance by two motes and Dipping Swallow Defense by one. In addition, when she uses Dipping Swallow Defense, it raises her Parry Defense by one.'
	}, {
		'name': 'Heavenly Guardian Defense',
		'cost': '1i per success or 4m, 1wp',
		'mins': 'Melee 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Perilous, Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Bulwark Stance',
		'desc': 'The Solar may strike aside even the falling sky. When struck with a decisive attack, the Solar retroactively channels her Initiative to strike away harm—burning away successes on the damage roll at a rate of one success per one point of Initiative. Any successes she is unable or unwilling to strike away still register as injuries, removing an equal number of levels from her health track. An attack which is completely nullified by Heavenly Guardian Defense seems to strike the Solar at first, but then is turned aside by the blurring interposition of her blade. Heavenly Guardian Defense allows the Solar to guard against damage deemed impossible to parry, such as unexpected attacks, hurled bolts of acid or lightning, the burning curses of Kimbery and so on. This Charm may also be invoked in or out of combat for four motes, one Willpower, to strike away uncountable recurring damage without using the Solar’s Initiative. As an island is disintegrated by the sky-shattering blast of a supervolcano, the Solar turns aside the heart of the explosion with the skill of her blade. Use of Heavenly Guardian Defense causes no harm to the Exalt’s weapon.'
	}, {
		'name': 'Protection of Celestial Bliss',
		'cost': '--(4m, 1wp)',
		'mins': 'Melee 5, Essence 5',
		'type': 'Permanent',
		'keywords': 'Decisive-only',
		'duration': 'Permanent',
		'prereqs': 'Heavenly Guardian Defense',
		'desc': 'When the Solar successfully parries decisive damage using Heavenly Guardian Defense, she gathers an amount of bonus Initiative equal to the 1s and 2s on the damage roll. This Initiative is not transferred to her current Initiative value, but is instead recorded and set aside until she must use it. She may gather up to (Essence) Initiative in this manner, and may use it only to enhance Heavenly Guardian Defense. The Exalt may choose to expend any or all gathered Initiative into paying the cost of Heavenly Guardian Defense, but doing so expends the bonus Initiative. In addition, the Solar may pay four motes, one Willpower to double the bonus Initiative she has already gathered for one tick, allowing her to further enhance the prerequisite. This Charm explicitly allows the Solar to use Heavenly Guardian Defense in crash, up to a limit of her gathered (or double gathered) bonus Initiative.\nThis bonus Initiative may not be used to amplify the instance of Heavenly Guardian Defense from which it was gathered, nor can it be targeted by withering attacks; the Initiative is gone until the moment in which the Solar chooses to summon it.'
	}, {
		'name': 'Favored Lion Stance',
		'cost': '2m',
		'mins': 'Melee 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Dipping Swallow Defense',
		'desc': 'The Solar learns to defend others upon learning to defend herself. Like a pacing lion, she represents a formidable obstacle. The Exalt may take a reflexive defend other action to protect an ally within close range. This effect lasts a full scene, but only applies while the Solar and her charge are close to one another. The Solar must drop commitment to this Charm to defend a different character.'
	}, {
		'name': 'Unassailable Guardian Posture',
		'cost': '--',
		'mins': 'Melee 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Favored Lion Stance',
		'desc': 'The Solar learns to split her focus along multiple lines of defense, her aegis growing with her legend. This Charm upgrades its prerequisite, increasing its cost by one mote and allowing the Solar to defend everyone within short range. The Exalt moves like a blur, interposing herself between her enemies and allies each time an attack is made.'
	}, {
		'name': 'Solar Counterattack',
		'cost': '3m',
		'mins': 'Melee 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Counterattack, Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Dipping Swallow Defense',
		'desc': 'The Exalt draws focus from her foe’s temerity. To strike her is to invite death. The Exalt may use this Charm in response to any attack she attempts to parry, creating a counterattack that occurs after the opponent’s attack result, but before damage has been rolled. This attack functions as a regular decisive attack. Solar Counterattack does not count as the Exalt’s combat action and cannot be used in response to another counterattack.'
	}, {
		'name': 'Ready in Eight Directions Stance',
		'cost': '5m',
		'mins': 'Melee 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Counterattack, Decisive-only',
		'duration': 'Until next turn',
		'prereqs': 'Solar Counterattack',
		'desc': 'Like lightning spilled from the cup of a storm god, the Solar strikes in all directions. Until her next turn, the Solar may counter all incoming attacks exactly as if she were using Solar Counterattack, save for one major difference—should any of her counterattacks do damage, her Initiative will not return to its base value until the next round begins. If she does not successfully counter an opponent in the first round, this Charm fades when the second round begins.'
	}, {
		'name': 'Flashing Edge of Dawn',
		'cost': '4m, 1wp',
		'mins': 'Melee 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Counterattack, Withering-only',
		'duration': 'Instant',
		'prereqs': 'One Weapon, Two Blows, Solar Counterattack',
		'desc': 'The Solar moves her blade with the speed of her scorn, cutting through her foe in the moment they choose to strike. The Exalt may use this Charm in response to any attack she attempts to parry, creating a counterattack that occurs after the opponent’s attack result, but before damage has been rolled. This attack acts as a special withering attack, with successes on the damage roll reducing the target’s Initiative. However, rather than being added to the Solar’s Initiative, these points are converted immediately to decisive damage dice and rolled against the target’s health track, ignoring hardness. This damage occurs independently of the Solar’s current Initiative and does not return her to base.\nFlashing Edge of Dawn does not count as the Exalt’s combat action and cannot be used in response to another counterattack.'
	}, {
		'name': 'Fervent Blow',
		'cost': '1m, 1wp',
		'mins': 'Melee 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Clash, Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Flashing Edge of Dawn',
		'desc': 'The Lawgiver moves with the speed of a striking hawk to intercept a blow with one of her own. This Charm allows the Solar to make a reflexive clash attack against an attack directed at her, regardless of her place in the Initiative order. This does not count as the Solar’s combat action. The rules for clash attacks can be found on page XX.'
	}, {
		'name': 'Over-and-Under Method',
		'cost': '--(3m, 1wp)',
		'mins': 'Melee 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Fervent Blow',
		'desc': 'This Charm permanently upgrades its prerequisite, allowing the Solar to use a counterattack Charm in the same instant that she uses Fervent Blow. Using Over-and-Under Method increases the cost of Fervent Blow to three motes, one willpower, but the Exalt is not forced to use this upgrade and can still choose to activate Fervent Blow at its normal cost, for its regular effect.'
	}, {
		'name': 'Perfect Strike Discipline',
		'cost': '1wp',
		'mins': 'Melee 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Dipping Swallow Defense, Excellent Strike',
		'desc': 'Tuning her understanding of martial Essence through her dedicated weapon-mastery, the Solar can momentarily achieve flawless combat efficiency. Once per scene, the Exalt may use a full Melee Excellency, paying only a single willpower to activate the Charm. Perfect Strike Discipline can be reset by incapacitating an opponent with a Melee attack.'
	},

	// Resistance

	{
		'name': 'Durability of Oak Meditation',
		'cost': '3m',
		'mins': 'Resistance 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Dual',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'A child cannot cleave a tree with a dull knife, nor can a foe hope to strike down the Solar with his petty blade. Against a withering or decisive attack, this Charm reduces raw damage by two. Against a decisive attack it also increases the Exalt’s hardness by 4. Note that the hardness bonus cannot be applied during crash.'
	}, {
		'name': 'Spirit Strengthens the Skin',
		'cost': '2m per damage die removed',
		'mins': 'Resistance 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Withering-only',
		'duration': 'Instant',
		'prereqs': 'Durability of Oak Meditation',
		'desc': 'The Solar channels Essence through her enduring toughness, hardening her skin and muscles beyond their mortal limits. After an attack hits her, but before damage is rolled, she may increase her soak at a rate of two motes per die. She may no more than double her natural soak in this fashion. This effect is incompatible with any magic that allows the Exalt to soak a decisive attack with Withering-only magic.'
	}, {
		'name': 'Iron Skin Concentration',
		'cost': '2m or 5m',
		'mins': 'Resistance 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Dual',
		'duration': 'Indefinite',
		'prereqs': 'Spirit Strengthens the Skin',
		'desc': 'This Charm hardens the Exalt’s skin, making it incredibly difficult to cut or pierce. Against a withering attack, the Solar can pay two motes to apply her Stamina as soak against unsoakable damage as an instant effect. Against a decisive attack, she may pay five motes after damage has been rolled to create (Stamina) -0 health levels, which take damage first, effectively shunting the attack away from her bones and vital organs. She still feels the pain of the strike, and a blow that appears to run her through may be shrugged off while drawing a mere trickle or no blood at all. If the created health levels exceed the damage successes, subsequent damage is automatically applied to remaining created -0’s before damage begins registering with her regular health levels.\nThe Solar keeps her commitment to this Charm as long as she remains injured; after combat ends, the health levels convert from -0 to -1 wounds, requiring the Solar to seek rest or treatment in order to end the Charm. These health levels are the first healed by any kind of rest or magical healing. The Solar may choose to continue fighting while carrying shunted injuries, but each day she does so increases the wound penalty by -1.\nBefore Essence 3, Iron Skin Concentration is not stackable. At Essence 3+, the Charm may be stacked (Essence or 5 times, whichever is lower).'
	}, {
		'name': 'Diamond-Body Prana',
		'cost': '5m',
		'mins': 'Resistance 4, Essence 2',
		'type': 'Simple',
		'keywords': 'Withering-only',
		'duration': 'One scene',
		'prereqs': 'Iron Skin Concentration',
		'desc': 'The Exalt inverts her anima, turning the substance of her existence into something far beyond normal harm. For the rest of the scene, basic scenery damage, such as crashing through a window, running through a bramble, or stepping through a burning corridor (flames of less intensity than 4L per turn) does her no harm. The Solar can’t be hurt by light contact with normally damaging edges. Her skin is tough enough for the claws of a tiger to skid off harmlessly, so long as the tiger isn’t actually striking her.\nThis Charm provides the following protection against withering attacks: when activated, the Solar rolls (Stamina + Resistance) dice with (Essence) automatic successes and adds the successes to her soak for the rest of the scene. This roll cannot be enhanced by other magic. Diamond-Body Prana is incompatible with armor.'
	}, {
		'name': 'Iron Kettle Body',
		'cost': '6m',
		'mins': 'Resistance 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Withering-only',
		'duration': 'One turn',
		'prereqs': 'Iron Skin Concentration',
		'desc': 'Striking the Solar is like striking a piece of iron. For one turn, all post-soak withering damage is halved (round up). This Charm must be invoked when an attack is directed at the Solar, but before it is rolled. At Essence 3+, less accurate blows glance and rebound painfully from the Solar’s body—1s on a successful attack roll subtract from the attacker’s Initiative at a rate of -1 for each 1 rolled, to a maximum of half the Solar’s Stamina, rounded up. At Essence 4+, Initiative points lost striking the Exalt’s Iron Kettle Body are awarded to the Solar.\nTriggering Adamant Skin Technique cancels Iron Kettle Body’s effects for one tick. Iron Kettle Body’s bonuses may not be used to enhance Adamant Skin Technique.'
	}, {
		'name': 'Adamant Skin Technique',
		'cost': '7m',
		'mins': 'Resistance 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Diamond-Body Prana, Iron Kettle Body',
		'desc': 'Driven by purpose, the Solar refuses to be defeated. Channeling Essence through her Resistance, she may apply her full Stamina + Armor soak to a decisive attack, and may enhance this effect with Charms marked with the Withering-only keyword unless they say otherwise. Adamant Skin Technique can’t be invoked against an ambush attack, however, it grants total immunity to scenery-based damage, allowing the Solar to escape seemingly-impossible recurring damage, like that of an explosion or a collapse, or falling from a great height. Such impacts still daze the Solar, knocking the wind from her, and giving her a -3 penalty for (7 - Stamina, minimum of 1) turns. Invoking Adamant Skin Technique sets the Solar’s hardness to 0 for one instant.'
	}, {
		'name': 'Ruin-Abasing Shrug',
		'cost': '4m',
		'mins': 'Resistance 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Adamant Skin Technique',
		'desc': 'Flesh imbued with impenetrable Essence, the Solar turns aside harm with forceful derision. After damage is rolled, the Solar may use this Charm to force the attacking player to reroll, keeping their non-successes, rerolling only successful dice. Damage on this reroll cannot exceed that of the initial roll.'
	}, {
		'name': 'Aegis of Invincible Might',
		'cost': '--',
		'mins': 'Resistance 5, Essence 5',
		'type': 'Permanent',
		'keywords': 'Dual, Perilous',
		'duration': 'Permanent',
		'prereqs': 'Adamant Skin Technique',
		'desc': 'When her life is threatened, the Solar channels her fury to make herself nigh invulnerable. After using Adamant Skin Technique, the Solar’s hardness is raised to 20, and her withering soak is raised by her Stamina + Resistance, while also cancelling (Stamina) post soak damage. This massive increase in toughness is based on a surge of Essence through the Solar’s body. In order to maintain it, the Solar must either unleash a decisive attack each round on her turn, or pay 8+ motes on offensive Charms. This effect ends if the Solar is crashed or fails to take continuous combat actions.'
	}, {
		'name': 'Whirlwind Armor-Donning Prana',
		'cost': '2m',
		'mins': 'Resistance 1, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Through the practiced motions of a master, the Lawgiver dons her armor with supernatural speed. Normally it takes a character one minute + (one minute per armor’s mobility) to don a suit of armor. Whirlwind Armor-Donning Prana shortens this time to one turn + (one turn per armor’s mobility).'
	}, {
		'name': 'Hauberk-Summoning Gesture',
		'cost': '3m',
		'mins': 'Resistance 3, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Whirlwind Armor-Donning Prana',
		'desc': 'The Solar can call her armor from conceptual Elsewhere—defined categorically as a point somewhere in existence that is “not here”—allowing her to don each piece of armor as if she were putting it on normally. If the Solar owns a shield, she may call it to hand as well. The Lawgiver can also send her armor Elsewhere through use of this Charm.'
	}, {
		'name': 'Armored Scout’s Invigoration',
		'cost': '3m',
		'mins': 'Resistance 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Whirlwind Armor-Donning Prana',
		'desc': 'The Solar slides into her armor like it was second skin, Essence smoothing the way. The Exalt invokes this Charm when she equips her armor. So long as she wears her armor, its mobility is treated as if it were 0, removing the penalty to her movement and Stealth actions and Evasion. If her armor’s mobility is already 0, she can reroll a single non-successful die on her Join Battle roll.'
	}, {
		'name': 'Glorious Solar Plate',
		'cost': '10m, 1wp',
		'mins': 'Resistance 4, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Hauberk-Summoning Gesture',
		'desc': 'The Solar bends her anima into a suit of lamellar in the form of hardened sunfire, and bearing all the glorious colors of Solar anima. This armor has stats identical to Orichalcum Heavy Plate (+12 soak, 10 hardness, -2 mobility), and if the Exalt has mastered the Armored Scout’s Invigoration, Glorious Solar Plate activates its effects for free.\nGlorious Solar Plate may graft itself over a suit of armor, appearing as a series of interlinked cosmic runes that describe the ascent of the Unconquered Sun to the zenith of heaven at the birth of the universe. This upgrades the armor’s stats if they are lesser than that of Glorious Solar Plate, and adds the armor-enhancing powers of this Charm to the Lawgiver’s current set. If the Solar’s current armor is attuned, grafting Glorious Solar Plate onto it replaces the commitment cost, releasing the attuned motes.\nFor an additional purchase, the player may grant Glorious Solar Plate a custom Evocation. The player should work with the Storyteller to create an Evocation that exudes the nature of the Exalt’s iconic anima manifestation.\nIn addition, Glorious Solar Plate has the following power:\nUnbreakable Sustaining Grip: The armor automatically treats crippling damage to joints and limbs, setting and stabilizing broken bones with binding Essence and channeling the Solar’s pain out through her anima. As a result, the Solar’s limbs cannot be hacked off, and her bones and joints can’t be rendered dysfunctional while she is wearing Glorious Solar Plate.\nSpecial activation rules: Glorious Solar Plate is expressly allowed to be used in a combo with Whirlwind Armor-Donning Prana, so that a suit of armor can be quickly donned and simultaneously enhanced by this Charm’s effects. Used on its own, Glorious Solar Plate appears already-equipped, perfectly fitted to the Solar’s form.'
	}, {
		'name': 'Poison-Resisting Meditation',
		'cost': '3m',
		'mins': 'Resistance 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'The Exalt’s metabolism is strengthened by Essence, allowing her to easily endure the effects of toxins. The Solar gains one automatic success and three bonus dice when rolling Stamina + Resistance against a toxin’s duration (see p. XX).\nThe Solar can also use this Charm at the toxin’s interval, to reduce or change the anticipated symptoms of a poison or venom. For example, damaged health levels might be converted instead to a dice penalty until the venom runs its course, or poison-induced blindness might be bled out in viscous tears or a gout of sickly black Essence.'
	}, {
		'name': 'Illness-Resisting Meditation',
		'cost': '4m',
		'mins': 'Resistance 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One day',
		'prereqs': 'Poison-Resisting Meditation',
		'desc': 'The Lawgiver’s immune system is fortified by inexorable spirit energies that purge her body of malaise. This Charm adds (Essence +1) automatic successes to the Exalt’s attempt to resist a disease’s virulence, as well as its morbidity. If the Exalt wishes to get sick, she can choose to apply this Charm’s effects solely to the morbidity roll.'
	}, {
		'name': 'Immunity to Everything Technique',
		'cost': '6m, 1wp',
		'mins': 'Resistance 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One day',
		'prereqs': 'Illness-Resisting Meditation',
		'desc': 'Through exposure and resistance, the Solar trains her anima to eat toxins and neutralize sicknesses. When activated, this Charm makes the Solar invulnerable to any toxin or illness she has ever been exposed to previously. She cannot be injured by familiar venom and cannot contract prior illnesses. She can sprinkle poison on her food as a condiment or walk hand-in-hand with a plague victim and be unaffected—so long as she has had exposure to these maladies.\nThis Charm also assists the Solar in fighting toxins and disease she is unfamiliar with. When exposed to new toxins, the expected duration is reduced by one. When exposed to a new disease, the morbidity rating is lowered by one. In addition, if the Solar’s Stamina is at least 3, she encounters incurable and irresistible diseases as if they had a morbidity of 5.'
	}, {
		'name': 'Essence-Gathering Temper',
		'cost': '1i',
		'mins': 'Resistance 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Perilous, Withering-only',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Exalt is resistant to all forms of damage, and empowered by them. When an attack makes it through her defense, she may pay one Initiative to draw Essence from deep within the core of her body. The Exalt gains a number of motes equal to half the damage (round up) of the attack before soak, but may gain no more than (Stamina) motes in a single round. Once the Solar has used this Charm, she may not use it until it has been reset by soaking a withering attack of 10+ raw damage without suffering Initiative loss.\nAt Resistance 5+, Essence 3+, the total number of motes the Solar may gain per round increases to (Stamina * 2).'
	}, {
		'name': 'Willpower-Enhancing Spirit',
		'cost': '2i',
		'mins': 'Resistance 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Perilous, Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Essence-Gathering Temper',
		'desc': 'The Exalt remembers past lives and past failures, and knows that her death is the death of the world. Once per scene, the Exalt may pay two Initiative when struck with a decisive attack, instantly regaining a point of temporary Willpower. This Charm is reset by surviving a decisive attack of 10+ raw damage without taking a single health level of damage.'
	}, {
		'name': 'Battle Fury Focus',
		'cost': '5m',
		'mins': 'Resistance 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Willpower-Enhancing Spirit',
		'desc': 'The Solar taps a replenishing well of inner rage, infusing her anger with primal magic, making her capable of superhuman feats. For the duration of the scene, the Exalt has +1 die to all pools related to combat and subtracts -1 from all wound penalties. However, the Exalt must be engaged in combat or attempting to become so engaged, and is compelled by all her desires toward battle. Intimacies that compel her to fight, including negative Intimacies that drive her to attack, and positive Intimacies that reflect her love for combat, are more powerful, increased by one in their Intensities, with Defining Intimacies representing a +5 or -4 rating instead of the usual +4 or -3. However, the Solar is unable to use social influence for commands unrelated to combat or persuasion more complicated than “Give up or die.”\nBattle Fury Focus does not make the Solar inelegant or stupid. The Exalt can make tactical disengage actions in order to kill someone or change targets, even gaining the +1 bonus to do so, but she must end the Charm in order to take a withdraw action.'
	}, {
		'name': 'Bloodthirsty Sword-Dancer Spirit',
		'cost': '10m, 1wp',
		'mins': 'Resistance 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Battle Fury Focus',
		'desc': 'While channeling Battle Fury Focus, the Solar drops to a deeper level of consciousness, sinking into a meditation on violence and destruction. In this fugue state, her world narrows to a tight red tunnel with things that must die at the far end. On top of the +1 bonus from Battle Fury Focus, the Solar gains an additional +2 dice to all of her combat actions, ignores all wound penalties, and generates one mote per turn, which must be spent each turn on combat-related actions, or physical actions in pursuit of combat, violence or destruction.\nIn this state the Solar cannot be safely dissuaded from combat. Should friends or allies choose to stand in her way, she won’t slaughter them unheedingly, but will use any force necessary to remove them from her path, so that she can continue to assault her original target. She will not, and cannot end her assault until her targets are dead or fled, and if she is convinced by an impassioned plea to drop her commitment to this Charm, she will go into immediate Initiative crash. If she crashes herself in this fashion, her Initiative is set to -3. Ending this Charm while already crashed does not change the Solar’s Initiative value.\nWhen tremendously outnumbered, Bloodthirsty Sword-Dancer Spirit affords the Exalt renewed power: each time she empties a battle group’s Magnitude track, she may roll Join Battle.'
	}, {
		'name': 'Unbreakable Warrior’s Mastery',
		'cost': '3m',
		'mins': 'Resistance 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Battle Fury Focus',
		'desc': 'Through the course of lifetimes, the Solar has felt a rain of blows that would shatter the existence of any mortal. Through this Charm, she knows all harm at once, and yet the greater truth is that she still exists, unbowed and unbroken. When struck with a crippling attack, the Solar may use this Charm to trade irreparable or permanent harm for a lesser effect of a shorter duration. Instead of her eye being gouged out, it is closed by a glancing blow; instead of her arm being shattered, it simply hangs limp. Halve the penalty (round down) associated with a successful crippling attack, applied as a Crippling keyword effect that remains for (7 - Stamina) turns.'
	}, {
		'name': 'Ox-Body Technique',
		'cost': '--',
		'mins': 'Resistance 1, Essence 1',
		'type': 'Permanent',
		'keywords': 'Stackable',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'The bodies of the Exalted are much more durable than those of mere mortals. To help simulate this, an Exalt may buy extra health levels with this Charm. The purchasing choices are based on the character’s Stamina rating:\nAt Stamina 1 and 2: One -1 and one -2 health level.\n3 and 4: One -1 and two -2 health levels.\n5+: One -0, one -1, and one -2 health level.\nThe Solar may purchase Ox-Body Technique (Resistance) times. If she increases her Stamina after purchasing Ox-Body Technique, her health levels automatically change to reflect the new rating.'
	}, {
		'name': 'Body-Mending Meditation',
		'cost': '10m',
		'mins': 'Resistance 2, Essence 1',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Ox-Body Technique',
		'desc': 'Even when unconscious, the Solar’s body and Essence work in unison to knit wounds and mend broken bones. Roll the Solar’s Stamina + Resistance to speed her natural healing by (Essence * successes). Alternately, successes on this roll can be added directly to the successes of Wound-Mending Care Technique on page XX. The Solar must spend an hour at rest for this power to take effect, but the boosted healing lasts for one day, so long as the Solar remains at rest.'
	}, {
		'name': 'Front-Line Warrior’s Stamina',
		'cost': '4m',
		'mins': 'Resistance 3, Essence 1',
		'type': 'Simple',
		'keywords': 'Perilous',
		'duration': 'Instant',
		'prereqs': 'Ox-Body Technique',
		'desc': 'Once per day, the Exalt can draw from the deep well of her vitality to restore her momentum. Roll half the Solar’s total health levels, rounded up, and add successes to her Initiative score. Do not include health levels created by Iron Skin Concentration or Living Bonds Unburdened. This Charm is reset when the Solar awakens from sufficient sleep.'
	}, {
		'name': 'Tiger Warrior’s Endurance',
		'cost': '--',
		'mins': 'Resistance 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Body-Mending Meditation, Front-Line Warrior’s Stamina',
		'desc': 'The Exalt’s resilient anima encompasses her every cell and fiber, rejuvenating her at the brink of death. When the Exalt recovers from Initiative crash, she automatically heals two health levels, starting with -2s and continuing to her -1 and then her -0 health levels. This Charm does not heal wounds greater than -2, but will heal them even when the Solar is at -4. This power may be invoked once per fight, and the player may dictate when this effect triggers, choosing to save it for a later crash. Once it has been used, Tiger Warrior’s Endurance can be reset by gaining 20+ Initiative.'
	}, {
		'name': 'Wound-Knitting Exercise',
		'cost': '1m per -0 health level',
		'mins': 'Resistance 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Until fully healed',
		'prereqs': 'Tiger Warrior’s Endurance',
		'desc': 'The Lawgiver shuns lesser forms of harm, fighting through injuries as though they never happened. This Charm slowly compensates for greater wounds by healing -0 health levels. The Exalt must pay the full cost of the Charm upon activation, paying one mote for every damaged -0 health level she wishes to heal. This Charm heals one -0 health level every (7 – Stamina) rounds.\nThis Charm works even if the Solar has taken damage to her -1 or greater health levels.'
	},

	// Stealth

	{
		'name': 'Perfect Shadow Stillness',
		'cost': '1m, 1wp',
		'mins': 'Stealth 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Lawgiver’s stealth technique is honed until it is flawless. Perfect Shadow Stillness allows a reroll of any Stealth-based action, preserving the 10s from those results and rerolling the remaining dice. At Stealth 5+, succeeding at a stealth attempt with this Charm awards the Solar one point of temporary Willpower.'
	}, {
		'name': 'Invisible Statue Spirit',
		'cost': '5m',
		'mins': 'Stealth 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Indefinite',
		'prereqs': 'Perfect Shadow Stillness',
		'desc': 'Assuming perfect stillness, the Solar fades from sight. A Solar with this Charm can affect true invisibility. However, the Exalt cannot move, nor can she take violent action without breaking this deception. Characters using Invisible Statue Spirit are not immaterial and can still be detected by touch, scent, taste, or hearing.'
	}, {
		'name': 'Blurred Form Style',
		'cost': '7m, 1wp',
		'mins': 'Stealth 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Indefinite',
		'prereqs': 'Invisible Statue Spirit',
		'desc': 'The Solar sinks into the colorless field of her Essence, joining with the form of nothingness. This Charm allows the Exalt to make a Stealth attempt even if there is no cover available—so long as the Solar is standing still or moving slowly, she blends perfectly into her surroundings. While this Charm is in effect, her Stealth attempts garner (Essence) automatic successes.\nExtreme movement renders her temporarily visible—any time she attacks or changes range bands, she can be seen and targeted by opponents until her next turn, provided she stops all extreme movements. If she is struck by a withering or decisive attack, the Charm ends.'
	}, {
		'name': 'Sun Swallowing Practice',
		'cost': '2m per anima level',
		'mins': 'Stealth 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Mute, Stackable',
		'duration': 'Indefinite',
		'prereqs': 'Blurred Form Style',
		'desc': 'Taking a single short breath, the Solar drinks in her anima to restore the shadows. This Charm costs two motes per every anima level the Exalt wishes to consume. Releasing this Charm causes the Solar’s anima to leap into view.\nAt Essence 5+, if the Solar has swallowed four or more levels of anima, she can release her commitment to this Charm by spitting her hidden anima into the air, creating a massive heatless flare that can be seen up to ten miles away. This method of release sheds her anima completely, and inflicts a (number of anima levels expelled + 3) penalty to the Awareness rolls of all characters within long range of the Solar until the next round. A Solar using Eye of the Unconquered Sun is immune to this effect.'
	}, {
		'name': 'Easily-Overlooked Presence Method',
		'cost': '3m',
		'mins': 'Stealth 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'The Lawgiver evades detection by hiding in plain sight. A Solar with this Charm is able to drift unnoticed through crowds or alone. This Charm models her talent for blending in and remaining unobtrusive. When active, characters cannot notice her unless she takes overt action. Such actions include leaping from the street to the rooftops, or dropping out of her coat in the middle of a snowstorm. Join Battle always counts as an overt action.\nThis skill does not work against alert guards, or those who intend to stop everyone (as with a checkpoint), and can be overcome by magic only if the user has a minor or greater intimacy to the Solar, or a major or defining intimacy to a cause the Exalt’s presence directly threatens.\nCertain Charms may aid in detecting the Exalt. Roll the Lawgiver’s Wits or Dexterity + Stealth against her opponent’s relevant Attribute + Ability or Resolve, if the attacking Charm is based on the opponent’s Integrity.'
	}, {
		'name': 'Mental Invisibility Technique',
		'cost': '5m, 1wp',
		'mins': 'Stealth 4, Essence 2',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'One scene',
		'prereqs': 'Easily-Overlooked Presence Method',
		'desc': 'The surreptitious Exalt may even hide in the spaces between thoughts. Roll the Exalt’s Dexterity + Stealth against her subject’s Resolve. On a success, she vanishes from her subject’s notice, and cannot be perceived. This effect applies to every witness whose Resolve is surpassed by the Solar’s skill.\nNot even overt action can reveal the Exalt to those affected by Mental Invisibility Technique. The Lawgiver may step out of her coat in a snowstorm or leap to the rooftops from the street without being noticed. However, rolling Join Battle or taking violent action ends this Charm’s effects.\nAdditionally, subjects may spend 1 Willpower to break free of the Solar’s deception if the Exalt’s presence is pointed out to them, the Solar intentionally reveals herself to them, or the Exalt attempts to harm or steal one of their major or defining intimacies.'
	}, {
		'name': 'Vanishing From Mind’s Eye Method',
		'cost': '10m, 1wp',
		'mins': 'Stealth 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Indefinite',
		'prereqs': 'Mental Invisibility Technique',
		'desc': 'One of the greatest of all deceptions—the Solar vanishes from memory. Roll the Exalt’s Dexterity + Stealth and add her Essence in automatic successes to the result. Record the result. The Exalt slips out of the thoughts and memories of everyone who has ever known her, hiding in their minds. Upon meeting, she is unrecognizable to those who should know her.\nOnce per day, individuals affected by this Charm may attempt to recognize the Exalt or remember her involvement in a past event. Roll the subject’s Wits + Lore against a difficulty equal to the Exalt’s result. If the roll does not succeed, they do not recognize the Solar, and the Exalt remains a nameless, shadowy distortion in their memories.\nOn Vanishing From Mind’s Eye Method\nSolar kings beware! Woe to the Solar who lost her crown by vanishing from the minds of her subjects. This Charm is not selective. Until the Solar voluntarily terminates the Charm, everyone forgets her.'
	}, {
		'name': 'Sound and Scent Banishing Attitude',
		'cost': '6m',
		'mins': 'Stealth 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Mute, Stackable',
		'duration': 'One hour',
		'prereqs': 'Blurred Form Style, Vanishing From Mind’s Eye Method',
		'desc': 'The Exalt conquers her foe’s senses, leaving only their eyes to settle the contest. The Solar enacts a technique allowing her to defeat one sense, making it impossible for that sense to be used to detect her. She can defeat the senses of hearing, smell, touch, and taste. However, she cannot use this Charm to overcome a target’s sight.\nIf she uses her sound-banishing technique, she is completely silent; not even the heightened sensory acuity of a guard dog’s ears can detect her. Likewise, if she banishes touch, then someone who bumps into her in a pitch black room will be completely unaware. If she banishes taste, then the probing taste organs of an octopus or the flicking of a great serpent’s tongue will not find her.\nThis Charm may be stacked twice, allowing the Solar to banish up to two senses. Finally, if the player stunts the Charm description in such a way that it explains the nature of sensory muting as an extension of her skills, the cost of the Charm is reduced by 2 motes.'
	}, {
		'name': 'Ten Whispers Silence Meditation',
		'cost': '3m',
		'mins': 'Stealth 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Sound and Scent Banishing Attitude',
		'desc': 'The Lawgiver whispers the ten koans of utter stillness, each quieter than the next. When she is finished, her concentration is improved, allowing her to swallow even the tiniest sounds. For the duration of this Charm, any Awareness attempt to detect her by hearing alone loses one success for every 1 and 2 the opponent rolls.'
	}, {
		'name': 'Fivefold Shadow Burial',
		'cost': '--',
		'mins': 'Stealth 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Sound and Scent Banishing Attitude',
		'desc': 'The legend of the Icon Unbeheld, the Solar is a master of stealth deception, capable of defeating each of the five senses. This Charm represents the Solar’s mastery of Stealth by subtracting 2 successes for every 1 rolled in any Perception- or Awareness-based attempt to spot her. This penalty does not stack with the penalized 1s affected by Ten Whispers Silence Meditation.'
	}, {
		'name': 'Blinding Battle Feint',
		'cost': '3m',
		'mins': 'Stealth 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar leaps in and out of battle with nigh untraceable speed. The Exalt may use her Dexterity + Stealth to Join Battle. Her Join Battle result also acts as an attempt to enter Stealth. If she beats her opponent’s Awareness-based Join Battle roll, she is automatically concealed, so long as there is a viable place to hide. If her foe uses a Join Battle roll modified to use any other Ability than Awareness, then they must make an Awareness roll to spot her, suffering a penalty equal to the difference in their Initiative, even if they rolled higher. If they fail the Awareness check, the Solar still vanishes from view.'
	}, {
		'name': 'Stalking Wolf Attitude',
		'cost': '5m',
		'mins': 'Stealth 4, Essence 1',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Indefinite',
		'prereqs': 'Blinding Battle Feint',
		'desc': 'The Solar stalks her prey unseen, waiting for the perfect moment to strike. While concealed, the Solar uses this technique to focus on an opponent. Feeling along the pulse of the world’s Essence, she stalks her target from the shadows, her veins coursing with lethal readiness. With this Charm, the Solar ignores the -3 penalty to Stealth rolls for moving while concealed. In addition, on each round in which she succeeds at the contested roll to evade detection by her mark, she gains an amount of Initiative equal to her extra successes on the roll. When the Exalt senses the perfect moment to strike, she may then leap from concealment to unleash a decisive attack, as long as at least a single round has passed before she does so.\nFor each round that she remains under the effects of this Charm, the Solar gains a mounting -1 penalty to her Stealth rolls, and if she is discovered or if she voluntarily leaves concealment or terminates the Charm without making a decisive attack, she loses all of the Initiative she gained through her most recent activation of the Charm.'
	}, {
		'name': 'Hidden Snake Recoil',
		'cost': '1wp or 2i',
		'mins': 'Stealth 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Stalking Wolf Attitude',
		'desc': 'Like a flashing viper, the Exalt strikes and is gone. Upon incapacitating a target, the Solar may reflexively attempt concealment by rolling Dexterity + Stealth, adding (Essence) automatic successes to the attempt. This Charm prepays 4 motes to any Stealth Charm that aids the Solar in this effect.'
	}, {
		'name': 'Shadow Victor’s Repose',
		'cost': '3m, 1wp',
		'mins': 'Stealth 4, Essence 2',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Blinding Battle Feint',
		'desc': 'Standing unseen in the midst of her enemies, the Exalt revels in her control of battle’s flow. Once per scene, while concealed during combat, the Exalt may roll Join Battle and add her result to her current Initiative, so long as she has landed at least one decisive attack. Any Charms the Exalt uses to enhance her roll are automatically muted.'
	}, {
		'name': 'Flash-Eyed Killer’s Insight',
		'cost': '2m',
		'mins': 'Stealth 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Shadow Victor’s Repose',
		'desc': 'Triumphant, the Lawgiver’s eyes flash upon the Shroud and hidden places, showing her the way to victory. Upon incapacitating an opponent, the Lawgiver may trigger this Charm. If she has already used Shadow Victor’s Repose in the scene, she may reuse it.'
	}, {
		'name': 'Mind Shroud Meditation',
		'cost': '--',
		'mins': 'Stealth 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Flash-Eyed Killer’s Insight',
		'desc': 'Meditating on future combat, the Exalt speaks a design into her soul that erases her from combat’s flow. This Charm permanently upgrades Shadow Victor’s Repose. When the Exalt uses it to reroll Join Battle, she also momentarily vanishes (Essence) rounds from the short term memories of all opponents, allowing her next unexpected attack to act as an Ambush.'
	}, {
		'name': 'Guardian Fog Approach',
		'cost': '3m',
		'mins': 'Stealth 3, Essence 1',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Blinding Battle Feint',
		'desc': 'Through quick action, the Solar may obscure someone with her own efforts to remain hidden. The Solar must be touching the one she wishes to hide, and must herself attempt a Stealth action at the same time. The Solar works to obscure her charge, covering them with her body, shrouding them with her cloak, or guiding them into a cleverly concealed niche. Add half the Solar’s successes and any stunt bonuses on this action as dice to her charge’s own Stealth roll.'
	}, {
		'name': 'Dark Sentinel’s Way'
		'cost': '1m',
		'mins': 'Stealth 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Guardian Fog Approach',
		'desc': 'While using a Defend Other action on a subject, a hidden Solar may use this Charm to conceal her defense of that subject. Upon parrying an incoming attack, the Solar flickers briefly into view, then vanishes, returning her to concealment as if she had never left it. The Solar must be within close range of her subject or otherwise using Charms which allow her to apply the Defend Other benefits from beyond close range.'
	}, {
		'name': 'Shadow Replacement Technique',
		'cost': '8m, 1wp',
		'mins': 'Stealth 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Perilous, Mute',
		'duration': 'Indefinite',
		'prereqs': 'Dark Sentinel’s Way',
		'desc': 'Gripping her foe like a vice, the Lawgiver’s penetrating gaze opens a rift into her target’s soul, allowing her to hide there. This technique requires that the Lawgiver be in control of a grapple, after which she must then successfully execute a Dexterity + Stealth roll which surpasses her target’s Resolve, with a number of automatic successes equal to the Exalt’s Essence and a number of bonus dice equal to half the remaining rounds of clinch control, rounded down. If successful, the Solar appears to step into her target’s shadow and bleed away. The Solar takes possession of her target’s senses and motor functions, and can make her victim act against a negative Intimacy or act against something to which they have a minor positive Intimacy without contest. “Not being controlled” and “not being forced to take action” are not valid Intimacies for the purpose of this Charm. If the Solar attempts to make her host act against a major or defining Intimacy, use the social influence system as normal, though any influence the subject is able to resist automatically terminates this Charm.\nUnlike other forms of control, Shadow Replacement Technique is a rare instance in which victims can be forced to harm or even kill themselves, however, the Solar is subject to equal damage to any suffered by her subject while in possession. While this Charm is active, Vanishing from Mind’s Eye Method can be targeted to the host alone, and costs only five motes to activate.\nShadow Replacement Technique still works on targets that do not have a shadow. Replacing someone’s shadow counts as being concealed within full cover for the purposes of Shadow-Crossing Leap Technique.'
	}, {
		'name': 'Smoke and Shadow Cover',
		'cost': '3m',
		'mins': 'Stealth 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Dark Sentinel’s Way',
		'desc': 'The Exalt is at one with the shadows, drawing safety from even the most intangible concealment. While this Charm is active, the Solar treats concealment as cover. Mild concealment (such as hiding in partially obscuring shadows, behind light foliage, or in obscuring fog) is treated as light cover, while heavy concealment (such as deep, full-body covering shadows, undergrowth that obscures all but the character’s eyes, or thick, opaque smoke) is treated as heavy cover. Completely pitch-black, lightless environments count as full cover. Using concealment as cover requires a take cover combat action (see p. XX) replacing Dodge with Stealth unless the character is already concealed. In that case, her hiding place counts as cover until she moves out of it or something happens to obviate it, such as flames banishing the shadows she’s crouched in. Furthermore, this Charm also penalizes non-ranged attacks by one success in addition to any dice penalties the attack might accrue from fighting in low visibility conditions.'
	}, {
		'name': 'Shadow-Crossing Leap Technique',
		'cost': '5m, 1wp',
		'mins': 'Stealth 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Smoke and Shadow Cover',
		'desc': 'Unfurling her unseen anima, the Solar leaps to join the darkness she has conquered. While concealed, Exalt may move up to one range band, from one place of cover to an equal place of cover, without penalty. There must be a path for the Solar to make this leap: she cannot leap through solid walls or doors. This transition is instantaneous, the Solar blinking out in one location and flashing into another without passing through the space between. This Charm is incompatible with Blurred Form Style.\nAt Essence 4+, the Solar can flash into hiding places that do not have a clear path to move by passing through structures that are transparent or partially opaque, such as windows or gates.\nAt Essence 5+, the Solar may use this Charm even when she is not concealed, as long as she is moving through places where visual penalties might apply. If she is not concealed and not actively trying to stay concealed, this Charm no longer costs a point of Willpower to use. Crossing a range band with Shadow-Crossing Leap Technique always counts as the Exalt’s movement action for the round.\nAt Essence 6+, when concealed, the Exalt may move one range band per turn using this Charm, and an additional range band using her normal movement. This use always costs a point of Willpower.'
	}, {
		'name': 'Flashing Nocturne Prana',
		'cost': '10m, 1wp',
		'mins': 'Stealth 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'Perilous, Mute',
		'duration': 'Indefinite',
		'prereqs': 'Shadow-Crossing Leap Technique',
		'desc': 'A legendary stealth technique used by the deadliest Solars to evade discovery. When in a place of concealment, the Exalt may use this Charm to anchor the thread of her Essence to the spot. Should she relinquish her commitment to the Charm, so long as she is within three range bands of her hiding place, she is carried there instantly on wings of anima. She does not travel the space between. This counts as an automatically successful Stealth attempt. If anyone is able to detect the Solar, they may not attempt to do so for two rounds.'
	}, {
		'name': 'False Image Feint',
		'cost': '7m, 1wp',
		'mins': 'Stealth 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'Perilous, Mute',
		'duration': 'Instant',
		'prereqs': 'Hidden Snake Recoil, Vanishing From Mind’s Eye Method',
		'desc': 'A hair’s breadth from the blade’s edge, the Exalt fades from harm. Only her anima is struck. When hit with a decisive attack, the Solar may use this Charm if the attacker rolls a combined total of six 1s and 2s across her attack and damage rolls. Roll the Solar’s Dexterity + Stealth against her attacker’s Perception + Awareness. If she succeeds, she slips out of sight and into concealment, evading the attack as if she had dodged it. If she succeeds with at least one 10 in her result, she enters stealth while her opponent strikes an afterimage left by the Solar’s anima, transferring the damage result harmlessly away from the Solar and returning her opponent to base Initiative. The Solar may leave an object concealed within her anima to receive the strike, reducing the Charm cost by 1 mote—2 if the player makes a clever substitution.\nAt Essence 5+, forcing an attacker down to base Initiative with this Charm nets the Solar a temporary point of Willpower.'
	},

	// Thrown

	{
		'name': 'Precision of the Striking Raptor',
		'cost': '1m',
		'mins': 'Thrown 1, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Withering-only',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar imbues her chosen weapon with Essence, to feel its every angle and weight as part of her body. Its strike becomes an extension of her will. The Solar’s accuracy is calculated as if it was made from close range, regardless of the distance from which she is throwing. If Precision of the Striking Raptor is used at close range, the target’s defense is lowered by one. This Charm does not allow the Exalt to strike a target beyond the range of her weaponry.'
	}, {
		'name': 'Steel Storm Descending',
		'cost': '2m',
		'mins': 'Thrown 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Precision of the Striking Raptor',
		'desc': 'The character harnesses the spirit of her throwing weapons, allowing her to strike a perfect blow at the moment of release. To use this Charm, the Solar must win Join Battle and make a decisive attack. Winning Join Battle means beating the roll results of all enemies present in the scene. Steel Storm Descending supplements this attack, granting a number of bonus dice equal to the difference between her Initiative and the Initiative of her target.\nAt Thrown 5+, Essence 3+, this attack does not reset the Solar to base Initiative.'
	}, {
		'name': 'Flashing Draw Mastery',
		'cost': '3m',
		'mins': 'Thrown 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Steel Storm Descending',
		'desc': 'The breathtaking speed with which a Lawgiver calls a weapon to hand is often the last miracle her opponent sees. This Charm adds a single automatic success to the Solar’s Join Battle roll, and treats her roll as if she scored (Essence + 1) additional successes for the purpose of determining attack order in the first round of combat. These successes are not “real”—they neither increase her Initiative, nor do they count as dice added by a Charm. Flashing Draw Mastery is expressly permitted to be used in combination with Charms that boost Join Battle results, so long as they are not based in Archery, Melee, or Brawl.'
	}, {
		'name': 'Swarm-Culling Instinct',
		'cost': '2m',
		'mins': 'Thrown 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Flashing Draw Mastery',
		'desc': 'The Lawgiver answers the call of battle with a swarm of deadly steel. This Charm supplements a Join Battle roll, allowing the Solar to reroll a number of non-successes equal to the number of 10s in her result. 10s occurring in rerolled dice spark additional rerolls. In addition, if the Solar wins Join Battle, she may attack (Dexterity) opponents, rolling each attack separately so that she may alternate effectively between withering and decisive attacks. Swarm-Culling Instinct is expressly permitted to be used in combination with Charms that boost Join Battle results, so long as they are not based in Archery, Melee, or Brawl.'
	}, {
		'name': 'Shrike Saving Discretion',
		'cost': '--',
		'mins': 'Thrown 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Swarm-Culling Instinct',
		'desc': 'This Charm represents the blinding speed of the Solar’s genius hands, honed by a lifetime of practice. Shrike Saving Discretion permanently enhances its prerequisite—when the Solar launches a successful decisive attack with Swarm-Culling Instinct, upon returning to base Initiative, she gains bonus Initiative equal to the 9s and 10s on the previous attack’s damage roll.'
	}, {
		'name': 'Joint-Wounding Attack',
		'cost': '3m',
		'mins': 'Thrown 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Crippling, Decisive-only, Stackable',
		'duration': 'Instant',
		'prereqs': 'Precision of the Striking Raptor',
		'desc': 'The Solar marks her target and strikes with deadly purpose. If her attack does at least three damage, it adds a -3 penalty to all of her opponent’s dice pools for the rest of the scene. This can be portrayed as a stunning blow to the head, a scratched eye, injured hand, or other similar injuries. Any particular wounding does not automatically heal at the end of the scene; the target may need special care to restore lost sight or use of a hand suffering nerve damage.'
	}, {
		'name': 'Mist on Water Attack',
		'cost': '2m per turn',
		'mins': 'Thrown 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Decisive-only, Mute',
		'duration': 'Instant',
		'prereqs': 'Joint-Wounding Attack',
		'desc': 'The Solar pours the cold instinct of her training into a blade, suffusing it with stifling Essence. This Charm supplements a decisive attack, silencing the struck target up to (Essence) turns. Victims of this attack cannot produce sound. They can neither cry out nor raise alarm, nor will their fist through a window produce the sound of shattered glass, nor will their body plummeting from the rooftops to the street make even the tiniest sound of splatter.\nCharacters thus affected may not be detected by any hearing-based Awareness, and those who are killed will die in an unnoticeable fashion, determined by the Storyteller: they may die standing up, reclining naturally, or their body may simply fall soundlessly out of sight. In any case, the target’s death cannot be discovered until the effects of Mist on Water Attack have passed.'
	}, {
		'name': 'Observer-Deceiving Attack',
		'cost': '3m',
		'mins': 'Thrown 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Mute, Uniform',
		'duration': 'Instant',
		'prereqs': 'Joint-Wounding Attack',
		'desc': 'The art of misdirection comes naturally to a master of throwing weapons. Through the use of this Charm, the Solar can conceal a thrown attack, causing her opponents to believe an attack was made from a completely different angle or direction. Characters who want to spot the true course of the attack must succeed at a Wits + Awareness roll against the Solar’s Essence plus a number equal to the number of 10s in the attack roll. Any 1s rolled by her opponent subtract from their successes.\nAt Thrown 5+, Essence 3+, successful misdirects allow the Exalt to attack without breaking stealth.'
	}, {
		'name': 'Sharp Hand Feint',
		'cost': '1m, 1wp',
		'mins': 'Thrown 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Observer-Deceiving Attack',
		'desc': 'Through a feinting gesture, the Exalt lashes out with her anima, disrupting her opponent with a pulse of spirit force. This Charm supplements a Distract gambit so that the attack succeeds without a roll. The Solar must still succeed at the Initiative roll for her gambit to be effective, however. Sharp Hand Feint is short range, but the Exalt may spend levels of anima display to increase its range at a rate of one range band per display level.'
	}, {
		'name': 'Shadow Thrust Spark',
		'cost': '4m',
		'mins': 'Thrown 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Sharp Hand Feint',
		'desc': 'When executing Sharp Hand Feint, the Exalt expels her anima with a burst of Essence, causing it to strike her opponent’s weapon as it passes. The Solar can invoke this Charm when a Distract gambit supplemented by the prerequisite succeeds, automatically disarming the opponent and throwing their weapon to short range, to a location dictated by the Solar’s player.'
	}, {
		'name': 'Momentum-Gathering Practice',
		'cost': '3m',
		'mins': 'Thrown 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Joint-Wounding Attack',
		'desc': 'The Lawgiver lives in a haze of ghostly memories, of lives lost and battles won. Calling these fatal moments to hand, she makes her strike momentous. This Charm enhances an aim action from cover or stealth, adding (Essence * 2) Initiative to the Solar’s next decisive attack for the purposes of determining raw damage. If her attack misses, or she does not attack following the aim action, this bonus Initiative is lost.'
	}, {
		'name': 'Falling Icicle Strike',
		'cost': '6m',
		'mins': 'Thrown 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Momentum-Gathering Practice',
		'desc': 'Picking the perfect moment to strike, the Solar winds a killing flow of Essence around her blade and hurls it from the depths of her heart. To use this Charm, the Exalt must succeed at an ambush (see p. XX) and launch a decisive attack against her target. Falling Icicle Strike doubles successes on the damage roll.'
	}, {
		'name': 'Cutting Circle of Destruction',
		'cost': '5m, 1wp',
		'mins': 'Thrown 5, Essence 4',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Falling Icicle Strike',
		'desc': 'The Exalt hurls her weapon along a course designed to do the utmost harm. Her weapon screams through the air, careening from target to target, gathering momentum and Essence until it strikes a final, furious blow. For this attack, the player must designate a final target to be the recipient of a decisive attack, and up to (Dexterity) other targets her weapon will strike before reaching its final destination. For each of these other targets, Cutting Circle of Destruction creates a withering attack, and as long as each withering attack generates more damage than the last, her weapon continues on to the next target, until it launches itself against the final target with the gathered Initiative for a final decisive attack.\nIf at any point her next withering attack fails to gain more Initiative than the last, Cutting Circle of Destruction aborts immediately to the last target in the string and the player rolls out a decisive attack against the designated final target.\nSpecial activation rules: Each withering attack in this string can be enhanced by supplemental Charms as if those Charms were reflexive, allowing the player to control how many motes they wish to spend on any attack in this string.'
	}, {
		'name': 'Angle-Tracing Edge',
		'cost': '3m',
		'mins': 'Thrown 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Observer-Deceiving Attack',
		'desc': 'The Solar perceives the angle of her enemy’s attacks as broken arcs of faintly glowing Essence, and uses them to guide her own. Through the use of this Charm, the Exalt completely removes all cover benefits from a target, banking her weapon off of walls and other solid surfaces to make near-impossible attacks. If Angle-Tracing Edge is used against a target in full cover, unless deemed completely impossible by the Storyteller, her attack finds its mark, but is made as if she had attacked from long distance.'
	}, {
		'name': 'Crimson Razor Wind',
		'cost': '5m, 1wp',
		'mins': 'Thrown 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Decisive-only, Mute',
		'duration': 'Instant',
		'prereqs': 'Observer-Deceiving Attack',
		'desc': 'As killing momentum winds itself around the tip of her blade, the Solar sees a perfect opening and strikes, hurling her blade with a streak of scarlet anima. When the Solar successfully misdirects an opponent with Observer-Deceiving Attack, she can use this Charm to make an immediate decisive attack against that opponent, striking as if from ambush (see p. XX). She may only attack a single opponent with Crimson Razor Wind, even if she deceives more than one target with her throw. Using Crimson Razor Wind does not break stealth.'
	}, {
		'name': 'Triple Distance Attack Technique',
		'cost': '1m',
		'mins': 'Thrown 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar imbues her weapon with Essence, lightening the weapon at the moment of launch and perfecting its course. This Charm extends the range of a thrown weapon to long range.'
	}, {
		'name': 'Cascade of Cutting Terror',
		'cost': '5m, 1wp',
		'mins': 'Thrown 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Triple Distance Attack Technique',
		'desc': 'Once per combat, the Solar can unleash this attack against a single target, giving her the full dice benefits of having used a full Thrown Excellency. This attack cannot be dodged, only blocked. If successful, the attack is joined by dozens or hundreds of copied weapons, striking points all around the target, doing twice the damage successes to all significant objects and insignificant opponents within short range of the initial strike.\nThe Solar can reset Cascade of Cutting Terror by hurling away her last missile and then recovering at least a single throwing weapon with a stunt.'
	}, {
		'name': 'Shower of Deadly Blades',
		'cost': '6m, 1wp',
		'mins': 'Thrown 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Withering-only',
		'duration': 'Instant',
		'prereqs': 'Cascade of Cutting Terror',
		'desc': 'The Lawgiver hurls a barrage of throwing weapons, centered around a single target, but striking every enemy within short range of her target. This is rolled as a single withering attack against all targets, but damage is only rolled against the initial target. Damage to all other targets is determined by this roll: foes struck by the attack automatically lose an amount of Initiative equal to the initial target, but not exceeding the Solar’s Essence. This extra Initiative is not rewarded to the Solar upon success; she only gains Initiative from her initial target. This attack is generally used to scatter groups of enemies, and tends to leave dozens of throwing weapons embedded into the scenery.\nUsing Shower of Deadly Blades forces an ammunition check (see p. XX) which cannot be enhanced by a Charm, and if she fails the Solar may not use this Charm again until she has taken at least three turns scavenging weaponry, as described on page XX.'
	}, {
		'name': 'Fiery Solar Chakram',
		'cost': '5m, 1wp',
		'mins': 'Thrown 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Cascade of Cutting Terror',
		'desc': 'Gathering her anima into a screaming, burning loop of surging enmity and power, the Solar hurls it at her foe in a blazing decisive attack. The attack gains a number of automatic successes equal to her current anima level, and cannot be used at the dim level. Extra successes on this attack are added to the Solar’s Initiative to determine raw damage. In addition, if is used against demons, ghosts, or other creatures of the night, it does a number of automatic successes on the damage roll equal to the Solar’s Essence.\nFiery Solar Chakram can only be used once per fight unless reset. After discharging it, the Solar’s hands glow and burn painfully, gloved in intensely-colored anima as it flees her body. Using this Charm sets her anima back to the dim level, and in order to use it again, the player must make three separate stunts in which her anima grows while she begins to produce the strength to unleash another chakram.'
	},

	/*
	TIGER STYLE

	Tiger Weapons: Tiger style uses unarmed attacks—generally raking claws strikes—or razor claws to slash the flesh of enemies. Any unarmed attack that is enhanced by a Tiger Style Charm or Technique can always be stunted to deal lethal damage.

	Armor: Tiger style is incompatible with any armor.
	*/

	{
		'name': 'Crimson Leaping Cat Technique',
		'cost': '4m',
		'mins': 'Martial Arts 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Moving with the speed and agility of a leaping tiger, the martial artist closes the distance to his prey. Crimson Leaping Cat Technique applies the double 9s rule to a Rush action. In addition, if the action succeeds, the enemy that the martial artist chases after loses a point of Initiative.\nAlternatively, this Charm can be used to enhance an attack when the martial artist moves into close range of an enemy and attacks them on the same turn. This use of the Crimson Leaping Cat Technique adds one automatic success to the attack roll and one die to the post-soak damage of the attack.'
	}, {
		'name': 'Striking Fury Claws',
		'cost': '2m',
		'mins': 'Martial Arts 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Dual',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Rigorous training, intense discipline, and the suffusing Essence of the tiger gives the martial artist’s claw strikes the force to rend flesh and disembowel fallen enemies, making him a bare-handed killer. On a withering attack, the martial artist adds his Martial Arts rating to the raw damage of the attack. On a decisive attack, he adds two dice to the raw damage of the attack.\nWhen the martial artist attacks an enemy who took a Disengage or Withdraw action on her last turn, he may activate this Charm twice against them, stacking the benefits of each activation as he exploits their faltering strategic position.'
	}, {
		'name': 'Tiger Form',
		'cost': '6m',
		'mins': 'Martial Arts 3, Essence 1',
		'type': 'Simple',
		'keywords': 'Form',
		'duration': 'One scene',
		'prereqs': 'Crimson Leaping Cat Technique, Striking Fury Claws',
		'desc': 'Dropped into the crouched, predatory pose of a tiger preparing to pounce, the martial artist’s Essence comes to embody the pinnacle of predatory grace. His fingers seem like claws as they move through their strikes, and his eyes narrow to cat-like slits. While Tiger Form is active, the martial artist adds his Essence to the raw damage of all withering attacks he makes, and takes no penalties for fighting while prone.\nHe also adds bonus dice equal to his Essence on all Rush actions, and on all rolls to contest a Disengage action. He gains any Initiative spent by an enemy to take these actions, as well as any Initiative drained by Crimson Leaping Cat Technique.\nSpecial activation rules: Whenever the martial artist lands a decisive attack that deals 2+ levels of damage, he may reflexively activate Tiger Form.'
	}, {
		'name': 'Celestial Tiger Hide',
		'cost': '3m',
		'mins': 'Martial Arts 3, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Celestial',
		'duration': 'One scene',
		'prereqs': 'Tiger Form',
		'desc': 'Essence strengthens the martial artist’s skin, suffusing it with the toughness of a tiger’s hide. Celestial Tiger Hide adds the martial artist’s Strength rating to his soak, and grants him Hardness equal to his Strength.\nAgainst attacks made from long or extreme range, both of these values rise to the martial artist’s (Essence + Strength). Hardness granted by this Charm does not stack with Hardness from other sources.\nWhen the martial artist is struck with a decisive attack, he may pay a point of Willpower to deny it to his utmost, shattering the Essence of this Charm against the blow. This final defense, called the Undying Predator’s Roar, immediately ends this Charm, but grants the martial artist Hardness equal to his (Essence + Strength + Martial Arts). After using the Undying Predator’s Roar, Celestial Tiger Hide cannot be activated again until the martial artist has landed a decisive attack and built back up to Initiative 6+.\nCelestial: Dragon-Blooded cannot use the Undying Predator’s Roar.'
	}, {
		'name': 'Raging Tiger Pounce',
		'cost': '5m (or 0m)',
		'mins': 'Martial Arts 3, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Tiger Form',
		'desc': 'A downward claw strike shatters the pillar of an enemy’s balance, sending them sprawling to the ground—exactly where the martial artist wants them. An enemy damaged by the Raging Tiger Pounce is knocked prone. As long as she remains embattled with the martial artist, she must pay two points of Initiative to take a Rise From Prone action. The martial artist gains these points of Initiative if he has Tiger Form active.\nWhen the martial artist ambushes an enemy with an attack, he may use Raging Tiger Pounce to supplement it at no cost.'
	}, {
		'name': 'Spine-Shattering Bite',
		'cost': '3m, 1wp',
		'mins': 'Martial Arts 3, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Crippling, Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Raging Tiger Pounce',
		'desc': 'Severing tendons and snapping bones, the Tiger stylist’s brutal strikes leave his enemies helpless. The Spine-Shattering Bite is a difficulty 4 Gambit (p. XX) to paralyze an enemy slashing through tendons, smashing joints, or attacking the base of the spine to rend connective tissue and shatter vertebrae. Successfully executing this Gambit leaves the struck enemy unable to take any movement actions for the rest of the combat.\nVictims of the Spine-Shattering Bite may attempt to force through the maiming injuries inflicted by this Charm by taking with a (Stamina + Resistance) roll as a miscellaneous action, opposed by the martial artist’s (Strength + Martial Arts). On a success, the victim shakes off the Crippling effect, and can resume moving normally. Taking this action costs the victim two points of Initiative regardless of success or failure, and counts as taking a Disengage action for the purposes of any Tiger Style Charms or Techniques.'
	}, {
		'name': 'Stalking Cat Movement Meditation',
		'cost': '5m',
		'mins': 'Martial Arts 3, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Tiger Form',
		'desc': 'The martial artist’s terrifying presence radiates across the battlefield, leaving his foes wary and unsure. Do they dare turn their backs on him, when at any moment he could suddenly be right behind them? While Stalking Cat Movement Meditation is active, the martial artist’s intimidating presence extends to medium range, treating all enemies within that range as embattled with him, so that they must take Disengage actions to move away. He also applies the Double 10s rule to the damage roll of any surprise attack or ambush he makes.'
	}, {
		'name': 'Leap From Cloaking Shadows',
		'cost': '6m, 1wp',
		'mins': 'Martial Arts 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Stalking Cat Movement Meditation',
		'desc': 'The Tiger stylist strikes with such speed that his hands seem little more than blurs of violence, no more substantial than a fleeting pattern of orange and black between the shadowed boughs of the jungle. What enemy can hope to defend against that? The martial artist may use Leap From Cloaking Shadows after making an attack roll, forcing his enemy to make a reflexive (Perception + Awareness) roll opposing it before applying her Defense. If she fails the roll, the martial artist adds one success to his total for each success by which she failed, to a maximum number of bonus successes equal to his Strength. If the attack is a surprise attack, the martial artist also adds that many dice to the raw damage of the attack. Should she succeed, the martial artist gains no further bonus.\nWhen the martial artist attacks an enemy who took a Disengage or Withdraw action on her last turn, she does not receive an opposed roll—the martial artist adds his full Strength rating in automatic successes to the roll.'
	}, {
		'name': 'Angry Predator Frenzy',
		'cost': '— (+4m, 1wp)',
		'mins': 'Martial Arts 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Celestial Tiger Hide, Spine-Shattering Bite, Leap From Cloaking Shadows',
		'desc': 'The apex of Tiger Style is nothing less than predation in its purest form. As the martial artist enters the Tiger Form, he may pay an additional four motes and a point of Willpower to unleash the Angry Predator Frenzy, roaring with bestial fury as he casts aside the restraints of humanity. His muscles surge with newfound strength, while his eyes narrow to red slits of berserker rage. If his anima banner is at the bonfire level, his totem takes on a bestial form along with him, lashing out and rending through the animas of his enemies as a symbolic expression of his fury. While in the Angry Predatory Frenzy, the martial artist adds his Essence to the damage of decisive attacks as well as withering attacks, and is treated as having a defining Principle of "savage rage." In addition, he can take Rush actions reflexively, although they still count as his movement action for the turn, but is incapable of taking Disengage or Withdraw actions.'
	},

	/*
	[BEGIN BOXED TEXT]
	Tiger Techniques

	Iron Claw Grip
		Mins: Martial Arts 2; Type: Simple
		Keywords: None
		Duration: Instant
	The martial artist seizes hold of his enemy’s joints with a forceful claw strike, digging fingertips or blades into vulnerable connective tissue. Iron Claw Grip can be used to make a clinch attack against an enemy on the turn that the martial artist moves into close range with her, or to clinch a prone enemy. The Technique adds the martial artist’s Strength rating in bonus dice to the attack roll. In addition, each threshold success on the attack roll adds one die to the martial artist’s (Strength + Martial Arts) roll to gain control of the grapple.
	Special activation rules: Iron Claw Grip can only be used once per combat, but can be reset by landing a decisive attack and then building back up to Initiative 6+.

	Pouncing Strike
		Mins: Martial Arts 2; Type: Simple
		Keywords: Withering-only
		Duration: Instant
	Leaping into the air, the martial artist comes down on his foe with a claw strike, knocking her to the ground. On the turn that the martial artist moves into close range with an enemy, he may make a Pouncing Strike. As long as the attack deals 5+ points of Initiative damage, that enemy is knocked prone.
	Special activation rules: Pouncing Strike cannot be used if the martial artist took a Disengage action on his last turn.

	Splintering Frenzy Strike
		Mins: Martial Arts 2; Type: Supplemental
		Keywords: Decisive-only
		Duration: Instant
	Iron-hard fingers or razor-sharp blades shred through the hafts of polearms or wooden shields, reducing them to mere splinters. Whenever the martial artist makes a Disarm Gambit against a mundane object that is made of wood or any equally fragile material, he may have his attack destroy that object if it succeeds, rather than merely disarming his enemy.
	In addition, when making a clash attack, Splintering Frenzy Strike reduces the Initiative cost of a successful Disarm by three points (usually to 2 Initiative).

	Skull-Splitting Bite
		Mins: Martial Arts 2; Type: Simple
		Keywords: Decisive-only
		Duration: Instant
	Once his blows have left an enemy sprawled out before him, the Tiger stylist moves in for the kill, smashing down with a brutal claw strike. On the turn after knocking an enemy prone, the martial artist may use Skull-Splitting Bite to add his Strength rating to the raw damage of an attack against that enemy. In addition, each threshold success rolled on the attack adds one die to its damage.

	Prey-Maiming Frenzy
		Mins: Martial Arts 3; Type: Simple
		Keywords: Decisive-only
		Duration: Instant
	Once the martial artist has seized hold of an enemy, he lays in with a flurry of brutal strikes, flaying skin and smashing bone until little but a bloody pulp remains. Prey-Maiming Frenzy can be used to make a decisive attack against a clinched enemy. The attack has a raw damage equal to the number of turns of control the martial artist still has over the clinch (counting the current turn), and ignores Hardness. It does not include the martial artist’s Initiative in its damage, nor does it reset him to base Initiative.
	Special activation rules: Prey-Maiming Frenzy can only be used once per combat, but can be reset by any three-point stunt that emphasizes the brutality, endurance, or skulking stealth of Tiger Style.

	Raking Claw Kick
		Mins: Martial Arts 3; Type: Simple
		Keywords: Withering-only
		Duration: Instant
	Digging in to his enemy’s joints with a claw strike, the martial artist pulls himself forward to deliver a vicious kick to her vitals. When the martial artist attacks an enemy who took a Disengage or Withdraw action on their last turn, he may use the Raking Claw Kick against them. On a successful attack, the martial artist may roll its post-soak damage a second time, as he delivers the kick. The total damage that can be inflicted by this second roll is capped at the martial artist’s Strength, regardless of all other effects.
	Special activation rules: Raking Claw Kick can only be used once per combat, but can be reset by landing a decisive attack and then building back up to Initiative 6+.
	[END BOXED TEXT]
	*/

	/*
	SNAKE STYLE

	Snake Weapons: Snake style’s unarmed attacks are usually two-fingered fang attacks that stab at pressure points and exposed tendons. It can also be used armed with a seven-section staff or hooked sword, which are wielded with extraordinary speed and finesse. Any unarmed attack that is enhanced by a Snake Style Charm or Technique can always be stunted to deal lethal damage.

	Armor: Snake style is incompatible with any armor.
	*/

	{
		'name': 'Serpentine Evasion',
		'cost': '2m',
		'mins': 'Martial Arts 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Ducking and weaving around predators, the snake confounds their attempts at violence. Serpentine Evasion adds +1 to the martial artist’s Evasion against a single attack. If the attack is made after the martial artist already taken her turn that round, this bonus rises to +2—enemies who cannot even keep pace with her in battle have no hope of striking her.'
	}, {
		'name': 'Striking Cobra Technique',
		'cost': '4m',
		'mins': 'Martial Arts 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Dual',
		'duration': 'One round',
		'prereqs': 'None',
		'desc': 'The snake claims its victory not by striking hardest, but by striking first. Striking Cobra Technique may be used at the start of a round, adding the martial artist’s Essence to their Initiative total for purposes of determining when they act during the round. In addition, for the rest of the round, the martial artist’s withering attacks add her Essence rating to their post-soak damage against enemies who have not already acted during that round, while her decisive attacks add one die to their damage against enemies who have not acted.'
	}, {
		'name': 'Snake Form',
		'cost': '8m',
		'mins': 'Martial Arts 3, Essence 1',
		'type': 'Simple',
		'keywords': 'Form',
		'duration': 'One scene',
		'prereqs': 'Serpentine Evasion, Striking Cobra Technique',
		'desc': 'The martial artist steps back into the posture of a wary snake—head back, ready to attack or retreat. Her motions become sinuous and hypnotic, as mesmerizing as they are deadly. Enemies are entranced by this posture, taking a -2 penalty on all attack rolls against her—which increases to a -4 penalty if their Initiative rating is lower than the martial artist’s. In addition, this flexible pose makes it easier to roll with attacks and thus minimize their impact, adding the stylist’s Martial Arts rating to her soak.\nSpecial activation rules: Whenever the martial artist makes a withering attack which lowers an enemy’s current Initiative value from greater than her own to less than her own, she may reflexively activate Snake Form.'
	}, {
		'name': 'Crippling Pressure-Point Strike',
		'cost': '—',
		'mins': 'Martial Arts 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'Decisive-only',
		'duration': 'Permanent',
		'prereqs': 'Snake Form',
		'desc': 'Striking quick, rapid jabs to nerve clusters and pressure points, the martial artist leave her foes numbed and deadened, as if they had actually been bit by a venomous snake. Learning the Crippling Pressure-Point Strike allows the Snake stylist to use the following Gambits against enemies who are unarmored, using fang strikes to cripple vital pressure points and disrupt the flow of Essence through their bodies:\n• Blinding Fang Strike (Difficulty 2): A finger-fang strike to each of the enemy’s eyes leaves them blinded for the rest of the scene. He suffers a -3 penalty on all actions.\n• Nerve-Deadening Venom Atemi (Difficulty 4): A lightning-swift flurry of fang strikes along an arm leaves it paralyzed until the end of the scene. The victim immediately drops anything he was holding in that hand, cannot use it to perform any actions, and suffers a -2 penalty on any actions that would normally require the use of both hands. It is possible to paralyze both (or sometimes, all) of an enemy’s arms with repeated use of this Gambit, leaving them unable to wield weapons at all without clever stunting on their part.\n• Withering Venom Paralysis (Difficulty 6): A single devastating fang strike to an enemy’s sacral chakra leaves his lower body paralyzed, causing him to immediately fall prone. Even on a successful rise from prone action (which must always be rolled), he is only capable of propping himself up on arms and elbows to crawl across the earth. He may take other movement actions at a -3 penalty, but still suffers the Defense penalties of being prone.'
	}, {
		'name': 'Armor-Penetrating Fang Strike',
		'cost': '1wp',
		'mins': 'Martial Arts 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Dual',
		'duration': 'Instant',
		'prereqs': 'Crippling Pressure-Point Strike',
		'desc': 'Essence hardens the Snake stylist’s fingers into fangs capable of piercing through steel, ignoring all soak from armor. When used with a withering attack, the martial artist ignores all soak from armor. When used with a decisive attack, this Charm allows any of the Gambits unlocked by Crippling Pressure-Point Strike to be used against an armored enemy.'
	}, {
		'name': 'Essence Fangs and Scales Technique',
		'cost': '— (+1m, 1wp)',
		'mins': 'Martial Arts 3, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Snake Form',
		'desc': 'The martial artist’s anima coalesces into thick layers of scales, and needle-sharp fangs that extend from her fingertips or weapon. When Snake Form is activated, the martial artist may pay an additional mote and a point of Willpower to enhance it with this serpentine display. Doing so adds the martial artist’s Essence to her soak in addition to the base soak bonus of the form, and adds +2 to the raw damage of all withering attacks she makes.'
	}, {
		'name': 'Uncoiling Serpent Prana',
		'cost': '1m or 3m',
		'mins': 'Martial Arts 4, Essence 2',
		'type': 'Simple',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Essence Fangs and Scales Technique',
		'desc': 'Striking a menacing blow in the direction of a distant enemy, the martial artist send a serpentine ribbon of anima flashing towards them, bearing her wrath on its fangs. Uncoiling Serpent Prana extends the reach of an attack to short range for one mote, or to medium range for three motes.'
	}, {
		'name': 'Snake Strikes the Heel',
		'cost': '2m',
		'mins': 'Martial Arts 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Counterattack, Dual',
		'duration': 'Instant',
		'prereqs': 'Snake Form',
		'desc': 'Those who tread on serpents may not live to repeat their error. Whenever the martial artist is hit by an attack, she may use Snake Strikes the Heel to respond with a counterattack. If the martial artist makes a withering attack, the maximum damage it can deal is capped at her Dexterity rating, regardless of all other effects. If she makes a decisive attack, she can only use it to execute a Gambit (p. XX), rather than damaging her enemy.'
	}, {
		'name': 'Countless Coils Evasion',
		'cost': '4m',
		'mins': 'Martial Arts 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Celestial',
		'duration': 'Instant',
		'prereqs': 'Snake Strikes the Heel',
		'desc': 'Moving with the reflexes and raw speed of a startled snake, the martial artist leaves no flaw in her defenses. Whenever the martial artist is hit by a decisive attack, she may use Countless Coils Evasion to subtract her current Initiative total from the raw damage of the attack. After using this Charm, the martial artist is reset to base Initiative.\nSpecial activation rules: Countless Coils Evasion can only be used once per combat, but it can be reset by building back up to Initiative 6+.\nCelestial: When used by a Dragon-Blooded, this Charm instead allows the martial artist to roll her Initiative, subtracting one die from raw damage of the attack for each success rolled.'
	}, {
		'name': 'Essence Venom Strike',
		'cost': '10m',
		'mins': 'Martial Arts 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Armor-Penetrating Fang Strike, Countless Coils Evasion, Uncoiling Serpent Prana',
		'desc': 'Distilling her killing intent into venomous Essence, the Snake master delivers a blow as quick as lightning and as deadly as as the strike of a dozen serpents. Essence Venom Strike poisons an enemy, envenoming them as long as a single level of damage is dealt. The poison created by this Charm has a damage interval of 1L/round, a duration equal to the martial artist’s Initiative total (to a maximum of 15 rounds), and a -2 penalty.'
	},

	/*
	Snake Techniques

	Flashing Viper Strike
	Mins: Martial Arts 2; Type: Simple
		Keywords: Decisive-only
		Duration: Instant

	The martial artist moves in to finish an enemy with the speed of a striking viper, her strikes blurring into serpentine bands of raw speed. On the turn after she sends an enemy into Initiative Crash, the martial artist may follow up with the Flashing Viper Strike, adding bonus dice equal to her Dexterity rating to the attack roll and applying the Double 10s rule to the damage roll.

	Rising Cobra Kick
	Mins: Martial Arts 2; Type: Reflexive
		Keywords: Withering-only
		Duration: Instant

	Whenever the martial artist makes a Clash Attack, she can drop under her foe’s strike to deliver the Rising Cobra Kick, planting both hands firmly against the ground and lashing up to kick her opponent skyward. This Technique adds two automatic successes to the opposed attack roll. If the attack succeeds and deals 5+ points of Initiative damage, the martial artist may have the arc of her opponent’s skyward flight carry him one range band away from her in any direction, leaving them prone at the end of the fall. After using this Technique, regardless of whether the attack succeeded or failed, the martial artist’s Initiative falls by three points.

	Snake-in-the-Grass Rush
	Mins: Martial Arts 2; Type: Reflexive
		Keywords: None
		Duration: One round

	Rolling onto his back and moving with all fours, the martial artist moves like a snake underfoot, striking the exposed leg tendons of his enemies. On any turn that the martial artist makes an attack, he can use Snake-in-the-Grass Rush to ignore all penalties for fighting prone for the rest of the round. In addition, if he successfully lands an attack on the enemy who knocked him prone, he gains two Initiative.

	Withering Serpent Strikes
	Mins: Martial Arts 2; Type: Simple
		Keywords: Withering-only
		Duration: Instant

	Making a barrage of swift strikes against an enemy that has not already acted this round, the martial artist adds three automatic successes the attack roll. When the martial artist Initiative Shifts and takes a refreshed turn, she can use this Technique against any enemy, even one who has already acted this round.

	Special activation rules: Withering Serpent Strikes can only be used once per combat, but can be reset by landing a decisive attack and then building back up to Initiative 6+.

	Lunging Fang Blow
	Mins: Martial Arts 3; Type: Simple
		Keywords: Decisive-only
		Duration: Instant

	This deadly finishing move can only be used after the martial artist successfully defends against a decisive attack. On her next turn, she may use the Lunging Fang Blow to strike down hard on the exposed throat of the enemy who attacked her, adding the difference between her Initiative score and the enemy’s to the raw damage of the attack, to a maximum bonus of five dice.

	When Lunging Fang and Essence Venom Strike are used together, the bonus dice added by this Technique are also counted towards the martial artist’s Initiative total when determining the duration of the poison created by the Essence Venom Strike. In addition, extra rounds of duration added by this Technique do not count towards the maximum duration of the poison.

	Shedding Scales Defense
	Mins: Martial Arts 3; Type: Reflexive
		Keywords: None
		Duration: Instant

	Moving with a burst of speed so great that she seems to trail after-images behind her, the martial artist applies a penalty to an attack roll against her equal to the difference between her Initiative score and the attacker’s, to a maximum penalty of -5.

	Special activation rules: Shedding Scales Defense can only be used once per combat, but can be reset by Initiative Crashing an enemy.
	*/


	/*
	This packet contains Charms for the social influence Abilities: Integrity, Performance, Presence, Investigation, Larceny, Bureaucracy, Linguistics and Socialize. Use Control + F to forward to each section.

	SOCIAL KEYWORDS	 
	Mute: This Charm’s cost will not add to the Exalt’s anima level unless they want it to.
	Psyche: A power with this keyword is an unnatural, hypnotic, or sorcerous power that magically influences, controls, or cripples an opponent’s thoughts or feelings.
	Written-only: A Charm with this keyword can only be used to enhance, supplement, or create written social influence.
	*/
	  
	// Bureaucracy

	{
		'name': 'Frugal Merchant Method',
		'cost': '1m',
		'mins': 'Bureaucracy 1, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'With a cursory examination, the Lawgiver can determine the exact quality of any good offered for sale. She can tell if it is poor, average, or excellent in condition. However, this grants her no knowledge of the market value of any particular good, nor does it tell her the purpose of an object. By inspecting a scavenged mechanism of the First Age, she could tell if it was functional, but not how it functions.'
	}, {
		'name': 'Insightful Buyer Technique',
		'cost': '3m',
		'mins': 'Bureaucracy 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Frugal Merchant Method',
		'desc': 'Through use of this Charm, the Solar gains an intuitive feel for a marketplace at a given instant, allowing her to intuit roughly how much a given object will fetch in any one market. Though the Exalt need not be physically present in the market, this Charm must be used with a particular sales venue in mind. The Solar cannot discover previously unknown markets through use of this Charm. She can, however, review distant markets to determine which would be the best to sell a good. The more specific the venue contemplated, the more accurate the forecast. A Solar using this technique can make a perfectly accurate assessment at the moment of sale, but the longer she waits between using this Charm and the actual sale of the goods, the larger her margin for error, as economies shift with time.'
	}, {
		'name': 'Consumer-Evaluating Glance',
		'cost': '3m',
		'mins': 'Bureaucracy 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Frugal Merchant Method',
		'desc': 'The Lawgiver can evaluate a buyer’s intention and budget with a glance. This enacts a (Perception or Wits) + Bureaucracy read intentions action against the target’s Guile. If successful, the Exalt can tell if the target plans to betray or cheat her. In this case, the Solar’s Resolve is raised by her Essence against all bargain action attempts by that character. She may also use this Charm to determine a character’s Resources rating and whether they intend to buy or whether they need to be swayed into attempting a bargain action.'
	}, {
		'name': 'All-Seeing Master Procurer',
		'cost': '5m',
		'mins': 'Bureaucracy 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Consumer-Evaluating Glance',
		'desc': 'Through use of this Charm the Solar broadcasts her ability to evaluate and fence any good, and to estimate the viability of any good or service in any market. This Charm makes characters naturally assume the Solar is a master merchant, someone who should be approached in order to receive the best deal or gain information about any certain product. This Charm does not confer knowledge of any good the Solar is unfamiliar with, but it does allow her to reflexively employ Insightful Buyer Technique for one mote, in order to speculate on the value of goods in local or foreign markets, even those that may not be physically present.'
	}, {
		'name': 'Illimitable Master Fence',
		'cost': '1m',
		'mins': 'Bureaucracy 5, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'All-Seeing Master Procurer',
		'desc': 'By spending a day in a market, the Lawgiver can sense the ebb and flow of commerce, guiding her to knowledge of hidden or illegal markets. By observing normal transactions, speaking with merchants and customers, and watching the general course of economic dalliance, she becomes aware of the bureaucratic specialties of everyone connected to a specific market. The Lawgiver even becomes aware of the special market knowledge of characters whose names she doesn’t know and whose faces she has never seen.'
	}, {
		'name': 'Ungoverned Market Awareness',
		'cost': '--',
		'mins': 'Bureaucracy 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Illimitable Master Fence',
		'desc': 'The Solar is so attuned to the flow of trade that she can sense any time a character within range of her senses uses the Bureaucracy or Larceny Ability to make a transaction. This does not overwhelm her in market settings. She may simply ignore the proceedings, but she may also choose to sweep for particular transactions. This may aid her in locating characters with market specialties indicated by the prerequisite.'
	}, {
		'name': 'Irresistible Salesman Spirit',
		'cost': '6m, 1wp',
		'mins': 'Bureaucracy 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Consumer-Evaluating Glance, Insightful Buyer Technique',
		'desc': 'This Charm depicts a Solar who is an irresistible high pressure salesman. This Charm supplements a bargain action with double 7s. If the Exalt’s bargain is successful, she gains a point of temporary Willpower.'
	}, {
		'name': 'Empowered Barter Stance',
		'cost': '--',
		'mins': 'Bureaucracy 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Irresistible Salesman Spirit',
		'desc': 'Once a day, the Solar gains a point of temporary Willpower for succeeding at a bargain action.'
	}, {
		'name': 'Soul-Snaring Pitch',
		'cost': '5m, 1wp',
		'mins': 'Bureaucracy 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Mute, Psyche',
		'duration': 'Instant',
		'prereqs': 'Irresistible Salesman Spirit',
		'desc': 'The Solar can even sell sand to a Delzahn. This Charm is a persuade action to convince a character that a particular “thing” is their heart’s desire. The Solar can sell literally anything at outrageous prices. If the character’s permanent Willpower is equal to or lower than the Exalt’s Essence, no roll is required. The Exalt can cause the target to sell himself into slavery for a handful of potsherds or a kiss. If the target’s Willpower is greater than the Lawgiver’s Essence, the Solar rolls a Manipulation + Bureaucracy persuade action with (Essence) automatic successes against the target’s Resolve. If successful, the target is not only convinced that they must attain whatever the Solar is selling, but its value is multiplied by the number of extra successes on the roll. In order to resist this effect, a character must spend (the Solar’s Essence) in Willpower. Resisting Soul-Snaring Pitch makes a character immune to the Charm for one week.'
	}, {
		'name': 'Deft Official’s Way',
		'cost': '5m',
		'mins': 'Bureaucracy 1, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'The Lawgiver becomes preternaturally adept at navigating through bureaucracies. She can naturally sense who to talk to in order to produce results, who expects or is amenable to bribes, which functionaries are actually useful or friendly and which are officious tyrants abusing their meager sliver of power. The Solar may add her Bureaucracy score to the read intentions actions of any Ability so long as it helps her in producing a desired bureaucratic result, such as obtaining a license, gaining a passport or securing an audience.'
	}, {
		'name': 'Enlightened Discourse Method',
		'cost': '4m',
		'mins': 'Bureaucracy 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Deft Official’s Way, Frugal Merchant Method',
		'desc': 'The Exalt’s understanding of business language and commerce makes her seem worldly and wise. Add half her Bureaucracy score (rounded up) in dice to all social influence to affect bargains, trade, create business partnerships, create good will between organizations, communicate effective orders, mediate, and so on.'
	}, {
		'name': 'Semantic Argument Technique',
		'cost': '1m',
		'mins': 'Bureaucracy 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Enlightened Discourse Method',
		'desc': 'The Lawgiver’s understanding of rules and the semantics of language makes her an effective and persuasive speaker. Add half the Solar’s Bureaucracy in dice (rounded up) to any social influence that engages a character’s adherence to laws or rules they are known to observe. This can refer to organizations they identify with, but it can also be used to exploit defining principles they hold, if the Solar is aware of them.'
	}, {
		'name': 'Eclectic Verbiage of Law',
		'cost': '--',
		'mins': 'Bureaucracy 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Semantic Argument Technique',
		'desc': 'The Solar’s understanding of bureaucratic procedure is immense and complex. She may draw on this well of knowledge to enact a free full Bureaucracy Excellency once per season. This Charm can be reset by the Solar aiding in the success of a particularly difficult project (see p. XX) as determined by the Storyteller.'
	}, {
		'name': 'Subject-Hailing Ideology',
		'cost': '5m',
		'mins': 'Bureaucracy 5, Essence 4',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Eclectic Verbiage of Law',
		'desc': 'The Lawgiver gains power through knowledge of the roles and identities of others. This Charm supplements any social influence that appeals to an Intimacy the Solar is aware of, at a former intensity, so long as the social influence is intended to make the subject act in some official capacity. For example, the Lawgiver could attempt to persuade her bodyguard-turned-assassin to put down his weapon, invoking an Intimacy of loyalty he once held but holds no longer. She could convince an ex-spouse to act in some capacity as if they were still married. She could even make a once-loyal member of her organization remember his role and even make him wish to return to his former position. However, she could not use this Charm to convince two enemies who have become lovers to remember their hate for one another. The Charm only functions if there is some relevant official capacity being invoked. Thus the subject is hailed into a former role.'
	}, {
		'name': 'Measuring Glance',
		'cost': '5m',
		'mins': 'Bureaucracy 2, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Deft Official’s Way',
		'desc': 'The Solar can sum up the member of an organization with perfect incision. This Charm creates a (Social or Mental Attribute) + Bureaucracy read intentions action adding the Solar’s Essence in automatic successes. This Charm is automatically successful unless resisted with magic, and cannot be resisted by characters whose temporary Willpower is currently lower than the Solar’s. Upon reading her subject, the Exalt can determine the exact strongest or most relevant Intimacy they hold for the organization in question.'
	}, {
		'name': 'Enigmatic Bureau Understanding',
		'cost': '--',
		'mins': 'Bureaucracy 4, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Measuring Glance',
		'desc': 'The Exalt can govern an organization with preternatural awareness. With this Charm, the Lawgiver is made aware when the member of an organization has his or her Intimacy for the organization challenged by any kind of social influence that does not involve the Psyche keyword. This awareness is contingent on the Solar having used read intentions actions to uncover the relevant Intimacies of the character in question. The Solar’s awareness extends to the moment the character’s Intimacy is challenged if and only if the character is currently functioning in some capacity for the organization. If the subject is not presently working for the Solar, she only notices that someone has attempted to influence them when they return to their role or functions as a member of the organization. This clarification applies to current as well as former members—the Exalt only immediately notices influence against a character who is currently on duty. This Charm does not convey any knowledge of the substance of such social influence, or whether it was successful—only that it happened.'
	}, {
		'name': 'Speed the Wheels',
		'cost': '8m',
		'mins': 'Bureaucracy 5, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One task',
		'prereqs': 'Deft Official’s Way',
		'desc': 'Through the use of this Charm, the Solar can cause a bureaucracy to finish a task in record time. Using this Charm causes the organization to work faster by a number of degrees equal to a Solar’s Essence. A task that would be accomplished in a century takes only a season; a task that would be accomplished in a season takes only a month; what would take a month takes only a week; what takes a week only takes day, and what could be accomplished in days just takes minutes. Any request that would take less than a day is processed immediately; the Solar is literally moved to the front of the queue and is transferred into the services of an organization the moment she makes her request. Therefore, at Essence 3, a Solar could obtain records from a Fair Folk freehold that would normally take a century in just a week. At Essence 5, she could obtain it in minutes.'
	}, {
		'name': 'Bureau-Rectifying Method',
		'cost': '10m, 1wp',
		'mins': 'Bureaucracy 5, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One investigation',
		'prereqs': 'Speed the Wheels',
		'desc': 'The Solar may use her bureaucratic prowess to reform an ailing or corrupt bureaucracy. The Lawgiver must participate in an investigation of the organization, attending or leading inquiries, reviewing records and interviewing involved parties. For the duration of the inquest, add the Solar’s Bureaucracy in automatic successes to her Investigation and Socialize rolls to conduct this investigation. In addition, while this Charm is in effect, members of the organization will automatically perceive the Solar as a subject of confidential trust with regards to the bureau—someone they should both confide in and should speak truthfully to. This registers as a major Intimacy with most, but those with strong will and reasons to want to hide the truth will clock in with no more than a minor Intimacy of respect for the Lawgiver’s authority.'
	}, {
		'name': 'Bureau-Reforming Kata',
		'cost': '5m, 1wp',
		'mins': 'Bureaucracy 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Bureau-Rectifying Method, Enigmatic Bureau Understanding',
		'desc': 'The Lawgiver may use this Charm to sort an organization she controls, moving personnel and dropping its weakest members. This Charm may be used after Bureau-Rectifying Method to instantly cleanse an organization of any hostile magic such as Indolent Official Charm or astrological curses. Whether the Solar is able to determine the presence of such magic depends on the thoroughness of her investigation. If the Storyteller is satisfied that she has uncovered evidence of malignant forces at work, this Charm automatically succeeds at clearing all such effects and making the organization immune to them for one season.'
	}, {
		'name': 'Woe-Capturing Web',
		'cost': '--(Varies)',
		'mins': 'Bureaucracy 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Bureau-Reforming Kata',
		'desc': 'The Solar becomes automatically aware any time a curse or other magic is laid against her organization. She may not be aware of the exact details of such a power, or where it comes from, but she does know where to look for evidence using Investigation Charms or Bureau-Rectifying Method. At the moment the Solar first becomes aware of fell magic, the player may also guess as to its source if it is reasonable that the Solar would know what the player suspects. If correct, the Solar instantly knows the source of the magic and may use Bureau-Reforming Kata instantly. The Solar may, at the same time she uses Bureau-Reforming Kata, spend a number of motes equal to those used to launch the curse. By committing these motes, the Exalt traps the motes committed to the effect, preventing the source from relinquishing the curse before its normal duration has expired.'
	}, {
		'name': 'Omen-Spawning Beast',
		'cost': '--',
		'mins': 'Bureaucracy 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Woe-Capturing Web',
		'desc': 'The Solar becomes fused with her organization at the unconscious level. Her Essence flows through all aspects of her bureaucracy, subtly altering her existence as she alters it in turn. If the Exalt has captured magic using Woe-Capturing Web, this Charm allows her to discover profiling information among her immaculately-kept paperwork, revealing the identity of the one whose magic has been snared.'
	}, {
		'name': 'Infinitely-Efficient Register',
		'cost': '--',
		'mins': 'Bureaucracy 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Omen-Spawning Beast',
		'desc': 'As long as the Lawgiver’s organization has succeeded at one challenging project in the previous season, her bureaucracy automatically completes one project within its scope without ever undertaking it. Once per story, the Exalt may travel to an isolated section of her business headquarters where she will find the proof of a completed task. She might find useful tools, resources, deeds, valuable paperwork, and so forth. The Storyteller should select items which will prove of some use to the Solar each time she decides to invoke this Charm. The more powerful her organization, the better the discovered spoils will be. Note that use of this Charm does not itself count as completion of a challenging project.'
	}, {
		'name': 'Indolent Official Charm',
		'cost': '5m',
		'mins': 'Bureaucracy 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Stackable',
		'duration': 'Indefinite',
		'prereqs': 'Deft Official’s Way',
		'desc': 'The Lawgiver may use her power to slow as well as hasten a bureaucracy. Through use of this Charm, the Solar may bring the wheels of a government to a grinding halt with regards to a single task. Documents will be lost at every turn, every petty official who could possibly interfere or request a bribe will do so, and petitions and requests will inevitably end up neglected at the bottom of the pile. For every point of Essence the Exalt possesses, the investigation is delayed by one degree, from days to weeks, weeks to months, months to seasons, and seasons to years. Thus an Essence 2 Solar could delay an investigation that would take a week, causing it to take an entire season.\nThe Solar need not be part of the matter to be delayed. She can speculate on an investigation she is unaware of, committing motes against the possibility of such an investigation in the future. For example, she could stymie “the ongoing secret police investigation into my business” without being certain such an investigation was occurring. However, even though this Charm will defend her against such intrigues, this Charm will not inform her as to whether such an investigation exists or is ongoing. The Solar may stack this Charm (Essence) times, protecting herself against an equal number of different investigations.'
	}, {
		'name': 'Foul Air of Argument Technique',
		'cost': '13m, 1wp',
		'mins': 'Bureaucracy 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Indolent Official Charm',
		'desc': 'The Lawgiver can arrest an entire arm of government with one deft stroke. The Solar targets a project she is aware of and dooms it with a flash of her Caste Mark. Roll (Charisma or Manipulation) + Bureaucracy against the Bureaucracy, Investigation, Larceny or War (whichever is applicable to the project) of each character responsible for leading the project. For each success, that character will experience (Solar’s Essence) botches trying to carry out that project. As failure manifests, the first result is that communication breaks down, becoming hostile, ineffective, or completely impossible (as with the collapse of the information arm of a military establishment). A project that is a monumental failure may threaten the stability of an entire organization. This Charm may not be used on a single organization more than once per season.'
	}, {
		'name': 'Taboo-Inflicting Diatribe',
		'cost': '10m, 1wp',
		'mins': 'Bureaucracy 5, Essence 4',
		'type': 'Simple',
		'keywords': 'Stackable',
		'duration': 'Indefinite',
		'prereqs': 'Foul Air of Argument Technique',
		'desc': 'The Lawgiver may pass down laws to her agents which are sacrosanct. The Solar repeatedly inveighs against a certain action, making it anathema. It then becomes impossible for members of her organization to carry out that action—but only in the context of functions of the bureaucracy. Furthermore, the Solar must be specific in citing those behaviors which are banned. Thus, she could not ban “theft” but she could ban “theft from the company coffers” or “embezzlement of client capital.” Likewise, while these bans would prevent members of her organization from stealing from her organization, they do not prevent those members from committing such crimes outside the jurisdiction of her organization. Characters affected by this Charm can treat any social influence to break a defined taboo as an unacceptable one. The Solar may stack this Charm (Essence) times to protect her organization thusly.'
	}, {
		'name': 'Order-Conferring Action',
		'cost': '10m, 1wp',
		'mins': 'Bureaucracy 5, Essence 5',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One week',
		'prereqs': 'Taboo-Inflicting Diatribe',
		'desc': 'The Solar’s effective delegation of power bolsters the might of Creation. To use this Charm, the Solar must confer advice to a bureaucracy either directly or through mediators (letters, messengers, etcetera). The Lawgiver proposes bureaucratic reforms and operating sequences that are efficacious and skillful: roll Charisma + Bureaucracy against a difficulty of 5. If successful, the organization’s leaders gain a number of non-Charm dice equal to the roll’s extra successes. These dice can be used on (Solar’s Essence) Bureaucracy, Investigation, Larceny, Lore, Medicine or War rolls dealing with running a relevant organization or project. The Solar may enhance her own actions with this Charm, and if she or any other Solar is a beneficiary of this effect, the organization becomes a “creational bulwark” on the spot. The Wyld cannot penetrate it, diseases struggle to cross its borders, and Shadowlands encroach upon it more slowly. This effect lasts one week.'
	},

	// Integrity

	{
		'name': 'Enduring Mental Toughness',
		'cost': '1m',
		'mins': 'Integrity 1, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Even in extreme pain, the Exalt does not succumb to despair. The Solar may ignore wound, illness, and crippling penalties to her Resolve or Guile for one tick.\nAt Integrity 3+, Essence 1+, this Charm can be repurchased, giving it an alternate cost and duration. The Exalt can even endure torture. For five motes, one Willpower she may extend this effect to one scene.\nAt Integrity 5+, Essence 3+, this Charm may be repurchased a second time, allowing the Exalt to pay eight motes, one Willpower to extend the effect to one day.'
	}, {
		'name': 'Spirit-Maintaining Maneuver',
		'cost': '5m per 1wp',
		'mins': 'Integrity 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Enduring Mental Toughness',
		'desc': 'The core of the Solar’s will is so great that she can survive sustained mental assault. When resisting social influence or any magic which seeks to force itself upon the Solar’s will or mind, she may use this Charm to aid in resistance, paying five motes for every one Willpower she would have to spend in order to resist.'
	}, {
		'name': 'Transcendent Hero’s Meditation',
		'cost': '7m, 1wp',
		'mins': 'Integrity 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Spirit-Maintaining Maneuver',
		'desc': 'The Solar looks within and beyond the core of her Essence, to the pure white spark of her divinity. In doing so, she shatters delusions and sees all things truly. This Charm allows the Solar to break any control effects which grip her mind, body or soul. This Charm does not allow her to reverse social influence, but rather it combats persuasion that is considered unnatural, hypnotic, or sorcerous. In order to use this Charm, the Solar must first be forced to take an action against one of her Intimacies as a result of the effect’s control. She must then spend at least five minutes meditating on the core of her existence, during which time she sees the blight on her Essence for what it is. She may then activate this Charm to assert the purity and truth of her inner self, shattering the fell magic and freeing her soul from its grip. This Charm may be used once per story, but it is reset after the Solar experiences Limit Break. The Exalt cannot use this Charm to notice or expunge the Great Curse.'
	}, {
		'name': 'Stubborn Boar Defense',
		'cost': '--',
		'mins': 'Integrity 2, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'The Lawgiver’s resolve cannot be easily broken. Once the Solar has resisted a persuade action, she gains +2 to her Resolve if the issue is raised again. The Solar’s Lunar mate is always capable of insinuating herself into the Solar’s graces and may ignore this Charm’s effect.'
	}, {
		'name': 'Temptation-Resisting Stance',
		'cost': '5m, 1wp',
		'mins': 'Integrity 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Stubborn Boar Defense',
		'desc': 'The Solar Exalted rise above the poisons of a wicked world. Corruption, lust, and greed; vice and the addictive soul-stroking caresses of the raksha—the Lawgivers stand resolute against all such threats. This Charm raises the Exalt’s Resolve by one against all social influence which would tempt her to turn against her ties or sway from her principles. In addition, when multiple Solars working toward the same overall goal in a social scene each activate this Charm, their bonuses stack together, to a limit of five bonus Resolve—the traditional number Solars in a Circle.'
	}, {
		'name': 'Steel Heart Stance',
		'cost': '4m, 1wp',
		'mins': 'Integrity 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Stubborn Boar Stance',
		'desc': 'The Solar hardens her heart, forcefully reinstating her values in the face of successful influence. After being persuaded to take a major or defining course of action, this Charm allows the Solar to deny the influence, even if this means asserting the Intimacy that might have been used to raise her Resolve. Her opponent’s argument was compelling, but she cannot deny her own principles. This Charm may only be used once per story, but is reset if the Solar witnesses the defense or upholding of a defining principle as a result of changing her mind. For example, a Lawgiver who is persuaded to withdraw her army from the border might suddenly reject that persuasion, going back on her decision to withdraw. Then, coincidentally, when a beastman horde suddenly rushes the border, her army is still there and able to prevent the invasion. If she has a defining principle of “I will defend my kingdom from foreign invaders,” she will see that her decision to change her mind was justified and necessary, and Steel Heart Stance will be reset.'
	}, {
		'name': 'Righteous Lion Defense',
		'cost': '--',
		'mins': 'Integrity 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Steel Heart Stance',
		'desc': 'Around a certain issue, the Solar cannot be moved, shaken, swayed or tempted. Upon purchasing this Charm, the player selects a defining principle that exemplifies the Solar in such a way that they should never act against it. Righteous Lion Defense allows the Exalt to treat any persuasion which would cause the Solar to act against the selected principle as unacceptable influence. This effect may not be routed through principles that are overly broad. “I will never kneel,” is too broad, but “I will never kneel to Zhao Li,” is not. Likewise, “Creation must be conquered,” is too broad, while “Great Forks must be conquered” is not.\nThe Solar’s zealous resolution daunts even the most relentless opposition. Any attempt to decay the inviolable Intimacy with an instill action must be rerolled, forcing the opponent to take the lower result. The opponent may enhance the second roll with additional Charms as necessary, but even if she is able to penetrate the Solar’s Resolve, the Intimacy still does not decay. However, success in this regard allows the Solar to be targeted with persuasion to convince her to act against the protected Intimacy, and this weakness persists until she has taken major or defining action in the principle’s defense.\nThe Solar may always choose to act against her Intimacies, or change them. If her principle is downgraded, destroyed, transformed or reconciled as a result of roleplaying or Limit Break, this Charm ceases to function until the Intimacy is restored, or until the Solar dedicates herself to a new principle. At Essence 3+, this Charm may be repurchased a single time, to protect one additional principle.'
	}, {
		'name': 'Unhesitating Dedication',
		'cost': '3m',
		'mins': 'Integrity 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Righteous Lion Defense',
		'desc': 'So steadfast is the Solar that those who would sway her find their efforts undone by their own uncertainties. After a character uses an instill action in an attempt to diminish one of the Solar’s defining Intimacies, the Exalt may use this Charm to select one of the initiate’s non-success numbers. If she selects 1s, (Essence) 1s in the roll act as -1 success to the attempt. If someone speaks ill of that which she loves, the Solar will find a flaw in their arguments. If she selects any non-success number other than 1s, instead of negative successes she can force the initiate’s player to reroll up to (Essence) successful dice, starting with the target number (usually 7) and moving up. In this case, the initiate always keeps the lower of the two results.\nThis Charm cannot be used in combination with Righteous Lion Defense. The Exalt may only use this Charm to successfully defend an Intimacy once per Intimacy, per story. Meaning that she can use this to defend the honor of her Lunar mate and uphold her dedication to the fall of Mask of Winters, but she may not use this Charm to defend either the Lunar or her enmity for the deathlord more than once per story. This effect can be reset by exploring the claims that were made on the back of an instill action. If it was claimed that her Lunar was adulterous, she might elect to begin an investigation. If the Solar confirms such claims to be false, the Charm is reset.'
	}, {
		'name': 'Integrity-Protecting Prana',
		'cost': '--(5m, 1wp)',
		'mins': 'Integrity 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'Exposure to Wyld energies can cause hallucinations, addiction, insanity, and even terrible mutations. When the Exalt is exposed to such energies, she immediately senses the warping danger that surrounds her. She may then choose to pay five motes, one Willpower to immunize her mind, body, and equipment against the Wyld’s twisting power for as long as she keeps motes committed. The Solar’s sense of such danger becomes instinctive; she may even activate this Charm while she is asleep or incapacitated. This Charm can also be used to shield the Solar against other environmental effects which would warp her mind or body, such as the twisting choral of the demon prince with voice like crystal facets, or the tainted Essence emanating from the intestines of a malfunctioning First Age manse. But be warned: once the Lawgiver is addicted to the Wyld or mutated by twisting energies, this Charm will not discontinue such effects; it will only prevent her condition from worsening.\nWhile Integrity-Protecting Prana protects the Solar and her possessions from being subject to environmental twisting powers, it does not allow her to ignore Wyld phenomena. She can still be torn apart by Wyld-spawned ravenous cyclones of burning teeth and giant hundred-armed mantises. This Charm also does not defend against attacks that might warp her mind or body directly, such as the Wyld-Mind Strike of the Thousand Venoms Mistress, or fiat-level changes to her existence caused by alterations to the Loom of Fate.'
	}, {
		'name': 'Destiny-Manifesting Method',
		'cost': '--(3m, 1wp)',
		'mins': 'Integrity 1, Essence 1',
		'type': 'Permanent',
		'keywords': 'Stackable',
		'duration': 'Permanent',
		'prereqs': 'Ten Charms from any one Ability',
		'desc': 'The Solar reborn is the heritor of a legend that cannot easily be erased. When struck with a reality-shaping or fate-weaving attack that would permanently alter her mind or body, the Solar’s destiny manifests to override the changes. This Charm does not completely nullify deleterious effects. Paying this Charm’s cost merely downgrades or slows the effect. Destiny-Manifesting Method guarantees two things: First, the Solar cannot be immediately changed beyond her ability to represent the character concept implied by the ten prerequisites from which she derived this Charm. Second, no matter how fatal or permanent the effect may be, fate itself will generate a condition by which the Solar may shatter any curse. This condition is decided by the Storyteller. The Storyteller should also provide the Solar ample time—seasons or even years—to pursue a cure. The Solar is not guaranteed to know the shattering condition of her curse, but characters with appropriate Lore, Medicine, and Occult Charms may be able to aid her in this regard.\nThis Charm may be repurchased for every ten different Charms the Solar knows, amplifying its effects. This Charm is also stackable; a Solar who purchases it off the back of ten Melee Charms may purchase it again by using ten different Melee Charms. In this instance, the Storyteller should further lessen any changes wrought to the Solar. Repurchasing this Charm while under the effects of an ongoing condition has no lessening effect on that condition, however.\nOn Destiny-Manifesting Method\nThe Solar cannot be changed beyond her ability to represent the character concept implied by the ten prerequisites from which she derived this Charm. This means, literally, that if a Solar daiklave master who derived this Charm from ten Melee Charms is struck by an attack that would have transformed her into a cat, she is instead changed into a feline beastman, allowing her to continue to wield daiklaves and, by extension, to continue to function as a person and a Solar, using Charms, channeling Essence, and so on. Likewise, a legendary Solar courtesan struck by a curse that would wither away her beauty, drying her to a crone-like husk, might experience only a slight downgrade to her Appearance—an unprepossessing feature she can conceal, for example. Furthermore, multiple repurchases, stacking repurchases, and the Solar having a higher Essence rating than her attacker can reduce such effects to nothing or almost nothing when such effects should be completely ignored. In this instance, the Storyteller should give the Solar a temporary dice penalty or make her player roll a few damage dice and move on.\nBecause there are many different such effects, the Storyteller has ample latitude to interpret the results. When in doubt, the following things should be considered: this Charm exists for the purpose of telling interesting stories. It is boring and disappointing if a Solar is slain by being turned to stone, and it is equally boring if the Solar runs no risk at all from the secret stone touch and granite-imbuing glance. With this Charm she is instead made obdurate; stony patches mar her skin, and her soak increases by three while her Dexterity is reduced by the same. Given seasons unanswered, this condition might worsen and cause her death, but the Solar at least has a chance to break the curse, manifesting her true destiny. Likewise, a character struck with the killing gaze of Balor might instead experience slow, continuous damage to her health track each time she is rolled into battle. Such characters face crushing adversity as a result of these curses, but may also derive interesting Storyteller-approved benefits from their curses, aside from the valuable opportunity to explore their character in the face of such a deep and transformative crisis.'
	}, {
		'name': 'Legend-Soul Revival',
		'cost': '--',
		'mins': 'Integrity 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Destiny-Manifesting Method',
		'desc': 'Upon purchasing this Charm, the Solar becomes nigh immune to any curse she has broken with Destiny-Manifesting Method. Such effects either affect her not at all, or apply paltry damage or a small dice penalty lasting no longer than a round.'
	}, {
		'name': 'Phoenix Renewal Tactic',
		'cost': '--(Varies)',
		'mins': 'Integrity 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Destiny-Manifesting Method',
		'desc': 'The Solars went down into a darkness never-ending, but were reborn again in flames. If the Solar is threatened by a warping, shaping, or twisting attack with no clear defense, then this Charm allows the Exalt a chance at such a defense, turning the attack into a contest of wills. Roll the Exalt’s temporary Willpower with double 9s against that of the attacker, treating non-successes on both Willpower rolls as temporary Willpower spent by both parties. The Solar also rolls an additional (Essence) dice, for no Willpower cost, with double 9s, adding successes to her total result. If she wins the contest, she casts off the attempted curse and gains a point of temporary Willpower. She also gains a point of Willpower if all dice on the Willpower roll turn up successes.\nSucceeding at this Charm lowers the cost of Spirit-Maintaining Maneuver by two motes for the rest of the scene, and immunizes the Solar from being struck by any unrolled effect for (Essence) days. The Solar does not need to be aware of the attack to use Phoenix Renewal Tactic; the Charm makes her automatically aware. She can even use this Charm when she is asleep or otherwise incapacitated.\nThis Charm may be repurchased at Integrity 5+, granting the Exalt one non-Charm automatic success while allowing the Solar to choose to convert two Willpower dice to three automatic successes as well.'
	}, {
		'name': 'Sun King Radiance',
		'cost': '--',
		'mins': 'Integrity 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Any five Performance, Presence, or Socialize Charms',
		'desc': 'In every word and action, the Solar manifests a core of magnificent integrity. Even the hearts of the wicked are filled with awe. Each time the Solar succeeds at social influence or successfully applies her Resolve, any witness who considers themselves a follower of, subservient to, or less powerful than the Solar might be profoundly and forever changed in that moment. If the Solar’s action resonates with the character, they may accept an automatic Intimacy of major respect for the Solar. On the back of this, they also gain a temporary boost of excellence on a scene of their choosing. During that scene, while acting toward a goal they wish to fulfill, while using the Solar’s actions as a model, the character gains three bonus dice to all social influence for the rest of the scene, and has their Resolve boosted by one. This Charm can transform an unremarkable personage into a heroic character.'
	},

	// Investigation

	{
		'name': 'Watchman’s Infallible Eye',
		'cost': '--',
		'mins': 'Investigation 1, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Lawgiver is attuned to her subconscious, and is preternaturally aware of her surroundings. If the Exalt possesses this Charm, she feels an instinct each time she encounters a scene in which a case scene or profile character action (see p. XX) should be used. At this point, the Storyteller informs the player which action is appropriate, and vaguely, why—if there is danger in the surroundings, the player is informed that the Solar senses a trap and should use a case scene action; if there is a suspicious character, the player is made aware of that character so that a profile action can be used. This Charm does not entail automatic success at each prospective action. It merely informs the player which action should be performed, and why. As the Solar notices many things the player does not, this Charm can be used to generate reasons for investigations it would otherwise be impossible for a normal character to perceive.'
	}, {
		'name': 'Inquisitor’s Unfailing Notice',
		'cost': '--',
		'mins': 'Investigation 2, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Watchman’s Infallible Eye',
		'desc': 'The Lawgiver has an instinct for the perfect moments to commit a crime. Any time the Larceny Ability is used in her presence, she notices the character using it. This does not tell her how Larceny is being employed, but provides her (Essence) non-Charm dice to an Awareness or Investigation attempt to notice the deception for one instant, on each instant the Ability is employed. This only functions against disguises if the character attempts an action they would be unable to attempt without using a disguise.'
	}, {
		'name': 'Crafty Observation Method',
		'cost': '5m',
		'mins': 'Investigation 3, Essence 1',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Watchman’s Infallible Eye',
		'desc': 'By examining the undisturbed physical evidence of an event, the Solar can flawlessly reconstruct the physical process behind that event. Finding a corpse with a knife wound, she can tell what sort of knife was used, and from what angle the blow was struck. She can differentiate between blood spatters, assigning each to a different stroke of a weapon made at a different time, and so on. This Charm is not limited to crime scenes. The Solar can likewise reconstruct the evidence left behind by a liaison, examine the leavings of a camp site, etc. This acts as a normal case scene action, save that the Lawgiver does it in a handful of seconds, and gains (Essence) automatic successes and double 9s to her attempt.'
	}, {
		'name': 'Divine Induction Technique',
		'cost': '--',
		'mins': 'Investigation 4, Essence 1',
		'type': 'Permanent',
		'keywords': 'Mute',
		'duration': 'Permanent',
		'prereqs': 'Crafty Observation Method',
		'desc': 'The Lawgiver draws wisdom from the very whispers of Heaven. Once per scene, the Exalt may use a free full Investigation Excellency. This Charm may be reset by succeeding at any Investigation action with a difficulty of (the Solar’s Investigation -1) or greater. Note that this Charm has the mute keyword; the Solar’s insights are never subject to censure, and are never obvious. It is as if she draws her wisdom from the very cosmos.'
	}, {
		'name': 'Miraculous Stunning Insight',
		'cost': '--',
		'mins': 'Investigation 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'Mute',
		'duration': 'Permanent',
		'prereqs': 'Divine Induction Technique',
		'desc': 'The Solar’s deductions are as sharp as a razor and as sure as daylight. Once per scene the Exalt may enhance a single Investigation roll with double 8s.'
	}, {
		'name': 'Dauntless Inquisitor Attitude',
		'cost': '6m',
		'mins': 'Investigation 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'One scene',
		'prereqs': 'Miraculous Stunning Insight',
		'desc': 'The Exalt is relentless in her pursuit of the truth. This Charm adds her Essence in automatic successes to her Investigation rolls for the rest of the scene.'
	}, {
		'name': 'Judge-General’s Stance',
		'cost': '10m',
		'mins': 'Investigation 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Dauntless Inquisitor Attitude',
		'desc': 'Once per day, the Exalt may use this Charm to reset any Investigation Charms which are currently “down.” She also automatically gains one temporary point of Willpower.'
	}, {
		'name': 'Evidence-Discerning Method',
		'cost': '2m, 1wp',
		'mins': 'Investigation 5, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Crafty Observation Method',
		'desc': 'By sorting through possessions, physical evidence and so on left by a particular person, the Exalt may construct a psychological profile of the character who left the evidence. This Charm allows the Lawgiver to profile a character who is not even present, at a difficulty based on the dissonance of the scene. If the character has left little or misleading evidence of themselves behind, the difficulty is raised. However, extra successes on the Exalt’s Perception + Investigation roll allow her to disregard inconsistent evidence at a rate of one success per one erroneous item eliminated. The Exalt may continue to use this Charm until she has the clearest picture possible, ignoring the Willpower cost on additional uses, however, this requires that there be material for her to continue sorting through. Once her investigation is completed, the Storyteller informs the player of the Exalt’s overall success. If she has accurately profiled the character, then she will automatically notice any and all characters who meet that profile, or scenes of events which fit that character’s profile, through the use of Watchman’s Infallible Eye.'
	}, {
		'name': 'Watchful Justiciar’s Eye',
		'cost': '--(4m, 1wp)',
		'mins': 'Investigation 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Evidence-Discerning Method',
		'desc': 'The Solar is able to sense inconsistencies in a character’s behavior. After profiling a character with the prerequisite or Ten Magistrate Eyes, the Solar senses each time a character acts outside of that profile in a scene. She may then pay four motes, one Willpower to activate this Charm. The Storyteller then informs the player as to whether the character’s behavior is normal, allowing the Solar to revise her target’s profile and restoring one point of temporary Willpower, or whether the inconsistency is connected to their attempt to cover their connection to unfolding circumstances. This does not tell the Lawgiver how the character is connected to certain events, only that they are acting “out of character” in order to hide their culpability. The Storyteller should explain the dissonance in the character’s behavior—how the character “should” be acting compared to how they are actually behaving.'
	}, {
		'name': 'Evidence-Restoring Prana',
		'cost': '--(6m)',
		'mins': 'Investigation 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Varies',
		'prereqs': 'Evidence-Discerning Method',
		'desc': 'The Lawgiver is preternaturally aware of the connections between objects. She is so keenly aware of these connections that she can sense when the flow has been disturbed. This sensation comes across as a momentary visualization of Essence flows, fixating on the remains of evidence that has been destroyed—which the Lawgiver perceives as a well of negative energies, a disruption in the flow of Essence. She may then pay six motes to touch this well, momentarily restoring the flow of Essence to glimpse the evidence in its complete state. This Charm can momentarily restore evidence no larger than that which the Exalt can normally lift and carry, but it allows her a full examination of the destroyed object. Once her examination of the restored object has concluded, her commitment is dropped and the Essence of the object disperses.'
	}, {
		'name': 'Judge’s Ear Technique',
		'cost': '3m',
		'mins': 'Investigation 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Crafty Observation Method',
		'desc': 'The Lawgiver can evaluate the truth of any statement she hears. This Charm is infallible within limits: if she hears a lie the speaker believes to be true, she won’t detect the untruth. Her sense of lies is keen enough that if a character speaks in half-truths, she’ll know which part of the statement is false. Any magic which contests this effect goes to a roll-off against the Lawgiver’s Perception + Investigation, with (Essence) automatic successes on the Solar’s roll, and 1s in the opposed roll acting as 10s to the Solar’s result.'
	}, {
		'name': 'Irresistible Questioning Technique',
		'cost': '5m, 1wp',
		'mins': 'Investigation 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Judge’s Ear Technique',
		'desc': 'The Lawgiver may wring the truth from a subject with piercing questions that are impossible to resist. This Charm supplements a persuade action (see p. XX) in the form of a question. Roll the Solar’s Wits + Investigation against the target’s Resolve. Success means that the character must answer truthfully and to the fullest extent of their knowledge. In addition, each extra success on this roll constitutes an additional question the Solar may ask, and each of those questions is likewise irresistible. The target of this Charm may pay one Willpower to resist answering a single question, but this grants no immunity to further questioning, or even the same question posed repeatedly. No Willpower is required to resist this question if the character is able to escape the scene or leave freely; in combat, the power is compelling but costs no Willpower to resist. Likewise, a character who feels compelled to stay, even if they may leave freely, must pay Willpower to resist a question. This Charm may only be used on a specific character once per session.'
	}, {
		'name': 'Ten Magistrate Eyes',
		'cost': '3m',
		'mins': 'Investigation 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Evidence Discerning Method, Judge’s Ear Technique',
		'desc': 'Attuning herself to the ambient Essence of the world, the Solar can see the order of and links between objects. This Charm supplements a case scene action, making that action infallible, and reducing the time it takes to just seconds. Even if the Exalt’s Perception + Investigation roll turns up no successes, she gains at least one clue to her investigation. For each additional success, the Storyteller describes the Solar’s mind racing from clue to clue, making logical connections that would be impossible for most people, and describing how those connections work to advance the Solar’s inquest. Such clues should provide the player with information that constitutes leads to characters, places, and events that will automatically trigger Watchman’s Infallible Eye when encountered. The Solar can also automatically tell if there has been an attempt to conceal evidence.\nThis Charm may also be used to supplement a profile character action in an identical fashion, extra successes creating an incredibly precise, detailed and accurate analysis of the target. Ten Magistrate Eyes is enhanced by Awareness Charms, allowing the Solar to notice truly improbable details, like differentiations in heartbeat in concert with a character’s behavior, variations in the mud color of footprints that give away a person’s earlier location, and so on.'
	}, {
		'name': 'Unknown Wisdom Epiphany',
		'cost': '10m, 1wp',
		'mins': 'Investigation 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Ten Magistrate Eyes',
		'desc': 'By visiting the scene of an event and attuning herself to local Essence flows and residues, the Exalt can psychically reenact history, reconstructing an event to the point of gaining insight she could not receive from evidence alone. The Solar must have time to go over the scene, to touch and examine evidence and retrace steps in order to empathize and adapt the perspective of one of the involved parties. The Lawgiver experiences flashbacks of the event from the perspective of the party she is emulating, and gains insights into the character’s persona, including their emotions over the course of the re-enacted event, and the basic meaning behind the behavior they enacted. Exalts reenacting an event are rarely dangerous, but if disturbed they may very briefly cling to the adopted persona before snapping back to the current moment.'
	}, {
		'name': 'Enlightened Touch Insight',
		'cost': '5m',
		'mins': 'Investigation 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Unknown Wisdom Epiphany',
		'desc': 'By touching a piece of evidence and stirring its Essence with her own, the Lawgiver gains a psychometric vision related to the object. This is a Wits + Investigation read intention action against a difficulty equal to the number of days since the evidence was placed. If successful, the Exalt feels the exact emotion of the one who left the evidence behind at the moment it was produced.'
	}, {
		'name': 'Empathic Recall Discipline',
		'cost': '1m, 1wp',
		'mins': 'Investigation 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Enlightened Touch Insight',
		'desc': 'By piecing together the evidence of a crime scene, the Exalt can channel the perpetrator’s perspective. This Charm may be used after a case scene action. The Lawgiver congeals what she has seen into a moment of clear understanding of the perpetrator. This is treated as a Wits + Investigation based read intentions action with a difficulty of the perpetrator’s Larceny. On a success, the Solar understands the meaning behind the event—that is, what the perpetrator intended by the crime. Even if the Exalt fails to succeed, she is able to adapt the perpetrator’s perspective automatically upon using Unknown Wisdom Epiphany.'
	}, {
		'name': 'Mind Manse Meditation',
		'cost': '12m, 1wp',
		'mins': 'Investigation 5, Essence 5',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Empathic Recall Discipline, Evidence-Restoring Prana',
		'desc': 'The Solar builds a palace of her memories. Upon using this Charm, she mentally perceives this palace as an archive of gathered evidence, research, character profiles and investigations which she can mentally traverse in order to conduct a thorough investigation. While inside her Mind Manse, the Solar is entranced and unaware of her physical surroundings. She may recall anything that she knows in order to conduct her investigation forward, compiling evidence, research, and associating ideas at a rate of roughly (Essence) hours per ten seconds. During this time, the Lawgiver can access any information the Storyteller deems that she knows, based on any of her other Abilities and anything she has learned over the course of the story, in order to make psychic connections between evidence, ideas, and facts that would otherwise be impossible. The effects of this Charm are largely dramatic. Entering the Mind Manse allows the Exalt to find the solution to a riddle or mystery that allows her to forward her investigation. This Charm may be used once per story.'
	},

	// Larceny

	{
		'name': 'Seasoned Criminal Method',
		'cost': '—',
		'mins': 'Larceny 1, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'The Exalt adapts the nature of the iconic criminal, who must one day become a master of her craft. She is a creature of the criminal element; duplicity is in her every word and step. This Charm allows the Solar to invoke and discard a number of special distinctions at her leisure, which allow her to gather information, infiltrate criminal society, and protect her position there.\nThe distinctions are as follows:\nFamiliarity: To a member of a criminal organization, she seems familiar—that is, she can play on a minor Intimacy to make her target believe she is a criminal with whom to be treated: a member of the organization, a prospect for initiation, etc.\nDissonance: Magistrates or other officials seeking to establish her identity suffer a -2 penalty to their Bureaucracy and Investigation actions. Persons who do not know her personally but may have spotted her or seen her hanging around the scene of a crime find her unrecognizable and cannot remember doing so.\nVulnerability: The Exalt makes herself seem the best possible target for a type of crime dictated by the player. Confidence men will see her as an easy mark, gamblers will seek to engage her with betting gossip or games of chance, bandits will try to mug her, and so forth. This effect has a visual component: thieves are less likely to steal from an Exalt wearing armor and a battle axe, while a serial killer might find a person who wears their hair a certain way irresistible.\nReceptivity: Similar to vulnerability, interested parties perceive the Exalt as a local player. Rather than prey on her directly, she may be identified as a drug buyer or seller, or a person looking to make a bet, get a whore, or take part in other illicit or seedy activities. Such parties will be interested in providing her with information about where to go and who to talk to.'
	}, {
		'name': 'Spurious Presence',
		'cost': '6m',
		'mins': 'Larceny 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Seasoned Criminal Method',
		'desc': 'Even amidst the Imperial Treasury, the Lawgiver projects her right to be there. This Charm makes it nearly impossible to voluntarily question the Exalt’s presence. As long as the Solar is dressed and behaving as expected for the present circumstances, she cannot normally be considered suspicious. Characters who do suspect something “off” about her may try to read her intentions, but the Exalt’s Guile is at +2 against such attempts. The player may reconstitute the character’s Guile using Larceny instead of Socialize; Charms that protect against read intentions actions are explicitly allowed to enhance this effect. Which characters suspect the Lawgiver depends entirely on the dramatic whim of the Storyteller.'
	}, {
		'name': 'Preying on Uncertainty Approach',
		'cost': '3m',
		'mins': 'Larceny 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Spurious Presence',
		'desc': 'When the Lawgiver is caught somewhere she doesn’t belong, she may use this Charm to immediately become aware of a gap in her inquisitor’s knowledge she can exploit. Stopped at a picket, she realizes the soldier questioning her is expecting a messenger he has never seen. She can then claim that messenger’s identity. Confronted by a tenant when creeping through the glass towers of Chiaroscuro, she realizes there are vacant rooms and assumes the role of a squatter. Uncertainty of this kind counts as a minor Intimacy when it is exploited.'
	}, {
		'name': 'Phantom Hood Technique',
		'cost': '--',
		'mins': 'Larceny 3, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Preying on Uncertainty Approach',
		'desc': 'The Lawgiver can mask her anima to evade detection. Once per scene, the Exalt can activate this Charm to mute five peripheral motes in an instant, causing them to act as if they were motes spent from her personal mote pool, so long as the magic is aiding her in Larceny-based actions. This Charm is reset by a three point social stunt in which the Lawgiver uses Larceny, or in which she uses subterfuge enhanced by any other social ability in order to aid her in criminal behavior. This reset must occur after the Charm has been used.'
	}, {
		'name': 'Clever Bandit’s Rook',
		'cost': '2m',
		'mins': 'Larceny 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Seasoned Criminal Method',
		'desc': 'A master of the sublime, the Lawgiver hooks a mark with her charisma and genuine seeming. When used, this Charm supplements an instill action to make a person believe an object or structure belongs to the Exalt. This Charm cannot force an assertion on someone that directly contradicts what they know. However, a character who does not know the truth cannot benefit from any Intimacies that would bolster their Resolve against the attempt. A character may not spend Willpower to contradict this belief unless they see direct evidence to the contrary.'
	}, {
		'name': 'Doubt-Sealing Heist',
		'cost': '5m',
		'mins': 'Larceny 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Clever Bandit’s Rook',
		'desc': 'Upon successfully robbing a person of something they own, the Exalt may attempt to unwind the owner’s memory of attachment to the item. The player rolls a Manipulation + Larceny instill action against the target’s Resolve. On a success, the Lawgiver convinces the target that the object belongs to her (and always has). The target may not pay Willpower to shake off this belief until (Solar’s Essence) minutes have passed.'
	}, {
		'name': 'Living Shadow Preparedness',
		'cost': '4m, 1 wp',
		'mins': 'Larceny 3, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar becomes the light which swallows the shadow. The player rolls Wits + Larceny, doubles and banks any successes. Banked successes can be reflexively applied to a single Larceny or Stealth action. This effect lasts until the Exalt sleeps, and can be renewed only once per day.'
	}, {
		'name': 'Unshakable Rogue’s Spirit',
		'cost': '-1 Initiative per success',
		'mins': 'Larceny 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Living Shadow Preparedness',
		'desc': 'The Lawgiver can borrow against her own talent to bolster larcenous action. This Charm can be used to aid in protecting the Lawgiver’s disguise during a roll off, to pick a lock, to pickpocket, or to establish Stealth. It can also be used to enhance any social action contrived to swindle a target. For every one automatic success the Charm adds to the selected action, the Solar loses one Initiative from her next Join Battle result. The maximum number of successes a Solar can add between battles is half her Join Battle pool, rounded up. This debt is automatically cleared after completing a full rest. Unshakable Rogue’s Spirit cannot be used in combat.'
	}, {
		'name': 'Master Plan Meditation',
		'cost': '6m, 1wp',
		'mins': 'Larceny 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Unshakable Rogue’s Spirit',
		'desc': 'The Exalt’s meticulous preparation forms a bulwark against failure. This Charm can be triggered after performing the valid listed actions. The player rolls Intelligence + Larceny, converting each success to a pool of contingency points which can be spent on the features listed below.\nValid actions include a scene spent: forging or counterfeiting; preparing an alibi; pursuing information about a person without using violence; obtaining blueprints to a location the Exalt plans to infiltrate; making a plan to enter and escape a dangerous location; plotting to confuse or undermine local law enforcement or criminal syndicates.\nContingency points can be spent in the following ways:\n• Distorting a single piece of evidence (5 points) • Destroying a small piece of evidence (3 points)\n• Erasing a small piece of evidence (7 points) • Raising Resolve by two for one scene (5 points)\n• Raising Guile by two for one scene (5 points)   • Door-Evading Technique cost: 5m, 1wp (5 points)\n• Disguise attempt +1 automatic success (3 points)• Flashing Ruse Prana cost: 0m, 0wp (7 points)\nOnce the Exalt begins spending contingency points, this Charm may not be used to gather new contingencies until the Exalt has spent all the points. The Exalt may not use Master Plan Meditation twice for the same type of valid action in a single session.\nOn Master Plan Meditation\nIn each instance of altered evidence, the player is able to respond to the introduction or discovery of evidence, retroactively changing the narrative. This is not a Creation-time alteration, but rather a retroactive continuity of the Storyteller’s narrative or Investigation action results by another player. Literally, as a character discovers some evidence of your crime, you can pay contingency points to alter the evidence, changing what they found (even if that means they found nothing).\nDestroying evidence is different from erasing evidence; destroyed evidence may be reconstructed by various Charms. Erased evidence is treated as though your Solar carefully covered her tracks. Feel free to gloatingly describe how she outsmarted her pursuers by convincing an army of ants to right the blades of grass she walked over that day, or how she snatched up that single strand of hair before it could fall to the floor.\nDistorting evidence causes it to point at another character connected to the crime scene location. The Exalt’s player does not determine at whom it points; that determination is instead made by the player of the detective. If the only other character known to have visited the scene is the detective, the evidence will point to his guilt.\nThis Charm models the Solar’s serious attention to detail and overqualification for mindgames. Each use should be depicted as the Lawgiver channeling a preternatural sense of preparedness and foresight and meditating on future plans to make her tactics flawless.\nThe duration of each listed contingency is one instant, unless stated otherwise. The Exalt must know the Charms enhanced by contingencies in order to benefit from them.'
	}, {
		'name': 'Swift Gambler’s Eye',
		'cost': '1m',
		'mins': 'Larceny 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Exalt’s jaded insights give her a talent for seeing through the gambits of her opponents. This Charm supplements a read intentions action against an opponent in a game of chance or strategy, lowering the target’s Guile by two. If successful, it tells the Lawgiver how her opponent feels about his current chances. A target who is acting morose but feels exultant is almost certainly bluffing.'
	}, {
		'name': 'Lightning-Hand Sleight',
		'cost': '3m',
		'mins': 'Larceny 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Swift Gambler’s Eye',
		'desc': 'The Solar’s patience hides intense speed. Between breaths, eyeblinks, even thoughts, the Exalt’s hands flash out, changing tiles, switching dice results, trading cards out of dealt hands, moving game pieces, etc. The Exalt’s cheating goes unnoticed so long as she cheats plausibly, screwing the results of only a single round. This deception cannot be realized by onlookers until (Essence + 1) hours have passed. Each time the Solar uses this Charm in a single game, she lowers that expectation by roughly one hour. At Essence 1, she may not be caught immediately on her third use of the Charm, but while her foes still cannot see her cheating, they can notice the effects of her slick dealing.\nThis Charm doubles as Poison-Hand Sleight, which allows a Lawgiver to lace a target’s food or drink with sedatives or poison. It differs in that people will begin to notice the work of a poisoner as soon as people begin to pass out or drop dead.'
	}, {
		'name': 'Proof-Eating Palm',
		'cost': '1m',
		'mins': 'Larceny 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Lightning-Hand Sleight',
		'desc': 'The Solar’s genius hands can outwit even the sharpest eye. This Charm allows her to hide any object small enough to palm. She may appear to swallow the item, fit it under her tongue, hide it up her sleeve, etc. The object vanishes. It does not go to Elsewhere. It merely ceases to exist until the Exalt needs it again, at which point she may will it into her hand with just a thought. The Exalt may hide no more than five objects, but each object must be hidden in a separate space.'
	}, {
		'name': 'Fate-Shifting Solar Arete',
		'cost': '1wp',
		'mins': 'Larceny 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Lightning-Hand Sleight, Unshakable Rogue’s Spirit',
		'desc': 'The Lawgiver adjusts the scales of balance in her favor, and fate is made her accomplice. This Charm enhances any kind of action. Before rolling, the player chooses a number from 2 to 5. That number is treated like a 10 each time it appears in the subsequent roll. The Solar may use this Charm once per full rest.\nAn Essence 4+ repurchase allows the Solar to change two different numbers from 2 to 5 into 10s.'
	}, {
		'name': 'Lock-Opening Touch',
		'cost': '1m or 5m',
		'mins': 'Larceny 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Exalt may open a mundane lock simply by touching it and paying five motes. Alternately, she may challenge a sorcerous lock with her picking tools, paying one mote to gain double 9s and (Essence) automatic successes. This version of the Charm guarantees that she successfully picks the lock even if her roll fails, however, a failure constitutes some unwanted occurrence—perhaps she springs a trap, breaks the lock loudly, snaps her lock-pick, etc.'
	}, {
		'name': 'Door-Evading Technique',
		'cost': '10m, 1wp',
		'mins': 'Larceny 4, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Lock-Opening Touch',
		'desc': 'Some doors are not locked by conventional means; some are sealed by complex sorcery or mechanisms hidden out of sight; still others are bounded by dozens or even hundreds of locks, making it implausible to pick them all. Yet no door may bar the Lawgiver’s entrance. The Exalt reaches for the door as if to touch it, and then steps forward. When her foot falls, she is on the other side of the portal. The Solar can use this talent to pass through a locked window, a sewer grate, a dropped portcullis or even an archway that drips lightning. This Charm is based on the Solar’s illimitable skill for infiltration; she can even evade aperture closures, but she cannot pass through solid walls or reach into a sealed chest and fish around.'
	}, {
		'name': 'Flawless Pickpocketing Technique',
		'cost': '3m',
		'mins': 'Larceny 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'With hands quicker than the eye, the Exalt relieves a hapless soul of his material burden. This Charm enhances a normal pickpocketing attempt (see p. XX). Unless contested by magic, this attempt cannot fail; when such a conflict arises, this Charm adds the Solar’s Essence in automatic successes. To use this Charm, the Exalt must be close enough to touch her target. In every other way, this Charm follows the rules of a normal pickpocketing attempt. The character may not steal items that are in use or artifacts that have been attuned.\nCharacters using ordinary senses cannot detect this theft with Awareness. Characters with inhuman sensory acuity, such as a spider feeling vibrations in its web, or those using magic, like a Celestial Lion’s Intemperate Gaze, suffer a -4 dice penalty to spot the theft. Flawless Pickpocketing Technique is also completely immune from magic that detects Larceny-based actions, unless the user also knows Flawless Pickpocketing Technique.'
	}, {
		'name': 'Stealing from Plain Sight Spirit',
		'cost': '6m',
		'mins': 'Larceny 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Flawless Pickpocketing Technique',
		'desc': 'Long ago, the Solars stole the implements of their virtue from beneath the gaze of the gods’ own masters. This Charm is similar in all ways to its prerequisite, except that it allows the Solar to steal an object from plain sight. The Exalt might swipe a book from a table or take a sword from a soldier’s scabbard. Such a theft cannot be noticed for (Essence) minutes unless circumstances call attention to it, such as a soldier attempting to draw his stolen blade.'
	}, {
		'name': 'Magpie’s Invisible Talon',
		'cost': '1wp',
		'mins': 'Larceny 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Stealing From Plain Sight Spirit',
		'desc': 'The Exalt moves with imperceptible speed, manipulating Essence flows to steal an object out of reach. This Charm supplements a normal attempt to steal or pickpocket, save that it gives the Solar’s attempt double 9s and allows her to reach an object (Essence) yards away. She may even steal objects behind glass without disturbing the glass through use of this Charm.'
	}, {
		'name': 'Skillful Reappropriation (Phantom Sting Search)',
		'cost': '6m',
		'mins': 'Larceny 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Magpie’s Invisible Talon',
		'desc': 'The Exalt can plant evidence on a target’s person infallibly. The mechanic modeling this Charm is identical to a pickpocketing attempt enhanced by Flawless Pickpocketing Technique—with the same rules for supernatural detection—save that it hides an object on the target’s person. Such an action cannot be noticed for (Essence × 10) minutes, unless circumstances call attention to it. Trying to hide an anchor in an old man’s rucksack will have undesired effects.\nIn addition, as long as the object remains on the target’s person, the Exalt can reflexively retrieve the item without contest, so long as she is close enough to touch the target. Though the Lawgiver does this with incredible speed, to all onlookers it will be obvious that she lifted the object from the target.'
	}, {
		'name': 'Reversal of Fortune',
		'cost': '4m',
		'mins': 'Larceny 4, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Flawless Pickpocketing Technique',
		'desc': 'Stealing from the Lawgiver is a risky proposition at best. With this Charm, the Exalt gains two automatic successes to an Awareness roll to detect any attempt to pickpocket from her person.\nUpon successfully noticing an attempted theft with this Charm, the theft is not only thwarted, but the thief is left open to reprisal. If the thief is close enough to touch, the Lawgiver becomes aware of every object on his person that may be stolen (as per the rules of pickpocketing on page XX) and can attempt to steal one of these objects with all of the same advantages as Flawless Pickpocketing Technique.'
	}, {
		'name': 'Iron Wolves’ Grasp',
		'cost': '3m, 4 Initiative',
		'mins': 'Larceny 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Stealing from Plain Sight Spirit, Reversal of Fortune',
		'desc': 'This Charm demonstrates the skill of a Lawgiver to steal the very weapon from her foe’s hand. When used, this Charm alters a disarm gambit (see p. XX) in the following ways:\n• The cost of the gambit is replaced by the cost of the Charm.\n• The gambit is considered a reflexive action rather than a combat action, leaving the Exalt free to attack in addition to disarming. Doing so carries no Defense penalty.\n• The Lawgiver’s Initiative roll gains double 9s.\nOn a success, the Exalt steals her target’s weapon. If the stolen weapon is an artifact, it breaks the target’s attunement and allows the Exalt to commit motes to instantly attune the weapon. If the Exalt cannot or will not pay these motes, the weapon is merely cast aside as if it were disarmed normally.\nA Solar who uses whips, lassos, rope darts or other prehensile weaponry may use this Charm at the range of her weapon.'
	}, {
		'name': 'Flawlessly Impenetrable Disguise',
		'cost': '6m',
		'mins': 'Larceny 4, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Until the Exalt sleeps',
		'prereqs': 'None',
		'desc': 'Master chameleons, the Solars donned disguises and attended the fetes of the raksha, to hear them confess their nefarious plans for Creation. This Charm recreates a disguise attempt (see p. XX), but allows the Exalt to make a myriad of extraordinary changes to her appearance. She may change her gender, double her age or halve it, alter her height by ten inches in either direction, change her ethnicity, adjust her voice and alter her accent. She can even change her scent. The Solar gains two automatic successes to her disguise attempt, ignores penalties for adapting a different race or gender, and gains double 9s.\nThis disguise cannot be pierced by mundane senses. Nor can it be thwarted by inhuman sensory acuity, such as the nose of a hound or the eye of a hawk. Senses heightened to supernatural levels by Charms such as Keen Sight Discipline have a chance to pierce this deception, but operate at a -2 success penalty to do so. Magic which pierces this effect does not reveal the Solar’s identity, only that the Exalt is not what she appears to be.\nTypically Solars used this Charm to hide their identities or to appeal to specific criteria such as “Only women are allowed into the sept.” However, should it be used to impersonate a specific character, magic which pierces this effect will only reveal the apparent body double of the Charm’s subject. For example, if the Solar disguises herself as the Scarlet Empress, magic which pierces her disguise will see her as a tall, porcelain-skinned red-haired woman with cunningly accurate makeup, as opposed to what the Solar actually looks like.'
	}, {
		'name': 'Flashing Ruse Prana',
		'cost': '10m, 1wp',
		'mins': 'Larceny 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Flawlessly Impenetrable Disguise',
		'desc': 'With a rending of air, the Solar sweeps away the mask she once wore. This Charm supplements a disguise attempt by reducing the time it takes from five minutes to instant. When used in combination with another Larceny-based disguise Charm, ignore the Willpower cost.'
	}, {
		'name': 'Perfect Mirror',
		'cost': '--(5m, 1wp)',
		'mins': 'Larceny 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'Mute',
		'duration': 'Permanent',
		'prereqs': 'Flawlessly Impenetrable Disguise',
		'desc': 'The Exalt shows only what she wishes to be seen. Discarding all other facets, she becomes a continuous unity of form.\nThis Charm upgrades its prerequisite, replacing the cost and allowing the Exalt to disguise herself as a specific person without suffering a penalty for impersonating a specific character, or for changing her body type significantly. In addition to the bonuses associated with Flawlessly Impenetrable Disguise, it also adds (Essence) non-Charm successes to the roll to establish the disguise.\nThe impersonation is perfect. It cannot be pierced by mundane or inhuman sensory acuity. Characters are not entitled to attempt to see through the disguise unless the Solar behaves in a grossly inaccurate way. Even so, those using Charms or other magic to penetrate the disguise suffer a -4 dice penalty to do so. In addition, should they fail at this attempt, their next attempt suffers an additional -1. This penalty cannot exceed -5.\nIn addition to these effects, the Exalt may adapt Essence-based visual dynamics not covered by simple makeup or disguise. Her hair might stand on end and crackle with lightning; she might hover inches off the ground or display the anima of a different kind of Exalt. None of these displays are real. That is, displaying a Fire Aspect’s anima will not actually burn anything, though witnesses will feel the intensity of its heat. She may appear to float, but her feet are still touching the ground.'
	}, {
		'name': 'Split Deception Method',
		'cost': '5m per disguise',
		'mins': 'Larceny 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Perfect Mirror',
		'desc': 'The Lawgiver walks through the valley of the wicked wearing a thousand faces. This Charm allows the Exalt to place a second disguise over the one she is wearing by attempting a second disguise action per the rules on page XX. This attempt may be supplemented by disguise Charms as usual. When she is seen wearing two or more disguises, the player dictates which disguise each witness is seeing. The Solar may sustain no more disguises than she has dots of Essence.'
	}, {
		'name': 'Null Anima Gloves',
		'cost': '12m, 1wp',
		'mins': 'Larceny 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Iron Wolves’ Grasp, Proof-Eating Palm, Skillful Reappropriation (Phantom Sting Search)',
		'desc': 'The Solar walks among the wicked as a demon and a saint. Gathering all the speed and skill of her hands into the channel of her Essence, her talent is forced out through her skin, manifesting in a burning corona that coats her hands in the fires of her anima.\nFor a moment, the gloves suffuse her hands and blaze. For the next thirty seconds or two rounds, whichever comes first, no member of a criminal organization nor creature of darkness may Join Battle against the Lawgiver or roll to attack her. During this time, each of her allies gains +3 automatic successes to any attempt to escape the scene.\nAfter this effect ends, her hands continue to blaze. She may mute the effect with just a thought: her Null Anima Gloves fade to invisibility. They are still there, however. Should she use her hands to block an attack, land a strike, or steal an object, they will flash and hum back into existence, and remain that way until she banishes them. This is merely a visual display, however…\nNull Anima Gloves convey the following powers:\n• Raiton’s Unerring Claw: Once per full anima progression, she may reroll any Larceny-based action involving her hands.\n• Flashing Whip, Silent Whip: Once per day, she may use a free full Larceny Excellency to enhance an attempt to pickpocket or steal from plain sight.\n• Seize the Day: In combat, she may use a gambit which costs 3 Initiative to make a Dexterity + Larceny based decisive attack against her opponent, with double successes on the Initiative roll. If she succeeds, she regains 4 Initiative and steals an additional amount from the opponent equal to her Dexterity, adding it to her own total. The Exalt must be close enough to touch her opponent to use this technique and must use her hands to make the attack. Seize the Day can only be used once per battle, but it is automatically reset when the Solar climbs to 15+ Initiative after landing a decisive attack which returns her to base Initiative.\n• Dream-Ending Gesture: With a curt flash of her hand, the Solar rips away the proof of her foe’s divinity. The Exalt uses a gambit costing 5 Initiative, making a Dexterity + Larceny based decisive attack against her opponent, with double successes on the Initiative roll. If the Exalt’s gambit succeeds, she steals a number of motes equal to her extra successes on the attack, adding them to her peripheral or personal motes. Dream-Ending Gesture can only be used once per scene.\n• Steal Inertia: Once per battle the Exalt may reflexively enact a Dexterity + Larceny Clash against an attack. This Clash is enhanced by (Essence) automatic successes. If her successes cancel her opponent’s, she can be seen to stop the blow with her blazing, anima-suffused hands, and may automatically respond with a Disarm Gambit at no cost, using extra successes on the Clash as automatic successes to her Gambit’s Initiative roll.\n• Hand-Spear Convocation: Upon stealing an artifact, she experiences a rush of power that surges through her body and floods into her hands, supplying the motes needed to attune the artifact, effectively reducing the cost of attunement to 0. This may only happen once per scene.'
	}, {
		'name': 'Night’s Eye Meditation',
		'cost': '5m',
		'mins': 'Larceny 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One turn',
		'prereqs': 'Null Anima Gloves',
		'desc': 'The Solar is a master of deception, and is aware of any challenge to her position. Each time a character attempts to counter a Larceny based action or disguise with Investigation or Larceny, the Lawgiver may use this Charm to add 10s on her opponents’ attempts to her own results for one turn. This retroactively makes her disguises harder to pierce and actively makes her sleight-of-hand and pickpocketing harder to notice.'
	}, {
		'name': 'Unbroken Darkness Approach',
		'cost': '--',
		'mins': 'Larceny 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Night’s Eye Meditation',
		'desc': 'In the deepening Age of Sorrows, the Lawgiver shines in the darkness. This Charm allows the Exalt to apply a free full Larceny Excellency to any action once per scene. This Excellency has the mute keyword. This Charm also has the special property of muting any Charm the Exalt uses that same instant, if she so chooses.'
	},

	// Linguistics	

	{
		'name': 'Whirling Brush Method',
		'cost': '3m',
		'mins': 'Linguistics 1, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'A Solar with this technique writes with superhuman speed. The Exalt pens brief social influence or short communiqués with incredible speed—she can write a full-page letter in just seconds, while shorter missives may be constructed almost instantly. She can also quickly copy massive volumes of information. This Charm does not allow her to produce new work longer than a few pages, but she may flawlessly copy a written work of any length as she reads it, writing quickly enough that she may copy a large book in a single day, or prepare a document that would take hours to transcribe in a matter of minutes. The Solar can even perfectly transcribe a rapid conversation between multiple parties. The Solar may also quickly copy maps—though this Charm lends nothing to her artistic ability, she is able to convey all the information the original conveys, such that one could be substituted for the other, in function if not in form. This Charm does not destroy pens from writing too fast, but such instruments do wear down at the regular speed, and the Solar’s writing consumes the normal amount of ink. As this Charm entails a dramatic action in which the Solar copies a work, the duration of the effect varies. In each scene where the Solar uses Whirling Brush Method, each additional activation costs only one mote.'
	}, {
		'name': 'Flawless Brush Discipline',
		'cost': '1m',
		'mins': 'Linguistics 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Whirling Brush Method',
		'desc': 'The Solar concentrates all of her talent into a perfect expression of form. With this Charm, she may perfectly copy any written work down to the finest detail. Her flawless precision makes her script impossible to tell apart from the original, allowing her to create a perfect replica of a work. If the Exalt focuses intently on aesthetic elements, she may even use this Charm to copy them, flawlessly reproducing pictograms, illustrations and even maps. The Exalt may also forge signatures effortlessly, but cannot use this Charm to forge seals or other impressions affixed to a document. It is impossible to pierce this deception through normal means. Magic which can detect the Solar’s forgery must overcome a difficulty equal to the Solar’s Linguistics + Essence score at the time of writing.'
	}, {
		'name': 'Stolen Voice Technique',
		'cost': '3m',
		'mins': 'Linguistics 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Flawless Brush Discipline',
		'desc': 'The Lawgiver’s keen ear, sharp eye and steady hand makes her an inveterate thief of words. With this Charm, the Solar can adapt the writing voice of another character. The Solar need only have read one manuscript or three smaller examples of the character’s writing in order to perfectly mimic their writing style. This Charm does not mimic the effects of Flawless Brush Discipline, so the Solar may need to use that Charm to make her script all the more deceiving. Like the prerequisite, the difficulty to pierce this deception is the Solar’s Linguistics + Essence score at the time of writing. Combining this Charm with its prerequisite raises that difficulty by one. Stolen Voice Technique’s deception is automatically successful unless the target has a reason to scrutinize the writing.'
	}, {
		'name': 'Moving the Unseen Hand',
		'cost': '4m',
		'mins': 'Linguistics 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Stolen Voice Technique',
		'desc': 'The Exalt pens a message in a hand so artful and deceptive that she can cause her reader to make an automatic assumption as to the writer’s identity. Upon writing the message, roll Manipulation + Linguistics with (Essence) automatic successes to determine the strength of the deception when compared to the target’s Resolve. To use this Charm, the Exalt must not sign the missive in question; the unsigned letter invites the assumption that allows this Charm to take effect.\nThe Exalt may use this technique in three different ways: She can make readers believe a message was written by a specific person of whom they are aware—they do not need to know this character on a personal level. She can also make readers assume the letter was written by the person they most want the letter to be from. Lastly, if the Solar has Bureaucracy 3+, she can make the reader assume the letter was written by a hierarchical superior.\nDespite being a Simple-type Charm, Moving the Unseen Hand can always be used in combination with its prerequisite; failure to see through Stolen Voice Technique makes the character automatically subject to Moving the Unseen Hand’s deception.'
	}, {
		'name': 'Power-Snaring Image',
		'cost': '-- (1m, 1wp)',
		'mins': 'Linguistics 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Stolen Voice Technique',
		'desc': 'When the Lawgiver is using Flawless Brush Discipline, she may channel this power to perfectly copy any magic encrypted into the document she is copying, so long as she is capable of producing that magic herself. She does not need to pay the costs of any Charms her copy reproduces—those effects are reproduced automatically and perfectly. At Essence 5+, she may reproduce the written magic effects of the Charms of any being, even those who are not Solar Exalted, so long as her traits meet or exceed the magic’s minimums.'
	}, {
		'name': 'Flashing Quill Atemi',
		'cost': '1m',
		'mins': 'Linguistics 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One minute',
		'prereqs': 'Power-Snaring Image',
		'desc': 'The Lawgiver strikes a body of text with her fingers, reshaping the language to serve her purposes. With this Charm, the Solar may edit a manuscript, letter, or tome with untraceable precision. Where she draws her fingertips through lines, words lift from pages as if they were never written. Where she draws her fingertips through runes, ink chases itself into the shapes of new words. Through use of this Charm, the Solar can change the targets of written social influence, and can redefine what is intended by any social influence she encounters. Modifying a work encrypted with magic allows her to redirect the targets of that magic. If she wishes to alter magic she is incapable of producing, she must be Essence 5+ and must use Power-Snaring Image in combination with this Charm. This combination explicitly allows her to alter magic for which she does not meet the minimums.'
	}, {
		'name': 'Perfect Celestial Author',
		'cost': '--',
		'mins': 'Linguistics 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Flashing Quill Atemi',
		'desc': 'While using Flashing Quil Atemi, the Lawgiver can edit a manuscript to combine Simple-type Charms or effects which could otherwise not coexist. Thus, she could use Letter-Within-A-Letter Technique and Cup Boils Over to kill someone with what appears to be a love letter.'
	}, {
		'name': 'Letter-Within-A-Letter Technique',
		'cost': '4m',
		'mins': 'Linguistics 3, Essence 1',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'By carefully injecting allusions, subtle stresses and loaded word choices, the Exalt can imbed a secret message in a document of seemingly innocuous character—a shopping list, a bill of lading or even a quickly dashed note. The Solar must be familiar with the recipient in order for them to see the hidden missive. The hidden message can be no longer (in words) than half the length of the cover document. Magic that can break the Solar’s code automatically costs an additional Willpower and must beat a difficulty of the Solar’s Linguistics or the highest difficulty of any magical encryption inscribed into the text.'
	}, {
		'name': 'Essence-Laden Missive',
		'cost': '1m',
		'mins': 'Linguistics 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Mute, Psyche',
		'duration': 'Instant',
		'prereqs': 'Letter-Within-A-Letter Technique',
		'desc': 'The Exalt can infuse a short statement with Essence, such that the Essence travels through the reader’s mind to escape through their tongue. A character who reads such a missive will immediately and unironically repeat the statement they just read without realizing they are doing so. This is not a Charm which simply forces the character to read aloud, but rather causes them to announce the missive. This is treated as a Charisma or Manipulation + Linguistics inspire action with (Essence) automatic successes.'
	}, {
		'name': 'Voice-Caging Calligraphy',
		'cost': '2m, 1wp',
		'mins': 'Linguistics 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Mute, Psyche',
		'duration': 'Instant',
		'prereqs': 'Essence-Laden Missive',
		'desc': 'The Solar binds her words with Essence, folding language into form so winding and deep that all meaning falls into the abyss. This Charm may be used to supplement the writing of letters or other brief works. The information contained in such writing cannot be repeated. The reader momentarily loses their ability to process or remember the contents of the message if they try to speak it aloud or write it down. Any attempt by the reader to communicate what they know is rendered useless unless they see an action occurring in which a defining Intimacy is threatened by withholding what they know. Only then may the reader pay (Solar’s current Essence rating) Willpower to shake off the effects of this Charm.'
	}, {
		'name': 'Mind-Swallowing Missive',
		'cost': '8m, 1wp',
		'mins': 'Linguistics 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'Psyche',
		'duration': 'Indefinite',
		'prereqs': 'Essence-Laden Missive',
		'desc': 'The Solar unwinds language with her Essence, writing in such a way that it unbinds the pattern of her reader’s understanding. This Charm supplements a letter written to a specific target, the Solar rolling Manipulation + Linguistics to determine its accuracy. If her target reads the letter, they must roll their Perception + Linguistics to defend against a swarm of unbinding words that penetrates their mind where languages live. If they fail, their knowledge of all languages is unbound, causing them to forget every language they are currently able to speak. In addition, the subject develops a completely new language on the spot. This language is both functional and logical—and has letters and grammar mechanics—but it is known only to the Charm’s victim. The Exalted may break this control by paying (Solar’s Essence rating) Willpower, instantly recovering one of their spoken languages and another every hour until their knowledge has been restored. Otherwise, this effect lasts until the Solar lifts the commitment. When Mind-Swallowing Missive is broken, the subject’s new language vanishes from their memory. This Charm does not affect spirits.'
	}, {
		'name': 'Cup Boils Over',
		'cost': '1m',
		'mins': 'Linguistics 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Written-only',
		'duration': 'Instant',
		'prereqs': 'Mind-Swallowing Missive, Voice-Caging Calligraphy',
		'desc': 'The Lawgiver pens a soul-shattering missive, convicting her subject of leading a pointless existence. This Charm can only be directed at a specific target. Roll the Exalt’s Charisma or Manipulation + Linguistics, rerolling 6s until 6s fail to appear. If she beats her target’s Resolve, their soul falls off and sinks directly into lethe. Even the lowliest hobgoblin has discernable passions; this Charm only targets characters who have unintelligibly abstruse Intimacies or no Intimacies at all. Characters who are incapable of feeling (such as the soul-eaten victims of the Fair Folk) are never subject to this Charm.'
	}, {
		'name': 'Strange Tongue Understanding',
		'cost': '1m',
		'mins': 'Linguistics 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Tuning Essence through her language centers, the Exalt reconciles a character’s vocal tone, inflection, and gestures into a clear statement of intent. This allows her to accurately interpret statements made in languages she doesn’t know. As the Solar’s concentration congeals into a moment of perfect clarity, she must evaluate each statement separately. Each activation of this Charm allows her to understand three or four simple sentences or one long, complex sentence. The Solar may also use this Charm to reflexively lower the Guile of a speaker using abstruse language to conceal an issue or artificially inflate the importance of a topic, reducing their Guile by one.'
	}, {
		'name': 'Poetic Expression Style',
		'cost': '1m',
		'mins': 'Linguistics 4, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Strange Tongue Understanding',
		'desc': 'Through gesture, movement, and carefully shaped facial expressions, the Solar may clearly communicate short, simple sentences through body language and pantomime. This Charm ignores the penalty for such communications, and allows for additional complexity, but does not allow for poesy. Therefore, “Open the gates now, or I will return with an army,” is valid, while “Fill your hands with steel and prepare to dance, you devils,” is not. As such, all social influence made with this Charm suffers a three success penalty.'
	}, {
		'name': 'Mingled Tongue Technique',
		'cost': '4m, 1wp, plus 3m per language',
		'mins': 'Linguistics 5, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'The Exalt can bind together any two languages she knows into a third language which is intuitively understood by those listeners who understand at least one of the base languages. For four motes, one Willpower, she uses her Essence to fuse two such languages together. For each additional three motes committed, she may fuse an additional language into the strain. A Solar who is gifted with knowledge of many languages can become the unifying voice of nations.'
	}, {
		'name': 'Single Voice Kata',
		'cost': '5m, 1wp',
		'mins': 'Linguistics 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Mingled Tongue Technique',
		'desc': 'There is a point in the infinite distance where purity and entropy touch. That point is both “before” and “after” but the Solar may reach it with a thought, to draw forth perfect language. While this Charm is active, the Solar speaks a language that can be understood by all who hear it. Knowledge of this language is purely instinctual; characters understand the Solar’s words as she shapes them. Her perfect language cannot be learned, as it has no intelligible words, letters or mechanics. Consequently, it cannot be repeated back to the Solar such that she would comprehend it. This Charm allows purely one way communications, imparting no knowledge of languages the Solar has not yet learned. Spirits despise being addressed by a Solar using this Charm, and the Fair Folk feel physical pain to hear it spoken. A Solar should only use this Charm against such beings if she deliberately intends to cause offense.'
	}, {
		'name': 'Excellent Emissary’s Tongue',
		'cost': '6m',
		'mins': 'Linguistics 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Single Voice Kata, Strange Tongue Understanding',
		'desc': 'With this Charm, the Exalt may learn to speak and understand a language just by hearing it spoken. The Exalt must spend at least an hour being exposed to the language conversationally. She does not need to be the target of such talk, and can gain this exposure any number of ways: sidling a group of strangers, listening to a carnival barker, and attending a play are all valid examples. After an hour, the Exalt may activate this Charm. At that moment, her understanding of language congeals. As her Essence races to encompass this new system of words, she can speak and understand her new acquisition perfectly, though she retains a -3 dice penalty to social influence until she has retained and practiced the language intensely for a week. The Solar’s understanding of this language is predicated by her commitment of Essence to the effect. Should she release the motes she has committed to this Charm, her knowledge of the language fades within the hour. However, if she works with an acquired language for a season or more, she learns it permanently and for free, and may safely end her commitment to the effect.'
	}, {
		'name': 'Subtle Speech Method',
		'cost': '3m',
		'mins': 'Linguistics 3, Essence 1',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'One idea conveyed',
		'prereqs': 'None',
		'desc': 'The Solar speaks in a roundabout fashion, stressing particular words, inflections and allusions to convey ideas and concepts that may have nothing to do with what she is saying. Only the intended recipients can understand the true meaning of the Solar’s words; everyone else just hears what the Solar says on the surface. Thus an Exalt using this Charm could appear to discuss the weather while laying out the details of an assassination plot. This Charm does not confer the ability to communicate across language barriers.'
	}, {
		'name': 'Sagacious Reading of Intent',
		'cost': '4m, 1wp',
		'mins': 'Linguistics 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar’s wit is incisive and her mind is canny. By reading a text, she also may read its author. The Solar may invoke this Charm after reading a text but before any social influence is rolled or checked. This allows the Solar to make a (Wits, Charisma, or Manipulation) + Linguistics-based read intentions action that is automatically successful. In that moment, she instantly knows if the writing contains any of the author’s Intimacies, and what those Intimacies are. This may come across as a clear slant or bias in the narrative, or a sense of mood or emotion in the writing which highlights the context of a tie. This Charm does not reveal the writer’s hidden motives behind any work, but it can reveal the absence of any Intimacies in the writing, potentially denoting that the work is a forgery, a copy, or that the author didn’t believe what they were writing.'
	}, {
		'name': 'Word-Shield Invocation',
		'cost': '2m',
		'mins': 'Linguistics 5, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Sagacious Reading of Intent',
		'desc': 'If the Exalt suspects she is about to suffer negative influence, she may use this Charm after using Sagacious Reading of Intent, raising her Resolve by half her Linguistics, rounded up, before her Resolve is compared to the influence’s recorded successes.'
	}, {
		'name': 'Vanishing Immersion Style',
		'cost': '1m',
		'mins': 'Linguistics 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Word-Shield Invocation',
		'desc': 'The Solar dwells in a temple of words. With this Charm, she may affect a textual absorption so complete that her Guile becomes perfect and unbreakable. So long as she is reading, she cannot be read. This effect lasts for moments after she has finished reading, allowing the Exalt to completely hide her reaction to what she just read. Using this Charm with Perfect Recollection Discipline allows the Solar to phase out completely, evading prying questions and other attempts to gauge her. In this instance, her defense is no longer perfect, and her Guile may be engaged. However, without magic to pierce her deception, characters will only notice that she is extremely preoccupied or distracted.'
	}, {
		'name': 'Discerning Savant’s Eye',
		'cost': '1m, 1wp',
		'mins': 'Linguistics 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Sagacious Reading of Intent',
		'desc': 'The Exalt can make out the minute traces of writing that was once readable but has now been damaged or erased. Examples include palimpsests, water-soluble inks that have been left in the damp, and stone monuments that have been rendered unreadable by vandalism or the elements. This Charm cannot read the writing on inscriptions that have been crushed into sand or letters that have been burned to ashes. This Charm does not convey the ability to understand a language the Solar cannot normally read, but she may use this Charm in concert with Flawless Brush Discipline to make a perfect, undamaged copy of the original script for later translation.'
	}, {
		'name': 'Perfect Recollection Discipline',
		'cost': '1m per work',
		'mins': 'Linguistics 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Discerning Savant’s Eye',
		'desc': 'Binding a written work or illustration into her consciousness, the Solar creates a perfect memory. A character using this Charm can perfectly memorize such a work in the time it takes to read or study it, activating this Charm to store a mental record of the completed subject. She may then pay one mote to reference any part of the work. As long as she continues to reference the stored work at least once a week, she maintains a perfect memory of any part of it. Once she has maintained such use for a season, the information becomes ingrained and innate, and she no longer needs to pay. If such knowledge fades, the Solar need only pay one mote to revive her memory of the work. Note that this Charm is not a generally eidetic memory: it only conveys memories of that which has been recorded through a medium of language. She can remember what was written on a road sign, but she might be unclear as to where she encountered that sign or what the sign itself looked like. Likewise, memories created in relation to this Charm are not necessarily dependent on magic. Knowledge of a book’s contents, and specific phrases which were significant to her, or which she accessed with this Charm, may stay in her memory after knowledge of a work fades.'
	}, {
		'name': 'Mind-Scribing Method',
		'cost': '5m, 1wp',
		'mins': 'Linguistics 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Perfect Recollection Discipline',
		'desc': 'Even chained in a lightless dungeon, the Lawgiver can write a book that transforms the world. This Charm allows the Solar to engage an extended roll to produce a long work (see p. XX) without requiring that she have any writing instruments. The Exalt stores her progress mentally, and may copy it down at her earliest convenience. There is no limit to how many novels, epics, and dogmas the Exalt may store in this fashion. As the Solar is copying her own work, she may use a combo of Whirling Brush Method and Perfect Recollection Discipline to copy a remembered work with tremendous speed. The Solar is explicitly permitted to enhance any writing she composes in her head with other Linguistics Charms, even those with the Written-only keyword.'
	}, {
		'name': 'Heaven-Drawing Discipline',
		'cost': '8m, 1wp',
		'mins': 'Linguistics 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Mind-Scribing Method',
		'desc': 'The Essence of the universe flowing through her mind, the Solar draws on a library of words as deep as the celestial vault. This Charm magnifies the Solar’s ability to compose massive volumes of complex information, allowing her to complete difficult manuscripts with increased speed. This Charm supplements an extended roll to produce such work (see p. XX), automatically reducing the interval by one unit, from years to seasons, seasons to months, and months to weeks. While this Charm greatly speeds the Solar’s efforts, it does not directly influence the mechanical speed with which she lays down words—her speed is increased by a streamlining of thought processes and an amplification of the mental faculties that surround vocabulary and dissemination skills, rather than an increase of manual dexterity. The Exalt must use this Charm against each interval she wishes to shorten, and must be able to dedicate the required time and writing instruments to the task. If this Charm is used in combination with its prerequisite, ignore this Charm’s Willpower cost.\nA repurchase at Essence 4+ allows the Exalt to pay twelve motes, one Willpower, to reduce an interval by two units. Reducing the work of years to months, or seasons to weeks is a challenging feat if the Solar does all the work mentally; if she is physically writing, she may need Whirling Brush Method to keep up with the speed at which she can process ideas. The Lawgiver may not yet reduce production time of a tome to less than a unit of weeks.\nA second repurchase at Essence 5+ allows the Exalt to pay fifteen motes, one Willpower, to reduce an interval by a full three units of time. An Exalt with this Charm can reduce the time it takes to produce work from weeks to days, and from days to hours. If the Lawgiver is writing as she works, she will not get the full speed of her creative process without the use of Whirling Brush Method, and even then, she may be seen to spend several sleepless nights constructing single massive works.'
	}, {
		'name': 'Swift Sage’s Eye',
		'cost': '1m',
		'mins': 'Linguistics 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'One text',
		'prereqs': 'Perfect Recollection Discipline',
		'desc': 'Mind quickened by flowing Essence, the Exalt reads at superhuman speed. She can read a scroll as quickly as she can unroll it, and a book as fast as she can turn the pages—approximately three pages per second.'
	}, {
		'name': 'Flowing Elegant Hand',
		'cost': '2m',
		'mins': 'Linguistics 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Mute, Written-only',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Drawing on the Essence of her formidable mind, the Exalt perfects her arguments and sharpens her words, so that her writing is pristine, flawless and precise. This Charm supplements written Linguistics actions with double 9s.\nAt Linguistics 5+, Essence 3+, she may repurchase this Charm, learning a three mote version that doubles 8s. This repurchase requires that she know Flawless Brush Discipline.\nAt Linguistics 5+, Essence 5+, she may purchase this Charm a third time, learning a four mote version that grants double 7s.'
	}, {
		'name': 'Twisted Words Technique',
		'cost': '1m, 1wp',
		'mins': 'Linguistics 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Psyche',
		'duration': 'Instant',
		'prereqs': 'Flowing Elegant Hand, Letter-Within-A-Letter Technique, Subtle Speech Method',
		'desc': 'Concentrating on the formation of sounds and the weight of certain meanings, the Solar shapes her words like a weapon. This Charm is a mental attack disguised as social influence, entailing a written or spoken action made with Manipulation + Linguistics (or another relevant Social Ability). The Solar must target an Intimacy when using this Charm—exploiting something the character cares about to get them to accept influence. However, upon success, the target will feel overwhelmingly compelled to act in a way that is the opposite of what she agreed to, as if her Intimacy had been inverted. For example, a Solar could convince an Immaculate priest of the evils of the harlotry in Great Forks, convincing her to shun the temple prostitutes. The priest agrees vehemently, and then goes to live with the whores. Likewise, a Solar forced to brainwash a Circle member could outwardly torture him, while actually strengthening his Intimacies of love for her, and his understanding of why his suffering is necessary. Once successful, persuasion caused by this Charm can’t be resisted with Willpower until another character successfully dissuades the target from a chosen course of action (see p. XX), and upon doing so, the target must pay (Solar’s Essence) Willpower to break free. Intimacies tainted by this Charm are more insidious—they are both harder to root out, but also indecipherable from what a character truly believes. While Transcendent Hero’s Meditation (see p. XX) can shatter persuasion caused by this Charm, it can’t change the Solar’s Intimacies, though it does make her realize how they have been influenced.\nOn Twisted Words Technique\nThis Charm doesn’t actually invert Intimacies, though it ultimately causes characters to behave as if it did. When used to instill beliefs, this Charm may strengthen or weaken Intimacies as a normal instill action would. The difference is that it appears to strengthen an Intimacy when it is actually weakening it, or strengthens an Intimacy that it appears to weaken. For example, “You certainly look noble in purple,” convinces someone that they look like a fool in purple, while “I can’t stand you, you’re insufferable,” only increases their desire to be around you. Just as a normal instill action, it may also be used to create contradictory Intimacies, though it appears to create an Intimacy which agrees. For example, one might get a monk with a defining Intimacy for the Immaculate Order to agree that the harlotry in Great Forks is bad far more easily than they would convince her that it is good. By using this Charm to convince her that it is bad, they convince her that it is good, giving her an Intimacy that, in some way, contradicts her core belief in the Immaculate Faith.'
	}, {
		'name': 'Unbreakable Fascination Method',
		'cost': '6m, 1wp',
		'mins': 'Linguistics 5, Essence 4',
		'type': 'Simple',
		'keywords': 'Psyche',
		'duration': 'Instant',
		'prereqs': 'Twisted Words Technique',
		'desc': 'The Solar speaks in such a magnetic and engaging fashion that those who can hear her become powerless to do anything but listen. Roll the Solar’s Manipulation + Linguistics with (Essence) automatic successes, ignoring the penalty for group influence. The Solar may not exploit targeted Intimacies to lower Resolve, nor may Intimacies be invoked to raise Resolve against this effect. Those who fail their Resolve checks are entranced by the Solar’s voice and are held enraptured until she ceases speaking for more than a few seconds. Even characters who don’t understand the Solar’s language can succumb to this power.\nThis Charm may also be used to ensnare and captivate a reader: if a character reads so much as a single line of writing reinforced with Unbreakable Fascination Method they must engage their Resolve, and if they fail, they must continue reading what the Solar has written in its entirety, though this Charm may only hold a reader rapt for (Essence) minutes.\nThis Charm may not be resisted with Willpower. Attack cancels the Charm, but only direct physical danger disrupts the effect. A brave or suicidal Exalt could keep a platoon of guards with her in a burning building until it was fully engulfed, but they would not stand there listening as the flaming timbers started crashing down around them.'
	},

	/*
	Performance

	[SIDEBAR]
	Don’t Get Stage Fright
	Unless they say otherwise, Solar Performance Charms ignore the penalty for group influence detailed on page XX.
	[/SIDEBAR]

	Omni-Applicable
	*/

	{
		'name': 'Masterful Performance Exercise',
		'cost': '2m',
		'mins': 'Performance 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar’s talent is not free or natural, but rather the hard-won excellence that comes from a lifetime of practice. This Charm supplements a Performance-based action, granting one automatic success and rerolling 1s until 1s fail to appear. This Charm also makes the Exalt’s 1s unavailable to magic that might interfere with her performance.'
	}, {
		'name': 'Soul-Firing Performance',
		'cost': '1m, 1wp',
		'mins': 'Performance 5, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Masterful Performance Exercise',
		'desc': 'With revelatory ardor and revolutionary sound, the Solar’s performance sends a shock through her audience. This Charm’s timing differs through various mediums: oratory requires a speech of at least six minutes in length, whereas a piece of music need only be three minutes long and dance need only be two. Roll Charisma + Performance with (Essence) automatic successes against the group’s Resolve. If successful, the group is struck with an emotion conveyed by the performance, and each affected target reconsiders a decision they made in their past, connected to that emotion. The Storyteller chooses what each character is forced to reconsider, putting each affected character into a decision point based on past influence. This Charm may only be used once per story.'
	}, {
		'name': 'Stillness-Drawing Meditation',
		'cost': '--',
		'mins': 'Performance 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Masterful Performance Exercise',
		'desc': 'The Solar draws power from the spirit of her audience. Whenever she successfully influences a large group with a Performance-based action, she regains (Essence) motes.'
	}, {
		'name': 'Trance of Fugue Vision',
		'cost': '5m, 1wp',
		'mins': 'Performance 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Stillness-Drawing Meditation',
		'desc': 'In the throes of a harrowing performance, the Solar is wracked with the zeal-fired alleluias of a revival. The Solar may activate this Charm when she has 10+ motes committed to sustaining other scene-length Charms. While this Charm is active, every time she attempts a social influence action of any kind, she gains a mote of Essence. In addition, for every two minutes she spends in performance, she gains a mote. Finally, the Exalt gains a mote of Essence for every 10 she rolls on a Performance action against a difficulty of at least 4, to a maximum of three 10-derived motes per action.'
	}, {
		'name': 'Penultimate Unity of Form',
		'cost': '2m, 1wp',
		'mins': 'Performance 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One Performance Action',
		'prereqs': 'Trance of Fugue Vision',
		'desc': 'Channeling Essence through her mastery of Performance, the Exalt can momentarily meld all performance styles into a single action. This Charm allows the Exalt to switch methods: what she could previously only accomplish with oration, she can now accomplish with a dance. Strumming her sanxian, she could start a riot, activating Fury Inciting Speech without ever saying a word. This does not change the definitions of supplemental Charms; the Exalt can perform Shining Expression Style by singing instead of dancing, but can’t use Graceful Reed Dancing to enhance her voice. If the Exalt’s influence is successful against her primary target, be it a group or a specific individual, she gains a point of temporary Willpower.'
	}, {
		'name': 'Soul-Bracing Momentous Power',
		'cost': 'Varies',
		'mins': 'Performance 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Penultimate Unity of Form',
		'desc': 'The Exalt reaches into the core of her being, tapping a primal harmony of Essence that makes her nearly impossible to resist. Before taking a social influence action, roll the Exalt’s Willpower, rerolling non-successes once. Remaining non-successes are spent as the Charm’s cost of activation in Willpower points. Successes act as non-Charm successes on the Exalt’s next social influence attempt. In addition, if this influence is successful, the affected character must pay three Willpower on (Solar’s Essence) different days before they can overcome the influence, and may only do so if confronted with how their actions might be damaging to their major or defining Intimacies.'
	}, {
		'name': 'Unmatched Showmanship Style',
		'cost': '--',
		'mins': 'Performance 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'Mute',
		'duration': 'Permanent',
		'prereqs': 'Trance of Fugue Vision',
		'desc': 'Filled with the power of the ages, the Solar’s divine Essence pours out through the fulcrum of her performance. Once per scene, as a mute effect, the Exalt may use a free full Performance Excellency. This effect may be reset by using Performance to achieve one of the Solar’s defining goals.'
	}, {
		'name': 'Soul Voice',
		'cost': '1wp',
		'mins': 'Performance 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One Performance action',
		'prereqs': 'Unmatched Showmanship Style',
		'desc': 'Calling upon the divine other, the Solar dwells in the temple of her body like a burning icon. Activating this Charm reduces the cost of all the Lawgiver’s Performance Charms to zero motes for one performance. This Charm may be used once per day, but may be reset when the Storyteller introduces a major element to the scene that changes a scene for the worse, such as the sudden arrival of Immaculate monks mid-performance.'
	}, {
		'name': 'Pivotal Encore Performance',
		'cost': '1wp, 1 lethal health level',
		'mins': 'Performance 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Soul Voice',
		'desc': 'Once per day, the Solar may reach down deep, buffeting her spirit with renewed power. Using this Charm resets Unmatched Showmanship Style and Soul Voice.'
	},

	// Utility

	{
		'name': 'Respect-Commanding Attitude',
		'cost': '5m',
		'mins': 'Performance 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'One Performance action',
		'prereqs': 'None',
		'desc': 'The return of the Solars is a miracle never before seen. The universe inclines to hear their voices once again. When this Charm supplements a Performance action of any length, characters are inclined to stop and listen. This does not guarantee that the Lawgiver is persuasive in her arguments, but it does guarantee that her audience listens respectfully to her entire performance. Characters may pay one Willpower to leave the performance, but if they wish to interrupt or attack the Lawgiver, they must pay two Willpower, and may only approach her by blending into her demonstration, capping the actions of each affected character by their individual Charisma + Performance ratings until one of them is able to successfully stop her act. This Charm does not function after combat has started, but remains active after Join Battle has been rolled, up until the Solar is forced to stop her performance.'
	}, {
		'name': 'Phantom-Conjuring Performance',
		'cost': '--(1m)',
		'mins': 'Performance 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Masterful Performance Exercise, Respect-Commanding Attitude',
		'desc': 'While under the effect of at least one of the prerequisites, the Exalt may pay one mote, conjuring phantom images from the Essence of her surroundings. These phantoms coalesce within short range of the Solar, and aid in illustrating her narrative. Apparitions might appear as small animals, person-sized characters, and allusions of scenery in a chiaroscuro.\nAt Performance 5+, Essence 3+, the Lawgiver’s apparitions grow larger and more robust. She can depict larger beasts and monsters and more substantial scenery. Phantoms may appear to curl from the smoke of her breath, the light of her eyes, or her very anima.'
	}, {
		'name': 'Memory-Reweaving Discipline',
		'cost': '10m, 1wp',
		'mins': 'Performance 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Psyche',
		'duration': 'Instant',
		'prereqs': 'Any five Essence 2+ Performance Charms',
		'desc': 'The Exalt weaves a narrative so plausible and compelling that those who hear it forget the truth and believe the narrative. The Solar speaks for at least a minute, though more complex narratives may require longer. Roll the Exalt’s Charisma or Manipulation + Performance against the group’s Resolve, subtracting successes instead of dice (see p. XX) for truly outrageous claims. Mere success entails a simple belief in the facts as the Solar has presented them. Extra successes, however, increase commitment to this belief. Affected characters gain a Resolve bonus equal to half the extra successes, rounded up, to defending their belief in the Solar’s narrative. Until that belief is shattered, they will act in direct agreement with the Solar’s version of events. In order to break their commitment, a character must present direct evidence to the contrary and defeat the character’s boosted Resolve. Failing to do so makes the character immune to further attempts to erode this belief for the rest of the day. Each time an unsuccessful attempt is made, the affected character’s bonus Resolve is diminished by two. Once the Solar has successfully changed a target’s memories, she may not make additional changes to that character’s mind with this Charm until the initial belief has been completely broken. The Solar may target herself with this Charm, but doing so earns her a single point of limit in addition to the Charm’s cost.\nAt Essence 4+, the Solar may use this Charm up to (Essence) times on a single character, including herself.\nAt Essence 4+, the Solar may repurchase this Charm, teaching herself a five mote, one Willpower, instant, reflexive version of this Charm that may only target a single character. The Solar distills an entire soul-binding speech down to a single statement, allowing her to change a target’s memories mid-conversation.'
	}, {
		'name': 'Demon Wracking Shout',
		'cost': '10m, 1wp',
		'mins': 'Performance 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': '???',
		'desc': 'Long ago, the Solars slew the enemies of the gods. Now those demons lie ancient and forgotten, dreaming beyond the pale of time. What language may name the ancient nemeses? What words have erased, music will never forget. Sometimes, when a Solar is performing an exceptionally difficult or creative song or dance, they become aware of a memory older than themselves. The presence of demons can also trigger the sensation of knowing the form of this technique. Upon perceiving this Charm, the Solar reaches out and grasps the tendril of its Essence, drawing it into her mouth, swallowing and binding it into her throat. The player pays 8 or 10 experience points as normal, but may go into experience debt (see p. XX). The Charm is learned instantly, and may be unleashed by paying the cost. Demon Wracking Shout unleashes a sonic blast that is merely terrifying to most creatures, but does a non-physical Charisma + Performance decisive attack on all demons and spiritual creatures of darkness within long range of the Solar, with (Essence) automatic successes. The attack cannot be dodged, only parried, and adds ten dice to the Solar’s Initiative for determining base damage. This attack strikes dematerialized demons as easily as the material. This Charm may only be used once per fight.'
	},

	// Oratory

	{
		'name': 'Impassioned Orator Technique',
		'cost': '1m',
		'mins': 'Performance 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Masterful Performance Exercise',
		'desc': 'The Solar speaks with the voice of Heaven, magnifying her authority. This Charm supplements a Performance-based speech, granting it double 9s.'
	}, {
		'name': 'Fury Inciting Speech',
		'cost': '5m, 1wp',
		'mins': 'Performance 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Impassioned Orator Technique',
		'desc': 'The Lawgiver speaks out against injustice, and a spirit of divine wrath falls over her audience. The Exalt harangues a crowd for at least ten minutes, exposing an injustice that has been done—typically playing on those specific principles of faith, tradition, or morality that are popular with her audience. This acts as a Charisma or Manipulation + Performance inspire action against the average Resolve of the crowd. If successful, the speech ignites anger at a specific cause, but leaves the mob as a disorganized, riotous mass. However, for every three extra successes on the roll, the Solar’s player can direct the mob at a single target linked to the crowd’s anger. For example, with nine extra successes, the Solar could lead a mob in Nexus to attack the Guild Hall, set fire to the docks as a distraction, and free the slaves on auction row.'
	}, {
		'name': 'Dogmatic Contagion Discipline',
		'cost': '1m, 1wp',
		'mins': 'Performance 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Fury Inciting Speech',
		'desc': 'The Solar’s arguments and invocations resonate with her audience so profoundly that they are filled with her fiery passion. When the Solar uses oration to inspire a crowd, she may supplement the roll with this Charm. Extra successes on the roll are passed as bonus dice to those characters who she is able to successfully influence, for the express purpose of passing on the Solar’s influence. Such characters will retain these bonus dice for (Essence) days. Anyone they are able to successfully influence with the Solar’s arguments gain the same bonus to do so to others, although not the impetus. If this Charm is used with any other that requires an expenditure of Willpower, ignore this Charm’s Willpower cost.'
	}, {
		'name': 'Infectious Zealotry Approach',
		'cost': '1m, 1wp',
		'mins': 'Performance 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Dogmatic Contagion Discipline',
		'desc': 'The Lawgiver distills all the power and passion of an entire speech into a single statement, striking her target with an all-consuming fiery ambition. When the Solar perceives a character who is about to put off making a social influence attempt that the Solar believes should be attempted now, she may use this Charm, rolling a Charisma or Manipulation + Performance based action against her target’s Resolve. The Solar inveighs against inaction and scorns all dereliction. If successful, her feverish contagion of will causes the target to forget all other concerns, goals, and ambitions, focusing socially on a single social objective for the rest of the scene. This effect can be resisted by paying one Willpower, but the affected character may only pay this Willpower if confronted by some circumstance that would force them to abandon a defining Intimacy in order to carry out their social influence action.\nOn Infectious Zealotry Approach\nIn Presence, the Charm Mind-Wiping Gaze (see p. XX) momentarily blanks out a character’s mind, erasing their social impetus. If used in combination with Infectious Zealotry Approach, the character is rendered catatonic unless attacked. In this state, Hypnotic Tongue Technique (see p. XX) or Memory-Reweaving Discipline (see p. XX) may be used on the target without a Resolve check.'
	},

	// Music and Singing

	{
		'name': 'Perfect Harmony Technique',
		'cost': '1m',
		'mins': 'Performance 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Masterful Performance Exercise',
		'desc': 'The Solar can shape her voice, or the voice of her instrument, into a perfect harmony of sound. This Charm supplements musical performances, granting them double 9s.'
	}, {
		'name': 'Mood-Inducing Music',
		'cost': '1m',
		'mins': 'Performance 4, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One song',
		'prereqs': 'Perfect Harmony Technique',
		'desc': 'Taking up a musical instrument, the Exalt pours her Essence through her fingers as she plays, evoking the soul of a composition. This Charm supports social influence being employed by other characters in the scene. The player names a mood which the song should induce, with an intended effect. It can be a calming song to prevent hostility, a market song to induce trade, a romantic song to aid in seduction, and so on. After the player has named the effect of the song, the Storyteller can decide how it affects the scene, adding or subtracting bonus dice equal to the Solar’s Essence. For example, a song with a calming influence will penalize social influence that attempts to provoke anger, while romantic music enhances sexual persuasion. This Charm enhances and penalizes the social influence of anyone who can hear it. The Solar’s music can also instead be tailored to enhance a dance or a song sung by a specific character.'
	}, {
		'name': 'Battle Anthem (of the Solar Exalted)',
		'cost': '1m',
		'mins': 'Performance 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One song',
		'prereqs': 'Mood-Inducing Music',
		'desc': 'The Lawgiver draws down the Essence of battle and manifests it through the medium of her instrument. While playing this song in combat, the Solar and her allies each automatically gain one Initiative per round, and their successful withering attacks each award an additional point of bonus Initiative. Allied battle groups who can hear the Solar’s music enjoy (Solar’s Essence) bonus dice to their attacks. While using this Charm, the Solar can’t take any non-Reflexive actions. This song does not stack with itself when played by more than one ally. Under the effects of Soul Voice, allies automatically gain two Initiative per round, and battle groups gain (Solar’s Essence) automatic successes to their attacks.'
	}, {
		'name': 'Plectral Harbinger’s Approach',
		'cost': '3m, 1wp',
		'mins': 'Performance 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Mood-Inducing Music',
		'desc': 'At any point during a song played with the prerequisite, the Lawgiver may channel and focus the song on a particular character, intensifying the mood of the music into that character’s social influence. Roll the Solar’s Charisma or Manipulation + Performance with (Essence) automatic successes against the Resolve of the beneficiary’s target. If the Solar is enhancing a Presence or Socialize action, this is typically the Resolve of a single character, but it can be the group’s Resolve if the Solar is enhancing another character’s performance with her own music. If successful, convert the Solar’s extra successes into non-Charm bonus dice on the beneficiary’s social influence. If the beneficiary is successful, the Lawgiver regains a point of Willpower, though this does not confer any knowledge of that success to the Exalt.'
	}, {
		'name': 'Heart-Compelling Method',
		'cost': '5m, 1wp',
		'mins': 'Performance 4, Essence 2',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Perfect Harmony Technique',
		'desc': 'The Lawgiver’s music pulls at the soul of her target, impelling them to act on their deepest desires. This Charm creates a inspire action in which the Solar performs a song with instrument, voice, or both. Her song must continue for at least one minute before it affects anyone—roll Charisma or Manipulation + Performance against the target’s Resolve. If her song is meant to convey sadness, it will automatically target an Intimacy in her target that reflects sorrow or regret, and may even revive a long-forgotten hurt to do so. The Solar’s player may define the character’s intent with the song, but on a success, the Storyteller gets to determine the exact Intimacy that is targeted and what behavior will manifest. As the Solar continues to play her most sorrowful tune, a king might endlessly mourn his dead husband. With an aria that inspires hope, she might cause the king to open his husband’s private gardens to the city’s children, in honor of an old wish.'
	}, {
		'name': 'Soul-Stirring Cantata',
		'cost': '1m',
		'mins': 'Performance 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One song',
		'prereqs': 'Heart-Compelling Method',
		'desc': 'The Solar draws a song from deep within her soul, and frees it with her flawless voice. While the Exalt sings, the Solar and each ally who can hear her gain a single additional mote of Essence per turn in combat, if applicable, or one mote for every two minutes of song out of combat. Outside combat, Soul-Stirring Cantata can only be used once per day. While using this Charm, the Solar can’t take any non-Reflexive actions. Singing Soul-Stirring Cantata is guaranteed to draw the attention of local spirits, and members of the Wyld Hunt are trained to listen for the sounds this song produces. This song does not stack with itself when sung by more than one ally. Under the effect of Soul Voice, this Charm grants two motes per turn or per minute.'
	}, {
		'name': 'Heroism-Encouraging Ballad',
		'cost': '6m, 1wp',
		'mins': 'Performance 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One song',
		'prereqs': 'Battle Anthem (of the Solar Exalted)',
		'desc': 'The Lawgiver’s music is a benison against fear. While playing this song, the Lawgiver is immune to terror, and may target another character who can hear her song, making them completely immune to fear-based effects as well. Alternately, the Solar can inspire heroism in multiple allies, doubling Intimacy-derived Resolve bonuses from any applicable tie or principle: so long as there is a reason to be brave, her allies are emboldened against threaten actions and supernatural fear-based effects. Lastly, when the Lawgiver plays this song on the battlefield, allied battle groups gain (Solar’s Essence) automatic successes to rally for numbers (see page XX). While using this Charm, the Solar can’t take any non-Reflexive actions. Bonuses from this Charm count as dice added by a Charm.'
	},

	// Dance

	{
		'name': 'Graceful Reed Dancing',
		'cost': '1m',
		'mins': 'Performance 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Masterful Performance Exercise',
		'desc': 'The Exalt moves and sways with the Essence of the world, affecting a perfect rhythm. This Charm supplements a dance, granting double 9s.'
	}, {
		'name': 'Battle-Dancer Method',
		'cost': '1m',
		'mins': 'Performance 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Graceful Reed Dancing',
		'desc': 'When dancing, add half the Exalt’s Performance, rounded down, to her Parry or Evasion. If she is dancing by herself, this Charm can also raise her Resolve.'
	}, {
		'name': 'Shining Expression Style',
		'cost': '2m, 1wp',
		'mins': 'Performance 4, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Graceful Reed Dancing',
		'desc': 'The Exalt’s skill is such that she can condense an entire emotional range into a single dance that embodies its very meaning. The Solar must dance for at least two minutes in order to use this Charm, rolling Charisma + Performance with (Essence) automatic successes against the group’s Resolve. If successful, the group is struck with an emotion conveyed by the dance, each member becoming explicitly aware of one tie they have which inspires that emotion in them. For instance, if the Solar does a dance that inspires fear, characters recall that which makes them most afraid. If she does a dance which inspires joy, they recall that which brings them the most happiness. If characters do not possess such an Intimacy, the Storyteller may assign one. Affected characters will feel inclined to discuss or act upon their feelings until they are affected by emotional influence that inspires a different mood. Characters who reveal an Intimacy in this fashion lower their Guile to 0 for the purposes of detecting and confirming that specific Intimacy. Note that the Solar is not necessarily going to be the beneficiary of the character’s sudden openness, as she might not be directly involved in the conversation. For all her dancing, the Solar is never seen as the deliberate source of the target’s thoughts. Not even All-Encompassing Sorcerous Sight can reveal the power of this Charm.'
	}, {
		'name': 'Winding Sinuous Motion	 ',
		'cost': '4m',
		'mins': 'Performance 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Shining Expression Style',
		'desc': 'The Solar channels Essence into her steps and motions, insinuating herself into the minds of her audience. The Solar winds through the motions of a dance. Roll Manipulation or Appearance + Performance with one automatic success against the target’s Resolve. If successful, the target’s Resolve or Guile is lowered by two against the Exalt’s next social influence attempt.'
	}, {
		'name': 'Monk-Seducing Demon Dance',
		'cost': '3m, 1wp',
		'mins': 'Performance 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Thousand Courtesan Ways, Winding Sinuous Motion',
		'desc': 'The Solar moves sensually through the eight steps of silken ecstasy, provoking her spellbound audience. This is dance lasting three minutes, ending in an Appearance + Performance roll with (Essence) bonus dice against the group’s Resolve. If successful, it inspires intense lust for the Exalt. Success guarantees that characters who are sexually attracted to the Lawgiver will attempt to seduce her. Characters who are not sexually compatible with the Solar instead experience strong admiration for her, and will be inspired to speak with her at least once.'
	},

	// Acting

	{
		'name': 'Master Thespian Style',
		'cost': '1m',
		'mins': 'Performance 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Masterful Performance Exercise',
		'desc': 'The greatest actors have the talent of making their audience forget. The Solar spends five minutes getting into character, psyching herself up, tuning her voice, repeating lines or otherwise practicing dance moves or musical movements. As long as she stays in character, this Charm raises the Exalt’s Guile by one for the rest of the scene. Characters who fail to read her intentions while this Charm is active will pick up on false Intimacies or motivations that align with the role the Lawgiver is playing, and be convinced they are real. If the Exalt enters a scene with a dramatic stunt befitting the role she wishes to play, she may activate this Charm reflexively. This Charm is expressly permitted to be combined with Flawlessly Impenetrable Disguise (see p. XX).'
	},

	// Voice

	{
		'name': 'Voice-Hurling Method',
		'cost': '2m',
		'mins': 'Performance 4, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Masterful Performance Exercise',
		'desc': 'With skill to humble a master ventriloquist, the Exalt throws her voice. With this Charm, the Solar can cast her voice out to short range, making it appear to come from particular objects, locations, people or animals. Voice-Hurling Method supplements a single social influence action or regular dialogue lasting no longer than ten seconds. When the character is concealed, she may use it to speak without giving away her position, penalizing her opponent’s Awareness by two successes in the process.'
	}, {
		'name': 'Cunning Mimicry Technique',
		'cost': '1m',
		'mins': 'Performance 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Masterful Performance Exercise',
		'desc': 'The Solar’s unerring ear and perfectly tuned voice allows her to flawlessly mimic the normal speaking voice of someone she is familiar with. For this mimicry to be flawless, she must spend at least an hour memorizing the speech patterns and vocal inflections of the character whose voice she wishes to copy. This Charm supplements a single social influence action or regular dialogue lasting no more than ten seconds.'
	}, {
		'name': 'Most Excellent Mockingbird',
		'cost': '3m',
		'mins': 'Performance 5, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Cunning Mimicry Technique',
		'desc': 'Clearing away her senses, the Solar attunes herself to a single mimicry. For one scene, the Exalt can perfectly mimic a single person whom she could perfectly copy with the prerequisite. While this Charm is active she may still choose to speak with her own voice, and may use Cunning Mimicry Technique to mimic the voices of other characters.'
	}, {
		'name': 'Splendid Magpie Approach',
		'cost': '1m',
		'mins': 'Performance 4, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Masterful Performance Exercise',
		'desc': 'The Lawgiver’s genius voice is capable of fascinating mimicry. This Charm supplements an attempt to mimic the calls, songs, or sounds of a small to medium animal or insect. She need only hear the sound once to perfectly copy it. This Charm delights and amazes audiences and may aid in wilderness survival, by attracting food or a potential familiar.'
	},

	// Sex

	{
		'name': 'Thousand Courtesan Ways',
		'cost': '5m',
		'mins': 'Performance 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Masterful Performance Exercise',
		'desc': 'The Solar suffuses her form with Essence, intensifying her every angle and motion. This Charm raises her Appearance by one for the rest of the scene, even if this increases it past five. An erotic vision made manifest, she may attempt and succeed at seductive persuade actions without targeting an Intimacy. In addition, she may make her movements and words effortlessly erotic, subtly or overtly sensualizing her social influence actions. She might be using a read intentions action to draw out someone’s opinion on a social issue while subtly enticing them with an instill action, or she might play a song to remind a prince of his homeland while using an inspire action to stir a fire in the belly of his wife. In such cases, her social influence is made with a single roll, each different action sharing the roll’s results.'
	}, {
		'name': 'Celestial Bliss Trick',
		'cost': '3m, 1wp',
		'mins': 'Performance 4, Essence 1',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Thousand Courtesan Ways',
		'desc': 'The Exalt performs the body-mudra of sighs and whispers upon a lover, unleashing a torrent of unimaginable ecstasy. This intense lovemaking lasts at least three minutes, inducing a world-shaking climax in her partner. In the afterglow, the Exalt becomes the object of a temporary defining tie of lust that lasts for (Essence) weeks, and gains (Essence) automatic successes to social influence actions targeting her lover for the rest of the scene.'
	},

	// Presence

	{
		'name': 'Listener-Swaying Argument',
		'cost': '3m',
		'mins': 'Presence 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar’s passionate appeals can soften even the stoniest of hearts. This Charm supplements an instill or persuade action, granting the Solar one automatic success and additionally granting one non-Charm bonus die for every two points the target’s Resolve is boosted by any means. The Solar cannot gain more than three bonus dice in this fashion.'
	}, {
		'name': 'Impassioned Discourse Technique',
		'cost': '3m',
		'mins': 'Presence 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Listener-Swaying Argument',
		'desc': 'The Solar argues from her beliefs, persuading listeners with the depth of her emotion. This Charm supplements a persuade action, granting the Solar one automatic success. In addition, when the Solar argues from a defining principle she holds, she gains two, three, or four bonus dice, based on the intensity of the principle. In essence, this Charm persuades a character to act as the Solar would act. She might argue from her own compassionate principles to convince her target to be merciful or generous, or principles reflecting temperance, to convince the target to abstain from debauchery, vice, dereliction or iniquity. Likewise she might invoke valorous Intimacies to urge courageous action, or she might sell a course of action with the force of her conviction.'
	}, {
		'name': 'Empowering Shout',
		'cost': '3m',
		'mins': 'Presence 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Impassioned Discourse Technique',
		'desc': 'Even bound in chains, the Lawgiver can inspire a subject to the heights of prowess. This Charm is a simple turn-length action in which the Solar exhorts a character to their true greatness. Such a character gains a +1 non-Charm bonus to one Attribute and Ability until their next turn. The Solar might call upon a strongman to lift rubble from a trapped family, increasing his Strength and Athletics by one each, or empower her guardian to strike swift and true, increasing his Dexterity and Melee, and so on. The Solar may also choose instead to raise her charge’s defense by one, but if this raises it past seven it counts as dice added by a Charm. Empowering Shout does not stack.\nAt Essence 4+, the Exalt can use this Charm to grant +2 to one Attribute and Ability or +2 to a defense.'
	}, {
		'name': 'Fulminating Word',
		'cost': '1wp',
		'mins': 'Presence 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Impassioned Discourse Technique',
		'desc': 'When the Lawgiver argues from one of her defining principles, it is nearly impossible to disagree. Her words sow dissent within a target’s soul. Upon successfully beating a target’s Resolve with a bargain, threaten or persuade action, but before a Decision Point has been entered, she may activate this Charm to magnify the impact of her argument. Doing so raises the cost of the Decision Point to two Willpower. If the target acquiesces to the Solar’s demands, then the Exalt gains a point of temporary Willpower when she realizes her success.'
	}, {
		'name': 'Crowned King of Eternity',
		'cost': '--',
		'mins': 'Presence 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Authority-Radiating Stance, Fulminating Word',
		'desc': 'The Lawgiver sits at the cycle of events, shining with a spirit that cast all others in relief. Once per scene, she may use this Charm to enact a free full Presence, Performance, or Socialize Excellency.'
	}, {
		'name': 'Harmonious Presence Meditation',
		'cost': '5m or 7m',
		'mins': 'Presence 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'The Lawgiver embodies virility, magnetism and grace, empowering her forces of persuasion. For five motes, this Charm grants three bonus dice to all forms of social influence from all Abilities except Stealth. In addition, the cost of all social influence Charms are reduced by one mote, to a minimum of one. The seven mote version of this Charm extends the duration to indefinite.'
	}, {
		'name': 'Excellent Friend Approach',
		'cost': '--',
		'mins': 'Presence 5, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Harmonious Presence Meditation, Listener-Swaying Argument',
		'desc': 'The Lawgiver inspires tremendous devotion. A Solar with this Charm is held high in the esteem of her allies. Anyone who holds a defining positive tie to the Solar can be persuaded to do minor tasks (see p. XX) without a roll.'
	}, {
		'name': 'Majestic Radiant Presence',
		'cost': '6m',
		'mins': 'Presence 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Harmonious Presence Meditation',
		'desc': 'Her incandescent spirit magnifies the Lawgiver with aspects of glory and terror. While this Charm is active, characters must pay a point of temporary Willpower to speak against her or attack her. Her enemies need only pay this price once per scene. In addition, all threaten actions against her suffer a penalty equal to her Essence.'
	}, {
		'name': 'Enemy-Castigating Solar Judgment',
		'cost': '3m, 1wp',
		'mins': 'Presence 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Impassioned Discourse Technique, Majestic Radiant Presence',
		'desc': 'The Exalt sears her target with the caustic force of her burning judgment. This Charm supplements a social influence roll or an attack against a creature of darkness, lowering their Resolve or their defense by one. If the attack is decisive, the damage is aggravated. If the influence is successful, it costs an additional Willpower to resist. In addition, if this Charm is combined with other Charms or magic which harm creatures of darkness, then the Solar may use this Charm against characters or ideas for whom she has a defining tie of hatred, even if they are not creatures of darkness. This makes those targets susceptible to the effects of all such Charms for one instant.'
	}, {
		'name': 'Blazing Glorious Icon',
		'cost': '3m',
		'mins': 'Presence 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Majestic Radiant Presence',
		'desc': 'The Solar’s glory burns like the very sun in the sky. When her anima is at the glowing or burning level, her Presence-based attempts to threaten, persuade, or instill gain one non-Charm automatic success. When she is at bonfire, these actions gain an additional extra non-Charm die as well. The Solar is glorious and terrible; this power does not aid seduction attempts unless the Exalt channels her glory into amplifying her magnificence with a stunt, using her Appearance on the roll. This Charm never aids a bargain action.'
	}, {
		'name': 'Mind-Wiping Gaze',
		'cost': '1m, 1wp',
		'mins': 'Presence 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Blazing Glorious Icon',
		'desc': 'The Solar sheds the entire force of her presence out through her eyes. Her intense stare penetrates the soul of her target, momentarily blanking out their memories. When the Exalt perceives a character who is about to make a social influence attempt she disagrees with (or wishes to stifle for whatever reason), she may use this Charm, rolling a Charisma or Appearance + Presence-based action against her target’s Resolve, to blow out the candle of their mind. If successful, her target forgets his social objective for the rest of the scene, and may only remember it if reminded and then by paying one Willpower. The Solar may only use this Charm on the same target once per scene. If her target spends a Willpower to resist, the Solar regains the Willpower she spent activating the Charm. Mind-Wiping Gaze may be enhanced by Presence Charms that enhance persuade and threaten actions.'
	}, {
		'name': 'Hypnotic Tongue Technique',
		'cost': '10m, 1wp',
		'mins': 'Presence 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Psyche, Mute',
		'duration': 'Indefinite',
		'prereqs': 'Mind-Wiping Gaze, Fulminating Word',
		'desc': 'With no other recourse, the Solar dominates another with the force of her presence. The Solar’s Caste Mark flashes and her eyes blaze as she casts her relentless spirit out into the world. It flows forth and strikes her target. Roll Charisma or Manipulation + Presence against the target’s Resolve. This non-specific effect cannot lower the target’s Resolve by exploiting an Intimacy, nor can the target invoke an Intimacy to raise his defense. If the roll is successful, the target goes catatonic for a moment, allowing the Solar to program them with instructions in a number of short, clear sentences equal to one plus the threshold successes on the roll. These instructions may be complicated as the Solar is able to convey, but all must be carried out at the same time. If the Solar does not use a sentence to designate when the target should act, they will carry out this process immediately.\nCharacters who complete given tasks or take actions on the back of this Charm do not remember why they did such things or even that they were ordered to do them. A character may spend three Willpower to reject the Solar’s programming, but this also results in his completely forgetting the Solar’s attempt. Characters who resist this Charm by any means cannot be confronted with it again for (target’s Integrity) days.'
	}, {
		'name': 'Underling-Promoting Touch',
		'cost': '7m, 1wp',
		'mins': 'Presence 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Majestic Radiant Presence',
		'desc': 'With a touch, the Exalt raises a servant to the role of a champion. By using this Charm and touching a person who serves or follows her, the Lawgiver temporarily makes her subject the beneficiary of respect and admiration usually reserved for the Solar. Characters who have ties of loyalty, respect or admiration to the Solar now also feel the same way toward her charge. Additionally, the character also inherits any social station or role it is within the Solar’s right to grant, and all characters who are subject to that station instantly recognize that they are subject to the promoted one’s authority.'
	}, {
		'name': 'Worshipful Lackey Acquisition',
		'cost': '--',
		'mins': 'Presence 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Underling-Promoting Touch',
		'desc': 'As the sun rises in prominence, shadows grow long upon the earth. Whenever the Solar achieves a goal through lecture, prophecy, oration, or other forms of performance, those who conspire against her are twisted against themselves. Enemies who witness her success must roll Wits + Integrity with a penalty of the Solar’s Essence, against a difficulty of the Solar’s strongest Social Attribute. Those who fail become enthralled with the Solar’s wisdom and greatness and are inclined to follow her and do as she commands as if they had a principle defining them as one of her acolytes. The character does not stop hating the Solar, but must grovel, cloy and defer to her for (Essence) days. Occasionally when this effect ends, if the character was treated well by the Solar, their negative Intimacies for her are diminished or destroyed and they become one of her true allies.'
	}, {
		'name': 'Prophet-Uplifting Evocation',
		'cost': '4m, 1wp, 2xp',
		'mins': 'Presence 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Underling-Promoting Touch',
		'desc': 'With a gesture, the Solar uplifts a favored follower and grants them true power. This Charm permanently empowers a character under the effect of Underling-Promoting Touch, granting them a personal Essence pool of four motes plus up to five more, provided by the Solar upon using this Charm. The character becomes inured to supernatural terror, and may resist it with a +2 bonus to her Resolve. In addition, if the character has Integrity 3+, then they are granted a Charm called Unhesitating Dedication. This Charm allows the prophet to defend a defining principle from being decayed by reflexively paying three motes. The Lawgiver may have (Essence * 2) prophets. If a prophet is slain, the Solar recovers experience points spent in the Charm’s cost.'
	}, {
		'name': 'Shedding Infinite Radiance',
		'cost': '5m',
		'mins': 'Presence 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Stackable',
		'duration': 'Indefinite',
		'prereqs': 'Prophet-Uplifting Evocation',
		'desc': 'The flames of Solar passion run deep. Sometimes they burst forth, igniting the greatness in others. With this Charm, the Solar prepares an acolyte, follower, student or agent for some great task. This is a simple dramatic action in which she exults and extolls the virtue of her cause, invoking a principle which she has instilled upon her target. This is not a social influence action, merely the way in which she pours excellence into her subject. For as long as she commits Essence, her charge gains three automatic non-Charm successes to apply to action taken on behalf of a principle granted by the Solar. The character may use these successes all on one roll, or may spread them out. Once all the successes have been spent, the Solar senses it, as commitment to the Charm ends. Successes granted by this Charm have certain limitations:\n• The character may not invoke more successes on an action than he has dots in the relevant Ability. For example, the Solar’s envoy, having Performance 2 and Thrown 1, could apply two successes to his address to the corrupt senate of Paramour, before using his last automatic success to fling a hidden stiletto into the legate’s neck. He would not be able to put more than one success into the assassination attempt, and each action would have to be done in upholding or advancing a principle given to him by the Solar. In this case, the legate was probably holding the senate hostage, preventing them from accepting the envoy’s influence.\n• This Charm is stackable, but the Solar may not stack it on a single target more than (Essence) times.\n• Even if the character is benefitting from multiple applications of this Charm, he may not enhance a single action by more than three granted successes.\nThe Solar may enhance as many characters with this Charm as she has motes to pay the cost.'
	}, {
		'name': 'Favor-Conferring Prana',
		'cost': '5m, 1wp',
		'mins': 'Presence 5, Essence 4',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Empowering Shout, Underling-Promoting Touch',
		'desc': 'This Charm copies the effect of its prerequisite, but allows the Solar to empower an ally indefinitely. The subject’s Attribute and Ability ratings may not be increased past five with this Charm, nor may they begin to learn Charms or magic they do not truly qualify for. Because this is a different Charm than its prerequisite, it may be used in conjunction with Empowering Shout.'
	}, {
		'name': 'Authority-Radiating Stance',
		'cost': '5m, 1wp',
		'mins': 'Presence 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Majestic Radiant Presence',
		'desc': 'The Lawgiver exudes her rightful authority. This Charm prevents every ally within medium range from succumbing completely to fear. As long as they can see the Solar or hear her voice, they suffer no fear-based penalties to their actions. The Exalt’s rally rolls (see p. XX) are also enhanced, gaining one automatic success. This Charm does not protect characters from supernatural terror or from being threatened by a Dawn Caste.'
	}, {
		'name': 'Terrifying Apparition of Glory',
		'cost': '7m, 1wp',
		'mins': 'Presence 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Majestic Radiant Presence',
		'desc': 'The Solar burns with fearsome power, transforming her into an icon of terrible majesty. The Solar activates this Charm when her anima is at bonfire. This Charm inflicts supernatural terror upon all who see the Solar. This is modeled as a threaten action, but requires no words, and suffers no penalty from being unspoken or without specific gesture; the Solar is simply terrifying to behold. This effect also ignores the penalty for group influence. Trivial opponents and most animals, even attack animals, will simply flee the Solar’s presence. Those who fail their Resolve checks also flee. In combat, this effect can be perceived out to long distance, recurs every round without the need of a flurry, and may be resisted for the rest of the scene by paying one Willpower and five Initiative. Finally, a terrorized battle group suffers a loss of three dice from its rout checks (see p. XX) when faced with the Solar’s immense and terrifying spirit force.'
	}, {
		'name': 'Countenance of Vast Wrath',
		'cost': '6m',
		'mins': 'Presence 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Terrifying Apparition of Glory',
		'desc': 'While under the effects of the prerequisite, the Solar draws in her anima, shedding it completely. As she ends the Charm’s commitment, she draws her power inward, channeling it into a new and more terrifying form. This Charm adds (Essence) dice to the Lawgiver’s single-target threaten actions, and allows her to terrorize even those creatures who are incapable of fear. In combat, opponents suffer the loss of a single point of Initiative on each round in which they do not direct an attack at her.\nAt Essence 5+, when the character returns to bonfire, she resumes the effects of Terrifying Apparition of Glory automatically and for free. Characters who fail their Resolve checks must pay additional Willpower and Initiative to remain in battle.\nThis Charm cannot be muted with the Night Caste anima or other magic.'
	}, {
		'name': 'Threefold Magnetic Ardor',
		'cost': '4m',
		'mins': 'Presence 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Harmonious Presence Meditation, Listener-Swaying Argument',
		'desc': 'The Solar’s intense sexuality magnifies her powers of persuasion, making any instill and persuade actions made with Presence, Performance or Socialize more compelling. Normally when a character has higher Appearance than her target’s Resolve, she enjoys a non-Charm dice bonus equal to the difference of the two values. This Charm converts the difference into automatic successes. This bonus counts as dice added by a Charm. Note that this Charm still works if the character has the Hideous merit, as the amplification of her horrifying Appearance has an equally profound effect on persuasion. In this case, Threefold Magnetic Ardor also supplements threaten actions.'
	}, {
		'name': 'Awakened Carnal Demiurge',
		'cost': '5m, 1wp',
		'mins': 'Presence 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Threefold Magnetic Ardor',
		'desc': 'Through intense preparation, the Lawgiver magnifies her own appearance, increasing the magnitude of her presence. The Solar enacts a simple dramatic action lasting five minutes, in which she verbally induces her inner greatness to external form. For as long as she commits Essence, the Solar’s Appearance is increased by one, even if this raises her Appearance above five. In addition, any seduction attempt she makes treats her target as if they had one less Resolve, both lowering their resistance and increasing the effectiveness of her Appearance rating.'
	}, {
		'name': 'Rose-Lipped Seduction Style',
		'cost': '2m, 1wp',
		'mins': 'Presence 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Awakened Carnal Demiurge',
		'desc': 'With a provocative word and gesture, the Exalt amplifies her form with Essence, treating the target of such intensity to the fullness of her desires. This Charm supplements a persuade action to seduce a target, granting double 9s. The Solar may even seduce a character for whom such influence is unacceptable.'
	},

	/*
	[BOX]
	Remember the Red Rule!
	The Red Rule (p. XX) states that no matter the magic, no matter the circumstances, no player character can ever be seduced if the player disagrees. In addition, not every sexualized mechanic in the game is a seduction attempt. Whenever you come across such an effect, use the spirit of the Red Rule rather than the letter.
	[/BOX]

	Socialize
	*/

	{
		'name': 'Mastery of Small Manners',
		'cost': '5m',
		'mins': 'Socialize 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'The Solar attunes herself to the patterns of social interaction, allowing Essence to guide her responses. While this Charm is active, the Exalt adapts to the expectations of a host culture, and is able to instinctively and reflexively follow its customs, behaving appropriately for the situation at hand. This Charm does not grant the Exalt perfect understanding of a society, but covers greetings, eating and gift customs, and flirtation mores. This Charm eliminates all penalties incurred by unfamiliarity with cultural expectations and group dynamics, and prevents a character from committing any major faux pas. In addition, those who hold positive Intimacies for the culture the Solar has attuned herself to gain a temporary positive Minor Tie of respect or admiration for the Solar, while those who hold negative Intimacies for foreigners or outsiders have that Intimacy temporarily lowered by one level of Intensity.'
	}, {
		'name': 'Culture Hero Approach',
		'cost': '3m',
		'mins': 'Socialize 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Mastery of Small Manners',
		'desc': 'This Charm allows the Solar to make a special read intentions action while observing an unfamiliar ritual to discern its purpose. This action has a difficulty of the obscurity of the ritual, and can be lowered by a relevant Lore rating. For example, an expert on the Skullstone Archipelago could interpret the ritual of bone and ivory more easily than someone who has never visited Onyx. This Charm can also pick up ritual subtexts: an expert in cults might recognize a demon-worshiping dance disguised as a harvest ritual. Basic success on this roll tells the Solar the meaning of the ritual. For every two additional successes, she understands an additional one-sentence fact about the ritual. If she is expected to perform the ritual, each fact she uncovers in this manner amounts to a single automatic success on a Performance roll to participate.'
	}, {
		'name': 'Unimpeachable Discourse Technique',
		'cost': '3m',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Mastery of Small Manners',
		'desc': 'The Solar is the guardian of her thoughts. If the Solar is in a situation where Mastery of Small Manners would apply, she may use this Charm to supplement a persuade or instill action that speaks to group policy, changing cultural attitudes or steering future courses. This Charm ensures that her arguments are logical and extremely well thought out: reroll all 1s until 1s fail to appear, and deny the benefits of the Solar’s 1s to the magic of her enemies.'
	}, {
		'name': 'Friend of a Friend Approach',
		'cost': '--',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Any four Essence 3+ Socialize Charms',
		'desc': 'The Solar is a world-walker of some renown, and her good standing precedes her. Upon encountering a perfect stranger who has a major or defining positive tie to a character who has a defining positive tie to the Solar, the stranger gains an automatic minor tie of respect for the Lawgiver. This automatic Intimacy is contingent on the stranger’s awareness of their friend’s defining tie to the Solar, as well as their recognition that the Lawgiver is who she claims to be. This automatic minor tie is fragile and can be destroyed instantly upon meeting if the Solar is offensive or demanding.'
	}, {
		'name': 'Indecent Proposal Method',
		'cost': '4m',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Unimpeachable Discourse Technique',
		'desc': 'The silver-tongued charisma of the Solar Exalted allows them to say things others would normally suffer to speak. This Charm supplements an instill, persuade, or bargain action. It does not aid the Solar’s persuasion in gaining acceptance, but it does guarantee that her offer will sound delightful, charming, or otherwise a necessary evil coming from her lips. This prevents any Intimacy toward her from being decreased as a result of her persuasion. This Charm affects everyone who witnesses the social action, even if they were not the target. Characters must pay a point of temporary Willpower in order to take offense.'
	}, {
		'name': 'Cunning Insight Technique',
		'cost': '3m',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Unimpeachable Discourse Technique',
		'desc': 'Any time a Lawgiver witnesses another character dispute or reject a claim—typically a successful application of Resolve against a social influence action—she may activate this Charm, allowing the player to speculate on one of the character’s attached Intimacies. For example, a Solar who witnesses a magistrate refusing to take a bribe might guess that he values justice. This Charm does not guarantee success, but allows the Solar to piece together a clearer picture of a target by association. Intimacies guessed correctly become known to the Solar without a doubt.'
	}, {
		'name': 'Doubt-Sowing Contention Method',
		'cost': '6m, 1wp',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Cunning Insight Technique',
		'desc': 'Sometimes a Solar must act quickly to prevent a disastrous incident. When she suspects a character intends to make a social influence roll she disagrees with, the Solar may use this Charm to prevent her target from making a social influence roll. Roll a Manipulation + Socialize persuade action, adding (Essence) automatic successes. If the roll succeeds, the target’s intended social action—be it to persuade, bargain, threaten, instill, or read intentions—is treated as if it has already failed and must be reset (p. XX). This Charm is capable of defining influence without employing an Intimacy, but carries no inherent power to lower a target’s Resolve on its own. This influence costs three Willpower to resist in a Decision Point and requires a defining Intimacy to reject. Once a character has been hit with this Charm, if they successfully reset their social action or they pay Willpower to resist, this Charm can no longer prevent them from attempting the social influence they were initially denied. The Solar may however prevent them from taking other social actions through continued use. All uses of this Charm are reset when a new story begins.'
	}, {
		'name': 'Effective Counter-Argument',
		'cost': '6m, 1wp',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Counterattack',
		'duration': 'Instant',
		'prereqs': 'Unimpeachable Discourse Technique',
		'desc': 'Once per scene, the Solar may intercede in a persuade action she is witnessing in order to change the target’s mind. After the initiate has rolled their persuasion but before Resolve is applied, the Solar may make a Wits + Socialize roll to persuade the subject to reject the initiate’s influence. For every two successes she gains on this roll, the target’s Resolve is boosted by one.'
	}, {
		'name': 'Wise Counsel (Flashing Soul Reform)',
		'cost': '1wp',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Effective Counter-Argument',
		'desc': 'The words of the Lawgiver turn the wheels of the world. When the Solar advises another character on social etiquette or group or cultural policy, roll (Charisma or Manipulation + Socialize) dice and add her successes as bonus dice that the target may use on to enhance a Socialize roll, or to increase his Guile or Resolve for a single tick at a rate of two successes per point. The target of this assistance may spread this bonus out over the course of several scenes and multiple actions, or he may choose to use all of the dice at once. If the target applies any part of this bonus to an action, any positive Intimacy he has for the Lawgiver is increased in intensity and if one does not exist he gains one automatically.'
	}, {
		'name': 'Endless Obsession Feint',
		'cost': '--',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Wise Counsel (Flashing Soul Reform)',
		'desc': 'This Charm embodies the awe-inspiring resonance of the Solar Exalted, whose very presence shapes the flow of nations. This Charm is triggered by a Solar’s success in a social scene, where through social influence she achieves a significant objective. She might broker an alliance, arrange a wedding, cancel an assassination or convince the local Guild to decrease opium production. Any objective success she attains at the expense of another social actor in the scene leaves that character in a state of obsession. The Lawgiver is an enigma, and though he can’t remember the substance of her arguments, her casual wit haunts his dreams. For (Essence) days the character suffers a -2 dice penalty to all Bureaucracy, Craft, Investigation, Linguistics, Lore, Occult, Performance and Socialize rolls, with 1s on these rolls each counting as -1 success. When this obsession wears off, the target automatically develops a positive or negative Intimacy for the Solar, depending on how the days went. This effect may apply to multiple characters in the same scene.'
	}, {
		'name': 'Aspersions Cast Aside',
		'cost': '5m',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Unimpeachable Discourse Technique',
		'desc': 'The Lawgiver is ever blameless. With this Charm she can cast aside all 1s and 2s after making a Socialize roll, forcing them onto a target within five feet. This target must then make a Wits + Socialize roll with a difficulty of the Solar’s Essence to keep their composure, with foisted 2s replacing the lowest successes (typically 7s) and 1s replacing the next digit up (usually 8s). The Solar gains these successes to her initial roll, while her target appears to be the one who said something ridiculous, upset her wine cup into the gravy bowl, and so on. The Solar may use this Charm in response to another Solar using Aspersions Cast Aside, but may not direct the impending botch back at the initiate.'
	}, {
		'name': 'Asp Bites Its Tail',
		'cost': '4m',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Counterattack, Mute',
		'duration': 'Instant',
		'prereqs': 'Aspersions Cast Aside, Effective Counter-Argument',
		'desc': 'When the Solar’s name is impugned, she may turn those claims back on her accuser. When the Solar witnesses another character attempting a social action intended to harm the Solar’s reputation or convince others to take action against her, she may invoke this Charm, rolling (Charisma or Manipulation + Socialize) dice. If this roll gains more successes than the aggressor’s, then the aggressor’s claim is turned back against himself. If he were using an instill action to convince someone that the Solar is untrustworthy, the target would be instilled with an Intimacy of distrust for him instead. If he were trying to persuade the king to have the Exalt taken into custody, he himself would be arrested.'
	}, {
		'name': 'Motive-Discerning Technique',
		'cost': '3m',
		'mins': 'Socialize 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'This Charm supplements a read intentions action (p. XX), applying the double 9s rule to the Solar’s roll. In addition, the Exalt may supplement Wits for Perception when she is reading the intentions of a person with whom she is speaking.\nA Socialize 4+ repurchase enhances this Charm’s performance. When the Solar discerns the intentions of her target, the player may speculate on the existence of one of the target’s related Intimacies. If the player is correct, the Solar becomes aware of that Intimacy.\nA Socialize 5+ repurchase enhances this Charm when it is used to speculate about a target’s Intimacy; if the player’s first speculation is incorrect, the player may inquire about the existence of a second Intimacy.'
	}, {
		'name': 'Quicksilver Falcon’s Eye',
		'cost': '1m',
		'mins': 'Socialize 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One turn',
		'prereqs': 'Motive-Discerning Technique',
		'desc': 'With a supernaturally keen sense for social interaction, the Lawgiver can gauge a character’s response to any social influence. She can even tell conspirators from rivals at a glance. With this Charm the Solar can intuit when a character applies Resolve or Guile against social influence actions and when they don’t. When she makes an argument she believes her target will readily accept, but they apply their Resolve, she senses their hesitation. When they apply their Guile to occlude their intentions, she knows they are hiding something. When characters engaged in an argument seem to disagree yet she sees no application of Resolve, this is a clear sign of a sham performance.'
	}, {
		'name': 'Umbral Eyes Focus',
		'cost': '2m',
		'mins': 'Socialize 5, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Quicksilver Falcon’s Eye',
		'desc': 'At a glance, the Exalt can tell when an Intimacy she has created or modified with an instill action has changed in intensity. This Charm supplements a read intentions action to discern the intensity of all such Intimacies, supplying one automatic success and two bonus dice.'
	}, {
		'name': 'Dauntless Assayer Method',
		'cost': '5m',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Motive-Discerning Technique',
		'desc': 'Upon failing a Read Intentions action, the Solar may use this Charm to reset her attempt, allowing her to try again. If the player describes a stunt in which the Solar re-engages her target—perhaps by spilling a drink on him, or posing lost beside a road as his carriage rolls up—then the cost of this Charm is reduced by a number of motes equal to the stunt level.'
	}, {
		'name': 'Preeminent Gala Knife',
		'cost': '--',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Dauntless Assayer Method',
		'desc': 'The Lawgiver is a master of social theatre, drawing strength from her success like prayer from the cup of the gods. Each time she succeeds at a read intentions action, defends her Guile, or succeeds at a Socialize action with a difficulty, she gains two motes of Essence. The Solar may not gain more motes of Essence than she has used activating Socialize Charms in the scene.'
	}, {
		'name': 'Humble Servant Approach',
		'cost': '1m',
		'mins': 'Socialize 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Motive-Discerning Technique',
		'desc': 'When taking a read intentions action to discover what a target wants from her, the Solar may reflexively activate this Charm, applying a -2 penalty to the target’s Guile. In order to use this Charm, the Solar needs to have already succeeded at a read intentions action against the target in the scene, reading their intentions while they were interacting with someone other than the Solar.'
	}, {
		'name': 'Wise-Eyed Courtier Method',
		'cost': '6m',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Humble Servant Approach',
		'desc': 'The Exalt can master the social currents that surround her to gain a greater understanding of the situation. The Solar makes a Read Intentions action with (Essence) automatic successes, applying a single roll against the Guile of all targets in the scene of whom she is aware. Success reveals surface attitudes, (“she is nervous and impatient about something”), emotions (“he is angry at her”), and Ties (“those two are besotted with one another”), revealing this information at a glance. The Solar can also discern what her targets want from one another (“he is trying to seduce her while she wants to buy his horse”).\nThis Charm is not a form of mind reading—rather, it models the skill of a Lawgiver who can read the thousand-fold nuances of social interaction with breathtaking ease.\nFailing to read a target’s intentions with this Charm does not count as failing a Read Intentions action for the purposes of a reset. The Solar may only use this Charm once per scene, but she may reuse it if the scene changes significantly in some way.'
	}, {
		'name': 'Fete-Watcher Stance',
		'cost': '--',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Wise-Eyed Courtier Method',
		'desc': 'The Lawgiver is the guardian of the peace. With this Charm she empowers herself to grant pre-emptive powers to her allies and subordinates. Any time the Exalt uses Read Intentions to notice hostile intentions which might result in violence, she gains three non-Charm dice to her Awareness for detecting a trap or assassination attempt, as well as three non-Charm dice to her next Join Battle roll. She may also confer this bonus to her allies through discrete warning at least one round before any hostile action occurs.'
	}, {
		'name': 'Night Passes Over',
		'cost': '2m',
		'mins': 'Socialize 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar may reflexively ignore all penalties to her Guile from fatigue, surprise or other emotional states. This Charm does not remove penalties incurred through physical injury or from being observed by hidden characters.'
	}, {
		'name': 'Shadow Over Day',
		'cost': '1m',
		'mins': 'Socialize 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Night Passes Over',
		'desc': 'The Solar flenses herself of emotion and expression, shedding her façade to become inscrutable. The Solar may reflexively raise her Guile by one point. At Essence 2+, the Solar may pay two motes for two points of Guile.'
	}, {
		'name': 'Intent-Tracing Stare',
		'cost': '1m',
		'mins': 'Socialize 5, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Motive-Discerning Technique, Shadow Over Day',
		'desc': 'The Solar becomes preternaturally aware of the social scene, able to read invisible subtexts and sense the intensifying focus of another’s scrutiny. Each time the Solar or a character within five feet is the target of a read intentions action, the Exalt feels a tingle at the base of her skull telling her to activate this Charm. Upon doing so, she can discern not only who the target of the action is, but who is watching them. The Solar must be aware of the initiate to notice him—this Charm does not grant the ability to spot hidden characters, though it does allow the Exalt to reflexively apply a Perception + Awareness check to try to notice hidden initiates.'
	}, {
		'name': 'Discretionary Gesture',
		'cost': '3m',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Intent-Tracing Stare',
		'desc': 'Through a sharp movement, a pointed glance, a whisper or a command to silence, the Lawgiver can raise the Guile of another. When the Solar perceives an ally being targeted by a Guile piercing effect, she may use this Charm to reflexively raise his Guile. This Charm is facilitated by the urgency of the Lawgiver’s stunt: if she glares or makes a cutting gesture, her ally’s Guile is raised by a single point. If she distracts him from speaking through means both dubious and clever, his Guile is raised by two. If she slaps him full on in the face, his Guile is raised by three.'
	}, {
		'name': 'Deep-Eyed Soul Gazing',
		'cost': '3m',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Intent-Tracing Stare',
		'desc': 'After successfully defending herself through an application of Guile, the Solar’s next read intentions action against the initiate gains (Essence) dice and one automatic success. This advantage vanishes at the end of the scene.'
	}, {
		'name': 'Seen and Seeing Method',
		'cost': '2m, 1wp',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Deep-Eyed Soul Gazing',
		'desc': 'When the Exalt successfully defends her motives or Intimacies through an application of Guile, she may reflexively make a Read Intentions action against the initiate, and if she pierces their Guile she gains a point of temporary Willpower. The Solar may only use this Charm to respond to actions she is aware of. The Solar may use this Charm against a character even if she has already failed to read their intentions in the scene.\nA repurchase of this Charm allows the Exalt to notice a Read Intentions action from a source she is unaware of, reflexively ignoring the -2 penalty and noticing the general direction from which the action is being made. She may even attempt to discern the motives of a character she cannot perceive—even one which is on another plane of existence—but will only pick up the surface emotions of a character she can’t actually see.\nAn Essence 4+ repurchase allows the Solar to respond to a Read Intentions action with one of her own, even if the target pierces her Guile.'
	}, {
		'name': 'Face-Charming Prana',
		'cost': '6m',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Seen and Seeing Method',
		'desc': 'The Solar bares her soul to another, inviting them to read her intentions. This Charm is a special Socialize-based Persuade Action made as if it were exploiting a Defining Intimacy. Success causes the target to attempt a Read Intentions action on the Solar. Resisting this influence in a Decision Point costs the target two Willpower.'
	}, {
		'name': 'Knowing the Soul’s Price',
		'cost': '10m, 1wp',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Seen and Seeing Method, Wise-Eyed Courtier Method',
		'desc': 'With a glance the Solar discerns those passions that sit hidden in the soul of her subject, desires for which they would take great personal risks or engage in behavior they would normally resist. This Charm is a read intentions action with (Essence) automatic successes, rerolling 5s and 6s until 5s and 6s fail to appear. If successful, the Solar learns her target’s price—that is, what will motivate them to undertake some specific task. The subject’s price might be the recovery of a lost possession, sex with an unachievable object of desire, aid in a personal endeavor, simple flattery and so on. If the Exalt knows Cunning Insight Technique, they may activate it in an attempt to confirm up to (Essence) Intimacies suggested by the subject’s price.'
	}, {
		'name': 'Understanding the Court',
		'cost': '20m, 1wp',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Culture Hero Approach, Knowing the Soul’s Price',
		'desc': 'With this Charm the Solar gains a near-total understanding of a court. The Solar must spend (10 - Essence) days in the court observing its members before activating the Charm. Doing so synthesizes everything she has witnessed, discarding unimportant memories and magnifying the intensity of details which she may not have initially noticed. The Exalt gains a mind-map of the relations between the court’s subjects. She discerns the strongest Tie each holds for the next, and the chief Principle relevant to their purpose for attending court. These Intimacies come to her through understanding the social dynamics of her subjects. She not only perceives an Intimacy of respect or fondness between two members, but she sees how their banter creates its own positive Intimacy in other members. Her mind can draw out the interplay of connected Intimacies in this fashion as far as the Storyteller deems relevant.\nIn addition, she perfectly recalls any customary roles or procedures performed by members of the court, even if that seems irrelevant. She might notice that one member takes leave at the same hour every day to walk in the sun, while remembering how another member drinks her tea—both how she holds the cup and what taste she favors. Overall, she is able to predict the movement, placement, mores and usual attitudes of her subjects perfectly, and has a strong understanding of their values and goals. This Charm also reveals the absence of major players as a form of disruption. Characters hold Intimacies for members who are not present, and whose role and impact the Exalt can guess by recalling conversations and comparing the Ties each member holds for the absentee.'
	},

	/*
	[Sidebar]
	Societal Influence and Group Dynamics
	Many Socialize Charms describe functioning to change policy, or having an effect on a character’s standing in a particular culture. These Charms apply equally to small groups such as “the local fishermen,” “members of the Guild hall,” “the Nimble Raiton Company,” and so on. Keep in mind that small groups have their own distinct cultures and rituals and that these terms do not refer exclusively to the politics and mores of nations. Charms such as Understanding the Court work equally well in a tea shop where peasants congregate as they do in the palace of the Tri-Khan.
	[/Sidebar]
	*/

	{
		'name': 'Unbound Social Mastery',
		'cost': '--',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Understanding the Court',
		'desc': 'When driven to action, the Solar brings the experience of timeless ages. Her wisdom is the torch that lights the world. Once per scene the Solar may invoke a free full Socialize Excellency. This power may be reset by achieving a legendary social goal such that she vents a point of Limit.'
	}, {
		'name': 'Even-Touched Prophet',
		'cost': '--',
		'mins': 'Socialize 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Unbound Social Mastery',
		'desc': 'The Lawgiver speaks from wisdom granted to her by the very fabric of the world. Once per scene she may use this Charm to apply the double 8s rule to a single Socialize-based action. This Charm may be reset by overturning social influence made against another character on the defining level.'
	}, {
		'name': 'Elusive Dream Defense',
		'cost': '1m, 1wp',
		'mins': 'Socialize 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One round',
		'prereqs': 'Even-Touched Prophet',
		'desc': 'Like day that turns to night, the Solar sinks into herself and becomes a perfect cipher. Once per story, the Solar may use this Charm to add her Resolve to her Guile, or her Guile to her Resolve. While this Charm is active, exploiting her Intimacies does not lower her Resolve, nor may she call upon an Intimacy to raise her Resolve.'
	}, {
		'name': 'Venomous Rumors Technique',
		'cost': '10m, 1wp',
		'mins': 'Socialize 5, Essence 4',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Understanding the Court',
		'desc': 'The Lawgiver may cast the wicked from the fetes of the righteous, or turn the knives of thieves against their king. The Solar speaks against a group member for whom she holds at least a Minor negative Intimacy, accusing her target of some major betrayal, dereliction or perversion. The player rolls a single Charisma or Manipulation + Socialize Instill action against the Resolve of all present group members, ignoring the penalty for group persuasion. For each character whose Resolve is beaten by this roll, the Lawgiver’s claim appears to be true: when the target interacts with affected characters, his social actions are penalized by twice the Solar’s Essence score in dice, with botches inevitably reflecting the truth of the Solar’s words. Affected characters may pay one Willpower to resist this influence, but that still does not remove the curse. The target must either present direct evidence with a successful persuade action to each individual member in order to cancel the effect, or leave the group for (Solar’s Essence) days. This Charm can only be used on a single character once per story.'
	}, {
		'name': 'Easily-Discarded Presence Method',
		'cost': '3m, 1wp',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Shadow Over Day',
		'desc': 'When the Exalt defends herself against a Read Intentions action, she may activate this Charm to make the initiate believe he saw through her Guile. Instead of seeing the Exalt’s true motives, they see cluelessness, failure, or pursuit of vice, and disregard her for the rest of the scene.'
	}, {
		'name': 'Selfsame Master Procurer',
		'cost': '4m, 1wp',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Easily-Discarded Presence Method',
		'desc': 'Similar to its prerequisite, this Charm compels the initiate to a certain belief upon failing a read intentions action. Instead of seeing the Lawgiver’s true motives, the target instead sees her as a route through which they can achieve their goal in the scene. This Charm allows the Solar to gain the confidence of her mark. By acting as a facilitator she may be privy to a number of secrets her target would otherwise not disclose.'
	}, {
		'name': 'Guarded Thoughts Meditation',
		'cost': '4m',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Shadow Over Day',
		'desc': 'The Exalt shrouds her mind, concealing her inner thoughts behind fivefold walls. This Charm indefinitely raises her Guile by three points.'
	}, {
		'name': 'Penumbra Self Meditation',
		'cost': '3m per Intimacy',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Stackable',
		'duration': 'Indefinite',
		'prereqs': 'Guarded Thoughts Meditation',
		'desc': 'Through concentration and practice, the Solar sheds a piece of her soul into the lightless blaze of her anima, dimming it. From that point onward, no read intentions action can uncover it. The Solar must meditate for an hour in order to bury a single Intimacy in this fashion. The Solar may eclipse as many Intimacies as she can afford to hide. Note that this Charm does not make it impossible to notice a Solar’s overt tendencies—her Intimacies can still be revealed through her own actions.'
	}, {
		'name': 'Inverted Ego Mask',
		'cost': '2m, 1wp',
		'mins': 'Socialize 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Penumbra Self Meditation',
		'desc': 'When her soul is glimpsed, the Solar may twist the very perceptions of her subject. The Solar may invoke this Charm when a character pierces her Guile, supplying a false purpose for her true motives. If the initiate inquires as to one of her Intimacies, and manages to uncover one, she may also use this Charm to misdirect his interpretation, changing the context of a Tie or the wording of a Principle to mislead him. This causes the initiate to make incorrect assumptions about the Solar’s loyalties, interests or objectives, causing his social influence against her to be less effective or completely implausible. For example, he might discern that she is a devotee of the Immaculate Faith when in reality she holds the Order in contempt. His persuasion to get her to aid the Order by informing on her fellow Solars would then experience a boost in her Resolve, rather than a weakening. Though this Charm is paid instantly, the Solar’s false Intimacy lingers until the end of the story. She is not compelled by this Intimacy and may freely act against it, nor is her Resolve lowered through its exploitation. However, should she experience Limit Break before the end of the story, the Intimacy becomes real, capable of influencing her until the story ends.'
	}, {
		'name': 'Soul-Void Kata',
		'cost': '4m, 1wp',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Face-Charming Prana, Inverted Ego Mask',
		'desc': 'Upon defending her Intimacies or her motives with an application of Guile, the Solar may activate this Charm. Doing so convinces the target they have seen into the Solar’s motives for a moment, but when their gaze returns they find themself staring into an empty, indescribable gulf of mist and lights. This leaves the target character completely hypnotized and inert. During this time they cannot be socially influenced, and will remain in this hypnotic state for the rest of the scene, unless harshly shaken or worse.'
	}, {
		'name': 'Heart-Eclipsing Shroud',
		'cost': '--(10m, 1wp)',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'Mute',
		'duration': 'Permanent',
		'prereqs': 'Inverted Ego Mask',
		'desc': 'The Exalt creates a new persona with a set of false Intimacies she can use to change the way she thinks and acts. These Intimacies are purchased as a permanent effect, but the Solar must activate them by taking a dramatic action lasting four or more hours, in which she cloisters herself in a place of solitude and meditates or talks herself into her new persona. Upon gaining her new Intimacies she temporarily voids her true Intimacies, and gains the following benefits:\nWhile this Charm is active, the Solar can act against her true Intimacies without eroding them or having to roll to gain Limit at the end of a scene. Furthermore, the Exalt cannot be impressed or persuaded by her true Intimacies—as if she were another person.\nThe Solar may use this Charm to void social influence against her, but doing so causes her to drag the affected Intimacy or Intimacies into her next persona change, or back to her true set of Intimacies, resulting in confusion as her identities begin to overlap and she begins to think competing thoughts in different voices.\nHeart-Eclipsing Shroud can be purchased (Essence) times, to create (Essence) sets of Intimacies. Motes spent activating this effect are not committed: reverting to her true Intimacies or changing to another persona requires that she use the Charm again.\nSpecial rules: Upon purchase, the player creates a number of Intimacies for a new persona. The player can invest it with as many or as few Ties as needed, but must create a number of new Principles equal to the number of Principles held by the Solar. When creating these Intimacies, the player should think of the persona as a different character with its own thoughts, feelings, and ideas. It is recommended that the player give the persona its own character concept to be reflected in the persona’s Intimacies. The player should aim for a concept and Intimacies which will serve the Solar in their current social milieu.'
	}, {
		'name': 'Hundred-Faced Stranger',
		'cost': '--',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Heart-Eclipsing Shroud',
		'desc': 'This Charm permanently upgrades all purchases of Heart-Eclipsing Shroud, allowing the player to assign Abilities and specialties to each persona with the following rules:\n• Assign the persona’s favored Abilities—ten which can be placed anywhere.\n• Count the Solar’s dots in Integrity or Presence, Bureaucracy or Linguistics, Ride or Sail, Socialize and one Dawn Caste Ability. This is the number of Ability dots the player may assign to the persona’s character sheet. The persona cannot have a Craft, Lore, Occult or a Dawn Caste Ability rated higher than the Solar’s own, and may not have a higher number of total dots spread across combat Abilities than the Solar has. At least half the dots (rounded up) must go into Eclipse or Zenith Abilities.\n• Halve the Solar’s total experience (round down) and grant this as bonus experience to the persona. This experience cannot be used to change the persona’s Attributes, increase her Willpower or purchase Charms or Merits, but can be used to upgrade Abilities using favored and non-favored prices. Where the persona shares Abilities with the Solar, it automatically knows Charms the Solar already knows. With the exception of Craft, Lore, and Occult it may also learn Abilities the Exalt does not herself know.\n• Assign specialties: three that line up with the persona’s concept. Additional specialties cost three experience points each.\nPlease note: The Solar inherits these traits upon using the prerequisites to change her Intimacies. The first time a Solar undertakes this transition, she does not automatically possess all of the allotted Abilities afforded by this Charm. Immediately after creation, the persona only has access to those traits it shares with the Solar. All other Abilities and specialties must be acquired by spending the normal amount of training time learning them while wearing the guise of the persona. Any outstanding dots in requisite Zenith and Eclipse Abilities must be trained first. Naturally this requires that the Solar spend a considerable amount of time as her alternate self.\nOnce a persona becomes active, it grows along with the Solar, gaining one experience point for every two the Solar accrues. Experience points gained while in the guise of the persona contribute their full amount to the Solar’s experience total, not the persona’s.\n[Box]\nPersonas and Limit Break\nIf the Solar reaches Limit Break while in the guise of a persona, she cannot change personas or revert to her normal Intimacies until the Limit Break has completed.\n[/Box]'
	}, {
		'name': 'Legend Mask Methodology',
		'cost': '--',
		'mins': 'Socialize 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Hundred-Faced Stranger',
		'desc': 'This Charm permanently upgrades all purchases of Heart-Eclipsing Shroud. The player can now purchase Charms for each persona using the experience granted by this Charm’s prerequisite, paying favored or non-favored prices as the persona’s character sheet dictates. With the exception of Craft, Lore, and Occult the persona may learn Solar Charms the Exalt does not herself know. If the Solar is one of the Eclipse Caste, any spirit Charms she learns while under the guise of a persona are purchased through her actual experience points.\nKnowledge of this Charm increases the Solar’s deep mental and spiritual investment in her many personas. When she shifts into such a persona, she becomes increasingly vulnerable to her created passions. While in the guise of a persona, each time the Solar vents a point of Limit through an epic defense of one of her persona’s Principles or Ties, the corresponding Intimacy is transferred to her list of true Intimacies, temporarily voiding the strongest opposing Intimacy or the strongest Intimacy which is antithetical to her persona’s character concept. The voided Intimacy cannot be restored until the transferred Intimacy has been eroded away, but the Exalt is as compelled by this Defining Intimacy as any other, and acting in accordance with it may cause her personality to transform even further.\nSpecial activation rules: This Charm retroactively lowers the cost of Flawlessly Impenetrable Disguise to three motes when it is activated during the four hour dramatic action described in Heart-Eclipsing Shroud. If Perfect Mirror is used during that time, ignore that Charm’s Willpower cost.\nDraw the Curtain\n	Cost: --; Mins: Socialize 5, Essence 4; Type: Permanent\n	Keywords: None\n	Duration: Permanent\n	Prerequisite Charms: Legend Mask Methodology\nThe Solar’s inner self rises closer to the surface. This Charm can be purchased to upgrade one of the personas enhanced by Legend Mask Methodology, granting it an additional 25% of the Solar’s experience points and increasing its experience gain to two for every three the Solar earns. However, purchasing this Charm grants the persona a new Limit Trigger in addition to the Solar’s own. Draw the Curtain can be repurchased once for each persona the Solar wishes to enhance.'
	}, {
		'name': 'At Your Service',
		'cost': '10m, 1wp',
		'mins': 'Socialize 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Draw the Curtain, Knowing the Soul’s Price',
		'desc': 'Upon gazing into her subject’s heart’s desires, the Solar may reflexively transform into an all new persona. The Solar becomes a new character, shaped by the ambitions of her subject. If he needed a pirate captain, she might imbue herself with Sail, Larceny and relevant Intimacies toward anarchy and a love of plunder. The Solar creates this new persona by taking from the traits and Charms of personas created by Heart-Eclipsing Shroud. The persona she devises must have an equal number of traits and Charms as her strongest persona—one which has been enhanced by Draw the Curtain—but may borrow aspects from her true character sheet. If the Solar uses any Larceny Charms to change her appearance at the moment she activates this Charm, her subject is completely incapable of perceiving this change. He may wonder vaguely why that person vanished so suddenly, but will be more concerned with the new figure standing before him, as if they were cut from his dreams to make his wishes come true.'
	}, {
		'name': 'Fugue-Empowered Other',
		'cost': '1 Limit',
		'mins': 'Socialize 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Draw the Curtain',
		'desc': 'With this Charm, the Exalt can draw deeply from her psyche to uplift the Essence of one of her inner selves. Activating this Charm allows the Lawgiver to borrow the Ability rating of one of her personas for a single tick, and she may activate any Charms from that Ability which her persona has learned. Limit Break suffered as a result of Fugue-Empowered Other gives the Solar access to the full Charms and Abilities of her persona for the rest of the scene, but when her Virtue Flaw concludes, she will be genuinely confused as to who she is, without immediately realizing it. The Storyteller should represent this by randomly shuffling the Intimacies of the Solar and her persona.'
	}, {
		'name': 'Soul Reprisal',
		'cost': '16m, 1wp, 20xp',
		'mins': 'Socialize 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Fugue-Empowered Other',
		'desc': 'Once the Lawgivers were driven into the darkness beyond the edge of death. No longer. Upon being struck down, the Solar grasps the light of her divinity before it can flee and is drawn into her next incarnation without ever leaving her body. Instead she sheds her entire current set of Intimacies, Abilities and Charms, inheriting the traits, Charms and Intimacies of one of her personas. This Charm is activated the moment her last health box is checked off: her anima blazes to iconic one last time, and then is vented back to dim. When it goes, roll (Stamina) dice with one automatic success, restoring an equal number of health levels. From that moment onward the Solar is a new person, and remembers her last incarnation as if it were a persona created by Heart-Eclipsing Shroud. This Charm can only be invoked once per story. Using it changes the Solar’s iconic anima manifestation permanently. This Charm’s anima display cannot be muted by any means.'
	}, 

	/*
	New Keywords:
	Pilot: The character must be the captain or the helmsman of the sailing vessel to use this Charm.
	Salient: This keyword indicates that the Charm’s cost requires silver, gold, and white points for major, superior, and legendary craft projects, respectively.

	Craft

	Power
	*/

	{
		'name': 'Flawless Handiwork Method',
		'cost': '6m',
		'mins': 'Craft 1, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar capitalizes on her own genius. Her hands and Essence flow in tune with the spirit of her craft, turning even the shoddiest materials into sublime masterworks. Craft rolls supplemented by this Charm reroll 10s until 10s fail to appear. At Craft 3+, this Charm may be repurchased, allowing the Exalt to also reroll 6s until 6s fail to appear.'
	}, {
		'name': 'Triumph-Forging Eye',
		'cost': '--',
		'mins': 'Craft 2, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Flawless Handiwork Method',
		'desc': 'The Exalt sees forward to her success and approaches a problem with an unerring clarity of vision. Once per week, the Exalt may apply a free full Craft Excellency to any one roll.'
	}, {
		'name': 'Experiential Conjuring of True Void',
		'cost': '4m, 4s/g/wxp',
		'mins': 'Craft 3, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Salient',
		'duration': 'Instant',
		'prereqs': 'Flawless Handiwork Method',
		'desc': 'Through tapping the elemental, refined forces of her own experience, the Solar may access the most pristine and formless center of her own Essence, from which all things may be derived. This Charm may be used after an Attribute + Craft roll, and grants one automatic non-Charm success and (Essence) non-Charm dice. This Charm may not be used on basic projects. At Essence 3+, the dice bonus for this Charm is increased to (Intelligence + Essence).'
	}, {
		'name': 'Unbroken Image Focus',
		'cost': '3m + 1s/g/wxp per success',
		'mins': 'Craft 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Salient',
		'duration': 'Instant',
		'prereqs': 'Experiential Conjuring of the True Void',
		'desc': 'After making an Attribute + Craft roll, this Charm may be invoked to add a supernatural burst of precision, skill, and inspiration to the Solar’s hands. This Charm allows the Exalt to purchase a number of additional non-Charm successes equal to her Essence + successes on the initial roll. This Charm does not factor in “double numbers” effects from other Charms. If the Lawgiver is using a double 9s effect, and rolls three 9s and no other successes, she would be able to purchase (Essence + 3) successes, not (Essence + 6).'
	}, {
		'name': 'Essence-Forging Kata',
		'cost': '2m per mote, 1wp',
		'mins': 'Craft 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One day',
		'prereqs': 'Unbroken Image Focus',
		'desc': 'The Solar channels Essence through her hands and tools to make the final product of her work a matter of legend. Powering this Charm requires a dramatic action lasting at least five minutes, in which the Exalt meditates on future tasks, steadies her mind, feels the weight of her tools, readies her forge for the day, and other similar preparatory actions. While this Charm is active, every two motes committed discounts the cost of the Craft Excellency by one.'
	}, {
		'name': 'Mind-Expanding Meditation',
		'cost': '1sxp per cap increase, 1wxp',
		'mins': 'Craft 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Essence-Forging Kata',
		'desc': 'The Lawgiver is a master of her trade, and uses the work she pours into her craft to inspire her towards new and greater achievements. This Charm may be invoked before an Attribute + Craft roll, allowing the Solar to raise her dice cap at a rate of one silver point per die, to a limit of her current Craft rating.'
	}, {
		'name': 'First Movement of the Demiurge',
		'cost': '--',
		'mins': 'Craft 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Experiential Conjuring of the True Void',
		'desc': 'This Charm permanently enhances its prerequisite. The Solar’s genius inspires her to greater heights, making her aware of patterns and possibilities unforeseen by mortals. For every three of a kind successes (ex: three sevens, three eights, etc.), the player may choose one non-success die and convert it to a 10, adding two successes to the result. If Flawless Handiwork Method is used, 10s created in this fashion are also rerolled until 10s fail to appear.'
	}, {
		'name': 'Supreme Masterwork Focus',
		'cost': '6m',
		'mins': 'Craft 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Flawless Handiwork Method',
		'desc': 'By sheering away all distractions, the Exalt may recognize the strongest elements of her design as she brings them forth, enhancing them to the betterment of the entire project. This Charm allows the Solar to supplement Attribute + Craft rolls for basic and major projects with double 9s. At Craft 5+, Essence 2+, it may be repurchased, allowing the Exalt to alternatively spend five motes, one Willpower, and one gold point to supplement a basic, major, or superior project roll with double 8s. At Craft 5+, Essence 3+, it may be repurchased a third time, allowing the Exalt to pay two motes and one white point to grant any one Attribute + Craft roll double 7s.'
	}, {
		'name': 'Divine Inspiration Technique',
		'cost': '--',
		'mins': 'Craft 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'First Movement of the Demiurge, Supreme Masterwork Focus (x2)',
		'desc': 'Each time she uses her talents to build or repair, the Exalt comes closer to the core truth of her existence. For every three successes earned on a Craft roll, the Solar earns an additional non-Charm die. This effect is recursive; if generated non-Charm dice create at least three successes, another die is generated.'
	}, {
		'name': 'Holistic Miracle Understanding',
		'cost': '--',
		'mins': 'Craft 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Divine Inspiration Technique',
		'desc': 'The Solar shapes wonders from the very fabric of the world. This Charm enhances the prerequisite; if the non-Charm dice generated by the initial roll turn up three or more successes, the new non-Charm dice are augmented by an additional three non-Charm dice.'
	}, {
		'name': 'Inspiration-Renewing Vision',
		'cost': '12m, 1wp, 2wxp',
		'mins': 'Craft 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Essence-Forging Kata, Supreme Masterwork Focus (x2)',
		'desc': 'A moment of creative satori allows the Solar to cleanse her creative vision of all flaws, perfectly attuning her Essence to that of the unborn wonder she wishes to birth. This Charm can be used to supplement a superior or legendary Craft roll, so that it does not count toward the project’s terminus. This Charm can be used once per story, but can be reset by completing a superior or legendary project with a goal number of 50+ without use of this Charm.'
	}, {
		'name': 'Horizon-Unveiling Insight',
		'cost': '--',
		'mins': 'Craft 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Inspiration-Renewing Vision',
		'desc': 'This Charm expands the Lawgiver’s already illimitable mind, allowing her to experience Essence flows in patterns that stabilize and adapt the form of any legendary project she undertakes. This Charm permanently raises the terminus of superior and legendary projects to seven.'
	},

	// Efficiency

	{
		'name': 'Tireless Workhorse Method',
		'cost': '--',
		'mins': 'Craft 2, Essence 1',
		'type': 'Permanent',
		'keywords': 'Stackable',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'The Solar expands her mind, body, and spirit to encompass the drain of more difficult tasks. This Charm permanently grants two major project slots and may be purchased up to (Essence) times.'
	}, {
		'name': 'Efficient Craftsman Technique',
		'cost': '--',
		'mins': 'Craft 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Tireless Workhorse Method',
		'desc': 'This Charm permanently reduces the cost of temporary major slots to three silver points.'
	}, {
		'name': 'Arete-Shifting Prana',
		'cost': '1m, 1wp',
		'mins': 'Craft 4, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Lawgiver may glean knowledge from any endeavor and use it as the foundation for new works. With this Charm, a multidisciplinary Solar may convert craft points earned through different trades. Seemingly unrelated trades convert at a rate of 3:1, while similar trades convert at a rate of 2:1, and extremely similar trades have a conversion of 1:1. The Solar focuses on one set of experience and over the course of a minute spent in concentration, she may use this Charm to move points earned from that discipline to the points earned from another. An example of a 3:1 might be the conversion of points earned cooking into points to aid in building a suit of armor. The Exalt may convert silver, gold, or white points using this Charm, but ultimate conversion rates are decided by the Storyteller. Non-specific point awards (as from Charms that award story-end bonuses) can be applied to any trade and need not be converted.'
	}, {
		'name': 'Supreme Celestial Focus',
		'cost': '--',
		'mins': 'Craft 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Arete-Shifting Prana',
		'desc': 'The Solar expands her mind and awakens her flesh, unlocking the brilliance that sings in her Essence. This Charm allows the Exalt to raise her Craft rating to five by paying white points instead of experience.'
	}, {
		'name': 'Sublime Transference',
		'cost': '6m',
		'mins': 'Craft 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Arete-Shifting Prana',
		'desc': 'Meditating calmly for five minutes, the Solar erases all thought and function; her conscious mind recedes to nothingness. During this time, the player may rearrange the Solar’s crafting points in the following way: two silver points can become one gold point; two gold points can become one white point; one white point can become two gold points, and one gold point can become two silver points. However, each use of this Charm only allows the Solar to shift one type of experience to another; in five minutes, spending six motes, she could convert silver points to gold, but she would have to activate the Charm again to transfer gold points to white. The Exalt may activate this Charm while she is asleep or incapacitated.'
	}, {
		'name': 'Ages-Echoing Wisdom',
		'cost': '--',
		'mins': 'Craft 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Efficient Craftsman Technique, Sublime Transference',
		'desc': 'The Solar’s return to Creation is a time of expanding her mind and senses. Through her immaculate Essence, she becomes a conduit to the lost magic of a vanished age. Upon the purchase of this Charm, the Exalt gains a number of gold points equal to her permanent major slots. This bonus recurs at the end of each story.'
	}, {
		'name': 'Dragon Soul Emergence',
		'cost': '--',
		'mins': 'Craft 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'Stackable',
		'duration': 'Permanent',
		'prereqs': 'Ages-Echoing Wisdom',
		'desc': 'With this Charm, the Solar reaches a confluence of ancient wisdom and future enlightenment that increases her ability to encompass greater efforts. Purchasing this Charm grants the Chosen one permanent superior project slot. This Charm may be purchased up to (Essence) times.'
	}, {
		'name': 'Copper Spider Conception',
		'cost': '5m, 1wp',
		'mins': 'Craft 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Dragon Soul Emergence',
		'desc': 'The Exalt’s understanding of greater wonders is increased. She may use this Charm before beginning a superior project, taking a ten minute dramatic action to conceptualize the task at hand, plan for future stages of the project and organize necessary materials. This Charm lowers the cost of creating a superior slot by two gold points and two major slots, to a minimum of one major slot and one gold point.'
	}, {
		'name': 'Clay and Breath Practice',
		'cost': '--',
		'mins': 'Craft 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Copper Spider Conception',
		'desc': 'As the Solar works with greater wonders, she achieves a sublime, renewing focus. On each interval of a superior roll, when the Solar rolls more successes than the price to finish (typically ten—see “finishing rolls” on p. XX), she earns silver points equal to the rating of the Artifact under construction plus her current Essence score.'
	}, {
		'name': 'Spirit-Gathering Industry',
		'cost': '--',
		'mins': 'Craft 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Clay and Breath Practice',
		'desc': 'Crafting Artifacts requires an extreme commitment of one’s own spiritual energy. Husbanding her resources, the Exalt’s Essence becomes more readily powerful when she rises to the task. This Charm permanently reduces the cost to finish a superior project by (Essence) gold points, to a minimum of three.'
	}, {
		'name': 'God-Forge Within',
		'cost': '--',
		'mins': 'Craft 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'Stackable',
		'duration': 'Permanent',
		'prereqs': 'Spirit-Gathering Industry',
		'desc': 'Similar to Dragon-Soul Emergence, this Charm represents the expansion of the Solar’s physical and spiritual Essence, which allows her to encompass greater and more difficult creations. This Charm may be purchased (Essence) times. Each purchase grants the Exalt two permanent legendary project slots.'
	}, {
		'name': 'Sun-Heart Tenacity',
		'cost': '--',
		'mins': 'Craft 5, Essence 5',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'God-Forge Within',
		'desc': 'Completing a legendary project provides the Exalt with new insights to the mysteries of the universe. Each time the Solar completes such a project, this Charm provides ten automatic non-Charm successes to the next superior or legendary project she attempts to finish.'
	}, {
		'name': 'Unwinding Gyre Meditation',
		'cost': '10m, 1wp',
		'mins': 'Craft 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Spirit-Gathering Industry',
		'desc': 'After successfully completing a superior project for which the Solar earned gold points, the Solar may consume the entire gold point bonus to experience a surge of new potential. Using this Charm voids the Solar’s gold point bonus, but reduces the goal number of the next superior project by (Essence + 5), while adding an additional interval to the roll’s terminus (for extended rolls, see p. XX). Using this Charm also increases the gold point bonus calculation for finishing the project from Artifact Rating * 2 * remaining terminus to Artifact Rating * 3 * remaining terminus. White points gained through superior projects are unaffected by use of this Charm. This Charm only applies to projects of an identical Artifact rating: if the Exalt voided the bonus from a two dot Artifact, this Charm only applies to the next two dot Artifact she attempts. The Exalt may void subsequent bonuses gained with this Charm to increase the Artifact Rating multiplier by one each time (* 3, *4, *5, etc.), reducing the goal number by the current Essence rating (Essence + Essence + 5), and adding an additional terminus (two added instead of one the first time the bonus is voided, three the second time, and so on).'
	}, {
		'name': 'Exegesis of the Distilled Form',
		'cost': '25sxp, 15gxp, all wxp',
		'mins': 'Craft 5, Essence 5',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Unwinding Gyre Meditation',
		'desc': 'After completing five superior or legendary projects, the Exalt may expend a tremendous amount of creative energy to renew the power of her Essence. After spending the cost of the Charm, roll a number of dice equal to the white points voided by the cost. Successes are converted to experience points and added to the Solar’s total experience.'
	}, {
		'name': 'Spirit-Stoking Elevation',
		'cost': '--',
		'mins': 'Craft 5, Essence 5',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Exegesis of the Distilled Form',
		'desc': 'This Charm allows the Solar to replace the experience points costs of certain Charms with an expenditure of white points at a rate of 1:1. This Charm supports the costs of Lore Charms such as Flowing Mind Prana and Wyld-Shaping Technique, and hypothetical Charms which might exist in Occult or Medicine. However, it does not cover experience costs from sorcerous projects or from the Charms of other Abilities.'
	}, {
		'name': 'Summit-Piercing Touch',
		'cost': '10m, 1wp',
		'mins': 'Craft 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Ages-Echoing Wisdom',
		'desc': 'Through diligence, effort, and connectedness to the Essence of her art, the Solar learns to adapt the unfathomable least wonders of the cosmos to the trades which she has mastered. By using this Charm before she begins a superior project to build a two dot Artifact, she can place that project in an unused major slot. Motes committed to this Charm remain committed until the project is finished. If she relinquishes commitment, she must create a superior slot to carry the unfinished artifact, or otherwise risk a catastrophic failure of the project. At Essence 5+, she may use this Charm to craft three dot Artifacts.'
	}, {
		'name': 'Vice-Miracle Technique',
		'cost': '--',
		'mins': 'Craft 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Summit-Piercing Touch',
		'desc': 'The Solar crafter is constantly giving form to the wonders that live inside her mind. A Lawgiver with this Charm is particularly fecund: once per season she may produce a completely finished two dot Artifact of the player’s choosing (or design). The Solar need not pay gold points to complete the project; the Artifact is already complete; the Storyteller should treat this as a piece of work she designed and completed in the margins of all her other projects, using expertise and efficiency to complete a wonder as an unspoken side project. The Solar earns no craft points for producing Artifacts in such a manner. However, if the player produces this Artifact in response to a problem, a question, or otherwise introduces her new invention as part of a socially-driven stunt that makes her character seem like a miraculous wonder-worker, she earns five gold points. At Essence 5+, this Charm can be used to produce a two or three dot Artifact.\nSpecial Activation Rules: This Charm can only be used by a character who has already constructed at least one Artifact rated two or higher, and is in the process of building at least one other.'
	}, {
		'name': 'Wonder-Forging Genius',
		'cost': '--',
		'mins': 'Craft 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'God-Forge Within, Vice-Miracle Technique',
		'desc': 'As proof of her illimitable soul, the Solar may induct a new infinite god-weapon into the world of mortal matter. When she has ten or more legendary projects under way, she may use this Charm to complete one of them without further rolls or expenditures of craft points. This Charm has a similar function for Artifacts of a lower rating, so long as each of the ten Artifacts is the same rating. This Charm may only be used once per story, and may not be used again until at least half of the current projects have been completed. Prematurely abandoned or failed projects do not count as having been completed. Using this Charm awards no craft points; the finished Artifact is its own reward.'
	}, {
		'name': 'Dual Magnus Prana',
		'cost': '30wxp',
		'mins': 'Craft 5, Occult 3, Essence 5',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Terrestrial Circle Sorcery, Wonder-Forging Genius',
		'desc': 'With this Charm, the Solar’s player may retroactively describe the process by which the Lawgiver created a perfect simulacrum of herself through an elaborate sorcerous project. This description occurs the moment the Solar’s incapacitated health level is checked off; instead of dying, the slain character is revealed to be a perfect double of the Solar. The real Solar may then be located anywhere the player chooses, so long as the Storyteller deems it plausible.'
	},

	// Momentum

	{
		'name': 'Brass Scales Falling',
		'cost': '--',
		'mins': 'Craft 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'The Solar’s efforts fleet and flash before her eyes, bringing her closer to an ineffable truth. For each 10 on a Craft roll made without using the Craft Excellency, the Exalt earns a silver point, to a limit of (Essence *2) points. This Charm may be repurchased, increasing the cap to (Essence * 3).'
	}, {
		'name': 'Red Anvils Ringing',
		'cost': '--',
		'mins': 'Craft 4, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Brass Scales Falling',
		'desc': 'The Solar is permanently attuned to the Essence of her workmanship, making her instinctively aware of how her creativity moves the Essence of the world. This greater insight into productivity increases the amount of silver points she may gain from each basic objective by one. For rules on basic objectives, see page XX.'
	}, {
		'name': 'Chains Fall Away',
		'cost': '--',
		'mins': 'Craft 5, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Red Anvils Ringing',
		'desc': 'Each time the Solar achieves all three basic objectives, she gains one gold point.'
	}, {
		'name': 'Peerless Paragon of Craft',
		'cost': '--',
		'mins': 'Craft 5, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Chains Fall Away, Craftsman Needs No Tools',
		'desc': 'As the Solar works deeper into the soul of her craft, she unlocks wisps and flashes of greater wonders, ancient genius, and dim visions of a lost age. Upon purchasing this Charm, roll a free full Intelligence + Craft Excellency and convert successes to silver points. In addition, each 10 on this roll also rewards the Solar with a gold point. This roll is repeated at the end of each story.'
	}, {
		'name': 'Supreme Perfection of Craft',
		'cost': '--',
		'mins': 'Craft 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Peerless Paragon of Craft, Supreme Celestial Focus',
		'desc': 'Upon purchasing this Charm, the Solar earns one gold point and (Essence + 2) silver points for every Craft Ability she has rated at 5+. This bonus recurs each time the Exalt gains a full night’s sleep, but can be earned no more than once per day.'
	}, {
		'name': 'Divine Transcendence of Craft',
		'cost': '--',
		'mins': 'Craft 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Supreme Perfection of Craft',
		'desc': 'This Charm instantly grants the Solar five white points, and five additional white points at the end of each story.'
	}, {
		'name': 'Craftsman Needs No Tools',
		'cost': '6m',
		'mins': 'Craft 3, Essence 1',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'One task',
		'prereqs': 'None',
		'desc': 'A Solar who has mastered this Charm can work directly with her chosen materiel, shaping it with hands, breath, and voice. Without the need for tools or a workshop, the Exalt can start basic and major projects as soon as she has the proper ingredients, and can complete such works with blazing speed, often in just minutes or seconds. Using Craftsman Needs No Tools does allow for the Solar to gain craft point bonuses from her handiwork, and can be used equally well in both building and repair projects. Additionally, if the Solar uses tools to assist her work, the cost of the Charm is reduced by two motes. This Charm does not meaningfully speed the completion of superior or legendary projects.'
	}, {
		'name': 'Thousand-Forge Hands',
		'cost': '10m, 1wp',
		'mins': 'Craft 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Craftsman Needs No Tools',
		'desc': 'The Exalt’s hands flow with the Essence of a thousand craftsmen, her urge is legion and her well is bottomless. When she creates a superior or legendary slot, she may use this Charm to greatly speed her efforts to begin the project (see p. XX). This may be represented as the Exalt thinking, planning, and working with impossible speed. Though it cannot dictate the speed at which she gathers materials or performs tasks not directly associated with Craft, this Charm guarantees that given all such materials are provided, and all such tasks have been completed, the design and forging work that comes before she can roll to finish takes no longer than (6 - Essence) months for N/A and five dot Artifacts, and no more than (6 - Essence) weeks for all else.'
	}, {
		'name': 'Words-as-Workshop Method',
		'cost': '5m, 1wp',
		'mins': 'Craft 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Mute, Stackable',
		'duration': 'Instant',
		'prereqs': 'Craftsman Needs No Tools, Vice-Miracle Technique',
		'desc': 'The Solar speaks the implements of her trade into existence. Upon using this Charm, the Exalt describes Artifact tools she needs to complete the present task, be it one of Craft, Lore, Medicine, Occult, or Investigation. The Essence of the world shapes itself into an Artifact matching her description, with powers and active Evocations commensurate to the Exalt’s description and the Storyteller’s whims. Such Artifacts can be as simple or complex as needed, and may even have personalities. With each use of this Charm, the Solar may describe up to (Essence) tools, but the Storyteller should be aware of diminishing returns; the overall effectiveness should be based on the player’s stunts and descriptions. In any case, these Artifact assistants allow for unspecified bonuses ranging from non-Charm dice, to the ability to listen for a daiklave’s heartbeat, to holding a patient’s soul in place while the Solar performs continual, complex surgery to fix horrific injury. Using Craftsman Needs No Tools with appropriate created Artifacts may allow the Exalt to work on superior or legendary Artifact projects at inopportune moments, with a stunt. Artifacts created by this Charm vanish in a blaze of Essence as soon as the Exalt is finished using them, or at the end of the scene, whichever comes first.'
	},

	// Repairing and Reforging

	{
		'name': 'Shattering Grasp',
		'cost': '6m',
		'mins': 'Craft 5, Essence 1',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'One task',
		'prereqs': 'Craftsman Needs No Tools',
		'desc': 'An Exalt with this Charm knows the strengths and weaknesses of her chosen materials and may rend them down with a mixture of light, precise touches and wringing blows. She may rend apart stone with her hands, destroy a door by crossing it with her palms and may disassemble a steel portcullis with her fingertips. The two former examples represent basic tasks, while the latter represents a major project. In any case, she needs no tools to perform such tasks, only the appropriate trade in Craft, and a few moments time. Disassembly does not accrue the Exalt any craft points, though if she uses the rent material to build new objects or to repair the ones she has damaged, she may earn craft points accordingly.'
	}, {
		'name': 'Durability-Enhancing Technique',
		'cost': '5m',
		'mins': 'Craft 5, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Craftsman Needs No Tools',
		'desc': 'The Solar’s keen understanding of an object allows her treat it with skill and Essence, greatly increasing its durability. The Exalt may temper a blade, reinforce a door, or make a sail fireproof or nearly impenetrable to mundane attacks. She may make an inscription in marble that will not fade even after a hundred years of wind and rain. The Solar spends five minutes to an hour treating an object no larger than (Essence) yards in radius, increasing the difficulty to damage it by two or (Essence), whichever is larger. Objects which are fortuitously protected during the course of a scene, or which prove in some way to raise the Exalt’s social standing, accrue her a silver or gold point for basic or major objects, respectively, regardless of whether she built them or not. Durability conferred by this Charm is conferred permanently. The edges of blades strengthened by this technique do not dull after an entire day of hacking, and a reinforced helm may not shatter when struck by the blow of a mace.'
	}, {
		'name': 'Object-Strengthening Touch',
		'cost': '6m',
		'mins': 'Craft 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'One scene',
		'prereqs': 'Durability-Enhancing Technique',
		'desc': 'With a bare touch, the Solar can infuse an object of (Essence + 2) yards in radius with hardening Essence, greatly increasing its durability. Using this Charm increases the difficulty to destroy the object by the (Solar’s Essence + 1). If the Solar is holding the object, it becomes nigh-unbreakable without magic. Objects strengthened with this Charm also become resistant to fire, acid, freezing, and other forms of damage. The benefits of this Charm last only one scene, but they stack with the effects of the prerequisite for that scene. Use of this Charm does not accrue craft points.'
	}, {
		'name': 'Chaos-Resistance Preparation',
		'cost': '5m',
		'mins': 'Craft 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Object Strengthening Touch',
		'desc': 'The Solar can reinforce an object so that the Wyld cannot touch it. The Lawgiver spends up to an hour treating an object no more than (Essence) yards in radius. If the object is worn or wielded, it protects itself and the wielder / wearer from the twisting effects of the Wyld. This protection is limited: in the bordermarches a character can go (Solar’s Essence) days without ill effect. This resistance is halved in the middlemarches, and reduced to hours in the deep Wyld. If the character only has partial protection—say a caravan guard wielding only a treated pike—then this protection is reduced to hours and minutes respectively. Chaos-Resistance Preparation can also be used to treat objects, and like and labeled objects traveling in auspicious arrays stack their protections, allowing groups of treated objects to survive Wyld journeys with the same benefits of a character wearing multiple treated items. At Essence 3+, the Exalt may pay fifteen motes, one Willpower to use this Charm on the project scale (see p. XX), working for (10 - Stamina) hours to cover a considerable number of goods and vehicles or arms and armor. She may protect the hull of a small trade ship, as well as its rigging and sails, and need not protect the cargo or provisions below decks, or she may protect several wagons, single-handedly preparing a small caravan for a trip through chaos tainted lands.'
	}, {
		'name': 'The Art of Permanence',
		'cost': '6m, 1wxp',
		'mins': 'Craft 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Chaos-Resistance Preparation',
		'desc': 'A Solar who uses this Charm can invest her works with magic, causing them to endure forever. Candles spun by her hands burn forever, and a horse wearing shoes from her forge need never be shod again. This Charm only affects basic and major projects, and does not prevent created items from being destroyed by direct attack or overwhelming traumatic damage such as being caught in an explosion or buried under a mountain. In addition, such objects are indelibly marked by the Solar’s touch. If she claims to be the builder of a torch that never ceases burning, or a roof that never leaks, characters instinctively know it to be true without needing further proof. Such objects may also render the Exalt’s identity to beings with particular Investigation or Occult magic. If she encounters her own works from a past life, the Lawgiver will automatically recognize them as her own.'
	}, {
		'name': 'Crack-Mending Technique',
		'cost': '10m, 1wp',
		'mins': 'Craft 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Crack-Mending Technique depicts a Lawgiver whose talent and touch is such that she can repair even impossibly destroyed things. This Charm can’t restore things that were completely unmade (for example, by powerful sorcery, digestion in a behemoth’s gullet, or immersion in molten rock) but it can remake extremely damaged things like shattered crystal, burnt paper, splintered wood and twisted metal. As the Solar works with the remains of a broken or destroyed object, she may slowly piece it together with word, touch, and Essence over the course of (10 - Essence) hours. If used while under the effect of Craftsman Needs No Tools, this time is reduced to minutes or seconds, and eliminates both the need for tools, and in many cases for materials. This Charm can restore magical objects but not metaphorical concepts: it cannot mend a broken heart, nor can it put the magic back into a First Age construct whose magic has fled or faded away. This Charm may lower the difficulty of repairing Artifacts that are fragmented or shattered, while also making such a repair possible, but otherwise does not remove the material requirements or affect the goal number.'
	}, {
		'name': 'Time Heals Nothing',
		'cost': '4m, 1wp',
		'mins': 'Craft 5, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Crack-Mending Technique',
		'desc': 'The Lawgiver can press aside the veil of time to deliver the world from its ravages. This Charm allows the Exalt to instantly create a major project slot for the purposes of repairs. This slot vanishes when the repair is completed. An Essence 3+ repurchase allows the Solar to alternately pay six motes, one Willpower to create a temporary superior repair slot.'
	}, {
		'name': 'Blood Diamond Sweat',
		'cost': '--',
		'mins': 'Craft 5, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Time Heals Nothing',
		'desc': 'As the Exalt raises her world from ash and ruin, she is renewed by her own labor and sacrifice. This Charm depicts a Solar who draws greater understanding from the restoration of objects than mortal crafters. After completing a repair, the Exalt gains one additional craft point for every basic objective completed. If she is repairing an Artifact, she earns (Artifact’s rating) gold points and one white point. Legendary Artifacts offer no repair rewards.'
	}, {
		'name': 'Breach-Healing Method',
		'cost': '7m',
		'mins': 'Craft 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One task',
		'prereqs': 'Time Heals Nothing',
		'desc': 'With the return of the Solar Exalted comes the return of old magic. The power of the Sun’s Essence flows in Creation once more. With this Charm, the Solar establishes a field of (Essence * 2) yards in radius, in which the Essence of the world is quickened with Solar power, where old things come alive again, and truly wondrous things may happen. Anyone standing in this field gains a non-Charm dice bonus to their Craft, Lore, Occult, and Medicine rolls equal to the Solar’s Essence. In addition, repair and Medicine rolls are made at one less difficulty. The Solar must be attempting to repair an object or treat an injury to use this Charm, and its effect lasts until her work is finished. Characters who stand within the circle of the Solar’s influence see her work with greater clarity and understanding.'
	}, {
		'name': 'Realizing the Form Supernal',
		'cost': '5m, 1wp',
		'mins': 'Craft 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Breach-Healing Method',
		'desc': 'The First Age was raised by the hands of the Solar Exalted, and they alone can restore its lost glories. When using Breach-Healing Method to repair an Artifact, the Solar may use this Charm to lower the repair difficulty by one. The moment she touches the damaged Artifact, the goal number to repair it is reduced by her (Intelligence * Essence)—the Artifact is seen to partially reform, its shattered parts flying together in her hands. This can fully restore certain objects. This Charm may be used once per story, but may be reset by completing an Artifact repair without it.'
	}, {
		'name': 'Design Beyond Limit',
		'cost': '10m, 1wp, 3xp',
		'mins': 'Craft 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Crack-Mending Technique, Craftsman Needs No Tools',
		'desc': 'A Solar who has the power to build an Artifact may also temper it with greater power. To use this Charm, the Exalt must have an Artifact weapon to work with, and the owner of the weapon must have unlocked all of its Evocations. Typically this means the Artifact has a rating of three or four dots, as Artifacts rated five or N/A usually have no known limit to their number of inactive Evocations. With this Charm, the Exalt spends (10 - Essence) hours reforging the weapon in her workshop. When she is finished, the weapon gains one new Emerald, Sapphire, and Adamant Evocation. Each of these Evocations is inactive and must still be learned. If the weapon does not belong to the Solar, the experience points cost can be paid by the weapon’s owner. This Charm may not be used twice on the same weapon until the added Evocations have been mastered. The nature of added Evocations will reflect the wielder’s spirit, the weapon’s attitude and character, and the forger’s design.'
	}, {
		'name': 'Celestial Reforging Technique',
		'cost': '10m, 1wp, 3xp',
		'mins': 'Craft 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Design Beyond Limit',
		'desc': 'Carrying a daiklave or other Artifact weapon into her forge, the Solar may enact a working of hammer and flame, blood and Essence, to coax and reshape the nature of an Exalted weapon, reshaping its current active Evocations. This process takes (10 - Essence) hours, and allows the weapon’s owner’s player to change the current active Evocations that are live on the weapon. If the Solar does not own the weapon she is reforging, the owner can pay the experience point cost of the Charm’s activation. This Charm may only be used on a particular weapon once per story.'
	}, {
		'name': 'Hero-Forging God-Weapon',
		'cost': '--',
		'mins': 'Craft 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Design Beyond Limit',
		'desc': 'When using the prerequisite, the Exalt instead temper the weapon with one Sapphire and two Adamant Evocations, but the latter two must build from one another and must be based on at least one already-mastered Adamant Evocation. In addition, the Solar may roll (Essence) dice, and if at least one of these comes up a success, she may add a third inactive Adamant Evocation to the weapon.'
	}, {
		'name': 'Soul-Forge Tempering',
		'cost': '15m, 1wp, 4xp, 4wxp',
		'mins': 'Craft 5, Essence 4',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Hero-Forging God-Weapon',
		'desc': 'The Lawgiver can temper a blade with even greater magic. Using this Charm often requires the Solar be provided particular magic materials or even more esoteric physical expressions of magic such as carved motes (see the rules for sorcerous projects on page XX). The Storyteller may make the required materials as daunting as the process requires—upon tempering, sharpening and working the weapon in her shop for (10 - Essence) hours, the Solar can unlock one inactive Emerald Evocation, causing it to go live. In addition, she may roll (Essence) dice, and if she accrues at least one success, she may unlock an additional Sapphire Evocation, and if she gains at least three she may cause a Sapphire and Adamant Evocation to go live. If the Exalt is tempering a weapon belonging to another character, the experience points cost can be paid by the weapon’s owner. This Charm may not be used twice on the same weapon until the owner has learned at least twice the number of unlocked Evocations through normal means.'
	},

	// Lore

	{
		'name': 'Wyld-Dispelling Prana',
		'cost': '5m, 1wp',
		'mins': 'Lore 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Varies',
		'prereqs': 'None',
		'desc': 'The Lawgiver is the embodiment of order. With her knowledge and will, chaos is cast asunder. Through use of this Charm, the Exalt may fix her notice on any object, structure, or character (including herself) at the moment it is first affected by the twisting power of the Wyld. The Solar’s solid knowledge flows out in a rush of Essence, sluicing away the Wyld’s influence. In addition, roll the Solar’s (Mental Attribute) + Lore with (Essence) non-Charm bonus dice, with a difficulty based on the source of the warping, with the bordermarches being difficulty 3 and the Deep Wyld being difficulty 5. Any extra successes on this roll equates to a number of turns (in combat) or minutes (out of combat) for which the target of Wyld-Dispelling Prana becomes immune to further twisting. This Charm may affect a character at up to medium range, and requires multiple uses to protect objects or structures larger than a horse.\nSpecial activation rules: After using this Charm once in a scene, the Solar does not need to pay to use it again unless she fails the subsequent Lore roll; she may continue to direct sluicing bolts of Essence at targets for free, until the subsequent Lore roll fails to produce any successes.'
	}, {
		'name': 'Chaos-Repelling Pattern',
		'cost': '10m, 1wp',
		'mins': 'Lore 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One hour',
		'prereqs': 'Wyld-Dispelling Prana',
		'desc': 'By asserting her existence against the ravages of chaos, the Solar makes her person sacrosanct. Through use of this Charm, the Solar protects an area around herself out to short range in every direction. Characters within this area of focus cannot be twisted by the Wyld, nor can their minds be torn asunder by its influence. Chaos-Repelling Pattern also forces the environment within its area of effect to behave with the physical laws of Creation. The ground will not transform beneath the Solar’s feet, nor will she suddenly fall into the sky. However, this Charm does nothing to stop creatures of the Wyld from attacking the Solar, nor will it do anything to change their composition. At the end of an hour, if the Exalt chooses to reactivate this Charm, ignore the Willpower cost.'
	}, {
		'name': 'Harmonious Academic Methodology',
		'cost': '--',
		'mins': 'Lore 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'The Solar’s mind covers a spectrum of mastered topics. With this Charm, add the Solar’s Essence in non-Charm automatic successes to any Lore roll that involves a Lore specialty. In addition, the player may roll the Solar’s Intelligence + Lore once per story, converting successes into additional topics the Solar may treat as a specialty. The Storyteller may veto any particular topic, in which case the player is allowed to change the excepted specialty to one that is more acceptable. Finally, at any point in which the Solar succeeds at a moderately or extremely difficult roll to introduce or challenge a fact (see p. XX), the player may request to add a related topic to the Solar’s library of known topics. As with all other topics, this is allowable only at the Storyteller’s discretion.'
	}, {
		'name': 'First Knowledge’s Grace',
		'cost': '4m',
		'mins': 'Lore 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Harmonious Academic Methodology',
		'desc': 'Affecting a calm and patient demeanor, the Solar is able to project the light of her knowledge into the darkest of places. While affecting this Charm, the Solar ignores all penalties to teach someone. She can educate a person who is deemed medically incapable of learning, such as someone who is developmentally disabled, or someone who has suffered traumatic injury or privation by the Fair Folk. This Charm does not affect social influence rolls to persuade a character of something.'
	}, {
		'name': 'Flowing Mind Prana',
		'cost': '1xp+',
		'mins': 'Lore 5, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'First Knowledge’s Grace',
		'desc': 'The Lawgiver is a master instructor, capable of passing on truths and talents as surely as the sun passes daylight. To activate this Charm, the Solar commits a number of experience points from her own unspent experience total. She may confer these experience points to another character by delivering a lesson she has constructed, allowing her to train a character’s Attributes or Abilities up to a rating of 5, even if this puts the character beyond her own rating. However, for each three experience points the Solar spends on the character in question, that character must adopt an Intimacy the Solar holds at the minor level. The Solar may choose which Intimacy is conferred. For each three experience points conferred, the Solar may confer individual Intimacies, or she may increase a single Intimacy’s intensity from minor to major, or from major to defining, so long as she holds that Intimacy at the major or defining level. Intimacies conferred in this manner cannot be decayed for any reason until the character has performed at least one task equal to that Intimacy’s intensity (see p. XX).\nThe Solar has sole discretion over who is able to benefit from the experience points on offer. Refer to training times on page XX to determine how long each training session should take. At the end of each story, the Solar may roll a number of dice equal to experience points spent on this Charm, regaining a number of experience equal to her successes, but not beyond the total amount of experience she expended in training. Solars with Socialize Charms related to the creation of personas may use this Charm while in the guise of a persona, but they must pay from both their main unspent experience total and the persona’s unspent experience total to do so. Lastly, the Solar cannot benefit from this or any other experience-granting training Charm in the same story in which she uses it to benefit someone else.'
	}, {
		'name': 'Hidden Wisdom Bestowal',
		'cost': '10m, 1wp',
		'mins': 'Lore 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Mute',
		'duration': 'One scene',
		'prereqs': 'Flowing Mind Prana',
		'desc': 'A Solar is not safe to pass on her knowledge. This Charm supplements an effort to train characters with the prerequisite, disguising subversive or dangerous lessons as something they’re not. The Lawgiver might appear to be giving a lesson on Immaculate catechisms while actually training itinerants to resist the Realm; a lesson on eroticism might hide insights into demonology. Only the targets of the Solar’s training can understand the true meaning of her lesson.'
	}, {
		'name': 'Tireless Learner Method',
		'cost': '1xp',
		'mins': 'Lore 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Flowing Mind Prana',
		'desc': 'In a flash of insight, the student becomes the master. As per Flowing Mind Prana, when the Solar rolls to regain experience points at the end of the story, she may pay one experience point to affect this Charm, reflecting on her student’s progress. This allows her to reroll all non-successes on the roll to regain experience a single time. This Charm explicitly allows the Solar to gain back more experience points than she invested in training.'
	}, {
		'name': 'Legendary Scholar’s Curriculum',
		'cost': '--',
		'mins': 'Lore 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Flowing Mind Prana',
		'desc': 'This Charm upgrades the prerequisite, allowing the Solar to offer the committed experience points to (Essence) different characters, vastly reducing her cost to train multiple specialists. She may also offer half the amount (rounded down) to (Essence * 5) additional characters. Bear in mind that the Lawgiver still has to commit sufficient time to training all of these characters, or the experience points cannot be spent to improve their traits. With this Charm, the Solar can confer Intimacies she does not personally hold.'
	}, {
		'name': 'Selfsame Master Instructor',
		'cost': '--',
		'mins': 'Lore 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Legendary Scholar’s Curriculum',
		'desc': 'This Charm upgrades Flowing Mind Prana, allowing the Solar to use her experience points to teach a single character any spell or Charm she knows, so long as the character qualifies for that spell or Charm. The Lawgiver may not teach Sidereal Martial Arts.'
	}, {
		'name': 'Essence-Lending Method',
		'cost': '3m',
		'mins': 'Lore 1, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Lawgiver fortifies her allies with actions as surely as with words. Upon touching a target and paying three motes, the Solar may transfer up to (Essence * 3) motes from her mote pool to her target’s. In addition, once per scene she may roll Wits + Lore, generating a number of motes equal to her successes and awarding them to her target. If the target cannot accept all the motes transferred by Essence-Lending Method they have until their next action to spend them before they dissipate.'
	}, {
		'name': 'Will-Bolstering Method',
		'cost': '5m, 1wp',
		'mins': 'Lore 2, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Essence-Lending Method',
		'desc': 'With this Charm, the Lawgiver may bolster the mind and spirit of her charge, lifting them up with inner strength. Upon paying this Charm’s cost, the Exalt may transfer up to her Essence in temporary Willpower to another character. In addition, roll a single die and add any successes to the recipient’s Willpower. The Exalt must always transfer at least one point of Willpower from herself to her target when using this Charm. Will-Bolstering Method can explicitly increase a character past their maximum Willpower, and even past a rating of ten.'
	}, {
		'name': 'Wound-Accepting Technique',
		'cost': '3m per health level, 1wp',
		'mins': 'Lore 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Will-Bolstering Method',
		'desc': 'The Lawgiver can channel her very life-force into another. The Solar must touch her target to use this technique, taking up to (Essence) damaged health levels from her target and taking a like amount of damage. It is possible for an Exalt to kill herself with this Charm.'
	}, {
		'name': 'Injury-Forcing Technique',
		'cost': '5m per health level, 1wp',
		'mins': 'Lore 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Wound-Accepting Technique',
		'desc': 'This Charm functions as its prerequisite, but in reverse: the Solar can force up to (Essence) damaged health levels onto a target, healing her own health levels in turn. When done in combat, this is a difficulty 5 gambit done with the Solar’s chosen hand-to-hand combat Ability.'
	}, {
		'name': 'Essence-Draining Touch',
		'cost': '1wp',
		'mins': 'Lore 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Injury-Forcing Technique',
		'desc': 'The Exalt may draw the Essence from a target with a touch. If the target possesses a mote pool, the Exalt may touch them and pay one Willpower to roll Wits + Lore against their Resolve (unmodified by Intimacies), stealing motes equal to the extra successes from their peripheral mote pool (defaulting to personal if their peripheral Essence is depleted). In combat, this is a difficulty 5 gambit executed with a hand-to-hand combat Ability of the Exalt’s choice.'
	}, {
		'name': 'Force-Draining Whisper',
		'cost': '10m, 1wp',
		'mins': 'Lore 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Clash, Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Essence-Draining Touch',
		'desc': 'The Solar’s knowledge of the world’s secrets allows her to gainsay any force that would strike her down. As she is struck with a decisive attack, the Solar glances into the underpinnings of the universe, and utters a cipher she sees there. Roll the Exalt’s Wits + Lore. Each success removes a single die of damage from the attack and converts them to points of Initiative granted to the Lawgiver. Solars have been seen to walk unharmed through direct hits from offensive sorcery through use of this Charm. Force-Draining Whisper may be used once per scene, but is reset if the Solar or any of her allies reaches their last undamaged health level. At Essence 4+, the Solar may use this Charm to protect an ally at up to long range.'
	}, {
		'name': 'Will-Shattering Illusion',
		'cost': '10m',
		'mins': 'Lore 5, Essence 4',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Chaos-Repelling Pattern, Force-Draining Whisper',
		'desc': 'Drawing from the deepest well of her existence, the Solar conjures forth a riddle or apparition from her ancient Essence, and channels it against a single target. Roll the Solar’s Wits + Lore with (Essence) bonus dice. The successes on this roll create the difficulty of the riddle or illusion posed to her target. The character must answer this effect with their own Intelligence or Wits + Lore. If they fail the roll, their mind is momentarily shattered, and they lose two points of temporary Willpower. When done in combat, the target also loses four Initiative, awarded to the Solar. If the target has equal or greater Essence than the Exalt, the Solar also gains a point of Willpower. This Charm may be used once per scene.'
	}, {
		'name': 'Essence-Twining Method',
		'cost': '6m, 1wp',
		'mins': 'Lore 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Essence-Draining Touch',
		'desc': 'The Exalt may touch a willing target who has an active mote pool, and may use this Charm to switch a number of motes from peripheral to personal motes and vice versa. Roll a free full Intelligence + Lore Excellency with (Essence) automatic non-Charm successes to determine how many motes are converted. The Solar may not use this Charm on herself until E5+, but if Lore is her Supernal Ability, waive this requirement.'
	}, {
		'name': 'Essence Font Technique',
		'cost': '--',
		'mins': 'Lore 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Will-Bolstering Method',
		'desc': 'The Solar becomes a conduit for tremendous power. This Charm turns the prerequisite and Essence-Lending Method into Reflexive Charms, allowing them to be combined. Furthermore, when they are combined, ignore the three mote cost of Essence-Lending Method and the Willpower cost of Will-Bolstering Method. In addition, each roll in this cascade gains recurring 10s. That is, if a 10 appears, roll another die. Keep rolling dice until no further 10s appear.'
	}, {
		'name': 'Immanent Solar Glory',
		'cost': '--',
		'mins': 'Lore 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Essence Font Technique',
		'desc': 'The Solar draws strength from her own recurring Essence. Any time the Solar rolls a 10 for any Lore-based roll, or any Lore Charm, she gains a mote of Essence.'
	}, {
		'name': 'Flowing Essence Conversion',
		'cost': '10m',
		'mins': 'Lore 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Immanent Solar Glory',
		'desc': 'At the iconic anima level, the Solar may draw in her anima, internalizing it and then pushing it outward in a surge of Essence. Doing so returns her anima to the dim level, and resets the once-per-scene effect of Essence-Lending Method. This Charm’s cost never generates anima display.'
	}, {
		'name': 'Power-Restoring Invocation',
		'cost': '2i',
		'mins': 'Lore 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Perilous',
		'duration': 'Instant',
		'prereqs': 'Flowing Essence Conversion',
		'desc': 'When her anima is blazing, the Solar sees the flows of power clearly. While in combat, she may use this Charm to release her iconic anima. The blazing tendrils of her power race in every direction, striking her allies and drawing new power to them. The range of this effect is unlimited, within the same scene. Roll the Solar’s Perception + Lore with (Essence) automatic successes. Convert generated successes into motes of Essence and divide the awards amongst applicable allies. Using this Charm returns the Solar’s anima to the dim level. At Essence 5+, remove the Perilous keyword. If the Solar has set Lore as her Supernal Ability, waive this requirement.'
	}, {
		'name': 'Surging Inner Fire',
		'cost': '--',
		'mins': 'Lore 5, Essence 4',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Power-Restoring Invocation',
		'desc': 'The stresses of mental violence draw power from the recesses of the Solar’s mind. Once per scene, the Solar may use this Charm to restore a number of motes based on her current temporary Willpower. For each temporary Willpower below her permanent Willpower score, she gains two motes of Essence. When used in combat, this Charm adds an extra mote to the Solar’s per round regeneration, upping it from five to six. This effect lasts until she is struck with an attack that does successful withering damage. This Charm is reset by earning three or more points of temporary Willpower through stunts, Charms, and so on.'
	}, {
		'name': 'Surging Essence Flow',
		'cost': '--',
		'mins': 'Lore 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Flowing Essence Conversion',
		'desc': 'The Solar’s mastery of Essence flows allows her to guide the movements of pure spirit force. This Charm enhances Essence-Lending Method and Will-Bolstering Method permanently, allowing both Charms to be used on targets at short range, without having to touch them. This Charm also lowers the cost of its prerequisite to eight motes.'
	}, {
		'name': 'Seal of Infinite Wisdom',
		'cost': '--',
		'mins': 'Lore 5, Essence 4',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Surging Essence Flow',
		'desc': 'The Lawgiver unbinds a lost vision of glory and rises to greater power. The next time the Exalt stands to benefit from Immanent Solar Glory, that Charm now counts 8s, 9s and 10s for the purposes of restoring essence. Also upon using this Charm, the Solar’s anima automatically increases by one level, an effect which cannot be muted by any means. This Charm may be used once per scene, but can be reset by a two point stunt which may include the activation of this Charm. At Essence 5+, this Charm becomes Reflexive and may be used during phases of Wyld-Shaping Technique.'
	}, {
		'name': 'Incalculable Flowing Mind',
		'cost': '7m',
		'mins': 'Lore 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Seal of Infinite Wisdom',
		'desc': 'Once per story, the Solar may use this Charm to channel an inner wellspring of restorative knowledge. This Charm awards three points of temporary Willpower to the Solar, and may increase her current Willpower past her permanent rating.'
	}, {
		'name': 'Unstoppable Magnus Approach',
		'cost': '5m, 10i',
		'mins': 'Lore 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'Perilous',
		'duration': 'Instant',
		'prereqs': 'Incalculable Flowing Mind, Surging Inner Fire',
		'desc': 'With mental skill beyond comparison, the Solar deftly converts the flow of combat into restorative power. In combat, the Lawgiver may use this Charm to gain one point of temporary Willpower.\nOn Unstoppable Magnus Approach\nNote that any use of this Charm which causes the character to be roleplayed as if they are aware of initiative as a resource is illegal per the rules on page XX. This means that if the player defers attacks against an opponent, prolonging combat in order to restore a character’s Willpower, this Charm doesn’t work.'
	}, {
		'name': 'Power-Awarding Prana',
		'cost': '5m + 1m per 1xp',
		'mins': 'Lore 5, Essence 4',
		'type': 'Simple',
		'keywords': 'Mute, Stackable',
		'duration': 'Indefinite',
		'prereqs': 'Essence Font Technique, Selfsame Master Instructor',
		'desc': 'The Solar can uplift another Lawgiver, making them a vector for her power. With a touch, the Exalt grants the target a Solar Charm they qualify for, even if the initiating Exalt does not know the Charm herself. If the initiating Solar has a higher Essence rating than her target, or has selected Lore as her Supernal Ability, the recipient may learn Charms at one Essence higher than their current rating.\nTo use this Charm, the Solar commits five motes plus a number of motes equal to the experience points cost the target would have to pay to learn the Charm. The recipient pays the activation costs of such Charms from their own mote pools.\nAt any time she wishes, the initiating Solar may end commitment to this effect, causing knowledge of the conferred Charm to fade from the recipient’s mind. Power-Awarding Prana can never be forcefully dispelled or prematurely ended by any sort of magic. At Essence 5+, the Solar can use this Charm on herself. If Lore is her Supernal Ability, waive this requirement. If the target is Essence 5 and beyond, Power-Awarding Prana does not allow the training of Charms at higher Essence ratings than the character’s current maximum. For example, an Essence 5 Solar cannot teach herself Essence 6 Charms, but she can still confer Essence 5 Charms to an Essence 4 character.'
	}, {
		'name': 'Order-Affirming Blow',
		'cost': '15m, 1wp',
		'mins': 'Lore 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The ravages of the Wyld and alterations to the Loom of Fate can be reversed by the Solar Exalted. With this Charm, the Solar can shatter the twisting effects of magic and the Wyld, stripping away all such effects and restoring a target to their natural state. If the target does not want to be touched, this can be executed socially with a successful Larceny vs. Awareness contest to clandestinely touch the target, or if the target is a bit more incautious, the Solar may attempt to seduce them in order to deliver the touch. In combat, this Charm is a difficulty 5 gambit made with the Solar’s chosen hand-to-hand combat Ability. Fair Folk touched by this Charm are not undone, but experience a temporary transformation lasting (Solar’s Essence) scenes, whose severity is based on an Intimacy the Fair Folk has for the Solar, as well as its context. If the Fair Folk has no Intimacy for the Solar, the Storyteller may decide how it is changed. The Fair Folk’s player may also veto any changes to their character that makes them virtually unplayable or helpless.'
	}, {
		'name': 'Bottomless Wellspring Approach',
		'cost': '--',
		'mins': 'Lore 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Harmonious Academic Methodology',
		'desc': 'The Solar is a living font of vital knowledge. When a character’s knowledge of historical events, cultural norms, local myths and rumors, number systems, etc. is tested, roll Intelligence + Lore against a Storyteller-defined difficulty; for each extra success on this roll, the Storyteller has the successful character reveal a number of facts which are important to the plot or useful to a task at hand. With this Charm, this effect is even more powerful. If the topic in question falls into the Solar’s Lore expertise—that is, the background reflected by her Lore rating—or any of her Lore specialties, she gains one automatic success on this roll, and any extra successes she generates are doubled.'
	}, {
		'name': 'Lore-Inducing Concentration',
		'cost': '3m',
		'mins': 'Lore 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Bottomless Wellspring Approach',
		'desc': 'The Solar draws the legend of Creation from deep within her consciousness. This Charm supplements an attempt to introduce or challenge a fact (p. XX), awarding one automatic success and rerolling 6s until 6s no longer appear. If the Exalt has learned Immanent Solar Glory (p. XX), the Solar may always roll to establish their knowledge, even if the Storyteller determines they succeed without a roll.'
	}, {
		'name': 'Truth-Rendering Gaze',
		'cost': '6m',
		'mins': 'Lore 5, Essence 2',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Lore-Inducing Concentration',
		'desc': 'By focusing intently on a subject, the Solar can produce a sudden insight. This Charm is a (Mental Attribute) + Lore based read intentions action against a difficulty based on whether the subject of this examination falls into the Solar’s area of expertise. This read intentions action can be used on an object to reveal its purpose and function, such as with a mysterious artifact, though it does not reveal how to use it. It can also be used on geography which the Solar has studied, to give the Lawgiver or the person she is advising (Solar’s Essence) non-Charm bonus dice for Survival or War rolls for the rest of the scene. If she is a student of Shogunate architecture, she could tell that a dilapidated structure being used for a market was a Shogunate-era Immaculate temple. If she is a mathematician, the numbers speak to her; she may solve a complex proof in her head, in a matter of seconds. With this Charm, the Solar polymath awakens the world from its dark slumber.'
	}, {
		'name': 'Heaven-Turning Calculations',
		'cost': '--',
		'mins': 'Lore 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Truth-Rendering Gaze + Any two Lore Charms',
		'desc': 'This Charm is special, in that it requires the Solar’s Lore rating to reflect a background of intense mathematic study. With this Charm, the Exalt’s study of number theory and proofs unlocks her ability to approach complex problems mathematically. Add (Essence) non-Charm bonus dice to her Craft, Sorcery, and speculative Bureaucracy rolls, and Lore rolls which require logic or mathematics, and any use of Wyld-Shaping Technique.'
	}, {
		'name': 'Prophet of Seventeen Cycles',
		'cost': '12m, 1wp',
		'mins': 'Lore 5, Essence 4',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Truth-Rendering Gaze',
		'desc': 'The Lawgiver’s knowledge of the past and her understanding of physical laws allows her to make nigh-flawless general predictions. To use this Charm, the Exalt must spend a day studying a subject from an authoritative or definitive source. Her player may then make a pronouncement against an ongoing project based on knowledge her studies reveal, creating bonuses for those who act in accordance with her accurate predictions, and penalties for those who go against them. For example, after reading about the patterns of weather, hostile elemental activity and famine in Jiara during the summer months over the last thousand years, she predicts that Mnemon will not attack Jiaran rebels until fall at the earliest, and will instead spend the summer months consolidating her forces while conserving water and gathering resources for a winter campaign. If Mnemon enacts a project to consolidate her forces while gathering resources until winter, the Storyteller should consider her project vastly more successful and easier to complete than otherwise. If she instead decides to invade Jiaran rebel territory in the summer, her invasion will be met with project difficulties, such as resource shortages, elemental attacks, inclement weather, and more specifically, mechanical penalties to the first War rolls her generals make in the conflict. Conversely, if Mnemon harbors her forces and the Jiaran rebels instead try to attack her, it is their commanders who will suffer penalties to their opening War rolls. Once the Solar has made a prediction, it may not be cancelled with a conflicting use of this or similar Charms, though it may be counteracted with Sidereal Astrology or similar powerful fate-bending magic. Though this Charm has an instant duration, the motes spent activating it do not return until the Exalt has had a full night’s rest.'
	}, {
		'name': 'God-King’s Shrike (Dogstar Ruminations)',
		'cost': '30m, 1wp',
		'mins': 'Lore 5, Essence 5',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Prophet of Seventeen Cycles + any three Lore Charms',
		'desc': 'Sage Emperors returned from their long slumber, the Solars’ great beards have shattered their stone tables. In their great and terrible throes, they may call upon the forces of doom in order to save their world. The Solar must spend a full week contemplating and researching a region’s history, climate, geography, etc. before using this Charm. Casting her gaze toward a foe, the Solar draws deep from the well of her experience, her knowledge of this life connecting to her knowledge of lives before. Through this Charm she reaches realization of a certain calamity that must happen, and her consciousness is recognized, in turn, by the universe. In this instance, what the Solar realizes she causes to happen. Roll the Solar’s Intelligence + Lore against difficulty 5. A basic success is tantamount to the Solar predicting a natural disaster that has relatively damning effects: flash floods ruin roads, a drought destroys crops, an earthquake disables a vitally important manse, and so on. Two to four extra successes results in a more devastating cataclysm: a tsunami wipes out a fleet of battleships; a series of earthquakes devastate the infrastructures of several cities and roads; a volcano detonates and wipes a city entirely off the map, etc. Five or more extra successes equates to the Solar predicting one of the seven great dooms: a star falls and annihilates a region; a behemoth rises from its slumber and plows through a number of predicted cities; an army of the dead spills from its Shadowland during Calibration to wreak havoc, and so on. Though this Charm’s duration is instant, the motes spent activating it do not return for one week. This Charm may only be used once per season.'
	}, {
		'name': 'Sacred Relic Understanding',
		'cost': '4m, 1wp',
		'mins': 'Lore 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Truth-Rendering Gaze',
		'desc': 'By examining a relic of the past, the Lawgiver can unlock the secret of how to use it. Using this Charm requires that the Solar touch an artifact whose purpose or use are unknown, rolling Intelligence + Lore against a difficulty of the artifact’s rating. If successful, the Exalt gains a vision that reveals how to activate or employ the artifact. If the object or structure’s rating is N/A, the difficulty is 8-10, and rather than revealing exactly how the construct functions, the Solar only learns a fact about it which brings her closer to understanding it. This latter use can only be employed once per story.'
	}, {
		'name': 'Wake the Sleeper',
		'cost': '15m, 1wp',
		'mins': 'Lore 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Sacred Relic Understanding + Any two Lore Charms',
		'desc': 'The Solar can unlock the true potential of an artifact. Grasping an artifact to which she is attuned, and which is capable of Evocations, the Lawgiver sends her Essence surging through the relic’s chakras, merging its spirit with her own. Roll the Solar’s Intelligence or Wits + Lore against a difficulty of the object’s rating + 2, or 8 + 2 if it is N/A. If the roll gains at least one success, the Solar automatically unlocks one of the artifact’s Evocations without spending experience points. If the Solar rolls successes in excess of the difficulty, she unlocks half the extra successes (rounded down) in Evocations. This Charm may be used once per story, and may not be used on the same artifact until an amount of experience has been invested in it equal to the cost of the Evocations that were unlocked for free. The Exalt may not use this Charm to aid another character in awakening Evocations until she is Essence 5+. Waive this requirement if Lore is her Supernal Ability.'
	}, {
		'name': 'Wyld-Shaping Technique',
		'cost': '15m, 1wp, 2xp',
		'mins': 'Lore 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Chaos-Repelling Pattern, Order-Affirming Blow, Truth-Rendering Gaze',
		'desc': 'Of all the Chosen, the Solar Exalted alone have the power to stem the tides of chaos with their force of will. This Charm represents a Solar whose mind flows with a command of knowledge so potent it can reverse the decay of Creation. Channeling endless lore through unsurpassed Essence, the Solar stands at the edge of the world and forces shape into the howling teeth of the storm.\nSystem: Through use of this Charm, the Solar can fashion the raw forces of chaos into practically anything—so long as her mind is able to conceptualize the reality of her desire and force it to take shape. This Charm occurs in and depends on phases to accomplish such a feat. Wyld-Shaping Technique consists of a dramatic action lasting about a minute, in which the Solar forces her will upon the Wyld, pays the cost of the Charm, and makes an Intelligence + Lore roll against a specified difficulty. Each time she succeeds at this roll, a phase is completed. Some things can be shaped in a single phase. Others require that the Solar continue to use Wyld-Shaping Technique, phase after phase, in order to reach an appropriate phase on which to accomplish her goal. Each time she reaches a new phase, her results from the previous phase are dissolved and reshaped. Essentially, the Solar must shape and reshape the Wyld in order to create larger, more powerful, or more specific results.\nThe base difficulty of using Wyld-Shaping Technique is 5. At each new phase, the difficulty increases by one. Therefore, at phase three the difficulty would be 7, and phase six would require overcoming a difficulty of 10. During each phase, the Solar must remain near the relative epicenter of her shaping action. She can defend and attack, and she can move in response to her own environmental shaping, but she cannot engage in other extended actions such as Sorcery. If she is incapacitated or fails the difficulty roll, the consequences are severe. She loses the cost of her Charm, including any invested experience points, and the shaping action fails completely. Moreover, she will experience a backlash if she botches, provoking an immune response from the Wyld—whatever she was trying to shape will turn against her and try to strike her down. The higher the phase at which this occurs, the more powerful the Wyld’s response will be.\nConsiderations: In order to activate this Charm, the Solar must be standing at the absolute border of the middlemarches, facing the deep Wyld, or must otherwise be within the deep Wyld itself. Wyld-Shaping Technique requires the pure, inchoate resonance of chaos to work; the bordermarches and middlemarches of Creation are too solid to shape. Therefore, the more complex or large a thing the Solar wishes to shape, the deeper into the deep Wyld she needs to go. It would suffice for her to shape a gold ingot at Creation’s rim, but to raise an island of Creation from the Wyld, she would need to travel several miles into chaos.\nUse of Wyld-Shaping Technique automatically ends use of Chaos-Repelling Pattern in every direction around the Solar for three range bands. While the Exalt is employing this Charm, the Wyld is suborned by her supernal will. As with Chaos-Repelling Pattern, her immediate atmosphere will remain stable, and will adhere to the laws of physics for the Charm’s duration. Unlike Chaos-Repelling Pattern, the Lawgiver can be affected by body and soul-shaping magic while working this Charm, unless she is under the aegis of Charms such as Integrity-Protecting Prana or Wyld-Dispelling Prana. As with Chaos-Repelling Pattern, the Solar can still be attacked by Wyld-spawned denizens while using Wyld-Shaping Technique. In fact, use of this Charm almost certainly guarantees that she will.\nEncounter Roll: At the start of each phase, after the Charm’s cost has been paid but before the player has made the Charm’s roll, there is an encounter roll to determine whether the Solar is suddenly overwhelmed by denizens of the Wyld. Roll a single die and add the Solar’s Essence to the result to determine the outcome. At each subsequent phase, remove 1 from the roll result. 8+: No encounter. 7: A small group (3-5) of weak enemies such as hobgoblins or pumpkin men attacks. 6: A more powerful Fair Folk appears with a number of weaker minions. 5: A raksha hunting party (3-5 members) with a number of hunting beasts and minions appear. 4: As 5, but the force is slightly larger and led by a raksha noble. Alternately, a powerful Wyld-spawned monster appears. 3: A number of powerful Fair Folk (hannya, noble raksha or otherwise) or other Wyld denizens emerge. Alternately, multilple Wyld-spawned monsters emerge. 2: The Solar is swarmed by hundreds of weaker Fair Folk or other Wyld denizens, joined by a number of powerful fae creatures; alternately, a dozen monsters are shaped by the Wyld to go on the attack. 1-0: A behemoth stirs from its slumber to attack the Solar.\nPhases: The Solar must reach a certain phase of Wyld-Shaping Technique in order to raise substance from chaos:\nLand: The Solar can create non-specific land much more easily than she can raise very specific tracts. It is much easier for her to call forth massive amounts of randomly-generated land than it is for her induct very specific geography, and smaller, more specific geography is much more difficult than larger masses of land simply exuded from her formidable unconscious. For non-specific land, she can create Essence * 10 square miles of land in the first phase, and every successive phase multiplies this size by another ten times. At Essence 3, she can create thirty square miles in phase one; in phase two it increases to 300 square miles, and so on. For every two extra successes she spends in each phase, she can increase her Essence in this calculation by one. With non-specific land, the climate, geography, wildlife, spirits, and sentient beings that exist there will correlate with the nearest Pole. Until phase three, no demesnes are guaranteed to form, though previously generated land can still be geomantically sculpted to produce demesnes. After phase three, non-specific land will generate at least one additional minor demesne each phase, and any non-specific land created at phase six or beyond is guaranteed to have a number of major and minor demesnes. The Solar may spend three successes in any phase to roll a single die; success guarantee a demesne forms, with 7s and 8s equaling a minor demesne of appropriate aspect, 9s equaling a major demesne of appropriate aspect, and a 10 equaling a major demesne with an aspect specified by the Solar. The Solar may not add more demesnes to a created landmass than she has spent on upgrades to its area (ie, she must spend two extra successes on increasing land size in order to add an extra demesne). The larger a landmass the Solar is able to create, the more natural resources it will have. The more demesnes it has, the greater the chance it will contain veins of the Five Magic Materials.\nThe Lawgiver may not begin to create very specific land until phase four; she must first generate three phases of non-specific land in order to generate specific land, at which point she starts completely over, losing all generated land, creatures, and demesnes, generating Essence * 5 square miles in the first phase, and multiplying the preceding area by five in each successive phase. Increasing her Essence in this calculation costs three successes per phase, and the cost of demesne generation is four successes per. With specific land, the Solar can designate the kind of terrain, resources or lack of them, the kind of climate and the kind of denizens. The Solar may specify the aspect of all minor demesnes created by rolls or those that naturally occur at later phases. At phase six, she can designate the kinds of sentient creatures living in her world, and such creatures will have both positive and negative Intimacies toward her. She has no control over the spirits that are inducted into her reality, but each that intrudes on her domain at this phase or beyond will automatically have an Intimacy to her of the Storyteller’s choosing.\nLegendary Demesne: Without Charms specifically dedicated to the creation of legendary demesnes, a Solar must succeed at a phase seven or higher roll for specific land to create a legendary demesne, and she must have at least five major, roll-generated demesnes to do so. If successful, she loses all of her roll-generated demesnes and all minor demesnes, and half her land’s area to shape a legendary demesne. She may then start building land mass again at phase one, using the above rules.\nMundane Wealth: Creating wealth is a process similar to creating land. Each resources value increase requires that the Solar reach a certain phase by synthesizing appropriate precursor materials. For example, a silver talent (worth Resources 2) is required in order to make five silver talents (Resources 3).\nAt phase one, the Solar can make wealth in excess of Resources 2. Examples of such wealth include a silver talent, a sack of perfectly-cut potato-sized diamonds, or two dozen gold ingots. Extra successes can be used to personalize or specialize such material wealth, giving exquisite shape to a single diamond or fashioning a number of ingots into jewelry at a rate of two successes per transformation. At phase two, Resources 3 mundane wealth can be created; at phase three, materials in excess of Resources 3 can be created; at phase four, Resources 4 wealth can be created, and at phase five, wealth in excess of Resources 4 but below Resources 5 can be created. A phase six transformation of materials is required to create Resources 5 wealth. Phases in excess of six do not greatly increase the wealth generated by Wyld-Shaping Technique.\nFive Magic Materials: In order to create an instance of one of the Five Magic Materials, the Solar must create a minor demesne of the appropriate aspect using the rules above. She may then completely obliviate the land and attached demesnes in order to create enough ore to process it into a single mina in phase one. A phase two synthesis lets her turn the approximated Magic Material into a single bar of the same type of material; a phase three synthesis allows her to create as much as a talent, while a phase four synthesis allows her to create two talents, and so on. It takes approximately five talents of a Magic Material to build a grand daiklave.\nArtifacts and Manses: Artifacts, manses, and certain other wonders require special Charms in order to create with Wyld-Shaping Technique.\nEverything Else: Wyld-Shaping Technique works through a process of conceptual graduation. In order to raise a fortress, the Solar must first create land to stand it on. The Solar may create anything within the realm of possibility, her logic, or her know-how by following these basic rules. To create a mighty warship, she must raise a cradle to set it on in phase one, or otherwise must have created a body of water to float it in using specific land. The boat is then created in phase two. The deeper into the phases of specific land she goes, the more warships she is able to raise in a single phase, so long as she continues to grow the body of water with each successive phase. A Solar who spends the effort and experience points to create an ocean can also raise up an armada on its waters. The creation of land can be foregone in instances where the Solar can conceptualize some other base for beginning her project, such as the cradle for a ship, but the most powerful expressions of Wyld-Shaping Technique work by way of graduating from one concept to the next. It is much easier to create a number of warships by first creating the waters they sail upon. This process is reversed in order to build even more insane constructs. To raise up marvels such as golem manufactories, the Solar must catabolize something much more powerful, such as a legendary demesne.'
	}, {
		'name': 'Wyld-Forging Focus',
		'cost': '--',
		'mins': 'Lore 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Wyld-Shaping Technique',
		'desc': 'With this Charm, the Lawgiver is capable of greater works of Wyld Shaping. Each time she uses the prerequisite on a new shaping attempt, she starts at phase two.'
	}, {
		'name': 'Demiurgic Suspiration',
		'cost': '--',
		'mins': 'Lore 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Wyld-Forging Focus',
		'desc': 'The Solar learns to draw Essence from her nascent world to empower greater acts of Creation. After each successfully-completed phase, roll (Essence + completed phase) dice. Each success restores two motes of Essence. This bonus stacks with Immanent Solar Glory.'
	}, {
		'name': 'Savant of Nine Glories',
		'cost': '--',
		'mins': 'Lore 5, Essence 5',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Demiurgic Suspiration',
		'desc': 'The Solar is forever transformed by the knowledge that has awakened inside her. This Charm permanently lowers the mote cost of Wyld-Shaping Technique by five motes.'
	}, {
		'name': 'Wyld Cauldron Mastery',
		'cost': '--',
		'mins': 'Lore 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Wyld-Shaping Technique',
		'desc': 'The Lawgiver’s greater understanding increases her power to more easily shape the Wyld. This Charm grants (Essence) automatic successes to each phase of Wyld-Shaping Technique.'
	}, {
		'name': 'Sevenfold Savant Mantle',
		'cost': '--',
		'mins': 'Lore 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Wyld Cauldron Mastery',
		'desc': 'The Solar is a force of living lore that compels the Wyld into shape. Once per attempted Wyld-Shaping Technique, the Exalt may ignore the Willpower cost of the Charm, and apply a free full Lore Excellency to the phase.'
	}, {
		'name': 'Power Beyond Reason',
		'cost': '--',
		'mins': 'Lore 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Sevenfold Savant Mantle',
		'desc': 'The Solar may call upon her vast stores of knowledge to greatly enhance Wyld-Shaping Technique at phase three or beyond, aiding her roll with double 8s. She may call upon this power during one phase per attempt. A repurchase at Essence 5+ allows her to call on this power during an additional phase, aiding it instead with double 7s.'
	}, {
		'name': 'Hero-Induction Method',
		'cost': '--',
		'mins': 'Lore 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Wyld-Shaping Technique',
		'desc': 'The Solar can teach the land to hone its masters. With use of this Charm, each time the Exalt uses Wyld-Shaping Technique to build a place of trade, practice, or service, her creation will also produce a specialist to work there. This works through a system of conceptual graduation: if she shapes forest lands, the people who rise from her working will be forest people. If she creates a blacksmith’s forge, one of the arisen mortals will be a blacksmith with an appropriately high Craft score. If she creates a hunting lodge, her working will produce hunters. If she creates a medicine hut, her land will produce a shaman-healer, and so on.'
	}, {
		'name': 'Tome-Rearing Gesture',
		'cost': '5m, 1wp',
		'mins': 'Lore 5, Linguistics 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Wyld-Shaping Technique, Mind-Scribing Method',
		'desc': 'With this Charm the Lawgiver may instantly shape from chaos a single copy of a book she has mentally written with Mind-Scribing Method. This can be done without a roll to create a tome with an average cover and simple font, though a Wits + Lore roll against a Storyteller-defined difficulty can change the cover’s material and design, give the book multiple lingual translations and a striking font, illustrations, color-edged pages and so on. This Charm does not require an activation of Wyld-Shaping Technique—the Solar is simply powerful enough to unleash the story in her mind upon the Wyld and shape it page by page. This does however require that she be in at least the bordermarches of chaos.'
	}, {
		'name': 'Wyld-Called Weapon',
		'cost': '7m, 1wp, 8xp',
		'mins': 'Lore 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Wyld-Shaping Technique',
		'desc': 'In order to shape a daiklave or other Artifact weapon from the Wyld, the Solar must be capable of a greater refinement of Wyld-Shaping Technique. This Charm models Solars who have mastered one such refinement. In order to create an Artifact four weapon with one active Evocation, the Exalt must reach phase four and use this Charm before the roll is made. To draw forth a greater weapon such as a Thousand-Year Daiklave, the Solar must proceed to phase five, while a Ten-Thousand Year Daiklave can only be made at phase six. All weapons created in this manner possess one active Evocation. If the Solar intends to shape such a weapon, each phase is spent creating a narrative vector through which the weapon can be materialized. The form this description takes is entirely up to the player.'
	}, {
		'name': 'Manse-Raising Method',
		'cost': '10m, 1wp, 10xp',
		'mins': 'Lore 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Wyld-Called Weapon',
		'desc': 'Similar to the prerequisite, the Exalt may raise a manse from chaos. In order to do this, the Solar must be on at least phase four of Wyld-Shaping Technique in which she has created land with at least three major demesnes. She may then use this Charm, consuming three major demesnes back into the Wyld and raising an exceptional manse in their place.'
	},

	// Medicine

	{
		'name': 'Ailment-Rectifying Method',
		'cost': '3m',
		'mins': 'Medicine 1, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Disease and pestilence cannot stand against the Solar Exalted. This Charm represents an hour spent treating a patient for an illness the Exalt has properly diagnosed. Roll the Exalt’s Intelligence + Medicine against the disease’s Morbidity (see p. XX) and add half the extra successes to the patient’s Resistance roll at the next Interval. Through this Charm, the Solar can weaken or even cure supernatural maladies such as the Great Contagion. However, the target must remain in bed, and must be bathed, fed, and otherwise given care for the duration of the next Interval. These ministrations can be performed by the Solar’s assistants. The Exalt may use this Charm to treat her own diseases, though some may require a stunt or special instruments to treat.'
	}, {
		'name': 'Plague-Banishing Incitation',
		'cost': '2m, 1wp',
		'mins': 'Medicine 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Ailment-Rectifying Method',
		'desc': 'If the Lawgiver generates at least double her patient’s Stamina or Resistance (whichever is greater) in successes through the use of the prerequisite, she may use this Charm to demand that a malaise leave her patient’s body. This causes the disease’s Interval to conclude immediately, and allows the patient the benefit of all rather than half the Solar’s extra successes from Ailment-Rectifying Method. If successful, the pestilence immediately vacates the host, and the patient begins to recover over the course of a day. If the Solar saves a character from death’s doorstep through the use of this Charm, she gains one point of temporary Willpower.'
	}, {
		'name': 'Contagion-Curing Touch',
		'cost': '--',
		'mins': 'Medicine 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Plague-Banishing Incitation',
		'desc': 'The Solar permanently gains (Essence) successes to treat forms of disease, even if she does not have the proper tools or medicine to do so. Her efforts still must be efficacious and logical, but even if she lacks the most ideal instruments, she can still attempt to cure a plague or other sickness. Once a patient has been treated by the Solar, if they recover, they gain four automatic non-Charm successes to resist the Virulence of a disease for the rest of the season.'
	}, {
		'name': 'Wound-Mending Care Technique',
		'cost': '5m, 1wp',
		'mins': 'Medicine 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Through mastery of Essence flows and a keen understanding of the body, the Solar can repair even the most ruinous damage at an incredible pace. The Solar spends fifteen minutes to an hour doctoring the patient, depending on the severity of the wounds. She still requires the normal medicines, bandages, and any tools that might be needed for more complex operations, but her results are nonetheless miraculous. Roll Intelligence + Medicine with double 9s at the end of the treatment. This is the number of bashing or lethal health levels that will be restored if the patient remains in bed for the rest of the day. In addition, if the Solar’s treatment would raise her patient two or more wound levels, she gains a point of Willpower.'
	}, {
		'name': 'Wound-Cleansing Meditation',
		'cost': '10m',
		'mins': 'Medicine 5, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Wound-Mending Care Technique',
		'desc': 'The Solar’s advanced medical techniques allow her to draw the poison from unnatural wounds. With this Charm, the Solar spends an hour cleaning and wrapping wounds, disinfecting and draining injuries and preparing the patient for more complex internal treatment. At the end of the treatment, convert the patient’s aggravated damage to normal lethal damage. This allows the Solar to treat damaged tissue and to attempt to reattach severed limbs with Wound-Mending Care Technique. This Charm does not allow the regrowth of lost tissue.'
	}, {
		'name': 'Instant Treatment Methodology',
		'cost': '5m, 1wp or 5i, 1wp',
		'mins': 'Medicine 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Wound-Cleansing Meditation',
		'desc': 'This Charm allows the Solar to complete up to an hour of medical treatment in a handful of seconds. Using this Charm lowers the treatment time required for one Simple-type Medicine Charm. The Solar still requires the proper medicines and surgical tools, but may eliminate the need for such with a properly medical stunt, such as tapping her patient’s pressure points to increase the flow of Essence or massaging a person’s heart until it starts beating.'
	}, {
		'name': 'Anointment of Miraculous Health',
		'cost': '10m',
		'mins': 'Medicine 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Instant Treatment Methodology',
		'desc': 'Where the Exalt’s Essence-charged hands go, shattered bones are made whole and torn flesh is instantly mended. With each use of this Charm, the Solar can convert (Essence) aggravated damage to bashing or lethal, or she can cure the same number of lethal or bashing health levels. This Charm can be used once per scene, but can be reset by a two point stunt to treat a patient, so long as it does not involve Anointment of Miraculous Health.'
	}, {
		'name': 'Body-Sculpting Essence Method',
		'cost': '10m, 1wp',
		'mins': 'Medicine 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Anointment of Miraculous Health',
		'desc': 'This Charm functions as Instant Treatment Methodology, but also lowers the convalescence of the Solar’s patient to just seconds, allowing her to rebuild a ruined body and stand it upright in the time it takes to lace on boots. This Charm may be used once per scene, but can be reset by a two point Medicine-based stunt that does not involve Body-Sculpting Essence Method.'
	}, {
		'name': 'Wholeness-Restoring Meditation',
		'cost': '10m, 1wp',
		'mins': 'Medicine 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Anointment of Miraculous Health, Wound-Cleansing Meditation',
		'desc': 'Through repeated treatment, the Lawgiver can restore lost tissue, and may even challenge congenital debilitation. Correcting some forms blindness or deafness can be done in as little as an hour. The Solar can recalibrate optic tissues under a compact of earth, while ear bones align themselves to the movements of her fingertips. Such a feat is usually impossible, but the Exalt may roll Intelligence + Medicine against difficulty 5 to heal such conditions. Regrowth of lost or missing tissues is a much more challenging affair, as is the repair of deformities, Wyld mutation or mental derangements. However, the Solar’s prowess is such that of these, only derangements cannot be fully cured. In each case, the Storyteller should decide if the wound, malady or defect is minor, major, or defining. Defining would include paralysis, lost limbs, missing eyes, complete lunacy, and mutations that make a person completely incapable of normal human lives. The Solar must dedicate four hours a month to treating such conditions through whatever medical means and stunts seem adequately appropriate. This begins an extended roll with a goal of 20, an interval of one month and a difficulty of 5. Under wraps, earth compacts, and acupuncture, a Solar can rebuild the lost tissues of destroyed eyes and missing limbs, and can even aid a target in growing organs that they were born without. Each time the Solar succeeds at the goal number, the malady decreases in intensity. Once it the goal has been met at the minor level, a condition vanishes. Missing limbs are fully regrown, paralysis victims are able to walk, mutations wither and slough away or become easily operable. Only derangements remain at the minor level, though the Solar may continue to treat her patient at the minor level to keep their symptoms at bay.'
	}, {
		'name': 'Healing Trance Meditation',
		'cost': '--',
		'mins': 'Medicine 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Contagion-Curing Touch, Wholeness-Restoring Meditation',
		'desc': 'The Solar invokes the power of the unbeheld other, her Solar Essence flaring up inside. Roll Wits + Medicine and add the successes to the Exalt’s mote pool, even if this would temporarily increase the size of her pool. In addition, add any 10s she rolls to her temporary Willpower, even if this would increase her Willpower past 10. Finally, for the duration of the scene, every 10 the Exalt rolls on a Medicine action restores a mote of Essence, until she fails to roll at least one 10. If she knows Healer’s Unerring Hands, she may avoid breaking her trance through use of that Charm. The majority of the motes and Willpower generated by this Charm must be used on Medicine actions. Healing Trance Meditation can be used once per story, but may be reset by paying three experience points.'
	}, {
		'name': 'Flawless Diagnosis Technique',
		'cost': '1m',
		'mins': 'Medicine 1, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar hones her medical abilities to an unearthly degree. By examining a patient closely and hearing about their symptoms, the Exalt can flawlessly diagnose their illness. This Charm supplements a Perception + Medicine attempt to generate a formal diagnosis, preventing the Solar from making any error in her analysis. Note that this Charm does not provide the Exalt with a vast storehouse of medical knowledge, but is based on her Lore and Medicine ratings. If the character encounters an unfamiliar disease, she is able to determine its general type and whether it is magical in nature. Though she may not always know exactly what she is looking at, this Charm guarantees she will never misdiagnose a patient. Lastly, if she encounters a disease which she specializes in treating, or which she has flawlessly diagnosed more than five times in a season, then she gains one mote each time she diagnoses it through the use of this Charm.'
	}, {
		'name': 'Touch of Blissful Release',
		'cost': '5m',
		'mins': 'Medicine 3, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Flawless Diagnosis Technique',
		'desc': 'With just a touch, the Solar can alleviate the suffering of a sick or wounded individual. The patient feels a narcotic surge as the pain of their symptoms dull away almost completely. This allows the Solar to ease the pains of childbirth, surgery, or invasive illnesses and other injury for up to (Essence) hours. This Charm removes up to -3 in wound or illness penalties. This effect wears off if the patient engages in any strenuous activity.'
	}, {
		'name': 'Feit of Imparted Nature',
		'cost': '10m',
		'mins': 'Medicine 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Touch of Blissful Release',
		'desc': 'Striking her patient’s anima with Essence-laden fingers, the Solar imparts a surge of new life. This Charm grants the target a number of +0 health levels equal to the Solar’s Essence. These -0 levels are the first to be checked off when the character is injured, and fade immediately when the Solar releases her commitment, taking any damage with them.'
	}, {
		'name': 'Life-Exchanging Prana',
		'cost': '1lhl per 3m',
		'mins': 'Medicine 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Feit of Imparted Nature',
		'desc': 'With this Charm, the Exalt may trade her very vital energies for Essence to fuel Medicine Charms. Motes gained in this manner dissipate if the Solar attempts to use them on any other form of magic. This Charm may not target temporary health levels created by other Charms.'
	}, {
		'name': 'Body-Purifying Admonitions',
		'cost': '4m, 1wp',
		'mins': 'Medicine 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Touch of Blissful Release',
		'desc': 'The Solar can draw the most vicious and noxious of poisons from her victim’s body—even those that are supernatural in nature. Roll the Exalt’s Wits + Medicine against the toxin’s duration. If the Solar fully succeeds in lowering the duration, venoms and intoxicants seep from their point of entry, while poisons boil to the surface wherever the Solar touches her patient. This Charm does not completely remove all traces from a target’s system—the Exalt may still need to treat residual effects, and the patient may experience one final attack to their health levels. But it does ensure that the toxin fully leaves the body after its next interval. If the Solar strikes a supernatural poison from her target’s body in one attempt, she gains a point of Willpower.'
	}, {
		'name': 'Anodyne of Celestial Dreaming',
		'cost': '7m, 1wp',
		'mins': 'Medicine 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Touch of Blissful Release',
		'desc': 'The Exalt can completely banish a target’s pain with but a touch. When she uses this Charm, her subject is suffused with Essence that flows through their nerve endings, transforming pain signals into those of euphoria. This prevents a character from feeling pain, removing all wound penalties. However, it also puts stress on the Solar. Should her target engage in strenuous activity such as combat, the Solar takes a -1 penalty to all actions as long as she keeps the Charm committed. This penalty stacks; if the Exalt supports multiple characters in this way, then her penalty mounts.'
	}, {
		'name': 'Master Chirurgeon Meditation',
		'cost': '--',
		'mins': 'Medicine 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'The Medicine Excellency',
		'desc': 'The Exalt hones her Essence through her medical knowledge to save lives. Through practice and meditation, internal vows and moments of celestial focus, she calibrates her spirit. This Charm permanently lowers the cost of the Medicine Excellency to one mote per two dice.'
	}, {
		'name': 'Benison of Celestial Healing',
		'cost': '--',
		'mins': 'Medicine 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Master Chirurgeon Meditation',
		'desc': 'Once per scene, the Solar may use one Simple-type Medicine Charm without paying motes or Willpower. This Charm can be reset by saving a dying character (one whose Incapacitated health level has been checked off) through medical care.'
	}, {
		'name': 'Life-Sculpting Hands Technique',
		'cost': '--',
		'mins': 'Medicine 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Benison of Celestial Healing',
		'desc': 'Once per scene, the Exalt may use a free full Medicine Excellency.'
	}, {
		'name': 'Healer’s Unerring Hands',
		'cost': '5m, 1wp',
		'mins': 'Medicine 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Life-Sculpting Hands Technique',
		'desc': 'While repairing damage or treating illness, the Lawgiver can correct even the tiniest mistake before it is made. This Charm allows the Exalt to reroll all non-successes on a Medicine action. If she eliminates half or more of her non-successes, she gains a point of Willpower.'
	}, {
		'name': 'Immaculate Solar Physician',
		'cost': '--',
		'mins': 'Medicine 5, Essence 5',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Healer’s Unerring Hands',
		'desc': 'When she needs it most, the Solar physician can infuse her actions with limitless Essence, making her every movement and action flawless. Once per day, the Solar may double the successes on any Medicine roll.'
	}, {
		'name': 'Perfect Celestial Chirurgeon',
		'cost': '--',
		'mins': 'Medicine 5, Essence 5',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Healer’s Unerring Hands',
		'desc': 'When pressed to the utmost, the Lawgiver may draw on her vast stores of medical knowledge, condensing them down into a single surge of Essence. Once per story, the Solar may apply double 7s to a single Medicine action.'
	},

	// Occult

	{
		'name': 'Spirit-Detecting Glance',
		'cost': '3m',
		'mins': 'Occult 1, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'The Solar can look through the pall of reality to glimpse the realm of spirits beneath. With this Charm, the Solar can see (but not touch) immaterial spirits.'
	}, {
		'name': 'Spirit-Cutting Attack',
		'cost': '1m',
		'mins': 'Occult 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Spirit-Detecting Glance',
		'desc': 'The Solar infuses her attack with the emotive force of her anima, to strike an immaterial spirit. This Charm supplements a single attack to strike a spirit which has not materialized. If the Solar is not using the prerequisite or another similar magic, this attack is made at -3 dice. Spirit-Cutting Attack may be used in combination with the Charms of other Abilities.'
	}, {
		'name': 'Spirit-Draining Stance',
		'cost': '5m',
		'mins': 'Occult 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Spirit-Cutting Attack',
		'desc': 'The Lawgiver has the power to draw cold entropy and ethereal power from ghost and spirits, adding swiftness and surety to her attacks. While this Charm is active, the Solar’s successful withering attacks against spirit opponents generate one automatic level of withering damage. At Occult 4+, Essence 2+, the Exalt can choose to drain a mote of Essence instead of a point of initiative.'
	}, {
		'name': 'Breath-Drinker Method',
		'cost': '4i',
		'mins': 'Occult 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Spirit-Draining Stance',
		'desc': 'The Solar’s understanding of corporeal Essence allows her to channel her forces to rend spirits at the point of impact. Breath-Drinker Method supplements a decisive attack, allowing the Solar to steal a number of motes from a spirit equal to the number of health levels damaged by the attack. The Exalt may not steal more than twice her Essence score on a single attack.'
	}, {
		'name': 'Uncanny Shroud Defense',
		'cost': '6m',
		'mins': 'Occult 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Spirit-Cutting Attack',
		'desc': 'On the verge of death, the Exalt draws uncanny Essence around her like a shroud, stepping between worlds. When struck with any kind of damage or attack that would remove her last health level, the Exalt may use this Charm to stop the final level of damage. This Charm cannot be used if the Solar is currently on her last uninjured health level.'
	}, {
		'name': 'Spirit-Repelling Diagram',
		'cost': '6m',
		'mins': 'Occult 3, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Spirit-Cutting Attack',
		'desc': 'Striking at an unseen movement, the Exalt draws a formless pattern from the depths of the universe. A blazing white-gold Essence diagram extends in a circle around the Lawgiver, spreading out to short range. Spirits with Essence ratings equal to or lower than the Exalt’s must materialize or leave the circle. Spirits with a higher Essence rating than the Exalt must apply their Resolve against the Solar’s Wits + Occult in order to resist, with the Solar’s influence gaining (Essence) dice against normal spirits or (Essence) automatic successes against demons and other cursed spirits. This mandala stays fixed on the location the Solar is standing for one scene, and vanishes if she leaves the circle. Spirits of equal or lower Essence than the Solar cannot attack characters inside the circle while standing outside it, and spirits forced to leave the diagram may not attack characters within it.'
	}, {
		'name': 'Nine Specters Ban',
		'cost': '4m, 1wp',
		'mins': 'Occult 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Spirit-Repelling Diagram, Uncanny Shroud Defense',
		'desc': 'The divine flame of the Solar’s Essence marks her as the greatest power in Heaven. Though she is made of mortal substance, her Essence is materially inviolate. When she uses this Charm, an immaterial being must struggle to strike her. Any attack made against her by such a being costs an additional point of Willpower.'
	}, {
		'name': 'Spirit-Caging Mandala',
		'cost': '10m, 1wp',
		'mins': 'Occult 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Varies',
		'prereqs': 'Spirit-Repelling Diagram',
		'desc': 'The Lawgiver inverts Spirit-Repelling Diagram, creating pattern that binds a spirit in place. This Essence diagram forms around a target up to two range bands from the Solar. An intricate pattern in the diagram traps and binds the spirit’s Essence, sealing it within the mandala. Pay the cost of this Charm once and roll the Solar’s Wits + Occult against a difficulty of the spirit’s Essence. If successful, the spirit is bound on the spot for a number of turns equal to (extra successes + 1), upon which the Solar must roll Wits + Occult against the spirit’s Essence to maintain the cage. Each time the Solar succeeds at this contest, the binding effect is extended as above, but the difficulty also increases by one on each subsequent attempt. During this time, the Solar may approach the spirit, but if she moves more than two range bands away from it, the mandala fades and the spirit is freed. An immaterial spirit trapped in the Spirit-Caging Mandala may be perceived by characters who cannot normally see spirits, and may be struck by characters who cannot normally strike immaterial foes. As the spirit is rendered incapable of moving across range bands, spirits trapped in the cage can only attack characters outside the diagram if they have the ability to attack at range, and only then if they are attacked first. Foes who enter the mandala at close range are always fair game.'
	}, {
		'name': 'Spirit-Draining Mudra',
		'cost': '--',
		'mins': 'Occult 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Spirit-Caging Mandala',
		'desc': 'The Solar may draw on the Essence of a creature she has bound into the Spirit-Caging Mandala to power her Occult magic. Until the bound character is free, the cost of the Exalt’s Occult Charms are reduced by the Essence score of the trapped entity. These motes are taken from the bound character to fuel the Solar’s Charms. The Solar may also invoke this power each time she takes a shaping action in order to cast a spell.'
	}, {
		'name': 'Demon-Compelling Noose',
		'cost': '--',
		'mins': 'Occult 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Spirit-Draining Mudra',
		'desc': 'The Lawgiver’s binding pattern stifles the will of her captive, weakening its Resolve. When using non-Occult based social influence on a target bound with Spirit-Caging Mandala, the Solar gains one automatic success to her influence, while the trapped spirit is at -1 Resolve until they escape. If the captive is a creature of darkness, the Solar gains two automatic successes while the creature’s Resolve is reduced by -2.'
	}, {
		'name': 'Spirit-Shredding Exorcism',
		'cost': '7m, 1wp',
		'mins': 'Occult 5, Essence 4',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Spirit-Draining Mudra',
		'desc': 'After capturing a being within the Spirit-Caging Mandala, the Lawgiver strikes apart the pattern, inverting it to rend apart their Essence. Roll the Solar’s Intelligence + Occult against the target’s Resolve. This attack can neither be enhanced nor defended against through an application of Intimacies—nor can it be resisted with Willpower. If successful, the target’s permanent Essence is reduced by one until they escape the pattern, and if the difficulty of binding the target has increased due to a number of successful Wits + Occult rolls (as per the rules of Spirit-Caging Mandala), then the difficulty returns to its base number, the spirit’s Essence -1. Spirit-Shredding Exorcism may not be applied more than once to a single target. If this Charm reduces a character’s Essence to 0, they are unable to act until they escape the mandala.'
	}, {
		'name': 'Wyld-Binding Prana',
		'cost': '--',
		'mins': 'Occult 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Spirit-Caging Mandala',
		'desc': 'The Exalt infuses the Essence pattern of the Spirit-Caging Mandala with gossamer and iron, allowing it to trap formless denizens of the Wyld, temporarily forcing them to manifest a form as substantial as a materialized spirit.'
	}, {
		'name': 'Ghost-Eating Technique',
		'cost': '3m',
		'mins': 'Occult 3, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Spirit-Cutting Attack',
		'desc': 'This Charm is the technique by which the Solars slew the enemies of the gods, and spirits hate and fear it. An attack supplemented by this Charm does aggravated damage against the Solar’s target, and draws a number of motes from the spirit equal to the highest wound penalty inflicted by the attack. For example, striking off a number of -1 health levels would give the Solar one mote. Striking off a number of -2 health levels and a -4 would give the Solar four motes. If a spirit is slain by this attack, it is destroyed permanently, and the pattern of its Essence is subsumed by the Solar’s anima. Destroying a spirit with this Charm grants the Exalt (Solar’s Essence + spirit’s Essence) motes.'
	}, {
		'name': 'Carnal Spirit Rending',
		'cost': '5m, 1wp',
		'mins': 'Occult 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Ghost-Eating Technique',
		'desc': 'Upon destroying a spirit with Ghost-Eating Technique, the Solar may activate this Charm to draw the rent and torn Essence of the spirit into her limbs and through her chakras, embodying it. For the rest of the scene, the Exalt gains (Essence) powers or traits based on the Charms and themes of the destroyed spirit, to be decided by the Storyteller. This power explicitly allows the Solar to utilize magic effects that cannot be learned through the Eclipse anima power, but the Exalt may not take powers with a prerequisite higher than (Solar’s Essence + 2).'
	}, {
		'name': 'Burning Exorcism Technique',
		'cost': '3m, 1wp',
		'mins': 'Occult 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Carnal Spirit Rending',
		'desc': 'Sometimes those who are physically ill or mentally weak become prey to spiritual possession, or other malaise of the soul. The Lawgiver may draw the malevolence from such a victim, rolling Wits + Occult against the Resolve of the possessing spirit, or the Morbidity of a spiritual malaise. If she succeeds, the Solar draws a malaise or a spirit of equal or lower Essence into her anima, neutralizing it until she wishes its release. If the spirit is of a greater Essence than the Solar, then it is automatically forced out of the host, and may not return to the victim’s body for a season, but it is otherwise free. The Exalt may not capture more spirits than she has points of permanent Essence.'
	}, {
		'name': 'Soul Projection Method',
		'cost': '6m',
		'mins': 'Occult 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Burning Exorcism Technique',
		'desc': 'The Solar may cast her spirit from her body to save a target from corruption. The Solar steps forward and touches her target, enacting a Wits + Occult battle against the character’s Resolve, in which Intimacies do apply. Upon success, both the Exalt and the target become completely entranced, as the Solar casts her spirit into the body of her target. The exact effect of this dramatic action is up to the Storyteller—the Lawgiver may use this to enter a raksha to retrieve the soul of an eaten loved one, or she might enter the body of her Lunar mate to do battle with a derangement created by a past incarnation. More specifically, the Exalt may use this to cast a spirit into her target, forcing a possession of that character, or infecting them with a spiritual malaise if they fail a Resistance check against the Virulence of the attack. This attack requires the Exalt to have previously captured such a spirit or disease using this Charm’s prerequisite.'
	}, {
		'name': 'Immortal Soul Vigil',
		'cost': '--(7m)',
		'mins': 'Occult 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Soul Projection Method',
		'desc': 'The Solar may use the prerequisite to enter the psyche of another, examining their dreams and memories, no matter how distant or forgotten, for traces of spiritual taint, demonic possession, or other signs of haunting. While entranced, the Solar experiences the dream or memory of her subject in first person, and may interact with the world of her subject’s mind using Awareness, Investigation and Occult Charms to look for signs of spiritual predation. Though she cannot use her presence in her subject’s mind to change the outcome, she can use what she discovers as a basis for further action. Furthermore, if she is able to confirm the presence of a spirit actor in her subject’s past, she may also commit seven motes to create a doorway which opens in her mind the moment her subject is approached by the spirit. The moment she steps through it, the Exalt falls into a trance and experiences a dematerialized state that allows her to enter the scene through the dreamscape of her subject, where she may confront the spirit with all of the force that is hers to wield. While the Solar may not interact with any other physical beings in this state, if the spirit attempts to escape her by materializing, the Solar may still perceive and attack it by using Charms such as Spirit-Detecting Glance.'
	}, {
		'name': 'Phantom-Seizing Strike',
		'cost': '1m, 1wp',
		'mins': 'Occult 4, Essence 1',
		'type': 'Reflexive',
		'keywords': 'Uniform',
		'duration': 'Instant',
		'prereqs': 'Ghost-Eating Technique',
		'desc': 'The Exalt suffuses her target’s body with Solar Essence. An immaterial opponent struck by this technique becomes material for two turns. The Solar may activate this Charm after landing an attack with Spirit-Cutting Attack. So long as the damage roll generates at least one success, this Charm may be triggered.'
	}, {
		'name': 'Spirit-Slaying Stance',
		'cost': '3m',
		'mins': 'Occult 5, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Phantom-Seizing Strike',
		'desc': 'The Lawgiver may expertly hunt the things which slink and slide through cracks in the world. When this Charm is active, the Exalt gains (Essence) dice to her attacks against spirits.'
	}, {
		'name': 'Uncanny Perception Technique',
		'cost': '--',
		'mins': 'Occult 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Spirit-Detecting Glance',
		'desc': 'The Solar’s senses are preternaturally attuned to the movements of spirits and other uncanny beings. Whenever a spirit or Fair Folk is within the range of the Exalt’s senses, she experiences a strange sensory phenomena; she might hear bells tinkling, smell a particularly strong or unusual scent, or taste something resonant. The Solar gains half her Occult (rounded up) in successes to an Awareness-based attempt to notice such a being. The warning signaled by this Charm occurs even when a spirit is immaterial, allowing the Solar to use Spirit-Detecting Glance.'
	}, {
		'name': 'Keen Unnatural Eye',
		'cost': '--',
		'mins': 'Occult 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Uncanny Perception Technique',
		'desc': 'Immersion into the occult opens the Lawgiver’s eyes to evidence of spirit actions. She more readily and easily sees the handiwork of ghosts and demons, and can more skillfully detect the footsteps of spirits. When using Survival or Investigation to track a spirit or uncover evidence of its actions, the Exalt gains (Essence or three, whichever is greater) bonus dice to the attempt.'
	}, {
		'name': 'Spirit-Manifesting Word',
		'cost': '1m',
		'mins': 'Occult 2, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Solar speaks an unutterable word that pulls one spirit familiar or sorcerously-bound demon into the physical world. This Charm allows a spirit ally to materialize without having to pay a cost or use its own magic.'
	}, {
		'name': 'Material Exegesis Prana',
		'cost': '3m, 1wp',
		'mins': 'Occult 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Spirit-Manifesting Word',
		'desc': 'With a greater expenditure of control, the Exalt may rend the veil with word and voice, giving physical form to a number of immaterial spirit allies. Roll the Solar’s Wits + Occult. Each success materializes a single sorcerously-bound demon or familiar spirit. If the Exalt rolls three sixes—no more, no less—all of her spirit allies materialize at once, regardless of the number of successes, and she gains two points of temporary Willpower.'
	}, {
		'name': 'All Souls Benediction',
		'cost': '16m, 1wp',
		'mins': 'Occult 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Material Exegesis Prana',
		'desc': 'The Lawgiver drinks in her anima and redirects it through her skin, shining with hundreds of arcing, looping glyphs that blaze with all the colors of Solar anima, detailing the legend of the Unconquered Sun’s quest to become the King of Heaven. This effect cannot be muted or paid from personal Essence. After this display, the Exalt’s anima explodes skyward and then draws down, and a shudder of Essence races across the world. Every spirit or immaterial being within six range bands must succeed at a Wits + Dodge check at a difficulty of the Solar’s current temporary Willpower + Essence. Beings who fail this check are forced to materialize, though without paying the cost of materializing magic. Ghosts struck with All Souls Benediction have the option to go immediately into lethe to avoid facing the Lawgiver’s wrath. Creatures struck with All Souls Benediction may not dematerialize until the Lawgiver permits it, or until the scene ends.'
	}, {
		'name': 'Ancient Tongue Understanding',
		'cost': '6m',
		'mins': 'Occult 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'The Exalt expands her knowledge of the realm of spirits to all corners of her mind, shunning knowledge that binds her understanding. While this Charm is in effect, the Lawgiver automatically speaks and understands Old Realm, even if it is not a language she has learned, but loses her ability to comprehend any other language. In addition, the Solar also naturally comprehends other spirit languages as old and strange as Old Realm, languages for which there exists little to no record. While this Charm is in effect, the Solar gains (half her Essence, rounded down) automatic successes to all Occult rolls and shaping actions.'
	}, {
		'name': 'Supernal Control Method',
		'cost': '--',
		'mins': 'Occult 5, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Ancient Tongue Understanding',
		'desc': 'The Exalt directs the flow of her Essence out of the world and draws it in, bringing back a quickening breath of realms beyond. Once per scene, the Solar may enact a free full Occult Excellency. This Charm may be reset by raising the Exalt’s anima to iconic and shedding it back to the dim level.'
	}, {
		'name': 'Dark-Minder’s Observances',
		'cost': '--',
		'mins': 'Occult 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Ancient Tongue Understanding',
		'desc': 'Walking the haunted roads of Creation, the Lawgiver learns to hear the Essence of the world. These sounds govern her understanding of everything that is not said. With this Charm, the Solar may learn up to (Essence) thaumaturgic routines without paying experience points.'
	}, {
		'name': 'Gloaming Eye Understanding',
		'cost': '3m per Charm',
		'mins': 'Occult 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Stackable',
		'duration': 'Indefinite',
		'prereqs': 'Dark-Minder’s Observances',
		'desc': 'The Solar channels her Essence into a perfect medium. At the center of day and night, she may be taught up to (Essence) spirit Charms that are applicable to the Eclipse anima power. She need not pay experience points to learn these Charms; she maintains the power to perform such magic as long as she keeps motes committed to the effect. Releasing these motes causes knowledge of the Charm to fade. In order to learn these Charms, the Exalt must meet the trait requirements for the Charm, but does not need to have learned the Charm’s prerequisites.'
	}, {
		'name': 'Ephemeral Induction Technique',
		'cost': '20m, 1wp',
		'mins': 'Occult 5, Essence 5',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Carnal Spirit Rending, Gloaming Eye Understanding, Wyld-Binding Prana',
		'desc': 'The Solar reaches into the Essence of the world to rip new life from the very fabric of Creation. This Charm allows the Solar to induct a single spirit into the world. She draws this creature from her surroundings, but may also use the Essence-patterns of spirits she has captured with Burning Exorcism Technique or absorbed with Carnal Spirit Rending to determine the being’s nature and magic. The spirit begins the game with the Solar’s Essence rating and half her total experience, but may only use the most basic spirit Charms until the Storyteller has had sufficient time to approve the spirit’s stats, Intimacies, and magic, as determined by the Solar’s player. This spirit is bound to the Solar as a familiar and becomes an applicable target for certain Survival Charms. A spirit created by the Solar is her thrall for a season. She may then choose to keep it as her familiar or release it. Freeing the current familiar allows her to use this Charm again to create a new familiar. If she decides to retain a bond with the original creature, then she keeps it for another season. Each season that comes and goes, she may choose to retain or relinquish her bond with the spirit so that she may attain a new familiar. Otherwise, the spirit remains as her familiar and is in all senses another character, gaining experience points as any character would. Alternately, the Solar may also induct a Fair Folk into the world. In the Wyld, this Charm usually entails the creation of a raksha, but in Creation, where many denizens of the Wyld were bound into place by the elemental fusion of the Poles, the result is bound to be more unpredictable.'
	}, {
		'name': 'All-Encompassing Sorcerer’s Sight',
		'cost': '4m',
		'mins': 'Occult 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Spirit-Detecting Glance',
		'desc': 'The Exalt gazes into the Essence of the world and sees the patterns of magic that make up Creation. For a few seconds after activating this Charm, the Solar can see Essence flowing through the world. She can perceive immaterial spirits, but moreover, she can see the workings of spirit energies around her. If a character is using a shaping action or Evocation, the Solar may make an Intelligence + Occult roll at a difficulty of the effect’s Essence minimum to determine how the power works. This Charm may also be used to identify the presence of ongoing sorcerous effects such as mystical barriers and levitating platforms, revealing not only the presence of magic, but how it functions. This power also allows the Exalt to see places where Creation is thin—the borders of shadowlands and the Wyld appear as hazy, gauzy distortions of light. The Solar may also detect the entrance to spirit sanctums within her range of vision. This Charm does not reveal the working of the Charms of the Exalted.'
	}, {
		'name': 'Burning Eye of the Deliverer',
		'cost': '--',
		'mins': 'Occult 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'All-Encompassing Sorcerer’s Sight',
		'desc': 'The Solar’s keen eyes burn through deception. This Charm enhances All-Encompassing Sorcerer’s Sight, aiding the Solar in an attempt to see through magical disguises, shapeshifting, or any other magic which allows a character—even another Exalt—to appear to be something or someone other than who they are. This Charm makes it possible to notice such effects with Awareness, adding the Solar’s Essence in automatic successes to the attempt. For the difficulty of seeing through disguises, see page XX. Unless stated otherwise, seeing through all other kinds of magical identity-deceptions is a difficulty 5 feat.'
	}, {
		'name': 'Sorcerer’s Burning Chakra',
		'cost': '--',
		'mins': 'Occult 5, Essence 4',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Burning Eye of the Deliverer',
		'desc': 'The Solar sees all things truly. When she is at the iconic anima level, she automatically gains the effects of All-Encompassing Sorcerer’s Sight for free. Furthermore, using Spirit-Detecting Glance in combination with All-Encompassing Sorcerer’s Sight allows the Exalt to discern the nature and Essence rating of a spirit if she succeeds at an Occult roll with a difficulty of the spirit’s Essence.'
	}, {
		'name': 'Spirit-Drawing Oculus',
		'cost': '1wp',
		'mins': 'Occult 5, Essence 5',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Sorcerer’s Burning Chakra',
		'desc': 'The Solar may channel the Essence of the world through her body, becoming a momentary vector for incredible power. While her anima is iconic, the Exalt perceives the flows of Essence around her. Even as she recognizes the inherent genius of cosmic design, she sees its flaws—loose or wasted motes, cast off from expelled Charms or sorcery, or flowing from fissures in the dragon tracks. For one Willpower, she may cast off her anima, shedding it to the dim level. It dissipates, flowing out across the world in all directions, and every loose mote it passes is drawn back to the Solar. Roll a free full Occult Excellency of the Solar’s Perception + Occult; successes on this roll determine how many motes the Solar is able to gather. These motes may only be used to power Charms from Craft, Investigation, Medicine, Lore, and Occult, or added to the mote total of a shaping action by the Solar. Spirit-Drawing Oculus may only be used once per day.'
	}, {
		'name': 'Terrestrial Circle Sorcery',
		'cost': '--',
		'mins': 'Occult 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'The Solar steps through the First Circle and is forever transformed. Upon learning this Charm, the Exalt gains the ability to learn and cast spells from the Terrestrial Circle of Sorcery. In addition, the Solar learns one shaping ritual (see p. XX) and one Terrestrial spell for free. The spell selected becomes the sorcerer’s “control spell,” and may feature in the anima iconography and be referenced in the mechanics of certain Charms.'
	}, {
		'name': 'Celestial Circle Sorcery',
		'cost': '--',
		'mins': 'Occult 4, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Terrestrial Circle Sorcery',
		'desc': 'The Solar ascends to the Second Circle and becomes an avatar bearing aspects of Heaven and Hell in her mind. In all the world, there are only a handful of sorcerers at this level of power. Upon learning this Charm, the Exalt gains the ability to cast spells from the Celestial Circle of Sorcery. In addition, the Solar learns one shaping ritual and one Celestial spell for free. The spell selected acts as an additional control. Celestial Circle Sorcery may not be learned prior to Essence 3 by selecting Occult as a Supernal Ability.\nSolar Circle Sorcery\n	Cost: --; Mins: Occult 5, Essence 5; Type: Permanent\n	Keywords: None\n	Duration: Permanent\n	Prerequisite Charms: Celestial Circle Sorcery\nThe Solar rises to the Third and final Circle of Sorcery and becomes a herald of untold power. Spells of the Solar Circle are the most powerful sorceries ever imagined. Only the Solar Exalted have the power necessary to master spells of this magnitude. Learning this Charm grants the ability to cast spells from the Solar Circle of Sorcery. In addition, the Solar learns one shaping ritual and one Solar spell for free. The spell selected acts as an additional control. Solar Circle Sorcery may not be learned prior to Essence 5 by selecting Occult as a Supernal Ability.'
	},

	// Ride

	{
		'name': 'Master Horseman’s Techniques',
		'cost': '--',
		'mins': 'Ride 1, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'The Exalt has the talent of a veteran equestrian, knowing a handful of ancient and proven techniques to control, console, and sustain her mount through the most arduous circumstances. Purchasing this Charm provides the Solar with three of the listed techniques, and the player may work with the Storyteller to expand the techniques available through this Charm. Additional techniques can be purchased for 2xp or a single bonus point.\nHarmony of Spirits Style: The Lawgiver can spend one mote reflexively to stop herself from falling off a mount. The Exalt can activate this effect when she is asleep, unconscious or otherwise incapacitated, and will not fall off the mount from being asleep or otherwise unconscious during ordinary travel. Against any attack which might knock her from her mount, she gains +1 defense.\nHorse-Summoning Whistle: The Lawgiver can spend one mote reflexively to call a loyal mount to her side. The mount makes its way to her as circumstances best allow.\nMaster Horseman’s Eye: The Solar can spend one mote reflexively when evaluating a mount to perfectly recognize its strengths and weaknesses.\nSpeed-Sustaining Technique: The Lawgiver can spend one mote reflexively and touch a mount to sustain it for two hours. Effort during that time does not exhaust the creature, and it does not suffer harmful random incidents such as thrown shoes and injured hooves.\nSpirit-Steadying Assurances: The Solar can spend one mote reflexively to stop a mount from panicking. For one instant, the mount shakes off all natural or supernatural fear, and may not be intimidated by direct effort for (Essence) rounds, or indirect circumstances for the scene’s duration.\nBlood Rider’s Toughness: The Solar and her mount are as a single being with one skin. The Solar will never chafe or develop sores from long rides, and both the Lawgiver and her mount may ride for twice as long without food, water, or rest.'
	}, {
		'name': 'Phantom Steed',
		'cost': '10m, 1wp',
		'mins': 'Ride 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One day',
		'prereqs': 'Master Horseman’s Techniques',
		'desc': 'At the Lawgiver’s command, the Essence of the world opens to release a phantom steed into her custody. This mount’s coat is as black as coal, but its eyes burn with the light of twin suns, and its mane carries all the colors of Solar anima. This Charm creates an exceptional war horse (p. XX) that never tires, hungers, or thirsts, and need not sleep. This horse cannot be intimidated, nor can its loyalty be shaken. Its existence is an extension of the Solar’s own.'
	}, {
		'name': 'Flashing Thunderbolt Steed',
		'cost': '4m',
		'mins': 'Ride 2, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One hour',
		'prereqs': 'Master Horseman’s Techniques',
		'desc': 'By tapping her own spirit, the Solar can imbue her mount with endless energy. The mount can run at full speed for an hour without becoming fatigued, and gains an automatic success toward all movement and balance-related actions. Furthermore, while this Charm is active the Exalt may use the Athletics Charms Graceful Crane Stance and Monkey Leap Technique (p. XX) while mounted, allowing her mount to keep its footing on the worst terrain and to leap across gaps or over obstacles.'
	}, {
		'name': 'Elusive Mount Technique',
		'cost': '4m',
		'mins': 'Ride 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Flashing Thunderbolt Steed',
		'desc': 'The Solar draws her mount back as quick as the wind and as light as a sparrow. This Charm allows the Exalt to reflexively disengage while mounted.'
	}, {
		'name': 'Untouchable Horseman’s Attitude',
		'cost': '3m, 2i, 1wp',
		'mins': 'Ride 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Perilous',
		'duration': 'Instant',
		'prereqs': 'Elusive Mount Technique',
		'desc': 'The Lawgiver may use her skill to flawlessly evade an oncoming threat, automatically succeeding at a disengage action, so long as there is no more than one opponent at close range.'
	}, {
		'name': 'Phantom Rider’s Approach',
		'cost': '7m',
		'mins': 'Ride 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Untouchable Horseman’s Attitude',
		'desc': 'When using her mount to disengage, horse and rider seem to melt away, their very Essence converging with the scenery in an access of speed. This Charm supplements a successful disengage, moving the Exalt and her mount two range bands should an enemy approach.'
	}, {
		'name': 'Wind-Racing Essence Infusion',
		'cost': '2m, 1wp or 4m, 1wp',
		'mins': 'Ride 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Flashing Thunderbolt Steed',
		'desc': 'The Solar draws the Essence of the world through her reins, drawing herself toward her destination with incredible speed. This Charm lasts one hour, but the motes are not committed. If the prerequisite is active, it costs only two motes, one Willpower to activate, otherwise the mote cost is four. It adds (Essence or three, whichever is greater) successes to any Ride-based commands, and to each interval of a race (see p. XX). Also, when she succeeds at a mounted rush (see p. XX), she gains two point of Initiative. If her mount is rolled into combat, it gains two points of Initiative as well.\nOutside of combat, the Solar can travel at dramatic speeds. In narrative time, a distance that would take her mount an hour to cover can be cleared in ten minutes. What would take her a day can be covered in a handful of hours, and what would take a week can be covered in a single day. At the end of the hour, if the Solar chooses to renew Wind-Racing Essence Infusion, ignore the Willpower cost.'
	}, {
		'name': 'Immortal Charger’s Gallop',
		'cost': '1m',
		'mins': 'Ride 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Wind-Racing Essence Infusion',
		'desc': 'Feeding Essence through her mount’s form, the Exalt greatly increases its speed for an instant. Convert the mount’s Speed to automatic successes on a single movement action or one interval of a race. If the mount has a negative Speed bonus, this Charm reverts it 0. This Charm does not affect the penalty to a mount’s mobility that comes from heavy barding.'
	}, {
		'name': 'Supernal Lash Discipline',
		'cost': '5m',
		'mins': 'Ride 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Perilous',
		'duration': 'One scene',
		'prereqs': 'Immortal Charger’s Gallop',
		'desc': 'The Lawgiver holds the reins of Heaven and rides with the skill of divinity. Her skill allows her to draw supernatural levels of performance from her chosen steed, doubling its Speed for the scene. If this Charm is used without Flashing Thunderbolt Steed, mortal mounts will almost surely perish at the end of the scene. Used in conjunction with this Charm, the mount will still be tired and need to rest at the scene’s end. This Charm ends if the Solar is crashed.'
	}, {
		'name': 'Speed-Fury Focus',
		'cost': '--(3m)',
		'mins': 'Ride 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Immortal Charger’s Gallop',
		'desc': 'Feeling her mount’s agitation and its intense need to run, trample, win, the Solar uses her Essence to focus its aggression into a wild burst of speed. This Charm permanently upgrades its prerequisite, allowing its effect to be used in a Join Battle roll for three motes.'
	}, {
		'name': 'Fierce Charger’s Pulse',
		'cost': '--',
		'mins': 'Ride 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Speed-Fury Focus',
		'desc': 'Feeling her mount’s fury piqued at a rival’s temerity, the Lawgiver is empowered. For each 10 an opponent rolls in an interval of a race (p. XX) or in a rush or disengage action (p. XX), the Solar gains a mote of Essence which can only be used to fuel Ride Charms. Motes generated in this fashion fade if they are not used on the Exalt’s next turn.'
	}, {
		'name': 'Grizzled Cataphract’s Way',
		'cost': '1m',
		'mins': 'Ride 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Speed-Fury Focus',
		'desc': 'So long as she sits a saddle, the tireless Lawgiver need not give way to flawed senses or exhaustion. The Exalt may roll Join Battle using the higher dice cap of her Ride or Awareness, and by doing so, she eliminates all Awareness penalties to the roll relating to exhaustion.'
	}, {
		'name': 'Inexhaustible Destrier’s Gait',
		'cost': '2m',
		'mins': 'Ride 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One turn',
		'prereqs': 'Immortal Charger’s Gallop',
		'desc': 'One of the advantages of going mounted is that wound penalties to the rider do not hinder the movement of her steed. Inexhaustible Destrier’s Gait also removes the steed’s wound penalties and penalties for unsteady footing for one turn, making the mount’s movements flawless.'
	}, {
		'name': 'Coursing Firebolt Flash',
		'cost': '3m or 4m',
		'mins': 'Ride 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Wind-Racing Essence Infusion',
		'desc': 'The Lawgiver whips her reins and strikes against the world with her Essence, pushing aside all external forces to drive her mount forward with blistering speed. This Charm supplements a rush, disengage, or withdraw action (p. XX), or a single interval of a race (p. XX), adding one automatic success and rerolling all 1s until 1s fail to appear. For four motes, the Solar may unfurl a single level of her anima (so long as it is above the dim level), leaving a trail of fire in her wake and reducing her current level by one degree. This flame will not consume the scenery, but will burn steadily, for an hour, even in a driving rain, and does damage identical to a bonfire (see page XX). These flame trails are visible from a mile away, and can be seen by completely sightless characters.\nIf the Solar knows Onrush Burst Method (see page XX), she benefits from the Charm exactly as if she were using Athletics, save that she must use the gathered motes to power Ride Charms.'
	}, {
		'name': 'Rapid Cavalry Approach',
		'cost': '7m or 12m',
		'mins': 'Ride 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Perilous',
		'duration': 'One scene',
		'prereqs': 'Coursing Firebolt Flash',
		'desc': 'Infusing her chosen mount with Solar Essence, she lightens its body and magnifies its strength, allowing it to run at tremendous speeds. To activate this Charm, the Exalt must be at extreme range from all opponents. For seven motes, this Charm allows a naturally fast mount such as a horse or a great-cat to move three range bands per turn. For twelve motes, it can confer the same effect to a slow or gigantic mount such as an ox or an elephant. Once within long range of any opponents, the Lawgiver’s mounted speed is reduced to two bands per turn. This Charm ends if the Exalt or the mount attacks a target, or if the Solar is crashed.'
	}, {
		'name': 'Sometimes Horses Fly Approach',
		'cost': '1m',
		'mins': 'Ride 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One turn',
		'prereqs': 'Coursing Firebolt Flash',
		'desc': 'The Solar touches her mount with a mote of purefic power, opening its mind and teaching it the trick of running on air. The horse can gallop on water, clouds, and even an open gap across a chasm, allowing the Solar to take mounted movement actions across gulfs that would otherwise be impossible to cross.'
	}, {
		'name': 'Soaring Pegasus Style',
		'cost': '2m, 1wp',
		'mins': 'Ride 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Sometimes Horses Fly Approach',
		'desc': 'Their spirits conjoined, mount and rider streak toward their target with a powerful Essence-infused leap. This Charm allows a Solar using the prerequisite to attempt a rush action on an aerial opponent or target (such as a Haslanti skyship) at any range. If successful, the result is identical to a successful rush; if the target is moving away, the Exalt follows an additional range band. If the Solar pursues a target for more than two turns using the prerequisite, drop the Willpower cost from this Charm.'
	}, {
		'name': 'Single Spirit Method',
		'cost': '1m',
		'mins': 'Ride 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Master Horseman’s Techniques',
		'desc': 'The Lawgiver and her mount are as a single being, nearly indivisible. Should her mount lose its footing, the Solar may use this Charm to allow it to reflexively rise from prone. The Solar will neither be thrown from the saddle in this instance, nor will she be injured by her mount rolling on her.'
	}, {
		'name': 'Saddle-Staying Courses',
		'cost': '4m, 3i, 1wp',
		'mins': 'Ride 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Single Spirit Method',
		'desc': 'Gripping the reins of her loyal steed, the Solar rides inexorably through the tides of chaos and the uncertain forces that buffet Creation. This Charm allows the Solar to recover from a successful dismount gambit without falling from the saddle. The Solar is seen to fall from her steed, only to flip in the air or rebound off scenery to reunite with her mount. This Charm is also effective against attacks which would knock the Solar from her mount, but not those which would launch or bodily drag her from the saddle.\nHorse-Stealing Leap\n	Cost: 3m, 1wp; Mins: Ride 5, Essence 2; Type: Supplemental\n	Keywords: None\n	Duration: Instant\n	Prerequisite Charms: Saddle-Staying Courses\nWith a cavalier leap, the Exalt unhorses a rider and takes the reins. This Charm supplements a dismount gambit. If the Lawgiver has higher Initiative than her target, it also lowers the difficulty of the gambit by 1. Upon success, the Solar leaps onto an enemy mount, knocking the rider from the saddle and taking the reins in one smooth motion. If the Exalt is on foot, this gambit only works from close range. However, if she is already mounted, her steed can throw her an extra range band, allowing her to attempt the gambit from short range. The range of Horse-Stealing Leap can also be enhanced by appropriate Athletics Charms. If the Exalt is trying to steal back her own horse, this Charm automatically succeeds.'
	}, {
		'name': 'Harmonious Tacking Technique',
		'cost': '2m to 6m',
		'mins': 'Ride 3, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Master Horseman’s Techniques',
		'desc': 'With skill, flair, and Essence, the Exalt instills a mount’s gear with harmonious movements, causing straps to flow together and cinch, latches to buckle, blankets to smooth and armor to settle perfectly in line with her dramatic tacking and barding actions. Working at speed, it takes a master stabler five minutes to tack a horse—a process that involves affixing a blanket and saddle, bit and bridle, crown and boots. While this time may vary due to differences in mounts and gear, the entire process can be shortened through use of this Charm. Roll the Exalt’s Dexterity + Ride against a difficulty of 3. On a success, she can tack a mount in a single turn, while failure sees it tacked in two turns.\nBarding, similarly, is applied after tacking, and even the fastest cataphract requires a minimum of five minutes to fully deck a destrier in armor. After tacking a mount, the Solar may reuse this Charm to affix its armor. Quickly armoring a steed works the same way—the Lawgiver armors the mount in one or two turns, depending on her success.\nIn addition, special weaponry can be affixed to a steed at a rate of one per minute normally. Again, the Exalt may use this Charm to arm a fully tacked and barded steed with as many as three weapons in a single turn upon success, or one per turn if she fails. The steed she prepares with this Charm need not be her own.\nWhirlwind Horse-Armoring Prana\n	Cost: 1m to 3m or 5m, 1wp; Mins: Ride 5, Essence 3; Type: Reflexive\n	Keywords: None\n	Duration: Instant\n	Prerequisite Charms: Harmonious Tacking Technique\nThe Lawgiver may draw her horse’s tack, armor, and weapons from conceptual Elsewhere—that is, any point in Creation defined as “not here”—causing them to hover and leap onto her mount’s body over the course of three rounds. She pays one mote for each set of gear—first tack, then barding, then up to three weapons. If the Solar is riding when she activates this Charm, she need not dismount. Her mount’s saddle and armor flows into place, growing beneath her like second skin. She may also pay three motes to instantly send her mount’s panoply Elsewhere.\nAt Essence 3+, she may pay five motes, one willpower to instantly clad her mount in the entirety of its gear.\nWhirlwind Horse-Armoring Prana is explicitly compatible with the Resistance Charm Glorious Solar Plate (see p. XX). After using Whirlwind Horse-Armoring Prana, she may use Glorious Solar Plate reflexively on the same instant to apply the armor’s effects to her steed’s barding for only five motes.'
	}, {
		'name': 'Bard-Lightening Prana',
		'cost': '4m',
		'mins': 'Ride 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One day',
		'prereqs': 'Whirlwind Horse-Armoring Prana',
		'desc': 'With an infusion of Essence, the Solar lightens her mount’s barding, removing its mobility penalty.'
	}, {
		'name': 'Hero Rides Away',
		'cost': '--',
		'mins': 'Ride 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Master Horseman’s Techniques',
		'desc': 'Enduring hardship, pain, and even loneliness, the Lawgiver draws renewing strength from the bond she has with a trusted mount. Each time the Lawgiver ends a combat scene riding, and each time she engages a dangerous situation with the aid of her mount and survives, she gains a number of motes equal to her Essence, and a single point of temporary Willpower. When a scene ends in which the Solar has accomplished a major goal with the help of her mount, subtract a point of Limit as well.'
	}, {
		'name': 'Seasoned Beast-Rider’s Approach',
		'cost': '1m, 1wp',
		'mins': 'Ride 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Drawn steadily to the pulse of battle, the Lawgiver and her mount’s heart beat as one. Normally, if a rider wishes to let her mount attack, it uses up her attack action for the turn. With this Charm, activated when the player rolls Join Battle, the Exalt’s mount gains an Initiative track with a starting value equal to her own, and may make attacks on its own turn. In addition, when the Solar commands her mount to perform a Ride-based movement action, it no longer uses up the Exalt’s movement action for the turn.'
	}, {
		'name': 'Immortal Rider’s Advantage',
		'cost': 'Varies',
		'mins': 'Ride 3, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Seasoned Beast-Rider’s Approach',
		'desc': 'The bond between the Exalt and her mount is intrinsic. So long as the Exalt sits the saddle and they are connected as horse and rider, half of either partner’s Initiative (rounded up) can be transferred reflexively between them to stave off Initiative crash or to deliver telling decisive attacks.'
	}, {
		'name': 'Untouchable Solar Steed',
		'cost': '--',
		'mins': 'Ride 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Immortal Rider’s Advantage',
		'desc': 'So long as she sits atop her horse, the Lawgiver knows its life is threatened. Through intense training of evasive maneuvers, the Solar learns to transfer the effects of attack-evasive Dodge Charms through her mount, allowing her to use them on her steed’s behalf.'
	}, {
		'name': 'Wrathful Mount Invigoration',
		'cost': '--',
		'mins': 'Ride 4, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Immortal Rider’s Advantage',
		'desc': 'The Lawgiver’s mount brooks no challenge to its authority, for it carries the sun on its back. After using Seasoned Beast-Rider’s Approach to Join Battle, the Solar’s mount gains one Initiative per turn. In addition, when the mount succeeds at a Ride-based movement action or gains more successes than its opponent in an interval of a race, the mount gains Initiative equal to the Solar’s Essence.\nAt Essence 4+, the mount’s base Initiative value is set to 4 or its Stamina, whichever is higher, to a maximum of 6.'
	}, {
		'name': 'Worthy Mount Technique',
		'cost': '1i',
		'mins': 'Ride 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Seasoned Beast-Rider’s Approach',
		'desc': 'The Solar is one with her mount. Through her skill and the bond they share, the mount can take a reflexive Defend Other action to defend the Solar, paying one from its Initiative to prevent attacks which would harm her. Activating this Charm raises the mount’s parry and Dodge defense rating by 1, but cannot raise them past 5. In addition, while it is guarding the Solar, its damage totals gain a number of dice equal to the Solar’s Essence.'
	}, {
		'name': 'Rousing Backlash Assault',
		'cost': '5m',
		'mins': 'Ride 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Counterattack, Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Worthy Mount Technique',
		'desc': 'When the Exalt’s steed is using Worthy Mount Technique, and has been rolled into battle using Seasoned Beast-Rider’s Approach, the mount may unleash a decisive counter attack against anyone who directs a close range attack at the Solar or itself.'
	}, {
		'name': 'Seven Cyclones Rearing',
		'cost': '5m, 1wp',
		'mins': 'Ride 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Clash, Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Rousing Backlash Assault',
		'desc': 'Infuriated by an attacker’s temerity, the Lawgiver’s mount strikes an attack aside with one of its own. When the Exalt’s steed is using Worthy Mount Technique, and has been rolled into battle using Seasoned Beast-Rider’s Approach, the mount may unleash a decisive clash attack against any attack directed at the Solar. If the mount is clashing with a withering attack while its rider is at base or lower Initiative, ignore the willpower cost of this Charm.'
	}, {
		'name': 'Woe and Storm Evasion',
		'cost': '4m',
		'mins': 'Ride 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Worthy Mount Technique',
		'desc': 'Snapping the reins and drawing her mount back from an attack, the Lawgiver salvages her companion’s precious life. A withering attack that would have crashed her mount instead leaves it with 1 Initiative. A decisive attack that would have slain her mount leaves it with a single health level. This Charm cannot be used to stop a withering attack if the mount already sits at 1 Initiative, nor can it save the steed from a decisive attack that will remove its final health level.'
	}, {
		'name': 'Resilience of the Chosen Mount',
		'cost': '2m',
		'mins': 'Ride 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Woe and Storm Evasion',
		'desc': 'The Solar blesses her faithful companion with fortifying Essence. The Exalt may pay two motes after a damage roll against her mount to remove a number of successes equal to the 1s and 2s in the roll.'
	}, {
		'name': 'Iron Simhata Style',
		'cost': '5m',
		'mins': 'Ride 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Resilience of the Chosen Mount',
		'desc': 'The Lawgiver raises her hands over her mount and draws away the Essence of softer substances, hardening its skin, giving it muscles like granite and turning its coat and mane into a fine mail of steely strands. Add the Solar’s Essence +1 to the mount’s soak.'
	}, {
		'name': 'Mount Preservation Method',
		'cost': '1hl per three successes',
		'mins': 'Ride 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Worthy Mount Technique',
		'desc': 'The Solar feels the thread of her life is intertwined. When her mount suffers a decisive attack, the Solar may trade one of her own health levels for every three successes on the damage roll. The Solar must be riding her mount to use this Charm.'
	}, {
		'name': 'Horse-Healing Technique',
		'cost': '4m, 1 health level',
		'mins': 'Ride 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Mount Preservation Method',
		'desc': 'The Lawgiver trades blood and life to sustain her honored companion. With dramatic action lasting a scene, in which the Exalt cares for her mount, treating its wounds and soothing it with words, she can heal her mount of (Essence) lethal or bashing damage, taking a single lethal or bashing damage in exchange. This Charm can be combined with Survival and Medicine Charms to treat injured mounts.'
	},

	// Sail

	{
		'name': 'Salty Dog Method',
		'cost': '—',
		'mins': 'Sail 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'None',
		'desc': 'The Solar is the consummate mariner, seasoned by hardships, tried by adversity and proven true. This Charm gives the Exalt the following advantages:\n• The Solar’s expertise often saves the ship. Reroll any 6s in the result of a Sail roll until 6s no longer appear.\n• She is inured to supernatural horror. Fear effects caused by monsters, behemoths, demons, Yozis, and other existentially terrifying beings have less of an effect. Add half the Exalt’s Sail (rounded up) to her Resolve against such influence.\n• If she fails a balance check on land or sea, she still falls down, but then she immediately falls up, landing on her feet. In addition, she can never fall from a ship. Even the most stumble-footed bastard will find a way to keep from going overboard.\n• By land or by sea, the Exalt knows the exact distance and route to somewhere she has been before.'
	}, {
		'name': 'Shipwreck-Surviving Stamina',
		'cost': '—',
		'mins': 'Sail 3, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Salty Dog Method',
		'desc': 'Hardened by cruel elements and biting privation, the Solar has given her blood to the sea and been blessed by its life-giving forces. The Solar’s Stamina is considered two higher than its true rating when resisting suffocation, dehydration, and starvation. The rules for surviving without oxygen, water, and food can be found on page XX.'
	}, {
		'name': 'Fathoms-Fed Spirit',
		'cost': '—',
		'mins': 'Sail 5, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Salty Dog Method',
		'desc': 'The Lawgiver’s resolve is steeled by a life spent on the deck of a ship, rocked to sleep by the hand of death. This Charm permanently enhances the Exalt’s willpower. So long as she started the day by waking up shipboard, on the water, she may ignore the willpower cost to resist one form of social influence per day. Note that this power is discretionary: the Exalt may always allow herself to be persuaded by mental influence, so that the player can husband this Charm’s potential against more dangerous persuasion.'
	}, {
		'name': 'Ship-Imperiled Vigor',
		'cost': '—',
		'mins': 'Sail 4, Essence 2',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Salty Dog Method',
		'desc': 'The Lawgiver has weathered storms and faced many crises on the open sea. With this Charm, the Exalt is quickened by peril and reacts to disaster with unhesitating action. When the vessel she is aboard has taken hull damage, the Exalt gains a number of bonus dice equal to the hull penalty. For example, if the hull penalty is -1, the Solar gains +1 to certain actions. These bonus dice can be applied to any action in defense of the ship or its crew, from combat to social influence to rolls to repair damage to the ship and stop its sinking. These bonus dice cannot be applied to Naval Maneuvers or pursuit rolls, although they do apply to Sail rolls to avoid hazards and navigate to a destination.'
	}, {
		'name': 'Perfect Reckoning Technique',
		'cost': '4m',
		'mins': 'Sail 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Until the hazard has passed',
		'prereqs': 'Salty Dog Method',
		'desc': 'Through skill and resolve, the Solar conquers the darkest dominions of the sea. This Charm starts an ongoing dramatic action in which the Solar navigates a ship through a hazard such as a coral reef, the living sargassum around Bluehaven, the hidden rocks in a storm-tossed bay, and so on. The Exalt gains two bonus dice to navigate dangerous features she is unfamiliar with, or two automatic successes to clear a hazard she has navigated flawlessly in the past. Flawlessly means without taking hull damage or being forced to use Hull-Preserving Technique. Bonuses from this Charm are applied to each roll to evade the hazard. These bonuses do not count as dice added by a Charm.\nExample Hazard\nThe Mirror Court is a maze of mirrors left behind by the Wyld’s retreat. Ships that sail into the Mirror Court are almost inevitably lost forever. Each round of sailing through the Mirror Court is made at difficulty 5. Each time the player fails a roll, the ship’s crew—possibly disoriented by hundreds of reflections—steers into one of the mirrors, causing the ship to impact with its reflection exactly as if having been struck with the ram maneuver on page XX. Other hazards exist in the Mirror Court. Perfect Reckoning Technique vastly reduces the threat of these and any other hazards the Solar has bested.'
	}, {
		'name': 'Weather-Anticipating Intuition',
		'cost': '5m',
		'mins': 'Sail 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Perfect Reckoning Technique',
		'desc': 'The Solar’s Essence is tied to the waves. Through this bond, the water speaks. By touching a body of water, the Solar can see through its eyes, and may predict the weather along her course of travel for the next (Essence * 10) hours. The only thing that will cause this forecast to err is the influence of powerful weather-changing magic. The Exalt may foresee even freak squalls and unexpected fogs.'
	}, {
		'name': 'Tide-Carried Omens',
		'cost': '7m',
		'mins': 'Sail 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Weather-Anticipating Intuition',
		'desc': 'The Solar sails upon the merciless tides, far from the comforts of hearth and temple, and so her eyes are keen to omens that will guide her to safety. The Solar can foresee danger in the wheeling of gulls, the pattern of the clouds, the rush of currents, the contents of the fishing net and the gavotte of stars. She becomes aware of danger to ship, self, or crew (Essence) minutes before it arrives, gripped by an increasing sense of foreboding, though she does not know what the danger is. While shipboard, the character gains (Essence) bonus dice to Awareness rolls to detect danger, such as ambushes, rogue waves or poisoned meals. This Charm does not allow the Exalt to detect threats it would be impossible for mortal senses to notice, but it will aid Awareness Charms that can detect such dangers.'
	}, {
		'name': 'Wind-Defying Course Technique',
		'cost': '3m',
		'mins': 'Sail 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One hour',
		'prereqs': 'Immortal Mariner’s Advantage or Salty Dog Method',
		'desc': 'The Solar charges her ship and sails with wind-slicing Essence. Fueled by her defiance, the ship may sail almost directly into the wind. This Charm cuts wind-based penalties to the ship’s speed and maneuverability, reducing such penalties by three.'
	}, {
		'name': 'Current-Cutting Technique',
		'cost': '4m',
		'mins': 'Sail 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One hour',
		'prereqs': 'Wind-Defying Course Technique',
		'desc': 'With an infusion of Essence, the Solar breaks the water’s grip on her vessel. The Exalt may sail against a current, reducing penalties to the ship’s speed by two. This Charm also helps the ship resist violent suction such as that employed by certain sea monsters, subtracting two successes from rolls to pull the ship through the water by means of a vacuum, whirlpool, or other suction.'
	}, {
		'name': 'Storm-Weathering Essence Infusion',
		'cost': '6m, 1wp',
		'mins': 'Sail 5, Essence 3',
		'type': 'Simple',
		'keywords': 'Pilot',
		'duration': 'One hour',
		'prereqs': 'Current-Cutting Technique, Wind-Defying Course Technique',
		'desc': 'Much like hazards described on page XX, storms represent a major source of damage to ships. Storms can snap masts and oars, capsize ships or smash them beneath vast swells. While this Charm is active, the Solar can protect a ship no larger than a trireme, adding (Essence) automatic successes to each Sail roll to evade storm damage.'
	}, {
		'name': 'Ship-Claiming Stance',
		'cost': '5m, 1wp',
		'mins': 'Sail 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Essence of a ship knows its master. This Charm claims a ship. If it was not owned by one of the Exalted, the ship disregards its former master. If the Lawgiver’s positive intimacy toward the ship achieves Major or Defining status, the Exalt may draw up to five motes from her bond with the ship, once per day, but she must be shipboard to do so. Drawing motes from more than one ship or familiar in a day causes all motes past five to dissipate at the end of the round. In addition, those who do not bear the Exalt’s remit suffer a -1 penalty to all actions taken on the Solar’s ship until she has formally welcomed them aboard. The Exalt may renounce her welcome at any time, restoring this penalty at her pleasure.'
	}, {
		'name': 'Ship-Sleeking Technique',
		'cost': '4m',
		'mins': 'Sail 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Ship-Claiming Stance',
		'desc': 'The Solar channels her Essence through the ship’s hull, smoothing the timbers with a thin layer of frictionless anima and causing it to glide more easily through or over the water. This Charm increases the ship’s speed by one for its duration.'
	}, {
		'name': 'Orichalcum Letters of Marque',
		'cost': '--',
		'mins': 'Sail 5, Essence 1',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Ship-Claiming Stance',
		'desc': 'The waters of Creation abound with the dark dross of Heaven’s judgment: galleys crewed by corpses, barges pulled by demons, and ships helmed by the Abyssal Exalted. Heaven recognizes the Lawgiver’s authority to recruit such creatures. This Charm upgrades the prerequisite, allowing the Solar to welcome residents of Malfeas and the Underworld, Abyssal Exalted and other cursed Chosen to the crew of her ship. While engaged in the operation of the Solar’s ship, such characters no longer count as creatures of darkness when targeted by social influence that would exploit this condition.\nIn addition, while such characters may be deeply discomforted by the Solar’s anima, they are not driven to dematerialize, nor do they suffer any automatic damage from the Exalt’s iconic displays or area-effecting magic which would harm all creatures of darkness in the vicinity. In case of a mutiny, the Lawgiver may revoke this boon at any time. While her crew may be protected from social magic, this Charm provides no defense against attacks which harm cursed spirits and benighted creatures.'
	}, {
		'name': 'Tide-Cutting Essence Infusion',
		'cost': '5m, 1wp',
		'mins': 'Sail 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One day',
		'prereqs': 'Ship-Sleeking Technique',
		'desc': 'The Solar’s anima enshrouds the ship, concentrating around the bow and waterline and causing it to cut through the water more effectively. The ship’s speed is increased by one for the Charm’s duration. This Charm is incompatible with Wave-Riding Discipline.'
	}, {
		'name': 'Wave-Riding Discipline',
		'cost': '5m, 1wp',
		'mins': 'Sail 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One day',
		'prereqs': 'Ship-Sleeking Technique',
		'desc': 'The Solar’s Essence suffuses the hull, mast and sails, lightening the ship until it rises out of the water and planes over the top of the waves. While this Charm is active, the ship’s sails are more effective, doubling the ship’s sail-derived speed bonus. The ship also gains an additional point of speed for favorable currents. However, the ship’s speed bonus for having oarsmen (if it has any) falls to one (if it is higher), and the ship may not benefit from being pulled by a sea monster or other beast which would drag the hull back down into the waves. This Charm is incompatible with Tide-Cutting Essence Infusion.'
	}, {
		'name': 'Hull-Preserving Technique',
		'cost': '5m, 1wp',
		'mins': 'Sail 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One turn',
		'prereqs': 'Ship-Claiming Stance',
		'desc': 'By bracing herself against the ship and channeling Essence through it at the moment of impact, the Solar can cause her anima to absorb the damage, leaving the ship unharmed. The Exalt triggers this effect at the moment of impact, negating all damage to the ship’s hull and masts. The Solar may only protect an area of the ship within (Essence * 20) feet of her current position. Some hazards, such as coral reefs or hidden rocks may cause continuous damage to the ship, forcing the Lawgiver to trigger this effect repeatedly. If so, ignore the willpower cost for repeated consecutive uses.'
	}, {
		'name': 'Hull-Taming Transfusion',
		'cost': '2m, 3hls per 1hul',
		'mins': 'Sail 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Hull-Preserving Technique',
		'desc': 'In a desperate effort, the Solar conjoins her Essence to that of the ship’s, trading life for life. By paying two motes at the moment of impact, the Solar opens a channel between body and hull, transferring damage from ship to self at a rate of three health levels per one level of hull damage ablated.'
	}, {
		'name': 'Blood and Salt Bondage',
		'cost': '10m, 1wp',
		'mins': 'Sail 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Hull-Taming Transfusion',
		'desc': 'Drawing on ancient wards and pacts between the Essence of sea and sky, the Solar awakens the anima of her ship. Over the course of the next month, the Solar and her crew experience an increase in vitality, as the ship’s Essence feeds and strengthens their flesh. Each member of the crew, including the Exalt, gains a number of health levels identical to the ship’s hull rating. These health levels remain in place even if the Solar or her crewmates disembark; only characters who are off the ship for a month or more lose this benefit, bonus health levels fading as their bond with the ship diminishes. If the ship should suffer hull damage while this Charm is active, the bonus levels are summarily stricken from the Solar and her crew. Such indirect damage does not generate wound penalties, however—simply discard bonus health levels until the ship’s hull is repaired.'
	}, {
		'name': 'Chaos-Cutting Galley',
		'cost': '10m, 1wp',
		'mins': 'Sail 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One day',
		'prereqs': 'Hull-Preserving Technique',
		'desc': 'The Wyld often lures ships into unstable waters where the crew becomes monstrous and the ship transforms into something that can no longer float. A Lawgiver who knows this Charm will automatically sense the Wyld approaching her ship at least one round before passing into it. She may activate this Charm, thinning her anima into a crackling, stabilizing field that crawls over the deck, mast, and surrounding atmosphere, making it immune to the Wyld’s shaping influence before fading out of view. This protection extends to the ship’s crew as long as they remain aboard the ship. The Solar may activate this Charm even while she is asleep.'
	}, {
		'name': 'Ship-Leavening Meditation',
		'cost': '5m',
		'mins': 'Sail 5, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Hull-Preserving Technique',
		'desc': 'Concentrating on damage to the hull, mast, or rigging, the Exalt sends her Essence lancing into the ship’s wounds, suffusing them to strengthen timbers, tighten bolts and gaps, and hold frayed gear and sails together. This Charm negates the ship’s hull penalty, and must be dropped and renewed each time that penalty increases.'
	}, {
		'name': 'Ship-Sustaining Spirit',
		'cost': '4m',
		'mins': 'Sail 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Stackable',
		'duration': 'Indefinite',
		'prereqs': 'Ship-Leavening Meditation',
		'desc': 'With binding Essence, the Lawgiver makes her ship as tireless and unstoppable as she is. This Charm is triggered in response to an attack or impact that would destroy her vessel. Ship-Sustaining Spirit holds the ship together as long as the Solar remains on board and keeps the Essence committed. If the ship takes even one level of damage, it will fall apart, although the Exalt may continue to send her Essence spearing through the ship’s frame to hold it together, maintaining multiple commitments to the Charm.'
	}, {
		'name': 'Burning Anima Sails',
		'cost': '6m, 1wp',
		'mins': 'Sail 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Blood and Salt Bondage, Ship-Sustaining Spirit',
		'desc': 'Anima burning with righteous condemnation, the Lawgiver casts her blazes into the air, igniting her sails in a pennant for the world to see. The Exalt’s anima must be at the bonfire level to use this Charm. The moment the Solar activates this Charm, her iconic anima crawls up the mast, rendering it invincible to all damage for an instant. If the sails are still flying, her anima crawls over them, suffusing them and igniting them in a massive display that can be seen for (Essence * 5) miles. If the sails are gone, the Lawgiver’s anima flies in their place, restoring the ship’s sail-based speed. While the Burning Anima Sails are flying, the ship is supernaturally terrifying to demons, the undead, and other benighted creatures from the recesses of Creation. All Naval Maneuvers attempted by such creatures suffer a dice penalty equal to half the Lawgiver’s Essence, rounded up. In addition, any creatures of darkness who board the Solar’s ship suffer a -1 penalty to all actions. Using this Charm drops the Solar to the dim anima level. When the Charm ends, the iconic anima dissipates, leaving the ship’s fabric sails perfectly restored, even if they were completely destroyed.'
	}, {
		'name': 'Indomitable Voyager’s Perseverance',
		'cost': '1wp',
		'mins': 'Sail 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Immortal Mariner’s Advantage or Salty Dog Method',
		'desc': 'Sensing a fault in her actions, the Solar’s indefatigable spirit sets a new course of action. With this Charm, the Exalt can reroll any Sail-based action, keeping successes and rerolling non-successes, activating additional Charms on the reroll if she chooses to do so.'
	}, {
		'name': 'Ocean-Conquering Avatar',
		'cost': '1m',
		'mins': 'Sail 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One turn',
		'prereqs': 'Indomitable Voyager’s Perseverance',
		'desc': 'Channeling deeply from her unending Essence, the Solar realizes her true potential. Eyes and castemark blazing white, her nautical prowess expands tremendously. This Charm grants the Exalt one automatic success and applies a full free Sail Excellency (-2 dice) to the next Sail roll. This Charm may only be used once per scene.'
	}, {
		'name': 'Immortal Mariner’s Advantage',
		'cost': '1 or 2m',
		'mins': 'Sail 5, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Talents honed by lifetimes of effort and sacrifice, the Exalt channels her experience into perfected motions of hand and sail, cunning naval attack plans, and decisive marine gambits. For one mote, the Exalt may use this Charm after any Sail-based roll, allowing her to either apply the double 9s rule, or to reroll 1s until 1s fail to appear. For two motes, she may do both.'
	}, {
		'name': 'Legendary Captain’s Signature',
		'cost': '3m',
		'mins': 'Sail 5, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Pilot',
		'duration': 'Instant',
		'prereqs': 'Immortal Mariner’s Advantage',
		'desc': 'The Exalt fashions her skill into a perfect Essence-fueled maneuver. The Solar’s naval skill is such that she can overcome a ship’s design flaws. Even a trash barge moves like a sleek pirate cutter in her capable hands. This Charm supplements a naval maneuver, doubling the ship’s maneuverability rating and increasing its speed by one. If the ship’s rating is zero or less, its rating increases to one.'
	}, {
		'name': 'Invincible Admiral Method',
		'cost': '10m, 1wp',
		'mins': 'Sail 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Legendary Captain’s Signature',
		'desc': 'The Solar is master of the sea and all that sail upon it. Her actions ignite fervor in her followers, impelling them toward emulation of her perfect form. Through use of mirrors, flags, and other signaling devices, the Exalt signals orders to ships in her fleet, preparing them for a series of naval maneuvers to combat their enemies. Roll the Lawgiver’s Charisma or Intelligence + Sail; all allied ships that can see the Exalt’s orders add a number of dice to their naval maneuvers equal to half the successes, rounded up. This bonus also applies to the Solar’s own ship.\nWhile this Charm is active, the Solar must make this roll each round, renewing her orders to her fleet. Because of the mobile nature of combat, the same ships probably won’t always be able to see the Solar’s orders, and if the Exalt’s own ship falls under attack, she may be unable to signal for rounds at a time.'
	}, {
		'name': 'Sea Devil Training Technique',
		'cost': '10m, 1wp',
		'mins': 'Sail 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Invincible Admiral Method',
		'desc': 'Once, the nations of the sea rose up to drive the Chosen from the world as they had driven their masters before them. The Solars answered this piracy by training a host of marine-warriors to sweep the Niobrarans back across the sea. Through the use of this Charm, even the most degenerate blackguards can be trained into an elite crew. This Charm is an enhanced training regimen. The Solar’s methods are brutal, harsh, and yet inspiring, teaching her initiates fear and respect in equal measures and strengthening them against the hardships to come. With this Charm, she can invest her crew with one of the following skills after a training period of one month:\n• Sail 4.\n• Soldier-level combat prowess described on page XX.\n• Two Integrity specialties: one to resist supernatural horror, the other to resist hypnotic magic.\n• Larceny, Resistance, or Survival up to the Solar’s rating -1.\n• Willpower 6.'
	}, {
		'name': 'Superior Positioning Technique',
		'cost': '2m',
		'mins': 'Sail 5, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Pilot',
		'duration': 'Instant',
		'prereqs': 'Legendary Captain’s Signature',
		'desc': 'The Solar guides her ship along a flow of Essence in opposition to an enemy vessel. This Charm supplements a positioning maneuver (p. XX), treating the opponent’s 1s as the Solar’s 10s. In addition, this Charm automatically evades a ram maneuver, even if the opponent’s roll succeeds. To avoid transparency, the player should not declare this Charm aloud, but should write it on a piece of paper and keep it face down until the dice have been rolled.'
	}, {
		'name': 'Implacable Sea Wolf Spirit',
		'cost': '4m',
		'mins': 'Sail 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Pilot',
		'duration': 'One scene',
		'prereqs': 'Legendary Captain’s Signature',
		'desc': 'Steering into combat, the Solar’s ship devours her enemies. This Charm lowers the momentum cost of naval maneuvers by two for the rest of the scene.'
	}, {
		'name': 'Sea Serpent Flash',
		'cost': '5m',
		'mins': 'Sail 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Pilot',
		'duration': 'Instant',
		'prereqs': 'Superior Positioning Technique',
		'desc': 'The Lawgiver sees the course an enemy vessel will take outlined in a flow of Essence and moves her ship into a near perfect attack position. This Charm supplements a positioning maneuver, doubling momentum gained from extra successes on the roll.'
	}, {
		'name': 'Ship-Rolling Juggernaut Method',
		'cost': '3m',
		'mins': 'Sail 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Pilot',
		'duration': 'Instant',
		'prereqs': 'Implacable Sea Wolf Spirit',
		'desc': 'Normally when a ship changes targets during naval combat, it loses all of its momentum. The Solar’s ship only builds a greater head of steam. Upon launching a naval maneuver which incapacitates an enemy vessel, the Solar may use this Charm to keep all of her ship’s momentum, and adds an additional momentum bonus equal to the enemy captain’s Essence.'
	}, {
		'name': 'Ship-Razing Renewal',
		'cost': '—',
		'mins': 'Sail 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'Pilot',
		'duration': 'Permanent',
		'prereqs': 'Ship-Rolling Juggernaut Method',
		'desc': 'The Solar is invigorated by the annihilation of her seafaring foes. Upon successfully incapacitating an enemy ship with a naval maneuver, roll a free full Sail Excellency. Successes on this roll restore an equal number of motes to the Solar’s Essence pool, to a limit of motes she has spent on Sail Charms in the scene. In addition, the Solar may trade four of these motes for a single point of willpower, but may gain no more than a single point of willpower for the defeat of a single enemy ship.'
	}, {
		'name': 'Ship Breaker Method',
		'cost': '3m',
		'mins': 'Sail 5, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Pilot',
		'duration': 'Instant',
		'prereqs': 'Legendary Captain’s Signature',
		'desc': 'Infusing the prow and ram of her ship with hardening Essence, the Solar empowers her ship to cut through the enemy’s hull like a spear. This Charm supplements a ram maneuver, causing the attack to do one extra level of damage. In addition, this Charm automatically defeats a broadside maneuver, damaging the enemy ship and canceling the broadside attack completely. To avoid transparency, the player should not declare this Charm aloud, but should write it on a piece of paper and keep it face down until the dice have been rolled.'
	}, {
		'name': 'Deadly Ichneumon Assault',
		'cost': '2m, 1wp',
		'mins': 'Sail 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Pilot',
		'duration': 'Instant',
		'prereqs': 'Ship Breaker Method',
		'desc': 'The overwhelming Essence of the Solar guides her ship on the attack, maximizing its momentum. When she succeeds at a ram maneuver, she may trigger this Charm to enact an automatically successful “shock and board” boarding action (see p. XX).'
	}, {
		'name': 'Rail-Storming Fervor',
		'cost': '2m',
		'mins': 'Sail 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'Pilot',
		'duration': 'Instant',
		'prereqs': 'Deadly Ichneumon Assault',
		'desc': 'Capitalizing on a perfect moment to strike, the Solar rallies her crew into a precision assault. This Charm supplements a Join Battle roll, adding three bonus dice to the Join Battle rolls of herself and her crew. Bonus dice from this Charm do not count as dice added by a Charm. Rail-Storming Fervor is expressly allowed to be combined with Join Battle-enhancing Charms of other abilities.'
	}, {
		'name': 'Deck-Sweeping Fusillade',
		'cost': 'Varies',
		'mins': 'Sail 5, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Pilot',
		'duration': 'Instant',
		'prereqs': 'Legendary Captain’s Signature',
		'desc': 'The Solar’s commands ignite a desire for victory in her crew, steeling their senses and honing their training into an awesome ballistic onslaught. This Charm supplements a broadside maneuver (p. XX), adding bonus dice to the naval maneuver roll, and treating the result as if it were (Essence) successes higher than it really is. The bonus dice on this Charm are equal to the Solar’s Essence, but the price changes based on her permanent Essence. From Essence 1-4, the cost of this Charm is two motes. At Essence 5+, it costs three motes, and at Essence 8+ it costs four.'
	}, {
		'name': 'Sea Ambush Technique',
		'cost': '2m',
		'mins': 'Sail 5, Essence 1',
		'type': 'Supplemental',
		'keywords': 'Pilot',
		'duration': 'Instant',
		'prereqs': 'Legendary Captain’s Signature',
		'desc': 'Sight of the Lawgiver’s ship strikes dread into the heart of her enemies. Its sudden disappearance is a presage to disaster. This Charm supplements a concealment action in which the Exalt’s ship quickly vanishes behind a piece of scenery, adding the ship’s speed as bonus dice to the roll.'
	}, {
		'name': 'Black Fathoms Blessed',
		'cost': '10m, 1wp',
		'mins': 'Sail 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'Any ten Sail Charms',
		'desc': 'The Exalt taps deeply of her Essence, merging ship, sea and self into one form. For the rest of the scene, as long as she is on her ship, add the vessel’s Speed as automatic successes to her movement actions, and the ship’s Maneuverability to her defenses. Any magic which increases these values cannot increase the bonus to these traits by more than +1 each. In addition, regardless of whether she is aboard her ship, she may speak in an ancient maritime tongue that is instinctually understood by oceanic spirits, aquatic raksha, the Lintha family and members of the Niobraran League. She may drink salt water as if it were fresh, and though she can be incapacitated by drowning, she can never die by being submerged, neither from running out of oxygen or by the crushing weight of the depths.'
	},

	// Survival

	{
		'name': 'Food-Gathering Exercise',
		'cost': '3m',
		'mins': 'Survival 1, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One hour',
		'prereqs': 'None',
		'desc': 'The land gives its strength to the Lawgiver. The Solar may use this Charm to make a Charisma or Wits + Survival roll against a difficulty assigned by the Storyteller. Each extra success on this roll represents enough food gathered to feed a single person for a day. The fare guaranteed by this Charm is of a meager sort—berries, grubs, nuts, seeds, insects, and small animals—but the Solar has no need of a spear or bow or net to hunt such game. If the Storyteller decides there simply isn’t any sort of sustenance in the region, or the player fails the roll, the Solar still finds enough food to feed at least one person. In addition, for every hour the Solar continues to use this Charm, the Solar works toward a climactic encounter with the rawest expression of survivalist skill possible. This guarantees that after repeated use, the Solar will have at least one chance per day to catch a large fish, kill a game animal, trap a large bird or find a fruit-bearing tree. This encounter will happen regardless of Storyteller decree, but is still contingent on a difficulty 6 roll in the worst case scenario.'
	}, {
		'name': 'Hardship-Surviving Mendicant Spirit',
		'cost': '5m',
		'mins': 'Survival 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One day',
		'prereqs': 'None',
		'desc': 'Through the use of this Charm, the Solar becomes able to survive in even the most hostile conditions without special preparation. This Charm negates all environmental penalties to Survival rolls and eliminates the deleterious effects of exposure to extreme climates. The coldest glacier and the hottest desert are no more deadly to the Solar than the gentlest rolling plain. She ignores inclement weather even when lightly dressed, and does not suffer undue blisters, bug bites or plant poison even when walking barefoot through the jungle. This Charm does not protect the Exalt against environmental damage.\nIn addition, Hardship-Surviving Mendicant Spirit lowers the difficulty to forage and find shelter by 2, to a minimum of 1.'
	}, {
		'name': 'Element-Resisting Prana',
		'cost': '--',
		'mins': 'Survival 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Hardship-Surviving Mendicant Spirit',
		'desc': 'Through this Charm, the Solar becomes able to survive in any environment. When the prerequisite is active, the Solar can withstand the heat and toxic fumes in the caldera of an active volcano, can walk underwater with no ill effects, and can even withstand the hostile and inimical climes of the Elemental Poles. While Hardship-Surviving Mendicant Spirit is active, add the Exalt’s Resistance to her soak against elemental sources of environmental damage, such as cold, fire, and lightning.'
	}, {
		'name': 'Trackless Region Navigation',
		'cost': '5m, 1wp',
		'mins': 'Survival 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Hardship-Surviving Mendicant Spirit',
		'desc': 'The deepest wilds are no mystery to the Solar Exalted. With this Charm, the Exalt can find her way safely through even the worst terrain. The Solar and a group of up to (Essence * 2) followers can travel up to 10 miles a day across the harshest terrain, and 20 miles per day across normal wilderness. The Solar automatically succeeds at any Survival roll to find the next oasis, natural shelter, river or other topographical feature the region might include.'
	}, {
		'name': 'Unshakeable Bloodhound Technique',
		'cost': '4m',
		'mins': 'Survival 5, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Trackless Region Navigation',
		'desc': 'The Solar can track someone through the wilderness following the most minute signs, or sometimes no sign at all, following unerring instinct. This Charm supplements the Perception + Survival roll described on page XX. Reroll all 5s and 6s until 5s and 6s no longer appear, and treat 1s rolled by the opposing player as 10s to the Solar’s result. This Charm can even contest perfect track-covering effects such as Traceless Passage.'
	}, {
		'name': 'Traceless Passage',
		'cost': '3m, 1wp',
		'mins': 'Survival 5, Essence 3',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Unshakeable Bloodhound Technique',
		'desc': 'An Exalt with this Charm can vanish into the wilderness. This Charm affects the Solar and up to (Essence * 2) followers, supplementing a Wits + Survival roll to cover the Exalt’s tracks (see p. XX). This roll gains (Essence) automatic successes and is bolstered by the double 9s rule. The Solar cannot be tracked by conventional means, not even with the aid of tracking animals or other means—mundane attempts automatically fail. Only those with supernatural prowess can hope to find the vanished Lawgiver.'
	}, {
		'name': 'Eye-Deceiving Camouflage',
		'cost': '6m',
		'mins': 'Survival 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Traceless Passage',
		'desc': 'With this Charm, the Solar can camouflage herself or an object (Essence + 1) yards wide so perfectly that they cannot be detected by mundane senses while immobile. Even the acute senses of a claw strider or other famed hunting beasts will fail to detect the Exalt (or her shelter, or her hidden cache of food, etc). Preparing this camouflage takes the Solar an hour. The player rolls (Intelligence + Survival) and records the successes, rerolling all non-successes a single time and all 1s until 1s fail to appear. These successes directly counter any magical Awareness-based attempts to pierce the Lawgiver’s camouflaging efforts.'
	}, {
		'name': 'Friendship with Animals Approach',
		'cost': '3m',
		'mins': 'Survival 2, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'None',
		'desc': 'Through the use of this Charm, the Exalt can deal with nearly any wild animal. Herbivores and smaller omnivores will not break and run when the Solar approaches, and will even become somewhat docile, allowing the Exalt to pet or handle them. Predators are less susceptible to this Charm, and most will simply let the Solar pass unmolested through their territory. This Charm does not work on sentient animals or familiars, animals that are trained to attack or animals that are insane from pain, hunger, or disease.'
	}, {
		'name': 'Spirit-Tied Pet',
		'cost': '10m, 1wp, 1xp',
		'mins': 'Survival 3, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Friendship with Animals Approach',
		'desc': 'An Exalt with a familiar has experienced the gift of having been chosen twice. The Exalt reaches through her anima to touch the bond she shares with her companion animal, elevating its spiritual status and according herself the following powers:\nUnbreakable Loyalty: The familiar gains a Defining Intimacy to the Solar, if it does not already have one. No influence of any kind—other than that of the Solar—can make the familiar act against this Intimacy.\nEssence-Drawing Method: The familiar becomes a font of spiritual energy. The Solar may reflexively draw up to five motes from her pet once per day. The Exalt must be within short range of the familiar she wishes to tap. If the Exalt taps more than five motes from multiple pets in a scene, the motes she draws will only last until her next turn.\nPower-Renewing Bond: The Solar draws strength from her familiar bond. Once per day, the Exalt may draw a single point of willpower as a simple action lasting at least a few seconds—through interaction with her familiar. This contact renews the Solar’s mental energies and can even negate a -1 crippling penalty to the Exalt’s social influence actions. The Solar may only use this power once per day, no matter how many familiars she has.\nSense-Riding Discipline: The Exalt may borrow the senses of a familiar through a moment of intense concentration. This simple action requires the Solar to concentrate on pushing her consciousness into the mind of her familiar, rendering her incapable of taking any other actions until she has returned to her own mind. This power can be invoked when the character is asleep or otherwise inactive, and has no known range limitation. At Survival 5+, the Exalt further extends her influence into the familiar’s motor functions, merging seamlessly with her charge in order to control its actions.'
	}, {
		'name': 'Beast-Mastering Behavior',
		'cost': '10m, 1wp',
		'mins': 'Survival 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One week',
		'prereqs': 'Spirit-Tied Pet',
		'desc': 'The Solar holds dominion over the beasts of the field. With this Charm she can train an animal, familiar or otherwise, to follow her commands. Through exercise and repeated practice, she can also train the beast to use special abilities that are latent, such as an eagle’s disarm ability (p. XX), or techniques designed by the player or the Storyteller which are appropriate to the animal.\nNormally, training an animal to unlock its latent potential requires a minimum of Survival 3, and two specialties: one in animal husbandry, and another specific to the animal—falconry for a hawk, lion taming for a great cat, and so on. The trainer makes an extended roll with an interval of one month and a goal of 10, modified by the animal’s attitude—docile and tamed beasts presenting no penalties, familiars representing a number of bonus dice equal to the trainer’s Intimacy to the animal, and hostile, wild, or otherwise untrainable animals representing a penalty of -2 or -3. The trainer must spend the entire month interacting with the beast, teaching it words, signals, commands, and running it through exercises daily. Any significant amount of time the trainer spends away from the beast during this time saps successes away at a rate of one success for every two or three days. Success at the extended roll means that the animal learns to use the technique and can be order to do so on command.\nA Solar with Beast-Mastering Behavior gains (Essence) automatic successes to this roll, and shortens the interval of the roll to one week. Using this Charm exempts her from the specialty requirements of normal training, while the Charm Friendship with Animals Approach may eliminate the penalty associated with wild or hostile animals.\nAt Survival 5+, Essence 3+, the Solar can teach a familiar she has enhanced with Spirit-Tied Pet to use magical abilities, such as the eagle’s special ability Iron Wings Carry. Doing so costs the Solar two experience points per ability trained. The player and the Storyteller can work together to develop new and appropriate abilities for the Solar to teach her familiar.\nAlso at Survival 5+, Essence 3+, the Exalt can use Beast-Mastering Behavior on a familiar she has enhanced with Bestial Traits Technique, to teach it to use a special ability that it can only use during Deadly Predator Method, for a cost of two experience points. Such abilities need not be wholly appropriate for the animal in question. A flying squirrel might gain the power to generate a charge like an electric eel, while a tyrant lizard might learn to spit a fireball from its mouth.'
	}, {
		'name': 'Deadly Onslaught Coordination',
		'cost': '3m',
		'mins': 'Survival 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Beast-Mastering Behavior',
		'desc': 'The Lawgiver trains her familiar to strike on command. With a flash of Essence, they strike in tandem, delivering a terrible blow. With this Charm, the Exalt can call her familiar to strike on the same instant she attacks—so long as her familiar has not attacked that round, she can call it from any position in the combat order to attack her target immediately before or after her own strike.'
	}, {
		'name': 'Red-Toothed Execution Order',
		'cost': '5m',
		'mins': 'Survival 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'Decisive-only',
		'duration': 'Instant',
		'prereqs': 'Deadly Onslaught Coordination',
		'desc': 'Sending a moment to strike, the Exalt orders her familiar in for the kill. Though it is a reflexive, this Charm supplements a familiar’s decisive attack, adding extra successes to the attack’s raw damage. Using this Charm sets the familiar’s Initiative to base after the attack, even when they are under the effect of Deadly Predator Method. This Charm may not be reused until the familiar has raised its Initiative to 10+.'
	}, {
		'name': 'Bestial Traits Technique',
		'cost': '10m, 1wp, 2xp',
		'mins': 'Survival 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Spirit-Tied Pet',
		'desc': 'With this Charm, the Solar can invest her Spirit-Tied Pet with traits beyond its natural capacity. This Charm supplements a normal beast-training roll (see p. XX), rerolling all 1s until 1s fail to appear. In addition to teaching her charge a new command, she can also increase one of the following traits upon the successful completion of the extended roll.\n• Strength, Dexterity, Stamina, or Perception +1. This may not be repurchased for the same Attribute more than once, and may not give a familiar an Attribute rated higher than 10.\n• Athletics, Brawl, Larceny, Martial Arts, Performance, Resistance, Stealth, or Survival, by one dot, to a maximum of the Exalt’s rating in that Ability.\n• Steeliness (Merit): This special merit permanently raises the familiar’s Resolve against intimidation or other fear-inducing effects by 1. This may only be purchased once.'
	}, {
		'name': 'Ghost Panther Slinking',
		'cost': '--',
		'mins': 'Survival 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Beast-Mastering Behavior, Bestial Traits Technique',
		'desc': 'When the Solar controls a familiar using the Sense-Riding Discipline, she can indict the senses of her enemies. While taking the form of her familiar, the Exalt may activate any Stealth Charms she knows to protect her familiar-self from detection. Familiars which are large, unusual or otherwise unsuited to stealth may incur penalties to normal Stealth actions based on unfavorable circumstances—a claw strider slinking through a forest can be very difficult to notice, but a claw strider skulking through the shadowed streets of Nexus suffers a -2 penalty.'
	}, {
		'name': 'Hide-Hardening Practice',
		'cost': '--',
		'mins': 'Survival 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'Stackable',
		'duration': 'Permanent',
		'prereqs': 'Bestial Traits Technique',
		'desc': 'The Solar reaches into the substance of her familiar, and draws out that which is soft and vulnerable, hardening muscle, bone and hide. The familiar’s soak increases by three, and its hardness by one. The Solar may enhance a single familiar with this Charm (Essence) times.'
	}, {
		'name': 'Life of the Aurochs',
		'cost': '--',
		'mins': 'Survival 5, Essence 2',
		'type': 'Permanent',
		'keywords': 'Stackable',
		'duration': 'Permanent',
		'prereqs': 'Bestial Traits Technique',
		'desc': 'The Solar taps a wellspring of Essence to increase her familiar’s vitality and stature. Each purchase of this Charm increases a familiar’s health levels, adding one -1 health level and two -2 health levels to its health track. In addition, each repurchase increases her familiar’s size by 10%, to be manifested normally or only during Saga Beast Virtue and Deadly Predator Method. The Solar may enhance a single familiar with this Charm (Essence) times.'
	}, {
		'name': 'Saga Beast Virtue',
		'cost': '5m, 1wp',
		'mins': 'Survival 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Hide-Hardening Practice, Life of the Aurochs',
		'desc': 'The Exalt infuses her familiar with Solar anima, unlocking the form of the sacred beast. Her familiar grows in size by 25%, and gains +1 to all Attributes, and both defenses. It also gains up to (Essence) mutations, determined by the player upon purchase of the Charm. The Exalt can choose to activate Saga Beast Virtue with as many or as few of the designated mutations as she chooses. While in Saga Beast form, the familiar is completely immune to fear-inducing effects.'
	}, {
		'name': 'Familiar-Honing Instruction',
		'cost': '4m',
		'mins': 'Survival 3, Essence 2',
		'type': 'Simple',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Spirit-Tied Pet',
		'desc': 'The Solar can inspire zealous devotion, even in the beasts of the wilderness. Conveying her wishes to the familiar through a brief command, the Solar orders her companion to attempt an action of which it is capable. Roll the Exalt’s Charisma + Survival and add her successes as dice to the familiar’s attempt to follow the Solar’s order. Unlike normal Simple Charms, this Charm may be placed in a flurry. At Essence 3+, this Charm can be used reflexively.'
	}, {
		'name': 'Spirit-Hunting Hound',
		'cost': '1m',
		'mins': 'Survival 5, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One turn',
		'prereqs': 'Familiar-Honing Instruction',
		'desc': 'Though the Solar’s eyes may be blind to the spirit world, the eyes of her familiar can see into the realm of Essence. With this Charm, the Exalt invokes the familiar’s senses, feeding them with the forces that primed Creation. For one turn, the familiar can attempt to detect immaterial beings with a (Perception + Awareness) roll, against a difficulty of the target’s Essence or five, whichever is lower. If the Solar’s familiar detects the target, it continues to do so for the rest of the scene.'
	}, {
		'name': 'Phantom-Rending Fangs',
		'cost': '3m',
		'mins': 'Survival 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'One turn',
		'prereqs': 'Spirit-Hunting Hound',
		'desc': 'Reaching into the Essence of the world, the Solar channels condemnation through a bestial agent. Though it is a reflexive Charm, this Charm supplements a familiar’s attack against an immaterial foe. If the familiar successfully grapples and establishes clinch control of the immaterial, it is rendered temporarily vulnerable to physical attacks for the clinch’s duration. If the Exalt has enhanced this Charm with Familiar-Honing Instruction, the player may choose to lower the cost of this Charm by one mote per success, reducing the bonus dice she can add to the action. This can reduce the cost of Phantom-Rending Fangs to zero.'
	}, {
		'name': 'Ambush Predator Style',
		'cost': '3m',
		'mins': 'Survival 3, Essence 2',
		'type': 'Reflexive',
		'keywords': 'Mute',
		'duration': 'Instant',
		'prereqs': 'Familiar-Honing Instruction',
		'desc': 'Following the pulse of Essence that forms at the moment of battle, the Solar guides her familiar on the attack. This Charm enhances a familiar’s Join Battle roll, allowing it to use the Solar’s Wits + Survival dice pool for the roll, and granting it (Exalt’s Essence) successes that do not count as dice added by a Charm. Furthermore, if the Solar has used the prerequisite to enhance this roll, each bonus die creates a cascading reroll— for each of these dice that turns up a success, reroll another die until the cascade fails to produce any successes.'
	}, {
		'name': 'Force-Building Predator Style',
		'cost': '--',
		'mins': 'Survival 4, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Ambush Predator Style',
		'desc': 'This Charm permanently enhances a familiar rolled into combat with Ambush Predator Style. For the rest of the combat scene, this familiar automatically generates one Initiative per turn. This Charm temporarily ceases function when the familiar is under the effects of Deadly Predator Method.'
	}, {
		'name': 'Crimson Talon Vigor',
		'cost': '--',
		'mins': 'Survival 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'Force-Building Predator Style',
		'desc': 'The Lawgiver and her familiar fight as one. With this Charm, the familiar learns to read the Exalt’s momentum, flowing with her attacks as if it were part of the Solar’s Essence. For each successful withering attack the Solar lands against an opponent, the familiar gains bonus Initiative equal to half the Initiative drained by the attack, rounded up. This bonus may not exceed the Solar’s Essence score. This Charm must be repurchased for every familiar the Solar wishes to enhance with its effect.'
	}, {
		'name': 'Deadly Predator Method',
		'cost': '15m, 1wp',
		'mins': 'Survival 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'Crimson Talon Vigor, Red-Toothed Execution Order, Saga Beast Virtue',
		'desc': 'Opening her palm to a beam of pure Solar Essence, the Solar crushes a tiny star in her fist, releasing a massive amount of spiritual force into the world around her. Her surroundings become primal, shifting in modes and methods unseen since the dawn of time, and her familiar remembers an ancient time and an earlier form in which beasts were the life that beat at the heart of a supreme being. Channeling the Essence of the ancient world through her familiar, the Solar’s honored companion is transformed into a primal beast of war.\nDeadly Predator Method has the following advantages:\n• The familiar grows immense. Its size grows by 15%, and an additional 10% for every repurchase of Life of the Aurochs. The Solar may waive the growth bonus if she chooses.\n• The familiar’s appearance becomes magnificent and terrifying. Its markings become more extreme, its colors explosive and vibrant. Natural armor such as a shell or carapace becomes spiked and ridged, while natural weaponry such as horns, fangs and tusks grow even more pronounced. The familiar gains (Solar’s Essence) automatic successes to intimidate targets. Against much smaller or cowardly opponents, the familiar is automatically intimidating—such enemies suffer a -1 penalty to their attacks against the familiar.\n• The familiar cannot be intimidated, and ignores all fear-inducing magic.\n• The familiar gains (Solar’s Essence) automatic successes to all movement-based Athletics rolls. Mighty familiars such as bears and boars gain (Solar’s Essence) in successes on Strength + Athletics rolls. Gigantic familiars gain all of these advantages, and fall under the effects of divine might.\n• The familiar’s withering and decisive attacks gain (Solar’s Essence) automatic successes. The creature’s withering damage gains a bonus equal to the Solar’s Essence. For the duration of the Charm, its Initiative does not reset on a successful decisive attack unless the Solar uses Red-Toothed Execution Order.\n• The familiar’s hide grows tough as iron, its bones as hard as diamond, its flesh like granite. It gains five soak against withering attacks, and it becomes invulnerable to decisive attacks. During this time, the transformed familiar can only be hurt by falling from extreme heights or by being crushed by massive vertical tonnage. Even so, such damage will not exceed the familiar’s final health box, leaving it incapacitated but alive when the Charm ends.\n• The familiar may roll Join Battle upon transformation, keeping the higher of its current value or the roll’s result. Smaller animals that do not usually attack gain dice pools comparable to smaller predators and can use appropriate special attacks associated with such animals. For example, a hummingbird gains access to the eagle’s Death Dive attack (see p. XX). Familiars enhanced with Beast-Mastering Behavior may also gain access to a special ability denoted in that’s Charm’s text.\nWhile Deadly Predator Method is active, the familiar loses one point of Initiative per round, and if it suffers Initiative crash, Deadly Predator Method ends, and the beast reverts to its mundane form. Deadly Predator Method can only be used once per battle, but can be reset by killing an opponent with Red-Toothed Execution Order.'
	},

	/*
	[BOX]
	A Familiar Investment
	Nothing’s sacred. Sometimes familiars get killed. Many of the Survival Charms featured here require the Solar to make an investment of experience points in a familiar. These Charms do not represent a poor investment, nor a guarantee of painful regret in the future. Should the Exalt’s familiar die, the experience points invested into the familiar return to the Solar.
	[/BOX]

	War
	*/

	{
		'name': 'War God Descendent',
		'cost': '3m',
		'mins': 'War 1, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'Solars descend from the highest war god in Heaven. They speak armies into existence, and their mere presence is a call to arms. This Charm supplements the Strategic Maneuver roll (see p. XX); as the Lawgiver develops a tactic for victory, fighters of the world are drawn to her call to glory. Ignore the -1 penalty for troops with poor drill, and increase the battle group’s size by one upon joining battle.'
	}, {
		'name': 'Immortal Commander’s Presence',
		'cost': '3m',
		'mins': 'War 2, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'War God Descendent',
		'desc': 'By drilling with a ballista squad, catapult crew, or other teams of siege weaponry operators, the Lawgiver burns an image of perfect actions into their minds. This simple action can last for one minute or one hour. The Solar drills her charges in loading, aiming, and firing siege weaponry and ballistae, giving each crewman an automatic success on the firing roll, and allowing them to reroll all non-successes. If she drills the crew for one minute, they gain this benefit for a single attack. If she drills them for an hour, they gain it for an entire combat scene.'
	}, {
		'name': 'Holistic Battle Understanding',
		'cost': '2m',
		'mins': 'War 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'War God Descendent',
		'desc': 'Looking into the Essence of the battlefield, the Solar tactician knows the forces arrayed against her, if not in fact then in unerring instinct. This Charm supplements the Strategic Maneuver roll (see p. XX) to establish a stratagem, allowing the Solar to ignore all penalties from unfamiliarity with the opposing force or its generals.'
	}, {
		'name': 'Redoubt-Raising Gesture',
		'cost': '1m',
		'mins': 'War 3, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Holistic Battle Understanding',
		'desc': 'The Lawgiver knows the path to victory is through efficiency and planning. With less time for preparation, and fewer tools, she can quickly turn a battlefield into an abattoir. By supplementing a Strategic Maneuver roll with Redoubt-Raising Gesture, the Solar can complete a specific stratagem with one less success than is required.'
	}, {
		'name': 'General of the All-Seeing Sun',
		'cost': '4m',
		'mins': 'War 4, Essence 2',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Redoubt-Raising Gesture',
		'desc': 'Poring over maps and strategies real and remembered, the Solar sees perfect stillness beneath the chaotic Essence of combat. This Charm supplements the Strategic Maneuver roll, adding one automatic success plus (Essence) dice. In addition, the Exalt may choose to split her successes into multiple stratagems. The Solar may deploy no more stratagems than her Essence rating.'
	}, {
		'name': 'Four Glories Meditation',
		'cost': '--',
		'mins': 'War 5, Essence 3',
		'type': 'Permanent',
		'keywords': 'None',
		'duration': 'Permanent',
		'prereqs': 'General of the All-Seeing Sun',
		'desc': 'The Chosen meditates on the never-ending cycle of strife and conflict until her form is instilled with the Essence of war. Any War-based roll she makes rerolls any 6s in its result until 6s no longer appear.'
	}, {
		'name': 'League of Iron Preparation',
		'cost': '5m',
		'mins': 'War 3, Essence 1',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'War God Descendent',
		'desc': 'Reaching out to the hearts of her charges with an impassioned speech and fatal purpose, the Solar invokes their reasons for fighting. This Charm is activated when the Exalt begins the long, arduous process of drilling her soldiers. As she toughens them with want and rain, she reminds them of the hardships they have endured at the hands of their tormentors. When they hunger, her words feed them. When they shiver, her exhortations warm them. Fed by the Solar’s will, they suffer less from long marches, empty bellies, or harsh climates. When the Lawgiver is finished drilling these troops, her commitment to the Charm ends, and her soldiers are forever improved: they cannot suffer demoralizing effects (such as the Demoralize stratagem on page XX) that are not created by Reflexive or Simple types of magic. In addition, ignore penalties on the Strategic Maneuver roll having to do with hunger, bad weather, or the physical exhaustion associated with long marches over difficult terrain.'
	}, {
		'name': 'Tiger Warrior Training Technique',
		'cost': '10m, 1wp',
		'mins': 'War 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Indefinite',
		'prereqs': 'League of Iron Preparation',
		'desc': 'At the dawn of the world, man knew nothing of the gods save that they were inviolate and could not be vanquished. The Solar Exalted changed that. Through the use of this Charm, even the worst gutter-sweepings and bandits can be trained into an elite fighting force. This Charm enhances the effects of drill (see p. XX). The Solar’s training regimens are brilliant, ingraining her troops with perfect actions codified from a peerless mind for war. With this Charm, she can train an undisciplined unit up to Average after just a week, and she can instill an Average unit with Elite status after only a month. Any unit which gains Average quality drill under the aegis of this training also gains the combat traits of battle-ready soldiers, while any unit raised to Elite drill gains the combat traits of elite troops (see p. XX).\nIn addition, at Essence 3+, the Solar can further enhance an Elite battle group with her transforming will.\nDemon-Fighting Principle: For 2xp, she can train her elite units to be more effective at fighting ghosts, demons, and other nighted creatures from the haunted tracts of Creation. The battle group gains +2 might against such foes.\nGiant-Slaying Tactics: For 2xp, the Exalt’s elite are versed in battle tactics having to do with fighting gigantic opponents. Her forces gain +2 might against behemoths or other titanic foes. This effect does not stack with Demon-Fighting Principle.\nGlory of the Inevitable: The Solar’s Tiger Warriors need no truth but life is death, and death comes on the battlefield. For 3xp, she can instill her elite battle group with perfect morale (p. XX), making it impossible to fail a rout check without powerful magical influence.'
	}, {
		'name': 'Rout-Stemming Gesture',
		'cost': '3m',
		'mins': 'War 3, Essence 1',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'War God Descendent',
		'desc': 'The Solar strikes at the heart of panic, dissolving it with the force of her warrior’s Essence. The Solar makes a reflexive rally action (p. XX) with (Essence) automatic successes.'
	}, {
		'name': 'Magnanimity of the Unstoppable Icon',
		'cost': '3m, 1wp',
		'mins': 'War 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Rout-Stemming Gesture',
		'desc': 'The Lawgiver walks the battlefield as a legend, feared and respected by friend and foe alike. After an enemy general takes a rally for numbers action (p. XX), the Solar may use this Charm to restore an amount of Magnitude to her battle group equal to the 1s and 2s in her opponent’s roll. This new influx of soldiers is pulled from the ranks of her enemy’s forces as they switch sides.'
	}, {
		'name': 'March of the Returner	 ',
		'cost': '10m, 1wp',
		'mins': 'War 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Magnanimity of the Unstoppable Icon',
		'desc': 'The Solar represents a new dawn on the last day of Creation. Her coming foretells the battle’s end, a day of blood for the wicked, and light to vanquish darkness from the world once more. When her army is routed, the Lawgiver may call upon glories past—in this life and those that came before—to create rallying tactic that miraculously reforms her army. This Charm is an automatically successful rally action (p. XX). It can be used once per scene, but it can be reset if the Solar succeeds at vanquishing a terrible foe or conquering a powerful enemy through the might of her army.'
	}, {
		'name': 'Supremacy of the Divine Army	 ',
		'cost': '10m, 1wp',
		'mins': 'War 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'March of the Returner',
		'desc': 'The Exalt inspires loyalty such that the very beasts of the field flock to her call. Once per combat, the Exalt may make a reflexive rally for numbers action (see p. XX), adding (Essence) automatic successes. While this Charm cannot restore a dot of Size, any successes beyond the battle group’s total Magnitude will be restored in the rounds following the battle group taking additional damage, at a rate of up two Magnitude levels per round. A Solar whose appeals are sufficiently compelling—a level two stunt—will see wild animals leaping into the fray on her behalf, while a Solar whose call for retribution strikes with resounding force—a level three stunt—will be answered by the very rocks and trees, as elementals and other strange spirits rise up to join her ranks.'
	}, {
		'name': 'Ideal Battle Knowledge Prana',
		'cost': '3m',
		'mins': 'War 2, Essence 1',
		'type': 'Supplemental',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'None',
		'desc': 'The Sun’s Chosen speak in tongues of valor and know the ways of war. As one who has studied or waged war for a lifetime, the Solar simply knows what to do in any combat situation. This Charm applies the double 9s rule to all of the Solar’s order actions (see p. XX). At War 5+, Essence 3+, the Exalt may pay six motes, three initiative to enhance her orders with double 8s.'
	}, {
		'name': 'Immortal Warlord’s Tactic',
		'cost': '4m, 4i, 1wp',
		'mins': 'War 4, Essence 2',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Ideal Battle Knowledge Prana',
		'desc': 'Once per battle, the Lawgiver may enact a signature stratagem that may not be counteracted by prophetic magic or Charms such as Battle-Visionary’s Foresight. This roll may be a unique strategy described by the player, or it may be one of the template stratagies on page XX. In any case, the Strategic Roll is made with double 7s.'
	}, {
		'name': 'Battle Path Ascendant',
		'cost': '5m',
		'mins': 'War 4, Essence 2',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Ideal Battle Knowledge Prana',
		'desc': 'The tide of battle turns, and the Lawgiver feels her body exult with renewing power, her very Essence moving to join the flow of battle. Whenever her army unleashes an attack which causes a battle group’s Magnitude to empty, the Solar may use this Charm to roll Join Battle.'
	}, {
		'name': 'Transcendent Warlord’s Genius',
		'cost': '1m',
		'mins': 'War 5, Essence 3',
		'type': 'Reflexive',
		'keywords': 'None',
		'duration': 'Instant',
		'prereqs': 'Battle Path Ascendant',
		'desc': 'Reaching into a past filled with glories and terror, the Exalt shapes a divinely-inspired order for her army to follow. Whenever the Exalt uses Battle Path Ascendant, she may use this Charm to create and employ a stratagem with a threshold of half the successes of her Join Battle roll, rounded up.'
	}, {
		'name': 'Battle-Visionary’s Foresight',
		'cost': '10m, 1wp',
		'mins': 'War 5, Essence 3',
		'type': 'Simple',
		'keywords': 'None',
		'duration': 'One scene',
		'prereqs': 'General of the All-Seeing Sun, Transcendent Warlord’s Genius',
		'desc': 'The Solar taps a legacy of war greater and longer than the length of her life. Her battle-hardened visage stares into the Essence of the world through ancient eyes, seeing primal battles play out in Ages lost. This Charm is used in the strategy phase, and requires one to five minutes to complete—the Solar concentrates on her foe, her army, the battlefield, and her memories, merging them into a single interlinked tactic that allows her to create a perfect response to enemy stratagems. The player privately chooses two of the listed stratagems (see p. XX) and writes them down, not revealing them to fellow players. The selected tactics are hidden face down.\nIf the opposing player wins the Strategic Maneuver roll and chooses to employ one of the strategies the Solar’s player has selected, the enemy finds that their stratagem has led them into a terrible mistake: the Solar general is ready with a perfect counter-tactic. In this case, treat the battle as if the Exalt’s player had won the strategic roll and deployed a stratagem of equal value to the one she just countered.\nThe Solar’s player may also choose stratagems that are listed in later publications. Opposing players may not opt to choose “no stratagem.” However, armies led by the Chosen may gain access to special, mystical stratagems, such as the divine miracles allowed by the Chosen of Battles. Such tactics are rare, and upon encountering one, the Solar may trade two prepared tactics to counter one of these reflexively.'
	}, 



];