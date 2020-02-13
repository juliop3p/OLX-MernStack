import React from 'react'
import './Login.css'

import Form from '../../components/form/Form'
import Error from '../../components/error/Error'

import { ProductConsumer } from '../../context'

export default function Login({ history }) {
    
    const info = {
        title: 'Acesse a sua conta',
        btnTitle: 'Entrar',
        footerText: 'Não tem uma conta?',
        footerLink: 'register',
        footerLinkText: 'Cadastre-se'
    }

    return (
        <div className="container">
            <div className="row form-login">
                <div className="col-md-8 col-lg-6 mx-auto my-5">
                    <ProductConsumer>
                        {value => {
                            const { login, state } = value
                            return (
                                <>
                                    {state.errors && <Error error={state.errors.error} />}
                                    <Form values={info} state={state} handleSubmit={login} history={history} />
                                </>

                            )
                        }}
                    </ProductConsumer>
                    <small className="policy">Ao continuar, você concorda com os <strong className="text-purple">Termos de Uso</strong> e a <strong className="text-purple">Política de Privacidade</strong> da OLX, e também, em receber comunicações via e-mail e push da OLX e seus parceiros.</small>
                </div>
            </div>
        </div>
    )
}
