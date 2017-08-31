"use strict";

const DEFAULT_LOCALE = 'GB';

const COPYRIGHT_CAMPAIGN_IDS = {
  'GB': 2, // UK English
  'FR': 3, // French
  'DE': 4, // German
  'IT': 5, // Italian
  'PL': 6, // Polish
  'ES': 7  // Spanish
};

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
