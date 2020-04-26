import mongoose from 'mongoose';
import IEmployeeList from '../interfaces/IEmployeeList';

const EmployeeListSchema = new mongoose.Schema({
  list: {
    type: Array,
    required: true,
  },
});

const EmployeeList = mongoose.model<IEmployeeList>(
  'EmployeeList',
  EmployeeListSchema,
);

export default EmployeeList;
