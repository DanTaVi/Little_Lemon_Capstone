import React from 'react';
import './App.css';
import MenuLogo from './HamburgerMenuLogo.png';
import CompLogo from './Little_Lemon.jpg';
import CartLogo from './ShoppingCart.png';

const Navigation = () =>{
    return(
        <nav className ="NavBar">
            <img src ={MenuLogo} alt ="Menu Logo" className ="MenuLogo"/>
            <img src ={CompLogo} alt ="Company Logo" className ="CompLogo"/>
            <img src ={CartLogo} alt ="Cart Logo" className ="CartLogo" />
        </nav>
    );
};

export default Navigation;