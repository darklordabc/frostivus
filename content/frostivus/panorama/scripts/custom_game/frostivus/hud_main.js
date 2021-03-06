function ShowTryAgain() {
	var center = $("#center");
	var imagePanel = $("#ready_set_go");
	imagePanel.AddClass("Hidden");
	$("#Image").RemoveClass("Hidden");
	center.RemoveClass("Fade");
	center.AddClass("SlideIn");
	$("#FrostivusHUD").AddClass("EndScreenRoot");
	Game.EmitSound("custom_sound.failed");
}
function OnPreRoundCountDown(args){
	var time = args.value
	var center = $("#center");
	var imagePanel = $("#ready_set_go");
	center.RemoveClass("Fade");
	center.AddClass("SlideIn");
	
	if (time == 3){
		imagePanel.SetImage("s2r://panorama/images/custom_game/ui/image_ready.png")
		imagePanel.RemoveClass("Hidden");
		$("#Image").AddClass("Hidden");
		$("#FrostivusHUD").RemoveClass("EndScreenRoot");
		// $("#game_logo").AddClass("Hidden");
		// $("#round_name").AddClass("Hidden");
		Game.EmitSound("custom_sound.countdown_tick")
	}else if (time == 2) {
		// set
		imagePanel.SetImage("s2r://panorama/images/custom_game/ui/image_set.png")
		Game.EmitSound("custom_sound.countdown_tick")
	}else if (time == 1) {
		// GO!
		imagePanel.SetImage("s2r://panorama/images/custom_game/ui/image_go.png")
		$("#count_down_timer").RemoveClass("Hidden");
		$.Schedule(0.9, function(){
			center.AddClass("Fade");
			Game.EmitSound("custom_sound.countdown_go")
		});
		Game.EmitSound("custom_sound.countdown_tick")
	}
	
	center.AddClass("SlideIn");
	$.Schedule(0.9, function(){
		center.RemoveClass("SlideIn")
	});
}

// hide the timer when round end
function HideTimer() {
	$("#count_down_timer").AddClass("Hidden");
}

function OnTimer(args){
	$("#count_down_timer").RemoveClass("Hidden");

	var time = args.value
	$("#count_down_timer").SetHasClass("TimeRunningOut", time < 20)
	
	var mins = Math.floor(time / 60);
	var secs = Math.floor(time - mins * 60);
	var mins1 = Math.floor(mins / 10);
	var mins2 = mins - mins1 * 10;
	var secs1 = Math.floor(secs / 10);
	var secs2 = secs - secs1 * 10;
	
	$("#timer_digits").text = mins1 + "" + mins2 + ":" + secs1 + "" + secs2;
	// if(mins <= 0) {
	// 	$("#count_down_timer").AddClass("SecondsOnly");

	// }else{
	// 	$("#count_down_timer").RemoveClass("SecondsOnly");
	// }

	// $("#count_down_mins_1").style.backgroundPosition = -64 * mins1 + "px";
	// $("#count_down_mins_2").style.backgroundPosition = -64 * mins2 + "px";
	// $("#count_down_secs_1").style.backgroundPosition = -64 * secs1 + "px";
	// $("#count_down_secs_2").style.backgroundPosition = -64 * secs2 + "px";
}

function SetRoundName(args) {
	var name = args.name;
	// $("#round_name").text = $.Localize(name);
}

function AutoRemoveAbilityPips() {
	var abilities = $("#abilities");
	if (abilities==null){
		$.Schedule(1, TryRemoveAbilityPips);
	}else{

		for(var i = 0; i < 5; ++i){
			var ability = abilities.FindChildTraverse("Ability" + i);
			if (ability !== null){
				var levelPips = ability.FindChildTraverse("AbilityLevelContainer");
				if (levelPips !== null) {
					levelPips.style.visibility = "collapse";
				}
			}
		}
		$.Schedule(1, AutoRemoveAbilityPips);
	}
}

function SetupSwapAbiltiyClickCallback() {
	var abilities = $("#abilities");

	// warning! hard coded here!
	var swapAbility = abilities.FindChildTraverse("Ability3");
	if (swapAbility != null) {
		swapAbility.SetPanelEvent("onactivate", function(){
			Game.SwapGreevil();
		});
		return;
	}
	$.Schedule(0.03, SetupSwapAbiltiyClickCallback)
}

(function(){
	GameEvents.Subscribe("pre_round_countdown", OnPreRoundCountDown);
	GameEvents.Subscribe("round_timer", OnTimer);
	GameEvents.Subscribe("set_round_name", SetRoundName);

    // var parent = $.GetContextPanel().GetParent();
    // while(parent.GetParent() != null)
    //     parent = parent.GetParent();
	$.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse("HUDElements").FindChildTraverse("NetGraph").style.marginRight = "75px"
    // parent.FindChildTraverse("Hud").FindChildTraverse("CustomUIRoot").FindChildTraverse("FrostivusHUD").FindChildTraverse("AbilitiesAndStatBranch").style.minWidth = "190px;";

    AutoRemoveAbilityPips();
	GameEvents.Subscribe('show_round_end_summary', HideTimer);
	GameEvents.Subscribe('frostivus_try_again', ShowTryAgain);

	SetupSwapAbiltiyClickCallback();
})();