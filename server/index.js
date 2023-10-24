import express from 'express';
import http from 'http';
import { ledState, toggleLed } from './controllers/led.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { startTimer, stopTimer } from './controllers/timer.js';
import timerSingleton from './lib/timerSingleton.js';
import { Server } from 'socket.io';

dotenv.config();

// Create Express app
const app = express();

// Define the HTTP server
const httpServer = http.createServer(app);

// Enable CORS
app.use(cors());

// Socket IO
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// For testing purposes
io.on('connection', (socket) => {
  console.log('New user connected!');
  socket.on('disconnect', function () {
    console.log('User disconnected...');
  });
})

// Whenever we have a tick
timerSingleton.getInstance().onTick = (elapsedTime) => io.emit('timerTick', elapsedTime);

// Define routes
app.get('/', (req, res) => { res.send('The LED API is working!'); });
app.get('/toggleLed', toggleLed);
app.get('/ledState', ledState);
app.get('/startTimer', startTimer);
app.get('/stopTimer', stopTimer);

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Export app for testing purposes
export default app;
