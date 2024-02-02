import { generateRandomId } from "./IdGenerator";

export type ObjectWithId = {
  id?: string;
  [key: string]: string | Date | boolean | undefined;
};

export class DataBase<T extends ObjectWithId> {
  private elements = new Array<T>();

  public async insert(arg: T) {
    arg.id = generateRandomId();
    this.elements.push(arg);
    return arg.id;
  }

  public async getBy<K extends keyof T>(argName: K, argValue: T[K]) {
    return this.elements.find((x) => x[argName] === argValue);
  }

  public async findAllBy<K extends keyof T>(argName: K, argValue: T[K]) {
    return this.elements.filter((x) => x[argName] === argValue);
  }

  public async update<K extends keyof T>(
    id: string,
    argName: K,
    argValue: T[K]
  ) {
    const index = this.elements.findIndex((x) => x.id === id);
    this.elements[index][argName] = argValue;
  }

  public async delete(id: string) {
    const index = this.elements.findIndex((x) => x.id === id);
    this.elements.splice(index, 1);
  }

  public async getAllElements() {
    return this.elements;
  }
}
