
const express =require("express")
const app =express()
const mongoose =require('mongoose')
const Product =require('./models/ProductModel')

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Api ")
})

app.get('/blog',(req,res)=>{
    res.send("Blog")
})
app.get('/products', async(req,res)=>{
    try{
        const products =await Product.find({});
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.get('/products/:id',async(req, res)=>{
    try{
        const {id} =req.params;
        const product =await Product.findById(id);
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.post('/product',async(req,res)=>{
    try{
        const product =await Product.create(req.body)
        res.status(200).json(product)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
app.put('/products/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const product =await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product wiht Id ${id}`})
        }
        const updatedProduct =await Product.findById(id)
        res.status(200).json(updatedProduct)

    }catch(error){
        res.status(500).json({message:error.message})
    }
})
app.delete('/products/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const product =await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find the product with id ${id}`})
        }
        res.status(200).json({message:"Successfully deleted"})

    }catch(error){
        res.status(500).json({message:error.message})
    }
})



mongoose.connect('mongodb+srv://sudhinsuresh9526:jdiSz49tIiS2Skyb@merncluster.qvft02h.mongodb.net/nodecurd')
.then(()=>{
    app.listen(3000,()=>{
        console.log(`Server is running on the Port 3000`)
    })
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log(error)
})