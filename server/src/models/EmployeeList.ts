import mongoose from 'mongoose';
import IEmployeeList from '../interfaces/IEmployeeList';

const EmployeeListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  list: {
    type: Array,
    required: true,
  },
  unassignedList: {
    type: Array,
    required: false,
  },
});

const EmployeeList = mongoose.model<IEmployeeList>(
  'EmployeeList',
  EmployeeListSchema,
);

export default EmployeeList;
