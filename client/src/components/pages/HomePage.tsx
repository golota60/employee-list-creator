import React from 'react';
import './HomePage.scss';
import MainPageWrapper from '../MainPageWrapper';
import TextWrapper from '../generic/TextWrapper';
import humanOne from '../../assets/human-1.svg';
import humanTwo from '../../assets/human-2.svg';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const HomePage = () => {
  return (
    <MainPageWrapper>
      <div className="home-page">
        <img className="human-left-size" src={humanOne} />
        <div className="main-menu">
          <div className="title-container">
            <TextWrapper textType="h1">Welcome</TextWrapper>
            <TextWrapper textType="h3" color="light-gray">
              What do you want to do today?
            </TextWrapper>
          </div>
          <div className="button-container">
            <Link to="/create/list">
              <Button shape="round" className="button" size="large">
                <TextWrapper textType="h5">Create new lists</TextWrapper>
              </Button>
            </Link>
            <Link to="/view/lists">
              <Button shape="round" className="button" size="large">
                <TextWrapper textType="h5">See existing lists</TextWrapper>
              </Button>
            </Link>
          </div>
        </div>
        <img className="human-right-size" src={humanTwo} />
      </div>
    </MainPageWrapper>
  );
};

export default HomePage;
