'use client';

import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface PredictionCardProps {
    prediction: {
        prediction: string;
        confidence: number;
        signal_strength: string;
        current_price: number;
        price_change_24h: number;
        message: string;
    };
    technicalSignal: string;
}

export default function PredictionCard({ prediction, technicalSignal }: PredictionCardProps) {
    const { prediction: direction, confidence, signal_strength, current_price, price_change_24h, message } = prediction;

    // Determine colors based on prediction
    const isUp = direction === 'UP';
    const isDown = direction === 'DOWN';

    const bgGradient = isUp
        ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10'
        : isDown
            ? 'bg-gradient-to-br from-red-500/10 to-orange-500/10'
            : 'bg-gradient-to-br from-gray-500/10 to-gray-600/10';

    const borderColor = isUp
        ? 'border-green-500/40'
        : isDown
            ? 'border-red-500/40'
            : 'border-gray-700';

    const textColor = isUp
        ? 'text-green-400'
        : isDown
            ? 'text-red-400'
            : 'text-gray-400';

    const Icon = isUp ? TrendingUp : isDown ? TrendingDown : AlertCircle;

    // Confidence bar color with smooth gradient
    const getConfidenceGradient = (conf: number) => {
        if (conf >= 70) return 'bg-gradient-to-r from-green-500 to-emerald-400';
        if (conf >= 55) return 'bg-gradient-to-r from-yellow-500 to-amber-400';
        return 'bg-gradient-to-r from-orange-500 to-red-400';
    };

    return (
        <div className="space-y-4 animate-fade-in">
            {/* ML Prediction Card */}
            <div className={`glass-card rounded-xl p-6 ${bgGradient} border-2 ${borderColor} relative overflow-hidden group`}>
                {/* Animated background glow */}
                {(isUp || isDown) && (
                    <div className={`absolute inset-0 ${isUp ? 'bg-green-500/5' : 'bg-red-500/5'} animate-pulse-slow`}></div>
                )}

                <div className="relative z-10">
                    <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-4 font-semibold">ML Prediction</h3>

                    <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 rounded-xl ${isUp ? 'bg-green-500/20' : isDown ? 'bg-red-500/20' : 'bg-gray-500/20'} animate-glow`}>
                            <Icon className={`${textColor} w-8 h-8`} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                            <div className={`text-4xl font-bold ${textColor} tracking-tight`}>
                                {direction}
                            </div>
                            <div className="text-sm text-gray-400 mt-1 font-medium">
                                {signal_strength} Signal
                            </div>
                        </div>
                    </div>

                    {/* Confidence Bar */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400 font-medium">Confidence</span>
                            <span className="text-white font-bold font-mono">{confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                            <div
                                className={`h-3 rounded-full ${getConfidenceGradient(confidence)} transition-all duration-1000 ease-out shadow-lg`}
                                style={{ width: `${confidence}%` }}
                            >
                                <div className="w-full h-full animate-pulse-slow bg-white/20"></div>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-300 italic leading-relaxed">{message}</p>
                </div>
            </div>

            {/* Price Info Card */}
            <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
                <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Current Price</h3>
                <div className="text-4xl font-mono font-bold text-white mb-3 tracking-tight">
                    {current_price.toFixed(5)}
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${price_change_24h >= 0
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                    <span className="mr-1">{price_change_24h >= 0 ? '↑' : '↓'}</span>
                    {price_change_24h >= 0 ? '+' : ''}{price_change_24h.toFixed(2)}%
                    <span className="ml-1 text-xs opacity-75">(24h)</span>
                </div>
            </div>

            {/* Technical Signal Card */}
            <div className={`glass-card rounded-xl p-6 border-2 transition-all duration-300 ${technicalSignal === 'BUY'
                    ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/40 hover:border-green-500/60'
                    : technicalSignal === 'SELL'
                        ? 'bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/40 hover:border-red-500/60'
                        : 'bg-gradient-to-br from-gray-500/10 to-gray-600/10 border-gray-700 hover:border-gray-600'
                }`}>
                <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Technical Signal</h3>
                <div className={`text-3xl font-bold tracking-tight ${technicalSignal === 'BUY'
                        ? 'gradient-text-success'
                        : technicalSignal === 'SELL'
                            ? 'gradient-text-danger'
                            : 'text-gray-400'
                    }`}>
                    {technicalSignal}
                </div>
            </div>
        </div>
    );
}

