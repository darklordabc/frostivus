function OnPreRoundCountDown(args){
	var time = args.value
	var center = $("#center");
	var imagePanel = $("#ready_set_go");
	center.AddClass("SlideIn");

	if (time == 5) {
		// show round name and game logo
		$("#game_logo").RemoveClass("Hidden");
		$("#round_name").RemoveClass("Hidden");
	}else if (time == 3){
		// ready
		imagePanel.SetImage("s2r://panorama/images/custom_game/ui/image_ready.png")
		imagePanel.RemoveClass("Hidden");
		$("#game_logo").AddClass("Hidden");
		$("#round_name").AddClass("Hidden");
	}else if (time == 2) {
		// set
		imagePanel.SetImage("s2r://panorama/images/custom_game/ui/image_set.png")
	}else if (time == 1) {
		// GO!
		imagePanel.SetImage("s2r://panorama/images/custom_game/ui/image_go.png")
		$("#count_down_timer").RemoveClass("Hidden");
	}
	
	center.AddClass("SlideIn");
	$.Schedule(0.9, function(){
		center.RemoveClass("SlideIn")
	});
}

function OnTimer(args){
	var time = args.value
	
	var mins = Math.floor(time / 60);
	var secs = Math.floor(time - mins * 60);
	var mins1 = Math.floor(mins / 10);
	var mins2 = mins - mins1 * 10;
	var secs1 = Math.floor(secs / 10);
	var secs2 = secs - secs1 * 10;
	
	if(mins <= 0) {
		$("#count_down_timer").AddClass("SecondsOnly");
	}else{
		$("#count_down_timer").RemoveClass("SecondsOnly");
	}

	$("#count_down_mins_1").style.backgroundPosition = -64 * mins1 + "px";
	$("#count_down_mins_2").style.backgroundPosition = -64 * mins2 + "px";
	$("#count_down_secs_1").style.backgroundPosition = -64 * secs1 + "px";
	$("#count_down_secs_2").style.backgroundPosition = -64 * secs2 + "px";
}

function SetRoundName(args) {
	var name = args.name;
	$("#round_name").text = $.Localize(name);
}

(function(){
	GameEvents.Subscribe("pre_round_countdown", OnPreRoundCountDown);
	GameEvents.Subscribe("round_timer", OnTimer);
	GameEvents.Subscribe("set_round_name", SetRoundName);
})();