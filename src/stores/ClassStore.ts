import { Class } from "../model/Class";
import server from "../server/ServerCall";

class ClassStore {
  _state: Class[];
  constructor() {
    this._state = [];
  }

  getState(): Class[] {
    return this._state;
  }

  async updateState(): Promise<void> {
    let classes = await server.getClasses();
    classes.sort(function (a, b) {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
    this._state = classes;
  }
}

var store = new ClassStore();

export default store;
