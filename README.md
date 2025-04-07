# Feedback Collector App

A clean and interactive feedback submission application built with **Next.js (App Router)**, **Framer Motion**, and **Tailwind CSS**. Users can submit feedback, view all submissions with search and sort functionalities, and toggle between light and dark mode.

## 🔥 Features

- 🌗 Dark/Light Mode Toggle
- ✅ Email Validation and Form Validation
- 📬 Submit Feedback via API
- 🔄 View Submitted Feedbacks
- ⚡ Framer Motion for smooth transitions
- 🧠 Responsive UI with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend:** React (Next.js with App Router), Tailwind CSS, Framer Motion
- **Backend:** Supabase
- **Icons:** Lucide React
- **HTTP Client:** Axios

## 📁 Folder Structure
- /feedback-app/
- ├── app/
- │   └── page.jsx            # Main page for feedback form and viewer
- ├── public/                 
- ├── styles/                 
- ├── api/
- │   ├── submit-feedback.js  # API route to handle feedback submission
- │   └── feedbacks.js        # API route to fetch all feedback
- ├── package.json
- ├── .env.local              
- ├── tailwind.config.js
- ├── postcss.config.js
- └── next.config.js

## 🚀 Deploy to Netlify:

Go to Netlify and log in.

Click "Add new site" → "Import an existing project".

Connect your GitHub repo (or drag and drop).

Build Command: npm run build

Publish directory: out

Click "Deploy Site".

## 📃 License
This project is licensed under the MIT License.

Made with ❤️ by Ayush Rai