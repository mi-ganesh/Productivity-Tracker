# 📊 Productivity Tracker – Chrome Extension & Analytics Dashboard

A full-stack **Productivity Tracker** that monitors time spent on websites using a **Chrome Extension** and provides **real-time productivity analytics** through a **React dashboard**.

---

## 🚀 Project Overview

The Productivity Tracker automatically tracks how much time a user spends on different websites, classifies them as **Productive** or **Unproductive**, and visualizes the data using interactive charts.

The system consists of:
- A **Chrome Extension** for time tracking
- A **Node.js + Express backend** for data storage and analytics
- A **MongoDB Atlas database**
- A **React dashboard** for real-time visualization

---

## 🎯 Features

- ⏱️ Automatic website time tracking  
- 🗂️ Website classification (Productive / Unproductive)  
- 📤 Live data sync from extension to backend  
- 📊 Real-time Pie Chart analytics  
- 📅 Weekly productivity report  
- 🔐 Secure environment variable handling  

---

## How To Run :

- cd backend
- npm install

- Create a .env file:
- MONGO_URI=your_mongodb_connection_string
- PORT=5000
- Run backend:

- npm run dev
- Backend runs at: http://localhost:5000


#Frontend Setup
- cd frontend
- npm install
- npm start
- Frontend runs at:
http://localhost:3000

---

## Chrome Extension Setup

- Open Chrome
- Go to chrome://extensions
- Enable Developer Mode
- Click Load unpacked

- Select the extension/ folder

- The extension will start tracking automatically.

## 📊 Viewing Analytics
- Real-time Pie Chart:
- 👉 http://localhost:3000

- Backend Weekly Report API:
- 👉 http://localhost:5000/weekly-report

---

<p align="center">
  <img src="https://github.com/mi-ganesh/Productivity-Tracker/blob/acc0577d92a8ba7eb3c49242c7e4889243ea3b4e/SS-Pie%20graph.png" width="600">
</p>

---

<p align="center">
  <img src="" width="600">
</p>



