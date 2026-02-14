# InnoHack - Student Innovation Platform

**Discover Hackathons. Preserve Innovation.**

A modern React-based web application for students to discover hackathons, track applications, and explore innovation projects.

## Features

- 🏠 **Home Page**: Welcome page with platform overview
- 🏆 **Hackathons**: Browse and search hackathons with domain filters
- 📊 **My Hackathons**: Track your hackathon applications
- 💡 **Innovation Repository**: Explore student projects
- 👨‍💼 **Admin Panel**: Add new hackathons (admin functionality)

## Tech Stack

- React.js 18
- React Router v6
- Plain CSS (Mobile Responsive)
- Functional Components with Hooks

## Project Structure

```
InnoHack/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Navbar.css
│   │   ├── Footer.js
│   │   ├── Footer.css
│   │   ├── HackathonCard.js
│   │   ├── HackathonCard.css
│   │   ├── ProjectCard.js
│   │   └── ProjectCard.css
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── Hackathons.js
│   │   ├── Hackathons.css
│   │   ├── MyHackathons.js
│   │   ├── MyHackathons.css
│   │   ├── Repository.js
│   │   ├── Repository.css
│   │   ├── Admin.js
│   │   └── Admin.css
│   ├── data/
│   │   └── mockData.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

## Features Overview

### Home Page
- Hero section with tagline
- Feature highlights
- Call-to-action buttons

### Hackathons Page
- Display all hackathons in card format
- Search functionality
- Domain filter dropdown
- Responsive grid layout

### My Hackathons Page
- Shows applied hackathons
- Status tracking
- Clean card layout

### Innovation Repository
- Grid of student projects
- Project details (title, tech stack, description)
- Hover effects

### Admin Panel
- Form to add new hackathons
- Fields: Name, College, Domain, Deadline, Description
- Form validation

## Mock Data

The application uses mock data stored in `src/data/mockData.js`. This can be easily replaced with API calls when connecting to a backend.

## Backend Integration

To connect to a MERN backend:

1. Replace mock data imports with API calls using `fetch` or `axios`
2. Add state management (Context API or Redux) if needed
3. Implement authentication for admin routes
4. Add form submission handlers to POST data to backend
5. Update environment variables for API endpoints

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Future Enhancements

- User authentication
- Backend API integration
- Database connectivity (MongoDB)
- Application submission functionality
- Project upload feature
- User profiles
- Real-time notifications

## License

This project is part of a MERN stack application for educational purposes.

---

Built with ❤️ for student innovation
