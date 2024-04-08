import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration'
import Navbar from './components/navbar/Navbar'
import Profile from './components/profile/Profile'
import Users from './components/users/Users'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path='/register' element={<Registration/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/users' element={<Users/>}/>
     </Routes>
    </>
  )
}

export default App
