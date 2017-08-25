function submit(url, props, success, error) {
  fetch(url, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props)
  }).then(function(response) {
    if (!success) return;
    var responseContent;
    if (!response.headers.get("content-type")) {
      responseContent = response.text();
    } else {
      responseContent = response.json();
    }
    if (!response.ok) {
      return error ? error(response.status, responseContent) : null;
    }
    responseContent.then(function(result) {
      success(result);
    });
  });
}

module.exports = submit;
