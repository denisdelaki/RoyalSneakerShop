const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Endpoint to initiate STK push
app.post('/', async (req, res) => {
  try {
    const { mobileNumber, amount } = req.body;

    // Make request to Daraja API
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        mobileNumber,
        amount
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ybjhHWTlBY24zeEhQQVlmVllzNmtPSFRHY0JyZ1NNOVM4Q0Fod2pZTHBWWkhpR0ttOlJTQzhBWFRpQUphNktkb1dyRU1XNmtLc09ZOVlkOEJUaXk3SFpJbzRYZ0lvV2tDTGdGV1JWZUw5WUhpUWpJeEU' 
        }
      }
    );

    // Return response to client
    res.status(200).json(response.data);
    console.log(response)
  } catch (error) {
    console.error('Error initiating STK push:', error);
    res.status(500).send('Error initiating STK push');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
