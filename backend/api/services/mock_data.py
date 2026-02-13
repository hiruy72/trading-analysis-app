import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class MockDataGenerator:
    """Generate realistic mock trading data for demo purposes"""
    
    def generate_crypto_ohlcv(self, symbol: str, timeframe: str = '1h', limit: int = 100):
        """Generate mock crypto OHLCV data"""
        # Base prices for different symbols
        base_prices = {
            'BTC/USDT': 45000,
            'ETH/USDT': 2500,
            'SOL/USDT': 100,
        }
        
        base_price = base_prices.get(symbol, 1000)
        
        # Generate timestamps
        if timeframe == '15m':
            delta = timedelta(minutes=15)
        elif timeframe == '1h':
            delta = timedelta(hours=1)
        elif timeframe == '4h':
            delta = timedelta(hours=4)
        elif timeframe == '1d':
            delta = timedelta(days=1)
        else:
            delta = timedelta(hours=1)
        
        end_time = datetime.now()
        timestamps = [end_time - delta * i for i in range(limit)]
        timestamps.reverse()
        
        # Generate realistic price movements
        np.random.seed(42)  # For reproducibility
        
        data = []
        current_price = base_price
        
        for ts in timestamps:
            # Random walk with trend
            change_percent = np.random.normal(0, 0.02)  # 2% volatility
            current_price = current_price * (1 + change_percent)
            
            # Generate OHLC
            high = current_price * (1 + abs(np.random.normal(0, 0.01)))
            low = current_price * (1 - abs(np.random.normal(0, 0.01)))
            open_price = current_price * (1 + np.random.normal(0, 0.005))
            close_price = current_price
            volume = abs(np.random.normal(1000000, 200000))
            
            data.append({
                'timestamp': ts,
                'open': open_price,
                'high': high,
                'low': low,
                'close': close_price,
                'volume': volume
            })
        
        return pd.DataFrame(data)
    
    def generate_forex_ohlcv(self, pair: str, timeframe: str = '1h', limit: int = 100):
        """Generate mock forex OHLCV data"""
        # Base prices for forex pairs
        base_prices = {
            'EUR/USD': 1.0850,
            'GBP/USD': 1.2650,
            'USD/JPY': 148.50,
            'AUD/USD': 0.6550,
            'USD/CAD': 1.3450,
            'USD/CHF': 0.8750,
        }
        
        base_price = base_prices.get(pair, 1.0)
        
        # Generate timestamps
        if timeframe == '15m':
            delta = timedelta(minutes=15)
        elif timeframe == '1h':
            delta = timedelta(hours=1)
        elif timeframe == '4h':
            delta = timedelta(hours=4)
        elif timeframe == '1d':
            delta = timedelta(days=1)
        else:
            delta = timedelta(hours=1)
        
        end_time = datetime.now()
        timestamps = [end_time - delta * i for i in range(limit)]
        timestamps.reverse()
        
        # Generate realistic price movements (forex is less volatile)
        np.random.seed(42)
        
        data = []
        current_price = base_price
        
        for ts in timestamps:
            # Smaller volatility for forex
            change_percent = np.random.normal(0, 0.005)  # 0.5% volatility
            current_price = current_price * (1 + change_percent)
            
            # Generate OHLC
            high = current_price * (1 + abs(np.random.normal(0, 0.002)))
            low = current_price * (1 - abs(np.random.normal(0, 0.002)))
            open_price = current_price * (1 + np.random.normal(0, 0.001))
            close_price = current_price
            volume = abs(np.random.normal(100000, 20000))
            
            data.append({
                'timestamp': ts,
                'open': open_price,
                'high': high,
                'low': low,
                'close': close_price,
                'volume': volume
            })
        
        return pd.DataFrame(data)

mock_data_generator = MockDataGenerator()
