import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useState } from "react";
import { Sample } from "../../model/Sample";
import PieGraphType from "../SamplesGraph/graphs/PieGraphType";

interface Props {
  onClose: () => void;
  open: boolean;
  sampleData: Sample | undefined;
}

const SampleModalDialog: React.FC<Props> = ({ open, onClose, sampleData }) => {
  const [selectedQuantMethod, setSelectedQuantMethod] = useState<string>(
    sampleData ? sampleData.values[0].values[0].method : ""
  );
  const [value, setValue] = useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const selectQuantMethod = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    let method: string = event.target.value as string;
    setSelectedQuantMethod(method);
  };

  return (
    <>
      {sampleData && (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
          <DialogTitle id="dialog-title">
            Sample data - <em>{sampleData.name}</em>
          </DialogTitle>
          <DialogContent>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Overview" />
              <Tab label="Table" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={6}>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid>
                      <p>Sample name: {sampleData.name}</p>
                      <p>
                        Date retrieved:{" "}
                        {new Date(sampleData.date).toLocaleDateString()},{" "}
                        {new Date(sampleData.date.toISOString()).toTimeString()}
                      </p>
                    </Grid>
                    <Grid>
                      <Select
                        native
                        labelId="quant-method-select-label"
                        id="quant-method-select-select"
                        value={selectedQuantMethod}
                        onChange={selectQuantMethod}
                      >
                        {sampleData.values[0].values.map((value) => (
                          <option value={value.method}>{value.method}</option>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <PieGraphType
                    sampleData={sampleData}
                    selectedQuantMethod={selectedQuantMethod}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default SampleModalDialog;
