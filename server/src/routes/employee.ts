import express from 'express';
import Employee from '../models/Employee';
import IEmployee from '../interfaces/IEmployee';
import { userInfo } from 'os';
import { checkItemEligibility, assignEmployees } from '../utils/utils';
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

    const numberOfTeams = Math.ceil(allEmployees.length / requestBody.teamSize);

    let result = assignEmployees(allEmployees, requestBody.teamSize);

    console.log('actual number of teams', result.length);
    console.log('expected number of teams', numberOfTeams);

    let allpeoplecheck = 0;
    result.forEach(array => {
      allpeoplecheck += array.length;
    });
    console.log('people assigned to teams', allpeoplecheck);

    //Check if it's possible to split into teams

    return res.json({ msg: 'xd' });

    //newEmployee.save();
  },
);

export { router as employeeRouter };
