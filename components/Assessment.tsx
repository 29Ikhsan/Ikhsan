
import React, { useState } from 'react';
import { KMSI_QUESTIONS, RESPONSE_OPTIONS } from '../constants';
import { UserResponse } from '../types';

interface AssessmentProps {
  onComplete: (responses: UserResponse[]) => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);

  const handleSelect = (score: number) => {
    const questionId = KMSI_QUESTIONS[currentIndex].id;
    const newResponses = [...responses.filter(r => r.questionId !== questionId), { questionId, score }];
    setResponses(newResponses);

    if (currentIndex < KMSI_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    }
  };

  const progress = ((currentIndex + 1) / KMSI_QUESTIONS.length) * 100;
  const currentQuestion = KMSI_QUESTIONS[currentIndex];
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2 text-sm text-slate-500 font-medium">
          <span>Question {currentIndex + 1} of {KMSI_QUESTIONS.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
        <div className="mb-8 min-h-[100px] flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 text-center leading-tight">
            "{currentQuestion.text}"
          </h2>
        </div>

        <div className="space-y-3">
          {RESPONSE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full py-4 px-6 rounded-xl border-2 text-left transition-all font-medium ${
                currentResponse?.score === option.value
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  currentResponse?.score === option.value ? 'border-emerald-500' : 'border-slate-300'
                }`}>
                  {currentResponse?.score === option.value && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                </div>
                {option.label}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="text-slate-400 hover:text-slate-600 font-semibold disabled:opacity-0 transition-opacity"
          >
            <i className="fas fa-arrow-left mr-2"></i> Previous
          </button>
          
          {responses.length === KMSI_QUESTIONS.length && (
            <button
              onClick={() => onComplete(responses)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-200 transition-all"
            >
              View Results
            </button>
          )}
        </div>
      </div>
      
      <p className="mt-8 text-center text-slate-400 text-sm italic">
        Select the response that most accurately reflects your spontaneous thoughts about the statement.
      </p>
    </div>
  );
};
