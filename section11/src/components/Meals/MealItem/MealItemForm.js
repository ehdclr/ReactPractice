import {useRef, useState} from "react";

import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input";

const MealItemForm = props => {
    const amountInputRef = useRef();
    const [amountIsValid,setAmountIsValid] = useState(true);

    const submitHandler = (event) =>{

        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        //유효성 검사
        if(enteredAmount.trim().length===0 || enteredAmountNumber <1 || enteredAmountNumber>5){
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input ref={amountInputRef} label="amount" input={{id: "amount_" + props.id, type: "number", min: "1", max: "5", step: "1", defaultValue: "1"}}/>
        <button>+ Add</button>
        {!amountIsValid && <p>수량은 1-5사이로 입력해주세요.</p>}
    </form>
}


export default MealItemForm;