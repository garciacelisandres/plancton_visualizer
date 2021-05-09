import "react-datepicker/dist/react-datepicker.css";

import IconButton from "@material-ui/core/IconButton";
import React, { SyntheticEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { updateSampleList } from "../../contexts/util/SampleListUtil";
import { useSampleList } from "../../contexts/SampleListContext";
import { useRequestProgress } from "../../contexts/RequestProgressContext";

interface Props {
  height: number;
  width: number;
}

const VisualizationOptions: React.FC<Props> = ({ height, width }: Props) => {
  const { sampleListDispatch } = useSampleList();

  const [startTime, setStartTime] = useState<Date | undefined>(() => {
    let previousMonth = new Date();
    let currentDay = previousMonth.getDate();
    previousMonth.setDate(0);
    previousMonth.setDate(1);
    previousMonth.setDate(currentDay);
    return previousMonth;
  });
  const [endTime, setEndTime] = useState<Date | undefined>(new Date());
  const [constantRetrieval, setConstantRetrieval] = useState<boolean>(false);
  const { requestProgressDispatch } = useRequestProgress();

  useEffect(() => {
    updateSampleList(sampleListDispatch, requestProgressDispatch, {
      start_time: startTime,
      end_time: endTime,
    });
  }, []);

  const handleStartTimeChange = (
    date: Date | null,
    _event: SyntheticEvent<any, Event> | undefined
  ) => {
    if (date) {
      if (endTime && date > endTime) {
        setStartTime(endTime);
        updateSampleList(sampleListDispatch, requestProgressDispatch, {
          start_time: endTime,
          end_time: endTime,
        });
      } else {
        setStartTime(date);
        updateSampleList(sampleListDispatch, requestProgressDispatch, {
          start_time: date,
          end_time: endTime,
        });
      }
    }
  };

  const handleEndTimeChange = (
    date: Date | null,
    _event: SyntheticEvent<any, Event> | undefined
  ) => {
    if (date) {
      if (startTime && date < startTime) {
        setEndTime(startTime);
        updateSampleList(sampleListDispatch, requestProgressDispatch, {
          start_time: startTime,
          end_time: startTime,
        });
      } else {
        setEndTime(date);
        updateSampleList(sampleListDispatch, requestProgressDispatch, {
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
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd/MM/yyyy, HH:mm"
      />
      <DatePicker
        onChange={handleEndTimeChange}
        selected={endTime}
        dropdownMode="scroll"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd/MM/yyyy, HH:mm"
      />
      <IconButton onClick={handleConstantRetrievalChange}>
        {constantRetrieval ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
      </IconButton>
    </>
  );
};

export default VisualizationOptions;
