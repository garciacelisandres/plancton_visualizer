class ConstantRetrieval {
  readonly _ASLEEP_TIME: number = 1200000; // 20 minutes
  _started: boolean;

  constructor() {
    this._started = false;
  }
  async start(retrieveFunction: Function) {
    this._started = true;
    while (this._started) {
      await this._sleep(this._ASLEEP_TIME);
      retrieveFunction();
    }
  }
  async stop() {
    this._started = false;
  }
  _sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

const constantRetrieval = new ConstantRetrieval();

export default constantRetrieval;
