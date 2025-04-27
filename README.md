# Knowledge Navigator 📚

A modern course management web application built with Next.js, Firebase, TailwindCSS, and Chart.js.
Users can sign up, log in, create courses, add lessons, drag & drop reorder, unlock badges, and track their progress — with live updates and celebrations! 🎉

---

## 🚀 Features

🔐 Authentication (Login / Signup / Update / Logout) with Firebase

📖 Add, complete, undo, delete lessons inside each course

📦 Drag and Drop lesson reordering (@hello-pangea/dnd)

🏆 Gamified Progress

Unlock badges every 5 completed lessons

Level up every 10 lessons completed

🎉 Confetti and Celebration Sound on unlock

📈 Progress Charts

Doughnut Progress Chart (Courses)

Animated Progress Bars (Lessons)

🎖️ Achievement Gallery

Live badge and level updates (no page refresh)

Toggle between "Show All" and "Unlocked Only"

🖼️ Profile Management

Update Name, Email, Password, Add Phone

Secure Delete Account

🌐 Protected Routes (dashboard, gallery, profile require login)

🎨 Responsive UI with beautiful TailwindCSS design

🎯 Real-time updates using Firebase onSnapshot


---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Other |
|:---|:---|:---|:---|
| React.js | Next.js | Firebase Firestore | TailwindCSS |
| NextAuth | Node.js (built-in) | Firebase Authentication | Chart.js | @hello-pangea/dnd, MP3 Sound Effects |

---

## 📸 Screenshots

| Login Page | Sign Up Page | Dashboard | Course Progress |
![Login](https://github.com/user-attachments/assets/f2e49f5e-2c22-4580-a5ae-232336c96d7c) ![Sign Up Page](https://github.com/user-attachments/assets/5db7e7b6-40fb-433d-a502-aa42f12c776a)
![Dashboard](https://github.com/user-attachments/assets/d33808b1-54d7-4811-ba71-a0e526df668e)![Progress](https://github.com/user-attachments/assets/81d49a6a-aff9-4f92-bdb2-e8078534a2f5) 
![Badges](https://github.com/user-attachments/assets/d786bcda-be89-4c48-a531-efbf5edc863c)


## 🔥 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Knowledge-Navigator.git
cd Knowledge-Navigator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

- Create a **Firebase Project**
- Enable **Authentication** (Email/Password)
- Create a **Firestore Database**
- Add your Firebase config to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

_(already set up in your project ✅)_

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🚀

---

## 🧠 Project Structure

```
src/
  components/
    Navbar.jsx
    AddCourseForm.jsx
    ProgressChart.jsx
  pages/
    index.jsx
    login.jsx
    signup.jsx
    dashboard.jsx
    courses/
      [id].jsx
  lib/
    firebase.js
  utils/
    protectedRoute.js
  styles/
    globals.css
```

---

## ✨ Future Improvements

- Add "Edit Course" and "Delete Course" functionality
- Allow reordering lessons
- Add user profile pages
- Dark mode support 🌑
- Notifications and Toast messages

---

## 🙌 Credits

Built with ❤️ by [JI-SOO KANG].

---
