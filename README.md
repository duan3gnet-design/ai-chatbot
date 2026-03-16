# 🤖 AI Chatbot

A smart chatbot web application powered by Cohere AI, built with React and FastAPI.

## 🔗 Demo
[Live Demo](https://ai-chatbot-rosy-theta.vercel.app/)

## 🛠 Tech Stack
- **Frontend:** React, Vite
- **Backend:** Python, FastAPI
- **AI:** Cohere Command-R
- **Deploy:** Vercel (frontend), Render (backend)

## ✨ Features
- Real-time AI conversation
- Chat history maintained during session
- Clean and responsive UI
- RESTful API backend

## 🚀 Getting Started

### Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## 📁 Project Structure
```
ai-chatbot/
├── backend/
│   ├── main.py
│   └── requirements.txt
└── frontend/
    └── src/
        ├── App.jsx
        └── components/
            └── ChatBox.jsx
```