import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import {HeaderPropsType} from "./HeaderContainer";


const Header = (props: HeaderPropsType) => {
    return <header className={s.header}>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div><button style={{display: 'contents', fontSize: 17, color: 'white'}} onClick={props.logout}>Log out  </button>  </div>
            :<NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;