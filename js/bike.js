var bikes = [];
var displayer = require('./browser-interface.js').displayer;
var test = "Test";


Bike = function(name, serial, thumb, year, date_stolen) {
  this.name = name;
  this.serial = serial;

  if (thumb === null) {
    this.thumb = "img/bike.png";
  } else {
    this.thumb = thumb;
  }

  if (year === null) {
    this.year = "Not Available";
  } else {
    this.year = year;
  }

  this.date_stolen = date_stolen;
};

exports.getResponseAndDisplay = function(city, date_stolen) {
  bikes = [];
  $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?per_page=100&proximity=' + city + '&proximity_square=100&stolen_after=' + date_stolen).then(function(response) {

    $('.loadingImage').hide();
    response.bikes.forEach(function(bike) {
      var newBike = new Bike(bike.frame_model, bike.serial, bike.thumb, bike.year, bike.date_stolen);
      bikes.push(newBike);
    });

    displayer(bikes);

  });
};
