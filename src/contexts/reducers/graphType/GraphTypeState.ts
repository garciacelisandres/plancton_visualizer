// Update this when adding new types!
export enum TypesList {
    "line",
    "bar"
}

export type LineGraphState = { name: "line" };
export type BarChartState = { name: "bar" };

export type GraphTypeState = LineGraphState | BarChartState;
