import React, { ReactNode } from 'react';
import './HomePageWrapper.scss';
import topRightCornerPlant from '../assets/corner-plant-1.svg';
import bottomRightCornerPlant from '../assets/corner-plant-2.svg';
import bottomLeftCornerPlant from '../assets/corner-plant-3.svg';
import topLeftCornerPlant from '../assets/corner-plant-4.svg';

interface HomePageWrapperProps {
  children: ReactNode;
  className?: string;
}

const HomePageWrapper = ({ children, className }: HomePageWrapperProps) => {
  function createClassName() {
    return className ? className : '';
  }

  return (
    <div className={`home-page-wrapper ${createClassName()}`}>
      <img className="top-right-plant" src={topRightCornerPlant} />
      <img className="bottom-right-plant" src={bottomRightCornerPlant} />
      <img className="bottom-left-plant" src={bottomLeftCornerPlant} />
      <img className="top-left-plant" src={topLeftCornerPlant} />
      {children}
    </div>
  );
};

export default HomePageWrapper;
