const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
    async store (req, res) {
        const { nickname, email, phone = null, password } = req.body

        if(!nickname || !email || !password) {
            return res.json({ error: 'Por favor preencha todos os campos' })
        }

        await User.findOne({ email }).then(async user => {
            if(user) {
                return res.json({ error: 'Este e-mail já possui cadastro.'})
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            await User.create({
                nickname,
                email,
                phone,
                password: hashedPassword
            })
                .then(() => res.json({ success: 'User Created Successfully!' }))
                .catch(err => console.log(err))
        })
    },

}
