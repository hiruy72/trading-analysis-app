'use client';

import React from 'react';
import dynamic from 'next/dynamic';
// Define types locally or use any to avoid import issues
type Data = any;
type Layout = any;

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface ChartProps {
    data: any[];
    symbol: string;
    timeframe: string;
}

const ChartComponent: React.FC<ChartProps> = ({ data, symbol, timeframe }) => {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    // Extract data for Plotly
    const dates = data.map(d => d.timestamp);
    const open = data.map(d => d.open);
    const high = data.map(d => d.high);
    const low = data.map(d => d.low);
    const close = data.map(d => d.close);

    // Indicator arrays
    const sma20 = data.map(d => d.SMA_20);
    const sma50 = data.map(d => d.SMA_50);

    // Buy/Sell Signals
    const buySignals = data.filter(d => d.Signal === 'BUY');
    const sellSignals = data.filter(d => d.Signal === 'SELL');

    const plotData: Data[] = [
        {
            x: dates,
            close: close,
            decreasing: { line: { color: '#ef5350' } },
            high: high,
            increasing: { line: { color: '#26a69a' } },
            line: { color: 'rgba(31,119,180,1)' },
            low: low,
            open: open,
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            name: symbol
        },
        {
            x: dates,
            y: sma20,
            type: 'scatter',
            mode: 'lines',
            line: { color: 'blue', width: 1 },
            name: 'SMA 20'
        },
        {
            x: dates,
            y: sma50,
            type: 'scatter',
            mode: 'lines',
            line: { color: 'orange', width: 1 },
            name: 'SMA 50'
        },
        // Markers for Signals
        {
            x: buySignals.map(d => d.timestamp),
            y: buySignals.map(d => d.low * 0.99), // Slightly below candle
            mode: 'markers',
            name: 'BUY',
            marker: { symbol: 'triangle-up', size: 10, color: 'green' }
        },
        {
            x: sellSignals.map(d => d.timestamp),
            y: sellSignals.map(d => d.high * 1.01), // Slightly above candle
            mode: 'markers',
            name: 'SELL',
            marker: { symbol: 'triangle-down', size: 10, color: 'red' }
        }
    ];

    const layout: Partial<Layout> = {
        dragmode: 'zoom',
        margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60
        },
        showlegend: true,
        legend: {
            orientation: 'h',
            yanchor: 'bottom',
            y: 1.02,
            xanchor: 'right',
            x: 1,
            font: {
                color: '#a0a0b0',
                size: 11
            },
            bgcolor: 'rgba(26, 26, 36, 0.6)',
            bordercolor: 'rgba(255, 255, 255, 0.1)',
            borderwidth: 1
        },
        xaxis: {
            autorange: true,
            title: 'Date',
            type: 'date',
            rangeslider: { visible: false },
            gridcolor: 'rgba(255, 255, 255, 0.05)',
            color: '#a0a0b0'
        },
        yaxis: {
            autorange: true,
            type: 'linear',
            gridcolor: 'rgba(255, 255, 255, 0.05)',
            color: '#a0a0b0'
        },
        height: 600,
        paper_bgcolor: 'rgba(26, 26, 36, 0.4)',
        plot_bgcolor: 'rgba(26, 26, 36, 0.2)',
        font: {
            color: '#a0a0b0',
            family: 'Inter, sans-serif'
        }
    };

    return (
        <div className="w-full h-full">
            <Plot
                data={plotData}
                layout={layout}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
                config={{ responsive: true, displayModeBar: true, displaylogo: false }}
            />
        </div>
    );
};

export default ChartComponent;

