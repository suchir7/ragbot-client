# ragbot-client

Clean, minimal chat UI for the RAG chatbot API. Built with React and Vite.

## Tech Stack
- React + Vite
- Axios

## Features
- Real-time chat interface
- Connects to ragbot-api backend
- Fully brandable — swap name, colors, and logo per client
- Keyboard shortcut: Enter to send

## Setup

1. Clone the repo
2. Run `npm install`
3. Open `src/App.jsx` and set your backend URL:
```js
   const API_URL = "http://localhost:3001";
```
4. Run `npm run dev` to start locally

## Build for Production
npm run build