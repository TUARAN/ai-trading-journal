import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export interface TrendChartProps {
  data: { date: string; price: number }[];
  title?: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, title }) => (
  <div className="bg-white rounded-lg shadow p-4">
    {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default TrendChart; 