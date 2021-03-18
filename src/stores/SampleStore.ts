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

  async updateState(): Promise<void> {
    let samples = await server.getSamples()
    this._state = samples;
  }
}

var store = new SampleStore();

export default store;
