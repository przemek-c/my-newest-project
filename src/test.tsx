// test.tsx
import React, { useEffect, useState } from 'react';

interface DataRow {
    [key: string]: string;
}

const DataTable: React.FC = () => {
    const [data, setData] = useState<DataRow[]>([]);

    useEffect(() => {
        fetch('/python-scripts/output.csv') // Fetch the CSV file from the server
        
            .then(response => response.text())
            .then(csvText => {
                const rows = csvText.split('\n');
                const headers = rows[0].split(',');

                const parsedData = rows.slice(1).map(row => {
                    const values = row.split(',');
                    const dataRow: DataRow = {};
                    headers.forEach((header, index) => {
                        dataRow[header] = values[index];
                    });
                    return dataRow;
                });

                setData(parsedData);
            });
    }, []);

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    const headers = Object.keys(data[0]);

    return (
        <div>
            <h1>CSV Data 1 ebe </h1>
            <table>
            <thead>
                <tr>
                    {headers.map(header => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {headers.map(header => (
                            <td key={header}>{row[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default DataTable;