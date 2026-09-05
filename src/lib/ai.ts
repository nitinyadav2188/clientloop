import { Lead } from "../types";
import { v4 as uuidv4 } from "uuid";

// This is a mock AI service abstraction to demonstrate functionality
// without requiring an API key initially. In a real environment, 
// this would call an API route that securely uses the GEMINI_API_KEY.

export async function extractLeadFromMessage(message: string): Promise<Partial<Lead>> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Basic mock extraction logic based on keywords
  const budgetMatch = message.match(/(?:budget|around|for)\s*(?:is\s*)?(?:₹|\$)?\s*(\d+[kK,]*\d*)/i);
  const estimated_value = budgetMatch ? parseInt(budgetMatch[1].replace(/k/i, '000').replace(/,/g, '')) : 0;
  
  let source = 'other';
  if (message.toLowerCase().includes('linkedin')) source = 'linkedin';
  if (message.toLowerCase().includes('instagram')) source = 'instagram';
  
  return {
    name: "Extracted Contact", // AI would extract this
    project: message.substring(0, 30) + '...',
    source: source as any,
    estimated_value,
    temperature: 'warm',
    description: message,
    stage: 'new'
  };
}

export async function generateFollowUp(context: string, tone: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  if (tone === 'Friendly') {
    return `Hey there! Just checking in on ${context}. Let me know if you have any questions or if you're ready to move forward. Happy to help!`;
  }
  if (tone === 'Professional') {
    return `Hello. I am following up regarding ${context}. Please let me know your thoughts and if you require any further information to proceed.`;
  }
  if (tone === 'Direct') {
    return `Hi, any updates on ${context}? Let's connect this week to finalize.`;
  }
  
  return `Hi! Checking in on ${context}. Let me know your thoughts.`;
}
