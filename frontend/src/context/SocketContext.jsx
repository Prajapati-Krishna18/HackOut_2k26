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

let socketInstance = null;

const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      withCredentials: true
    });
  }
  return socketInstance;
};

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
    const s = getSocket();

    if (s.connected) {
      setIsConnected(true);
    }

    const onConnect = () => {
      setIsConnected(true);
      console.log('⚡ [Socket.io Connected] Client linked to CarbonSphere real-time stream:', s.id);
    };

    const onDisconnect = (reason) => {
      setIsConnected(false);
      console.log('🔌 [Socket.io Disconnected] Reason:', reason);
    };

    const onConnectError = (error) => {
      setIsConnected(false);
      console.warn('⚠️ [Socket.io Connect Error]:', error.message);
    };

    const onTelemetryUpdate = (data) => {
      setTelemetry((prev) => ({ ...prev, ...data }));
    };

    const onMarketUpdate = (data) => {
      setMarketMetrics((prev) => ({ ...prev, ...data }));
    };

    const onNewTransaction = (event) => {
      setLiveEvents((prev) => [event, ...prev.slice(0, 19)]);
    };

    const onMatchingOpportunity = (match) => {
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
    };

    s.on('connect', onConnect);
    s.on('disconnect', onDisconnect);
    s.on('connect_error', onConnectError);
    s.on('telemetry:update', onTelemetryUpdate);
    s.on('market:update', onMarketUpdate);
    s.on('marketplace:new_transaction', onNewTransaction);
    s.on('matching:opportunity', onMatchingOpportunity);

    setSocket(s);

    return () => {
      s.off('connect', onConnect);
      s.off('disconnect', onDisconnect);
      s.off('connect_error', onConnectError);
      s.off('telemetry:update', onTelemetryUpdate);
      s.off('market:update', onMarketUpdate);
      s.off('marketplace:new_transaction', onNewTransaction);
      s.off('matching:opportunity', onMatchingOpportunity);
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
