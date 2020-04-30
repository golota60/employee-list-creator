import IEmployee from '../interfaces/IEmployee';

export const checkItemEligibility = (
  arrayToCheck: Array<IEmployee>,
  employee: IEmployee,
  whitelistArray: Array<IEmployee>,
): boolean => {
  let returnValue: boolean = false;

  if (arrayToCheck.length === 0 && whitelistArray.includes(employee)) {
    returnValue = true;
  } else {
    for (const arrayEmployee of arrayToCheck) {
      if (
        arrayEmployee.department === employee.department ||
        arrayEmployee.province === employee.province ||
        arrayEmployee.age === employee.age
      ) {
        returnValue = false;
        break;
      } else if (whitelistArray.includes(employee)) {
        returnValue = true;
      } else {
        returnValue = false;
      }
    }
  }
  return returnValue;
};

export const assignEmployees = (
  allEmployees: Array<IEmployee>,
  teamSize: number,
): [Array<Array<IEmployee>>, Array<IEmployee>] => {
  const remainingEmployees = [...allEmployees];

  let result: Array<Array<IEmployee>> = allEmployees.reduce(
    (resultArray: Array<Array<IEmployee>>, item, index) => {
      const chunkIndex = Math.floor(index / teamSize);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      function checkArrayEligibility(
        chunkIndex: number,
        index: number,
      ): number {
        let eligible = checkItemEligibility(
          resultArray[chunkIndex],
          allEmployees[index],
          remainingEmployees,
        );
        if (eligible) {
          return index;
        } else {
          if (index >= allEmployees.length - 1) {
            return -1;
          } else {
            return checkArrayEligibility(chunkIndex, index + 1);
          }
        }
      }
      const eligibleIndex = checkArrayEligibility(chunkIndex, index);

      if (eligibleIndex === -1) {
        return resultArray;
      }
      //if the item is not eligible, check the next one(s)
      resultArray[chunkIndex].push(allEmployees[eligibleIndex]);

      if (remainingEmployees.includes(allEmployees[eligibleIndex]))
        remainingEmployees.splice(
          remainingEmployees.indexOf(allEmployees[eligibleIndex]),
          1,
        );

      return resultArray;
    },
    [],
  );

  return [result, remainingEmployees];
};
