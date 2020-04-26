import IEmployee from '../interfaces/IEmployee';

export const checkItemEligibility = (
  arrayToCheck: Array<IEmployee>,
  employee: IEmployee,
): boolean => {
  let returnValue: boolean = true;

  if (arrayToCheck.length === 0) {
    console.log('Its the first item in the new array', employee);
    returnValue = true;
  } else {
    for (const arrayEmployee of arrayToCheck) {
      console.log('comapring existing: ', arrayEmployee, ' with ', employee);
      if (
        arrayEmployee.department === employee.department ||
        arrayEmployee.province === employee.province
      ) {
        console.log('Item is not eligible to be added');
        returnValue = false;
        break;
      } else {
        returnValue = true;
      }
    }
  }
  console.log(`Item was ${returnValue}`);
  return returnValue;
};

export const assignEmployees = (
  allEmployees: Array<IEmployee>,
  teamSize: number,
): Array<Array<IEmployee>> => {
  const remainingEmployees = [...allEmployees];

  let result: Array<Array<IEmployee>> = allEmployees.reduce(
    (resultArray: Array<Array<IEmployee>>, item, index) => {
      const chunkIndex = Math.floor(index / teamSize);
      let eligible = true;

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      // if it's the first object added to array it's' eligible by default
      //if it's not the first object check if it's eligible

      let addedIndex = 0;
      function checkEligibility(chunkIndex: number, index: number): number {
        eligible = checkItemEligibility(
          resultArray[chunkIndex],
          allEmployees[index],
        );
        if (eligible) {
          console.log('eligible',index, addedIndex);
          return index;
        } else {
          if (index + addedIndex >= allEmployees.length - 1) {
            console.log('exceeded maximum index, but we add it anyway', index, addedIndex);
            return index;
          } else {
            console.log('previous item was not eligible', index, addedIndex);
            addedIndex += 1;
            return checkEligibility(chunkIndex, index + addedIndex);
          }
        }
      }
      const eligibleIndex = checkEligibility(chunkIndex, index);
      console.log('eligibleIndex', eligibleIndex);
      //if the item is not eligible, check the next one(s)

      if (eligible) {
        resultArray[chunkIndex].push(allEmployees[eligibleIndex]);
        remainingEmployees.splice(
          remainingEmployees.indexOf(allEmployees[eligibleIndex]),
          1,
        );
      } //if the item is eligibe to be added, add it

      return resultArray;
    },
    [],
  );

  console.log('Unassigned Employees', remainingEmployees);

  return result;
};
