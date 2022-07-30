import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../node_modules/antd/dist/antd.min.css';


// @ts-ignore
const root = createRoot(document.getElementById('root'));
root.render(
    <App></App>
);