import mongoose from 'mongoose';
import IEmployee from '../interfaces/IEmployee';

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default Employee;
