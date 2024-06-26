import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './CampaignSuccessRate.css'

const data = [
  { name: 'Jan 2024', successRate: 10 },
  { name: 'Fev 2024', successRate: 40 },
  { name: 'Mar 2024', successRate: 80 },
  { name: 'Abr 2024', successRate: 75 },
  { name: 'Mai 2024', successRate: 82 },
  { name: 'Jun 2024', successRate: 80 },
  { name: 'Jul 2024', successRate: 90 },
];

export const CampaignSuccessRate: React.FC = () => {
  return (
    <div className='conteudo'>
      <h2 className='titulo'>Taxa de Sucesso</h2>
      <div className="line">
        <LineChart
            className='graph'
            width={1000}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3"    />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="successRate" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}
