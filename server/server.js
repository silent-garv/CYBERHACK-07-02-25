const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// Store file metadata in memory
let files = [];

// Create storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
}).single('file');

// Helper function to analyze file content
const analyzeFileContent = async (filePath, contentType) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim());
    
    let fileStats = {
      content: content,
      contentStats: {}
    };

    // For CSV files, calculate rows, columns, and entries
    if (contentType === 'text/csv' || filePath.endsWith('.csv')) {
      const columns = nonEmptyLines[0].split(',').length;
      fileStats.fileStats = {
        rows: nonEmptyLines.length - 1,
        columns: columns,
        entries: (nonEmptyLines.length - 1) * columns
      };
    }

    // Analyze content for word frequency (for text files)
    if (contentType.startsWith('text/')) {
      const words = content.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 0);

      const wordFrequency = {};
      words.forEach(word => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      });

      // Get top 5 most frequent words
      const topWords = Object.entries(wordFrequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      fileStats.contentStats = topWords;
    }

    return fileStats;
  } catch (error) {
    console.error('Error analyzing file:', error);
    return null;
  }
};

// Routes

// Upload file
app.post('/api/upload', (req, res) => {
  console.log('Received upload request');
  
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ 
        error: err.message || 'Error uploading file',
        details: err
      });
    }

    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const fileAnalysis = await analyzeFileContent(req.file.path, req.file.mimetype);
      
      const fileInfo = {
        id: Date.now().toString(),
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        uploadDate: new Date(),
        contentType: req.file.mimetype,
        path: req.file.path,
        ...fileAnalysis
      };

      files.push(fileInfo);
      console.log('File uploaded successfully:', fileInfo.filename);

      res.json({
        success: true,
        file: fileInfo
      });
    } catch (error) {
      console.error('Error processing uploaded file:', error);
      res.status(500).json({ error: 'Error processing uploaded file', details: error.message });
    }
  });
});

// Get all files
app.get('/api/files', async (req, res) => {
  try {
    console.log('Fetching all files');
    res.json(files);
  } catch (error) {
    console.error('Error getting files:', error);
    res.status(500).json({ error: 'Error retrieving files', details: error.message });
  }
});

// Download file
app.get('/api/download/:filename', async (req, res) => {
  try {
    console.log('Download request for file:', req.params.filename);
    const file = files.find(f => f.filename === req.params.filename);

    if (!file) {
      console.log('File not found for download:', req.params.filename);
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(file.path, file.originalname);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Error downloading file', details: error.message });
  }
});

// Delete file
app.delete('/api/files/:filename', async (req, res) => {
  try {
    console.log('Delete request for file:', req.params.filename);
    const fileIndex = files.findIndex(f => f.filename === req.params.filename);

    if (fileIndex === -1) {
      console.log('File not found for deletion:', req.params.filename);
      return res.status(404).json({ error: 'File not found' });
    }

    const file = files[fileIndex];
    await fs.unlink(file.path);
    files.splice(fileIndex, 1);

    console.log('File deleted successfully:', file.filename);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Error deleting file', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: err.message
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for origins: http://localhost:5173, http://localhost:3000`);
});
