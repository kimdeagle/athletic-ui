import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {CookiesProvider} from "react-cookie";
import {Provider} from "react-redux";
import store, {persistor} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {HelmetProvider} from "react-helmet-async";
import {SnackbarProvider} from "notistack";
import {DEFAULT_AUTO_HIDE_DURATION_MS} from "./utils/const";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <HelmetProvider>
            <SnackbarProvider
              autoHideDuration={DEFAULT_AUTO_HIDE_DURATION_MS}
              anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
              style={{ minWidth: 'initial' }}
            >
              <App />
            </SnackbarProvider>
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </CookiesProvider>
);