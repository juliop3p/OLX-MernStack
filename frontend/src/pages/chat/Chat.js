import React, { useState, useEffect } from "react";
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import api from '../../services/api'

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default function Chat({ history }) {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const authorization = localStorage.getItem('Authorization')
    const isAuthenticated = async () => {
        const response = await api.get('/validate-token', {
            headers: { authorization }
        })
        setIsAuth(response.data)
        
        !response.data && history.push('/login')
    }
    isAuthenticated()
  })

  return isAuth ? (
    <>
      <Navbar />

      <div className="container py-5 chat-container">
        <div className="row height-100">
          <ScrollToBottom className="col-12 h-100 col-md-4 card overflow-hidden">
            <div className="row product-chat-container align-items-center mr-1">
              <img
                src="https://catalogo.webmotors.com.br/imagens/prod/347686/HYUNDAI_HB20_1.0_UNIQUE_12V_FLEX_4P_MANUAL_34768609355073890.png?s=fill&w=440&h=330&q=80&t=true"
                className="img-fluid img-product img-product-chat mt-3 ml-3"
                alt="produto a venda"
              />
              <div className="col">
                <p>HB20s 1.6 Premium (2016) - Automático</p>
                <i className="fas fa-circle text-success mr-2"></i>
                <strong>juliop2p</strong>
              </div>
            </div>
          </ScrollToBottom>
          <div className="col-12 col-md-8 h-100 card justify-content-between m-0">
            <div className="row m-3 align-items-center justify-content-between">
              <strong>juliop3p</strong>

              <small className="text-purple cursor-pointer">Ver Anúncio</small>
            </div>
              <ScrollToBottom className="col chat-field overflow-hidden py-4">
                  <div className="chat-msg my-2">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, nostrum magni sint sunt et ipsam provident alias incidunt amet, debitis mollitia fugiat harum dolorum. Eum necessitatibus at iure laudantium in.
                    </p>
                  </div>

                  <div className="chat-msg me">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odio qui, blanditiis vel molestiae fuga.</p>
                  </div>
              </ScrollToBottom>
            <form className="row input-chat">
              <input 
                type="text" 
                placeholder="Digite uma mensagem..." 
              />
              <button>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) :
  <div className="loading">
    <h1><span className="text-purple">Lo</span><span className="text-warning">adi</span><span className="text-orange">ng</span> <span className="text-danger">.</span><span className="text-warning">.</span><span className="text-primary">.</span></h1>
  </div>
}
