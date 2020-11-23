import app from './app';
import {MongoHelper} from '../helpers/mongoHelper'

// TODO: Pass these env variables to a single file that will require the dotenv.config
require('dotenv').config();


const PORT = process.env.PORT || 3333;

if (!process.env.AWS_TOKEN) {
  throw new Error('TOKEN environment variable must be defined');
}
if (!process.env.AWS_SECRET_KEY) {
  throw new Error('AMAZON_SECRET_KEY environment variable must be defined');
}
if (!process.env.AWS_BUCKET) {
  throw new Error('BUCKET environment variable must be defined');
}
if (!process.env.AWS_REGION) {
  throw new Error('REGION environment variable must be defined');
}
if (!process.env.AWS_KEY) {
  throw new Error('KEY environment variable must be defined');
}

MongoHelper.connect(process.env.MONGOURL || 'mongodb://localhost:27017/mongo')
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch(console.error);
