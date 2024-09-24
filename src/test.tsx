import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface DataRow {
    [key: string]: string;
}

const DataTable: React.FC = () => {
    const [data, setData] = useState<DataRow[]>([]);

    useEffect(() => {
        fetch('/path/to/output.csv')
            .then(response => response.text())
            .then(csvText => {
                const parsedData = Papa.parse<DataRow>(csvText, { header: true });
                setData(parsedData.data);
            });
    }, []);

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    const headers = Object.keys(data[0]);

    return (
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
    );
};

export default DataTable;