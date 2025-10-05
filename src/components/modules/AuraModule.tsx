'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Tipos para el sistema AURA
type EmotionType = 'POSITIVA' | 'NEGATIVA' | 'NEUTRA'
type EmotionalZone = 'MOTIVADOR' | 'ESTRESADO' | 'CRITICO'
type MissionPhase = 'TIERRA' | 'ESPACIO' | 'RETROALIMENTACION'

interface EmotionalReading {
  id: string
  astronautId: string
  emotion: EmotionType
  confidence: number
  timestamp: string
  facialFeatures: {
    eyeOpening: number
    focus: number
    concentration: number
    tensionExpressions: number
  }
  environmentalFactors: {
    lighting: number
    exposureTime: number
    imageQuality: number
  }
}

interface AstronautEmotionalProfile {
  astronautId: string
  name: string
  codename: string
  baselineEmotions: {
    positive: number
    negative: number
    neutral: number
  }
  currentZone: EmotionalZone
  lastReading: EmotionalReading | null
  trend: 'IMPROVING' | 'STABLE' | 'DECLINING'
}

interface AuraIndicators {
  lightingConditions: number
  exposureTime: number
  facialVariability: number
  algorithmSensitivity: number
  detectionAccuracy: number
  recordingFrequency: number
  dataSecurity: number
}

