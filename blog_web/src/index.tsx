import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
// import store from "./app/stre";
// import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
  {/* <HashRouter> */}
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  // </BrowserRouter>
  // </HashRouter>

  // </React.StrictMode>
);

reportWebVitals();
