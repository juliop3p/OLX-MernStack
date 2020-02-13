import React from 'react'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <hr/>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-lg-8 mx-auto">
                        <div className="row my-3">
                            <ul className="d-flex footer-list">
                                <li className="mr-3">Ajuda e contato</li>
                                <li className="mr-3">Dicas de segurança</li>
                                <li className="mr-3">Vender na OLX</li>
                                <li className="mr-3">Plano Profissional</li>
                            </ul>
                        </div>
                        <div className="row my-5 footer-copy">
                            <small><span className="underline">Sobre a OLX</span>, <span className="underline">Termos de uso</span> e <span className="underline">Política de privacidade</span></small>
                            <small className="text-capitalize">&copy; bom negócio atividades de internet ltda. rua do catete, 359, flamengo - 222220-001 - rio de janeiro, RJ</small>
                        </div>
                    </div>
                    <div className="col col-lg-4 my-3">
                    <hr className="d-block d-lg-none"/>
                        <div className="row icons justify-content-center">
                            <ul className="list-icons d-flex">
                                <li className="facebook mx-3">
                                    <i className="fab fa-facebook-f "></i>
                                </li>
                                <li className="youtube mx-3">
                                    <i className="fab fa-youtube "></i>
                                </li>
                                <li className="linkedin mx-3">
                                    <i className="fab fa-linkedin-in "></i>
                                </li>
                                <li className="instagram mx-3">
                                    <i className="fab fa-instagram "></i>
                                </li>
                                <li className="twitter ml-3">
                                    <i className="fab fa-twitter "></i>
                                </li>
                            </ul>
                            <div className="col-12 text-right mx-auto">
                                <p className="ads text-muted">Comprar ou alugar imoveis no <span className="underline">Storia Imóveis</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
