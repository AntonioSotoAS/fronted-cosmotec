'use client'

import { useGetDashboardQuery, useGetAstronautProfilesQuery } from '@/lib/api/apiSlice'
import Image from 'next/image'

export function DashboardModule() {
  const { data: dashboard, error, isLoading } = useGetDashboardQuery()
  const { data: astronauts } = useGetAstronautProfilesQuery()

  // Función helper para obtener la foto del astronauta
  const getAstronautPhoto = (astronautId: string) => {
    const astronaut = astronauts?.find(astronaut => astronaut.astronautId === astronautId)
    return astronaut?.photoUrl
  }

  if (isLoading) {
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

  if (error) {
    return (
      <div className="p-6 bg-red-500/20 border border-red-500/30 rounded-xl">
        <h3 className="text-red-400 font-semibold mb-2">Error al cargar dashboard</h3>
        <p className="text-red-300 text-sm mb-4">
          {error.toString()}
        </p>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <h4 className="text-red-400 font-semibold mb-2">Posibles soluciones:</h4>
          <ul className="text-red-300 text-sm space-y-1">
            <li>• Verifica que tu API esté corriendo en localhost:5000</li>
            <li>• Asegúrate de que el endpoint /astronauts/dashboard exista</li>
            <li>• Revisa la consola del navegador para más detalles</li>
            <li>• Usa la pestaña &quot;API Test&quot; para verificar endpoints disponibles</li>
          </ul>
        </div>
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className="p-6 bg-black/20 rounded-xl">
        <p className="text-white/70">No hay datos de dashboard disponibles</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Estado de la Tripulación */}
      <div className="bg-black/20 rounded-xl p-6">
        
        {/* Lista de Miembros de la Tripulación */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Miembros de la Tripulación</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboard.crewStatus?.crewMembers?.map((member, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {member.codename}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">{member.name}</h5>
                    <p className="text-white/70 text-sm">{member.codename}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Estado:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      member.status === 'OPTIMO' ? 'bg-green-500/20 text-green-400' :
                      member.status === 'ESTRESADO' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Última actualización:</span>
                    <span className="text-white/70">
                      {new Date(member.lastUpdate).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estadísticas de la Tripulación */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Estadísticas de la Tripulación
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-4">
            <div className="text-blue-400 text-sm font-medium mb-2">Total Registros</div>
            <div className="text-3xl font-bold text-white">{(dashboard.crewStatistics?.totalRecords ?? 0).toLocaleString()}</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-4">
            <div className="text-purple-400 text-sm font-medium mb-2">Astronautas Únicos</div>
            <div className="text-3xl font-bold text-white">{dashboard.crewStatistics?.uniqueAstronauts ?? 0}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-4">
            <div className="text-green-400 text-sm font-medium mb-2">Estado Óptimo</div>
            <div className="text-3xl font-bold text-white">{(dashboard.crewStatistics?.stateCounts?.OPTIMO ?? 0).toLocaleString()}</div>
          </div>
        </div>
        
        {/* Distribución de Estados */}
        <div>
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
                    style={{ 
                      width: `${dashboard.crewStatistics?.totalRecords ? (dashboard.crewStatistics.stateCounts?.OPTIMO ?? 0) / dashboard.crewStatistics.totalRecords * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <span className="text-white font-semibold w-16 text-right">
                  {dashboard.crewStatistics?.totalRecords ? (((dashboard.crewStatistics.stateCounts?.OPTIMO ?? 0) / dashboard.crewStatistics.totalRecords) * 100).toFixed(1) : '0.0'}%
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
                    style={{ 
                      width: `${dashboard.crewStatistics?.totalRecords ? (dashboard.crewStatistics.stateCounts?.ESTRESADO ?? 0) / dashboard.crewStatistics.totalRecords * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <span className="text-white font-semibold w-16 text-right">
                  {dashboard.crewStatistics?.totalRecords ? (((dashboard.crewStatistics.stateCounts?.ESTRESADO ?? 0) / dashboard.crewStatistics.totalRecords) * 100).toFixed(1) : '0.0'}%
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
                    style={{ 
                      width: `${dashboard.crewStatistics?.totalRecords ? (dashboard.crewStatistics.stateCounts?.CRITICO ?? 0) / dashboard.crewStatistics.totalRecords * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <span className="text-white font-semibold w-16 text-right">
                  {dashboard.crewStatistics?.totalRecords ? (((dashboard.crewStatistics.stateCounts?.CRITICO ?? 0) / dashboard.crewStatistics.totalRecords) * 100).toFixed(1) : '0.0'}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estados Actuales de Astronautas */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">👨‍🚀</span>
          Estados Actuales de Astronautas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboard.astronautStatuses?.map((astronaut, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${astronaut.currentStatus?.overallState === 'ESTRESADO' || astronaut.currentStatus?.overallState === 'CRITICO' ? 'w-16 h-16' : 'w-12 h-12'} rounded-lg overflow-hidden flex items-center justify-center`}>
                  {(() => {
                    const photoUrl = getAstronautPhoto(astronaut.astronautId)
                    return photoUrl ? (
                      <Image 
                        src={photoUrl} 
                        alt={astronaut.fullName}
                        width={astronaut.currentStatus?.overallState === 'ESTRESADO' || astronaut.currentStatus?.overallState === 'CRITICO' ? 64 : 48}
                        height={astronaut.currentStatus?.overallState === 'ESTRESADO' || astronaut.currentStatus?.overallState === 'CRITICO' ? 64 : 48}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Si la imagen falla, mostrar las iniciales como fallback
                          e.currentTarget.style.display = 'none'
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                          if (nextElement) {
                            nextElement.style.display = 'flex'
                          }
                        }}
                      />
                    ) : null
                  })()}
                  <div className="w-full h-full bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center" style={{ display: getAstronautPhoto(astronaut.astronautId) ? 'none' : 'flex' }}>
                    <span className="text-white font-bold text-sm">
                      {astronaut.codename}
                    </span>
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-medium">{astronaut.fullName}</h5>
                  <p className="text-white/70 text-sm">{astronaut.codename}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Estado General:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    astronaut.currentStatus?.overallState === 'OPTIMO' ? 'bg-green-500/20 text-green-400' :
                    astronaut.currentStatus?.overallState === 'ESTRESADO' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {astronaut.currentStatus?.overallState === 'ESTRESADO' ? 'ESTRÉS' : astronaut.currentStatus?.overallState ?? 'DESCONOCIDO'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded p-2">
                    <div className="text-white/60 text-xs">Apertura Ocular</div>
                    <div className="text-white font-semibold text-sm">
                      {astronaut.currentStatus?.eyeOpening ? Math.round(astronaut.currentStatus.eyeOpening) + '%' : 'N/A'}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <div className="text-white/60 text-xs">Focalización</div>
                    <div className="text-white font-semibold text-sm">
                      {astronaut.currentStatus?.focus ? Math.round(astronaut.currentStatus.focus) + '%' : 'N/A'}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <div className="text-white/60 text-xs">Concentración</div>
                    <div className="text-white font-semibold text-sm">
                      {astronaut.currentStatus?.concentration ? Math.round(astronaut.currentStatus.concentration) + '%' : 'N/A'}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <div className="text-white/60 text-xs">Tensión</div>
                    <div className="text-white font-semibold text-sm">
                      {astronaut.currentStatus?.tensionExpressions ? Math.round(astronaut.currentStatus.tensionExpressions) + '%' : 'N/A'}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-white/60">
                  {astronaut.currentStatus?.timestamp ? new Date(astronaut.currentStatus.timestamp).toLocaleString() : 'Sin timestamp'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas Activas */}
      {dashboard.activeAlerts && dashboard.activeAlerts.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🚨</span>
            Alertas Activas
          </h3>
          <div className="space-y-2">
            {dashboard.activeAlerts.map((alert, index) => (
              <div key={index} className="bg-red-500/20 rounded-lg p-3">
                <p className="text-red-300">{alert.description ?? 'Descripción no disponible'}</p>
                <p className="text-red-400 text-xs mt-1">{alert.timestamp ?? 'Sin timestamp'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
