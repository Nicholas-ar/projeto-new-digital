import app from './app';

require('dotenv').config();

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

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
