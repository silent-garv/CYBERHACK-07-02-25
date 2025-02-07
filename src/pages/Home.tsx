import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const ageData = [
  { name: 'All minors', value: 40, color: '#FF6B6B' },
  { name: 'Ages 9-12', value: 29, color: '#4ECDC4' },
  { name: 'Ages 13-17', value: 31, color: '#45B7D1' },
];

const monthlyData = [
  { month: 'Jan', minors: 35, age9to12: 25, age13to17: 45 },
  { month: 'Feb', minors: 40, age9to12: 28, age13to17: 47 },
  { month: 'Mar', minors: 38, age9to12: 30, age13to17: 49 },
  { month: 'Apr', minors: 42, age9to12: 29, age13to17: 48 },
  { month: 'May', minors: 40, age9to12: 27, age13to17: 46 },
];

const Home = () => {
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const chartTextColor = isDarkMode ? '#fff' : '#000';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-6`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className={`${bgColor} rounded-lg shadow-lg p-8 transition-colors duration-200`}>
          <h1 className={`text-3xl font-bold ${textColor} mb-6`}>DeepWatch: Child Safety Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side - Text */}
            <div className="space-y-4">
              <p className={`text-lg ${textColor}`}>In a recent report, Thorn discovered that</p>
              <p className={`text-4xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                nearly half of all kids (40%)
              </p>
              <p className={`text-lg ${textColor}`}>
                have been approached by someone who they thought was attempting to "befriend and manipulate" them
              </p>
            </div>

            {/* Right side - Pie Chart */}
            <div>
              <PieChart width={400} height={300}>
                <Pie
                  data={ageData}
                  cx={250}
                  cy={120}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#fff', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} />
                <Legend formatter={(value) => <span className={textColor}>{value}</span>} />
              </PieChart>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className={`${bgColor} rounded-lg shadow-lg p-6 transition-colors duration-200`}>
            <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Age Distribution by Month</h2>
            <BarChart width={500} height={300} data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="month" stroke={chartTextColor} />
              <YAxis stroke={chartTextColor} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1F2937' : '#fff',
                  borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                  color: chartTextColor
                }}
              />
              <Legend formatter={(value) => <span className={textColor}>{value}</span>} />
              <Bar dataKey="minors" name="All Minors" fill="#FF6B6B" />
              <Bar dataKey="age9to12" name="Ages 9-12" fill="#4ECDC4" />
              <Bar dataKey="age13to17" name="Ages 13-17" fill="#45B7D1" />
            </BarChart>
          </div>

          {/* Line Chart */}
          <div className={`${bgColor} rounded-lg shadow-lg p-6 transition-colors duration-200`}>
            <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Trend Analysis</h2>
            <LineChart width={500} height={300} data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="month" stroke={chartTextColor} />
              <YAxis stroke={chartTextColor} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1F2937' : '#fff',
                  borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                  color: chartTextColor
                }}
              />
              <Legend formatter={(value) => <span className={textColor}>{value}</span>} />
              <Line type="monotone" dataKey="minors" name="All Minors" stroke="#FF6B6B" strokeWidth={2} />
              <Line type="monotone" dataKey="age9to12" name="Ages 9-12" stroke="#4ECDC4" strokeWidth={2} />
              <Line type="monotone" dataKey="age13to17" name="Ages 13-17" stroke="#45B7D1" strokeWidth={2} />
            </LineChart>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ageData.map((item, index) => (
            <div
              key={index}
              className={`${bgColor} rounded-lg shadow-lg p-6 transition-colors duration-200 transform hover:scale-105 duration-200`}
            >
              <h3 className={`text-xl font-semibold ${textColor} mb-2`}>{item.name}</h3>
              <p className="text-4xl font-bold" style={{ color: item.color }}>
                {item.value}%
              </p>
              <p className={`${textColor} mt-2 opacity-80`}>Reported Cases</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
