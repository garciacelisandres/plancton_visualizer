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

  updateState(): void {
    server.getClasses().then((classes: Class[]) => {
      this._state = classes;
    });
  }
}

var store = new ClassStore();

export default store;
