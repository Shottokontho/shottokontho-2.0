
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getArticleSummary = async (content: string, language: 'bn' | 'en') => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Please provide a concise, engaging summary of the following news article in ${language === 'bn' ? 'Bengali' : 'English'}. Article content: ${content}`,
      config: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini summary error:", error);
    return "AI Summary is currently unavailable.";
  }
};

export const getPersonalizedFeed = async (userInterests: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the user's interest categories: ${userInterests.join(", ")}, recommend 3 news themes they might like.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini personalization error:", error);
    return null;
  }
};
