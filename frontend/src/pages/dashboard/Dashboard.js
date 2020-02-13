import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import api from '../../services/api'

// COMPONENTS
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ProductDashboard from '../../components/product-dashboard/ProductDashboard'
import FormProduct from '../../components/form-product/FormProduct'
import Pagination from '../../components/pagination/Pagination'

import { ProductConsumer } from '../../context'

export default function Dashboard({ history }) {
    const [isAuth, setIsAuth] = useState(false)

    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState(null)

    const [userProducts, setUserProducts] = useState([])
    const [quantity, setQuantity] = useState([])
    const [pageLoaded, setPageLoaded] = useState(false)

    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState([])

    const [success, setSuccess] = useState(null)

    const _id = localStorage.getItem('_id')
    const authorization = localStorage.getItem('Authorization')
    let setForm

    useEffect(() => {
        const isAuthenticated = async () => {
            const response = await api.get('/validate-token', {
                headers: { authorization }
            })
            setIsAuth(response.data)
            setPageLoaded(true)
            
            !response.data && history.push('/login')
        }
        isAuthenticated()
    }, [])

    const loadProducts = async () => {
        const response = await api.get(`/products/user?_id=${_id}&page=${page}`, {
            headers: { authorization }
        })

        setUserProducts(response.data.products)
        setQuantity(response.data.total)
        setPagination(response.data.pagination)
    }
    
    useEffect(() => {
        loadProducts()
    }, [page])


    const handleSubmitProduct = async event => {
        event.preventDefault()

        const data = new FormData()
        data.append('title', title)
        data.append('description', description)
        data.append('category', category)
        data.append('price', price)
        data.append('img', img)

        if(id !== '') {
            await api.put(`/product/${id}`, data, {
                headers: { authorization }
            })
        } else {
            await api.post('/product/new', data, {
                headers: { _id, authorization }
            })
        }

        loadProducts()
        setForm(false)
    }

    const destroyProduct = async _id => {
        const response = await api.delete(`/product/${_id}`, {
            headers: { authorization }
        })

        if(response.data.success) {
            setSuccess(response.data)
        } 
        setPage(1)
        loadProducts()
    }

    const editProduct = async product => {
        setId(product._id)
        setTitle(product.title)
        setDescription(product.description)
        setCategory(product.category)
        setImg(product.img)
        setPrice(product.price)

        setForm(true)
    }

    const state = {
        title,
        setTitle,
        description,
        setDescription,
        category, 
        setCategory,
        price, 
        setPrice,
        img, 
        setImg,
        id,
    }


    return pageLoaded && isAuth ? (
        <>
            <Navbar />
            <ProductConsumer>
                {value => {
                    const { form } = value.state
                    setForm = value.state.setForm

                    return form
                    ? ( <FormProduct state={state} handleSubmitProduct={handleSubmitProduct} /> )
                    : 
                    ( 
                        <>
                            <div className="container px-5">
                                <div className="row mt-5 align-items-center justify-content-center">
                                    { success && <p className="alert alert-success text-center">{success.success}</p> }
                                </div>
                                <div className="row my-5">
                                    <h3 className="dashboard-title">Meus Anúncios</h3>
                                </div>

                                <div className="row">
                                    <strong className="text-purple">Publicados ({quantity})</strong>
                                    <div className="col-12">
                                        <div className="border-purple"></div>
                                    </div>
                                </div>
                                
                            </div>
                            <hr/> 
                            { 
                                userProducts.length > 0 ?
                                    userProducts.map(product => (
                                        <ProductDashboard key={product._id} values={product} destroyProduct={destroyProduct} editProduct={editProduct} />
                                    ))
                                :
                                    (
                                        <div className="container">
                                            <div className="row align-items-center justify-content-center my-5 text-center">
                                                <div className="col">
                                                    <h3>Você não possuí nenhum anúncio cadastrado!</h3>
                                                    <p>Se quiser desapegar essa é a hora...</p>
                                                    <button 
                                                        onClick={() => setForm(true)}
                                                        className="btn btn-orange"
                                                    >
                                                        Desapegar!
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            } 
                            { userProducts.length > 0 && <Pagination page={page} setPage={setPage} pagination={pagination} />}
                        </>
                    )
                }}
            </ProductConsumer>

            <Footer />
        </>
    ) :
    <div className="loading">
        <h1><span className="text-purple">Lo</span><span className="text-warning">adi</span><span className="text-orange">ng</span> <span className="text-danger">.</span><span className="text-warning">.</span><span className="text-primary">.</span></h1>
    </div>
}
