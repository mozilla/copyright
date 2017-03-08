import assign from 'object-assign';

const initialState = {
  email: ``,
  emailError: ``,
  signupCheckbox: false,
  signupCheckboxError: ``,
  privacyCheckbox: false,
  privacyCheckboxError: ``,
  firstName: ``,
  lastName: ``,
  country: ``
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
  case 'SET_FIRST_NAME':
    return assign({}, state, {
      firstName: action.data
    });
  case 'SET_LAST_NAME':
    return assign({}, state, {
      lastName: action.data
    });
  case 'SET_COUNTRY':
    return assign({}, state, {
      country: action.data
    });
  default:
    return state;
  }
};

export default signupApp;
