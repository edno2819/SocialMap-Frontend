import React from 'react'
import { useNavigate } from 'react-router-dom'
import server from '../../api/server'
import { toast } from 'react-toastify';

import HomeLauch from '../../components/LoginAndRegister/HomeLauch'
import RegisterForm from '../../components/LoginAndRegister/RegisterForm'


const Signup = () => {
  const navigate = useNavigate()

  const handleRegister = async (name: string, user: string, password: string) => {

    try {
      await server.post('/unsecurity/register', {
        name: name,
        user: user,
        password: password
      })
      toast.success('Conta criada!');
      navigate('/')

    } catch (err) {
      toast.warning('Não foi possível criar o usuário!');
    }
  }

  return (
    <HomeLauch>
      <RegisterForm onSubmitForm={handleRegister} onRouteLink={'/'} />
    </ HomeLauch>
  );
}


export default Signup