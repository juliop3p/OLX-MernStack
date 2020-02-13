const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { authorization } = req.headers

        if(!authorization) return res.status(401).json({ error: 'Usuário não autorizado!' })

        const [scheme, token] = authorization.split(' ')

        if(!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token malformated' })

        try {
            const a = jwt.verify(token, process.env.SECRET)
            next()
        } catch (err) {
            res.status(401).json({ error: 'Usuário não autorizado!' })
        }
}