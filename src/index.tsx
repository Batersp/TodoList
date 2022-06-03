import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppWithReducer from "./AppWithReducer";
import AppWithRedux from "./AppWithRedux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
    <React.StrictMode>
        <AppWithRedux />
    </React.StrictMode>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

