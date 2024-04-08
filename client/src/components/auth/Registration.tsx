import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { fetchSignUp } from '../../redux/authSlice/authThunkActions';
import './auth.scss';


export default function Registration(): JSX.Element {
  const [data, setData] = useState({
    login: '',
    email: '',
    password: '',
    birthDate: new Date,
    gender: '',
    avatar: null as File | null
  })
  const [message, setMessage] = useState<string | null>(null)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
  
    dispatch(fetchSignUp(formData))
    .then((response) => {
      if (response.error) {
        setMessage(response.error.message);
      }
    })
    .catch((error) => {
      console.log(error)
    });        
}
  

  useEffect(() => {
    if(message){
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);

      return () => {
        clearTimeout(timer)
      };
    }
  }, [message])

  return (
    <div className='regLogContainer'>
      <div className='regLogHeader'>Регистрация</div>
      <form className='regLogForm' onSubmit={handleSubmit}>
        <input
        className='regLogInput'
        name='login'
        type='text'
        placeholder='Логин'
        onChange={e => setData({...data, login: e.target.value})}
        required
        />
        <input
        className='regLogInput'
        name='email'
        type='email'
        placeholder='E-mail'
        onChange={e => setData({...data, email: e.target.value})}
        required
        />
        <input
        className='regLogInput'
        name='password'
        type='password'
        placeholder='Пароль'
        onChange={e => setData({...data, password: e.target.value})}
        />
        <input
        className='regLogInput'
        name='birthDate'
        type='date'
        onChange={e => setData({...data, birthDate: new Date(e.target.value)})}
        required
        />
        <select
          className='regLogInput'
          name='gender'
          onChange={e => setData({...data, gender: e.target.value})}
          required
        >
          <option value="">Выберите пол</option>
          <option value="мужчина">Мужчина</option>
          <option value="женщина">Женщина</option>
        </select>
        <input type='file' className='regLogInput' name='avatar' onChange={e=> setData({...data, avatar:e.target.files[0]})}/>
<button type='submit' className='primaryButton'>Зарегистрироваться</button>
      </form>
      {message && <div>{message}</div>}
      <div className='logRegAddInfo'>У вас уже есть аккаунт?</div>
      <button type="button" className='secondaryButton' onClick={() => navigate('/')}>Войти</button>
    </div>
  )
}
