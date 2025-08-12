import React, { useState } from 'react';
import { Search, Youtube, BookOpen, BarChart3, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import VideoAnalyzer from './components/VideoAnalyzer';
import Dashboard from './components/Dashboard';
import Results from './components/Results';

export interface SubtopicAnalysis {
  name: string;
  coverage: number;
  status: 'covered' | 'partial' | 'missing';
  keywords: string[];
}

export interface AnalysisResult {
  videoId: string;
  title: string;
  topic: string;
  overallScore: number;
  subtopics: SubtopicAnalysis[];
  transcriptLength: number;
  analysisDate: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'analyzer' | 'results'>('dashboard');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResults(prev => [result, ...prev]);
    setCurrentResult(result);
    setCurrentView('results');
  };

  const handleViewResults = (result: AnalysisResult) => {
    setCurrentResult(result);
    setCurrentView('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Youtube className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduVideo Analyzer</h1>
                <p className="text-sm text-gray-600">Educational Content Evaluation Platform</p>
              </div>
            </div>
            <nav className="flex space-x-1">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('analyzer')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'analyzer'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Search className="h-4 w-4 inline mr-2" />
                Analyze Video
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <Dashboard results={analysisResults} onViewResult={handleViewResults} />
        )}
        {currentView === 'analyzer' && (
          <VideoAnalyzer onAnalysisComplete={handleAnalysisComplete} />
        )}
        {currentView === 'results' && currentResult && (
          <Results result={currentResult} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Educational Content Evaluation System</p>
            <p className="text-sm">Helping students and educators find the most comprehensive learning resources</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;