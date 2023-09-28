import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./components/contexts/ContextProvider";





ReactDOM.render(
  <BrowserRouter>
  <ContextProvider>
     <App />
  </ContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

