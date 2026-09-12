import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('/api/v1', '') 
  : 'http://localhost:5000';

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  telemetry: null,
  marketMetrics: null,
  liveEvents: [],
  latestMatch: null,
  simulateSpike: () => {}
});

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Real-time dynamic states
  const [telemetry, setTelemetry] = useState({
    facilityId: 'FAC-DAC-0941',
    facilityName: 'Apex Point-Source Capture Facility',
    co2CaptureRate: 48.6,
    captureEfficiency: 96.4,
    purity: 99.72,
    temperature: 64.2,
    pressure: 3.42,
    energyConsumption: 142.8,
    totalCapturedToday: 1.18,
    cumulativeCredits: 3840,
    estimatedRevenue: 192000,
    sensorHealth: 'OPTIMAL',
    lastUpdated: new Date().toISOString()
  });

  const [marketMetrics, setMarketMetrics] = useState({
    spotPriceAvg: 52.40,
    priceChange24h: +3.8,
    totalAvailableTons: 14250,
    activeTradingVolume24h: 382000,
    totalTransactionsToday: 28,
    lastUpdated: new Date().toISOString()
  });

  const [liveEvents, setLiveEvents] = useState([]);
  const [latestMatch, setLatestMatch] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      timeout: 10000
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('⚡ [Socket.io Connected] Client linked to CarbonSphere real-time stream:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('🔌 [Socket.io Disconnected] Reconnecting...');
    });

    // Real-time telemetry broadcast from sensors
    newSocket.on('telemetry:update', (data) => {
      setTelemetry((prev) => ({ ...prev, ...data }));
    });

    // Real-time marketplace metrics ticker
    newSocket.on('market:update', (data) => {
      setMarketMetrics((prev) => ({ ...prev, ...data }));
    });

    // Real-time transactions & escrow clearances
    newSocket.on('marketplace:new_transaction', (event) => {
      setLiveEvents((prev) => [event, ...prev.slice(0, 19)]);
    });

    // Real-time AI smart matching opportunity
    newSocket.on('matching:opportunity', (match) => {
      setLatestMatch(match);
      setLiveEvents((prev) => [
        {
          id: match.matchId,
          type: 'MATCH',
          buyer: match.buyer,
          volumeTons: match.requiredVolume,
          compatibilityScore: match.compatibilityScore,
          timestamp: match.timestamp
        },
        ...prev.slice(0, 19)
      ]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const simulateSpike = useCallback(() => {
    if (socket && isConnected) {
      socket.emit('telemetry:simulate_spike');
    } else {
      // Local fallback simulation
      setTelemetry((prev) => ({
        ...prev,
        co2CaptureRate: +(prev.co2CaptureRate + (Math.random() * 8 + 2)).toFixed(1),
        purity: +(Math.min(99.99, prev.purity + 0.05)).toFixed(2),
        totalCapturedToday: +(prev.totalCapturedToday + 0.05).toFixed(2),
        lastUpdated: new Date().toISOString()
      }));
    }
  }, [socket, isConnected]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        telemetry,
        marketMetrics,
        liveEvents,
        latestMatch,
        simulateSpike
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

export default SocketContext;
