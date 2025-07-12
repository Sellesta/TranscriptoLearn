# TranscriptoLearn

**AI Learning Assistant for YouTube Lectures**  
Transform any YouTube lecture into structured notes, summaries, and interactive Q&A—instantly.
---

## 🎥 Demo Video

<video src="https://github.com/Sellesta/TranscriptoLearn/raw/main/bandicam%202025-07-12%2014-56-39-071.mp4" controls width="100%"></video>
---

## ✨ Features

- **Paste any YouTube lecture video URL**
- **AI extracts and processes the transcript**
- **Get smart notes, summaries, and full transcripts**
- **Ask questions about the video content (AI Q&A)**
- **Export notes for studying or sharing**
- **Modern, learning-friendly UI**

---

## 🚀 Quick Start

### 1. Clone & Set Up Backend

```bash
git clone https://github.com/your-username/TranscriptoLearn.git
cd TranscriptoLearn
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate
pip install -r requirements.txt
```

### 2. Add Your API Key

Create a `.env` file in the project root with:

```
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Start the Backend

```bash
python app.py
```
The backend will run on [http://localhost:5000](http://localhost:5000)

---

### 4. Set Up & Start the Frontend

```bash
cd client
npm install
npm start
```
The frontend will run on [http://localhost:3000](http://localhost:3000)

---

## 📝 Usage

1. **Paste a YouTube lecture video URL**
2. **Click “Generate Smart Notes & Summary”**
3. **Review the AI-generated notes, summary, and transcript**
4. **Ask questions in the Q&A tab**
5. **Export notes for your study sessions**

---

## 🛠️ Tech Stack

- **Backend:** Flask, Groq API (LLaMA 3), LangChain, FAISS, YouTube Transcript API, yt-dlp
- **Frontend:** React.js, Tailwind CSS, Lucide Icons

---

## 🧑‍🎓 Why TranscriptoLearn?

TranscriptoLearn bridges the gap between passive video watching and active learning.  
With a single click, you get:
- **Structured, easy-to-review notes**
- **Concise summaries**
- **Full transcripts**
- **An AI assistant to answer your questions**

Perfect for students, educators, and lifelong learners.

---

## 🏗️ SaaS-Ready?  
Want to turn this into a SaaS platform?  
- Add user authentication (Auth0, Firebase, or Flask-Login)
- Store user data in a cloud database (Postgres, Supabase, etc.)
- Integrate Stripe for payments/subscriptions
- Deploy on Heroku, Render, Vercel, or AWS

---

## 🐞 Troubleshooting

### Backend:  
If you see `ModuleNotFoundError: No module named 'sentence_transformers'`  
→ Run:  
```sh
pip install sentence-transformers
```

### Frontend:  
If you see `npm error enoent ... Could not read package.json ...`  
→ Make sure you are in the `client` folder before running `npm start`.

---

## 📬 Need Help?

If you get stuck, open an issue or contact the me.

---

**Happy Learning!**  
TranscriptoLearn Team
