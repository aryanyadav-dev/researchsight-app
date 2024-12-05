
# Research Insights Application

This project is a comprehensive research insights application that combines **Next.js** for the landing page (frontend) and **Streamlit** for the backend, enabling users to explore and analyze research papers from multiple sources, including **arXiv**, **PubMed**, and **Google Custom Search API**. The application also supports **PDF uploads** for extracting text and generating related insights.

---

## Features

### Landing Page (Frontend)
- **Framework**: Built using **Next.js**.
- **Interactive UI**: Clean and responsive interface that guides users to the research analysis tool.
- **Local Development**: Run the landing page locally using `npm run dev`.

### Backend (Streamlit Application)
- **PDF Analysis**: Upload a research paper in PDF format and extract text for analysis.
- **Multi-Source Insights**: Fetch relevant papers from:
  - **arXiv**
  - **PubMed**
  - **Google Custom Search**
- **Mindmap Generation**: Download research insights as a **PDF mindmap**.
- **Search History**:
  - Retain search queries in a clickable sidebar for revisiting results.
  - Delete entries using a trash can icon.
- **Dynamic Query Input**: Type a query to get insights directly from external sources.

---

## Prerequisites

### Backend Requirements
- **Python 3.8+**
- Python libraries:
  - `streamlit`
  - `requests`
  - `xml.etree.ElementTree`
  - `reportlab`
  - `Pillow`
  - `PyMuPDF` (for extracting text from PDF files)

### Frontend Requirements
- **Node.js** and **npm** (to run the Next.js application)

---

## Installation and Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-repo/research-insights-app.git
cd research-insights-app
```

### Step 2: Backend Setup
1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Set up API Keys**:
   - Create a `.streamlit/secrets.toml` file:
     ```toml
     GOOGLE_API_KEY = "your-google-api-key"
     SEARCH_ENGINE_ID = "your-search-engine-id"
     ```
   - Replace the placeholders with your **Google Custom Search API** credentials.

4. **Run the Streamlit app**:
   ```bash
   streamlit run app.py
   ```

5. Open the app in your browser at: [http://localhost:8501](http://localhost:8501)

### Step 3: Frontend Setup
1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the Next.js development server**:
   ```bash
   npm run dev
   ```

4. Open the landing page in your browser at: [http://localhost:3000](http://localhost:3000)

---

## Usage

1. **Access the landing page** at [http://localhost:3000](http://localhost:3000).
   - Explore the interface and click **Launch App** to redirect to the backend Streamlit app.

2. **In the Streamlit app**:
   - **Upload a PDF** to analyze and fetch related research insights.
   - **Enter a research query** to find papers from various sources.
   - **Download the Mindmap PDF** for a summary of research insights.
   - Access **previous searches** from the sidebar or delete them.

---

## API Information

### Google Custom Search API
- **Endpoint**: `https://www.googleapis.com/customsearch/v1`
- **Keys**:
  - API Key (`GOOGLE_API_KEY`)
  - Search Engine ID (`SEARCH_ENGINE_ID`)

### arXiv API
- **Endpoint**: `http://export.arxiv.org/api/query`
- **Query Parameters**:
  - `search_query`: The search term.
  - `start`: Starting index for results.
  - `max_results`: Maximum number of results to fetch.

### PubMed API
- **Endpoints**:
  - Search: `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi`
  - Summary: `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi`
