const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas', error);
});

const referralSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  friendName: String,
  friendEmail: String,
});

const Referral = mongoose.model('Referral', referralSchema);

app.post('/refer', async (req, res) => {
  const { userName, userEmail, friendName, friendEmail } = req.body;
  const referral = new Referral({ userName, userEmail, friendName, friendEmail });
  try {
    await referral.save();
    res.status(201).send({ message: 'Referral saved successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to save referral' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
