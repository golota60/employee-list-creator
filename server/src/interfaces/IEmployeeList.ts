import mongoose from 'mongoose';
import IEmployee from './IEmployee';

export default interface IEmployeeList extends mongoose.Document {
  list: Array<IEmployee>;
}
