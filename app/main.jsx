import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app.jsx";

import './libs/i18n';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App/>,
        document.querySelector('#app')
    );
});