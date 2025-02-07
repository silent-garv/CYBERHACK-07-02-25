import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Upload as UploadIcon, FileType, BarChart2, Activity, Trash2, Download, Eye } from 'lucide-react';
import axios from 'axios';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface FileData {
  id: string;
  filename: string;
  originalname: string;
  size: number;
  contentType: string;
  content?: string;
  contentStats?: { [key: string]: number };
  fileStats?: {
    rows?: number;
    columns?: number;
    entries?: number;
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const UploadPage = () => {
  const { theme, isDarkMode } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:3001';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFiles();
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('/api/files');
      setUploadedFiles(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Error fetching files. Please try again.');
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
      handleUpload(droppedFiles[0]);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      handleUpload(selectedFiles[0]);
    }
  };

  const handleUpload = async (fileToUpload: File) => {
    setError(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', fileToUpload);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        }
      });

      if (response.data.success) {
        await fetchFiles();
        setUploadProgress(100);
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setTimeout(() => setUploadProgress(0), 1000);
      }
    } catch (err: any) {
      console.error('Error uploading file:', err);
      setError(err.response?.data?.error || 'Error uploading file. Please try again.');
      setUploadProgress(0);
    }
  };

  const handleDownload = async (filename: string) => {
    try {
      setError(null);
      const response = await axios.get(`/api/download/${filename}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const file = uploadedFiles.find(f => f.filename === filename);
      link.setAttribute('download', file?.originalname || 'download');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading file:', err);
      setError('Error downloading file. Please try again.');
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      setError(null);
      await axios.delete(`/api/files/${filename}`);
      if (selectedFile?.filename === filename) {
        setSelectedFile(null);
      }
      await fetchFiles();
    } catch (err) {
      console.error('Error deleting file:', err);
      setError('Error deleting file. Please try again.');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Prepare data for charts
  const fileStatsData = uploadedFiles
    .filter(file => file.fileStats)
    .map(file => ({
      name: file.originalname,
      rows: file.fileStats?.rows || 0,
      columns: file.fileStats?.columns || 0,
      entries: file.fileStats?.entries || 0
    }));

  // Prepare data for word frequency pie chart
  const wordFrequencyData = selectedFile?.contentStats 
    ? Object.entries(selectedFile.contentStats).map(([word, count]) => ({
        name: word,
        value: count
      }))
    : [];

  return (
    <div className={`space-y-8 ${theme.bg} min-h-screen p-4`}>
      <h1 className={`text-2xl font-bold ${theme.text} mb-8`}>File Upload & Management</h1>

      {/* Upload Section */}
      <div className={`${theme.cardBg} p-6 rounded-lg shadow-lg`}>
        <div
          ref={dropZoneRef}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : `${theme.border} hover:border-blue-500`
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            ref={fileInputRef}
          />

          <UploadIcon className={`w-12 h-12 mx-auto mb-4 ${theme.text}`} />
          <h3 className={`text-lg font-semibold mb-2 ${theme.text}`}>
            Drag and drop your file here
          </h3>
          <p className={`mb-4 ${theme.text} opacity-70`}>
            or
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-200"
          >
            Select File
          </button>

          {file && (
            <div className={`mt-4 ${theme.text}`}>
              Selected file: {file.name} ({formatFileSize(file.size)})
            </div>
          )}

          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className={`mt-2 text-sm ${theme.text}`}>
                {uploadProgress === 100 ? 'Upload complete!' : `Uploading... ${uploadProgress}%`}
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 rounded-md">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className={`${theme.cardBg} p-6 rounded-lg shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-6 ${theme.text}`}>File Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className={`p-4 border rounded ${theme.border}`}>
            <h3 className={`text-lg font-medium mb-4 ${theme.text}`}>File Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fileStatsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rows" fill="#0088FE" name="Rows" />
                <Bar dataKey="columns" fill="#00C49F" name="Columns" />
                <Bar dataKey="entries" fill="#FFBB28" name="Entries" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          {selectedFile && selectedFile.contentStats && (
            <div className={`p-4 border rounded ${theme.border}`}>
              <h3 className={`text-lg font-medium mb-4 ${theme.text}`}>Word Frequency</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={wordFrequencyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {wordFrequencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Files List */}
      <div className={`${theme.cardBg} p-6 rounded-lg shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-6 ${theme.text}`}>Uploaded Files</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className={`px-4 py-2 text-left ${theme.text}`}>Name</th>
                <th className={`px-4 py-2 text-left ${theme.text}`}>Size</th>
                <th className={`px-4 py-2 text-left ${theme.text}`}>File Stats</th>
                <th className={`px-4 py-2 text-left ${theme.text}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.length === 0 ? (
                <tr>
                  <td colSpan={4} className={`px-4 py-8 text-center ${theme.text}`}>
                    No files uploaded yet. Drag and drop a file or click "Select File" to get started.
                  </td>
                </tr>
              ) : (
                uploadedFiles.map((file) => (
                  <tr key={file.filename} className={`border-t ${theme.border}`}>
                    <td className={`px-4 py-2 ${theme.text}`}>{file.originalname}</td>
                    <td className={`px-4 py-2 ${theme.text}`}>{formatFileSize(file.size)}</td>
                    <td className={`px-4 py-2 ${theme.text}`}>
                      {file.fileStats ? (
                        <div>
                          <div>Rows: {file.fileStats.rows}</div>
                          <div>Columns: {file.fileStats.columns}</div>
                          <div>Entries: {file.fileStats.entries}</div>
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedFile(file)}
                          className={`${theme.buttonSecondary} p-1`}
                          title="View Content"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDownload(file.filename)}
                          className={`${theme.buttonSecondary} p-1`}
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(file.filename)}
                          className={`${theme.buttonDanger} p-1`}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
