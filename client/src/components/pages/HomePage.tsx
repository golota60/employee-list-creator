import React from 'react';
import './HomePage.scss';
import HomePageWrapper from '../HomePageWrapper';
import TextWrapper from '../generic/TextWrapper';
import humanOne from '../../assets/human-1.svg';
import humanTwo from '../../assets/human-2.svg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <HomePageWrapper>
      <div className="home-page">
        <img className="human-left-size" src={humanOne} />
        <div className="title-container">
          <TextWrapper textType="h2">Welcome</TextWrapper>
          <TextWrapper textType="h4" color="light-gray">
            What do you want to do today?
          </TextWrapper>
        </div>
        <div className="button-container">
          <Link to="/create/list">
            <button className="button is-rounded">Create new lists</button>
          </Link>
          <Link to="/view/lists">
            <button className="button is-rounded">See existing lists</button>
          </Link>
        </div>
        <img className="human-right-size" src={humanTwo} />
      </div>
    </HomePageWrapper>
  );
};

export default HomePage;