export function AuraModule() {
  const [currentPhase, setCurrentPhase] = useState<MissionPhase>('ESPACIO')
  const [emotionalReadings, setEmotionalReadings] = useState<EmotionalReading[]>([])
  const [astronautProfiles, setAstronautProfiles] = useState<AstronautEmotionalProfile[]>([])
  const [indicators, setIndicators] = useState<AuraIndicators>({
    lightingConditions: 85,
    exposureTime: 92,
    facialVariability: 78,
    algorithmSensitivity: 88,
    detectionAccuracy: 94,
    recordingFrequency: 96,
    dataSecurity: 100
  })

  // Simulación de datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular nuevas lecturas emocionales
      const newReading: EmotionalReading = {
        id: `reading_${Date.now()}`,
        astronautId: 'astronaut_1',
        emotion: ['POSITIVA', 'NEGATIVA', 'NEUTRA'][Math.floor(Math.random() * 3)] as EmotionType,
        confidence: Math.floor(Math.random() * 30) + 70,
        timestamp: new Date().toISOString(),
        facialFeatures: {
          eyeOpening: Math.floor(Math.random() * 40) + 60,
          focus: Math.floor(Math.random() * 40) + 60,
          concentration: Math.floor(Math.random() * 40) + 60,
          tensionExpressions: Math.floor(Math.random() * 40) + 20
        },
        environmentalFactors: {
          lighting: Math.floor(Math.random() * 20) + 80,
          exposureTime: Math.floor(Math.random() * 20) + 80,
          imageQuality: Math.floor(Math.random() * 20) + 80
        }
      }
      
      setEmotionalReadings(prev => [newReading, ...prev.slice(0, 9)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Datos de ejemplo de astronautas
  useEffect(() => {
    const profiles: AstronautEmotionalProfile[] = [
      {
        astronautId: 'astronaut_1',
        name: 'Luis Carlos Bautista',
        codename: 'LUIS-BAUTISTA',
        baselineEmotions: { positive: 45, negative: 15, neutral: 40 },
        currentZone: 'MOTIVADOR',
        lastReading: null,
        trend: 'STABLE'
      },
      {
        astronautId: 'astronaut_2',
        name: 'José Heiner Castro',
        codename: 'JOSE-HEINER',
        baselineEmotions: { positive: 50, negative: 10, neutral: 40 },
        currentZone: 'MOTIVADOR',
        lastReading: null,
        trend: 'IMPROVING'
      },
      {
        astronautId: 'astronaut_3',
        name: 'José Roger Gamonal',
        codename: 'JOSE-GAMONAL',
        baselineEmotions: { positive: 40, negative: 20, neutral: 40 },
        currentZone: 'ESTRESADO',
        lastReading: null,
        trend: 'DECLINING'
      },
      {
        astronautId: 'astronaut_4',
        name: 'Miguel Ángel López',
        codename: 'MIKE',
        baselineEmotions: { positive: 55, negative: 5, neutral: 40 },
        currentZone: 'MOTIVADOR',
        lastReading: null,
        trend: 'STABLE'
      },
      {
        astronautId: 'astronaut_5',
        name: 'Rodolfo Junior Miranda',
        codename: 'RODOLFO-SALDAÑA',
        baselineEmotions: { positive: 35, negative: 25, neutral: 40 },
        currentZone: 'ESTRESADO',
        lastReading: null,
        trend: 'DECLINING'
      },
      {
        astronautId: 'astronaut_6',
        name: 'Arturo Antonio Montejo',
        codename: 'ANTONIO-SOTO',
        baselineEmotions: { positive: 48, negative: 12, neutral: 40 },
        currentZone: 'MOTIVADOR',
        lastReading: null,
        trend: 'IMPROVING'
      }
    ]
    setAstronautProfiles(profiles)
  }, [])

  const getEmotionColor = (emotion: EmotionType) => {
    switch (emotion) {
      case 'POSITIVA': return 'text-green-400 bg-green-500/20'
      case 'NEGATIVA': return 'text-red-400 bg-red-500/20'
      case 'NEUTRA': return 'text-blue-400 bg-blue-500/20'
    }
  }

  const getZoneColor = (zone: EmotionalZone) => {
    switch (zone) {
      case 'MOTIVADOR': return 'text-green-400 bg-green-500/20'
      case 'ESTRESADO': return 'text-yellow-400 bg-yellow-500/20'
      case 'CRITICO': return 'text-red-400 bg-red-500/20'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'IMPROVING': return '📈'
      case 'STABLE': return '➡️'
      case 'DECLINING': return '📉'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header AURA */}
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              AURA - Asistente de Comprensión y Respuesta
            </h2>
            <p className="text-white/70 text-sm mt-1">
              Sistema de reconocimiento facial para monitoreo emocional de astronautas
            </p>
          </div>
          <div className="text-right">            <div className="text-xs text-white/60 mb-1">Fase Actual</div>
            <div className="text-lg font-semibold text-purple-400">
              {currentPhase === 'TIERRA' ? '🌍 TIERRA' : 
               currentPhase === 'ESPACIO' ? '🚀 ESPACIO' : '📊 RETROALIMENTACIÓN'}
            </div>
          </div>
        </div>
      </div>

      {/* Zona Emocional - Analogía Ricitos de Oro */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">🌡️</span>
          Zona Emocional de los Astronautas
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Zona Ricitos de Oro */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4">
            <h4 className="text-orange-400 font-semibold mb-3">🌡️ Zona Ricitos de Oro</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Límite Superior (Crítico)</span>
                <span className="text-red-400">100°C</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Zona Habitable</span>
                <span className="text-green-400">0-100°C</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Límite Inferior (Frío)</span>
                <span className="text-blue-400">0°C</span>
              </div>
            </div>
          </div>

          {/* Zona Emocional */}
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="text-purple-400 font-semibold mb-3">😊 Zona Emocional</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Límite Superior (Crítico)</span>
                <span className="text-red-400">Estrés/Ansiedad</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Zona Óptima</span>
                <span className="text-green-400">Motivador</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Límite Inferior (Ideal)</span>
                <span className="text-blue-400">Equilibrado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores de Gestión AURA */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Indicadores de Gestión del Sistema AURA
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(indicators).map(([key, value]) => (
            <div key={key} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-white font-semibold">{value}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Perfiles Emocionales de Astronautas */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">👨‍🚀</span>
          Perfiles Emocionales de Astronautas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {astronautProfiles.map((astronaut) => (
            <div key={astronaut.astronautId} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image 
                    src={`/astronauts/${astronaut.codename}.png`}
                    alt={astronaut.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                      if (nextElement) nextElement.style.display = 'flex'
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                    <span className="text-white font-bold text-sm">{astronaut.codename.split('-')[0]}</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-medium text-sm">{astronaut.name}</h5>
                  <p className="text-white/70 text-xs">{astronaut.codename}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-xs">Zona Emocional:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getZoneColor(astronaut.currentZone)}`}>
                    {astronaut.currentZone}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-xs">Tendencia:</span>
                  <span className="text-white text-sm">
                    {getTrendIcon(astronaut.trend)} {astronaut.trend}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-white/60">Línea Base Emocional:</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-green-500/20 text-green-400 text-center py-1 rounded">
                      +{astronaut.baselineEmotions.positive}%
                    </div>
                    <div className="bg-red-500/20 text-red-400 text-center py-1 rounded">
                      -{astronaut.baselineEmotions.negative}%
                    </div>
                    <div className="bg-blue-500/20 text-blue-400 text-center py-1 rounded">
                      ~{astronaut.baselineEmotions.neutral}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lecturas Emocionales en Tiempo Real */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">📡</span>
          Lecturas Emocionales en Tiempo Real
        </h3>
        
        <div className="space-y-3">
          {emotionalReadings.slice(0, 5).map((reading) => (
            <div key={reading.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">A1</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Luis Carlos Bautista</div>
                    <div className="text-white/70 text-xs">LUIS-BAUTISTA</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEmotionColor(reading.emotion)}`}>
                    {reading.emotion}
                  </span>
                  <div className="text-white/60 text-xs mt-1">
                    {new Date(reading.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/5 rounded p-2">
                  <div className="text-white/60 text-xs">Apertura Ocular</div>
                  <div className="text-white font-semibold text-sm">{reading.facialFeatures.eyeOpening}%</div>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <div className="text-white/60 text-xs">Focalización</div>
                  <div className="text-white font-semibold text-sm">{reading.facialFeatures.focus}%</div>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <div className="text-white/60 text-xs">Concentración</div>
                  <div className="text-white font-semibold text-sm">{reading.facialFeatures.concentration}%</div>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <div className="text-white/60 text-xs">Confianza</div>
                  <div className="text-white font-semibold text-sm">{reading.confidence}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas y Recomendaciones */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
        <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">🚨</span>
          Alertas del Sistema AURA
        </h3>
        <div className="space-y-2">
          <div className="bg-red-500/20 rounded-lg p-3">
            <p className="text-red-300 text-sm">
              ⚠️ José Roger Gamonal muestra tendencia emocional declinante. Recomendación: Intervención psicológica preventiva.
            </p>
            <p className="text-red-400 text-xs mt-1">Hace 5 minutos</p>
          </div>
          <div className="bg-yellow-500/20 rounded-lg p-3">
            <p className="text-yellow-300 text-sm">
              📊 Condiciones de iluminación subóptimas detectadas. Ajustar configuración de cámaras.
            </p>
            <p className="text-yellow-400 text-xs mt-1">Hace 12 minutos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
