import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { employeeRouter } from './routes/employee';
const app = express();

require('dotenv').config();

//We're not providing any PORT in the env variables, so it's going to use port 5000 by default
const PORT = process.env.PORT || 5000;
const URI = process.env.LOCAL_URI!;

app.use(express.json());
//CORS config for development purposes
app.use(cors());
app.use('/api', employeeRouter);

/*
We're using new UrlParser, the flag is there only to eventally fall back to old UrlParser if needed
We use create index to true so we can avoid deprecation warnings from old MongoDB driver
We use unified topology because we want to use the newest MongoDB driver management engine
*/
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch(err => {
    console.error(`Error while connecting to MongoDB: ${err}`);
  });
const mongooseConnection = mongoose.connection;

mongooseConnection.once('open', () => {
  console.log('Connection with MongoDB successful');
});

app.listen(PORT, () => {
  console.log(`Server has started and is listening on port ${PORT}`);
});

//dummy endpoint
app.get('/', (req: any, res: any) => {
  res.send('<h1>Server works!</h1>');
});
