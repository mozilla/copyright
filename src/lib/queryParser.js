function isNumber(item) {
  return !isNaN(parseInt(item, 10));
}

module.exports = function(queryString, locale) {
  queryString = queryString || {};
  var test = queryString.test;

  if (test && toString.call(test) === "[object Array]") {
    test = test.join(" ");
  }

  return {
    values: {
      test: test,
      email: queryString.email || ""
    }
  };
};
