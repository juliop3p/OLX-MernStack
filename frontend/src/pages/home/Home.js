import React from 'react'
import './Home.css'

import Navbar from '../../components/navbar/Navbar'
import NavByCategory from '../../components/nav-category/NavByCategory'
import ProductItem from '../../components/product-item/ProductItem'
import Footer from '../../components/footer/Footer'
import Pagination from '../../components/pagination/Pagination'

import { ProductConsumer } from '../../context'

export default function Home() {
    return (
        <>
            <Navbar />
            <NavByCategory />

            <div className="container">
                <div className="row">
                    <ProductConsumer>
                        {value => {
                            const { products, page, setPage, pagination } = value.state
                            return (
                                <>
                                    {products.length > 0 && products.map(product => (
                                        <ProductItem key={product._id} values={product} />
                                    ))}
                                    {products.length < 1 &&
                                        (
                                            <div className="container my-5">
                                                <div className="row my-5 text-center">
                                                    <div className="col">
                                                        <h3 className="text-purple">Nenhum produto cadastrado nessa categoria...</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {products.length > 0 && <Pagination page={page} setPage={setPage}  pagination={pagination} />}
                                </>

                            )
                        
                        }}
                    </ProductConsumer>
                </div>
            </div>

            <Footer />
        </>
    )
}
