
export enum MoneyScriptCategory {
  AVOIDANCE = 'Money Avoidance',
  WORSHIP = 'Money Worship',
  STATUS = 'Money Status',
  VIGILANCE = 'Money Vigilance'
}

export interface KMSIQuestion {
  id: number;
  text: string;
  category: MoneyScriptCategory;
}

export interface UserResponse {
  questionId: number;
  score: number; // 1 (Strongly Disagree) to 6 (Strongly Agree)
}

export interface CategoryScore {
  category: MoneyScriptCategory;
  score: number;
  maxScore: number;
  percentage: number;
  description: string;
}

export interface AssessmentResults {
  scores: CategoryScore[];
  overallAnalysis?: string;
}
