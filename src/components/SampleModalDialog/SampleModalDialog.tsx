import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { Sample } from "../../model/Sample";
import PieGraphType from "../SamplesGraph/graphs/PieGraphType";

interface Props {
  onClose: () => void;
  open: boolean;
  sampleData: Sample | undefined;
}

const SampleModalDialog: React.FC<Props> = ({ open, onClose, sampleData }) => {
  console.log(sampleData)
  return (
    <>
      {sampleData && (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
          <DialogTitle id="dialog-title">
            Sample data - <em>{sampleData.name}</em>
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={6}>
                <p>Sample name: {sampleData.name}</p>
                <p>
                  Date retrieved:{" "}
                  {new Date(sampleData.date).toLocaleDateString()},{" "}
                  {new Date(sampleData.date.toISOString()).toTimeString()}
                </p>
              </Grid>
              <Grid item xs={6}>
                <PieGraphType sampleData={sampleData} />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SampleModalDialog;
