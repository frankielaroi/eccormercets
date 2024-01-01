const axios = require('axios');

const apiKey = 'bbbf209827d7426aaf37eb2fc208a2a4';
const apiSecret = 'your_api_secret';
const apiUrl = 'https://sandbox.momodeveloper.mtn.com';

const headers = {
  'Ocp-Apim-Subscription-Key': apiKey,
  'Authorization': `Bearer ${apiSecret}`,
  'Content-Type': 'application/json',
};

const requestData = {
  // Your request data goes here
};

axios.post(`${apiUrl}/v1_0/requesttopay`, requestData, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
