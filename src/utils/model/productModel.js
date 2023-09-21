import mongoose from "mongoose";

export const productModel = new mongoose.Schema({
     name: String,
     description: String,
     price: Number,
     stock: Number,
     category: String,
})

export const Product = mongoose.models.products || mongoose.model("products", productModel);