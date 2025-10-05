'use client'

import { useState } from 'react'
import { AstronautModule } from './modules/AstronautModule'
import { StatisticsModule } from './modules/StatisticsModule'
import { DashboardModule } from './modules/DashboardModule'
import { MonitoringModule } from './modules/MonitoringModule'
import { useCurrentTime } from '@/hooks/useCurrentTime'

type TabType = 'dashboard' | 'astronauts' | 'statistics' | 'monitoring'

export function CosmotecDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const currentTime = useCurrentTime()

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: '🚀' },
    { id: 'astronauts' as TabType, label: 'Astronauts', icon: '👨‍🚀' },
    { id: 'statistics' as TabType, label: 'Statistics', icon: '📊' },
    { id: 'monitoring' as TabType, label: 'Monitoring', icon: '📡' },
  ]

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                <span className="text-white font-bold text-xl">🚀</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">COSMOTEC</h1>
                <p className="text-xs text-white/70 tracking-widest">NASA ASTRONAUT MONITORING SYSTEM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">SYSTEM ACTIVE</span>
              </div>
              <div className="text-xs text-white/70">
                {currentTime}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-400 bg-red-500/10'
                    : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {activeTab === 'dashboard' && <DashboardModule />}
        {activeTab === 'astronauts' && <AstronautModule />}
        {activeTab === 'statistics' && <StatisticsModule />}
        {activeTab === 'monitoring' && <MonitoringModule />}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-xs text-white/60">
            <div>
              © 2024 COSMOTEC - NASA Astronaut Monitoring System
            </div>
            <div className="flex items-center gap-4">
              <span>API: localhost:5000</span>
              <span>•</span>
              <span>RTK Query</span>
              <span>•</span>
              <span>Next.js</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
