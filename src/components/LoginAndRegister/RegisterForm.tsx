import React, { useState } from 'react'
import { CircularProgress, TextField } from '@mui/material';
import { Link } from 'react-router-dom'


import "./RegisterForm.css";


interface Props {
    onSubmitForm: any;
    onRouteLink: string;
}

const FormRegister = ({ onSubmitForm, onRouteLink }: Props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [name, setName] = useState({ value: "", error: "" });
    const [user, setUser] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [password2, setPassword2] = useState({ value: "", error: "" });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFetching(true)
        if (password.value===password2.value){
            onSubmitForm(name.value, user.value, password.value)
            setIsFetching(false)
        } else {
            alert("Senhas não correspondem!")
            setIsFetching(false)
        }
    }
    return (<>
        <form className="loginBox" onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                label="Nome"
                type="text"
                value={name.value} onChange={(e) => setName({ value: e.target.value, error: "" })}>
            </TextField>
            <TextField variant="outlined"
                label="Usuário"
                name='user'
                value={user.value}
                onChange={(e) => setUser({ value: e.target.value, error: "" })}>
            </TextField>
            <TextField
                variant="outlined"
                label="Senha"
                type="password"
                value={password.value} onChange={(e) => setPassword({ value: e.target.value, error: "" })}>
            </TextField>
            <TextField
                variant="outlined"
                label="Confirmar senha"
                type="password"
                value={password2.value} onChange={(e) => setPassword2({ value: e.target.value, error: "" })}>
            </TextField>

            <button className="loginButton" type="submit" disabled={isFetching}>
                {isFetching ? (<CircularProgress size="20px" />) : ("Registrar")}
            </button>

            <Link to={onRouteLink} className="linkButton" >
                Já é resgistrado? Logar!
            </Link>
        </form>
    </>
    );
}

export default FormRegister;