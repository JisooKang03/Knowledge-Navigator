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
| ![Login](https://github.com/user-attachments/assets/f2e49f5e-2c22-4580-a5ae-232336c96d7c) | ![Dashboard](<img width="1512" alt="Screenshot 2025-04-26 at 8 48 20 PM" src="https://github.com/user-attachments/assets/12766398-dc49-4b6c-9fff-292a15c0f048" />) | ![Progress](<img width="1512" alt="Screenshot 2025-04-26 at 8 49 14 PM" src="https://github.com/user-attachments/assets/b592076b-9cb0-4286-a78b-0b4cfdaa9b18" />
) |


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
