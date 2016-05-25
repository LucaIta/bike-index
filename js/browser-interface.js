var city;
var lastWeek;
var bikes = [];

$(document).ready(function(){
  $('#userInput').submit(function(event){
    event.preventDefault();
    lastweek = moment().subtract(7, 'days').format("X");
    city = $('#cityInput').val();
    $('#cityInput').val("");

    $('.output').text("The city you have chosen is " + city + ". ");
    $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + city + '&proximity_square=100&stolen_after=' + lastweek).then(function(response) {
      console.log(response);

      response.bikes.forEach(function(bike) {
        var newBike = new Bike(bike.frame_model);
        bikes.push(newBike);
      });

      bikes.forEach(function(bike) {
        $('.bikeList').append('<li>' + bike.name + '</li>');
        console.log(bike.name);
      });

      $('.output').show();

    });

  });
});
