import {useContext , useEffect, useState} from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"

import CartContext from "../store/cart-context";


const HeaderCartButton =props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const numberOfCartItems  = items.reduce((acc,cur)=>{
        return acc+ cur.amount;
    },0);
    //장바구니에서 담긴 아이템이 담긴 배열의 길이로 카트 아이템의 숫자를 세기



    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(()=>{
        if(items.length ===0){
            return;
        }
        setBtnIsHighlighted(true);

       const timer= setTimeout(()=>{
            setBtnIsHighlighted(false);
        },300);
        //타이머 또는 실행 중 있을 수 있는 사이드 이펙트는 정리하는 것이 좋다 클린업 함수로 정리
       return ()=>{
           clearTimeout(timer);
       }
    },[items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span >Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>


    </button>
}



export default HeaderCartButton;