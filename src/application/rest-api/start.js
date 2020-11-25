import app from './app';
import { MongoHelper } from '../helpers/mongo-helper';
import env from '../config/environment';

require('dotenv').config();

if (!env.AWS_ACCESS_KEY_ID) {
  throw new Error('AWS_ACCESS_KEY_ID environment variable must be defined');
}
if (!env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS_SECRET_ACCESS_KEY environment variable must be defined');
}
if (!env.AWS_BUCKET) {
  throw new Error('AWS_BUCKET environment variable must be defined');
}
if (!env.AWS_REGION) {
  throw new Error('AWS_REGION environment variable must be defined');
}

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log(`server listening on port ${process.env.PORT}`);
    });
  })
  .catch(console.error);
