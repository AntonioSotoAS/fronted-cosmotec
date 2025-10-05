'use client'

import { useGetAstronautProfilesQuery, useGetAstronautStatusQuery, useGetCrewStatusQuery } from '@/lib/api/apiSlice'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export function MonitoringModule() {
  const [selectedAstronautId, setSelectedAstronautId] = useState<string>('')
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true)
  const [alertModal, setAlertModal] = useState<{
    show: boolean
    type: 'critical' | 'stressed' | null
    astronautName: string
    astronautId: string
  }>({
    show: false,
    type: null,
    astronautName: '',
    astronautId: ''
  })
  const [previousStates, setPreviousStates] = useState<Record<string, string>>({})
  
  const { data: astronauts, error: astronautsError, isLoading: astronautsLoading } = useGetAstronautProfilesQuery()
  const { data: crewStatus, error: crewError, isLoading: crewLoading } = useGetCrewStatusQuery()
  const { data: currentStatus, error: statusError, isLoading: statusLoading } = useGetAstronautStatusQuery(selectedAstronautId, {
    skip: !selectedAstronautId
  })

  // Función helper para obtener la foto del astronauta
  const getAstronautPhoto = (astronautId: string) => {
    console.log('🔍 Datos completos de astronauts:', astronauts)
    console.log('🔍 Buscando astronauta con ID:', astronautId)
    
    const astronaut = astronauts?.find(astronaut => {
      console.log('🔍 Comparando:', {
        buscando: astronautId,
        encontrado: astronaut.astronautId,
        coincide: astronaut.astronautId === astronautId
      })
      return astronaut.astronautId === astronautId
    })
    
    console.log('🔍 Resultado de búsqueda:', {
      astronautId,
      astronaut: astronaut?.fullName,
      photoUrl: astronaut?.photoUrl,
      totalAstronauts: astronauts?.length,
      encontrado: !!astronaut
    })
    
    return astronaut?.photoUrl
  }

  // Auto-refresh cada 1 minuto (60000ms)
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      // RTK Query manejará automáticamente la actualización
      console.log('🔄 Actualizando datos de monitoreo...')
    }, 60000) // 1 minuto

    return () => clearInterval(interval)
  }, [autoRefresh])

  // Función para reproducir sonido de alerta
  const playAlertSound = (type: 'critical' | 'stressed') => {
    if (typeof window !== 'undefined') {
      // Crear un sonido de alerta usando Web Audio API
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      if (type === 'critical') {
        // Sonido agudo para crítico
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
      } else {
        // Sonido más suave para estresado
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2)
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
      }
    }
  }

  // Detectar cambios de estado y mostrar alertas
  useEffect(() => {
    if (crewStatus?.crewMembers) {
      crewStatus.crewMembers.forEach(member => {
        const previousState = previousStates[member.astronautId]
        const currentState = member.status
        
        // Si el estado cambió
        if (previousState && previousState !== currentState) {
          console.log(`🚨 Cambio de estado detectado: ${member.name} de ${previousState} a ${currentState}`)
          
          if (currentState === 'CRITICO') {
            setAlertModal({
              show: true,
              type: 'critical',
              astronautName: member.name,
              astronautId: member.astronautId
            })
            playAlertSound('critical')
          } else if (currentState === 'ESTRESADO') {
            setAlertModal({
              show: true,
              type: 'stressed',
              astronautName: member.name,
              astronautId: member.astronautId
            })
            playAlertSound('stressed')
          }
        }
        
        // Actualizar el estado anterior
        setPreviousStates(prev => ({
          ...prev,
          [member.astronautId]: currentState
        }))
      })
    }
  }, [crewStatus?.crewMembers, previousStates])

  // Detectar estados críticos actuales (no solo cambios)
  useEffect(() => {
    if (crewStatus?.crewMembers) {
      crewStatus.crewMembers.forEach(member => {
        // Si hay un estado crítico actual, sonar inmediatamente
        if (member.status === 'CRITICO') {
          console.log(`🚨 Estado crítico detectado: ${member.name} está en estado CRÍTICO`)
          // Solo mostrar alerta si no hay una ya activa
          if (!alertModal.show) {
            setAlertModal({
              show: true,
              type: 'critical',
              astronautName: member.name,
              astronautId: member.astronautId
            })
            playAlertSound('critical')
          }
        }
      })
    }
  }, [crewStatus?.crewMembers, alertModal.show])

  // Debug: Log de datos cuando cambian
  useEffect(() => {
    console.log('🔍 Datos de crewStatus:', crewStatus)
    console.log('🔍 Miembros de la tripulación:', crewStatus?.crewMembers)
  }, [crewStatus])

  if (astronautsLoading || crewLoading) {
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

  if (astronautsError || crewError) {
    return (
      <div className="p-6 bg-red-500/20 border border-red-500/30 rounded-xl">
        <h3 className="text-red-400 font-semibold mb-2">Error al cargar datos de monitoreo</h3>
        <p className="text-red-300 text-sm">
          {astronautsError?.toString() || crewError?.toString()}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controles de Monitoreo */}
      <div className="bg-black/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-lg font-semibold flex items-center gap-2">
            <span className="text-2xl">📡</span>
            Monitoreo en Tiempo Real
          </h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 text-red-500 bg-white/10 border-white/20 rounded focus:ring-red-500"
              />
              <span className="text-white/70 text-sm">Auto-refresh (cada 1 min)</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">EN VIVO</span>
            </div>
          </div>
        </div>

        {/* Estado de la Tripulación */}
        {crewStatus && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="text-blue-400 text-sm font-medium mb-2">Total Miembros</div>
              <div className="text-2xl font-bold text-white">{crewStatus.totalMembers}</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="text-green-400 text-sm font-medium mb-2">Óptimo</div>
              <div className="text-2xl font-bold text-white">{crewStatus.optimalCount}</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="text-yellow-400 text-sm font-medium mb-2">Estresado</div>
              <div className="text-2xl font-bold text-white">{crewStatus.stressedCount}</div>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg p-4">
              <div className="text-red-400 text-sm font-medium mb-2">Crítico</div>
              <div className="text-2xl font-bold text-white">{crewStatus.criticalCount}</div>
            </div>
          </div>
        )}

        {/* Lista de Miembros de la Tripulación */}
        {crewStatus && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">Estado Actual de la Tripulación</h4>
              <div className="text-xs text-white/60">
                Última actualización: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crewStatus.crewMembers.map((member, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedAstronautId === member.astronautId 
                      ? 'bg-red-500/20 border-red-500/50' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedAstronautId(member.astronautId)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                      {(() => {
                        const photoUrl = getAstronautPhoto(member.astronautId)
                        return photoUrl ? (
                          <Image 
                            src={photoUrl} 
                            alt={member.name}
                            width={40}
                            height={40}
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
                      <div className="w-full h-full bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center" style={{ display: getAstronautPhoto(member.astronautId) ? 'none' : 'flex' }}>
                        <span className="text-white font-bold text-sm">
                          {member.codename}
                        </span>
                      </div>
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
                        {new Date(member.lastUpdate).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Estado Detallado del Astronauta Seleccionado */}
      {selectedAstronautId && (
        <div className="bg-black/20 rounded-xl p-6">
          <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="text-2xl">👨‍🚀</span>
            Estado Detallado
          </h3>
          
          {statusLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-white/20 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded"></div>
                <div className="h-3 bg-white/10 rounded w-2/3"></div>
              </div>
            </div>
          ) : statusError ? (
            <div className="text-red-400">
              Error al cargar el estado del astronauta
            </div>
          ) : currentStatus ? (
            <div className="space-y-6">
              {/* Información del Astronauta */}
              <div className="flex items-start gap-6">
                {/* Foto grande del astronauta */}
                <div className="flex flex-col items-center">
                  <div className={`${currentStatus.overallState === 'ESTRESADO' || currentStatus.overallState === 'CRITICO' ? 'w-40 h-40' : 'w-32 h-32'} rounded-2xl overflow-hidden flex items-center justify-center mb-4 border-4 border-white/20 shadow-2xl`}>
                    {(() => {
                      const photoUrl = getAstronautPhoto(selectedAstronautId)
                      return photoUrl ? (
                        <Image 
                          src={photoUrl} 
                          alt={currentStatus.astronautName}
                          width={currentStatus.overallState === 'ESTRESADO' || currentStatus.overallState === 'CRITICO' ? 160 : 128}
                          height={currentStatus.overallState === 'ESTRESADO' || currentStatus.overallState === 'CRITICO' ? 160 : 128}
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
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center" style={{ display: getAstronautPhoto(selectedAstronautId) ? 'none' : 'flex' }}>
                      <span className="text-white font-bold text-4xl">
                        {currentStatus.codename}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-sm">Identificación del astronauta</p>
                  </div>
                </div>
                
                {/* Información del astronauta */}
                <div className="flex-1">
                  <div>
                    <h4 className="text-white font-semibold text-2xl mb-2">{currentStatus.astronautName}</h4>
                    <p className="text-white/70 text-lg mb-1">{currentStatus.codename}</p>
                    <p className="text-white/60 text-sm">
                      {new Date(currentStatus.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Estado General */}
              <div className="flex items-center justify-center mb-6">
                <div className={`${currentStatus.overallState === 'ESTRESADO' || currentStatus.overallState === 'CRITICO' ? 'w-40 h-40' : 'w-32 h-32'} rounded-full flex items-center justify-center border-4 shadow-2xl ${
                  currentStatus.overallState === 'OPTIMO' ? 'border-green-400 bg-green-500/20' :
                  currentStatus.overallState === 'ESTRESADO' ? 'border-yellow-400 bg-yellow-500/20' :
                  'border-red-400 bg-red-500/20'
                }`}>
                  <span className={`${currentStatus.overallState === 'ESTRESADO' || currentStatus.overallState === 'CRITICO' ? 'text-3xl' : 'text-2xl'} font-bold ${
                    currentStatus.overallState === 'OPTIMO' ? 'text-green-400' :
                    currentStatus.overallState === 'ESTRESADO' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {currentStatus.overallState === 'ESTRESADO' ? 'ESTRÉS' : currentStatus.overallState}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3">Estado General</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">Estado:</span>
                      <span className={`font-semibold ${
                        currentStatus.overallState === 'OPTIMO' ? 'text-green-400' :
                        currentStatus.overallState === 'ESTRESADO' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {currentStatus.overallState}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Nivel de Alerta:</span>
                      <span className={`font-semibold ${
                        currentStatus.alertLevel === 'NORMAL' ? 'text-green-400' :
                        currentStatus.alertLevel === 'WARNING' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {currentStatus.alertLevel || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Rostro Detectado:</span>
                      <span className={`font-semibold ${
                        currentStatus.faceDetected ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {currentStatus.faceDetected ? 'SÍ' : 'NO'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3">Indicadores Faciales</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-white/60 text-xs">Apertura Ocular</div>
                      <div className="text-white font-semibold">
                        {currentStatus.eyeOpening ? Math.round(currentStatus.eyeOpening) + '%' : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/60 text-xs">Tensión</div>
                      <div className="text-white font-semibold">
                        {currentStatus.tensionExpressions ? Math.round(currentStatus.tensionExpressions) + '%' : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/60 text-xs">Focalización</div>
                      <div className="text-white font-semibold">
                        {currentStatus.focus ? Math.round(currentStatus.focus) + '%' : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/60 text-xs">Concentración</div>
                      <div className="text-white font-semibold">
                        {currentStatus.concentration ? Math.round(currentStatus.concentration) + '%' : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Alertas Activas */}
              {currentStatus.activeAlerts && currentStatus.activeAlerts.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h5 className="text-red-400 font-semibold mb-3">🚨 Alertas Activas</h5>
                  <div className="space-y-2">
                    {currentStatus.activeAlerts.map((alert, index) => (
                      <div key={index} className="bg-red-500/20 rounded-lg p-3">
                        <p className="text-red-300">{alert}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Acciones Recomendadas */}
              {currentStatus.recommendedActions && currentStatus.recommendedActions.length > 0 && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="text-blue-400 font-semibold mb-3">💡 Acciones Recomendadas</h5>
                  <div className="space-y-2">
                    {currentStatus.recommendedActions.map((action, index) => (
                      <div key={index} className="bg-blue-500/20 rounded-lg p-3">
                        <p className="text-blue-300">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Modal de Alerta */}
      {alertModal.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`max-w-md w-full mx-4 rounded-2xl border-2 shadow-2xl ${
            alertModal.type === 'critical' 
              ? 'bg-red-500/20 border-red-500/50' 
              : 'bg-yellow-500/20 border-yellow-500/50'
          }`}>
            <div className="p-6">
              {/* Header del modal */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  alertModal.type === 'critical' 
                    ? 'bg-red-500/30' 
                    : 'bg-yellow-500/30'
                }`}>
                  <span className="text-2xl">
                    {alertModal.type === 'critical' ? '🚨' : '⚠️'}
                  </span>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${
                    alertModal.type === 'critical' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {alertModal.type === 'critical' ? 'ALERTA CRÍTICA' : 'ALERTA DE ESTRÉS'}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Astronauta:</h4>
                  <p className="text-white text-lg">{alertModal.astronautName}</p>
                </div>

                {alertModal.type === 'critical' ? (
                  <div className="space-y-3">
                    <div className="bg-red-500/20 rounded-lg p-4">
                      <h5 className="text-red-400 font-semibold mb-2">🚨 Estado Crítico Detectado</h5>
                      <p className="text-red-300 text-sm">
                        El astronauta {alertModal.astronautName} ha entrado en estado crítico. 
                        Se requiere intervención médica inmediata.
                      </p>
                    </div>
                    
                    <div className="bg-red-500/10 rounded-lg p-4">
                      <h5 className="text-red-400 font-semibold mb-2">Acciones Recomendadas:</h5>
                      <ul className="text-red-300 text-sm space-y-1">
                        <li>• Contactar al equipo médico de emergencia</li>
                        <li>• Activar protocolo de emergencia</li>
                        <li>• Monitorear constantemente los signos vitales</li>
                        <li>• Preparar para posible evacuación</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-yellow-500/20 rounded-lg p-4">
                      <h5 className="text-yellow-400 font-semibold mb-2">⚠️ Estrés Detectado</h5>
                      <p className="text-yellow-300 text-sm">
                        El astronauta {alertModal.astronautName} muestra signos de estrés. 
                        Se recomienda intervención preventiva.
                      </p>
                    </div>
                    
                    <div className="bg-yellow-500/10 rounded-lg p-4">
                      <h5 className="text-yellow-400 font-semibold mb-2">Recomendaciones:</h5>
                      <ul className="text-yellow-300 text-sm space-y-1">
                        <li>• Hablar con el astronauta para calmarlo</li>
                        <li>• Sugerir técnicas de relajación</li>
                        <li>• Revisar la carga de trabajo</li>
                        <li>• Considerar descanso adicional</li>
                        <li>• Monitorear de cerca su estado</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setAlertModal({ show: false, type: null, astronautName: '', astronautId: '' })}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      alertModal.type === 'critical'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    }`}
                  >
                    Entendido
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedAstronautId(alertModal.astronautId)
                      setAlertModal({ show: false, type: null, astronautName: '', astronautId: '' })
                    }}
                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
