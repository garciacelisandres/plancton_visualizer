import "./GraphsStyle.css";

import React from "react";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClassSelectState } from "../../../contexts/reducers/classSelect/ClassSelectState";
import { SampleListState } from "../../../contexts/reducers/sampleList/SampleListState";
import { Sample } from "../../../model/Sample";

import palette from "../../../util/ColorPalette";
import CustomTooltip from "../util/CustomTooltip";

interface Props {
  sampleListState: SampleListState;
  classSelectState: ClassSelectState;
  width: number;
  height: number;
  handleClickOpen: (sample: Sample) => void;
}

const BarGraphType: React.FC<Props> = ({
  sampleListState,
  classSelectState,
  width,
  height,
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
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
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
                {`${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()}`}
              </text>
            );
          }}
          interval={Math.floor(sampleListState.samples.length / 6)}
          type="category"
          allowDuplicatedCategory={false}
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
              fill={palette[index % palette.length]}
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
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraphType;
