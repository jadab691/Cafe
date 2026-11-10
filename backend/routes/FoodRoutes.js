
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

// GET one food for the admin edit form
router.get("/:id", async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.status(200).json({ food });
    } catch (error) {
        const status = error.name === "CastError" ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
});

// POST - Add new food
router.post("/", async (req, res) => {
    try {
        const {
            name,
            category,
            price,
            time,
            description,
            image,
            badge,
        } = req.body;

        if (
            typeof name !== "string" ||
            !name.trim() ||
            typeof category !== "string" ||
            !category.trim() ||
            price === undefined ||
            price === null ||
            price === "" ||
            typeof time !== "string" ||
            !time.trim() ||
            typeof description !== "string" ||
            !description.trim() ||
            typeof image !== "string" ||
            !image.trim()
        ) {
            return res.status(400).json({
                message: "Name, category, price, preparation time, description, and image are required.",
            });
        }

        const food = await Food.create({
            name,
            category,
            price,
            time,
            description,
            image,
            badge,
        });

        res.status(201).json({
            message: "Food added successfully",
            food,
        });
    } catch (error) {
        const status = error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
});

// PUT - Update food
router.put("/:id", async (req, res) => {
    try {
        const { name, category, price, time, description, image, badge, available } = req.body;
        const foodData = { name, category, price, time, description, image, badge, available };
        Object.keys(foodData).forEach((key) => {
            if (foodData[key] === undefined) delete foodData[key];
        });

        const food = await Food.findByIdAndUpdate(
            req.params.id,
            foodData,
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
        const status = error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
        res.status(status).json({ message: error.message });
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
        const status = error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
});

export default router;
