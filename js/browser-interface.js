var city;
var user_time;
var unixUser_time;

$(document).ready(function(){
  $('#userInput').submit(function(event){
    event.preventDefault();
    city = $('#cityInput').val();
    $('#cityInput').val("");
    user_time = $('#user_time').val();
    unixUser_time = moment(user_time).format("X");

    $('.output').text("Here's a list of all bikes reported stolen in " + city + " since " + user_time + ":");
    $('.loadingImage').show();
    $('.bikeList').empty();
    getResponseAndDisplay(city, unixUser_time);
  });
});
