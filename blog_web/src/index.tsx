import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import Home from './views/Home/home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom'
import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </React.StrictMode>
);

reportWebVitals();
