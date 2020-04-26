import mongoose from 'mongoose';
import IEmployee from './IEmployee';

export default interface IEmployeeList extends mongoose.Document {
  name: string;
  list: Array<IEmployee>;
  unassignedList: Array<IEmployee>;
}
