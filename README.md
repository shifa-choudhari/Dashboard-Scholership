# 💼 CSR Scholarship Dashboard

A dynamic React dashboard for browsing, filtering, and discovering CSR scholarships with personalized matching and visual analytics.

## ✨ Features

### 🎓 Browse Scholarships
- **Interactive Table**: Sort and filter through 20 diverse CSR scholarships
- **Advanced Filters**: Filter by country, grade level, scholarship amount
- **Real-time Search**: Search by name, organization, or description
- **Detailed Information**: View eligibility requirements, deadlines, and amounts

### 🎯 Match Me Feature
- **Personalized Matching**: Get scholarship recommendations tailored to your profile
- **Intelligent Algorithm**: Matches based on:
  - Grade level compatibility
  - Field of study alignment
  - GPA requirements
  - Family income eligibility
  - Geographic location
- **Match Scores**: See how well each scholarship fits your profile (0-100%)
- **Ranked Results**: Scholarships automatically sorted by match score

### 📊 Visual Analytics
- **Statistical Overview**: Total scholarships, average amounts, funding data
- **Interactive Charts**: 
  - Average scholarship amounts by grade level
  - Distribution across grade levels (pie chart)
  - Scholarship amount ranges
  - Eligibility by family income
  - Top organizations by scholarship count
  - Popular fields of study
- **Key Insights**: Highest scholarships, funding totals, average requirements

## 🚀 Tech Stack

- **React 18**: Modern UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Interactive data visualization
- **Lucide React**: Beautiful icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Project Structure

```
src/
├── components/
│   ├── ScholarshipTable.jsx    # Browse and filter scholarships
│   ├── MatchMeForm.jsx          # Personalized matching form
│   └── AnalyticsCharts.jsx      # Visual analytics dashboard
├── data/
│   └── scholarships.js          # Mock scholarship data (20 scholarships)
├── App.jsx                       # Main application component
└── index.css                     # Tailwind imports and styles
```

## 🎯 Key Features Explained

### Matching Algorithm
The Match Me feature uses a sophisticated scoring algorithm:

1. **Grade Level Match** (25 points): Exact or adjacent grade matches
2. **Field of Study** (30 points): Alignment with eligible fields
3. **GPA Requirements** (20 points): Meets or exceeds minimum GPA
4. **Family Income** (25 points): Within eligibility limits
5. **Geographic Match** (5 points bonus): Same country

Total scores are normalized to 0-100%, with scholarships below 40% filtered out.

### Data Structure
Each scholarship includes:
- Basic info (name, organization, country)
- Financial details (amount, currency)
- Eligibility criteria (GPA, field of study, family income)
- Application details (deadline, URL)

## 🌟 Unique Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Filtering**: Instant results as you type or change filters
- **Visual Feedback**: Color-coded badges, match scores, and status indicators
- **User-Friendly**: Clean interface with intuitive navigation
- **Comprehensive Data**: 20 real CSR scholarships from major Indian companies

## 🔮 Future Enhancements

- Firebase integration for real-time data
- User authentication and saved profiles
- Application tracking system
- Email notifications for deadlines
- Integration with main scholarship platform
- Export functionality (PDF reports)
- Social sharing features

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes!

---

**Built with ❤️ for students seeking educational opportunities**
"# Dashboard-Scholership" 
