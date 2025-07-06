import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateTipsWithGemini(spendingData) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
You are a smart budget assistant. A user has the following spending and budget data:
${spendingData}

Based on this data, give 3 short personalized tips to help them improve their budget habits.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}


export default generateTipsWithGemini;
