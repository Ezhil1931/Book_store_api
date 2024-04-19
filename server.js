import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import {data} from "./model1/bookModel.js"

const PORT=process.env.PORT||4000;

const mongodbUrl="mongodb+srv://ezhilbruce:ezhil1940@mydatabase.e2ac7dw.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase"

const app=express();
 app.use(express.json())

app.use(cors())

//the program start
app.get('/',(req,res)=>{
console.log(req)
return res.status(234).send("Mern stack Web Server")

})

////Post method to create the book model
app.post('/books',async(req,res)=>{
    try{
if(!req.body.name||!req.body.author||!req.body.year){
 
 return res.status(400).send({message:"Send the required all details"})

}
const newBook={
    name:req.body.name,
    author:req.body.author,
    year:req.body.year
    }

    const book=await data.create(newBook)
    return res.status(201).send(book)

}


catch(err){
console.log(err.message)
res.status(500).send({message:"error message"})

}


})

////get method to get all book details 
app.get("/books/:id",async(req,res)=>{
    try{
const {id}=req.params;

    
const books= await data.findById(id)
        res.status(201).send(books) 
    }
    catch(err){
console.log(err)
res.status(501).send({sms:'Can not get book details'})    
}
})


app.get("/books",async(req,res)=>{
    try{

    
const books= await data.find({})
        res.status(201).send(books) 
    }
    catch(err){
console.log(err)
res.status(501).send({sms:'Can not get book details'})    
}
})

///update data in mogodb "put" method

app.put('/books/:id',async(req,res)=>{

    try{

if(!req.body.name||!req.body.author||!req.body.year){

    return res.status(400).send({
        sms:'give the proper details about book'
    })
}//if class
const {id}=req.params;
const result=await data.findByIdAndUpdate(id,req.body);

if(!result){
    return res.json({sms:'The book not found'})
}
return res.send({sms:"The book is updated"})

    }

    //catch
    catch(err){
res.status(500).send({sms:"Your own request nott work"})
    
}
})

/////////delete method


app.delete("/books/:id",async(req,res)=>{
try{
    const {id}=req.params;
    const result=await data.findByIdAndDelete(id)

    if(!result){
        return res.send({sms:"The book is not found"})
    }
    return res.send({sms:"The book is deleted"})
}
    catch(err){
res.send({sms:"The Error at delete process"})
    }
})


///mongodb................................................. connect///
const start=()=>{


mongoose.connect(mongodbUrl)
.then(()=>{
console.log("the data base connected")

app.listen(PORT,()=>{
    console.log(`the server is running ${PORT}`)
})

})
.catch((err)=>{

console.log(err)

})


}

start();