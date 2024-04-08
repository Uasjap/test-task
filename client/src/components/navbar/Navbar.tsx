import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import { checkUser } from '../../redux/authSlice/authThunkActions';
import './navbar.scss';


export default function Navbar(): JSX.Element {
    const user = useAppSelector((state) => state.authSlice.user)
    const dispatch = useAppDispatch()


    useEffect(()=>{
        (async function () {
            try {
               dispatch(checkUser())
            } catch (error) {
                console.log(error)
            }
        })()
    }, [user])

    return (
        <div className='navbar'>
            {user?.login ? (
                <>
                    <Link to="/profile"><button className='navbarBtnGrey' type='submit'>Профиль</button></Link>
                    <Link to="/users"> <button className='navbarBtnGrey' type='submit'>Пользователи</button></Link>
                    <Logout/>
                </>
            ) : (
                <>
                    <Link to="/register"> <button className='navbarBtnGrey' type='submit'>Регистрация</button></Link>
                    <Link to="/"> <button className='navbarBtnGrey' type='submit'>Авторизация</button></Link>
                </>
            )}
        </div>
    )
}
