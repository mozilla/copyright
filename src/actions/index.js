export function setPrivacyPolicy(data) {
  return { type: 'SET_PRIVACY_POLICY', data };
}

export function setPrivacyPolicyError(data) {
  return { type: 'SET_PRIVACY_POLICY_ERROR', data };
}

export function setEmail(data) {
  return { type: 'SET_EMAIL', data };
}

export function setEmailError(data) {
  return { type: 'SET_EMAIL_ERROR', data };
}
