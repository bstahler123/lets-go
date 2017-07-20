
var displayCity;

$(".feature1").on("click", function() {
    $(".feature-picked").html("Feature picked" + "<br>" + "Find random resturant");
});

$(".feature2").on("click", function() {
    $(".feature-picked").html("feature picked" + "<br>" + "Choose resturant by city");
});

$(".feature3").on("click", function() {
    $(".feature-picked").html("feature picked" + "<br>" + "Explore resturants near me");
});
$(".radius").click(function() {
    $(".distance-picked").html("Distance" + "<br>" + $(this).text());
});

$(".highPrice").on("click", function() {

    $(".max-price-picked").html("Max price" + "<br>" + $(this).text());
});
$(".lowPrice").on("click", function() {
    $(".min-price-picked").html("Min Price" + "<br>" + $(this).text());

});
$(".city_input").on("click",function(){
	displayCity = $("#city_name").val().trim();
	$(".distance-picked").html("Location" + "<br>" + displayCity);
	console.log(displayCity);
});