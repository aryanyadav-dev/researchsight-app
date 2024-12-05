import streamlit as st
import requests
from xml.etree import ElementTree as ET
import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from PIL import Image

# Configuration for APIs
GOOGLE_API_KEY = st.secrets.get("GOOGLE_API_KEY", "your-google-api-key")
SEARCH_ENGINE_ID = st.secrets.get("SEARCH_ENGINE_ID", "your-search-engine-id")
ARXIV_API_URL = "http://export.arxiv.org/api/query"
PUBMED_API_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
PUBMED_SUMMARY_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
SCRAPING_LIMIT = 20  # Limit for scraping results from Google, PubMed, and arXiv

# Initialize session state for history and searches
if 'history' not in st.session_state:
    st.session_state['history'] = []

def extract_pdf_text(uploaded_file):
    """ Extract text from uploaded PDF file using PyMuPDF """
    try:
        import fitz  # PyMuPDF
        pdf_document = fitz.open(stream=uploaded_file.read(), filetype="pdf")
        text = ""
        for page_num in range(pdf_document.page_count):
            page = pdf_document[page_num]
            text += page.get_text()
        pdf_document.close()
        return text
    except Exception as e:
        st.error(f"Error extracting PDF text: {e}")
        return None

def search_arxiv(query):
    """ Search for relevant papers on arXiv """
    params = {'search_query': query, 'start': 0, 'max_results': SCRAPING_LIMIT}
    response = requests.get(ARXIV_API_URL, params=params)
    if response.status_code == 200:
        try:
            root = ET.fromstring(response.text)
            entries = root.findall('{http://www.w3.org/2005/Atom}entry')
            papers = []
            for entry in entries:
                title = entry.find('{http://www.w3.org/2005/Atom}title').text
                summary = entry.find('{http://www.w3.org/2005/Atom}summary').text
                link = entry.find('{http://www.w3.org/2005/Atom}id').text
                papers.append({"title": title, "summary": summary, "link": link})
            return papers
        except Exception as e:
            st.error(f"Error parsing arXiv data: {e}")
    return []

def search_pubmed(query):
    """ Search for relevant papers on PubMed using their API """
    params = {'db': 'pubmed', 'term': query, 'retmode': 'xml', 'retmax': SCRAPING_LIMIT}
    response = requests.get(PUBMED_API_URL, params=params)
    if response.status_code == 200:
        try:
            root = ET.fromstring(response.text)
            ids = root.findall('.//Id')
            papers = []
            for pubmed_id in ids:
                pmid = pubmed_id.text
                summary_params = {'db': 'pubmed', 'id': pmid, 'retmode': 'xml'}
                summary_response = requests.get(PUBMED_SUMMARY_URL, params=summary_params)
                summary_root = ET.fromstring(summary_response.text)
                title = summary_root.find('.//DocSum//Item[@Name="Title"]').text
                source = summary_root.find('.//DocSum//Item[@Name="Source"]').text
                link = f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/"
                papers.append({"title": title, "summary": source, "link": link})
            return papers
        except Exception as e:
            st.error(f"Error parsing PubMed data: {e}")
    return []

def google_search(query):
    """ Use Google Custom Search to get related research papers """
    search_url = f"https://www.googleapis.com/customsearch/v1?q={query}&key={GOOGLE_API_KEY}&cx={SEARCH_ENGINE_ID}"
    response = requests.get(search_url)
    if response.status_code == 200:
        try:
            results = response.json()
            papers = []
            for item in results.get('items', []):
                title = item.get('title')
                snippet = item.get('snippet')
                link = item.get('link')
                papers.append({"title": title, "summary": snippet, "link": link})
            return papers
        except Exception as e:
            st.error(f"Error parsing Google search results: {e}")
    return []

