import React from "react";
import "./App.css";

import SamplesGraph from "./components/SamplesGraph";
import ClassesCombobox from "./components/ClassesCombobox";
import classStore from "./stores/ClassStore";
import { ClassListProvider } from "./contexts/ClassListContext";
import { ClassSelectProvider } from "./contexts/ClassSelectContext";

function App() {
  return (
    <div className="App">
      <h1>PlanCton visualizer</h1>
      <ClassSelectProvider>
        <ClassListProvider>
          <ClassesCombobox />
        </ClassListProvider>
        <SamplesGraph />
      </ClassSelectProvider>
    </div>
  );
}

export default App;
