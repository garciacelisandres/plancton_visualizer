import { Class } from "../model/Class";
import { Sample } from "../model/Sample";
import server from "../server/ServerCall";

class SampleStore {
  _state: Sample[];
  constructor() {
    this._state = [];
  }

  getState(): Sample[] {
    return this._state;
  }

  async updateState(
    start_time: Date | undefined = undefined,
    end_time: Date | undefined = undefined,
    sample_classes: Class[] | undefined = undefined,
    quant_method: undefined = undefined
  ): Promise<void> {
    let samples = await server.getSamples(start_time, end_time, sample_classes, quant_method);
    this._state = samples;
  }
}

var store = new SampleStore();

export default store;
