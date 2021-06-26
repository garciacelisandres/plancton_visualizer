import "./GraphsStyle.css";

import React, { useState } from "react";
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClassSelectState } from "../../../contexts/reducers/classSelect/ClassSelectState";
import { SampleListState } from "../../../contexts/reducers/sampleList/SampleListState";
import { Sample } from "../../../model/Sample";

import palette from "../../../util/ColorPalette";
import CustomTooltip from "../util/CustomTooltip";
import { IOpacityState } from "../SamplesGraph";

interface Props {
  sampleListState: SampleListState;
  classSelectState: ClassSelectState;
  width: number;
  height: number;
  opacity: IOpacityState | undefined;
  setOpacity: Function;
  handleClickOpen: (sample: Sample) => void;
}

const AreaGraphType: React.FC<Props> = ({
  sampleListState,
  classSelectState,
  width,
  height,
  opacity,
  setOpacity,
  handleClickOpen,
}) => {
  var timeout: any;
  const [brushStart, setBrushStart] = useState<number>(0);
  const [brushEnd, setBrushEnd] = useState<number | undefined>(undefined);

  const formatDate = (date: Date) => {
    let dd: number | string = date.getDate();
    let mm: number | string = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;

    let HH: number | string = date.getHours();
    let MM: number | string = date.getMinutes();
    if (HH < 10) HH = `0${HH}`;
    if (MM < 10) MM = `0${MM}`;

    return `${mm}-${dd}-${yyyy} ${HH}:${MM}`;
  };

  const brushTickFormatter = (payload: any, index: number): React.ReactText => {
    try {
      return formatDate(new Date(payload));
    } catch {
      return "";
    }
  };

  const handleLegendMouseEnter = (event: any) => {
    let className = event.payload.name as string;
    if (opacity) {
      Object.keys(opacity).forEach((value) => {
        if (value !== className) opacity[value] = 0.2;
      });
      setOpacity({ ...opacity });
    }
  };

  const handleLegendMouseLeave = (event: any) => {
    if (opacity) {
      Object.keys(opacity).forEach((value) => (opacity[value] = 1));
      setOpacity({ ...opacity });
    }
  };

  const handleBrushChange = (change: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setBrushStart(change.startIndex);
      setBrushEnd(change.endIndex);
    }, 200);
  };

  const handleBrushKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "z") {
      setBrushStart(0);
      setBrushEnd(undefined);
    }
  };

  return (
    <AreaChart
      width={width}
      height={height}
      data={sampleListState.samples.map((sample) => sample.toJSON())}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis
        dataKey="date"
        tick={({ x, y, payload }) => {
          let date: Date = payload.value as Date;
          if (date) {
            return (
              <text x={x - 30} y={y + 15}>
                {`${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()}`}
              </text>
            );
          } else {
            return <text></text>;
          }
        }}
        interval={Math.floor(sampleListState.samples.length / 6)}
        type="category"
        allowDuplicatedCategory={false}
      />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      {classSelectState.classes?.map((_class, index) =>
        _class ? (
          <Area
            dataKey={(sample: Sample) => {
              let value = sample.values
                .find((obj) => obj["class_id"] === _class.id)
                ?.values.find(
                  (value) => value.method === sampleListState.method
                )?.value;
              return value;
            }}
            isAnimationActive={false}
            stackId="a"
            fill={palette[index % palette.length]}
            strokeOpacity={opacity ? opacity[_class.name] : 1}
            fillOpacity={opacity ? opacity[_class.name] : 1}
            name={_class.name}
            key={_class.name}
            activeDot={{
              onClick: (event, data) => {
                let dataWithPayload = data as any;
                let payload = dataWithPayload.payload;
                let sample = payload as Sample;
                handleClickOpen(sample);
              },
            }}
          />
        ) : (
          <></>
        )
      )}
      <Tooltip
        content={
          <CustomTooltip
            selectedClasses={classSelectState.classes}
            palette={palette}
          />
        }
        isAnimationActive={false}
        position={{ y: 50 }}
      />
      <Brush
        dataKey="date"
        startIndex={brushStart}
        endIndex={brushEnd}
        tickFormatter={brushTickFormatter}
        onChange={handleBrushChange}
        onKeyPress={handleBrushKeyDown}
      />
      <Legend
        onMouseEnter={handleLegendMouseEnter}
        onMouseLeave={handleLegendMouseLeave}
      />
    </AreaChart>
  );
};

export default AreaGraphType;
