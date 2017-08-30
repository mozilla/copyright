"use strict";

/**
 * This is the mapping for "country" to "campaign id"
 * to be used to resolve the locale to the right campaign.
 */
const COPYRIGHT_CAMPAIGN_IDS = {
  'EN': 1, // testing-only campaign id
  'GB': 2,
  'FR': 3,
  'DE': 4,
  'IT': 5,
  'PL': 6,
  'ES': 7
};

const DEFAULT_CAMPAIGN_ID = 1;

module.exports = function getCopyrightCampaignID(country) {
  let id = COPYRIGHT_CAMPAIGN_IDS[country];
  if (!id) return DEFAULT_CAMPAIGN_ID;
  return id;
};
