# 🚀 COSMOTEC - NASA Astronaut Monitoring System

<div align="center">

![AURA Logo](https://img.shields.io/badge/AURA-Advanced%20Monitoring-blue?style=for-the-badge&logo=space&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Advanced Monitoring and Analysis System for Space Exploration**

[![NASA](https://img.shields.io/badge/NASA-Partner-red?style=for-the-badge&logo=nasa&logoColor=white)](https://nasa.gov)
[![RTK Query](https://img.shields.io/badge/RTK%20Query-Data%20Fetching-orange?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/rtk-query/overview)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔧 API Integration](#-api-integration)
- [🎨 UI Components](#-ui-components)
- [📊 Dashboard Modules](#-dashboard-modules)
- [👨‍🚀 Astronaut Management](#-astronaut-management)
- [🔐 Authentication](#-authentication)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Overview

**COSMOTEC** is a cutting-edge web application designed for NASA's astronaut monitoring and analysis system. Built with modern web technologies, it provides real-time monitoring, data visualization, and comprehensive astronaut health tracking capabilities.

### 🌟 Key Highlights

- **Real-time Monitoring**: Live astronaut status tracking with instant updates
- **Advanced Analytics**: Comprehensive data analysis and reporting
- **Modern UI/UX**: Sleek, responsive design with space-themed aesthetics
- **Scalable Architecture**: Built for enterprise-level performance
- **NASA Integration**: Designed specifically for space exploration missions

---

## ✨ Features

### 🔍 **Core Functionality**
- **Dashboard Overview**: Real-time system status and key metrics
- **Astronaut Profiles**: Complete astronaut information management
- **Health Monitoring**: Advanced biometric and psychological tracking
- **Statistics & Analytics**: Comprehensive data visualization
- **Real-time Updates**: Live data streaming and notifications

### 🎨 **User Experience**
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark Theme**: Space-themed UI with red-orange gradient accents
- **Intuitive Navigation**: Clean, professional interface
- **Accessibility**: WCAG compliant design patterns
- **Performance**: Optimized for speed and efficiency

### 🔧 **Technical Features**
- **TypeScript**: Full type safety and enhanced development experience
- **RTK Query**: Efficient data fetching and caching
- **Component Architecture**: Modular, reusable components
- **State Management**: Centralized application state
- **API Integration**: RESTful API communication

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: TailwindCSS 3.0
- **State Management**: Redux Toolkit + RTK Query
- **UI Components**: Custom component library
- **Icons**: Lucide React

### **Backend Integration**
- **API**: RESTful API (localhost:5000)
- **Data Fetching**: RTK Query
- **Authentication**: Custom auth system
- **Real-time**: WebSocket integration

### **Development Tools**
- **Package Manager**: npm
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Type Checking**: TypeScript
- **Version Control**: Git

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm 9+
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cosmotec-app.git
   cd cosmotec-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Default Login Credentials**
- **Email**: `cosmotec@gmail.com`
- **Password**: `12345678`

---

## 📁 Project Structure

```
cosmotec-app/
├── 📁 public/
│   ├── astronauts/          # Astronaut profile images
│   ├── *.svg               # Static assets
│   └── *.png               # Logo and images
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 astronautas/ # Astronaut dashboard page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── 📁 components/
│   │   ├── 📁 modules/     # Dashboard modules
│   │   │   ├── AstronautModule.tsx
│   │   │   ├── DashboardModule.tsx
│   │   │   ├── MonitoringModule.tsx
│   │   │   └── StatisticsModule.tsx
│   │   ├── 📁 providers/   # Context providers
│   │   ├── 📁 ui/          # UI components
│   │   ├── AstronautList.tsx
│   │   ├── AuraInfoCard.tsx
│   │   ├── AuraTeamCard.tsx
│   │   ├── AuraKeywordsCard.tsx
│   │   └── CosmotecDashboard.tsx
│   ├── 📁 hooks/           # Custom React hooks
│   └── 📁 lib/
│       ├── 📁 api/         # API configuration
│       ├── store.ts        # Redux store
│       └── utils.ts        # Utility functions
├── components.json         # UI component configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

---

## 🔧 API Integration

### **Base Configuration**
```typescript
// API Base URL
const API_BASE_URL = 'http://localhost:5000'

// Endpoints
- GET /api/astronauts/profiles     # Astronaut profiles
- GET /api/astronauts/status/:id   # Astronaut status
- GET /api/statistics              # System statistics
- GET /api/monitoring              # Monitoring data
```

### **RTK Query Setup**
```typescript
// API Slice Configuration
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
  }),
  tagTypes: ['Astronaut', 'Status', 'Statistics'],
  endpoints: (builder) => ({
    // Endpoint definitions
  }),
})
```

---

## 🎨 UI Components

### **Design System**
- **Color Palette**: Space-themed with red-orange gradients
- **Typography**: Modern, readable font stack
- **Spacing**: Consistent 8px grid system
- **Components**: Modular, reusable UI elements

### **Key Components**
- **CosmotecDashboard**: Main dashboard container
- **AstronautModule**: Astronaut management interface
- **MonitoringModule**: Real-time monitoring display
- **StatisticsModule**: Analytics and reporting
- **AuraInfoCard**: System information display

---

## 📊 Dashboard Modules

### **1. Dashboard Module**
- System overview and key metrics
- Real-time status indicators
- Quick access to critical functions

### **2. Astronaut Module**
- Complete astronaut profile management
- Health status monitoring
- Biometric data visualization
- Status tracking (OPTIMO, ESTRESADO, CRITICO)

### **3. Statistics Module**
- Comprehensive data analytics
- Performance metrics
- Historical data visualization
- Export capabilities

### **4. Monitoring Module**
- Real-time system monitoring
- Alert management
- Performance tracking
- System health indicators

---

## 👨‍🚀 Astronaut Management

### **Features**
- **Profile Management**: Complete astronaut information
- **Status Tracking**: Real-time health monitoring
- **Biometric Data**: Eye opening, tension, pallor, focus, concentration
- **Photo Management**: Profile image handling
- **Status Indicators**: Visual status representation

### **Status Types**
- **OPTIMO**: Optimal condition (Green)
- **ESTRESADO**: Stressed condition (Yellow)
- **CRITICO**: Critical condition (Red)

---

## 🔐 Authentication

### **Login System**
- **Default Credentials**: cosmotec@gmail.com / 12345678
- **Session Management**: Automatic redirection
- **Security**: Form validation and error handling

### **Access Control**
- **Protected Routes**: Dashboard access control
- **User Session**: Persistent login state
- **Redirect Logic**: Automatic navigation to dashboard

---

## 🌐 Deployment

### **Production Build**
```bash
npm run build
npm start
```

### **Environment Variables**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=COSMOTEC
```

### **Docker Support**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use meaningful commit messages
- Write clean, readable code
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🚀 **Ready for Launch**

<div align="center">

**COSMOTEC - Where Space Exploration Meets Modern Technology**

[![GitHub stars](https://img.shields.io/github/stars/your-username/cosmotec-app?style=social)](https://github.com/your-username/cosmotec-app)
[![GitHub forks](https://img.shields.io/github/forks/your-username/cosmotec-app?style=social)](https://github.com/your-username/cosmotec-app)
[![GitHub issues](https://img.shields.io/github/issues/your-username/cosmotec-app)](https://github.com/your-username/cosmotec-app/issues)

**Built with ❤️ for NASA Space Exploration**

</div># fronted-cosmotec
