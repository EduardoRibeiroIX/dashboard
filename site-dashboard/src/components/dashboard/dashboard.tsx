import './dashboard.css'
import React from 'react';
import {
  RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer
} from 'recharts';
import { CampaignStatistics } from '../campaignStatistics/CampaignStatistics';
import { CampaignSuccessRate } from '../campaignSuccessRate/CampaignSuccessRate';

interface DataPoint {
  name: string;
  uv: number;
  fill: string;
}

const data: DataPoint[] = [
  {
    name: '18-24', uv: 31.47, fill: '#8884d8',
  },
];

const Dashboard: React.FC = () => {
  return (
    <section className='dashboard'>
        <h1>Dashboard</h1>
        <CampaignSuccessRate />
        <CampaignStatistics />
    </section>
  );
};

export {Dashboard};
