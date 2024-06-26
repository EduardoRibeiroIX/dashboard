import React from 'react';
import { CustomActiveShapePieChart } from '../customActiveShapePieChart/CustomActiveShapePieChart';
import './CampaignStatistics.css'

interface CampaignData {
  name: string;
  opened?: number;
  notOpened?: number;
  sent?: number;
  notSent?: number;
  clicked?: number;
  notClicked?: number;
  submitted?: number;
  notSubmitted?: number;
  fillSent?: string;
  fillNotSent?: string;
  fillOpened?: string;
  fillNotOpened?: string;
  fillClicked?: string;
  fillNotClicked?: string;
  fillSubmitted?: string;
  fillNotSubmitted?: string;
}

const data: CampaignData[] = [
  { name: 'E-mails Enviados', sent: 60, notSent: 40, fillSent: '#8884d8', fillNotSent: '#83a6ed' },
  { name: 'E-mails Abertos', opened: 50, notOpened: 50, fillOpened: '#8dd1e1', fillNotOpened: '#82ca9d' },
  { name: 'Links Clicados', clicked: 30, notClicked: 70, fillClicked: '#a4de6c', fillNotClicked: '#d0ed57' },
  { name: 'Submissão de Dados', submitted: 20, notSubmitted: 80, fillSubmitted: '#ffc658', fillNotSubmitted: '#ff8042' },
];

const renderCustomActiveShapePieChart = (dataEntry: CampaignData) => {
  const chartData = [
    {
      name: "Sim",
      value: dataEntry.sent || dataEntry.opened || dataEntry.clicked || dataEntry.submitted || 0,
      fill: dataEntry.fillSent || dataEntry.fillOpened || dataEntry.fillClicked || dataEntry.fillSubmitted || '#8884d8'
    },
    {
      name: "Não",
      value: dataEntry.notSent || dataEntry.notOpened || dataEntry.notClicked || dataEntry.notSubmitted || 0,
      fill: dataEntry.fillNotSent || dataEntry.fillNotOpened || dataEntry.fillNotClicked || dataEntry.fillNotSubmitted || '#83a6ed'
    },
  ];

  const value = chartData[0].value;
  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);
  const percentage = `${((value / total) * 100).toFixed(0)}%`;

  return (
    <div key={dataEntry.name} className='area-graph'>
      <h3>{dataEntry.name}</h3>
      <div className="graph">
        <CustomActiveShapePieChart data={chartData} centralLabel={percentage} />
      </div>
    </div>
  );
};

export const CampaignStatistics: React.FC = () => {
  return (
    <div className='radial-graph'>
      <h2 className='titulo'>Estatísticas da Campanha</h2>
      <div className='card'>
        {data.map((dataEntry) => renderCustomActiveShapePieChart(dataEntry))}
      </div>
    </div>
  );
};
