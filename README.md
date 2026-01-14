# ScholarMatch

## Overview
ScholarMatch is an AI-powered decision-support platform that helps polytechnic and university students in Singapore compare scholarships side-by-side. Instead of just checking eligibility, ScholarMatch explains the real trade-offs: bond duration, financial benefits, career flexibility, and long-term risks.

## Features

### 🎯 Scholarship Comparison Tool
- Compare 2–3 scholarships simultaneously
- View key metrics: bond length, allowance, benefits, career flexibility, risk level
- Receive AI-generated insights on trade-offs
- Structured, clear decision-support format

### 🧠 AI Chatbot Agent
- Ask natural language questions about scholarships
- Get personalized guidance based on your priorities
- Understand career flexibility vs. stability trade-offs
- Explore financial implications of different choices

### 🎨 Design System
- Clean, professional interface built with modern CSS
- Fully responsive (mobile-friendly)
- Accessible navigation and forms (WCAG-compliant)
- Consistent typography and colour usage

## Project Structure
```
scholarmatch_raelyn/
├── index.html              # Main HTML file with all sections
├── styles.css              # Main stylesheet with all components
├── js/
│   └── app.js             # JavaScript for comparison & chatbot logic
├── css/
│   └── navbar-styles.css   # Navbar-specific styles
├── images/                 # (Create and add logo.png here)
├── package.json           # Node.js project metadata
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Sections

### 1. Hero Section
- Eye-catching introduction to ScholarMatch
- Call-to-action button to start comparing

### 2. How It Works
- Three-step explanation of the comparison process
- Clear, student-friendly messaging

### 3. Scholarship Comparison Tool
- Multi-select dropdown for choosing scholarships
- Dynamic card rendering showing detailed attributes
- AI-generated insights for selected scholarships

### 4. AI Chatbot
- Interactive chat interface
- Context-aware responses about scholarships
- Keyboard-accessible (Enter to send)

### 5. Final CTA Section
- Encouraging message to take action
- Secondary call-to-action button

### 6. Footer
- Credits and copyright information

## Design System

### Colours
- **Primary Blue:** `#2563EB` — Trust, intelligence, AI guidance
- **Secondary Green:** `#10B981` — Positive outcomes, growth
- **Accent Gold:** `#F59E0B` — Opportunity and achievement
- **Neutral Dark:** `#1F2937` — Headings and structure
- **Neutral Light:** `#F9FAFB` — Section backgrounds

### Typography
- **Font:** Inter (from Google Fonts)
- **Sizes:** 
  - XL: 24px (headings)
  - LG: 20px (subheadings)
  - MD: 16px (body text)
  - SM: 14px (captions)

### Spacing
- XS: 0.5rem
- SM: 1rem
- MD: 1.5rem
- LG: 2rem
- XL: 3rem

## How to Use

### Local Development
1. Open `index.html` in a web browser
2. Use Live Server extension in VS Code for hot reload
3. Make selections in the comparison dropdown to see results
4. Chat with the AI agent using the chatbot interface

### Scholarship Selection
1. Open the dropdown in the "Scholarship Comparison Tool" section
2. Select up to 3 scholarships to compare
3. View side-by-side comparison cards with detailed attributes
4. Read AI-generated insights about trade-offs

### Chatbot
1. Type a question in the chat input (e.g., "Which scholarship is most flexible?")
2. Press Enter or click "Send"
3. Receive AI guidance based on your query

## Scholarships Included

1. **PSC Scholarship** — Government service, 6-year bond, highest allowance
2. **J Scholarship (Industry)** — Industry-sponsored, 3-year bond, professional development
3. **Temasek Foundation Scholarship** — Balanced option, 4-year bond, diverse career paths
4. **NUS OfficialTies Award** — University award, 2-year bond, good flexibility
5. **NTU Merit Award** — University award, 1-year bond, maximum flexibility

## JavaScript Features

### handleScholarshipSelection()
- Listens to dropdown changes
- Validates maximum 3 selections
- Triggers comparison rendering

### renderComparison()
- Dynamically creates comparison cards
- Calls createComparisonCard() for each scholarship
- Generates AI insights

### generateAIResponse()
- Context-aware chatbot responses
- Detects keywords: flexibility, bond, money, stability, etc.
- Provides tailored recommendations

## Accessibility
- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Colour contrast meets WCAG standards
- Focus indicators on interactive elements

## Future Enhancements
- Backend API integration for real scholarship data
- User profiles to track preferences
- Advanced AI with NLP (natural language processing)
- Scholarship eligibility checker
- Printable comparison PDFs
- Dark mode toggle

## Technologies Used
- **HTML5** — Semantic structure
- **CSS3** — Modern styling with variables and grid
- **Vanilla JavaScript** — No dependencies; modular and readable

## Credits
**Team:** Ralph, WangXin, Raelyn, Ee Weng, Aung Myin

---

**ScholarMatch** — Helping students make confident scholarship decisions. 🎓
