import React, { useEffect, useState } from 'react';
import './ViewListPage.scss';
import MainPageWrapper from '../MainPageWrapper';
import {
  fetchListNames,
  FetchListNamesInterface,
  fetchList,
} from '../../utils/fetches';
import { Select } from 'antd';
import { EmployeeList } from '../../utils/interfaces';
import TextWrapper from '../generic/TextWrapper';
import EmployeeTable from '../EmployeeTable';
import ListPicker from '../ListPicker';

const ViewListPage = () => {
  const [names, setNames] = useState([] as Array<FetchListNamesInterface>);
  const [selectedList, setSelectedList] = useState({} as EmployeeList);
  const [selectedSublistIndex, setSelectedSublistIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const names = await fetchListNames();
      const parsedNames = await names.json();
      setNames(parsedNames);
    })();
  }, []);

  async function handleMenuItemClick(e: any) {
    const listFetch = await fetchList(e.key);
    const list = await listFetch.json();
    setSelectedList(list);
  }

  function handleDropdownChange(selectedIndex: number) {
    setSelectedSublistIndex(selectedIndex);
  }

  return (
    <MainPageWrapper>
      <div className="list-preview-grid">
        <ListPicker
          names={names}
          nameClick={handleMenuItemClick}
          title="Your Lists"
          backButtonLink="/home"
        />
        <div className="grid-panel-wrapper">
          <TextWrapper>Assigned employee list number</TextWrapper>
          <Select onChange={handleDropdownChange}>
            {selectedList?.list?.map((list, index) => {
              return (
                <Select.Option key={index} value={index}>
                  {index}
                </Select.Option>
              );
            })}
          </Select>
          <div className="textarea-assigned-wrapper">
            <EmployeeTable
              arrayToDisplay={
                selectedList.list && selectedList.list[selectedSublistIndex]
              }
              title="Unassigned employees"
            ></EmployeeTable>
          </div>
          <div className="textarea-unassigned-wrapper">
            <EmployeeTable
              arrayToDisplay={selectedList.unassignedList}
              title="Unassigned employees"
            ></EmployeeTable>
          </div>
        </div>
      </div>
    </MainPageWrapper>
  );
};

export default ViewListPage;
