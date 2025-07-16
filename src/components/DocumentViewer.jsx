function DocumentViewer({ document, onBack }) {
  const { title, date, agency, type, full } = document;

  // Additional data
  const drugName = full.patient.drug[0]?.medicinalproduct || "Unknown";
  const seriousness = full.serious ? "Serious" : "Non-serious";
  const outcomes = full.seriousnesscongenitalanomali ||
                   full.seriousnessdeath ||
                   full.seriousnessdisabling ||
                   full.seriousnesshospitalization ||
                   full.seriousnesslifethreatening ||
                   full.seriousnessother
                   ? "Yes" : "No";

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '6px',
      marginTop: '20px',
      background: '#fff'
    }}>
      <button onClick={onBack} style={{ marginBottom: '15px' }}>
        ← Back to list
      </button>
      <h2>{title}</h2>
      <p><strong>Date:</strong> {formatDate(date)}</p>
      <p><strong>Agency:</strong> {agency}</p>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Drug Name:</strong> {drugName}</p>
      <p><strong>Seriousness:</strong> {seriousness}</p>
      <p><strong>Serious outcomes present:</strong> {outcomes}</p>

      {/* <h4>Raw Event Details (JSON)</h4>
      <pre style={{ maxHeight: '250px', overflow: 'auto', background: '#f9f9f9', padding: '10px' }}>
        {JSON.stringify(full, null, 2)}
      </pre> */}
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr || dateStr.length !== 8) return "Unknown";
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
}

export default DocumentViewer;
