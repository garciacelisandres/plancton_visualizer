import "./App.css";

import React, { useState, useEffect } from "react";
import { ClassListProvider } from "./contexts/ClassListContext";
import { ClassSelectProvider } from "./contexts/ClassSelectContext";
import { SampleListProvider } from "./contexts/SampleListContext";
import GridLayout from "./components/GridLayout/GridLayout";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import server from "./server/ServerCall";

function App() {
  const [notifyMessage, setNotifyMessage] = useState<string>("");
  const notifyError = (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  server._errorNotifier = setNotifyMessage;

  useEffect(() => {
    if(notifyMessage !== "") {
      notifyError(notifyMessage);
      setNotifyMessage("");
    }
  }, [notifyMessage]);

  return (
    <div className="App">
      <ToastContainer limit={3} />
      <div className="AppBarContainer">
        <AppBar position="static" className="AppBar">
          <Toolbar>
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
