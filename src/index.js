import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './util/i18';

import './index.css';

import reportWebVitals from './reportWebVitals';

import { AppProvider } from './util/RealmApp';
import { ContexProvider } from './util/ContexData';
import { ThemeProvider } from '@material-tailwind/react';

const appId = process.env.REACT_APP_REALM_APP_ID;
const root = ReactDOM.createRoot(document.getElementById('root'));

const themeOne = {
  cardBody: {
    defaultProps: {
      className: '',
    },
    styles: {
      base: {
        p: 'lg:p-6 md:p-4 sm:pt-2 sm:pb-2',
      },
    },
  },
};

root.render(
  <AppProvider appId={appId}>
    <ContexProvider>
      <ThemeProvider value={themeOne}>
        <App />
      </ThemeProvider>
    </ContexProvider>
  </AppProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
