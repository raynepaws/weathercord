"use client";

import { store } from "$/store/hooks";
import App from "./App";
import { Provider } from "react-redux";

const AppStateProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppStateProvider;
