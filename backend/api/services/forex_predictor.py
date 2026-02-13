import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings('ignore')

class ForexPredictor:
    def __init__(self):
        self.model = None
        self.scaler = None
        
    def _ensure_model(self):
        """
        Lazy load model and scaler to save memory
        """
        if self.model is None:
            # Lazy import sklearn to avoid high memory usage on startup
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.preprocessing import StandardScaler
            
            # Use fewer estimators and limit depth to save memory
            self.model = RandomForestClassifier(n_estimators=50, max_depth=10, random_state=42, n_jobs=1)
            self.scaler = StandardScaler()

    def prepare_features(self, df):
        """
        Prepare features for ML model from OHLCV data
        """
        if df.empty or len(df) < 20:
            return None, None
        
        df = df.copy()
        
        # Calculate technical indicators as features
        # Moving Averages
        df['sma_5'] = df['close'].rolling(window=5).mean()
        df['sma_10'] = df['close'].rolling(window=10).mean()
        df['sma_20'] = df['close'].rolling(window=20).mean()
        
        # RSI
        delta = df['close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
        rs = gain / loss
        df['rsi'] = 100 - (100 / (1 + rs))
        
        # MACD
        exp1 = df['close'].ewm(span=12, adjust=False).mean()
        exp2 = df['close'].ewm(span=26, adjust=False).mean()
        df['macd'] = exp1 - exp2
        df['macd_signal'] = df['macd'].ewm(span=9, adjust=False).mean()
        
        # Price momentum
        df['momentum'] = df['close'].pct_change(periods=5)
        
        # Volatility
        df['volatility'] = df['close'].rolling(window=10).std()
        
        # Volume trend
        df['volume_sma'] = df['volume'].rolling(window=5).mean()
        
        # Price position relative to high/low
        df['price_position'] = (df['close'] - df['low']) / (df['high'] - df['low'])
        
        # Target: 1 if price goes up, 0 if down
        df['target'] = (df['close'].shift(-1) > df['close']).astype(int)
        
        # Drop NaN values
        df = df.dropna()
        
        if len(df) < 10:
            return None, None
        
        # Feature columns
        feature_cols = ['sma_5', 'sma_10', 'sma_20', 'rsi', 'macd', 'macd_signal', 
                       'momentum', 'volatility', 'volume_sma', 'price_position']
        
        X = df[feature_cols]
        y = df['target']
        
        return X, y
    
    def train_and_predict(self, df):
        """
        Train model on historical data and predict next movement
        Returns: prediction (UP/DOWN), confidence (0-100)
        """
        self._ensure_model()
        
        X, y = self.prepare_features(df)
        
        if X is None or len(X) < 10:
            return "INSUFFICIENT_DATA", 0.0
        
        # Use most recent data for training (last 80% train, last point for prediction)
        train_size = int(len(X) * 0.8)
        X_train = X.iloc[:train_size]
        y_train = y.iloc[:train_size]
        X_latest = X.iloc[-1:] # Last point for prediction
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_latest_scaled = self.scaler.transform(X_latest)
        
        # Train model
        self.model.fit(X_train_scaled, y_train)
        
        # Predict
        prediction = self.model.predict(X_latest_scaled)[0]
        confidence = self.model.predict_proba(X_latest_scaled)[0]
        
        # Get confidence for the predicted class
        predicted_confidence = confidence[prediction] * 100
        
        direction = "UP" if prediction == 1 else "DOWN"
        
        return direction, round(predicted_confidence, 2)
    
    def get_prediction_details(self, df):
        """
        Get detailed prediction with supporting metrics
        """
        direction, confidence = self.train_and_predict(df)
        
        if direction == "INSUFFICIENT_DATA":
            return {
                "prediction": "WAIT",
                "confidence": 0,
                "direction": "INSUFFICIENT_DATA",
                "message": "Not enough historical data for prediction"
            }
        
        # Calculate additional metrics
        latest = df.iloc[-1]
        prev = df.iloc[-2] if len(df) > 1 else latest
        
        price_change = ((latest['close'] - prev['close']) / prev['close']) * 100
        
        # Determine signal strength
        if confidence >= 70:
            signal_strength = "STRONG"
        elif confidence >= 55:
            signal_strength = "MODERATE"
        else:
            signal_strength = "WEAK"
        
        return {
            "prediction": direction,
            "confidence": confidence,
            "signal_strength": signal_strength,
            "current_price": round(latest['close'], 5),
            "price_change_24h": round(price_change, 2),
            "message": f"{signal_strength} {direction} signal with {confidence}% confidence"
        }

forex_predictor = ForexPredictor()
