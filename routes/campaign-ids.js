"use strict";

const DEFAULT_LOCALE = 'GB';

const LOCATION_ID = process.env.LOCATION_ID;

// Brussels
var COPYRIGHT_CAMPAIGN_IDS = {
  'GB': 2, // UK English
  'FR': 3, // French
  'DE': 4, // German
  'IT': 5, // Italian
  'PL': 6, // Polish
  'ES': 7  // Spanish
};

// Strasbourg
if (LOCATION_ID === '2') {
  COPYRIGHT_CAMPAIGN_IDS = {
    'GB': 13, // UK English
    'FR': 12, // French
    'DE': 11, // German
    'IT': 10, // Italian
    'PL': 9, // Polish
    'ES': 8  // Spanish
  };
}

module.exports = function getCopyrightCampaignID(locale) {
  locale = locale || DEFAULT_LOCALE;
  if (locale==='en-US') locale = 'GB';
  locale = locale.toUpperCase();
  let cid = COPYRIGHT_CAMPAIGN_IDS[locale];

  // allow US/Canada calls, but ONLY on staging.
  if(!cid && process.env.NODE_ENV !== 'production') {
    cid = 1;
  }

  return cid;
};
