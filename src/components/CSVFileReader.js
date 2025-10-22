import React, { useRef } from 'react';
import Papa from 'papaparse';
import { processCSVData } from '../data/csvParser';

function CSVFileReader({ onDataLoad }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const processedData = processCSVData(result.data);
        onDataLoad(processedData);
      },
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    });
  };

  return (
    <div className="card">
      <h2>Load Your Data</h2>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        aria-label="Upload CSV file"
        className="file-input"
      />
      <p className="upload-description">
        Upload a CSV file with topic modeling results to visualize your own data.
      </p>
    </div>
  );
}

export default CSVFileReader;