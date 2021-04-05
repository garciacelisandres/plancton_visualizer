import "./App.css";

import { ClassListProvider } from "./contexts/ClassListContext";
import { ClassSelectProvider } from "./contexts/ClassSelectContext";
import { SampleListProvider } from "./contexts/SampleListContext";
import GridLayout from "./components/GridLayout/GridLayout";


function App() {

  return (
    <div className="App">
      <h1>PlanCton visualizer</h1>
      <ClassSelectProvider>
        <ClassListProvider>
          <SampleListProvider>
            <GridLayout />
          </SampleListProvider>
        </ClassListProvider>
      </ClassSelectProvider>
    </div>
  );
}

export default App;
