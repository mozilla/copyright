import assign from 'object-assign';

const initialState = {
  email: ``,
  emailError: ``,
  signupCheckbox: false,
  signupCheckboxError: ``,
  privacyCheckbox: false,
  privacyCheckboxError: ``
};

const signupApp = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_EMAIL':
    return assign({}, state, {
      email: action.data,
      emailError: ""
    });
  case 'SET_EMAIL_ERROR':
    return assign({}, state, {
      emailError: action.data
    });
  case 'SET_SIGNUP_CHECKBOX':
    return assign({}, state, {
      signupCheckbox: action.data,
      signupCheckboxError: ""
    });
  case 'SET_SIGNUP_CHECKBOX_ERROR':
    return assign({}, state, {
      signupCheckboxError: action.data
    });
  case 'SET_PRIVACY_CHECKBOX':
    return assign({}, state, {
      privacyCheckbox: action.data,
      privacyCheckboxError: ""
    });
  case 'SET_PRIVACY_CHECKBOX_ERROR':
    return assign({}, state, {
      privacyCheckboxError: action.data
    });
  default:
    return state;
  }
};

export default signupApp;
