import IEmployee from '../interfaces/IEmployee';

export const checkItemEligibility = (
  arrayToCheck: Array<IEmployee>,
  employee: IEmployee,
  whitelistArray: Array<IEmployee>,
): boolean => {
  let returnValue: boolean = false;

  if (arrayToCheck.length === 0 && whitelistArray.includes(employee)) {
    console.log('Its the first item in the new array', employee);
    returnValue = true;
  } else {
    for (const arrayEmployee of arrayToCheck) {
      console.log('comapring existing: ', arrayEmployee, ' with ', employee);
      if (
        arrayEmployee.department === employee.department ||
        arrayEmployee.province === employee.province ||
        arrayEmployee.age === employee.age
      ) {
        console.log('Item is not eligible to be added');
        returnValue = false;
        break;
      } else if (whitelistArray.includes(employee)) {
        returnValue = true;
      } else {
        returnValue = false;
      }
    }
  }
  console.log(`Item was ${returnValue}`);
  return returnValue;
};

// export const checkArrayEligibility = (
//   arrayToCheck: Array<IEmployee>,
//   chunkIndex: number,
//   index: number,
// ): number => {
//   let eligible = checkItemEligibility(
//     resultArray[chunkIndex],
//     allEmployees[index],
//   );
//   if (eligible) {
//     return index;
//   } else {
//     if (index >= allEmployees.length - 1) {
//       return index;
//     } else {
//       return checkArrayEligibility(chunkIndex, index + 1);
//     }
//   }
// };

export const assignEmployees = (
  allEmployees: Array<IEmployee>,
  teamSize: number,
): Array<Array<IEmployee>> => {
  const remainingEmployees = [...allEmployees];

  let result: Array<Array<IEmployee>> = allEmployees.reduce(
    (resultArray: Array<Array<IEmployee>>, item, index) => {
      const chunkIndex = Math.floor(index / teamSize);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }
      let arrayChunk = resultArray[chunkIndex];
      // if it's the first object added to array it's' eligible by default
      //if it's not the first object check if it's eligible

      let addedIndex = 0;
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
            return index;
          } else {
            return checkArrayEligibility(chunkIndex, index + 1);
          }
        }
      }
      const eligibleIndex = checkArrayEligibility(chunkIndex, index);
      console.log('eligibleIndex', eligibleIndex);
      //if the item is not eligible, check the next one(s)
      resultArray[chunkIndex].push(allEmployees[eligibleIndex]);
      remainingEmployees.splice(
        remainingEmployees.indexOf(allEmployees[eligibleIndex]),
        1,
      );

      // allEmployees.splice(allEmployees.indexOf(allEmployees[eligibleIndex]), 1);

      return resultArray;
    },
    [],
  );

  console.log('Unassigned Employees', remainingEmployees);

  return result;
};
