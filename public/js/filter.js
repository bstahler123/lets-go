
var displayCity;

$(".feature1").on("click", function() {
    $(".feature-picked").html("Feature picked" + "<br>" + "Find random resturant");
    $(".feature-picked").css("background-color", "rgb(13, 179, 220)");
});

$(".feature2").on("click", function() {
    $(".feature-picked").html("feature picked" + "<br>" + "Choose resturant by city");
    $(".feature-picked").css("background-color", "rgb(13, 179, 220)");
});

$(".feature3").on("click", function() {
    $(".feature-picked").html("feature picked" + "<br>" + "Explore resturants near me");
    $(".feature-picked").css("background-color", "rgb(13, 179, 220)");
});
$(".radius").click(function() {
    $(".distance-picked").html("Distance" + "<br>" + $(this).text());
    $(".distance-picked").css("background-color", "rgb(13, 179, 220)");
});

$(".highPrice").on("click", function() {

    $(".max-price-picked").html("Max price" + "<br>" + $(this).text());
    $(".max-price-picked").css("background-color", "rgb(13, 179, 220)");
});
$(".lowPrice").on("click", function() {
    $(".min-price-picked").html("Min Price" + "<br>" + $(this).text());
    $(".min-price-picked").css("background-color", "rgb(13, 179, 220)");

});
$(".city_input").on("click",function(){
	displayCity = $("#city_name").val().trim();
	$(".distance-picked").html("Location" + "<br>" + displayCity);
	console.log(displayCity);
	$(".distance-picked").css("background-color", "rgb(13, 179, 220)");
});