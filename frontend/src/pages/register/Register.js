import React, { useState } from 'react'
import './Register.css'
import api from '../../services/api'

import Form from '../../components/form/Form'
import Error from '../../components/error/Error'

export default function Register({ history }) {
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState(null)

    const handleSubmitUser = async event => {
        event.preventDefault()

        const response = await api.post('/user/new', {
            email,
            nickname,
            phone,
            password
        })

        
        if(response.data.success) {
            history.push('/login')
        } else {
            setErrors(response.data)
        }

    }

    const state = {
        email,
        setEmail,
        password,
        setPassword,
    }

    const info = {
        title: 'Crie a sua conta. É grátis!',
        btnTitle: 'Cadastre-se',
        footerText: 'Já tem uma conta?',
        footerLink: 'login',
        footerLinkText: 'Entrar'
    }

    return (
        <div className="container">
            <div className="row form-register">
                <div className="col-md-8 col-lg-6 mx-auto my-5">
                    
                   { errors && <Error error={errors.error} />}

                    <Form values={info} state={state} handleSubmit={handleSubmitUser} >
                        <div className="my-4">
                            <label htmlFor="nickname" className="text-left">
                                <strong>Apelido</strong>
                                <small className="text-muted"> Como Aparecerá em seus anúncios.</small>
                            </label>
                            <input
                                type="text"
                                name="nickname"
                                className="form-control input-height light-grey"
                                placeholder="Exemplo: João S."
                                value={nickname}
                                onChange={event => setNickname(event.target.value)}
                                required
                            />
                        </div>
                        <div className="my-4">
                            <label htmlFor="phone" className="text-left">
                                <strong>Telefone</strong>
                                <small className="text-muted"> Opcional.</small>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                className="form-control input-height light-grey"
                                value={phone}
                                onChange={event => setPhone(event.target.value)}
                                required
                            />
                        </div>
                    </Form>
                    <small className="policy">Ao continuar, você concorda com os <strong className="text-purple">Termos de Uso</strong> e a <strong className="text-purple">Política de Privacidade</strong> da OLX, e também, em receber comunicações via e-mail e push da OLX e seus parceiros.</small>
                </div>
            </div>
        </div>
    )
}
