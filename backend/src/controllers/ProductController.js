const Product = require("../models/Product");
const User = require("../models/User");
const fs = require('fs')
const path = require('path')

module.exports = {
    async store (req, res) {
        const { title, description, category, price = 0 } = req.body
        const { filename } = req.file || {}
        const { _id } = req.headers

        const user = await User.findById(_id)

        if(!user) {
            return res.status(401).json({ error: 'Usuário não autorizado!' })
        }

        if(!title || !description || !category) {
            return res.json({ error: 'Preencha os campos corretamente' })
        }

        const product = await Product.create({
            user: _id,
            img: filename,
            title, 
            description,
            category,
            price
        })

        res.json(product)
        
    },

    async destroy (req, res) {
        const { _id } = req.params

        try {
            await Product.findOneAndDelete({ _id })
            res.json({ success: 'Produto deletado com successo!' })
        } catch (err) {
            res.json({ error: 'Houve um erro ao deletar o produto!' })
        }
    },

    async update (req, res) {
        const { _id } = req.params
        const { title, description, category, price = 0 } = req.body
        const { filename } = req.file || {}

        let product = await Product.findById(_id)

        if(!product) {
            return res.status(500).json({ error: 'Product wasn\'t found!' })
        }

        if(!title || !description || !category) {
            return res.json({ error: 'Preencha os campos corretamente' })
        }

        if(product.img && filename) {
            fs.unlink(path.resolve('uploads', `${product.img}`), err => {
                if(err) return res.json(err)
                console.log('Deleted successfully!')
            })
        }

        product = await product.updateOne({
            title,
            description,
            category,
            price,
            img: filename ? filename : product.img
        })

        return res.json({ success: 'Produto alterado com sucesso!' })
    }
}
