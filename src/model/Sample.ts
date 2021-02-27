export type Value = {
  class_id: string;
  value: number;
};

export class Sample {
  id: string;
  name: string;
  date: Date;
  values: Value[];

  constructor(id: string, name: string, date: Date, values: Value[]) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.values = values;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      date: this.date.toDateString(),
      values: this.values,
    };
  }
}
