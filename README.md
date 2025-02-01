# Quiz Web Application

## Project Overview

This is a **web-based quiz application** built with **React** and **Express**, featuring **gamification** elements. The application fetches quiz data from a backend Express server that proxies the data from a remote API to avoid CORS issues. The frontend uses **Tailwind CSS** for styling, **Lucide-React** for icons, and **Framer Motion** for animations.

### **Core Features**
- **Start Quiz**: Begin the quiz and display questions one by one.
- **Multiple Choice Questions**: Users can answer the questions with multiple-choice options.
- **Gamification**: Correct and incorrect answers are rewarded with sounds, and the game has a countdown timer.
- **Results Summary**: Display the total points scored at the end of the quiz.

### **Technical Stack**
- **Frontend**: React, Tailwind CSS, Lucide-React, Framer Motion
- **Backend**: Express, Axios (for fetching data), CORS (for enabling cross-origin requests)
- **API**: The quiz data is fetched from a remote API via an Express server that handles CORS issues.

## Features
1. **Responsive Design**: Fully responsive and mobile-friendly layout.
2. **Gamified Elements**: Rewards sound for correct/incorrect answers and provides a visual summary of scores.
3. **Timer**: Timer that counts down during the quiz.
4. **Dynamic Quiz Data**: Fetch quiz questions from the provided API and render them dynamically.

## Issue with CORS (Cross-Origin Resource Sharing)

The API endpoint provided (`https://api.jsonserve.com/Uw5CrX`) is hosted on a different domain, and when directly called from the frontend, it leads to a **CORS issue**. This issue occurs because the browser restricts making requests to a different domain for security reasons.

### **Solution**

To resolve this issue, a simple **Express server** is set up in the backend. The server fetches the quiz data from the external API and sends it to the frontend, thereby bypassing the CORS restrictions.

### **Steps to Set Up and Run the Project**

#### **Step 1: Clone the Repository**

```bash
git clone https://github.com/AshishSharma-0610/quiz-app.git
cd quiz-app 
```
### **Step 2: Set up the Backend**
1. Navigate to the backend folder:

```bash
cd backend
```
2. Install the required dependencies for the backend:

```bash
npm install
```
3. Start the backend server:

```bash
npm start
```
The Express server will run on `http://localhost:3000`. It fetches the quiz data from the remote API and forwards it to the frontend.

### **Step 3: Set up the Frontend**
1. Navigate back to the root folder:

```bash
cd ..
```
2. Navigate to the frontend folder:

```bash
cd frontend
```
3. Install the required dependencies for the frontend:

```bash
npm install
```
4. Start the React development server:

```bash
npm run dev
```
The React app will run on `http://localhost:5173` and will fetch the quiz data from your backend server.

### **Step 4: Access the Application**
Open a browser and go to `http://localhost:5173` to interact with the quiz application.

## **Conclusion**
This project demonstrates how to build a quiz application with gamification features using React and Express. It solves the CORS issue by proxying API requests through a backend Express server, making it possible to fetch quiz data from an external API without security restrictions.

### **Screenshots**

#### 1. Welcome Screen:
![Welcome Screen](Screenshots/WelcomeScreen.jpg)

#### 2. Quiz Question:
![Quiz Question](Screenshots/QuizScreen.jpg)

#### 3. Results Screen:
![Results Screen](Screenshots/ResultsScreen.jpg)

### **Video Walkthrough**

Watch the demo of the application:

Watch the demo video here-https://drive.google.com/file/d/1sihs5G92z-BXmTVceTySlcrbvDjd0kai/view?usp=sharing
