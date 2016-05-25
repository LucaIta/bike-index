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
