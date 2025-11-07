import { useState } from 'react';
import { scholarships } from '../data/scholarships';
import { Sparkles, User, BookOpen, DollarSign, MapPin } from 'lucide-react';

const MatchMeForm = ({ onMatchResults }) => {
  const [formData, setFormData] = useState({
    grade: '',
    fieldOfStudy: '',
    gpa: '',
    familyIncome: '',
    country: 'India',
  });

  const [isMatching, setIsMatching] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateMatchScore = (scholarship) => {
    let score = 0;
    let maxScore = 0;

    // Grade match (25 points)
    maxScore += 25;
    if (scholarship.grade === formData.grade) {
      score += 25;
    } else if (
      (formData.grade === 'Graduate' && scholarship.grade === 'Undergraduate') ||
      (formData.grade === 'Undergraduate' && scholarship.grade === 'High School')
    ) {
      score += 15; // Partial match for adjacent grades
    }

    // Field of Study match (30 points)
    maxScore += 30;
    if (formData.fieldOfStudy) {
      const eligibleFields = scholarship.eligibility.fieldOfStudy;
      if (eligibleFields.includes('All Fields')) {
        score += 30;
      } else if (eligibleFields.some(field => 
        field.toLowerCase().includes(formData.fieldOfStudy.toLowerCase()) ||
        formData.fieldOfStudy.toLowerCase().includes(field.toLowerCase())
      )) {
        score += 30;
      } else {
        score += 10; // Some points for applying anyway
      }
    }

    // GPA match (20 points)
    maxScore += 20;
    if (formData.gpa) {
      const gpaNum = parseFloat(formData.gpa);
      if (gpaNum >= scholarship.eligibility.minGPA) {
        score += 20;
        // Bonus for exceeding minimum
        const excess = gpaNum - scholarship.eligibility.minGPA;
        score += Math.min(excess * 5, 10);
        maxScore += 10;
      } else {
        const deficit = scholarship.eligibility.minGPA - gpaNum;
        score += Math.max(20 - (deficit * 10), 0);
      }
    }

    // Family Income match (25 points)
    maxScore += 25;
    if (formData.familyIncome) {
      const incomeNum = parseInt(formData.familyIncome);
      if (incomeNum <= scholarship.eligibility.familyIncome) {
        score += 25;
        // Bonus for lower income (more need)
        const ratio = incomeNum / scholarship.eligibility.familyIncome;
        score += (1 - ratio) * 10;
        maxScore += 10;
      } else {
        const excess = (incomeNum - scholarship.eligibility.familyIncome) / scholarship.eligibility.familyIncome;
        score += Math.max(25 - (excess * 20), 0);
      }
    }

    // Country match (bonus)
    if (scholarship.country === formData.country) {
      score += 5;
      maxScore += 5;
    }

    return Math.round((score / maxScore) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsMatching(true);

    // Simulate processing time for better UX
    setTimeout(() => {
      // Calculate match scores for all scholarships
      const matchedScholarships = scholarships.map(scholarship => ({
        ...scholarship,
        matchScore: calculateMatchScore(scholarship),
      }));

      // Sort by match score and filter those with score > 40
      const topMatches = matchedScholarships
        .filter(s => s.matchScore >= 40)
        .sort((a, b) => b.matchScore - a.matchScore);

      onMatchResults(topMatches);
      setIsMatching(false);
    }, 1500);
  };

  const isFormValid = formData.grade && formData.fieldOfStudy && formData.gpa && formData.familyIncome;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect Scholarship Match
          </h2>
          <p className="text-gray-600">
            Tell us about yourself and we'll recommend the best scholarships for you
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grade Level */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span>Current Grade Level *</span>
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select your grade level</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Vocational">Vocational Training</option>
            </select>
          </div>

          {/* Field of Study */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span>Field of Study *</span>
            </label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              required
              placeholder="e.g., Engineering, Medicine, Computer Science"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter your major or area of interest
            </p>
          </div>

          {/* GPA */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>GPA (on 4.0 scale) *</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="4"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              required
              placeholder="e.g., 3.5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Your current Grade Point Average
            </p>
          </div>

          {/* Family Income */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span>Annual Family Income (INR) *</span>
            </label>
            <input
              type="number"
              name="familyIncome"
              value={formData.familyIncome}
              onChange={handleChange}
              required
              placeholder="e.g., 500000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Total annual household income
            </p>
          </div>

          {/* Country */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Country *</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isMatching}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
              isFormValid && !isMatching
                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isMatching ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Finding Your Matches...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Find My Scholarships</span>
              </span>
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2">How Matching Works</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• We analyze your profile against all available scholarships</li>
            <li>• Scholarships are ranked based on eligibility and compatibility</li>
            <li>• Higher match scores indicate better fit with your profile</li>
            <li>• Results are personalized to maximize your success chances</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MatchMeForm;
