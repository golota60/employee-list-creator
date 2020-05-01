import IEmployee from '../interfaces/IEmployee';

export const _checkItemEligibility = (
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

function _checkArrayChunkEligibility(
  chunkIndex: number,
  index: number,
  resultArray: Array<Array<IEmployee>>,
  allEmployees: Array<IEmployee>,
  remainingEmployees: Array<IEmployee>,
): number {
  let eligible = _checkItemEligibility(
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
      return _checkArrayChunkEligibility(
        chunkIndex,
        index + 1,
        resultArray,
        allEmployees,
        remainingEmployees,
      );
    }
  }
}

function _deleteEmployeeFromArray(
  array: Array<IEmployee>,
  personToBeDeleted: IEmployee,
) {
  if (array.includes(personToBeDeleted))
    array.splice(array.indexOf(personToBeDeleted), 1);
}

export const assignEmployees = (
  allEmployees: Array<IEmployee>,
  teamSize: number,
): [Array<Array<IEmployee>>, Array<IEmployee>] => {
  const unsortedEmployees = [...allEmployees];

  let sortedEmployees: Array<Array<IEmployee>> = allEmployees.reduce(
    (resultArray: Array<Array<IEmployee>>, item, index) => {
      const chunkIndex = Math.floor(index / teamSize);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      //check if item with given index is eligible to be added to the chunk
      const eligibleIndex = _checkArrayChunkEligibility(
        chunkIndex,
        index,
        resultArray,
        allEmployees,
        unsortedEmployees,
      );

      //edge case - there is no employee that can be added to the chunk
      if (eligibleIndex === -1) {
        return resultArray;
      }

      resultArray[chunkIndex].push(allEmployees[eligibleIndex]);

      //if our remaining employees includes the person delete it from remaining(unassigned) employees
      _deleteEmployeeFromArray(unsortedEmployees, allEmployees[eligibleIndex]);

      return resultArray;
    },
    [],
  );

  return [sortedEmployees, unsortedEmployees];
};
