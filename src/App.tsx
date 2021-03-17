import "./App.css";

import SamplesGraph from "./components/SamplesGraph";
import ClassesCombobox from "./components/ClassesCombobox";
import { ClassListProvider } from "./contexts/ClassListContext";
import { ClassSelectProvider } from "./contexts/ClassSelectContext";
import { SampleListProvider } from "./contexts/SampleListContext";

function App() {
  return (
    <div className="App">
      <h1>PlanCton visualizer</h1>
      <ClassSelectProvider>
        <ClassListProvider>
          <ClassesCombobox />
        </ClassListProvider>
        <SampleListProvider>
          <SamplesGraph />
        </SampleListProvider>
      </ClassSelectProvider>
    </div>
  );
}

export default App;
