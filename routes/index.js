var signup = require('./signup');
var boom = require('boom');
var fetch = require('node-fetch');
var FormData = require('form-data');

const CALL_POWER_URL = process.env.CALL_POWER_URL;
const COPYRIGHT_CAMPAIGN_ID = process.env.COPYRIGHT_CAMPAIGN_ID;

var routes = {
  'signup': function(request, reply) {
    var transaction = request.payload;
    const signup_service = Date.now();

    signup(transaction, function(err, payload) {
      if (err) {
        request.log(['error', 'signup'], {
          request_id: request.headers['x-request-id'],
          service: Date.now() - signup_service,
          code: err.code,
          type: err.type,
          param: err.param
        });

        return reply(boom.wrap(err, 500, 'Unable to complete Basket signup'));
      }

      request.log(['signup'], {
        request_id: request.headers['x-request-id'],
        service: Date.now() - signup_service
      });

      reply(payload).code(201);
    });
  },

  'call': function(request, reply) {
    // hack hack hack hack... hack
    var __getCorrespondingCountry = () => "US";
    var __isValidNumber = (number, country) => true;

    var callInformation = request.payload;
    const number = '+' + callInformation.number.replace(/\D/g,'');
    const country = __getCorrespondingCountry(callInformation.locale);
    console.log(number, country);

    // Verify that the number we've been given is a proper number.
    if (!__isValidNumber(number, country)) {
      console.error("bad number");
      return reply({
        'call_placed': false,
        error: 'Phone number does not match locale format'
      }).code(409);
    }

    // Set up a call through call-power
    var form = new FormData();
    form.append('userPhone', number);
    form.append('userCountry', country);
    form.append('campaignId', COPYRIGHT_CAMPAIGN_ID);

    fetch(CALL_POWER_URL, { method: 'POST', body: form })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if (json.error) {
        throw new Error(json.error);
      }
      reply({ 'call_placed': true }).code(200);
    })
    .catch(error => {
      console.error(error);
      reply({ 'call_placed': false, error: error }).code(409);
    });
  }
};

module.exports = routes;
