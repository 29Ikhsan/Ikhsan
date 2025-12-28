
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Assessment } from './components/Assessment';
import { Results } from './components/Results';
import { KMSI_QUESTIONS } from './constants';
import { MoneyScriptCategory, UserResponse, CategoryScore } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [results, setResults] = useState<CategoryScore[]>([]);

  const calculateScores = (responses: UserResponse[]) => {
    const categoryAggregates: Record<MoneyScriptCategory, { total: number; count: number }> = {
      [MoneyScriptCategory.AVOIDANCE]: { total: 0, count: 0 },
      [MoneyScriptCategory.WORSHIP]: { total: 0, count: 0 },
      [MoneyScriptCategory.STATUS]: { total: 0, count: 0 },
      [MoneyScriptCategory.VIGILANCE]: { total: 0, count: 0 },
    };

    responses.forEach((resp) => {
      const question = KMSI_QUESTIONS.find(q => q.id === resp.questionId);
      if (question) {
        categoryAggregates[question.category].total += resp.score;
        categoryAggregates[question.category].count += 1;
      }
    });

    const finalScores: CategoryScore[] = Object.entries(categoryAggregates).map(([cat, data]) => {
      const category = cat as MoneyScriptCategory;
      const maxScore = data.count * 6;
      return {
        category,
        score: data.total,
        maxScore,
        percentage: (data.total / maxScore) * 100,
        description: "", // Fetched from constants in component
      };
    });

    setResults(finalScores);
    setStep('results');
  };

  const resetAssessment = () => {
    setStep('intro');
    setResults([]);
  };

  return (
    <Layout>
      {step === 'intro' && (
        <div className="max-w-4xl mx-auto flex flex-col items-center py-12 md:py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <i className="fas fa-brain"></i>
            <span>Discover Your Financial Subconscious</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            What is your <span className="text-emerald-600 underline decoration-emerald-200">Money Script?</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Money scripts are unconscious, generational beliefs about money formed in childhood. 
            Identify your patterns using the Klontz Money Script Inventory (KMSI) and start building 
            a healthier relationship with wealth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setStep('quiz')}
              className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 transform hover:scale-105 transition-all"
            >
              Start Free Assessment
            </button>
            <button className="px-10 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl transition-all">
              Learn More
            </button>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
            <div className="flex flex-col items-center">
              <i className="fas fa-user-shield text-3xl mb-2 text-emerald-500"></i>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-bolt text-3xl mb-2 text-emerald-500"></i>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Fast Results</span>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-microchip text-3xl mb-2 text-emerald-500"></i>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Powered</span>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-graduation-cap text-3xl mb-2 text-emerald-500"></i>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Scientific</span>
            </div>
          </div>
        </div>
      )}

      {step === 'quiz' && (
        <Assessment onComplete={calculateScores} />
      )}

      {step === 'results' && (
        <Results scores={results} onReset={resetAssessment} />
      )}
    </Layout>
  );
};

export default App;
