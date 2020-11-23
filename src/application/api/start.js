import app from './app';

require('dotenv').config();

import { MongoHelper } from '../helpers/mongoHelper';

const PORT = process.env.PORT || 3333;

if (!process.env.TOKEN) {
  throw new Error('TOKEN environment variable must be defined');
}
if (!process.env.AMAZON_SECRET_KEY) {
  throw new Error('AMAZON_SECRET_KEY environment variable must be defined');
}
if (!process.env.BUCKET) {
  throw new Error('BUCKET environment variable must be defined');
}
if (!process.env.REGION) {
  throw new Error('REGION environment variable must be defined');
}
if (!process.env.KEY) {
  throw new Error('KEY environment variable must be defined');
}

MongoHelper.connect(process.env.MONGOURL || 'mongodb://localhost:27017/mongo')
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch(console.error);
