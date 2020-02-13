import React from 'react'
import HorizontalScroll from 'react-scroll-horizontal'

import './NavByCategory.css'
import navIcons from '../utils/navIcons'
import { ProductConsumer } from '../../context'

export default function NavByCategory() {
    return (
        <section className="categories">
            <div className="container-fluid bg-purple">
                <div className="row parent-scroll flex-nowrap">
                    <HorizontalScroll className="scroll-horizontal" reverseScroll>
                        {
                            navIcons.map((icon, index) => (
                                <div className="icon-wrapper mx-4 mt-4" key={index}>
                                    <ProductConsumer>
                                        {value => {
                                            const { setCategory, setPage } = value.state
                                            return (
                                                <div 
                                                    className="icon mb-2" 
                                                    onClick={() => {
                                                        setPage(1)
                                                        setCategory(icon.text)
                                                    }}
                                                >
                                                    <i className={icon.icon}></i>
                                                </div>
                                            )
                                        }}
                                    </ProductConsumer>
                                    <small>{icon.text}</small>
                                </div>
                            ))
                        }
                    </HorizontalScroll>
                </div>
            </div>
        </section>
    )
}
