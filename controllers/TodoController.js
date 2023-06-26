// src/controllers/todoController.js
const todoModel = require('../models/Todo');

class TodoController {

    static getAllTodos = async (req, res) => {
      // console.log(req.body);
      try {
        const todos = await todoModel.find();
        console.log(todos);
        res.status(200).json({success: true, todos})
    } catch (err) {
        console.log(err)
    }
    };
  
  static createTodo = async (req, res) => {
    // const { title, description } = req.body;
      try {
            const data = await todoModel.create(req.body);
            // console.log(data);
            res.status(201).json({success: true,data})
  
        } catch (err) {
            console.log(err);
        }
    };
    
    static updateTodo = async (req, res) => {
      try {
          const data = await todoModel.findByIdAndUpdate(req.params.id, req.body);
          res.status(201).json({success: true,message: "Todo updated successfully",data})
      } catch (err) {
          console.log(err);
      }
  
  };
  static deleteTodo = async (req, res) => {
    try {
        const Todo = await todoModel.findByIdAndDelete(req.params.id)
        // console.log(Todo)
        if (!Todo) {
            return res
                .status(500)
                .send({ status: "unsucess", message: "Todo not found" })
        }
        res.status(201).json({ status: "success", success: true, message: "Delete Successfully", Todo })
    } catch (err) {
        console.log(err)
    }
  
  }
  
  
  }

module.exports = TodoController;

  
