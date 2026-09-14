require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://rabbi-khan.vercel.app/'
  );

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
