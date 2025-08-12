import React from 'react';
import { TrendingUp, BookOpen, CheckCircle, AlertTriangle, Calendar, Star } from 'lucide-react';
import type { AnalysisResult } from '../App';

interface DashboardProps {
  results: AnalysisResult[];
  onViewResult: (result: AnalysisResult) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ results, onViewResult }) => {
  const totalVideos = results.length;
  const averageScore = totalVideos > 0 ? results.reduce((sum, r) => sum + r.overallScore, 0) / totalVideos : 0;
  const highQualityVideos = results.filter(r => r.overallScore >= 80).length;
  const recentResults = results.slice(0, 5);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-100';
    if (score >= 60) return 'bg-amber-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Content Analysis Dashboard</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Evaluate YouTube videos for educational completeness and topic coverage using advanced NLP techniques.
          Get detailed insights into how well videos address specific learning objectives.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Videos Analyzed</p>
              <p className="text-2xl font-bold text-gray-900">{totalVideos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Excellent Videos</p>
              <p className="text-2xl font-bold text-gray-900">{highQualityVideos}</p>
              <p className="text-xs text-gray-500">Score ≥ 80%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Quality Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalVideos > 0 ? ((highQualityVideos / totalVideos) * 100).toFixed(0) : 0}%
              </p>
              <p className="text-xs text-gray-500">Videos with excellent coverage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Analysis Results */}
      {totalVideos > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Analysis Results</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {recentResults.map((result, index) => (
              <div key={index} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(result.overallScore)} ${getScoreColor(result.overallScore)}`}>
                        {result.overallScore}%
                      </div>
                      <h4 className="font-medium text-gray-900 truncate">{result.title}</h4>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {result.topic}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {result.analysisDate}
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {result.subtopics.filter(s => s.status === 'covered').length}/{result.subtopics.length} topics
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onViewResult(result)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analysis Results Yet</h3>
          <p className="text-gray-600 mb-6">Start by analyzing your first YouTube video to see detailed coverage reports.</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Analyze Your First Video
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;