import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../redux/authSlice/authThunkActions'
import './Users.scss'

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.authSlice.users);
  const isLoading = useSelector((state) => state.authSlice.isLoading)

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className='catUsersPage'>
      <h2>Пользователи</h2>
      {isLoading ? (<div>Загрузка ...</div>) :
      (<div className="allCatUsers">
      {users.length ?  (
        users.map(user => (
          <div id={user.id} key={user._id}>
            <div className='smallUser'>
              <div className='userInfo'>
                <div className='smallUserName'>{user.login}</div>
                <div className='smallUserAge'>Возраст: {new Date().getFullYear() - new Date(user.birthDate).getFullYear()}</div>
              </div>
              <img src = {`http://localhost:3000/Images/${user.avatar}`} className='userImg' alt='Аватарка'/>
            </div>
          </div>
      ))
    ) : ( 
      <h4>Пользователей нет</h4>
    )}
    </div>)}
    </div>
  );
}
