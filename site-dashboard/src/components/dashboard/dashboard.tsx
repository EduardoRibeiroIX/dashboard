import './dashboard.css'
import React from 'react';
import { CampaignStatistics } from '../campaignStatistics/CampaignStatistics';
import { CampaignSuccessRate } from '../campaignSuccessRate/CampaignSuccessRate';

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
