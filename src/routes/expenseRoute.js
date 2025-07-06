import express from "express";
import { createExpense, getExpenses, updateExpense, deleteExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", createExpense);
router.get("/", getExpenses);
router.put("/", updateExpense);
router.delete("/", deleteExpense);

export default router;  