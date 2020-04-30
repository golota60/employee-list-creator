import React, { ReactNode } from 'react';
import './MainPageWrapper.scss';
import topRightCornerPlant from '../assets/corner-plant-1.svg';
import bottomRightCornerPlant from '../assets/corner-plant-2.svg';
import bottomLeftCornerPlant from '../assets/corner-plant-3.svg';
import topLeftCornerPlant from '../assets/corner-plant-4.svg';

interface MainPageWrapperProps {
  children: ReactNode;
  className?: string;
}

const MainPageWrapper = ({ children, className }: MainPageWrapperProps) => {
  function createClassName() {
    return className ? className : '';
  }

  return (
    <div className={`main-page-wrapper ${createClassName()}`}>
      <img className="top-right-plant" src={topRightCornerPlant} />
      <img className="bottom-right-plant" src={bottomRightCornerPlant} />
      <img className="bottom-left-plant" src={bottomLeftCornerPlant} />
      <img className="top-left-plant" src={topLeftCornerPlant} />
      {children}
    </div>
  );
};

export default MainPageWrapper;
