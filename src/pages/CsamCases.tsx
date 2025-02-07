import React from 'react';
import DataTable from '../components/DataTable';
import { useTheme } from '../context/ThemeContext';
import { Tooltip } from 'recharts';

const mockData = [
  {
    id: 1,
    caseNumber: 'CS001',
    dateReported: '2025-02-07',
    status: 'Open',
    priority: 'High',
    assignedTo: 'Gaurav Patil',
  },
  {
    id: 2,
    caseNumber: 'CS002',
    dateReported: '2025-02-06',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Khushi Sharma',
  },
];

const columns = [
  {
    header: 'Case Number',
    accessorKey: 'caseNumber',
  },
  {
    header: 'Date Reported',
    accessorKey: 'dateReported',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Priority',
    accessorKey: 'priority',
  },
  {
    header: 'Assigned To',
    accessorKey: 'assignedTo',
  },
];

const CsamCases = () => {
   const { theme, isDarkMode } = useTheme();
  return (
    <div className={`space-y-8 ${theme.bg} min-h-screen p-4`}>
      <h1 className={`text-2xl font-bold ${theme.text} mb-8`}>CSAM Cases</h1>
    <div className="space-y-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          New Case
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <DataTable data={mockData} columns={columns} />
      </div>
    </div>
  );
};

export default CsamCases;
