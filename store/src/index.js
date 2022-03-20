import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import Paths from './Paths';


ReactDOM.render(
  <BrowserRouter>    
    <Paths />
  </BrowserRouter>,
  document.getElementById('root')
);


