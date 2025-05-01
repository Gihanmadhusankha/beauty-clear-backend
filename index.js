import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import itemRouter from "./routes/itemRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
let app= express();

mongoose.connect("mongodb+srv://admin:123@cluster0.jn49bio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster").then(
    ()=>{
        console.log("connected to the database");
    }
).catch(
    ()=>{
        console.log("connection error")
    }
)

app.use(bodyParser.json());

app.use((req,res,next)=>{
    const header =req.header("Authorization");
    if(header !=null){
        const token =header.replace("Bearer ","")
        jwt.verify(token,"random456",(err,decoded)=>{
            console.log(decoded)
            if(decoded != null){
                req.user=decoded
            }
        })

    }next()

})


app.use('/item',itemRouter);
app.use("/api/product",productRouter);
app.use("/api/order",orderRouter);

app.listen(3000,()=>{
    console.log("server running on 3000");
})
