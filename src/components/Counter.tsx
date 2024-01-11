import { observer } from "mobx-react";
import { ICounterStore } from "../store/CounterStore";

const Counter = observer( ({ store } : {store: ICounterStore}) => {
  return (
    <>
    <div style={{ alignItems: 'center', textAlign: 'center'}}>
      <p>Count is: {store.count}</p>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
      <button onClick={() => store.increment()}>
        Increase
      </button>
      <button onClick={() => store.decrement()}>
        decrease
      </button>
    </div>
    </>
  );
});

export default Counter;