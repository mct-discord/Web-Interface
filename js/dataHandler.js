const handleData = function(url, callback, method = 'GET', body = null) {
	fetch(url, {
		method: method,
		body: body,
		headers: { 'content-type': 'application/json' }
	})
		.then(function(response) {
			if (!response.ok) {
				if (response.json()) {
					console.info('Er is een response met een error teruggekomen van de server');
					return response.json();
				} else {
					throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
				}
			} else {
				console.info('Er is een response teruggekomen van de server');
				return response.json();
			}
		})
		.then(function(jsonObject) {
			console.info('json object is aangemaakt');
			console.info('verwerken data');
			callback(jsonObject);
		})
		.catch(function(error) {
			console.error(`fout bij verwerken json ${error}`);
		});
};
const sendData = function(url, method = 'GET', body = null) {
	fetch(url, {
		method: method,
		body: body,
		headers: { 'content-type': 'application/json' }
	})
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
			} else {
				console.info('Er is een response teruggekomen van de server');
				return response.json();
			}
		})
		.then(function(jsonObject) {})
		.catch(function(error) {
			console.error(`fout bij verwerken json ${error}`);
		});
};
const simpleGet = function(url, callback) {
	fetch(url)
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
			} else {
				console.info('Er is een response teruggekomen van de server');
				return response.json();
			}
		})
		.then(function(jsonObject) {
			console.info('json object is aangemaakt');
			console.info('verwerken data');
			callback(jsonObject);
		})
		.catch(function(error) {
			console.error(`fout bij verwerken json ${error}`);
		});
};
