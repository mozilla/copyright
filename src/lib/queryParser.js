module.exports = function(queryString) {
  queryString = queryString || {};
  var test = queryString.test;

  if (test && toString.call(test) === "[object Array]") {
    test = test.join(" ");
  }

  return {
    initialState: {
      email: queryString.email || ""
    },
    values: {
      test: test
    }
  };
};
