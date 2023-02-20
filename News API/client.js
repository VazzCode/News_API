// const request = require('request');

// // Making a GET request to the server
// request.get('http://localhost:3000/data', (error, response) => {
// if (!error && response.statusCode == 200) {
// console.log('hi'+response.body);
// } else {
// console.error(error);
// }
// });

const axios = require('axios');

var config = {
    method: 'get',
    url: 'http://localhost:3000/data'};

axios(config).then((res)=>{
    console.log(res.data.message);
}).catch(err => console.log(err))
