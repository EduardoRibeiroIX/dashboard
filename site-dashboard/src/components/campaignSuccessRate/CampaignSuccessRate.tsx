import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';
import './CampaignSuccessRate.css';

interface SuccessRateData {
  name: string;
  successRate: number;
}

const fetchData = async <T,>(url: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (result) => {
        resolve(result.data as T[]);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const CampaignSuccessRate: React.FC = () => {
  const [data, setData] = useState<SuccessRateData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData<{ name: string; successRate: string }>('/csv/successRate.csv');
        const parsedData = result.map(item => ({
          name: item.name,
          successRate: parseFloat(item.successRate),
        }));
        setData(parsedData);
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className='conteudo'>
      <h2 className='titulo'>Taxa de Sucesso</h2>
      <div className="line">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="successRate" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
