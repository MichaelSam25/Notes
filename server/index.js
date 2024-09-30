const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Address = require('./models/address');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://michaelsamymuthu:KPWLtlCTUDYb5oq3@cluster0.vdtoa3x.mongodb.net/sample', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


app.post('/register', async (req, res) => {
    const { name, address } = req.body;
    console.log(name, address);
  
    try {
      const newUser = new User({ name });
      const savedUser = await newUser.save();
  
      const newAddress = new Address({ address, userId: savedUser._id });
      await newAddress.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error saving user and address:', error); 
      res.status(500).json({ success: false, message: 'Error saving data', error });
    }
  });


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
