import React, { useState } from "react"
import "./Navbar.css"
import logo from "../../assets/olx-logo.png"

import { Link } from "react-router-dom"
import { ProductConsumer } from "../../context"

export default function Navbar() {
  const [smallScreen, setSmallScreen] = useState(false)

  return (
    <ProductConsumer>
      {value => {
        const { isAuthenticated, setForm } = value.state
        const { logout } = value
        
        return (
          <nav className="navbar-olx">
            <div className="container-fluid border-bottom">
              <div className="row py-2 align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    className="pos-f-t d-block d-md-none"
                    onClick={() => setSmallScreen(!smallScreen)}
                  >
                    <nav className="navbar navbar-light">
                      <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarToggleExternalContent"
                        aria-controls="navbarToggleExternalContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>
                    </nav>
                  </div>

                  <div>
                    <Link to="/">
                      <img src={logo} alt="logo olx" className="olx-logo-small" />
                    </Link>
                  </div>
                </div>

                <div className="mt-3">
                  <ul className="d-flex align-items-center ">
                    <li 
                      className="mx-3 d-none d-md-block"
                      onClick={() => setForm(false)}
                    >
                      <Link to="/dashboard">
                        <i className="fas fa-th-large mr-2"></i>
                        Meus Anúncios
                      </Link>
                    </li>
                    {
                      !isAuthenticated &&
                      <li className="mx-3 d-none d-md-block">
                        <Link to="/login">
                          <i className="far fa-user mr-2"></i>
                          Entrar
                        </Link>
                      </li>
                    }
                    {
                      isAuthenticated &&
                      <li className="mx-3 d-none d-md-block">
                        <Link onClick={logout} to="/">
                          <i className="fas fa-sign-out-alt mr-2"></i>
                          Sair
                        </Link>
                      </li>
                    }
                    <li className="mx-3 d-none d-md-block">
                      <Link to="/chat">
                        <i className="far fa-comment mr-2"></i>
                        Chat
                      </Link>
                    </li>
                    <li className="mx-3">
                      <Link to="/dashboard">
                        <button 
                          className="btn btn-orange btn-nav"
                          onClick={() => setForm(true)}
                        >
                          Anunciar
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Nav for small screens */}
            {smallScreen && (
              <div className="container-fluid d-block d-md-none position-absolute">
                <div className="row">
                  <div className="col-8 col-sm-6 nav-small-screen">
                    <ul>
                      {
                        !isAuthenticated &&
                        <li className="mt-2">
                          <Link to="/login">Entrar</Link>
                        </li>
                      }
                      {
                        !isAuthenticated &&
                        <li>
                          <Link to="/dashboard">Cadastrar</Link>
                        </li>
                      }
                      { !isAuthenticated && <hr />}
                      <li>
                        <Link to="/dashboard">Meus Anúncios</Link>
                      </li>
                      <li>
                        <Link to="/chat">Chat</Link>
                      </li>
                      {
                        isAuthenticated &&
                        <li>
                          <Link onClick={logout} to="/" >Sair</Link>
                        </li>
                      }
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </nav>
        )
      }}
    </ProductConsumer>
  )
}
