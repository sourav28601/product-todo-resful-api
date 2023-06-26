const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const TodoController = require('../controllers/TodoController');



 //ProductController Routes
 router.get('/getproducts',ProductController.getAllProducts);
 router.post('/addproducts',ProductController.createProduct); 
 router.patch('/updateproducts/:id',ProductController.updateProduct);
 router.delete('/deleteproducts/:id',ProductController.deleteProduct); 

//TodoController Routes
router.get('/gettodos',TodoController.getAllTodos);
router.post('/addtodos',TodoController.createTodo); 
router.patch('/updatetodos/:id',TodoController.updateTodo);
router.delete('/deletetodos/:id',TodoController.deleteTodo); 

module.exports = router;