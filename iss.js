const request = require('request');
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
const fetchMyIp = function(callback) {
  request.get(`https://api64.ipify.org?format=json'`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, body);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const data = {
    "latitude" : returnedJSON.data.latitude,
    "longitude" : returnedJSON.data.longitude
  };
  callback(null, data);
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request.get(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords,(error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
