const routes = require('express').Router()
const auth = require('./middleware/auth')

// For Upload
const multer = require('multer')
const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig)


// CONTROLLER USER
const UserController = require('./controllers/UserController')

// POST
routes.post('/user/new', UserController.store)

// ---


// CONTROLLER PRODUCT
const ProductController = require('./controllers/ProductController')

// POST 
routes.post('/product/new', auth, upload.single('img'), ProductController.store)

// DELETE
routes.delete('/product/:_id', auth, ProductController.destroy)

// UPDATE
routes.put('/product/:_id', auth, upload.single('img'), ProductController.update)
// ---


// CONTROLLER PAGINATION
const PaginationController = require('./controllers/PaginationController')

// GET
routes.get('/products', PaginationController.index)

routes.get('/products/category', PaginationController.indexByCategory)

routes.get('/products/user', auth, PaginationController.indexByUserId)
// ---


// CONTROLER DETAILS
const DetailsController = require('./controllers/DetailsController')

// GET
routes.get('/product/:_id', DetailsController.indexByProduct)
// ---


// CONTROLER AUTH
const AuthController = require('./controllers/AuthController')

// POST 
routes.post('/authentication', AuthController.login)

routes.get('/validate-token', AuthController.validateToken)
// ---



module.exports = routes