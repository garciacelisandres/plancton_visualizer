import "./VisualizationOptions.css";

import IconButton from "@material-ui/core/IconButton";
import React, { SyntheticEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { updateSampleList } from "../../contexts/util/SampleListUtil";
import { useSampleList } from "../../contexts/SampleListContext";
import { useRequestProgress } from "../../contexts/RequestProgressContext";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Select from "@material-ui/core/Select";

import cr from "../../util/ConstantRetrieval";
import { ACTION_SAMPLE_LIST_UPDATE_QUANT_METHOD } from "../../contexts/reducers/sampleList/SampleListActions";

interface Props {
  height: number;
  width: number;
}

const VisualizationOptions: React.FC<Props> = ({ height, width }: Props) => {
  const { sampleListState, sampleListDispatch } = useSampleList();

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
  const quantMethodsList =
    sampleListState.samples.length > 0
      ? sampleListState.samples[0].values[0].values.map(
          (quant_method) => quant_method.method
        )
      : [];

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
    _event?.stopPropagation();
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

  const handleConstantRetrievalChange = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setConstantRetrieval(!constantRetrieval);
    if (!constantRetrieval) {
      cr.start(requestSampleListUpdate);
    } else {
      cr.stop();
    }
  };

  const handleQuantMethodUpdate = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    if (event) {
      let method: string = event.target.value as string;
      sampleListDispatch({
        type: ACTION_SAMPLE_LIST_UPDATE_QUANT_METHOD,
        params: {
          method: method,
        },
      });
    }
  };

  const requestSampleListUpdate = () => {
    updateSampleList(sampleListDispatch, requestProgressDispatch, {
      start_time: startTime,
      end_time: endTime,
    });
  };

  return (
    <div className="vis-opts-container">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
          className="vis-opts-summary-container"
        >
          <label
            onClick={(event) => event.stopPropagation()}
            className="vis-options-datepicker-container"
          >
            <p className="vis-options-datepicker-label">Interval start:</p>
            <DatePicker
              onChange={handleStartTimeChange}
              onSelect={(_date, event) => event?.stopPropagation()}
              onClickOutside={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              selected={startTime}
              dropdownMode="scroll"
              showTimeInput
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy, HH:mm"
              popperPlacement="bottom"
              withPortal
            />
          </label>
          <label
            onClick={(event) => event.stopPropagation()}
            className="vis-options-datepicker-container"
          >
            <p className="vis-options-datepicker-label">Interval end:</p>
            <DatePicker
              onChange={handleEndTimeChange}
              onSelect={(_date, event) => event?.stopPropagation()}
              onClickOutside={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              selected={endTime}
              dropdownMode="scroll"
              showTimeInput
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy, HH:mm"
              popperPlacement="bottom"
              withPortal
            />
          </label>
          <IconButton
            onClick={handleConstantRetrievalChange}
            onFocus={(event) => event.stopPropagation()}
          >
            {constantRetrieval ? (
              <RadioButtonChecked className="animated-icon" />
            ) : (
              <RadioButtonUnchecked />
            )}
          </IconButton>
        </AccordionSummary>
        <AccordionDetails className="vis-option-details-container">
          <div className="vis-option-details-quantmethod-container">
            <p>Quantification method selected:</p>
            <Select
              native
              labelId="quant-method-select-label"
              id="quant-method-select-select"
              value={sampleListState.method}
              onChange={handleQuantMethodUpdate}
            >
              {quantMethodsList.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default VisualizationOptions;
