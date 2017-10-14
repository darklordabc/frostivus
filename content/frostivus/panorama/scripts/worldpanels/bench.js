function BenchCheck()
{
  var wp = $.GetContextPanel().WorldPanel
  var data = $.GetContextPanel().Data

  if (wp && data) {
    var layout = data.layout;
    var hidden = data.hidden;

    if (hidden) {
      $.GetContextPanel().SetHasClass("Hide", true);
    } else {
      $.GetContextPanel().SetHasClass("Hide", false);
      
      if (!$.GetContextPanel().InitiatedLayout || layout != $.GetContextPanel().Layout) {
        $.GetContextPanel().Layout = layout;

        for (var i = 1; i < 4; i++) {
          $("#Slot"+i).SetHasClass("Collapse", false);
        }

        for (var i = layout+1; i <= 4; i++) {
          $("#Slot"+i).SetHasClass("Collapse", true)
        }

        $("#Slot1").SetHasClass("Single", layout == 1);
        $("#Row1").SetHasClass("Centered", layout == 1);

        $.GetContextPanel().InitiatedLayout = true;
      } else {
        for (var i = 0; i < layout; i++) {
          var id = i+1;
          if (data.items[id]) {
            $("#Slot"+id).Children()[0].itemname = data.items[id];
            $("#Slot"+id).Children()[0].SetHasClass("Hide", false);
          } else {
            $("#Slot"+id).Children()[0].SetHasClass("Hide", true);
          }
        }
      }

      function clearProgress() {
        $("#Outline1").SetHasClass("OutlineYellow", false);

        $("#Outline1").style.clip = "radial(50% 50%, 0deg, 0deg);";
        $("#Outline1").style.transitionDuration = 0 + "s;";
        $("#Outline1").style.clip = "radial(50% 50%, 0deg, 0deg);";

        data.duration = undefined;

        try {
          $.CancelScheduled($.GetContextPanel().Schedule);
        } catch (e) {

        }

        $.GetContextPanel().InitiatedChanneling = false;
      }

      if (!$.GetContextPanel().InitiatedChanneling && data.duration) {
        $("#Outline1").SetHasClass("Hide", false);
        $("#Outline1").SetHasClass("OutlineYellow", true);

        $("#Outline1").style.clip = "radial(50% 50%, 0deg, 0deg);";
        $("#Outline1").style.transitionDuration = data.duration + "s;";
        $("#Outline1").style.clip = "radial(50% 50%, 0deg, 360deg);";

        $.GetContextPanel().Schedule = $.Schedule(data.duration, (function () {
          clearProgress()

          $("#Outline1").style.clip = "radial(50% 50%, 0deg, 360deg);";
        }));

        $.GetContextPanel().InitiatedChanneling = true;
      } else if ($.GetContextPanel().InitiatedChanneling && !data.duration) {
        clearProgress()
      }
    }
  }

  $.Schedule(1/30, BenchCheck);
}

(function()
{ 
  BenchCheck();

})();