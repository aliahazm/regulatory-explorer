import './App.css';
import Sidebar from './components/Sidebar';
import DocumentList from './components/DocumentList';
import DocumentViewer from './components/DocumentViewer';
import DocumentModal from './components/DocumentModal';
import SearchBar from './components/SearchBar';
import { useState, useEffect } from 'react';
//import { interpretQuery } from './utils/aiSearch';


function App() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);


  useEffect(() => {
    fetch("https://api.fda.gov/drug/event.json?limit=20")
      .then(res => res.json())
      .then(data => {
        const docs = data.results.map((item, idx) => ({
          id: idx,
          title: item.patient.reaction[0]?.reactionmeddrapt || "Unknown Reaction",
          date: item.receiptdate || "Unknown Date",
          agency: "FDA",
          type: "Drug Event Report",
          full: item
        }));
        setDocuments(docs);
        setFilteredDocs(docs);
      })
      .catch(err => console.error("FDA API error:", err));
  }, []);

  
    const handleSearch = async (e) => {
    e.preventDefault();

    const aiResponse = await interpretQuery(query);

   
    const filtered = documents.filter(doc =>
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.full.patient.drug.some(drug =>
        drug.medicinalproduct?.toLowerCase().includes(query.toLowerCase())
      )
    );

    setFilteredDocs(filtered);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSearch}
        />
        <h2>FDA Drug Event Reports</h2>
       
<DocumentList
          documents={filteredDocs}
          onSelect={(doc) => setSelectedDoc(doc)}
        />


<DocumentModal
  document={selectedDoc}
  open={!!selectedDoc}
  onOpenChange={(open) => {
    if (!open) setSelectedDoc(null);
  }}
/>


      </main>
    </div>
  );
}

export default App;
