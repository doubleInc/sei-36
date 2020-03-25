// Imports
const { path } = R;
const { fromEvent } = rxjs;

// Partial application
const temp = path(["main", "temp"]);
const condition = path(["weather", 0, "main"]);

const source = fromEvent($("#app .btn"), "click");

// stream
source.subscribe(e => {
  const unit =
    $("#app input[type='radio']:checked").val() === "option1"
      ? "metric"
      : "imperial";

  //resets+clear
  $("#temp")
    .css("top", "0vh")
    .css("opacity", "0");
  $("#cond")
    .attr("src", "")
    .css("bottom", "0vh")
    .css("opacity", "0");

  let wCondition = { code: "", bc: "" };

  e.preventDefault();
  const city = $("#city").val();

  $.ajax(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=d98e7b2d37fbd7b63a3ae50925548d3f`
  ).done(res => {
    $("#temp")
      .html(`<h1 class="font-weight-lighter">${temp(res)}°</h1>`)
      .animate(
        {
          top: "20vh",
          opacity: 1
        },
        1000
      );
    //get weather icon
    switch (condition(res)) {
      case "Clouds":
        wCondition.code = "hc";
        wCondition.bc = "#FF99CC";
        break;
      case "Clear":
        wCondition.code = "c";
        wCondition.bc = "#CCFFFF";
        break;
      case "Snow":
        wCondition.code = "sn";
        wCondition.bc = "#6699FF";
        break;
      case "Rain":
        wCondition.code = "lr";
        wCondition.bc = "#CCFF99";
        break;
      case "Drizzle":
        wCondition.code = "s";
        wCondition.bc = "#FF99CC";
        break;
      case "Thunderstorm":
        wCondition.code = "t";
        wCondition.bc = "#FF99CC";
        break;
      default:
        wCondition.code = "lc";
        wCondition.bc = "#FF99CC";
    }

    $("#cond")
      .attr(
        "src",
        `https://www.metaweather.com/static/img/weather/${wCondition.code}.svg`
      )
      .animate(
        {
          bottom: "40vh",
          opacity: 1
        },
        1000
      );

    $(".right-tab").css({
      "background-color": wCondition.bc
    });
  });
});
