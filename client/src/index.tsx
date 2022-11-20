import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import IndexPage from "./pages";
import HomePage from "./pages/home";

const router = createBrowserRouter([
    {
        children: [
            {
                element: <App hideHeader={true} />,
                children: [
                    {
                        path: '/',
                        index: true,
                        element: <IndexPage/>
                    },
                ]
            },
            {
                element: <App/>,
                children: [
                    {
                        path: '/home',
                        element: <HomePage />
                    }
                ]
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
