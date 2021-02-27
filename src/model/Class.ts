export interface IClass {
  id: string;
  name: string;
}

export class Class implements IClass {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
