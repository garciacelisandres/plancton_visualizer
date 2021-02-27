import { Class } from "../model/Class";
import server from "../server/ServerCall";

class ClassStore {
  _observers: any[];
  _state: Class[];
  constructor() {
    this._observers = [];
    this._state = [];
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

  async updateState(): Promise<void> {
    let classes = await server.getClasses()
    this._state = classes;
    this._observers.forEach(obs => obs.call(undefined, classes))
  }
}

var store = new ClassStore();

export default store;
