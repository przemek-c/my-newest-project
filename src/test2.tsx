import React, { useState, useEffect } from 'react';
import './App.css';

function DataTable() {
  const [csvData, setCsvData] = useState<string[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/my-project/python-scripts/output.csv');
        const text = await response.text();
        const rows = text.split('\n').map(row => row.split(',')); // Split into rows and cells
        setCsvData(rows);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>CSV Data</h1>
      <table>
        <thead>
          {/* Check if there's data before rendering header */}
          {csvData.length > 0 && (
            <tr>
              {csvData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {/* Render data rows, skipping header */}
          {csvData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;