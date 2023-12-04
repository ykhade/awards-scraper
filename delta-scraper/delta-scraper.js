const axios = require("axios");
const {deltaGuestRequestBody} = require("./util");
const {inspect} = require("util");
class DeltaScraper {
  constructor(departureTime, destinationAirportCode, originAirportCode) {
    this.theGuestBody = deltaGuestRequestBody(departureTime, destinationAirportCode, originAirportCode);
  }
  async makeRequest() {
    const url = 'https://offer-api-prd.delta.com/prd/rm-offer-gql';
    const headers = {
      transactionId: '8abe64de-df0e-4f36-a57a-6a6c0eeba377_1701236327766',
      channelId: 'DCOM',
      applicationId: 'DC',
      'User-Agent': 'Mozilla/5.0',
      'Authorization': `GUEST`,
    };

    try {
      const response = await axios.post(url, this.theGuestBody, { headers });
      console.log(inspect(response.data, { depth: null, colors: true }));
      return response.data;
    } catch (error) {
      console.error(`Error making request to ${url}: ${error}`);
    }
  }
}


module.exports = DeltaScraper;
