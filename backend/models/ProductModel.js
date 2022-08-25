const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
        maxLength:[70,"Name can't exceed 70 characters"]
      },
      description: {
        type: String,
        required: [true, "Please Enter product Description"],
        maxLength:[4000,"Description can't exceed 4000 characters"]
      },
      price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
      },
      offerPrice:{
        type:String,
        maxLength:[4,"Discount price can't exceed 4 character"]
      },
      color:{
        type:String
      },
      ratings: {
        type: Number,
        default: 0,
      },
      images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      category: {
        type: String,
        required: [true, "Please add a Product Category"],
      },
      Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
      },
      numOfReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
  
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          time:{
            type:Date,
            default:Date.now,
          }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
  
        createdAt: {
          type: Date,
          default: Date.now,
        },
});

module.exports = mongoose.model("Product", productSchema); 