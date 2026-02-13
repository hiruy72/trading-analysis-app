import ccxt
import yfinance as yf
import pandas as pd
from datetime import datetime
import asyncio
from .mock_data import mock_data_generator

class MarketDataService:
    def __init__(self):
        self.exchanges = {
            'binance': ccxt.binance(),
            'coinbase': ccxt.coinbase(),
        }
        self.use_mock_data = False  # Flag to control mock data usage

    def get_crypto_ohlcv(self, exchange_name: str, symbol: str, timeframe: str = '1h', limit: int = 100):
        exchange = self.exchanges.get(exchange_name)
        if not exchange:
            raise ValueError(f"Exchange {exchange_name} not supported")
        
        # Try to fetch real data first
        try:
            ohlcv = exchange.fetch_ohlcv(symbol, timeframe, limit=limit)
            df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
            df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
            print(f"✅ Successfully fetched real data for {symbol}")
            return df
        except Exception as e:
            print(f"⚠️ Error fetching crypto data from {exchange_name}: {e}")
            print(f"📊 Using mock data for {symbol}")
            # Fallback to mock data
            return mock_data_generator.generate_crypto_ohlcv(symbol, timeframe, limit)

    def get_stock_ohlcv(self, symbol: str, interval: str = '1h', period: str = '1mo'):
        try:
            ticker = yf.Ticker(symbol)
            df = ticker.history(period=period, interval=interval)
            df.reset_index(inplace=True)
            # Standardize columns
            df.rename(columns={'Date': 'timestamp', 'Datetime': 'timestamp', 'Open': 'open', 'High': 'high', 'Low': 'low', 'Close': 'close', 'Volume': 'volume'}, inplace=True)
            print(f"✅ Successfully fetched stock data for {symbol}")
            return df[['timestamp', 'open', 'high', 'low', 'close', 'volume']]
        except Exception as e:
            print(f"⚠️ Error fetching stock data: {e}")
            print(f"📊 Using mock data for {symbol}")
            # Fallback to mock data (treat as crypto for now)
            return mock_data_generator.generate_crypto_ohlcv(symbol, interval, 100)

    def get_forex_ohlcv(self, pair: str, interval: str = '1h', period: str = '1mo'):
        """
        Fetch forex data using yfinance.
        Forex pairs format: EURUSD=X, GBPUSD=X, USDJPY=X, etc.
        """
        try:
            # Convert pair format if needed (EUR/USD -> EURUSD=X)
            yahoo_symbol = pair
            if '/' in pair:
                yahoo_symbol = pair.replace('/', '') + '=X'
            elif not pair.endswith('=X'):
                yahoo_symbol = pair + '=X'
            
            ticker = yf.Ticker(yahoo_symbol)
            df = ticker.history(period=period, interval=interval)
            
            if df.empty:
                raise ValueError(f"No data returned for {yahoo_symbol}")
            
            df.reset_index(inplace=True)
            # Standardize columns
            df.rename(columns={'Date': 'timestamp', 'Datetime': 'timestamp', 'Open': 'open', 'High': 'high', 'Low': 'low', 'Close': 'close', 'Volume': 'volume'}, inplace=True)
            print(f"✅ Successfully fetched forex data for {pair}")
            return df[['timestamp', 'open', 'high', 'low', 'close', 'volume']]
        except Exception as e:
            print(f"⚠️ Error fetching forex data: {e}")
            print(f"📊 Using mock data for {pair}")
            # Fallback to mock data
            return mock_data_generator.generate_forex_ohlcv(pair, interval, 100)

market_data_service = MarketDataService()
