'use client';

import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    return (
        <div className="flex justify-center items-center">
            <div className="relative">
                {/* Outer ring */}
                <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin`}></div>
                {/* Middle ring */}
                <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin absolute top-0 left-0`} style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                {/* Inner glow */}
                <div className={`${sizeClasses[size]} rounded-full absolute top-0 left-0 blur-md opacity-50`} style={{ background: 'radial-gradient(circle, rgba(102,126,234,0.6) 0%, transparent 70%)' }}></div>
            </div>
        </div>
    );
}
