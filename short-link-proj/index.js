const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./src/routes/admin')
const mongoose = require('mongoose');
const httpsRedirect = require('express-https-redirect');

const MONGODB_URI =
  'mongodb+srv://admin:notebook777@cluster0-rmiyh.mongodb.net/short-link?retryWrites=true&w=majority';


app.use('/',
  cors({
    origin: 'http://localhost:3000',
    credentials: false,
  })
);

//

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(route);


mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })//
  .then(result => {
    console.log('connected');
    app.listen(3030);
  })
  .catch(err => {
    console.log(err);
  });