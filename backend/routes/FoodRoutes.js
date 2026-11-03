
import express from "express";
import Food from "../models/Food.js";

const router = express.Router();

// GET all foods
router.get("/", async (req, res) => {
    try {
        const foods = await Food.find().sort({ createdAt: -1 });

        res.status(200).json({ foods });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Add new food
router.post("/", async (req, res) => {
    try {
        const {
            name,
            category,
            price,
            rating,
            reviews,
            time,
            description,
            image,
            ingredients,
        } = req.body;

        if (!name || !category || !price || !time || !description || !image) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        const food = await Food.create({
            name,
            category,
            price,
            rating,
            reviews,
            time,
            description,
            image,
            ingredients,
        });

        res.status(201).json({
            message: "Food added successfully",
            food,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Update food
router.put("/:id", async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!food) {
            return res.status(404).json({
                message: "Food not found",
            });
        }

        res.status(200).json({
            message: "Food updated successfully",
            food,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Delete food
router.delete("/:id", async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found",
            });
        }

        res.status(200).json({
            message: "Food deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
