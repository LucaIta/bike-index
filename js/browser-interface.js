var city;
var lastWeek;
var bikes = [];

$(document).ready(function(){
  $('#userInput').submit(function(event){
    event.preventDefault();
    lastweek = moment().subtract(7, 'days').format("X");
    city = $('#cityInput').val();
    $('#cityInput').val("");

    $('.output').text("Here's a list of all bikes reported stolen in " + city + " during the past week:");
    bikes = [];
    $('.loadingImage').show();
    $('.bikeList').empty();
    $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + city + '&proximity_square=100&stolen_after=' + lastweek).then(function(response) {
      console.log(response);
      $('.loadingImage').hide();

      response.bikes.forEach(function(bike) {
        var newBike = new Bike(bike.frame_model, bike.serial, bike.thumb, bike.year, bike.date_stolen);
        bikes.push(newBike);
      });

      bikes.forEach(function(bike) {
        if (bike.thumb) {
          $('.bikeList').append("<div class='col-md-4 bikeBox'>" + "Name: " + bike.name +
                                "<br>" + "Serial#: " + bike.serial +
                                "<br> <img src=" + bike.thumb + ">"  +
                                "<br>" + "Year: " + bike.year +
                                "<br>" + "Stolen Date: " + bike.date_stolen +
                                "</div>");
        } else {
          $('.bikeList').append("<div class='col-md-4 bikeBox'>" + "Name: " + bike.name +
                                "<br>" + "Serial #: " + bike.serial +
                                "<br> <img src='img/bike.png'>" +
                                "<br>" + "Year: " + bike.year +
                                "<br>" + "Stolen Date: " + bike.date_stolen +
                                "</div>");
        }


      });

    });

  });
});
