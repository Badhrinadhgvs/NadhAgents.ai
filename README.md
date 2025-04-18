```markdown
# AI Agent App

A web application for creating and managing AI agents that process tasks using a local large language model (LLM) via Ollama, with a Flask backend and a vanilla HTML/CSS/JavaScript frontend.

## File Structure

```
ai-agent-app/
├── backend/
│   ├── app.py              # Flask application
│   ├── models.py           # Database models
│   ├── routes.py           # API routes with Ollama integration
│   ├── database.py         # Database setup
│   ├── requirements.txt    # Python dependencies
│   ├── .env                # Environment variables
│   └── instance/
│       └── agents.db       # SQLite database
├── frontend/
│   ├── index.html          # Main HTML
│   ├── css/
│   │   └── styles.css      # Stylesheet
│   ├── js/
│   │   └── app.js          # Frontend logic
│   └── assets/
│       ├── images/
│       │   └── logo.png    # Placeholder logo
│       └── fonts/          # Optional fonts
├── README.md               # Documentation
```

## Prerequisites

- Python 3.8+
- Ollama (installed and running)
- A web browser
- A placeholder `logo.png` in `frontend/assets/images/`

## Setup Instructions

### 1. Install Ollama

Download and install Ollama from [Ollama website](https://ollama.com) for your OS.

Pull the llama3.2 model:

```sh
ollama pull llama3.2
```

Start the Ollama server:

```sh
ollama serve
```

### 2. Backend Setup

Navigate to the backend:

```sh
cd ai-agent-app/backend
```

Create and activate a virtual environment:

```sh
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

Install dependencies:

```sh
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with:

```
OLLAMA_API_URL=http://localhost:11434
```

Run the Flask app:

```sh
python app.py
```

The backend will run on `http://localhost:5000`.

### 3. Frontend Setup

Navigate to the frontend:

```sh
cd ai-agent-app/frontend
```

Serve the frontend using a local server:

```sh
python -m http.server 8000
```

Access the app at `http://localhost:8000`.

## Usage

1. Open `http://localhost:8000` in a browser.
2. Enter a task (e.g., `"Schedule a meeting next week"`) and click `"Create Agent."`
3. The task is sent to the backend, processed by Ollama, and displayed with an AI-generated response (e.g., `"Meeting scheduled for next Monday at 10 AM"`).
4. Click `"Delete"` to remove an agent.
5. Check `backend/instance/agents.db` for stored data.

## Troubleshooting

- **CORS Errors**: Ensure the backend is running on `http://localhost:5000` and the frontend is served via a server (not `file://`).
- **Ollama Errors**: Verify Ollama is running (`ollama serve`) and the model is pulled (`ollama list`).
- **Database Issues**: Delete `instance/agents.db` and restart the backend to recreate the database.
- **API Errors**: Check the browser console and Flask terminal for logs.

## Next Steps

- Integrate additional Ollama models (e.g., `mistral` for specific tasks).
- Add authentication to secure API endpoints.
- Deploy the app to a cloud provider (e.g., Heroku, AWS).
- Add logging for debugging and monitoring.

---

This should be a solid `README.md` for your project! Let me know if you'd like any modifications. 🚀
