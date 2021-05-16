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
  const palette = [
    "#d36135",
    "#7fb069",
    "#ece4b7",
    "#e6aa68",
    "#02020b",
    "#161032",
    "#faff81",
    "#ffc53a",
    "#e06d06",
    "#b26700",
  ];

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
        interval={Math.floor(sampleListState.samples.length/6)}
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
  const [showClasses, setShowClasses] = useState<boolean>(false)
  if (active && payload && payload.length) {
    let date: Date = payload[0].payload.date;
    return (
      <div className="custom-tooltip">
        <div className="intro">
          <p>Date: {`${date.toDateString()}, ${date.toTimeString().substring(0, 9)}`}</p>
          <button onClick={() => setShowClasses(!showClasses)}>Show classes</button>
        </div>
        <div className="label">
          {showClasses && payload.map((each: any, index: number) => (
            <p
              key={index}
              style={{ color: `${palette[index % palette.length]}` }}
            >{`${selectedClasses[index].name} : ${each.value}`}</p>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default LineGraphType;
