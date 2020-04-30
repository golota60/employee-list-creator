import React, { useEffect, useState } from 'react';
import './ViewListPage.scss';
import MainPageWrapper from '../MainPageWrapper';
import {
  fetchListNames,
  FetchListNamesInterface,
  fetchList,
} from '../../utils/fetches';
import { Menu, Input } from 'antd';
import { EmployeeList } from '../../utils/interfaces';
import TextWrapper from '../generic/TextWrapper';

const ViewListPage = () => {
  const [names, setNames] = useState([] as Array<FetchListNamesInterface>);
  const [isLoading, setLoading] = useState(true);
  const [selectedList, setSelectedList] = useState({} as EmployeeList);

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
    setLoading(false);
  }

  return (
    <MainPageWrapper>
      <div className="list-preview-grid">
        <div className="name-list">
          <Menu className="menu-internal">
            {names.map(name => {
              return (
                <Menu.Item
                  className="menu-option-internal"
                  key={name.name}
                  onClick={handleMenuItemClick}
                >
                  {name.name}
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
        <div className="grid-panel-wrapper">
          <div className="textarea-assigned-wrapper">
            <TextWrapper>Assigned Employees</TextWrapper>
            <Input.TextArea
              className="assigned-list-textarea"
              autoSize={false}
              disabled={isLoading ? true : false}
              value={
                selectedList ? JSON.stringify(selectedList.list, null, 2) : ''
              }
            />
          </div>
          <div className="textarea-unassigned-wrapper">
            <TextWrapper>Unassigned Employees</TextWrapper>
            <Input.TextArea
              className="unassigned-list-textarea"
              autoSize={false}
              disabled={isLoading ? true : false}
              value={
                selectedList
                  ? JSON.stringify(selectedList.unassignedList, null, 2)
                  : ''
              }
            />
          </div>
        </div>
      </div>
    </MainPageWrapper>
  );
};

export default ViewListPage;
