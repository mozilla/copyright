module.exports = function(queryString) {
  queryString = queryString || {};
  var test = queryString.test;

  if (test && toString.call(test) === "[object Array]") {
    test = test.join(" ");
  }

  return {
    initialState: {
      firstName: queryString.firstName || "",
      lastName: queryString.lastName || "",
      email: queryString.email || "",
      country: queryString.country || ""
    },
    values: {
      test: test
    }
  };
};
