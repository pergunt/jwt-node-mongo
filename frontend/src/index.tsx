import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Context} from 'configs'
import Store from 'store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = new Store()

root.render(
    <Context.Provider value={{store}}>
      <App />
    </Context.Provider>
);
