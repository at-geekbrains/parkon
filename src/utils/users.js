const fetch = require("node-fetch");
const count = 10;
const url = 'https://jsonplaceholder.typicode.com/users/';

function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

function getUser(url, index) {
    url = url + (index + 1).toString();
    fetch(url)
        .then(status)
        .then(json)
        .then(function(data) {
            users.push(data);
        }).catch(function(error) {
            console.log('Request failed', error);
        });
}

const users = [...Array(count)].map((value,index) => getUser(url,index)).filter(Boolean);

module.exports = users;