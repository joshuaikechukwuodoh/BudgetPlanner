import express from "express";
import { PrismaClient } from "@prisma/client/edge";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();  

export const createBudget = async (req, res) => {
    try {
        const { name, amount } = req.body;
        
        if (!name || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const budget = await prisma.budget.create({
            data: {
                name,
                amount,
            },
        });
        
        return res.status(201).json({ message: "Budget created successfully", budget });
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

export const getBudgets = async (req, res) => {
    try {
        const budgets = await prisma.budget.findMany();
        return res.status(200).json({ message: "Budgets retrieved successfully", budgets });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateBudget = async (req, res) => {
    try {
        const { id, name, amount } = req.body;
        
        if (!id || !name || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const budget = await prisma.budget.update({
            where: {
                id,
            },
            data: {
                name,
                amount,
            },
        });
        
        return res.status(200).json({ message: "Budget updated successfully", budget });
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteBudget = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: "Budget ID is required" });
        }
        
        const budget = await prisma.budget.delete({
            where: {
                id,
            },
        });
        
        return res.status(200).json({ message: "Budget deleted successfully", budget });
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
    