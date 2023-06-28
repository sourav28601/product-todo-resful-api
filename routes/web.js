const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const TodoController = require('../controllers/TodoController');
const image_middleware = require('../middleware/image_middleware');
const UserController = require('../controllers/UserController');
const checkUserAuth = require('../middleware/auth');

// UserController Routes
router.post('/userregister',UserController.RegisterUser)
router.post('/login',UserController.verifylogin)
router.get('/me',checkUserAuth,UserController.GetUserDetail)
router.get('/logout',UserController.logout)
router.patch('/updatepassword',checkUserAuth,UserController.updatePassword)


 //ProductController Routes
 router.get('/getproducts',checkUserAuth,ProductController.getAllProducts);
 router.post('/addproducts',checkUserAuth,image_middleware,ProductController.createProduct); 
 router.patch('/updateproducts/:id',checkUserAuth,image_middleware,ProductController.updateProduct);
 router.delete('/deleteproducts/:id',checkUserAuth,ProductController.deleteProduct); 

//TodoController Routes
router.get('/gettodos',TodoController.getAllTodos);
router.post('/addtodos',TodoController.createTodo); 
router.patch('/updatetodos/:id',TodoController.updateTodo);
router.delete('/deletetodos/:id',TodoController.deleteTodo); 

module.exports = router;