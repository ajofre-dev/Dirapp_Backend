/* eslint-disable no-console */
const mongoose = require('mongoose');
// process.env.MONGO_URI    VARIABLE DE ENTORNO => Así accedemos a una variable de entorno
const { MONGO_URI } = require('../config');

// console.log(MONGO_URI);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch(() => console.log('Error connecting to database...'));
