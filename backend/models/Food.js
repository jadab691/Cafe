import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 1,
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        time: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        badge: {
            type: String,
            trim: true,
            default: "",
        },
        available: {
            type: Boolean,
            default: true,
        },
        ingredients: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;