# Technical Documentation

## Architecture Overview

### Component Hierarchy
```
App.jsx (Root)
├── Header (inline)
├── Navigation Tabs (inline)
├── Main Content (conditional rendering)
│   ├── ScholarshipTable.jsx
│   ├── MatchMeForm.jsx
│   └── AnalyticsCharts.jsx
└── Footer (inline)
```

### State Management
- **Local State**: Each component manages its own UI state
- **Prop Drilling**: Match results passed from MatchMeForm to App to ScholarshipTable
- **No Global State**: Intentionally kept simple for portfolio/demo purposes

### Data Flow
1. Mock data imported from `data/scholarships.js`
2. MatchMeForm calculates scores → sends results to App
3. App updates filteredScholarships state → passes to ScholarshipTable
4. Analytics directly consumes original scholarship data

## Component Deep Dive

### App.jsx
**Purpose**: Main container and state coordinator

**State:**
- `filteredScholarships`: Currently displayed scholarships
- `activeTab`: Which tab is visible (browse/match/analytics)
- `matchResults`: Results from Match Me algorithm

**Key Functions:**
- `handleMatchResults()`: Receives match results and updates UI
- `handleResetFilters()`: Resets to all scholarships

### ScholarshipTable.jsx
**Purpose**: Display and filter scholarship list

**State:**
- `searchTerm`: Current search query
- `sortField`: Which column to sort by
- `sortOrder`: Ascending or descending
- `filters`: Object containing all filter values

**Key Functions:**
- `filteredAndSortedScholarships`: useMemo hook for performance
- `handleSort()`: Toggle sort order or change sort field
- `clearFilters()`: Reset all filters

**Performance Optimizations:**
- useMemo for filtered data (prevents recalculation on every render)
- Debouncing could be added for search input (future enhancement)

### MatchMeForm.jsx
**Purpose**: Collect user data and calculate matches

**State:**
- `formData`: User's profile information
- `isMatching`: Loading state during calculation

**Key Functions:**
- `calculateMatchScore(scholarship)`: Core matching algorithm
  - Returns score 0-100
  - Weighted scoring system
  - Bonus points for exceeding minimums

**Algorithm Logic:**
```javascript
Score Components:
- Grade Match: 25 base + partial matches
- Field Match: 30 base + "All Fields" consideration
- GPA Match: 20 base + 10 bonus for exceeding
- Income Match: 25 base + 10 bonus for lower income
- Country Match: 5 bonus points

Total normalized to 100%
Filter: Only show scores >= 40%
```

### AnalyticsCharts.jsx
**Purpose**: Visualize scholarship data

**Data Transformations:**
1. `amountByGrade`: Aggregate and average by grade
2. `byOrganization`: Count scholarships per org
3. `amountDistribution`: Group by amount ranges
4. `gradeDistribution`: Count by grade
5. `fieldCounts`: Parse and count field occurrences
6. `incomeEligibility`: Group by income ranges

**Chart Types Used:**
- BarChart: Amounts, organizations, fields
- PieChart: Grade distribution
- LineChart: Income eligibility trend

## Data Structure

### Scholarship Object
```javascript
{
  id: number,
  name: string,
  organization: string,
  country: string,
  amount: number,
  currency: string,
  grade: string,
  eligibility: {
    minGPA: number,
    fieldOfStudy: string[],
    familyIncome: number,
    requirements: string
  },
  deadline: string (ISO date),
  description: string,
  applicationUrl: string,
  matchScore?: number (added by matching)
}
```

## Styling Architecture

