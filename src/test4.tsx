import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const DataTable: React.FC = () => {
    const [data, setData] = useState<string[][]>([]);

    useEffect(() => {
        fetch('/python-scripts/output.csv')
            .then(response => response.text())
            .then(csvText => {
                const parsedData = Papa.parse<string[]>(csvText, { header: false });
                setData(parsedData.data);
            })
            .catch(error => console.error('Error fetching the CSV file:', error));
    }, []);

    return (
        <div>
            <h1>CSV Data</h1>
            <table>
                <tbody>
                    {data.map((row, rowIndex) => (
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
};

export default DataTable;