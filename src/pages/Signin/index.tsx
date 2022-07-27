import React from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import server from '../../api/server'

import HomeLauch from '../../components/LoginAndRegister/HomeLauch'
import FormLogin from '../../components/LoginAndRegister/FormLogin'


interface TokenUser {
  name: string,
  user: string;
  profile_id: string;
}

const Signin = () => {
  const navigate = useNavigate()

  const handleLogin = async (user: string, password: string) => {
    try {
      const response = await server.post('/unsecurity/login', {
        user: user,
        password: password,
      })
      const { accessToken } = response.data
      localStorage.setItem('accessToken', accessToken)
      const decoded = jwt_decode(accessToken) as TokenUser
      console.log(decoded)
      localStorage.setItem("name", decoded.name)
      localStorage.setItem("user", decoded.user)
      localStorage.setItem("profile", decoded.profile_id)
      navigate('/home')

    } catch (err) {
      console.log(err)
      alert("Não foi possível realizar o login!")
    }

  }

  return (
    <div>
      <HomeLauch>
        <FormLogin onSubmitForm={handleLogin} onRouteLink={'/register'}/>
      </ HomeLauch>
    </div>
  )
}

export default Signin