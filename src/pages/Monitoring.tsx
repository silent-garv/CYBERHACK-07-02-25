import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const data = [
  { time: '00:00', alerts: 5, incidents: 2 },
  { time: '04:00', alerts: 8, incidents: 3 },
  { time: '08:00', alerts: 12, incidents: 4 },
  { time: '12:00', alerts: 15, incidents: 6 },
  { time: '16:00', alerts: 10, incidents: 3 },
  { time: '20:00', alerts: 7, incidents: 2 },
];

const Monitoring = () => {
  const { theme, isDarkMode } = useTheme();
  return (
    <div className={`space-y-8 ${theme.bg} min-h-screen p-4`}>
      <h1 className={`text-2xl font-bold ${theme.text} mb-8`}>Monitoring and Alerts</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Alerts</h3>
          <p className="text-3xl font-bold text-blue-600">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Open Incidents</h3>
          <p className="text-3xl font-bold text-red-600">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">System Status</h3>
          <p className="text-3xl font-bold text-green-600">Healthy</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">24-Hour Activity</h2>
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="alerts" stroke="#3b82f6" />
          <Line type="monotone" dataKey="incidents" stroke="#ef4444" />
        </LineChart>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Alert #{i}</h4>
                <p className="text-sm text-gray-600">Detected suspicious activity</p>
              </div>
              <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
