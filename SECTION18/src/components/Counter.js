
import {useSelector,useDispatch} from "react-redux";
import { counterActions } from "../store/counter";

import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector(state=> state.counter.counter);
  const dispatch = useDispatch();
  const show = useSelector(state => state.counter.showCounter);


  const incrementHandler = () =>{
    dispatch(counterActions.increment());
  }

  const decrementHandler= () =>{
    dispatch(counterActions.decrement());
  }

  const increaseHandler=()=>{
    dispatch(counterActions.increase(5)); //리덕스 툴킷이 자동으로 타입을 정해주고 , payload에 인자값을 넣어
  }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>›
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};



export default Counter;
