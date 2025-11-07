// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Cell,
// } from 'recharts';
// import { TrendingUp, Award, DollarSign, Users } from 'lucide-react';

// const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// const AnalyticsCharts = ({ scholarships }) => {
//   // Amount distribution by grade
//   const amountByGrade = scholarships.reduce((acc, s) => {
//     const existing = acc.find(item => item.grade === s.grade);
//     if (existing) {
//       existing.totalAmount += s.amount;
//       existing.count += 1;
//     } else {
//       acc.push({ grade: s.grade, totalAmount: s.amount, count: 1 });
//     }
//     return acc;
//   }, []);

//   const amountByGradeData = amountByGrade.map(item => ({
//     grade: item.grade,
//     avgAmount: Math.round(item.totalAmount / item.count),
//     count: item.count,
//   }));

//   // Scholarships by organization
//   const byOrganization = scholarships.reduce((acc, s) => {
//     acc[s.organization] = (acc[s.organization] || 0) + 1;
//     return acc;
//   }, {});

//   const topOrganizations = Object.entries(byOrganization)
//     .map(([name, value]) => ({ name, value }))
//     .sort((a, b) => b.value - a.value)
//     .slice(0, 10);

//   // Amount ranges
//   const amountRanges = [
//     { range: '0-100k', min: 0, max: 100000 },
//     { range: '100k-150k', min: 100000, max: 150000 },
//     { range: '150k-200k', min: 150000, max: 200000 },
//     { range: '200k+', min: 200000, max: Infinity },
//   ];

//   const amountDistribution = amountRanges.map(({ range, min, max }) => ({
//     range,
//     count: scholarships.filter(s => s.amount >= min && s.amount < max).length,
//   }));

//   // Grade distribution
//   const gradeDistribution = scholarships.reduce((acc, s) => {
//     acc[s.grade] = (acc[s.grade] || 0) + 1;
//     return acc;
//   }, {});

//   const gradeData = Object.entries(gradeDistribution).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   // Field of study popularity
//   const fieldCounts = {};
//   scholarships.forEach(s => {
//     s.eligibility.fieldOfStudy.forEach(field => {
//       if (field !== 'All Fields') {
//         fieldCounts[field] = (fieldCounts[field] || 0) + 1;
//       }
//     });
//   });

//   const topFields = Object.entries(fieldCounts)
//     .map(([name, value]) => ({ name, value }))
//     .sort((a, b) => b.value - a.value)
//     .slice(0, 8);

//   // Income eligibility analysis
//   const incomeRanges = [
//     { range: '0-400k', min: 0, max: 400000 },
//     { range: '400k-600k', min: 400000, max: 600000 },
//     { range: '600k-800k', min: 600000, max: 800000 },
//     { range: '800k+', min: 800000, max: Infinity },
//   ];

//   const incomeEligibility = incomeRanges.map(({ range, min, max }) => ({
//     range,
//     count: scholarships.filter(s => s.eligibility.familyIncome >= min && s.eligibility.familyIncome < max).length,
//   }));

//   // Stats cards data
//   const totalAmount = scholarships.reduce((sum, s) => sum + s.amount, 0);
//   const avgAmount = Math.round(totalAmount / scholarships.length);
//   const maxAmount = Math.max(...scholarships.map(s => s.amount));
//   const minAmount = Math.min(...scholarships.map(s => s.amount));

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Scholarships</p>
//               <p className="text-3xl font-bold text-blue-600">{scholarships.length}</p>
//             </div>
//             <Award className="h-12 w-12 text-blue-600 opacity-20" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Avg Amount</p>
//               <p className="text-3xl font-bold text-green-600">₹{(avgAmount / 1000).toFixed(0)}k</p>
//             </div>
//             <DollarSign className="h-12 w-12 text-green-600 opacity-20" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Max Amount</p>
//               <p className="text-3xl font-bold text-purple-600">₹{(maxAmount / 1000).toFixed(0)}k</p>
//             </div>
//             <TrendingUp className="h-12 w-12 text-purple-600 opacity-20" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Organizations</p>
//               <p className="text-3xl font-bold text-orange-600">{topOrganizations.length}</p>
//             </div>
//             <Users className="h-12 w-12 text-orange-600 opacity-20" />
//           </div>
//         </div>
//       </div>

//       {/* Charts Row 1 */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Average Amount by Grade */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Average Scholarship Amount by Grade
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={amountByGradeData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="grade" />
//               <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
//               <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//               <Bar dataKey="avgAmount" fill="#3b82f6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Grade Distribution Pie */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Scholarships by Grade Level
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={gradeData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {gradeData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Charts Row 2 */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Amount Distribution */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Scholarship Amount Distribution
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={amountDistribution}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="range" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#10b981" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Income Eligibility */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Eligibility by Family Income Range
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={incomeEligibility}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="range" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Charts Row 3 */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Top Organizations */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Top Organizations by Scholarship Count
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={topOrganizations} layout="vertical">
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis type="number" />
//               <YAxis dataKey="name" type="category" width={150} />
//               <Tooltip />
//               <Bar dataKey="value" fill="#8b5cf6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Popular Fields */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Most Popular Fields of Study
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={topFields}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#ec4899" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Insights Section */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="p-4 bg-blue-50 rounded-lg">
//             <p className="text-sm font-medium text-blue-900 mb-1">Highest Scholarship</p>
//             <p className="text-2xl font-bold text-blue-600">₹{maxAmount.toLocaleString()}</p>
//             <p className="text-sm text-blue-700 mt-1">
//               {scholarships.find(s => s.amount === maxAmount)?.name}
//             </p>
//           </div>
//           <div className="p-4 bg-green-50 rounded-lg">
//             <p className="text-sm font-medium text-green-900 mb-1">Most Common Grade</p>
//             <p className="text-2xl font-bold text-green-600">
//               {Object.entries(gradeDistribution).sort((a, b) => b[1] - a[1])[0][0]}
//             </p>
//             <p className="text-sm text-green-700 mt-1">
//               {Object.entries(gradeDistribution).sort((a, b) => b[1] - a[1])[0][1]} scholarships available
//             </p>
//           </div>
//           <div className="p-4 bg-purple-50 rounded-lg">
//             <p className="text-sm font-medium text-purple-900 mb-1">Total Funding Available</p>
//             <p className="text-2xl font-bold text-purple-600">₹{(totalAmount / 1000000).toFixed(2)}M</p>
//             <p className="text-sm text-purple-700 mt-1">Across all scholarships</p>
//           </div>
//           <div className="p-4 bg-orange-50 rounded-lg">
//             <p className="text-sm font-medium text-orange-900 mb-1">Average GPA Requirement</p>
//             <p className="text-2xl font-bold text-orange-600">
//               {(scholarships.reduce((sum, s) => sum + s.eligibility.minGPA, 0) / scholarships.length).toFixed(2)}
//             </p>
//             <p className="text-sm text-orange-700 mt-1">On a 4.0 scale</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsCharts;
