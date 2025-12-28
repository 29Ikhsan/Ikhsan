
import React, { useEffect, useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell 
} from 'recharts';
import { CategoryScore, MoneyScriptCategory } from '../types';
import { CATEGORY_DESCRIPTIONS } from '../constants';
import { getMoneyScriptAnalysis } from '../services/gemini';

interface ResultsProps {
  scores: CategoryScore[];
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ scores, onReset }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const result = await getMoneyScriptAnalysis(scores);
      setAnalysis(result || "Analysis currently unavailable.");
      setLoading(false);
    };
    fetchAnalysis();
  }, [scores]);

  const chartData = scores.map(s => ({
    category: s.category.replace('Money ', ''),
    full: s.category,
    percentage: Math.round(s.percentage),
  }));

  const getColor = (category: string) => {
    if (category.includes('Avoidance')) return '#10b981'; // Emerald
    if (category.includes('Worship')) return '#3b82f6'; // Blue
    if (category.includes('Status')) return '#f59e0b'; // Amber
    return '#6366f1'; // Indigo
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Financial Psychology Profile</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Based on your responses, here is how you relate to money across the four primary script patterns identified by Dr. Brad Klontz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Visualizations */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
              <i className="fas fa-chart-pie text-emerald-500 mr-2"></i> Script Intensity
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Radar
                    name="Intensity"
                    dataKey="percentage"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <i className="fas fa-list-ul text-emerald-500 mr-2"></i> Category Breakdown
            </h3>
            <div className="space-y-4">
              {scores.map((score) => (
                <div key={score.category} className="group">
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-medium text-slate-700">{score.category}</span>
                    <span className="text-sm font-bold text-slate-500">{Math.round(score.percentage)}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000 ease-out rounded-full"
                      style={{ 
                        width: `${score.percentage}%`,
                        backgroundColor: getColor(score.category)
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed hidden group-hover:block animate-in slide-in-from-top-1">
                    {CATEGORY_DESCRIPTIONS[score.category]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden min-h-[500px] flex flex-col">
          <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
            <h3 className="text-emerald-800 font-bold flex items-center">
              <i className="fas fa-robot mr-2"></i> AI Behavioral Analysis
            </h3>
            {loading && <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>}
          </div>
          <div className="p-6 md:p-8 flex-grow prose prose-slate max-w-none prose-sm">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                <div className="h-32 bg-slate-50 rounded mt-8"></div>
                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
              </div>
            ) : (
              <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {analysis?.split('\n').map((line, i) => {
                  if (line.startsWith('#')) return <h4 key={i} className="text-lg font-bold text-emerald-700 mt-4 mb-2">{line.replace(/#/g, '').trim()}</h4>;
                  if (line.startsWith('*') || line.startsWith('-')) return <li key={i} className="ml-4">{line.substring(1).trim()}</li>;
                  return <p key={i} className="mb-3">{line}</p>;
                })}
              </div>
            )}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <button 
              onClick={onReset}
              className="text-emerald-600 font-semibold text-sm hover:underline"
            >
              Take Assessment Again
            </button>
          </div>
        </div>
      </div>

      {/* Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {scores.map((score) => (
          <div key={score.category} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div 
              className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-white"
              style={{ backgroundColor: getColor(score.category) }}
            >
              <i className={`fas ${
                score.category.includes('Avoidance') ? 'fa-eye-slash' : 
                score.category.includes('Worship') ? 'fa-hands-praying' :
                score.category.includes('Status') ? 'fa-crown' : 'fa-shield-halved'
              }`}></i>
            </div>
            <h4 className="font-bold text-slate-800 mb-1">{score.category}</h4>
            <div className="text-2xl font-black mb-3" style={{ color: getColor(score.category) }}>
              {Math.round(score.percentage)}%
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {CATEGORY_DESCRIPTIONS[score.category]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
