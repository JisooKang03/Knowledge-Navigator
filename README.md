# Knowledge Navigator 🚀

Track your learning progress, manage courses, and visualize achievements — built with **Next.js**, **Firebase**, and **Chart.js**.

## ✨ Features

- 🔐 Authentication (Login / Signup with Firebase)
- 📚 Add & Manage Courses
- 📝 Add & Complete Lessons
- 📈 Real-Time Progress Charts (Doughnut Chart)
- 🧠 Protected Routes (only logged-in users can access Dashboard)
- 🎨 Modern Responsive UI (TailwindCSS)

## ⚙️ Tech Stack

- **Next.js 15** (React Framework)
- **Firebase** (Auth + Firestore Database)
- **Tailwind CSS** (for Styling)
- **Chart.js** (for Progress Charts)

## 📸 Screenshots

| Login Page | Dashboard | Course Progress |
|:---|:---|:---|
| ![Login](screenshots/login.png) | ![Dashboard](screenshots/dashboard.png) | ![Progress](screenshots/progress.png) |

> (You can upload some screenshots inside `/public/screenshots/`)

## 🚀 Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/YOUR_USERNAME/knowledge-navigator.git

npm install

NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

npm run dev
