import "react-datepicker/dist/react-datepicker.css";

import IconButton from "@material-ui/core/IconButton";
import React, { SyntheticEvent, useState } from "react";
import DatePicker from "react-datepicker";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { updateSampleList } from "../../contexts/util/SampleListUtil";
import { useSampleList } from "../../contexts/SampleListContext";

interface Props {
  height: number;
  width: number;
}

const VisualizationOptions = ({ height, width }: Props) => {
  const { sampleListDispatch } = useSampleList();

  const [startTime, setStartTime] = useState<Date | undefined>(new Date());
  const [endTime, setEndTime] = useState<Date | undefined>(new Date());
  const [constantRetrieval, setConstantRetrieval] = useState<boolean>(false);

  const handleStartTimeChange = (
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined
  ) => {
    if (date) {
      if (endTime && date > endTime) {
        setStartTime(endTime);
        updateSampleList(sampleListDispatch, {
          start_time: endTime,
          end_time: endTime,
        });
      } else {
        setStartTime(date);
        updateSampleList(sampleListDispatch, {
          start_time: date,
          end_time: endTime,
        });
      }
    }
  };

  const handleEndTimeChange = (
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined
  ) => {
    if (date) {
      if (startTime && date < startTime) {
        setEndTime(startTime);
        updateSampleList(sampleListDispatch, {
          start_time: startTime,
          end_time: startTime,
        });
      } else {
        setEndTime(date);
        updateSampleList(sampleListDispatch, {
          start_time: startTime,
          end_time: date,
        });
      }
    }
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
