import React, { useState } from 'react';
import { Youtube, BookOpen, Plus, Trash2, Play, Loader2 } from 'lucide-react';
import type { AnalysisResult, SubtopicAnalysis } from '../App';

interface VideoAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const VideoAnalyzer: React.FC<VideoAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [topic, setTopic] = useState('');
  const [subtopics, setSubtopics] = useState<string[]>(['']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addSubtopic = () => {
    setSubtopics([...subtopics, '']);
  };

  const removeSubtopic = (index: number) => {
    setSubtopics(subtopics.filter((_, i) => i !== index));
  };

  const updateSubtopic = (index: number, value: string) => {
    const updated = [...subtopics];
    updated[index] = value;
    setSubtopics(updated);
  };

  const generateSubtopics = () => {
    if (!topic) return;
    
    // Simulate AI-generated subtopics based on common educational patterns
    const commonSubtopics = {
      'machine learning': ['Introduction to ML', 'Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'],
      'react': ['JSX Syntax', 'Components', 'State Management', 'Props', 'Hooks', 'Event Handling'],
      'calculus': ['Limits', 'Derivatives', 'Integration', 'Chain Rule', 'Applications'],
      'physics': ['Newton\'s Laws', 'Energy Conservation', 'Momentum', 'Wave Properties', 'Thermodynamics'],
      'chemistry': ['Atomic Structure', 'Chemical Bonds', 'Reactions', 'Stoichiometry', 'Periodic Table']
    };

    const lowerTopic = topic.toLowerCase();
    const foundSubtopics = Object.entries(commonSubtopics).find(([key]) => 
      lowerTopic.includes(key)
    );

    if (foundSubtopics) {
      setSubtopics(foundSubtopics[1]);
    } else {
      // Generate generic subtopics
      setSubtopics([
        `Introduction to ${topic}`,
        `Core Concepts of ${topic}`,
        `Advanced ${topic} Topics`,
        `Practical Applications`,
        `Examples and Case Studies`
      ]);
    }
  };

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const simulateAnalysis = async (): Promise<AnalysisResult> => {
    // Simulate API delays and processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const videoId = extractVideoId(videoUrl) || 'demo123';
    const validSubtopics = subtopics.filter(s => s.trim() !== '');

    // Simulate NLP analysis results
    const subtopicAnalysis: SubtopicAnalysis[] = validSubtopics.map(subtopic => {
      const coverage = Math.floor(Math.random() * 100);
      let status: 'covered' | 'partial' | 'missing';
      
      if (coverage >= 80) status = 'covered';
      else if (coverage >= 40) status = 'partial';
      else status = 'missing';

      return {
        name: subtopic,
        coverage,
        status,
        keywords: [
          `${subtopic.toLowerCase()}`,
          `${subtopic.toLowerCase()} concepts`,
          `${subtopic.toLowerCase()} examples`
        ]
      };
    });

    const overallScore = subtopicAnalysis.reduce((sum, s) => sum + s.coverage, 0) / subtopicAnalysis.length;

    return {
      videoId,
      title: `Educational Video: ${topic}`,
      topic,
      overallScore: Math.round(overallScore),
      subtopics: subtopicAnalysis,
      transcriptLength: Math.floor(Math.random() * 5000) + 1000,
      analysisDate: new Date().toLocaleDateString()
    };
  };

  const handleAnalysis = async () => {
    if (!videoUrl || !topic || subtopics.filter(s => s.trim()).length === 0) {
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await simulateAnalysis();
      onAnalysisComplete(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Analyze Educational Content</h2>
        <p className="text-lg text-gray-600">
          Enter a YouTube video URL and define the educational topic to get a comprehensive analysis
          of how well the video covers the expected learning objectives.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="space-y-6">
          {/* Video URL Input */}
          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Video URL
            </label>
            <div className="relative">
              <Youtube className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="url"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Topic Input */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              Educational Topic
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Machine Learning, React.js, Calculus..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Subtopics Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Expected Subtopics
              </label>
              <button
                type="button"
                onClick={generateSubtopics}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                disabled={!topic}
              >
                Generate AI Suggestions
              </button>
            </div>
            
            <div className="space-y-3">
              {subtopics.map((subtopic, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={subtopic}
                    onChange={(e) => updateSubtopic(index, e.target.value)}
                    placeholder={`Subtopic ${index + 1}`}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {subtopics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubtopic(index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addSubtopic}
              className="mt-3 flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Subtopic</span>
            </button>
          </div>

          {/* Analysis Button */}
          <div className="pt-6">
            <button
              onClick={handleAnalysis}
              disabled={isAnalyzing || !videoUrl || !topic || subtopics.filter(s => s.trim()).length === 0}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing Content...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Start Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Process Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
            <div>
              <p className="font-medium">Transcript Extraction</p>
              <p>Automatically extracts spoken content using YouTube Transcript API</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
            <div>
              <p className="font-medium">NLP Analysis</p>
              <p>Uses semantic analysis to match content with subtopics</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
            <div>
              <p className="font-medium">Coverage Scoring</p>
              <p>Calculates coverage percentage for each subtopic</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
            <div>
              <p className="font-medium">Detailed Report</p>
              <p>Generates comprehensive analysis with visualizations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalyzer;