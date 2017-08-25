function submit(url, props, onSuccess, onError) {
  fetch(url, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props)
  })
  .then(function(response) {
    if (!onSuccess) return;
    var responseContent;
    if (!response.headers.get("content-type")) {
      responseContent = response.text();
    } else {
      responseContent = response.json();
    }
    if (!response.ok) {
      return onError ? onError(response.status, responseContent) : null;
    }
    responseContent.then(function(result) {
      onSuccess(result);
    });
  })
  .catch(function(error) {
    if (onError) {
      onError(-1, new Promise((resolve, reject) => {
        resolve(error);
      }));
    }
  });
}

module.exports = submit;
