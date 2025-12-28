
import { MoneyScriptCategory, KMSIQuestion } from './types';

export const KMSI_QUESTIONS: KMSIQuestion[] = [
  // Money Avoidance
  { id: 1, text: "I do not deserve a lot of money when others have so little.", category: MoneyScriptCategory.AVOIDANCE },
  { id: 2, text: "Rich people are greedy.", category: MoneyScriptCategory.AVOIDANCE },
  { id: 3, text: "It is not okay to have more than you need.", category: MoneyScriptCategory.AVOIDANCE },
  { id: 4, text: "There is virtue in living with less money.", category: MoneyScriptCategory.AVOIDANCE },
  { id: 5, text: "Money corrupts people.", category: MoneyScriptCategory.AVOIDANCE },
  { id: 6, text: "Good people should not care about money.", category: MoneyScriptCategory.AVOIDANCE },
  
  // Money Worship
  { id: 7, text: "Things would get better if I had more money.", category: MoneyScriptCategory.WORSHIP },
  { id: 8, text: "More money will make you happier.", category: MoneyScriptCategory.WORSHIP },
  { id: 9, text: "You can never have enough money.", category: MoneyScriptCategory.WORSHIP },
  { id: 10, text: "Money is the secret to happiness.", category: MoneyScriptCategory.WORSHIP },
  { id: 11, text: "Money buys freedom.", category: MoneyScriptCategory.WORSHIP },
  { id: 12, text: "Money solves all of my problems.", category: MoneyScriptCategory.WORSHIP },

  // Money Status
  { id: 13, text: "Most poor people do not deserve to have money.", category: MoneyScriptCategory.STATUS },
  { id: 14, text: "Your net worth is equal to your self-worth.", category: MoneyScriptCategory.STATUS },
  { id: 15, text: "I only buy new things, never used items.", category: MoneyScriptCategory.STATUS },
  { id: 16, text: "People are only as successful as the amount of money they earn.", category: MoneyScriptCategory.STATUS },
  { id: 17, text: "It is important to let people know how much money you have.", category: MoneyScriptCategory.STATUS },
  { id: 18, text: "If you are not rich, you are not successful.", category: MoneyScriptCategory.STATUS },

  // Money Vigilance
  { id: 19, text: "You should not tell others how much money you make.", category: MoneyScriptCategory.VIGILANCE },
  { id: 20, text: "It is wrong to ask others how much money they make.", category: MoneyScriptCategory.VIGILANCE },
  { id: 21, text: "You should always save for a rainy day.", category: MoneyScriptCategory.VIGILANCE },
  { id: 22, text: "If you cannot pay cash for something, you should not buy it.", category: MoneyScriptCategory.VIGILANCE },
  { id: 23, text: "I am anxious about not having enough money.", category: MoneyScriptCategory.VIGILANCE },
  { id: 24, text: "People should not know how much money I have.", category: MoneyScriptCategory.VIGILANCE },
];

export const CATEGORY_DESCRIPTIONS: Record<MoneyScriptCategory, string> = {
  [MoneyScriptCategory.AVOIDANCE]: "People with Money Avoidance scripts believe that money is bad or that they don't deserve it. They may subconsciously distance themselves from wealth.",
  [MoneyScriptCategory.WORSHIP]: "Money Worshipers believe that more money will solve all their problems and lead to happiness, often leading to chronic dissatisfaction.",
  [MoneyScriptCategory.STATUS]: "Those with Money Status scripts link their self-worth to their net worth, often prioritizing clear signs of wealth to gain social standing.",
  [MoneyScriptCategory.VIGILANCE]: "Money Vigilance involves a watchful and anxious relationship with money. It often leads to frugality but can cause significant stress over spending."
};

export const RESPONSE_OPTIONS = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Somewhat Disagree", value: 3 },
  { label: "Somewhat Agree", value: 4 },
  { label: "Agree", value: 5 },
  { label: "Strongly Agree", value: 6 },
];
