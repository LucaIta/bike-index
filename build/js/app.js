(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var city;
var user_time;
var unixUser_time;
var bike = require('../js/bike.js');

var displayer = function(bikes) {
  console.log(bikes.length);
  if (bikes.length > 0) {
    if (bikes[0].stolen_location.indexOf(bike.getCity(city)) > -1) {
      $('.output').text("Here's a list of all bikes reported stolen in " + city + " since " + user_time + ":");

      bikes.forEach(function(bike) {
        $('.bikeList').append("<div class='col-md-4 bikeBox'>" + "Name: " + bike.name +
        "<br>" + "Serial#: " + bike.serial +
        "<br> <img src=" + bike.thumb + ">"  +
        "<br>" + "Year: " + bike.year +
        "<br>" + "Stolen Date: " + moment.unix(bike.date_stolen).format("dddd, MMMM Do YYYY, h:mm a") +
        "</div>");
      });
    } else {
      $('.output').text("No bikes found. Try another search above!");
    }

  } else {
    $('.output').text("No bikes found. Try another search above!");
  }

};

$(document).ready(function(){
  $('#userInput').submit(function(event){
    event.preventDefault();
    city = $('#cityInput').val();
    $('#cityInput').val("");
    user_time = $('#user_time').val();
    unixUser_time = moment(user_time).format("X");

    $('.loadingImage').show();
    $('.bikeList').empty();
    $('.output').empty();
    bike.getResponseAndDisplay(city, unixUser_time, displayer);
  });
});

},{"../js/bike.js":1}]},{},[2]);
