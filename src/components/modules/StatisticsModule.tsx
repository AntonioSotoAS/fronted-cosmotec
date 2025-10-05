'use client'

import { useGetCrewStatisticsQuery, useGetAstronautStatisticsQuery, useGetAstronautProfilesQuery } from '@/lib/api/apiSlice'
import { useState } from 'react'

export function StatisticsModule() {
  const [selectedAstronautId, setSelectedAstronautId] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  
  const { data: crewStats, error: crewError, isLoading: crewLoading } = useGetCrewStatisticsQuery()
  const { data: astronauts } = useGetAstronautProfilesQuery()
  const { data: astronautStats, error: astronautError, isLoading: astronautLoading } = useGetAstronautStatisticsQuery(selectedAstronautId, {
    skip: !selectedAstronautId
  })

  // Filtrar astronautas por nombre
  const filteredAstronauts = astronauts?.filter(astronaut => 
    astronaut.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    astronaut.codename.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleAstronautSelect = (astronautId: string, fullName: string) => {
    setSelectedAstronautId(astronautId)
    setSearchTerm(fullName)
    setShowSuggestions(false)
  }

  if (crewLoading) {
    return (
      <div className="p-6 bg-black/20 rounded-xl">
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-white/10 rounded"></div>
            <div className="h-3 bg-white/10 rounded w-3/4"></div>
            <div className="h-3 bg-white/10 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (crewError) {
    return (
      <div className="p-6 bg-red-500/20 border border-red-500/30 rounded-xl">
        <h3 className="text-red-400 font-semibold mb-2">Error al cargar estadísticas</h3>
        <p className="text-red-300 text-sm">
          {crewError.toString()}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas Generales de la Tripulación */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Estadísticas Generales de la Tripulación
        </h3>
        
        {crewStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total de Astronautas */}
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="text-blue-400 text-sm font-medium mb-2">Total Astronautas</div>
              <div className="text-3xl font-bold text-white">{crewStats?.totalAstronauts ?? 0}</div>
              <div className="text-blue-300 text-xs mt-1">
                {crewStats?.activeAstronauts ?? 0} activos
              </div>
            </div>
            
            {/* Total de Registros */}
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="text-green-400 text-sm font-medium mb-2">Total Registros</div>
              <div className="text-3xl font-bold text-white">{(crewStats?.totalRecords ?? 0).toLocaleString()}</div>
              <div className="text-green-300 text-xs mt-1">
                Últimos 7 días
              </div>
            </div>
            
            {/* Estado Óptimo */}
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="text-green-400 text-sm font-medium mb-2">Estado Óptimo</div>
              <div className="text-3xl font-bold text-white">{(crewStats?.overallPercentages?.OPTIMO ?? 0).toFixed(1)}%</div>
              <div className="text-green-300 text-xs mt-1">
                {(crewStats?.overallStateCounts?.OPTIMO ?? 0).toLocaleString()} registros
              </div>
            </div>
            
            {/* Puntuación Promedio */}
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="text-purple-400 text-sm font-medium mb-2">Puntuación Promedio</div>
              <div className="text-3xl font-bold text-white">{(crewStats?.crewPerformance?.averageScore ?? 0).toFixed(1)}</div>
              <div className="text-purple-300 text-xs mt-1">
                Rendimiento general
              </div>
            </div>
          </div>
        )}
        
        {/* Distribución de Estados */}
        {crewStats && (
          <div className="mt-8">
            <h4 className="text-white font-semibold mb-4">Distribución de Estados</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-white">Óptimo</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${crewStats?.overallPercentages?.OPTIMO ?? 0}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold w-16 text-right">
                    {(crewStats?.overallPercentages?.OPTIMO ?? 0).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-white">Estresado</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${crewStats?.overallPercentages?.ESTRESADO ?? 0}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold w-16 text-right">
                    {(crewStats?.overallPercentages?.ESTRESADO ?? 0).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-white">Crítico</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${crewStats?.overallPercentages?.CRITICO ?? 0}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold w-16 text-right">
                    {(crewStats?.overallPercentages?.CRITICO ?? 0).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Mejor y Peor Rendimiento */}
        {crewStats && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">🏆 Mejor Rendimiento</h5>
              <p className="text-white">{crewStats?.crewPerformance?.bestPerformer ?? 'No disponible'}</p>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h5 className="text-red-400 font-semibold mb-2">⚠️ Necesita Atención</h5>
              <p className="text-white">{crewStats?.crewPerformance?.needsAttention ?? 'No disponible'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Estadísticas por Astronauta */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">👨‍🚀</span>
          Estadísticas por Astronauta
        </h3>
        
        <div className="mb-4 relative">
          <label className="block text-white/70 text-sm mb-2">Seleccionar Astronauta:</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowSuggestions(true)
                if (!e.target.value) {
                  setSelectedAstronautId('')
                }
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:border-white/30 focus:outline-none"
            />
            
            {/* Dropdown de sugerencias */}
            {showSuggestions && searchTerm && filteredAstronauts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-white/20 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                {filteredAstronauts.map((astronaut) => (
                  <div
                    key={astronaut.astronautId}
                    onClick={() => handleAstronautSelect(astronaut.astronautId, astronaut.fullName)}
                    className="px-4 py-3 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-b-0"
                  >
                    <div className="text-white font-medium">{astronaut.fullName}</div>
                    <div className="text-white/70 text-sm">{astronaut.codename}</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Mensaje cuando no hay resultados */}
            {showSuggestions && searchTerm && filteredAstronauts.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-white/20 rounded-lg shadow-xl z-50">
                <div className="px-4 py-3 text-white/70">
                  No se encontraron astronautas
                </div>
              </div>
            )}
          </div>
        </div>
        
        {selectedAstronautId && (
          <div className="mt-6">
            {astronautLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-white/20 rounded w-1/3 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded"></div>
                  <div className="h-3 bg-white/10 rounded w-2/3"></div>
                </div>
              </div>
            ) : astronautError ? (
              <div className="text-red-400">
                Error al cargar estadísticas del astronauta
              </div>
            ) : astronautStats ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {astronautStats?.codename ?? 'N/A'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{astronautStats?.fullName ?? 'Nombre no disponible'}</h4>
                    <p className="text-white/70">{astronautStats?.codename ?? 'N/A'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-3">Registros Totales</h5>
                    <div className="text-2xl font-bold text-white">
                      {(astronautStats?.statistics?.totalRecords ?? 0).toLocaleString()}
                    </div>
                    <div className="text-white/70 text-sm mt-1">
                      Últimos 7 días
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-3">Puntuación de Rendimiento</h5>
                    <div className="text-2xl font-bold text-white">
                      {(astronautStats?.statistics?.performanceScore ?? 0).toFixed(1)}
                    </div>
                    <div className="text-white/70 text-sm mt-1">
                      Puntuación general
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-3">Alertas Totales</h5>
                    <div className="text-2xl font-bold text-white">
                      {astronautStats?.statistics?.alertHistory?.totalAlerts ?? 0}
                    </div>
                    <div className="text-white/70 text-sm mt-1">
                      {astronautStats?.statistics?.alertHistory?.criticalAlerts ?? 0} críticas
                    </div>
                  </div>
                </div>
                
                {/* Métricas Promedio */}
                <div>
                  <h5 className="text-white font-semibold mb-4">Métricas Promedio</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/70 text-sm">Apertura Ocular</div>
                      <div className="text-white font-semibold">
                        {(astronautStats?.statistics?.averageMetrics?.eyeOpening ?? 0).toFixed(1)}%
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/70 text-sm">Expresiones de Tensión</div>
                      <div className="text-white font-semibold">
                        {(astronautStats?.statistics?.averageMetrics?.tensionExpressions ?? 0).toFixed(1)}%
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/70 text-sm">Palidez</div>
                      <div className="text-white font-semibold">
                        {(astronautStats?.statistics?.averageMetrics?.pallor ?? 0).toFixed(1)}%
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/70 text-sm">Focalización</div>
                      <div className="text-white font-semibold">
                        {(astronautStats?.statistics?.averageMetrics?.focus ?? 0).toFixed(1)}%
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/70 text-sm">Concentración</div>
                      <div className="text-white font-semibold">
                        {(astronautStats?.statistics?.averageMetrics?.concentration ?? 0).toFixed(1)}%
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/70 text-sm">EAR</div>
                      <div className="text-white font-semibold">
                        {(astronautStats?.statistics?.averageMetrics?.ear ?? 0).toFixed(3)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
