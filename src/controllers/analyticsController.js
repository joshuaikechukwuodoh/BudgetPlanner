// Controller for AI-powered smart budget tips
import { generateTipsWithGemini } from '../services/smartTipsService.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSmartTips(req, res) {
  if (!req.user?.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = req.user.userId;

  try {
    const expenses = await prisma.expense.findMany({ where: { userId } });
    const budgets = await prisma.budget.findMany({ where: { userId } });

    // Group expenses by category and sum their amounts
    const grouped = {};
    expenses.forEach(e => {
      grouped[e.category] = (grouped[e.category] || 0) + e.amount;
    });

    // Prepare the budget + spending info to feed into Gemini AI
    const budgetInfo = budgets.map(b => {
      const spent = grouped[b.category] || 0;
      return `Category: ${b.category}, Limit: ₦${b.amount}, Spent: ₦${spent}`;
    }).join("\n");

    const tips = await generateTipsWithGemini(budgetInfo);
    res.json({ tips });
  } catch (err) {
    console.error('AI generation error:', err);
    res.status(500).json({ error: 'Gemini failed to generate tips' });
  }
}

