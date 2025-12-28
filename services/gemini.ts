
import { GoogleGenAI } from "@google/genai";
import { CategoryScore } from "../types";

export async function getMoneyScriptAnalysis(scores: CategoryScore[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const scoreData = scores.map(s => `${s.category}: ${s.percentage.toFixed(1)}%`).join(', ');
  
  const prompt = `
    I have taken the Klontz Money Script Inventory (KMSI) assessment. 
    Here are my scores across four categories: ${scoreData}.
    
    The categories represent:
    1. Money Avoidance (Believing money is bad or undeserved)
    2. Money Worship (Believing money is the key to happiness)
    3. Money Status (Equating self-worth with net worth)
    4. Money Vigilance (Anxiety and secrecy around money)
    
    Please provide:
    1. A summary of what these scores suggest about my primary financial psychology.
    2. Potential psychological obstacles I might face based on my highest scores.
    3. Three actionable "Money Mantras" or cognitive reframing exercises to help balance my relationship with money.
    4. A coaching tip for each category that scored above 60%.
    
    Keep the tone professional, empathetic, and psychologically grounded. Use Markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "I'm sorry, I couldn't generate an AI analysis at this time. Please review your scores and category descriptions for insights.";
  }
}
