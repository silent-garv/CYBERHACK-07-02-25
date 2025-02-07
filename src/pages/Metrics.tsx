import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const monthlyData = [
  { month: 'Jan', cases: 65, resolved: 45 },
  { month: 'Feb', cases: 75, resolved: 55 },
  { month: 'Mar', cases: 85, resolved: 65 },
  { month: 'Apr', cases: 95, resolved: 75 },
  { month: 'May', cases: 105, resolved: 85 },
];

const responseTimeData = [
  { day: 'Mon', time: 4.5 },
  { day: 'Tue', time: 3.8 },
  { day: 'Wed', time: 4.2 },
  { day: 'Thu', time: 3.5 },
  { day: 'Fri', time: 4.0 },
];

const Metrics = () => {
  const { theme, isDarkMode } = useTheme();
  return (
    <div className={`space-y-8 ${theme.bg} min-h-screen p-4`}>
      <h1 className={`text-2xl font-bold ${theme.text} mb-8`}>Metrics and Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Cases</h3>
          <p className="text-3xl font-bold text-blue-600">425</p>
          <p className="text-sm text-gray-600">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Resolution Rate</h3>
          <p className="text-3xl font-bold text-green-600">78%</p>
          <p className="text-sm text-gray-600">+5% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Avg Response Time</h3>
          <p className="text-3xl font-bold text-yellow-600">4.0h</p>
          <p className="text-sm text-gray-600">-0.5h from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Cases</h3>
          <p className="text-3xl font-bold text-red-600">94</p>
          <p className="text-sm text-gray-600">-3% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Case Volume vs Resolution</h2>
          <BarChart width={500} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cases" fill="#3b82f6" name="Total Cases" />
            <Bar dataKey="resolved" fill="#10b981" name="Resolved Cases" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Average Response Time</h2>
          <LineChart width={500} height={300} data={responseTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="time" stroke="#8b5cf6" name="Hours" />
          </LineChart>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Case Resolution Time</h4>
            <p className="text-2xl font-bold text-blue-600">48h</p>
            <p className="text-sm text-gray-600">Average time to resolve</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Investigation Accuracy</h4>
            <p className="text-2xl font-bold text-green-600">95%</p>
            <p className="text-sm text-gray-600">Correct assessments</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Team Efficiency</h4>
            <p className="text-2xl font-bold text-purple-600">87%</p>
            <p className="text-sm text-gray-600">Resource utilization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
