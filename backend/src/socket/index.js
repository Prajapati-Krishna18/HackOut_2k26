import { Server } from 'socket.io';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

let ioInstance = null;

// Initial state for simulated live telemetry & market data
let currentTelemetry = {
  facilityId: 'FAC-DAC-0941',
  facilityName: 'Apex Point-Source Capture Facility',
  co2CaptureRate: 48.6, // kg/hr
  captureEfficiency: 96.4, // %
  purity: 99.72, // %
  temperature: 64.2, // °C
  pressure: 3.42, // bar
  energyConsumption: 142.8, // kWh
  totalCapturedToday: 1.18, // Tons
  cumulativeCredits: 3840,
  estimatedRevenue: 192000,
  sensorHealth: 'OPTIMAL',
  lastUpdated: new Date().toISOString()
};

let currentMarketMetrics = {
  spotPriceAvg: 52.40,
  priceChange24h: +3.8,
  totalAvailableTons: 14250,
  activeTradingVolume24h: 382000,
  totalTransactionsToday: 28,
  lastUpdated: new Date().toISOString()
};

export const initSocket = (httpServer) => {
  const allowedOrigins = [
    env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173'
  ].filter(Boolean);

  const io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, true); // Allow dev origins seamlessly
        }
      },
      methods: ['GET', 'POST'],
      credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000
  });

  ioInstance = io;

  io.on('connection', (socket) => {
    logger.info(`[SOCKET CONNECTED] Client ID: ${socket.id}`);

    // Send immediate snapshot on connection
    socket.emit('telemetry:update', currentTelemetry);
    socket.emit('market:update', currentMarketMetrics);

    // Client subscription to specific channels
    socket.on('subscribe:telemetry', (facilityId) => {
      socket.join(`facility:${facilityId || 'default'}`);
      socket.emit('telemetry:update', currentTelemetry);
    });

    socket.on('subscribe:marketplace', () => {
      socket.join('marketplace');
      socket.emit('market:update', currentMarketMetrics);
    });

    // Allow client to manually simulate a sudden carbon capture spike or adjustment
    socket.on('telemetry:simulate_spike', () => {
      currentTelemetry.co2CaptureRate = +(currentTelemetry.co2CaptureRate + (Math.random() * 8 + 2)).toFixed(1);
      currentTelemetry.purity = +(Math.min(99.99, currentTelemetry.purity + 0.05)).toFixed(2);
      currentTelemetry.totalCapturedToday = +(currentTelemetry.totalCapturedToday + 0.05).toFixed(2);
      currentTelemetry.lastUpdated = new Date().toISOString();
      io.emit('telemetry:update', currentTelemetry);
    });

    socket.on('disconnect', () => {
      logger.info(`[SOCKET DISCONNECTED] Client ID: ${socket.id}`);
    });
  });

  // Start background real-time simulation interval (Broadcasting every 3 seconds)
  setInterval(() => {
    if (!ioInstance) return;

    // Small realistic fluctuations
    const captureDelta = (Math.random() * 1.6 - 0.8);
    const purityDelta = (Math.random() * 0.1 - 0.05);
    const tempDelta = (Math.random() * 0.8 - 0.4);
    const pressDelta = (Math.random() * 0.06 - 0.03);

    currentTelemetry.co2CaptureRate = Math.max(20, Math.min(80, +(currentTelemetry.co2CaptureRate + captureDelta).toFixed(1)));
    currentTelemetry.captureEfficiency = Math.max(90, Math.min(99.8, +(currentTelemetry.captureEfficiency + (Math.random() * 0.2 - 0.1)).toFixed(1)));
    currentTelemetry.purity = Math.max(98.5, Math.min(99.95, +(currentTelemetry.purity + purityDelta).toFixed(2)));
    currentTelemetry.temperature = Math.max(55, Math.min(75, +(currentTelemetry.temperature + tempDelta).toFixed(1)));
    currentTelemetry.pressure = Math.max(2.8, Math.min(4.2, +(currentTelemetry.pressure + pressDelta).toFixed(2)));
    currentTelemetry.energyConsumption = Math.max(120, Math.min(180, +(currentTelemetry.energyConsumption + (Math.random() * 2 - 1)).toFixed(1)));
    currentTelemetry.totalCapturedToday = +(currentTelemetry.totalCapturedToday + 0.001).toFixed(3);
    currentTelemetry.cumulativeCredits = Math.round(currentTelemetry.cumulativeCredits + (Math.random() > 0.8 ? 1 : 0));
    currentTelemetry.estimatedRevenue = currentTelemetry.cumulativeCredits * 50;
    currentTelemetry.lastUpdated = new Date().toISOString();

    // Broadcast live telemetry
    io.emit('telemetry:update', currentTelemetry);

    // Random market ticker tick
    const priceDelta = (Math.random() * 0.3 - 0.14);
    currentMarketMetrics.spotPriceAvg = Math.max(40, +(currentMarketMetrics.spotPriceAvg + priceDelta).toFixed(2));
    currentMarketMetrics.priceChange24h = +(currentMarketMetrics.priceChange24h + (Math.random() * 0.1 - 0.05)).toFixed(1);
    currentMarketMetrics.lastUpdated = new Date().toISOString();

    io.emit('market:update', currentMarketMetrics);
  }, 3000);

  // Trigger occasional matching / trade notifications (Every 15s)
  setInterval(() => {
    if (!ioInstance) return;

    const sampleLocations = ['Rotterdam Port Hub', 'Gujarat Industrial Corridor', 'Texas Gulf Coast', 'Bavaria Bio-Cluster'];
    const sampleBuyers = ['Heidelberg Materials AG', 'Novo BioTech Corp', 'Equinor Clean Energy', 'Tata Green Steel'];
    const sampleMethods = ['Direct Air Capture (DAC)', 'Point-Source Cryogenic', 'Biochar Sequestration', 'Algae Photobioreactor'];

    const randomBuyer = sampleBuyers[Math.floor(Math.random() * sampleBuyers.length)];
    const randomLocation = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
    const randomMethod = sampleMethods[Math.floor(Math.random() * sampleMethods.length)];
    const randomVolume = Math.floor(Math.random() * 450 + 50);

    const eventPayload = {
      id: `EVT-${Date.now().toString(36).toUpperCase()}`,
      buyer: randomBuyer,
      location: randomLocation,
      method: randomMethod,
      volumeTons: randomVolume,
      pricePerTon: +(Math.random() * 15 + 45).toFixed(2),
      timestamp: new Date().toISOString()
    };

    io.emit('marketplace:new_transaction', eventPayload);
    io.emit('matching:opportunity', {
      matchId: `MATCH-${Math.floor(Math.random() * 9000 + 1000)}`,
      compatibilityScore: Math.floor(Math.random() * 10 + 90), // 90-99%
      buyer: randomBuyer,
      requiredVolume: randomVolume,
      timestamp: new Date().toISOString()
    });
  }, 12000);

  logger.info('WebSocket (Socket.IO) server initialized successfully with real-time telemetry broadcasters.');
  return io;
};

export const getIO = () => {
  if (!ioInstance) {
    throw new Error('Socket.IO has not been initialized yet. Call initSocket first.');
  }
  return ioInstance;
};
