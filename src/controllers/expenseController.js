import express from "express";
import { PrismaClient } from "@prisma/client/edge";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export const createExpense = async (req, res) => {
    try {
        const { name, amount} = req.body;
        
        if (!name || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const expense = await prisma.expense.create({
            data: {
                name,
                amount,
            },
        });
        
        return res.status(201).json({ message: "Expense created successfully", expense });
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

export const getExpenses = async (req, res) => {
    try {
        const expenses = await prisma.expense.findMany();
        return res.status(200).json({ message: "Expenses retrieved successfully", expenses });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateExpense = async (req, res) => {
    try {
        const { id, name, amount } = req.body;
        
        if (!id || !name || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const expense = await prisma.expense.update({
            where: {
                id,
            },
            data: {
                name,
                amount,
            },
        });
        
        return res.status(200).json({ message: "Expense updated successfully", expense });
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
    
}
        
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: "Expense ID is required" });
        }
        
        const expense = await prisma.expense.delete({
            where: {
                id,
            },
        });
        
        return res.status(200).json({ message: "Expense deleted successfully", expense });
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

    