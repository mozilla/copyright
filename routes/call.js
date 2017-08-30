"use strict";

var fetch = require('node-fetch');
var FormData = require('form-data');
var parseNumber = require('libphonenumber-js').parse;

const CALL_POWER_URL = process.env.CALL_POWER_URL;
const getCopyrightCampaign = require('./campaign-ids');

/**
 * Resolve a locale code back to a country code. For
 * two-letter locales, these are already the country
 * code; for two-dash-two, the last two lettters are
 * the country code.
 */
function getCorrespondingCountry(locale) {
  const matched = locale.match(/^(\w\w)(-(\w\w))?$/)
  if (!matched) return undefined;
  const country = (matched[3] ? matched[3] : matched[1]);
  if (!country) return undefined;
  return country.toUpperCase();
}

/**
 * Check whether the provided number is valid for
 * the country it supposedly belongs to.
 */
function getParsedNumber(number, country) {
  if (number.indexOf('+')>-1) {
    return parseNumber(number);
  }
  return parseNumber(number, country);
}


module.exports = function handleCallRequest(request, reply) {
  var callInformation = request.payload;
  const number = callInformation.number.replace(/[^0-9+]/g,'');
  const locale = callInformation.locale || '';
  const country = getCorrespondingCountry(locale);
  const parsed = getParsedNumber(number, country);

  // Verify that the number we've been given is a proper number.
  if (!parsed.phone) {
    return reply({
      'call_placed': false,
      error: 'Phone number does not match the format required.'
    }).code(409);
  }

  // Set up a call through call-power
  const cid = getCopyrightCampaign(parsed.country);
  var form = new FormData();
  form.append('userPhone', parsed.phone);
  form.append('userCountry', parsed.country);
  form.append('campaignId', cid);

  fetch(CALL_POWER_URL, { method: 'POST', body: form })
  .then(res => res.json())
  .then(json => {
    if (json.error) {
      throw new Error(json.error);
    }
    reply({ 'call_placed': true }).code(200);
  })
  .catch(error => {
    console.error(`error for ${number}/${locale}/cid:${cid}(${parsed.country}):`, error);
    reply({ 'call_placed': false, error: error }).code(500);
  });
};
