'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ChartComponent from '../components/ChartComponent';
import PredictionCard from '../components/PredictionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import StatsCard from '../components/StatsCard';
import { ArrowUp, ArrowDown, Activity, TrendingUp, BarChart3, Zap, AlertCircle } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [marketType, setMarketType] = useState<string>('crypto');
  const [symbol, setSymbol] = useState<string>('BTC/USDT');
  const [forexPair, setForexPair] = useState<string>('EUR/USD');
  const [timeframe, setTimeframe] = useState<string>('1h');

  const fetchData = () => {
    setLoading(true);
    setError(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

    if (marketType === 'forex') {
      // Fetch forex prediction
      axios.get(`${apiUrl}/forex-prediction/?pair=${forexPair}&timeframe=${timeframe}`)
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching forex data:", err);
          setError("Failed to fetch forex prediction");
          setLoading(false);
        });
    } else {
      // Fetch crypto analysis
      axios.get(`${apiUrl}/market-analysis/?symbol=${symbol}&timeframe=${timeframe}`)
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching crypto data:", err);
          setError("Failed to fetch market data");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [symbol, forexPair, timeframe, marketType]);

  const currentSymbol = marketType === 'forex' ? forexPair : symbol;

  return (
    <div className="min-h-screen animated-gradient-bg text-white font-sans">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg animate-glow">
                <Activity className="text-white w-7 h-7" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold gradient-text flex items-center gap-2">
                  Live Trading Analysis
                  {marketType === 'forex' && <TrendingUp className="text-green-400 w-6 h-6" />}
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">Real-time market insights powered by AI</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 flex-wrap items-center">
              {/* Market Type Selector */}
              <div className="relative">
                <select
                  value={marketType}
                  onChange={(e) => setMarketType(e.target.value)}
                  className="glass-card px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 appearance-none pr-10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 hover:border-purple-500/50"
                >
                  <option value="crypto">🪙 Crypto</option>
                  <option value="forex">💱 Forex</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Symbol/Pair Selector */}
              {marketType === 'crypto' ? (
                <div className="relative">
                  <select
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="glass-card px-5 py-2.5 rounded-xl text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 appearance-none pr-10 border border-blue-500/30 hover:border-blue-500/50"
                  >
                    <option value="BTC/USDT">BTC/USDT</option>
                    <option value="ETH/USDT">ETH/USDT</option>
                    <option value="SOL/USDT">SOL/USDT</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <select
                    value={forexPair}
                    onChange={(e) => setForexPair(e.target.value)}
                    className="glass-card px-5 py-2.5 rounded-xl text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 appearance-none pr-10 border border-blue-500/30 hover:border-blue-500/50"
                  >
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="GBP/USD">GBP/USD</option>
                    <option value="USD/JPY">USD/JPY</option>
                    <option value="AUD/USD">AUD/USD</option>
                    <option value="USD/CAD">USD/CAD</option>
                    <option value="USD/CHF">USD/CHF</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Timeframe Selector */}
              <div className="relative">
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="glass-card px-5 py-2.5 rounded-xl text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 appearance-none pr-10 border border-green-500/30 hover:border-green-500/50"
                >
                  <option value="15m">⏱️ 15m</option>
                  <option value="1h">⏰ 1h</option>
                  <option value="4h">🕐 4h</option>

                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-6 py-8">
        {loading && !data ? (
          <div className="flex flex-col justify-center items-center h-[600px] gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-gray-400 animate-pulse-slow">Loading market data...</p>
          </div>
        ) : error ? (
          <div className="glass-card rounded-xl p-8 bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/50 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-red-500/20">
                <AlertCircle className="text-red-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-red-400">Error Loading Data</h3>
            </div>
            <p className="text-red-200">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-fade-in">
            {/* Chart Section */}
            <div className="xl:col-span-3 space-y-6">
              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                  title="Current Symbol"
                  value={currentSymbol}
                  icon={BarChart3}
                  gradient="purple"
                />
                <StatsCard
                  title="Timeframe"
                  value={timeframe.toUpperCase()}
                  icon={Zap}
                  gradient="blue"
                />
                <StatsCard
                  title="Data Points"
                  value={data?.data?.length || 0}
                  icon={Activity}
                  gradient="green"
                />
              </div>

              {/* Chart Card */}
              <div className="glass-card rounded-xl p-6 border border-white/10 h-[650px] hover:border-white/20 transition-all duration-300">
                {data && <ChartComponent data={data.data} symbol={currentSymbol} timeframe={data.timeframe} />}
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              {marketType === 'forex' && data?.prediction ? (
                <PredictionCard
                  prediction={data.prediction}
                  technicalSignal={data.technical_signal}
                />
              ) : (
                <div className="space-y-6">
                  {/* Signal Card */}
                  <div className={`glass-card rounded-xl p-8 border-2 transition-all duration-500 ${data?.latest_signal === 'BUY'
                    ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/50 hover:border-green-500/70 shadow-lg shadow-green-500/20'
                    : data?.latest_signal === 'SELL'
                      ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/50 hover:border-red-500/70 shadow-lg shadow-red-500/20'
                      : 'bg-gradient-to-br from-gray-500/10 to-gray-600/10 border-gray-700 hover:border-gray-600'
                    }`}>
                    <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-4 font-semibold">Current Signal</h3>
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-xl ${data?.latest_signal === 'BUY'
                        ? 'bg-green-500/20 animate-glow'
                        : data?.latest_signal === 'SELL'
                          ? 'bg-red-500/20 animate-glow'
                          : 'bg-gray-600/20'
                        }`}>
                        {data?.latest_signal === 'BUY' ? (
                          <ArrowUp className="text-green-400 w-10 h-10" strokeWidth={3} />
                        ) : data?.latest_signal === 'SELL' ? (
                          <ArrowDown className="text-red-400 w-10 h-10" strokeWidth={3} />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-600" />
                        )}
                      </div>
                      <span className={`text-5xl font-bold tracking-tight ${data?.latest_signal === 'BUY'
                        ? 'gradient-text-success'
                        : data?.latest_signal === 'SELL'
                          ? 'gradient-text-danger'
                          : 'text-gray-400'
                        }`}>
                        {data?.latest_signal || 'WAIT'}
                      </span>
                    </div>
                  </div>

                  {/* Latest Price Info */}
                  <div className="glass-card rounded-xl p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
                    <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-4 font-semibold">Latest Price</h3>
                    <div className="text-4xl font-mono font-bold tracking-tight">
                      ${data?.data[data.data.length - 1]?.close.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

