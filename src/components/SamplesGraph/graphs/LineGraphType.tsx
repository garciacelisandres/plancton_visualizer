import React, { useState } from "react";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClassSelectState } from "../../../contexts/reducers/classSelect/ClassSelectState";
import { SampleListState } from "../../../contexts/reducers/sampleList/SampleListState";
import { Sample } from "../../../model/Sample";

import palette from "../../../util/ColorPalette";

import "./GraphsStyle.css";

interface Props {
  sampleListState: SampleListState;
  classSelectState: ClassSelectState;
  width: number;
  height: number;
  handleClickOpen: (sample: Sample) => void;
}

const LineGraphType: React.FC<Props> = ({
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
    <LineChart
      width={width}
      height={height}
      data={sampleListState.samples.map((sample) => sample.toJSON())}
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
        type="category"
        allowDuplicatedCategory={false}
      />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      {classSelectState.classes?.map((_class, index) =>
        _class ? (
          <Line
            name={_class.name}
            type="monotone"
            dataKey={(sample: Sample) => {
              let value = sample.values
                .find((obj) => obj["class_id"] === _class.id)
                ?.values.find(
                  (value) => value.method === sampleListState.method
                )?.value;
              return value;
            }}
            stroke={palette[index % palette.length]}
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
      <Brush dataKey="date" tickFormatter={brushTickFormatter} />
      <Legend />
    </LineChart>
  );
};

const CustomTooltip = ({ active, payload, selectedClasses, palette }: any) => {
  if (active && payload && payload.length) {
    let date: Date = payload[0].payload.date;
    return (
      <div className="custom-tooltip">
        <div className="intro">
          <p>
            Date:{" "}
            {`${date.toDateString()}, ${date.toTimeString().substring(0, 9)}`}
          </p>
        </div>
        <div className="label">
          {payload
            .sort((a: any, b: any) => b.value - a.value)
            .slice(0, 5)
            .map((each: any, index: number) => ({
              selectedClass: selectedClasses[index].name,
              value: each.value,
              index: index,
            }))
            .sort((a: any, b: any) => b.value - a.value)
            .map(
              (tuple: {
                selectedClass: string;
                value: number;
                index: number;
              }) => (
                <p
                  key={tuple.index}
                  style={{ color: `${palette[tuple.index % palette.length]}` }}
                >{`${tuple.selectedClass} : ${tuple.value.toFixed(5)}`}</p>
              )
            )}
        </div>
      </div>
    );
  }

  return null;
};

export default LineGraphType;
