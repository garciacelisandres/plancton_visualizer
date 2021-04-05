import IconButton from "@material-ui/core/IconButton";
import React, { SyntheticEvent, useState } from "react";
import DatePicker from "react-datepicker";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked"
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked"

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  height: number;
  width: number;
}

const VisualizationOptions = ({ height, width }: Props) => {
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [constantRetrieval, setConstantRetrieval] = useState<boolean>(false);

  const handleStartTimeChange = (
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined
  ) => {
    if (date) setStartTime(date);
  };

  const handleEndTimeChange = (
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined
  ) => {
    if (date) setEndTime(date);
  };

  const handleConstantRetrievalChange = () => {
    setConstantRetrieval(!constantRetrieval);
  };

  return (
    <>
      <DatePicker
        onChange={handleStartTimeChange}
        selected={startTime}
        dropdownMode="scroll"
      />
      <DatePicker onChange={handleEndTimeChange} selected={endTime} />
      <IconButton onClick={handleConstantRetrievalChange}>
        {constantRetrieval ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
      </IconButton>
    </>
  );
};

export default VisualizationOptions;
