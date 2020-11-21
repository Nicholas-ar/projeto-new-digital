import app from './app';
import { MongoHelper } from '../helpers/mongoHelper';

const PORT = process.env.PORT || 3333;

MongoHelper.connect(process.env.MONGOURL || 'mongodb://localhost:27017/mongo')
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch(console.error);
