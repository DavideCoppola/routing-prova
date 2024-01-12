import { observer } from "mobx-react";
import { ICounterStore } from "../store/CounterStore";
interface CounterProps {
  counterStore: ICounterStore
}

const Counter = observer( (props: CounterProps) => {
  return (
    <>
    <div style={{ alignItems: 'center', textAlign: 'center'}}>
      <p>Count is: {props.counterStore.count}</p>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
      <button onClick={() => props.counterStore.increment()}>
        Increase
      </button>
      <button onClick={() => props.counterStore.decrement()}>
        decrease
      </button>
    </div>
    </>
  );
});

export default Counter;