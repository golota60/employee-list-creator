import mongoose from 'mongoose';

export default interface IEmployee extends mongoose.Document {
  name: string;
  surname: string;
  age: number;
  province: string;
  department: string;
}
