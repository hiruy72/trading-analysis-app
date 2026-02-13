import pandas as pd
import numpy as np

class TechnicalAnalysisService:
    def calculate_indicators(self, df: pd.DataFrame):
        if df.empty:
            return df
        
        # Ensure we work on a copy to avoid SettingWithCopyWarning
        data = df.copy()
        
        # Calculate Base Components if needed
        close = data['close']
        high = data['high']
        low = data['low']

        # 1. SMA (Simple Moving Average)
        data['SMA_20'] = close.rolling(window=20).mean()
        data['SMA_50'] = close.rolling(window=50).mean()
        
        # 2. EMA (Exponential Moving Average)
        data['EMA_20'] = close.ewm(span=20, adjust=False).mean()
        
        # 3. RSI (Relative Strength Index)
        delta = close.diff()
        gain = (delta.where(delta > 0, 0))
        loss = (-delta.where(delta < 0, 0))
        
        avg_gain = gain.rolling(window=14).mean()
        avg_loss = loss.rolling(window=14).mean()
        
        rs = avg_gain / avg_loss
        data['RSI'] = 100 - (100 / (1 + rs))
        # Note: The above is a simple rolling RSI. 
        # For Wilder's RSI (smoother), we would use ewm, but simple rolling is often sufficient/standard in basic setups.
        # Let's use Wilder's method for consistency with standard libs if possible, but rolling is fine for now to ensure stability.

        # 4. MACD (Moving Average Convergence Divergence)
        exp12 = close.ewm(span=12, adjust=False).mean()
        exp26 = close.ewm(span=26, adjust=False).mean()
        data['MACD_12_26_9'] = exp12 - exp26
        data['MACDs_12_26_9'] = data['MACD_12_26_9'].ewm(span=9, adjust=False).mean() # Signal line
        data['MACDh_12_26_9'] = data['MACD_12_26_9'] - data['MACDs_12_26_9'] # Histogram

        # 5. ATR (Average True Range)
        # TR = Max(High - Low, Abs(High - PrevClose), Abs(Low - PrevClose))
        prev_close = close.shift(1)
        tr1 = high - low
        tr2 = (high - prev_close).abs()
        tr3 = (low - prev_close).abs()
        tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
        data['ATR'] = tr.rolling(window=14).mean()
        
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
        
        # Clean up intermediate MACD columns to match expected output format if necessary, 
        # or just keep them. The previous code didn't specify exact column names from macd() call 
        # but usually they are MACD_..., MACDh_..., MACDs_...
        # Let's ensure strict compatibility if the frontend expects specific names.
        # Frontend likely doesn't assume specific indicator names other than what was returned.
        
        return data

technical_analysis_service = TechnicalAnalysisService()
