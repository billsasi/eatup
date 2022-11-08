require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.get('/', (req, res) => {
  const key = process.env.YELP;
  const response = fetch(
    `https://api.yelp.com/v3/businesses/search?` +
      new URLSearchParams({
        location: 'Fremont, CA',
      }),
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    }
  )
    .then((res) => res.json())
    .then((json) => res.json(json));
  res.header('Access-Control-Allow-Origin', '*');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
