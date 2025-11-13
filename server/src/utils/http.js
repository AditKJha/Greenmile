const axios = require('axios');
const http = axios.create({ timeout: 15000 });
module.exports = { http };
