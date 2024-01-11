import { makeObservable, observable, action } from "mobx";

export interface ICounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

class CounterStore implements ICounterStore {
  count: number = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action
    });
  }

  increment() {
    this.count++;
  }

  decrement(){
    this.count--;
  }
}

export default new CounterStore();