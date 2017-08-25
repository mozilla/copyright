export function setEmail(data) {
  return { type: 'SET_EMAIL', data };
}

export function setEmailError(data) {
  return { type: 'SET_EMAIL_ERROR', data };
}

export function setSignupCheckbox(data) {
  return { type: 'SET_SIGNUP_CHECKBOX', data };
}

export function setSignupCheckboxError(data) {
  return { type: 'SET_SIGNUP_CHECKBOX_ERROR', data };
}

export function setPrivacyCheckbox(data) {
  return { type: 'SET_PRIVACY_CHECKBOX', data };
}

export function setPrivacyCheckboxError(data) {
  return { type: 'SET_PRIVACY_CHECKBOX_ERROR', data };
}