### Tailwind CSS Setup
- Custom color palette in `tailwind.config.js`
- Primary color: Blue (#3b82f6)
- Responsive breakpoints: sm, md, lg
- Custom utilities: None (using default)

### Design System
**Colors:**
- Primary (Blue): CTA buttons, headers, primary actions
- Green: Financial amounts, success states
- Orange/Purple/Pink: Analytics variety
- Gray: Text hierarchy, borders, backgrounds

**Spacing:**
- Consistent padding: p-4, p-6, p-8
- Gap utilities: space-x-*, space-y-*
- Container: max-w-7xl with auto margins

**Typography:**
- Headers: font-bold with size hierarchy
- Body: Default sans-serif stack
- Emphasis: font-semibold, font-medium

## Performance Considerations

### Current Optimizations
1. **useMemo**: Filtering/sorting in ScholarshipTable
2. **Conditional Rendering**: Only mount active tab
3. **Responsive Charts**: Auto-sizing containers

### Future Optimizations
1. **React.memo**: Memoize components
2. **Virtual Scrolling**: For large scholarship lists
3. **Code Splitting**: Lazy load tabs
4. **Search Debouncing**: Reduce filter operations

## Testing Strategy

### Manual Testing Checklist
- [ ] Search functionality works
- [ ] All filters apply correctly
- [ ] Sorting toggles properly
- [ ] Match Me calculates scores
- [ ] Charts render with data
- [ ] Mobile responsiveness
- [ ] No console errors

### Automated Testing (Future)
```javascript
// Example test structure
describe('ScholarshipTable', () => {
  it('filters by search term', () => {
    // Test search
  });
  
  it('sorts by amount', () => {
    // Test sorting
  });
});
```

## Build & Deployment

### Development
```bash
npm run dev  # Starts Vite dev server
```

### Production Build
```bash
npm run build  # Creates optimized build in /dist
npm run preview  # Preview production build
```

### Deployment Options
1. **Vercel**: Zero-config (recommended)
2. **Netlify**: Drag-and-drop dist folder
3. **GitHub Pages**: Use gh-pages package
4. **Self-hosted**: Serve dist folder with any static server

## Environment Variables
Currently no environment variables needed. For future API integration:
```
VITE_API_URL=https://api.example.com
VITE_FIREBASE_KEY=xxx
```

## Browser Support
- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile: iOS 14+, Android 8+

## Dependencies

### Production
- react: ^18.3.1
- react-dom: ^18.3.1
- recharts: ^2.15.0 (charts)
- lucide-react: ^0.469.0 (icons)

### Development
- vite: ^7.2.1
- @vitejs/plugin-react: ^4.3.4
- tailwindcss: ^3.4.17
- postcss: ^8.4.49
- autoprefixer: ^10.4.20

## API Integration Guide (Future)

### Step 1: Create API Service
```javascript
// src/services/api.js
export const fetchScholarships = async () => {
  const response = await fetch('/api/scholarships');
  return response.json();
};
```

### Step 2: Update App.jsx
```javascript
useEffect(() => {
  fetchScholarships().then(setScholarships);
}, []);
```

### Step 3: Add Loading States
```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

## Common Issues & Solutions

### Issue: Tailwind styles not applying
**Solution**: Ensure index.css imports Tailwind directives

### Issue: Charts not rendering
**Solution**: Check ResponsiveContainer has height set

### Issue: Filters not working
**Solution**: Verify filter state is properly passed to useMemo dependencies

### Issue: Match scores incorrect
**Solution**: Check GPA and income are parsed as numbers

## Code Style Guide

### Naming Conventions
- Components: PascalCase (ScholarshipTable)
- Functions: camelCase (handleSort)
- Constants: UPPER_SNAKE_CASE (COLORS)
- Files: PascalCase for components, camelCase for utilities

### Import Order
1. React imports
2. Third-party libraries
3. Local components
4. Local utilities/data
5. Styles (if any)

### Component Structure
```javascript
// 1. Imports
// 2. Constants
// 3. Component declaration
// 4. State hooks
// 5. Effect hooks
// 6. Handler functions
// 7. Computed values
// 8. Return JSX
// 9. Export
```

## Contribution Guidelines

### Adding New Scholarships
Edit `src/data/scholarships.js`:
- Follow existing structure
- Ensure unique ID
- Use ISO date format for deadline
- Include all required fields

### Adding New Features
1. Create feature branch
2. Implement in appropriate component
3. Test thoroughly
4. Update documentation
5. Create pull request

## Performance Metrics

### Target Metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

### Current Performance
- Bundle Size: ~500KB (uncompressed)
- Initial Load: ~1s (local)
- Re-render Time: < 50ms

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Maintainer**: Your Name
