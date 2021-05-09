// Update this when adding new types!
export enum TypesList {
  "line",
  "bar",
  "area",
}

export type LineGraphState = { name: "line" };
export type BarChartState = { name: "bar" };
export type AreaChartState = { name: "area" };

export type GraphTypeState = LineGraphState | BarChartState | AreaChartState;
