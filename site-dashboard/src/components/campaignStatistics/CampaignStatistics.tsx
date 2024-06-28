import React, { useState, useEffect } from 'react';
import { CustomActiveShapePieChart } from '../customActiveShapePieChart/CustomActiveShapePieChart';
import './CampaignStatistics.css';
import Papa from 'papaparse';
import { ResponsiveContainer } from 'recharts';

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

export const CampaignStatistics: React.FC = () => {
  const [data, setData] = useState<CampaignData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const emailsEnviados = await fetchData<{ sent: string; notSent: string }>('/csv/emailsEnviados.csv');
        const emailsAbertos = await fetchData<{ opened: string; notOpened: string }>('/csv/emailsAbertos.csv');
        const linksClicados = await fetchData<{ clicked: string; notClicked: string }>('/csv/linksClicados.csv');
        const submissaoDados = await fetchData<{ submitted: string; notSubmitted: string }>('/csv/submissaoDados.csv');

        const campaignData: CampaignData[] = [
          {
            name: 'E-mails Enviados',
            sent: parseInt(emailsEnviados[0]?.sent ?? '0', 10),
            notSent: parseInt(emailsEnviados[0]?.notSent ?? '0', 10),
            fillSent: '#8884d8',
            fillNotSent: '#83a6ed'
          },
          {
            name: 'E-mails Abertos',
            opened: parseInt(emailsAbertos[0]?.opened ?? '0', 10),
            notOpened: parseInt(emailsAbertos[0]?.notOpened ?? '0', 10),
            fillOpened: '#8dd1e1',
            fillNotOpened: '#82ca9d'
          },
          {
            name: 'Links Clicados',
            clicked: parseInt(linksClicados[0]?.clicked ?? '0', 10),
            notClicked: parseInt(linksClicados[0]?.notClicked ?? '0', 10),
            fillClicked: '#a4de6c',
            fillNotClicked: '#d0ed57'
          },
          {
            name: 'Submissão de Dados',
            submitted: parseInt(submissaoDados[0]?.submitted ?? '0', 10),
            notSubmitted: parseInt(submissaoDados[0]?.notSubmitted ?? '0', 10),
            fillSubmitted: '#ffc658',
            fillNotSubmitted: '#ff8042'
          },
        ];

        setData(campaignData);
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    loadData();
  }, []);

  const renderCustomActiveShapePieChart = (dataEntry: CampaignData) => {
    const chartData = [
      {
        name: "Sim",
        value: dataEntry.sent ?? dataEntry.opened ?? dataEntry.clicked ?? dataEntry.submitted ?? 0,
        fill: dataEntry.fillSent || dataEntry.fillOpened || dataEntry.fillClicked || dataEntry.fillSubmitted || '#8884d8'
      },
      {
        name: "Não",
        value: dataEntry.notSent ?? dataEntry.notOpened ?? dataEntry.notClicked ?? dataEntry.notSubmitted ?? 0,
        fill: dataEntry.fillNotSent || dataEntry.fillNotOpened || dataEntry.fillNotClicked || dataEntry.fillNotSubmitted || '#83a6ed'
      },
    ];

    const value = chartData[0].value;
    const total = chartData.reduce((sum, entry) => sum + entry.value, 0);
    const percentage = total > 0 ? `${((value / total) * 100).toFixed(0)}%` : '0%';

    return (
      <div key={dataEntry.name} className='area-graph'>
        <h3>{dataEntry.name}</h3>
        <div className="graph">
          <ResponsiveContainer width="100%" height={200}>
            <CustomActiveShapePieChart data={chartData} centralLabel={percentage} />
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className='radial-graph'>
      <h2 className='titulo'>Estatísticas da Campanha</h2>
      <div className='card'>
        {data.map((dataEntry) => renderCustomActiveShapePieChart(dataEntry))}
      </div>
    </div>
  );
};
