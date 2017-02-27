import assign from 'object-assign';

const initialState = {
  email: ``,
  emailError: ``,
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
