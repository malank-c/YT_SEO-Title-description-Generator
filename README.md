# 🎬 YouTube Title & Description Generator 🎯

Generate **click-worthy titles** and **SEO-optimized descriptions** for your YouTube videos using AI!  
Paste in your video **script or summary**, and let the AI do the magic.

---

## 🚀 Features

- AI-powered catchy title generator
- SEO-optimized description creation
- Elegant, responsive UI
- Built with OpenRouter AI (GPT-powered backend)
- Beautiful Markdown-style output rendering
- Styled with modern fonts, gradients, animations (Framer Motion)

---

## 🛠️ Tech Stack

| Frontend  | Backend   | API              |
|-----------|-----------|------------------|
| React     | Node.js   | OpenRouter API   |
| Tailwind  | Express   | DeepSeekR1 Qwen3 |

---

## 📦 Installation Guide

### Prerequisites

- Node.js v18+  
- Git installed  
- OpenRouter API Key ([get one here](https://openrouter.ai))

---

### Clone the Repository

```bash
git clone https://github.com/your-username/YT_SEO-Title-description-Generator.git
cd YT_SEO-Title-description-Generator
```

---

## 📥 Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

---

## 🔑 Set Up Environment Variables

In the `server` folder, create a `.env` file:

```bash
touch .env
```

Add this line inside the file:

```bash
OPENROUTER_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 💡 Run the Project

### Start Backend Server

```bash
cd server
node index.js
```

### Start Frontend Server

```bash
cd client
npm run dev
```
