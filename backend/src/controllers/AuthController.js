const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    async login (req, res) {
        const { email, password } = req.body

        if(!email || !password) return res.json({ error: 'Preencha os campos corretamente!' })

        const user = await User.findOne({ email })

        if(!user) return res.json({ error: 'Usuário não está cadastrado!' })

        if(!await bcrypt.compare(password, user.password)) {
            return res.json({ error: 'Usuário ou senha incorreto!' })
        }

        user.password = undefined

        res.json({ user, token: jwt.sign({ _id: user._id }, process.env.SECRET)})
    },

    async validateToken (req, res) {
        const { authorization } = req.headers

        if(!authorization) return res.send(false)

        const [scheme, token] = authorization.split(' ')

        if(!/^Bearer$/i.test(scheme)) return res.send(false)

        try {
            await jwt.verify(token, process.env.SECRET)
            res.send(true)
        } catch (err) {
            res.send(false)
        }
    }
}