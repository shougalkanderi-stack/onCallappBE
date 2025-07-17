import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/database';

// Routes
import providerRoutes from './routes/providerRoutes';
import sessionRoutes from './routes/sessionRoutes';
import chatroomRoutes from './routes/chatroomRoutes';
import messageRoutes from './routes/messageRoutes';
import callRoutes from './routes/callRoutes';
import medicalReportRoutes from './routes/medicalReportRoutes';
import prescriptionRoutes from './routes/prescriptionRoutes';

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ message: 'OnCall API is running' });
});

// Mount all routes with proper base paths
app.use('/api/providers', providerRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/chatrooms', chatroomRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/calls', callRoutes);
app.use('/api/reports', medicalReportRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

// 404 handler (should be after all other routes)
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler (with explicit error typing)
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
