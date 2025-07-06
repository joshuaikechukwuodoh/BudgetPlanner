import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./src/routes/authRoute.js";
import expenseRoute from "./src/routes/expenseRoute.js";
import budgetRoute from "./src/routes/budgetRoute.js";
import analyticsRoute from "./src/routes/analyticsRoute.js";
import authMiddleware from "./src/middlewares/authMiddleware.js";

const app = express();
dotenv.config();

// Middleware
app.use(cors(
    {
        origin: "*",
        credentials: true,
        exposedHeaders: ["set-cookie"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 200,
        
    }
));
app.use(express.json());

// Public routes
app.use("/api/auth", authRoute);

// Protected routes
app.use("/api/expense", authMiddleware, expenseRoute);
app.use("/api/budget", authMiddleware, budgetRoute);
app.use("/api/analytics", authMiddleware, analyticsRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
