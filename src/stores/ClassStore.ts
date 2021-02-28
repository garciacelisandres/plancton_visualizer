import { Class } from "../model/Class";
import server from "../server/ServerCall";

import sampleStore from "./SampleStore"

class ClassStore {
  _observers: Function[];
  _state: Class[];
  _selected: Class | undefined;
  _selectObservers: Function[];
  constructor() {
    this._observers = [];
    this._state = [];
    this._selected = undefined;
    this._selectObservers = [];
  }

  attach(obj: Function): void {
    this._observers.push(obj);
  }

  dettach(obj: Function): void {
    this._observers.filter((obs) => obs);
  }

  getState(): Class[] {
    return this._state;
  }

  attachSelect(obj: Function): void {
    this._selectObservers.push(obj)
  }

  dettachSelect(obj: Function): void {
    this._observers.filter((obs) => obs);
  }

  setSelected(select: Class | undefined): void {
    if (select) {
      this._selected = select
      this._selectObservers.forEach(obs => {
        obs.call(undefined, select)
      })
    }
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
