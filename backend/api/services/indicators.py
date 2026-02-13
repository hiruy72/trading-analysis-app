import pandas_ta as ta
import pandas as pd

class TechnicalAnalysisService:
    def calculate_indicators(self, df: pd.DataFrame):
        if df.empty:
            return df
        
        # Ensure we have a DatetimeIndex
        # if 'timestamp' in df.columns:
        #     df.set_index('timestamp', inplace=True)
        
        data = df.copy()
        
        # SMA
        data['SMA_20'] = ta.sma(data['close'], length=20)
        data['SMA_50'] = ta.sma(data['close'], length=50)
        
        # EMA
        data['EMA_20'] = ta.ema(data['close'], length=20)
        
        # RSI
        data['RSI'] = ta.rsi(data['close'], length=14)
        
        # MACD
        macd = ta.macd(data['close'])
        if macd is not None:
             data = pd.concat([data, macd], axis=1)

        # ATR
        data['ATR'] = ta.atr(data['high'], data['low'], data['close'], length=14)
        
        # Generate Signals (Simple Logic)
        data['Signal'] = 'HOLD'
        
        # Example Strategy: Golden Cross (SMA 20 crosses above SMA 50)
        # Identify crossover
        data['Crossover'] = (data['SMA_20'] > data['SMA_50']) & (data['SMA_20'].shift(1) <= data['SMA_50'].shift(1))
        data['Crossunder'] = (data['SMA_20'] < data['SMA_50']) & (data['SMA_20'].shift(1) >= data['SMA_50'].shift(1))
        
        data.loc[data['Crossover'], 'Signal'] = 'BUY'
        data.loc[data['Crossunder'], 'Signal'] = 'SELL'
        
        # TP/SL Calculation (Based on ATR)
        # For BUY: SL = Close - 2*ATR, TP = Close + 3*ATR
        data.loc[data['Signal'] == 'BUY', 'SL'] = data['close'] - (2 * data['ATR'])
        data.loc[data['Signal'] == 'BUY', 'TP'] = data['close'] + (3 * data['ATR'])
        
        # For SELL: SL = Close + 2*ATR, TP = Close - 3*ATR
        data.loc[data['Signal'] == 'SELL', 'SL'] = data['close'] + (2 * data['ATR'])
        data.loc[data['Signal'] == 'SELL', 'TP'] = data['close'] - (3 * data['ATR'])
        
        return data

technical_analysis_service = TechnicalAnalysisService()
