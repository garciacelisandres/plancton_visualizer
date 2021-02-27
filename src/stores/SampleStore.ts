import { Sample } from "../model/Sample";
import server from "../server/ServerCall";

class SampleStore {
  _observers: Function[];
  _state: Sample[];
  constructor() {
    this._observers = [];
    this._state = [];
  }

  attach(obj: Function): void {
    this._observers.push(obj);
  }

  dettach(obj: Object): void {
    this._observers.filter((obs) => obs);
  }

  getState(): Sample[] {
    return this._state;
  }

  async updateState(): Promise<void> {
    let samples = await server.getSamples()
    this._state = samples;
    this._observers.forEach(obs => obs.call(undefined, samples))
  }
}

var store = new SampleStore();

export default store;
