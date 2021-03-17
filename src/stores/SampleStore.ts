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

  updateState(): void {
    server.getSamples().then((samples: Sample[]) => {
      console.log(samples)
      this._state = samples;
    });
  }
}

var store = new SampleStore();

export default store;
