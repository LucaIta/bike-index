var bikes = [];
var test = "Test";


Bike = function(name, serial, thumb, year, date_stolen, stolen_location
) {
  this.name = name;
  this.serial = serial;
  this.stolen_location = stolen_location;

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


exports.getResponseAndDisplay = function(city, date_stolen, displayer) {
  bikes = [];
  $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?per_page=100&proximity=' + city + '&proximity_square=100&stolen_after=' + date_stolen).then(function(response) {

    $('.loadingImage').hide();
    console.log(response);
    response.bikes.forEach(function(bike) {
      var newBike = new Bike(bike.frame_model, bike.serial, bike.thumb, bike.year, bike.date_stolen, bike.stolen_location);
      bikes.push(newBike);
    });

    displayer(bikes);

  });
};

exports.getCity = function(address) {
  arrayOfWOrds = address.split(",");
  city = arrayOfWOrds[0];
  return city;
}
