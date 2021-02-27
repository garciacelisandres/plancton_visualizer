import { Class } from "../model/Class";
import server from "../server/ServerCall";

import sampleStore from "./SampleStore"

class ClassStore {
  _observers: any[];
  _state: Class[];
  _selected: Class | undefined;
  constructor() {
    this._observers = [];
    this._state = [];
    this._selected = undefined;
  }

  attach(obj: Object): void {
    this._observers.push(obj);
  }

  dettach(obj: Object): void {
    this._observers.filter((obs) => obs);
  }

  getState(): Class[] {
    return this._state;
  }

  setSelected(select: Class | undefined): void {
    if (select) this._selected = select
  }

  getSelected(): Class | undefined {
    return this._selected;
  }

  async updateState(): Promise<void> {
    let classes = await server.getClasses();
    this._state = classes;
    this._observers.forEach((obs) => obs.call(undefined, classes));
    sampleStore.updateState()
  }
}

var store = new ClassStore();

export default store;
