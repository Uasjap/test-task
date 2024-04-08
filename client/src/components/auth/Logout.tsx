import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { fetchSignOut } from '../../redux/authSlice/authThunkActions';
import { useNavigate } from 'react-router-dom';
import './auth.scss';

export default function Logout(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleLogout = (): void => {
    dispatch(fetchSignOut())
    .then(() => {
    navigate('/')
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <button className='logOutButton' type='button' onClick={handleLogout}>Выйти</button>
  )
}
