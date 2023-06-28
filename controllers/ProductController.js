const productModel = require("../models/Product");

class ProductController {

  static getAllProducts = async (req, res) => {
    // console.log(req.body);
    try {
      const allproducts = await productModel.find();
      console.log(allproducts);
      res.status(200).json({success: true, allproducts})
  } catch (err) {
      console.log(err)
  }
  };


   //insert
   static createProduct = async(req,res)=>{
    try{
        const{name,price,quantity,image}=req.body
        const data = new productModel({
            name:name,
            price:price,
            quantity:quantity,
            image:req.file.filename
        })
        await data.save()
        res.status(201).json({success: true,data})
    }catch(err){
        console.log(err)
    }
};

static updateProduct = async(req,res) =>{
    // console.log(req.params.id)
    // console.log(req.body)
    try{
        if(req.file){
            var imagefile = req.file.filename
        }
        const data = await productModel.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            price:req.body.price,
            quantity:req.body.quantity,
            image:imagefile
        })
        // console.log(data)
        res.status(201).json({success: true,message: "product updated successfully",data})
    }catch(err) 
    {
     console.log(err)
    }
};


static deleteProduct = async (req, res) => {
  try {
      const product = await productModel.findByIdAndDelete(req.params.id)
      // console.log(product)
      if (!product) {
          return res
              .status(500)
              .send({ status: "unsucess", message: "Product not found" })
      }
      res.status(201).json({ status: "success", success: true, message: "Delete Successfully", product })
  } catch (err) {
      console.log(err)
  }

}



}

module.exports = ProductController;
