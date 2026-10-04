import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';
import { env } from './config/env';
import prisma from './config/prisma';
import projectRoutes from './routes/projectRoutes';
import blogRoutes from './routes/blogRoutes';
import careerRoutes from './routes/careerRoutes';
import leadRoutes from './routes/leadRoutes';
import careerApplicationRoutes from './routes/careerApplicationRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Security HTTP headers
app.use(helmet());

// Gzip compression
app.use(compression());

// HTTP Request logging
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// CORS configuration supporting single domain, comma-separated list, or wildcard in dev
const allowedOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin) ||
        env.NODE_ENV === 'development'
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy does not allow access from ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads
import path from 'path';
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Health check with database connectivity probe
app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (err: any) {
    res.status(503).json({
      status: 'degraded',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: env.NODE_ENV === 'production' ? 'Database unavailable' : err.message,
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/career-applications', careerApplicationRoutes);
app.use('/api/leads', leadRoutes);

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized error handler
app.use(errorHandler);

const server = app.listen(env.PORT, async () => {
  console.log(`🚀 Production-ready API server running on port ${env.PORT} [${env.NODE_ENV}]`);

  if (env.ADMIN_EMAIL && env.ADMIN_PASSWORD) {
    try {
      const existingAdmin = await prisma.admin.findUnique({ where: { email: env.ADMIN_EMAIL } });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 10);
        await prisma.admin.create({
          data: { email: env.ADMIN_EMAIL, password: hashedPassword },
        });
        console.log(`✅ Default admin account created for ${env.ADMIN_EMAIL}`);
      }
    } catch (err) {
      console.error('Failed to seed admin account:', err);
    }
  }
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    console.log('HTTP server closed.');
    try {
      await prisma.$disconnect();
      console.log('Database connections closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error during database disconnect:', err);
      process.exit(1);
    }
  });

  // Force shutdown after 10s if stuck
  setTimeout(() => {
    console.error('Forcefully terminating process after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
