import React from "react";
import "./App.css";

import SamplesGraph from "./components/SamplesGraph";
import ClassesCombobox from "./components/ClassesCombobox";
import classStore from "./stores/ClassStore";

function App() {
  return (
    <div className="App">
      <h1>PlanCton visualizer</h1>
      <ClassesCombobox />
      <SamplesGraph />
    </div>
  );
}

classStore.updateState();

export default App;
