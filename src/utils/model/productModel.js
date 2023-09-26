import mongoose from "mongoose";
import { connectProducts } from "../mongoDB";

export const productModel = new mongoose.Schema({
     name: String,
     description: String,
     price: Number,
     stock: Number,
     category: String,
})

export const Product = connectProducts.models.products || connectProducts.model("products", productModel);