const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const router = require('./routes/route.js');

const app = express();
// app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.xio6k.mongodb.net/<dbname>?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true,});

app.use(router);

//app.get('/', (req, res) => res.sendFile('index.html', {root:'.'}));

app.listen(3000, () => console.log('Server is running at port 3000...'));
