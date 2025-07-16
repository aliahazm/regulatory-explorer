function DocumentList({ documents, onSelect }) {
  return (
    <div>
      {documents.map(doc => (
        <div
          key={doc.id}
          style={{
            border: '1px solid #ddd',
            padding: '12px',
            marginBottom: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            background: '#fafafa'
          }}
          onClick={() => onSelect(doc)}
        >
          <h3>{doc.title}</h3>
          <p><strong>Date:</strong> {formatDate(doc.date)}</p>
          <p><strong>Agency:</strong> {doc.agency}</p>
          <p><strong>Type:</strong> {doc.type}</p>
        </div>
      ))}
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr || dateStr.length !== 8) return "Unknown";
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
}

export default DocumentList;
