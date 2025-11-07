import { useState } from 'react';
import { scholarships } from './data/scholarships';
import ScholarshipTable from './components/ScholarshipTable';
import MatchMeForm from './components/MatchMeForm';
// import AnalyticsCharts from './components/AnalyticsCharts';
import { TrendingUp, Award, DollarSign } from 'lucide-react';

function App() {
  const [filteredScholarships, setFilteredScholarships] = useState(scholarships);
  const [activeTab, setActiveTab] = useState('browse'); // 'browse', 'match', 'analytics'
  const [matchResults, setMatchResults] = useState(null);

  const handleMatchResults = (results) => {
    setMatchResults(results);
    setFilteredScholarships(results);
    setActiveTab('browse');
  };

  const handleResetFilters = () => {
    setFilteredScholarships(scholarships);
    setMatchResults(null);
  };

  const totalAmount = scholarships.reduce((sum, s) => sum + s.amount, 0);
  const avgAmount = Math.round(totalAmount / scholarships.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                CSR Scholarship Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Scholarships</p>
                <p className="text-2xl font-bold text-blue-600">{scholarships.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Avg. Amount</p>
                <p className="text-2xl font-bold text-green-600">₹{avgAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-lg shadow p-1 flex space-x-1">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'browse'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center justify-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Browse Scholarships</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'match'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center justify-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Match Me</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center justify-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Analytics</span>
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'browse' && (
          <ScholarshipTable
            scholarships={filteredScholarships}
            onResetFilters={handleResetFilters}
            isMatchResult={matchResults !== null}
          />
        )}
        {activeTab === 'match' && (
          <MatchMeForm onMatchResults={handleMatchResults} />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsCharts scholarships={scholarships} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2025 CSR Scholarship Dashboard. Empowering students through education.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
