from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.market_data import market_data_service
from .services.indicators import technical_analysis_service
import json

@api_view(['GET'])
def health_check(request):
    return Response({"status": "healthy", "service": "django-backend"})

@api_view(['GET'])
def get_market_analysis(request):
    # Parameters
    symbol = request.GET.get('symbol', 'BTC/USDT') # Default crypto
    market_type = request.GET.get('type', 'crypto') # crypto or stock
    timeframe = request.GET.get('timeframe', '1h')
    
    try:
        if market_type == 'crypto':
            # Support basic exchange selection or default to binance
            exchange = request.GET.get('exchange', 'binance')
            df = market_data_service.get_crypto_ohlcv(exchange, symbol, timeframe) 
            # Note: I realized get_crypto_ohlcv was async. 
            # For this simple view, I should probably make it sync or use async view. 
            # Let's fix service to be sync or use async view. 
            # Django 4.2 supports async views.
        else:
            df = market_data_service.get_stock_ohlcv(symbol, timeframe)
            
        if df.empty:
             return Response({"error": "No data found"}, status=404)
             
        # Calculate Indicators
        analyzed_df = technical_analysis_service.calculate_indicators(df)
        
        # Convert to JSON compatible format
        # NaN values to None/null
        data_json = json.loads(analyzed_df.to_json(orient='records', date_format='iso'))
        
        return Response({
            "symbol": symbol,
            "timeframe": timeframe,
            "data": data_json,
            "latest_signal": analyzed_df.iloc[-1]['Signal'] if not analyzed_df.empty else "N/A"
        })
        
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def get_forex_prediction(request):
    """
    Get forex prediction with ML model
    Parameters: pair (e.g., EUR/USD), timeframe (1h, 4h, 1d), period (1mo, 3mo)
    """
    from .services.forex_predictor import forex_predictor
    
    pair = request.GET.get('pair', 'EUR/USD')
    timeframe = request.GET.get('timeframe', '1h')
    period = request.GET.get('period', '1mo')
    
    try:
        # Fetch forex data
        df = market_data_service.get_forex_ohlcv(pair, timeframe, period)
        
        if df.empty:
            return Response({"error": "No forex data found for this pair"}, status=404)
        
        # Get ML prediction
        prediction_details = forex_predictor.get_prediction_details(df)
        
        # Calculate technical indicators for additional context
        analyzed_df = technical_analysis_service.calculate_indicators(df)
        
        # Convert to JSON
        data_json = json.loads(analyzed_df.to_json(orient='records', date_format='iso'))
        
        return Response({
            "pair": pair,
            "timeframe": timeframe,
            "prediction": prediction_details,
            "data": data_json,
            "technical_signal": analyzed_df.iloc[-1]['Signal'] if not analyzed_df.empty else "N/A"
        })
        
    except Exception as e:
        return Response({"error": str(e)}, status=500)

