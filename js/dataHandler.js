const handleData = function (
  url, msToken,
  callback,
  errorcallback = null,
  method = 'GET',
  body = null
) {
  fetch(url, {
    method: method,
    body: body,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${msToken}`,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        errorcallback();
      } else {
        return response.json();
      }
    })
    .then(function (jsonObject) {
      callback(jsonObject);
    })
    .catch(function (error) {});
};
const sendData = function (url, msToken, method = 'GET', body = null) {
  fetch(url, {
    method: method,
    body: body,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${msToken}`,
    },
  })
    .then(function (response) {
      if (!response.ok) {
      } else {
        return response.json();
      }
    })
    .then(function (jsonObject) {})
    .catch(function (error) {});
};
const simpleGet = function (url, callback) {
  fetch(url)
    .then(function (response) {
      if (!response.ok) {
      } else {
        return response.json();
      }
    })
    .then(function (jsonObject) {
      callback(jsonObject);
    })
    .catch(function (error) {});
};
