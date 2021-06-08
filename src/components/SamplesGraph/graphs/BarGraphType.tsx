import "./GraphsStyle.css";

import React from "react";
import {
  Bar,
  BarChart,
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

const BarGraphType: React.FC<Props> = ({
  sampleListState,
  classSelectState,
  width,
  height,
  opacity,
  setOpacity,
  handleClickOpen,
}) => {
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
    return formatDate(new Date(payload));
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

  return (
    <BarChart
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
          return (
            <text x={x - 30} y={y + 15}>
              {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
            </text>
          );
        }}
        interval={Math.floor(sampleListState.samples.length / 6)}
      />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      {classSelectState.classes?.map((_class, index) =>
        _class ? (
          <Bar
            dataKey={(sample: Sample) => {
              let value = sample.values
                .find((obj) => obj["class_id"] === _class.id)
                ?.values.find(
                  (value) => value.method === sampleListState.method
                )?.value;
              return value;
            }}
            stackId="a"
            isAnimationActive={false}
            fill={palette[index % palette.length]}
            fillOpacity={opacity ? opacity[_class.name] : 1}
            name={_class.name}
            key={_class.name}
            onClick={handleClickOpen}
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
      <Brush dataKey="date" tickFormatter={brushTickFormatter} />
      <Legend
        onMouseEnter={handleLegendMouseEnter}
        onMouseLeave={handleLegendMouseLeave}
      />
    </BarChart>
  );
};

export default BarGraphType;
