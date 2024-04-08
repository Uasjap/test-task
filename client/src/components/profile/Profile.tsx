import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setUser } from '../../redux/authSlice/authSlice';
import { fetchUpdateUser } from '../../redux/authSlice/authThunkActions';
import './Profile.scss'


export default function Profile() {
  const user = useAppSelector(state => state.authSlice.user);
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false)
  const [newLogin, setNewLogin] = useState(user.login)
  const [newPassword, setNewPassword] = useState(user.password)
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    setNewLogin(user.login)
  }, [user])

  const handleEdit = () => {
    setIsEditing(true)
  }
  const handleSave = () => {
    const formData = new FormData();
    formData.append('login', newLogin);
    formData.append('password', newPassword);
    if (newAvatar) {
      formData.append('avatar', newAvatar);
    }
    dispatch(fetchUpdateUser(formData));
    setIsEditing(false)
  }

  return (
    <div className='profileContainer'>
      <div className='regLogHeader'>Профиль</div>
      {isEditing ? (
        <form className='regLogForm'>
          <input className='regLogInput' name='newLogin' value={newLogin} type='text' onChange={e => setNewLogin(e.target.value)} />
          <input className='regLogInput' type='password' onChange={e => setNewPassword(e.target.value)} />
          <input className='regLogInput' type='file' onChange={e => setNewAvatar(e.target.files[0])} />
          <button className='primaryButton' onClick={handleSave}>Сохранить</button>
        </form>
      ) : (
        <>
        <div className='userDetails'>
          <div className='userName'>Логин: {user.login} </div>
          <img className='profileImg' src = {`http://localhost:3000/Images/${user.avatar}`} alt='Аватарка'/>
        </div>
        <button className='primaryButton' onClick={handleEdit}>Редактировать</button>
        </>
      )}
    </div>
  )
}
