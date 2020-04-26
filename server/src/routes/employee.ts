import express from 'express';
import Employee from '../models/Employee';
import IEmployee from '../interfaces/IEmployee';
import { userInfo } from 'os';
import { checkItemEligibility, assignEmployees } from '../utils/utils';
import EmployeeList from '../models/EmployeeList';
import IEmployeeList from '../interfaces/IEmployeeList';
const router = express.Router();

const MAX_TEAM_SIZE = 5;

// router.get(
//   '/getEmployees',
//   (req: express.Request, res: express.Response) => {},
// );

interface GenerateListRequestBody {
  sameDepartment?: boolean;
  sameProvince?: boolean;
  sameAge?: boolean;
  strict?: boolean;
  teamSize: number;
  listName: string;
}

router.post(
  '/generateList',
  async (req: express.Request, res: express.Response) => {
    const requestBody: GenerateListRequestBody = req.body;
    if (!requestBody.listName || !requestBody.teamSize) {
      return res.status(400).json({
        message: `You didn't provide listName and/or teamSize`,
      });
    }

    if (requestBody.teamSize > MAX_TEAM_SIZE) {
      return res.status(400).json({
        message: `Employee team size is bigger than ${MAX_TEAM_SIZE}`,
      });
    }

    const allEmployees = await Employee.find({});

    if (
      allEmployees.length % requestBody.teamSize !== 0 &&
      requestBody?.strict
    ) {
      return res.status(400).json({
        message: `Number of employees - ${allEmployees.length} is not divisible by provided number - ${requestBody.teamSize}`,
      });
    }

    let [result, unassignedEmployees] = assignEmployees(
      allEmployees,
      requestBody.teamSize,
    );

    let list = new EmployeeList({
      name: requestBody.listName,
      list: result,
      unassignedList: unassignedEmployees,
    });
    await list.save();
    console.log('List saved');

    let allpeoplecheck = 0;
    result.forEach(array => {
      allpeoplecheck += array.length;
    });
    //Check if it's possible to split into teams

    return res.json({ msg: allpeoplecheck });

    //newEmployee.save();
  },
);

export { router as employeeRouter };
