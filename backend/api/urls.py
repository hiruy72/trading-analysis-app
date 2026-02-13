from django.urls import path
from .views import health_check, get_market_analysis, get_forex_prediction

urlpatterns = [
    path('health/', health_check, name='health_check'),
    path('market-analysis/', get_market_analysis, name='market_analysis'),
    path('forex-prediction/', get_forex_prediction, name='forex_prediction'),
]
