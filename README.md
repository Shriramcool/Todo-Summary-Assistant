#  Todo Summary Assistant

**Todo Summary Assistant** is a modern full-stack productivity tool that lets users manage their tasks, automatically generate intelligent summaries of pending todos using a language model, and receive those summaries directly in Slack. It’s designed to streamline your workflow and keep your team informed.

---

##  Key Features

- **Task Management** – Add, view, and delete todos with an intuitive React interface
- **Smart Summarization** – Generate concise summaries of pending tasks via a language model API (Cohere)
- **Slack Notifications** – Send summaries directly to your Slack workspace using webhooks
- **Cloud Storage** – Tasks are stored in a secure, scalable Supabase PostgreSQL database
- **Live Feedback** – Get real-time success or error messages for every operation

---

##  Tech Overview

| Layer         | Tools & Services                    |
|---------------|-------------------------------------|
| Frontend      | React, Axios                        |
| Backend       | Node.js, Express                    |
| Database      | Supabase (PostgreSQL)               |
| LLM Service   | Cohere API                          |
| Notifications | Slack Incoming Webhooks             |


---

## 📁 Folder Structure

todo-summary-assistant/
├── frontend/
│ └── src/
│ ├── components/
│ ├── App.js
│ ├── App.css
│ └── index.js
├── backend/
│ └── src/
│ ├── routes/
│ ├── services/
│ └── index.js


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shriramcool/Todo-Summary-Assistant
cd todo-summary-assistant

### 2. Set Up the Backend

cd backend
npm install
cp .env.example .env
# ➤ Fill in SUPABASE_URL, SUPABASE_KEY, COHERE_API_KEY, SLACK_WEBHOOK_URL
npm start

### 3. Set Up the Frontend

cd ../frontend
npm install
cp .env.example .env
# ➤ Set REACT_APP_API_URL=http://localhost:5000/api
