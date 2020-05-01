import React from 'react';
import './ListPicker.scss';
import { Menu, Button } from 'antd';
import { FetchListNamesInterface } from '../utils/fetches';
import TextWrapper from './generic/TextWrapper';
import { Link } from 'react-router-dom';

interface ListPickerProps {
  names: Array<FetchListNamesInterface>;
  nameClick: (e: any) => void;
  title?: string;
  backButtonLink?: string;
}

const ListPicker = ({
  names,
  nameClick,
  title,
  backButtonLink,
}: ListPickerProps) => {
  return (
    <div className="name-list">
      <TextWrapper textType="h3" className="list-picker-title">
        {title}
      </TextWrapper>
      <Menu className="menu-internal">
        {names.map(name => {
          return (
            <Menu.Item
              className="menu-option-internal"
              key={name.name}
              onClick={nameClick}
            >
              {name.name}
            </Menu.Item>
          );
        })}
      </Menu>

      <Link to={backButtonLink ? backButtonLink : ''}>
        <Button className="back-button">
          <TextWrapper textType="h5" color="gray">
            Go Back
          </TextWrapper>
        </Button>
      </Link>
    </div>
  );
};

export default ListPicker;
