import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useState, useEffect } from "react";
import { Sample } from "../../model/Sample";
import PieGraphType from "../SamplesGraph/graphs/PieGraphType";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useClassList } from "../../contexts/ClassListContext";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  onClose: () => void;
  open: boolean;
  sampleData: Sample | undefined;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const SampleModalDialog: React.FC<Props> = ({ open, onClose, sampleData }) => {
  const [selectedQuantMethod, setSelectedQuantMethod] = useState<string>(
    sampleData ? sampleData.values[0].values[0].method : ""
  );
  const [value, setValue] = useState<number>(0);
  const { classListState } = useClassList();
  const quantMethodsList = sampleData
    ? sampleData.values[0].values.map((quant_method) => quant_method.method)
    : [];
  const [filterTable, setFilterTable] = useState<string>("");
  const classes = useStyles();

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

  const filterTableByClassName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterTable(event.target.value);
  };

  useEffect(() => {
    let method: string = sampleData
      ? sampleData.values[0].values[0].method
      : "";
    setSelectedQuantMethod(method);
  }, [open]);

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
                        {quantMethodsList.map((value, index) => (
                          <option key={index} value={value}>
                            {value}
                          </option>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <PieGraphType
                    sampleData={sampleData}
                    selectedQuantMethod={selectedQuantMethod}
                    classList={classListState.classes}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FormControl margin="dense">
                <InputLabel htmlFor="filter-table" style={{ paddingLeft: 10 }}>
                  Filter by class
                </InputLabel>
                <OutlinedInput
                  id="filter-table"
                  value={filterTable}
                  onChange={filterTableByClassName}
                  style={{ padding: 10 }}
                />
              </FormControl>
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sample_table">
                    <TableHead>
                      <TableRow key="header">
                        <TableCell></TableCell>
                        <TableCell
                          colSpan={quantMethodsList.length}
                          align="center"
                        >
                          Quantification methods
                        </TableCell>
                      </TableRow>
                      <TableRow key="methods">
                        <TableCell>Class</TableCell>
                        {quantMethodsList.map((quant_method) => (
                          <TableCell>{quant_method}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classListState.classes
                        .filter((_class) =>
                          _class.name.toLowerCase().startsWith(filterTable)
                        )
                        .map((_class, index) => (
                          <TableRow key={_class.id}>
                            <TableCell key={index}>{_class.name}</TableCell>
                            {quantMethodsList.map((quant_method) => {
                              let foundValue = sampleData.values
                                .find((obj) => obj["class_id"] === _class.id)
                                ?.values.find(
                                  (value) => value.method === quant_method
                                )?.value;
                              return (
                                <TableCell key={`${_class.id}-${quant_method}`}>
                                  {foundValue}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
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
