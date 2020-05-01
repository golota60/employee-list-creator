import React from 'react';
import './NotFoundPage.scss';
import { Redirect } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <Redirect to="/home"></Redirect>
    </>
  );
};

export default NotFoundPage;
