import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { fetchSignIn } from '../../redux/authSlice/authThunkActions';
import './auth.scss';



export default function Login():JSX.Element {
    const [data, setData] = useState({
        login: '',
        password: ''
    })
    const [message, setMessage] = useState<string| null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        dispatch(fetchSignIn(data))
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
        if(message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000)
            return () => {
                clearTimeout(timer)
            };
        }
    }, [message]);

  return (
    <div className='regLogContainer'>
        <div className='regLogHeader'>Авторизация</div>
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
            name='password'
            type='password'
            placeholder='Пароль'
            onChange={e => setData({...data, password: e.target.value})}
            />
            <button type='submit' className='primaryButton'>Войти</button>
        </form>
        {message && <div>{message}</div>}
        <div className='logRegAddInfo'>У вас уже есть аккаунт?</div>
        <button className='secondaryButton' onClick={() => navigate('/register')}>Создать</button>
    </div>
  )
}
