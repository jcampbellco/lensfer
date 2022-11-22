import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages";
import HomePage from "./pages/home";
import { Provider } from 'react-redux'
import store from './store'
import Layout from "./pages/layout";
import RequireAuth from "./components/RequireAuth";
import GoogleOauth from "./components/GoogleOauth";

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={ <GoogleOauth><IndexPage /></GoogleOauth> } />
                  <Route element={<Layout />}>
                      <Route path="/home" element={ <RequireAuth><HomePage /></RequireAuth> } />
                  </Route>
              </Routes>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
