const request = require('request-promise-native');

const returnedJSON = {
  "status": "success",
  "data": {
    "ipv4": "8.8.8.8",
    "continent_name": "North America",
    "country_name": "United States",
    "subdivision_1_name": "California",
    "subdivision_2_name": null,
    "city_name": "Mountain View",
    "latitude": "37.38600",
    "longitude": "-122.08380"
  }
};

const fetchMyIP = function() {
  return request('https://api64.ipify.org?format=json');
};

const fetchCoordsByIP = function() {
  const data = {
    "latitude" : returnedJSON.data.latitude,
    "longitude" : returnedJSON.data.longitude
  };
  return data;
};

const fetchISSFlyOverTimes = function(coords) {
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };