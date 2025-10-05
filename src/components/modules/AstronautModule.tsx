'use client'

import { useGetAstronautProfilesQuery, useGetAstronautStatusQuery } from '@/lib/api/apiSlice'
import { useState } from 'react'
import Image from 'next/image'

export function AstronautModule() {
  const [selectedAstronautId, setSelectedAstronautId] = useState<string>('')
  
  const { data: astronauts, error: astronautsError, isLoading: astronautsLoading } = useGetAstronautProfilesQuery()
  const { data: astronautStatus, error: statusError, isLoading: statusLoading } = useGetAstronautStatusQuery(selectedAstronautId, {
    skip: !selectedAstronautId
  })

  if (astronautsLoading) {
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

  if (astronautsError) {
    // Extract error information more robustly
    let errorMessage = 'Unknown error'
    let errorDetails = ''
    
    if (astronautsError && typeof astronautsError === 'object') {
      if ('data' in astronautsError && astronautsError.data) {
        errorMessage = `Error ${astronautsError.status || 'unknown'}: Bad Request`
        errorDetails = JSON.stringify(astronautsError.data, null, 2)
      } else if ('message' in astronautsError) {
        errorMessage = astronautsError.message || 'Unknown error'
      } else {
        errorMessage = JSON.stringify(astronautsError, null, 2)
      }
    } else if (typeof astronautsError === 'string') {
      errorMessage = astronautsError
    }
    
    return (
      <div className="p-6 bg-red-500/20 border border-red-500/30 rounded-xl">
        <h3 className="text-red-400 font-semibold mb-2">Error loading astronauts</h3>
        <p className="text-red-300 text-sm mb-2">
          {errorMessage}
        </p>
        {errorDetails && (
          <details className="mt-2">
            <summary className="text-red-300 text-xs cursor-pointer">View error details</summary>
            <pre className="text-red-300 text-xs mt-2 bg-red-900/20 p-2 rounded overflow-auto">
              {errorDetails}
            </pre>
          </details>
        )}
        <p className="text-red-300 text-xs mt-2">
          Make sure your API is running on localhost:5000
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Estado del Astronauta Seleccionado - ARRIBA */}
      {selectedAstronautId && (
        <div className="bg-black/20 rounded-xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Current Status
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
          ) : astronautStatus ? (
            <div className="space-y-6">
              {/* Foto grande del astronauta seleccionado */}
              <div className="flex items-start gap-6">
                {/* Foto grande del astronauta */}
                <div className="flex flex-col items-center">
                  <div className={`${astronautStatus.overallState === 'ESTRESADO' || astronautStatus.overallState === 'CRITICO' ? 'w-40 h-40' : 'w-32 h-32'} rounded-2xl overflow-hidden flex items-center justify-center mb-4 border-4 border-white/20 shadow-2xl`}>
                    {(() => {
                      const selectedAstronaut = astronauts?.find(astronaut => astronaut.astronautId === selectedAstronautId)
                      const photoUrl = selectedAstronaut?.photoUrl
                      return photoUrl ? (
                        <Image 
                          src={photoUrl} 
                          alt={astronautStatus.astronautName}
                          width={astronautStatus.overallState === 'ESTRESADO' || astronautStatus.overallState === 'CRITICO' ? 160 : 128}
                          height={astronautStatus.overallState === 'ESTRESADO' || astronautStatus.overallState === 'CRITICO' ? 160 : 128}
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
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center" style={{ display: astronauts?.find(astronaut => astronaut.astronautId === selectedAstronautId)?.photoUrl ? 'none' : 'flex' }}>
                      <span className="text-white font-bold text-4xl">
                        {astronautStatus.codename}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-sm">Astronaut identification</p>
                  </div>
                </div>
                
                {/* Información del astronauta */}
                <div className="flex-1">
                  <div>
                    <h4 className="text-white font-semibold text-2xl mb-2">{astronautStatus.astronautName}</h4>
                    <p className="text-white/70 text-lg mb-1">{astronautStatus.codename}</p>
                    <p className="text-white/60 text-sm">
                      {new Date(astronautStatus.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* General Status */}
              <div className="flex items-center justify-center mb-6">
                <div className={`${astronautStatus.overallState === 'ESTRESADO' || astronautStatus.overallState === 'CRITICO' ? 'w-40 h-40' : 'w-32 h-32'} rounded-full flex items-center justify-center border-4 shadow-2xl ${
                  astronautStatus.overallState === 'OPTIMO' ? 'border-green-400 bg-green-500/20' :
                  astronautStatus.overallState === 'ESTRESADO' ? 'border-yellow-400 bg-yellow-500/20' :
                  'border-red-400 bg-red-500/20'
                }`}>
                  <span className={`${astronautStatus.overallState === 'ESTRESADO' || astronautStatus.overallState === 'CRITICO' ? 'text-3xl' : 'text-2xl'} font-bold ${
                    astronautStatus.overallState === 'OPTIMO' ? 'text-green-400' :
                    astronautStatus.overallState === 'ESTRESADO' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {astronautStatus.overallState === 'ESTRESADO' ? 'ESTRÉS' : astronautStatus.overallState}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-white/60 mb-1">General Status</div>
                  <div className={`font-semibold ${
                    astronautStatus.overallState === 'OPTIMO' ? 'text-green-400' :
                    astronautStatus.overallState === 'ESTRESADO' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {astronautStatus.overallState}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-white/60 mb-1">Eye Opening</div>
                  <div className="text-white font-semibold">
                    {astronautStatus.eyeOpening ? Math.round(astronautStatus.eyeOpening) + '%' : 'N/A'}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-white/60 mb-1">Tension Expressions</div>
                  <div className="text-white font-semibold">
                    {astronautStatus.tensionExpressions ? Math.round(astronautStatus.tensionExpressions) + '%' : 'N/A'}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-white/60 mb-1">Pallor</div>
                  <div className="text-white font-semibold">
                    {astronautStatus.pallor ? Math.round(astronautStatus.pallor) + '%' : 'N/A'}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-white/60 mb-1">Focus</div>
                  <div className="text-white font-semibold">
                    {astronautStatus.focus ? Math.round(astronautStatus.focus) + '%' : 'N/A'}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-white/60 mb-1">Concentration</div>
                  <div className="text-white font-semibold">
                    {astronautStatus.concentration ? Math.round(astronautStatus.concentration) + '%' : 'N/A'}
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-white/60">
                Last update: {new Date(astronautStatus.timestamp).toLocaleString()}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Lista de Astronautas - ABAJO */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">👨‍🚀</span>
          Astronaut Profiles
        </h3>
        
        {astronauts && astronauts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {astronauts.map((astronaut) => (
              <div 
                key={astronaut.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedAstronautId === astronaut.astronautId 
                    ? 'bg-red-500/20 border-red-500/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setSelectedAstronautId(astronaut.astronautId)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                    {astronaut.photoUrl ? (
                      <Image 
                        src={astronaut.photoUrl} 
                        alt={astronaut.fullName}
                        width={48}
                        height={48}
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
                    ) : null}
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center" style={{ display: astronaut.photoUrl ? 'none' : 'flex' }}>
                      <span className="text-white font-bold text-sm">
                        {astronaut.initials}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{astronaut.fullName}</h4>
                    <p className="text-white/70 text-sm">{astronaut.codename}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Status:</span>
                    <span className={`font-semibold ${
                      astronaut.currentStatus === 'OPTIMO' ? 'text-green-400' :
                      astronaut.currentStatus === 'ESTRESADO' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {astronaut.currentStatus}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Monitoring:</span>
                    <span className={`font-semibold ${
                      astronaut.isMonitoring ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {astronaut.isMonitoring ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Last update:</span>
                    <span className="text-white/70 text-xs">
                      {astronaut.statusLastUpdated ? new Date(astronaut.statusLastUpdated).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/70">No astronauts available</p>
        )}
      </div>
    </div>
  )
}
