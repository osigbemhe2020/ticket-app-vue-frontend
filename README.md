
# Ticket Management System - Vue.js Frontend

A modern, responsive ticket management system frontend built with Vue.js for the HNG Stage 2 task.

## 🚀 Features

- **User Authentication**: Login and registration system
- **Ticket Management**: Create, read, update, and delete tickets
- **User-specific Data**: Each user only sees their own tickets
- **Real-time Dashboard**: Overview of ticket statistics
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and Lucide icons
- **Vue 3 Composition API**: Modern Vue development

## 🛠 Tech Stack

- **Frontend Framework**: Vue 3
- **Router**: Vue Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide Vue Next
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **State Management**: Vue Composition API (ref, computed)

## 📦 Installation
1. if you want the full project not seprated into frontend and backend 
```
clone https://github.com/osigbemhe2020/hng_ticket_app_vue.git
cd hng-ticket-app-vue
npm install
npm start
```
Open http://localhost:5173 in your browser.

## Project Structure
```
text
src/
├── components/           # Reusable components
├── views/               # Page components
│   ├── Dashboard.vue    # Dashboard page
│   ├── Login.vue        # Login page
│   └── Signup.vue      # SignUp page
    └── Management.vue   # Ticket management page
    └── Home.vue         #  Landing page
├── router/              # Vue Router configuration
│   └── index.js        # Route definitions
├── services/            # API services
│   └── api.js          # Axios configuration and API calls
├── App.vue             # Root component
└── main.js             # Application entry point
```

## Key Components
### Pages
-Dashboard: Overview with ticket statistics and quick actions
-Management: Full ticket CRUD operations with modal forms
-Login: User authentication form

### Features
-Ticket Cards: Individual ticket display with status badges
-Search Functionality: Filter tickets by title in real-time
-Modal Forms: Clean, accessible forms for ticket creation/editing
-Toast Notifications: User feedback for actions
-Responsive Grid: Adaptive layout for all screen sizes

## deployment 
live @ https://ticket-app-vue-frontend.vercel.app/
