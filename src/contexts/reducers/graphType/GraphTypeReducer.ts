import { ACTION_GRAPH_TYPE_UPDATE, GraphTypeAction } from "./GraphTypeActions";
import {
  GraphTypeState,
  BarChartState,
  LineGraphState,
  TypesList,
} from "./GraphTypeState";

export default (state: GraphTypeState, action: GraphTypeAction) => {
  switch (action.type) {
    case ACTION_GRAPH_TYPE_UPDATE: {
      switch (action.typeName) {
        case TypesList.bar:
          let barChartState: BarChartState = { name: "bar" };
          return barChartState;
        case TypesList.line:
          let lineGraphState: LineGraphState = { name: "line" };
          return lineGraphState;
        default:
          return state;
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
