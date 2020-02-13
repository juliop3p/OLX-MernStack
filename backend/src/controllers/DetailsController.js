const Product = require("../models/Product");
const User = require("../models/User");

module.exports = {
    async indexByProduct (req, res) {
        const { _id } = req.params
    
        const product = await Product.findById(_id)
    
        if(!product) return res.status(500).json({ error: 'Produto não encontrado!' })
    
        const user = await User.findById(product.user)
        user.password = undefined
    
        res.json({ product, user })
    },

}
