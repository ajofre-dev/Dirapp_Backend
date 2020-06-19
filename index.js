require('dotenv').config();

require('./mongoClient');

const api = require('./api');

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
api.listen(PORT, () => console.log(`Listening on ${PORT}`));
