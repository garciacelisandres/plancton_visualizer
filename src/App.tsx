import React from "react";
import "./App.css";

import { SamplesGraph } from "./components/SamplesGraph";
import sampleStore from "./stores/SampleStore"

function App() {
  return (
    <div className="App">
      <h1>Plancton visualizer</h1>
      <SamplesGraph />
    </div>
  );
}

var callServer = setInterval(function() {
  console.log("called")
  sampleStore.updateState()
}, 50000);

export default App;
