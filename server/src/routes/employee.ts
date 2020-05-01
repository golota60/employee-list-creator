import express from 'express';
import Employee from '../models/Employee';
import { assignEmployees } from '../utils/utils';
import EmployeeList from '../models/EmployeeList';
import IEmployeeList from '../interfaces/IEmployeeList';
const router = express.Router();

const MAX_TEAM_SIZE = 5;

interface GenerateListRequestBody {
  teamSize: number;
  listName: string;
}

interface GenerateListResponseBody {
  list?: IEmployeeList;
  message: string;
}

router.post(
  '/generateList',
  async (
    req: express.Request,
    res: express.Response<GenerateListResponseBody>,
  ) => {
    try {
      const requestBody: GenerateListRequestBody = req.body;
      if (!requestBody.listName || !requestBody.teamSize) {
        return res.status(400).json({
          message: `You didn't provide listName and/or teamSize and/or listName`,
        });
      }

      if (requestBody.teamSize > MAX_TEAM_SIZE) {
        return res.status(400).json({
          message: `Employee team size is bigger than ${MAX_TEAM_SIZE}`,
        });
      }

      if (await EmployeeList.exists({ name: requestBody.listName })) {
        return res.status(400).json({
          message: `There is already a list with that name`,
        });
      }

      const allEmployees = await Employee.find({});

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

      return res.json({
        message: `List generated successfully. Sorted people: ${allpeoplecheck}. Unsorted people: ${unassignedEmployees.length}`,
        list: list,
      } as GenerateListResponseBody);
    } catch (err) {
      const errorMessage = `Error while generating list: ${err}`;
      console.error(errorMessage);
      return res.status(400).json({ message: errorMessage });
    }
  },
);

router.get(
  '/getListNames',
  async (req: express.Request, res: express.Response) => {
    try {
      const allEmployeeLists = await EmployeeList.find({})
        .select('-list')
        .select('-unassignedList');
      return res.json(allEmployeeLists);
    } catch (err) {
      const errorMessage = `Error while getting list names: ${err}`;
      console.error(errorMessage);
      return res.status(400).json({ message: errorMessage });
    }
  },
);

interface GetListInterface {
  listName: string;
}

router.post('/getList', async (req: express.Request, res: express.Response) => {
  const { listName } = req.body;
  if (!listName) {
    return res.status(400).json(`listName was not provided`);
  }

  const employeeList = await EmployeeList.findOne({ name: listName });
  if (!employeeList) {
    return res
      .status(400)
      .json(`Employee list with given listName does not exist`);
  }

  return res.json(employeeList);
});

export { router as employeeRouter };
