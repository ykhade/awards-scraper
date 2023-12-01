/**
 * This dictionary maps each airline to a boolean value.
 * The boolean represents whether scraping is enabled for that particular airline.
 * 'true' indicates scraping is allowed, while 'false' means it's not.
 * This allows us to easily enable or disable scraping for specific airlines by editing the dictionary.
 */

const airlines = {
    'delta': false,
    'united': true,
    'cathayPacific': false,
    'singaporeAirlines': false,
    'ANA': false,
    'virginAtlantic': false,
    'airFrance': false
};


module.exports = { airlines };