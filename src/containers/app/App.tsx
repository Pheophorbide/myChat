import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Router} from "../router/Router";
import ReactNotification from 'react-notifications-component';

function App() {
  return (
      <BrowserRouter basename={'/'}>
          <ReactNotification />
          <Router/>
      </BrowserRouter>
  );
}

export default App;
