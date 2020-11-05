const { nextISSTimesForMyLocation } = require('./iss_promised');

const printDetails = function(details) {
  for (let item of details) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(item.risetime);
    const duration = item.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(passTimes => printDetails(passTimes))
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });