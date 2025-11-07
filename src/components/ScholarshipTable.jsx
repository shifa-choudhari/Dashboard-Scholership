import { useState, useMemo } from 'react';
import { Search, SortAsc, SortDesc, Filter, X, ExternalLink } from 'lucide-react';

const ScholarshipTable = ({ scholarships, onResetFilters, isMatchResult }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('amount');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filters, setFilters] = useState({
    country: '',
    grade: '',
    minAmount: '',
    maxAmount: '',
  });

  // Get unique values for filters
  const uniqueCountries = [...new Set(scholarships.map(s => s.country))];
  const uniqueGrades = [...new Set(scholarships.map(s => s.grade))];

  // Filter and sort scholarships
  const filteredAndSortedScholarships = useMemo(() => {
    let result = scholarships.filter(scholarship => {
      const matchesSearch = 
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCountry = !filters.country || scholarship.country === filters.country;
      const matchesGrade = !filters.grade || scholarship.grade === filters.grade;
      const matchesMinAmount = !filters.minAmount || scholarship.amount >= parseInt(filters.minAmount);
      const matchesMaxAmount = !filters.maxAmount || scholarship.amount <= parseInt(filters.maxAmount);

      return matchesSearch && matchesCountry && matchesGrade && matchesMinAmount && matchesMaxAmount;
    });

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'amount') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      }
    });

    return result;
  }, [scholarships, searchTerm, sortField, sortOrder, filters]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      country: '',
      grade: '',
      minAmount: '',
      maxAmount: '',
    });
    if (onResetFilters) onResetFilters();
  };

  const hasActiveFilters = searchTerm || filters.country || filters.grade || filters.minAmount || filters.maxAmount;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header with Match Result Badge */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isMatchResult ? 'Your Matched Scholarships' : 'All Scholarships'}
        </h2>
        {isMatchResult && (
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
            Top Matches for You
          </span>
        )}
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Countries</option>
            {uniqueCountries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <select
            value={filters.grade}
            onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Grades</option>
            {uniqueGrades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Amount"
            value={filters.minAmount}
            onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Max Amount"
            value={filters.maxAmount}
            onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Showing {filteredAndSortedScholarships.length} of {scholarships.length} scholarships
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                onClick={() => handleSort('name')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Scholarship</span>
                  {sortField === 'name' && (
                    sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('organization')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Organization</span>
                  {sortField === 'organization' && (
                    sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('amount')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Amount</span>
                  {sortField === 'amount' && (
                    sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('grade')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Grade</span>
                  {sortField === 'grade' && (
                    sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('deadline')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Deadline</span>
                  {sortField === 'deadline' && (
                    sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedScholarships.map((scholarship) => (
              <tr key={scholarship.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {scholarship.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {scholarship.description}
                    </div>
                    {scholarship.matchScore && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Match: {scholarship.matchScore}%
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{scholarship.organization}</div>
                  <div className="text-sm text-gray-500">{scholarship.country}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-green-600">
                    ₹{scholarship.amount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {scholarship.grade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(scholarship.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a
                    href={scholarship.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                  >
                    <span>Apply</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedScholarships.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No scholarships found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ScholarshipTable;
