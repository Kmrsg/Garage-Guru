/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import videoerror from '../../images/mark.mp4';

const ErrorPage = (): JSX.Element => {
  return (
    <div className="error-window">
      <div className="error-message">
        <h1 className="error-title">404</h1>
      </div>

      <video id="error-video" muted loop autoPlay>
        <source src={videoerror} type="video/mp4" />
      </video>
    </div>
  );
};

export default ErrorPage;
