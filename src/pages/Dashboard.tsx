import React, { useRef, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const data = [
  { name: 'Jan', cases: 400, investigations: 240, resolved: 180 },
  { name: 'Feb', cases: 300, investigations: 139, resolved: 120 },
  { name: 'Mar', cases: 200, investigations: 980, resolved: 150 },
  { name: 'Apr', cases: 278, investigations: 390, resolved: 220 },
  { name: 'May', cases: 189, investigations: 480, resolved: 160 },
];

const Dashboard = () => {
  const { theme, isDarkMode } = useTheme();
  const [chartHeight, setChartHeight] = useState(300);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateChartHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setChartHeight(Math.min(400, width * 0.6));
      }
    };

    updateChartHeight();
    window.addEventListener('resize', updateChartHeight);
    return () => window.removeEventListener('resize', updateChartHeight);
  }, []);

  return (
    <div className={`space-y-8 ${theme.bg} min-h-screen p-4`}>
      <h1 className={`text-2xl font-bold ${theme.text} mb-8`}>Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${theme.cardBg} p-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105`}>
          <h3 className={`text-lg font-semibold ${theme.accent1}`}>Total Cases</h3>
          <p className="text-3xl font-bold text-emerald-500">1,367</p>
          <p className={`${theme.text} mt-2 opacity-80`}>+12% from last month</p>
        </div>
        <div className={`${theme.cardBg} p-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105`}>
          <h3 className={`text-lg font-semibold ${theme.accent2}`}>Active Investigations</h3>
          <p className="text-3xl font-bold text-purple-500">483</p>
          <p className={`${theme.text} mt-2 opacity-80`}>+5% from last month</p>
        </div>
        <div className={`${theme.cardBg} p-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105`}>
          <h3 className={`text-lg font-semibold ${theme.accent3}`}>Resolution Rate</h3>
          <p className="text-3xl font-bold text-amber-500">78%</p>
          <p className={`${theme.text} mt-2 opacity-80`}>+3% from last month</p>
        </div>
        <div className={`${theme.cardBg} p-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105`}>
          <h3 className={`text-lg font-semibold ${theme.accent4}`}>Response Time</h3>
          <p className="text-3xl font-bold text-rose-500">24h</p>
          <p className={`${theme.text} mt-2 opacity-80`}>-2h from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" ref={containerRef}>
        <div className={`${theme.cardBg} p-6 rounded-lg shadow-lg transition-all duration-200`}>
          <h2 className={`text-lg font-semibold mb-6 ${theme.text}`}>Cases Overview</h2>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                <XAxis 
                  dataKey="name" 
                  stroke={isDarkMode ? '#fff' : '#374151'}
                  tick={{ fill: isDarkMode ? '#fff' : '#374151' }}
                />
                <YAxis 
                  stroke={isDarkMode ? '#fff' : '#374151'}
                  tick={{ fill: isDarkMode ? '#fff' : '#374151' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1F2937' : '#fff',
                    borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                    color: isDarkMode ? '#fff' : '#374151',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ 
                    color: isDarkMode ? '#fff' : '#374151',
                    paddingTop: '20px'
                  }}
                />
                <Bar 
                  dataKey="cases" 
                  fill="#10B981" 
                  name="Total Cases"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="resolved" 
                  fill="#F59E0B" 
                  name="Resolved Cases"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className={`${theme.cardBg} p-6 rounded-lg shadow-lg transition-all duration-200`}>
          <h2 className={`text-lg font-semibold mb-6 ${theme.text}`}>Investigation Trends</h2>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                <XAxis 
                  dataKey="name" 
                  stroke={isDarkMode ? '#fff' : '#374151'}
                  tick={{ fill: isDarkMode ? '#fff' : '#374151' }}
                />
                <YAxis 
                  stroke={isDarkMode ? '#fff' : '#374151'}
                  tick={{ fill: isDarkMode ? '#fff' : '#374151' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1F2937' : '#fff',
                    borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                    color: isDarkMode ? '#fff' : '#374151',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ 
                    color: isDarkMode ? '#fff' : '#374151',
                    paddingTop: '20px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="investigations" 
                  stroke="#8B5CF6" 
                  name="Active Investigations"
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#8B5CF6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="#F43F5E" 
                  name="Resolved Cases"
                  strokeWidth={2}
                  dot={{ fill: '#F43F5E', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#F43F5E' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;