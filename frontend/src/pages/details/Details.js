import React, { useState, useEffect } from 'react'
import './Details.css'
import queryString from 'query-string'
import api from '../../services/api'

import { Link } from 'react-router-dom'

import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import noImg from '../../assets/no-image-icon.png'


export default function Details({ location }) {
    const [product, setProduct] = useState([])
    const [user, setUser] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    
    useEffect(() => {
        const { _id } = queryString.parse(location.search)

        const loadProduct = async () => {
            const response = await api.get(`/product/${_id}`)
            setProduct(response.data.product)
            setUser(response.data.user)
            setIsLoaded(true)
        }
        loadProduct()
    }, [location.search])


    return isLoaded && (
        <>
            <Navbar />
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-5 py-4">
                        <h3 className="ml-3">{product.title}</h3>
                        <img 
                            src={product.img ? `http://localhost:8080/files/${product.img}` : noImg} 
                            alt="product"
                            className="img-fluid img-product img-product-details my-3 mx-auto"
                        />
                        <span className="lead price ml-3">R$ {product.price ? product.price : '0'}</span>
                        <div className="col-10 my-3">
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 mr-auto mx-3">
                        <div className="price-personalized my-3">
                            <h2>R$ {product.price ? product.price : '0'}</h2>
                        </div>
                        <div className="card user-info text-center py-4">
                            <h4>{user.nickname}</h4>
                            <Link 
                                to={`/chat?user=${user._id}&product=${product._id}`}
                                params={{ user}}
                                className="btn btn-orange w-50 mx-auto my-3"
                            >
                                Iniciar chat
                            </Link>

                            <hr className="mx-4"/>

                            <small>E-mail: {user.email}</small>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
