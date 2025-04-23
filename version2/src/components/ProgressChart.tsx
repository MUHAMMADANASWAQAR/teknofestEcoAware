
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const ProgressChart: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartLoaded, setChartLoaded] = useState(false);

  // Sample data for the chart
  const data = [
    { name: 'Mon', points: 15 },
    { name: 'Tue', points: 22 },
    { name: 'Wed', points: 18 },
    { name: 'Thu', points: 25 },
    { name: 'Fri', points: 30 },
    { name: 'Sat', points: 28 },
    { name: 'Sun', points: 35 }
  ];

  useEffect(() => {
    // Animate chart data loading
    const animateData = async () => {
      const newData: any[] = [];
      for (let i = 0; i < data.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 150));
        newData.push(data[i]);
        setChartData([...newData]);
      }
      setChartLoaded(true);
    };

    animateData();
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-2 rounded-md shadow-md text-xs border border-border">
          <p className="font-medium">{`${label} : ${payload[0].value} points`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[220px] relative">
      {!chartLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#718096', fontSize: 12 }}
          />
          <YAxis 
            hide={true}
            domain={[0, 40]}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar 
            dataKey="points" 
            fill="url(#colorGradient)" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1000}
            animationEasing="ease-out"
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#81C784" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
