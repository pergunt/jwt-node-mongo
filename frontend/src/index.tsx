import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Context} from 'configs'
import Store from 'store'
import { PrimeReactProvider} from 'primereact/api';
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = new Store()

root.render(
  <PrimeReactProvider>
    <Context.Provider value={{store}}>
      <App />
    </Context.Provider>
  </PrimeReactProvider>
);
