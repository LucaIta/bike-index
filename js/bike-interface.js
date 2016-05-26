var bikes = [];

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

getResponseAndDisplay = function(city, date_stolen) {
  bikes = [];
  $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?per_page=100&proximity=' + city + '&proximity_square=100&stolen_after=' + unixUser_time).then(function(response) {

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


};
