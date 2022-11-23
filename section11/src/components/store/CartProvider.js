import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items:[],
    totalAmount: 0
}

const cartReducer =(state,action) => {
    if(action.type ==="ADD_CART_ITEM"){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item=> item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else{
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount:  updatedTotalAmount
        };
    }
    if(action.type ==="REMOVE_CART_ITEM"){

        //기존의 장바구니를 업데이트 하는 것임
        const existingCartItemIndex = state.items.findIndex((item)=> item.id ===action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        //아이템 수량이 1이고
        if(existingItem.amount ===1){
            updatedItems = state.items.filter(item => item.id !== action.id); //새로운 배열 반환 filter로 없애고 싶은 것 빼고 나머지
        } else{
            //아이템 수량이 2이상이면 장바구니에 냅둬야함
            const updatedItem = { ...existingItem, amount: existingItem.amount -1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] =updatedItem;

        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }


    }
    return defaultCartState;
};


const CartProvider = props => {
    const [cartState,dispatchCartAction ] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item =>{
        dispatchCartAction({type: 'ADD_CART_ITEM', item: item});
    };
    const removeItemToCartHandler = id =>{
        dispatchCartAction({type: "REMOVE_CART_ITEM", id:id})
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default  CartProvider;