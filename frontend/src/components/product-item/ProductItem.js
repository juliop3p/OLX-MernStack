import React from 'react'
import './ProductItem.css'
import { Link } from 'react-router-dom'
import noImg from '../../assets/no-image-icon.png'

export default function ProductItem({ values }) {
    return (
            <Link className="col-6 col-md-4 my-4 col-lg-3 product-item" to={`/details?_id=${values._id}`}>
                <img src={values.img ? `http://localhost:8080/files/${values.img}` : noImg} className="img-fluid img-product" alt="produto a venda"/>
                <p>{values.title}</p>
                <strong>R$ {values.price}</strong>
            </Link>
    )
}
