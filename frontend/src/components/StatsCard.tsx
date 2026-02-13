'use client';

import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    gradient?: 'blue' | 'purple' | 'green' | 'red';
    className?: string;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    gradient = 'blue',
    className = ''
}: StatsCardProps) {
    const gradientClasses = {
        blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
        purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
        green: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
        red: 'from-red-500/20 to-orange-500/20 border-red-500/30'
    };

    const iconColors = {
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        green: 'text-green-400',
        red: 'text-red-400'
    };

    return (
        <div className={`glass-card rounded-xl p-6 bg-gradient-to-br ${gradientClasses[gradient]} ${className}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">{title}</p>
                    <p className="text-3xl font-bold font-mono">{value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-white/5 ${iconColors[gradient]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            {trend && (
                <div className={`flex items-center text-sm font-semibold ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    <span>{trend.isPositive ? '↑' : '↓'}</span>
                    <span className="ml-1">{Math.abs(trend.value)}%</span>
                    <span className="ml-2 text-gray-500 font-normal">24h</span>
                </div>
            )}
        </div>
    );
}
