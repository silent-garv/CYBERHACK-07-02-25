import React from 'react';
import DataTable from '../components/DataTable';
import { useTheme } from '../context/ThemeContext';

const mockData = [
  {
    id: 1,
    investigationId: 'INV001',
    startDate: '2025-02-01',
    status: 'Active',
    type: 'Content Analysis',
    investigator: 'Garv Patel',
  },
  {
    id: 2,
    investigationId: 'INV002',
    startDate: '2025-02-05',
    status: 'Pending Review',
    type: 'User Behavior',
    investigator: 'Yash Chouhan',
  },
];

const columns = [
  {
    header: 'Investigation ID',
    accessorKey: 'investigationId',
  },
  {
    header: 'Start Date',
    accessorKey: 'startDate',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Investigator',
    accessorKey: 'investigator',
  },
];

const Investigations = () => {
  const { theme, isDarkMode } = useTheme();
  return (
    <div className={`space-y-8 ${theme.bg} min-h-screen p-4`}>
      <h1 className={`text-2xl font-bold ${theme.text} mb-8`}>Investigations</h1>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900"></h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          New Investigation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Investigations</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pending Review</h3>
          <p className="text-3xl font-bold text-yellow-600">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Completed This Month</h3>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Active Investigations</h2>
        <DataTable data={mockData} columns={columns} />
      </div>
    </div>
  );
};

export default Investigations;
