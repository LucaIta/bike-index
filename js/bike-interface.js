var city;
var lastWeek;

$(document).ready(function(){
  $('#userInput').submit(function(event){
    event.preventDefault();
    lastweek = moment().subtract(7, 'days').format("X");
    console.log(lastweek);
    city = $('#cityInput').val();
    $('#cityInput').val("");

    $('.output').text("The city you have chosen is " + city + ". ");
    $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + city + '&proximity_square=100&stolen_after=' + lastweek, function(response) {
      console.log(response);
    });
  });
});
