//default MongoDB object return
export interface MongoObject {
  __v: number;
  _id: string;
}

export interface Employee extends MongoObject {
  name: string;
  surname: string;
  age: number;
  province: string;
  department: string;
}

export interface EmployeeList extends MongoObject {
  name: string;
  list: Array<Array<Employee>>;
  unassignedList: Array<Employee>;
}
