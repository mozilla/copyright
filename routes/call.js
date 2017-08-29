var fetch = require('node-fetch');
var FormData = require('form-data');
var parseNumber = require('libphonenumber-js').parse;

const CALL_POWER_URL = process.env.CALL_POWER_URL;
const COPYRIGHT_CAMPAIGN_ID = process.env.COPYRIGHT_CAMPAIGN_ID;

/**
 * Resolve a locale code back to a country code. For
 * two-letter locales, these are already the country
 * code; for two-dash-two, the last two lettters are
 * the country code.
 */
function getCorrespondingCountry(locale) {
  matched = locale.match(/^(\w\w)(-(\w\w))?$/)
  if (!matched) return undefined;
  const country = (matched[3] ? matched[3] : matched[1]);
  if (!country) return undefined;
  return country.toUpperCase();
}

/**
 * Check whether the provided number is valid for
 * the country it supposedly belongs to.
 */
function isValidNumber(number, country) {
  return !!parseNumber(number, country).phone;
}

module.exports = function(request, reply) {
  var callInformation = request.payload;
  const number = '+' + callInformation.number.replace(/\D/g,'');
  const country = getCorrespondingCountry(callInformation.locale);

  // Verify that the number we've been given is a proper number.
  if (!isValidNumber(number, country)) {
    return reply({
      'call_placed': false,
      error: `Phone number does not match the format required in ${country}`
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
    if (json.error) {
      throw new Error(json.error);
    }
    reply({ 'call_placed': true }).code(200);
  })
  .catch(error => {
    reply({ 'call_placed': false, error: error }).code(409);
  });
};
