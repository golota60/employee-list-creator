import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();

require('dotenv').config();

//We're not providing any PORT in the env variables, so it's going to use port 5000 by default
const PORT = process.env.PORT || 5000;
const URI = process.env.LOCAL_URI!;

app.use(express.json());
//CORS config
app.use(cors());

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const mongooseConnection = mongoose.connection;

mongooseConnection.once('open', () => {
  console.log('Connection with MongoDB successful');
});

app.listen(PORT, () => {
  console.log(`Server has started and is listening on port ${PORT}`);
});

app.get('/', (req: any, res: any) => {
  res.send('<h1>Server works!</h1>');
});
