import React from 'react'
import './ProductDashboard.css'
import { Link } from 'react-router-dom'
import noImg from '../../assets/no-image-icon.png'

export default function ProductDashboard({ values, destroyProduct, editProduct }) {
    return (
        <div className="container">
            <div className="row">
                <Link to={`/details?_id=${values._id}`}>
                    <img src={values.img ? `http://localhost:8080/files/${values.img}` : noImg} className="img-fluid img-product img-product-dashboard" alt="produto a venda"/>
                </Link>
                <div className="col">
                    <div>
                        <p>{values.title}</p>
                        <strong>{values.price}</strong>
                    </div>
                    <div className=" d-flex">
                        <div 
                            className="icon-dashboard"
                            onClick={() => editProduct(values)}
                        >
                            <i className="far fa-edit mr-2"></i> Editar
                        </div>

                        <div className="icon-dashboard">
                            <i className="far fa-thumbs-up mr-2"></i> Já vendi
                        </div>

                        <div 
                            className="icon-dashboard"
                            onClick={() => destroyProduct(values._id)}
                        >
                            <i className="fas fa-trash mr-2"></i> Excluir
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    )
}
