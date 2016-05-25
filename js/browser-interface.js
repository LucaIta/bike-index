var city;
var lastWeek;
var bikes = [];
var user_time;
var unixUser_time;

$(document).ready(function(){
  $('#userInput').submit(function(event){
    event.preventDefault();
    lastWeek = moment().subtract(7, 'days').format("X");
    city = $('#cityInput').val();
    $('#cityInput').val("");
    user_time = $('#user_time').val();
    unixUser_time = moment(user_time).format("X");


    $('.output').text("Here's a list of all bikes reported stolen in " + city + " since " + user_time + ":");
    bikes = [];
    $('.loadingImage').show();
    $('.bikeList').empty();
    $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?per_page=100&proximity=' + city + '&proximity_square=100&stolen_after=' + unixUser_time).then(function(response) {
      console.log(response);
      $('.loadingImage').hide();

      response.bikes.forEach(function(bike) {
        var newBike = new Bike(bike.frame_model, bike.serial, bike.thumb, bike.year, bike.date_stolen);
        bikes.push(newBike);
      });

      bikes.forEach(function(bike) {
          $('.bikeList').append("<div class='col-md-4 bikeBox'>" + "Name: " + bike.name +
                                "<br>" + "Serial#: " + bike.serial +
                                "<br> <img src=" + bike.thumb + ">"  +
                                "<br>" + "Year: " + bike.year +
                                "<br>" + "Stolen Date: " + moment.unix(bike.date_stolen).format("dddd, MMMM Do YYYY, h:mm a") +
                                "</div>");



      });

    });

  });
});
