const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/user', require('./routes/user/auth'))

const PORT = config.get('port')

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`App is started on port ${PORT}`));
  } catch (error) {
    console.log('error'+error);
    process.exit(1);
  }
}

start();