def create_mindmap_pdf(papers):
    """ Create a PDF mindmap of research papers and links """
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    c.setFont("Helvetica", 10)
    c.drawString(100, 750, "Research Mindmap")
    y = 730
    for paper in papers:
        c.setFont("Helvetica", 8)
        c.setFillColor(colors.black)
        c.drawString(100, y, f"Title: {paper['title']}")
        c.drawString(100, y - 10, f"Summary: {paper['summary']}")
        c.drawString(100, y - 20, f"Link: {paper['link']}")
        y -= 40
        if y < 50:  # Page overflow
            c.showPage()
            y = 750
    c.save()
    buffer.seek(0)
    return buffer

def display_sidebar_history():
    """ Display search history in sidebar with clickable queries and trash can icons """
    st.sidebar.title("Search History")
    for idx, item in enumerate(st.session_state['history']):
        # Create a clickable title
        if st.sidebar.button(f"Show results for: {item['query']}", key=f"history_{idx}"):
            st.session_state['current_results'] = item['results']
        
        # Trash can icon to delete
        delete_icon = Image.open("trash_can_icon.png")  # You can upload an icon image (make sure the icon is in the correct path)
        delete_button = st.sidebar.button('', key=f"delete_{idx}", help="Delete", image=delete_icon)
        if delete_button:
            st.session_state['history'].pop(idx)
            st.experimental_rerun()

def main():
    st.title("Researchsight AI: Comprehensive Analysis")
    
    # Display sidebar history
    display_sidebar_history()
    
    # Show results of clicked search history
    if 'current_results' in st.session_state:
        st.subheader("Previous Search Results")
        for paper in st.session_state['current_results']:
            st.write(f"**Title**: {paper['title']}")
            st.write(f"**Summary**: {paper['summary']}")
            st.write(f"**Link**: {paper['link']}")
            st.write("\n")
    
    # Upload PDF
    st.header("Upload Research Paper")
    uploaded_file = st.file_uploader("Upload a PDF", type=["pdf"])
    
    if uploaded_file:
        paper_text = extract_pdf_text(uploaded_file)
        if paper_text:
            st.subheader("Paper Analysis")
            
            # Get insights from multiple sources
            st.subheader("Related Research Papers")
            query = paper_text[:500]  # Using the first 500 characters for search query
            arxiv_papers = search_arxiv(query)
            pubmed_papers = search_pubmed(query)
            google_papers = google_search(query)
            
            all_papers = []
            all_papers.extend(arxiv_papers)
            all_papers.extend(pubmed_papers)
            all_papers.extend(google_papers)

            # Display the papers
            for paper in all_papers:
                st.write(f"**Title**: {paper['title']}")
                st.write(f"**Summary**: {paper['summary']}")
                st.write(f"**Link**: {paper['link']}")
                st.write("\n")

            # Generate Mindmap PDF
            st.subheader("Download Mindmap PDF")
            mindmap = create_mindmap_pdf(all_papers)
            st.download_button("Download Mindmap", mindmap, "mindmap.pdf", "application/pdf")
            
            # Add to history
            search_prompt = {"query": f"Analyzed: {uploaded_file.name}", "results": all_papers}
            st.session_state['history'].append(search_prompt)
    
    # Research Query
    st.header("Research Query")
    research_query = st.text_area("Enter a research topic or question")
    if st.button("Get Insights"):
        st.subheader("Related Research Papers")
        arxiv_papers = search_arxiv(research_query)
        pubmed_papers = search_pubmed(research_query)
        google_papers = google_search(research_query)
        
        all_papers = []
        all_papers.extend(arxiv_papers)
        all_papers.extend(pubmed_papers)
        all_papers.extend(google_papers)

        # Display the papers
        for paper in all_papers:
            st.write(f"**Title**: {paper['title']}")
            st.write(f"**Summary**: {paper['summary']}")
            st.write(f"**Link**: {paper['link']}")
            st.write("\n")

        # Generate Mindmap PDF
        st.subheader("Download Mindmap PDF")
        mindmap = create_mindmap_pdf(all_papers)
        st.download_button("Download Mindmap", mindmap, "mindmap.pdf", "application/pdf")

        # Add to history
        search_prompt = {"query": f"Queried: {research_query}", "results": all_papers}
        st.session_state['history'].append(search_prompt)

if __name__ == "__main__":
    main()
