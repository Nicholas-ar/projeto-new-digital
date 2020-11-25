import app from './app';
import { MongoHelper } from '../helpers/mongo-helper';
import env from '../config/environment';

require('dotenv').config();

// if (!env.AWS_TOKEN) {
//   throw new Error('TOKEN environment variable must be defined');
// }
// if (!env.AWS_SECRET_KEY) {
//   throw new Error('AMAZON_SECRET_KEY environment variable must be defined');
// }
// if (!env.AWS_BUCKET) {
//   throw new Error('BUCKET environment variable must be defined');
// }
// if (!env.AWS_REGION) {
//   throw new Error('REGION environment variable must be defined');
// }
console.log(process.env.MONGO_URL)
console.log(process.env.AWS_REGION)
console.log(process.env.AWS_REGION)
console.log(process.env.AWS_ACCESS_KEY_ID)
console.log(process.env.AWS_SECRET_ACCESS_KEY)

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log(`server listening on port ${process.env.PORT}`);
    });
  })
  .catch(console.error);
