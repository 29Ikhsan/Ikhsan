
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-coins text-white"></i>
            </div>
            <h1 className="text-xl font-bold text-slate-800">MindOverMoney</h1>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">How it works</span>
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">Resources</span>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm">
          <p>© 2024 MindOverMoney. Based on the Klontz Money Script Inventory (KMSI).</p>
          <p className="mt-2 text-slate-500 italic">Disclaimer: This tool is for educational purposes and is not a substitute for financial or psychological advice.</p>
        </div>
      </footer>
    </div>
  );
};
