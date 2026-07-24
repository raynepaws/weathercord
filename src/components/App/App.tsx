"use client";

import { store } from "$/store/hooks";
import GUI from "../GUI/GUI";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <GUI />
    </Provider>
  );
};

export default App;
