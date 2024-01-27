const express = require('express');
const bodyParser = require('body-parser');
const braintree = require('braintree');

const app = express();
const port = 3001;

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: 'txgvrgzy3jv4bdts',
  publicKey: 'ys5pbfk9c549s899',
  privateKey: 'f9b8b12bf9a63fc7ea92742d897631ac',
});

app.use(bodyParser.json());

app.get('/api/braintree/token', (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) throw err;
    res.send({ clientToken: response.clientToken });
  });
});

app.post('/api/braintree/checkout', (req, res) => {
  const { nonce } = req.body;

  // Use the nonce to make a transaction on the server side
  gateway.transaction.sale(
    {
      amount: '10.00',
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});