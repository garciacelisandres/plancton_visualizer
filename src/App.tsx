import "./App.css";

import React from "react";
import { ClassListProvider } from "./contexts/ClassListContext";
import { ClassSelectProvider } from "./contexts/ClassSelectContext";
import { SampleListProvider } from "./contexts/SampleListContext";
import GridLayout from "./components/GridLayout/GridLayout";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

function App() {
  return (
    <div className="App">
      <div className="AppBarContainer">
        <AppBar position="static" className="AppBar">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" className="AppBarMenuButton">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" className="AppBarTitle">
              <b unselectable="on">Plankton Visualizer</b>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
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
