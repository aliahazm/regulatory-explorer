import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { analyzeCompliance } from '../utils/aiSearch';

function DocumentModal({ document, open, onOpenChange }) {
  const [analysis, setAnalysis] = useState("Loading analysis...");

  useEffect(() => {
    if (document && open) {
      const textContent = `
        Title: ${document.title}
        Date: ${document.date}
        Agency: ${document.agency}
        Type: ${document.type}
        Drug: ${document.full.patient?.drug?.[0]?.medicinalproduct || "Unknown"}
        Reaction: ${document.full.patient?.reaction?.[0]?.reactionmeddrapt || "Unknown"}
      `;

      analyzeCompliance(textContent)
        .then(setAnalysis)
        .catch(err => {
          console.error("AI analysis error:", err);
          setAnalysis("Failed to generate analysis.");
        });
    }
  }, [document, open]);

  if (!document) return null;

  const { title, date, agency, type, full } = document;
  const drug = full.patient.drug[0];
  const reaction = full.patient.reaction[0];
  const patient = full.patient;

  const drugName = drug?.medicinalproduct || "Unknown";
  const indication = drug?.drugindication || "Not specified";
  const therapyStart = drug?.drugstartdate || "Unknown";
  const therapyEnd = drug?.drugenddate || "Unknown";
  const sex = patient.patientsex === "1" ? "Male" : patient.patientsex === "2" ? "Female" : "Unknown";
  const age = patient.patientonsetage ? `${patient.patientonsetage} ${patient.patientonsetageunit}` : "Unknown";
  const reactionDesc = reaction?.reactionmeddrapt || "Unknown";
  const reporterCountry = full.occurcountry || "Unknown";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay style={{
          background: 'rgba(0,0,0,0.5)',
          position: 'fixed',
          inset: 0
        }} />
        <Dialog.Content style={{
          background: 'white',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '600px',
          margin: 'auto',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <Dialog.Title>{title}</Dialog.Title>
          <p><strong>Date:</strong> {formatDate(date)}</p>
          <p><strong>Agency:</strong> {agency}</p>
          <p><strong>Type:</strong> {type}</p>
          <p><strong>Drug Name:</strong> {drugName}</p>
          <p><strong>Indication:</strong> {indication}</p>
          <p><strong>Therapy Dates:</strong> {therapyStart} → {therapyEnd}</p>
          <p><strong>Patient Sex:</strong> {sex}</p>
          <p><strong>Patient Age:</strong> {age}</p>
          <p><strong>Reported Reaction:</strong> {reactionDesc}</p>
          <p><strong>Reporter Country:</strong> {reporterCountry}</p>

          <h4>Regulatory Summary</h4>
          <p>
            This document is an FDA post-market safety report. It helps regulators monitor unexpected adverse events and ensure public safety compliance.
          </p>

          <h4>Compliance Analysis</h4>
          <p>{analysis}</p>

          <Dialog.Close asChild>
            <button style={{ marginTop: '15px' }}>Close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function formatDate(dateStr) {
  if (!dateStr || dateStr.length !== 8) return "Unknown";
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
}

export default DocumentModal;
