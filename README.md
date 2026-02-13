# 📈 Live Trading Analysis Web Application

A sophisticated full-stack trading analysis platform that combines real-time market data, technical analysis, and AI-powered insights with a premium, modern user interface.

## 🌟 Overview

This application provides traders with comprehensive market analysis tools, real-time data visualization, and intelligent trading signals. Built with cutting-edge technologies, it delivers a seamless experience for analyzing financial markets and making informed trading decisions.

## 🏗️ Architecture

### Backend (Django + REST API)
- **Framework**: Django 4.x with Django REST Framework
- **Market Data**: Integration with CCXT and yFinance for multi-exchange support
- **Technical Analysis**: Pandas-TA for advanced indicators (RSI, MACD, Bollinger Bands, etc.)
- **Machine Learning**: Scikit-learn for predictive analytics
- **Database**: SQLite (development) with support for PostgreSQL (production)

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **UI/UX**: Premium design system with glassmorphism and micro-animations
- **Styling**: Custom CSS with advanced design tokens
- **State Management**: React hooks and context API
- **Data Visualization**: Real-time charts and interactive dashboards

## ✨ Features

### Market Analysis
- 📊 Real-time market data from multiple exchanges
- 📈 Advanced technical indicators and overlays
- 🎯 Automated trading signal generation
- 📉 Historical data analysis and backtesting
- 🔔 Price alerts and notifications

### Technical Indicators
- **Trend Indicators**: Moving Averages (SMA, EMA), MACD, ADX
- **Momentum Indicators**: RSI, Stochastic Oscillator, CCI
- **Volatility Indicators**: Bollinger Bands, ATR, Keltner Channels
- **Volume Indicators**: OBV, Volume Profile, VWAP

### User Interface
- 🎨 Premium glassmorphic design with smooth animations
- 🌙 Dark mode optimized for extended trading sessions
- 📱 Fully responsive across all devices
- ⚡ Lightning-fast performance with optimized rendering
- 🎭 Interactive charts with zoom and pan capabilities

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **Python**: 3.9 or higher
- **npm/yarn/pnpm**: Latest version
- **pip**: Latest version

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Trading
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
Trading/
├── backend/                 # Django backend
│   ├── api/                # API endpoints and services
│   │   ├── services/       # Business logic and market data
│   │   ├── views.py        # API views
│   │   └── models.py       # Database models
│   ├── config/             # Django configuration
│   │   ├── settings.py     # Project settings
│   │   └── urls.py         # URL routing
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
│
└── frontend/               # Next.js frontend
    ├── app/                # Next.js app directory
    │   ├── page.tsx        # Main dashboard
    │   └── layout.tsx      # Root layout
    ├── components/         # React components
    ├── public/             # Static assets
    ├── styles/             # CSS and design system
    └── package.json        # Node dependencies
```

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 📡 API Endpoints

### Market Data
- `GET /api/market-data/` - Fetch current market data
- `GET /api/market-data/{symbol}/` - Get specific symbol data
- `GET /api/historical/{symbol}/` - Historical price data

### Technical Analysis
- `GET /api/indicators/{symbol}/` - Calculate technical indicators
- `GET /api/signals/{symbol}/` - Generate trading signals

## 🎨 Design System

The application features a premium design system with:
- **Typography**: Custom font stack with Inter and Roboto
- **Colors**: Sophisticated HSL-based color palette
- **Effects**: Glassmorphism, gradients, and shadows
- **Animations**: Smooth micro-interactions and transitions
- **Responsive**: Mobile-first approach with breakpoints

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📦 Deployment

### Backend Deployment
- Configure production database (PostgreSQL recommended)
- Set `DEBUG=False` in production
- Configure static files serving
- Use gunicorn or uwsgi for WSGI server

### Frontend Deployment
```bash
cd frontend
npm run build
npm start
```

Or deploy to Vercel:
```bash
vercel deploy
```

## 🛠️ Technologies

### Backend Stack
- Django 4.x
- Django REST Framework
- CCXT (Cryptocurrency Exchange Trading Library)
- yFinance (Yahoo Finance API)
- Pandas & Pandas-TA
- Scikit-learn
- NumPy

### Frontend Stack
- Next.js 14
- React 18
- TypeScript
- Custom CSS with design tokens
- Geist Font Family

## 📚 Documentation

- [Django Documentation](https://docs.djangoproject.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [CCXT Documentation](https://docs.ccxt.com/)
- [Pandas-TA Documentation](https://github.com/twopirllc/pandas-ta)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Hiruy Legesse**

## 🙏 Acknowledgments

- Market data provided by CCXT and yFinance
- Technical analysis powered by Pandas-TA
- UI inspiration from modern fintech applications
- Community contributors and open-source projects

---

**Note**: This application is for educational and analysis purposes only. Always conduct your own research before making trading decisions.
