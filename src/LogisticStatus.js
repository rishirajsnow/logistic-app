import React, { useEffect, useReducer } from 'react';
import './App.css';
import axios from 'axios';
import { cartReducer } from './cartReducer';
import Products from './Products';


const LogisticStatus=()=>{
    const [state,dispatch]=useReducer(cartReducer,{
        products: [],
        
      });
      console.log(state);
      const fetchProducts=async()=>{
       const {data}= await axios.get('http://localhost:8000/status');
       dispatch({
        type:"ADD_PRODUCTS",
        payload:data,
       });
     console.log(data[0]);
      }
    
      useEffect(()=>{
        fetchProducts();
      },[])
      return (
        <div >

<Products state={state} dispatch={dispatch}/>
        </div>
      );

}

export default LogisticStatus;