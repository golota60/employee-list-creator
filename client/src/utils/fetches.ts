import { MongoObject, EmployeeList } from './interfaces';

const URI = 'http://localhost:5000';

const jsonHeaders = {
  'Content-Type': 'application/json',
};

interface TypedResponse<T = any> extends Response {
  json(): Promise<T>;
}

export interface FetchListNamesInterface extends MongoObject {
  name: string;
}

export const fetchListNames = async (): Promise<TypedResponse<
  Array<FetchListNamesInterface>
>> => {
  try {
    return await fetch(`${URI}/api/getListNames`);
  } catch (err) {
    console.error(`Error during fetchListNames fetch: ${err}`);
  }
  return Promise.reject();
};

interface FetchListBody {
  listName: string;
}

export const fetchList = async (
  listName: string,
): Promise<TypedResponse<EmployeeList>> => {
  const body: FetchListBody = { listName: listName };
  try {
    return await fetch(`${URI}/api/getList`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`Error during fetchList fetch: ${err}`);
  }
  return Promise.reject();
};

export interface CreateListBody {
  teamSize: number;
  listName: string;
}

export const createList = async (listName: string, teamSize: number) => {
  const body: CreateListBody = { listName: listName, teamSize: teamSize };
  console.log(listName, teamSize);
  console.log(body);
  console.log(JSON.stringify(body));
  try {
    return await fetch(`${URI}/api/generateList`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`Error during createList fetch: ${err}`);
  }
  return Promise.reject();
};
