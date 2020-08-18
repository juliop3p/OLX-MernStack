import React, { useMemo } from 'react'
import './FormProduct.css'
import navIcons from '../utils/navIcons'

export default function FormProduct({ state, handleSubmitProduct, editing }) {
    const preview = useMemo(
        () => {
            return typeof state.img === 'object' ? URL.createObjectURL(state.img) : state.img
        }, [state.img]
    )

    console.log(typeof state.img)
    console.log(state.img)
    console.log(preview)


    return (
        <section id="form" className="py-5 px-3">
            <div className="container-fluid">
                <h1 className="text-center mb-4">O que você está anunciando?</h1>
                <div className="row">
                    <div className="col card p-3">
                        <form className="my-4">
                            <input 
                                type="text"
                                placeholder="Titulo*"
                                className="input-height form-control col-md-6 mb-4"
                                value={state.title}
                                onChange={event => state.setTitle(event.target.value)}
                            />
                            <textarea name="desctiption" id="" cols="30" rows="10"
                                className="form-control col-md-6 mb-4"
                                placeholder="Descrição*"
                                value={state.description}
                                onChange={event => state.setDescription(event.target.value)}
                            >
                            </textarea>
                            <strong>Categorias*</strong>

                            <ul className="categories mt-4">
                                {
                                    navIcons.map((icon, index) => (
                                        <li key={index}
                                            className={`card col-md-4 p-3 ${ state.category === icon.text && 'selected' }`}
                                            onClick={() => state.setCategory(icon.text)}
                                        >
                                            <span>
                                                <span><i className={`${icon.icon} fa-2x mr-3 text-purple`}></i> {icon.text}</span>
                                            </span>
                                        </li>
                                    ))
                                }
                            </ul>

                            <input 
                                type="number"
                                placeholder="Preço (R$)"
                                className="input-height form-control col-4 col-lg-2 mb-4"
                                value={state.price || 0}
                                onChange={event => state.setPrice(event.target.value)}
                            />

                            <label>
                                <strong>Foto</strong><br/>
                            </label>

                            <div>
                                <label id="img"
                                    className={state.img ? 'has-img' : ''}
                                >
                                    <img 
                                        src={typeof state.img === 'object' ? `${preview}` : `http://localhost:8080/files/${state.img}`} 
                                        alt="preview"
                                        className="preview img-product"
                                    />
                                    <input 
                                        type="file"
                                        onChange={event => state.setImg(event.target.files[0])}
                                    />                                
                                    <div className="cam">
                                        <i className="fas fa-camera fa-2x"></i><br/> 
                                        <strong>Adicionar foto</strong><br/>
                                        <small>JPG, GIF, e PNG somente</small>
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row my-4 text-center">
                    <div className="col my-3">
                        <span className="text-muted">Ao publicar você concorda e aceita nossos <strong className="text-purple">Termos de Uso</strong> e <strong className="text-purple">Privacidade</strong></span>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-orange mx-3 btn-right col-md-3"
                        onClick={handleSubmitProduct}
                    >
                        Enviar Anúncio
                    </button>
                </div>
            </div>
        </section>
    )
}
