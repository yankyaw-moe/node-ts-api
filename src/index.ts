import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Example usage in a route
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function gracefulShutdown() {
  console.log('Received kill signal, shutting down gracefully...');
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit(0);
  });
  // If after 10 seconds, force shutdown
  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down'
    );
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
