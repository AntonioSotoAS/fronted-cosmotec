'use client'

import { 
  useGetSeedsStatusQuery, 
  useRunAllSeedsMutation, 
  useRunProfilesSeedsMutation, 
  useRunMonitoringSeedsMutation,
  useGetTestEndpointQuery 
} from '@/lib/api/apiSlice'
import { useState } from 'react'

export function SeedsModule() {
  const [selectedSeed, setSelectedSeed] = useState<string>('')
  
  const { data: testEndpoint, error: testError, isLoading: testLoading } = useGetTestEndpointQuery()
  const { data: seedsStatus, error: statusError, isLoading: statusLoading } = useGetSeedsStatusQuery()
  
  const [runAllSeeds, { isLoading: allSeedsLoading }] = useRunAllSeedsMutation()
  const [runProfilesSeeds, { isLoading: profilesLoading }] = useRunProfilesSeedsMutation()
  const [runMonitoringSeeds, { isLoading: monitoringLoading }] = useRunMonitoringSeedsMutation()

  const handleRunSeeds = async (seedType: string) => {
    try {
      setSelectedSeed(seedType)
      
      switch (seedType) {
        case 'all':
          await runAllSeeds().unwrap()
          break
        case 'profiles':
          await runProfilesSeeds().unwrap()
          break
        case 'monitoring':
          await runMonitoringSeeds().unwrap()
          break
      }
    } catch (error) {
      console.error('Error ejecutando seeds:', error)
    } finally {
      setSelectedSeed('')
    }
  }

  if (testLoading || statusLoading) {
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

  if (testError || statusError) {
    return (
      <div className="p-6 bg-red-500/20 border border-red-500/30 rounded-xl">
        <h3 className="text-red-400 font-semibold mb-2">Error al conectar con la API</h3>
        <p className="text-red-300 text-sm mb-4">
          {testError?.toString() || statusError?.toString()}
        </p>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <h4 className="text-red-400 font-semibold mb-2">Posibles soluciones:</h4>
          <ul className="text-red-300 text-sm space-y-1">
            <li>• Verifica que tu API esté corriendo en localhost:5000</li>
            <li>• Asegúrate de que el servidor esté iniciado</li>
            <li>• Revisa la consola del navegador para más detalles</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Estado de la API */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">🔧</span>
          Estado de la API
        </h3>
        
        {testEndpoint && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">API CONECTADA</span>
            </div>
            <p className="text-green-300 text-sm">{testEndpoint.message}</p>
            <p className="text-green-300 text-xs mt-1">
              Timestamp: {new Date(testEndpoint.timestamp).toLocaleString()}
            </p>
          </div>
        )}

        {seedsStatus && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">Estado de Seeds</h4>
            <p className="text-blue-300 text-sm">{seedsStatus.message}</p>
            <p className="text-blue-300 text-xs mt-1">
              Última actualización: {new Date(seedsStatus.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Ejecutar Seeds */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          Ejecutar Seeds
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ejecutar Todos los Seeds */}
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-green-400 font-semibold mb-3">Todos los Seeds</h4>
            <p className="text-white/70 text-sm mb-4">
              Ejecuta todos los seeds: perfiles, monitoreo y datos de prueba
            </p>
            <button
              onClick={() => handleRunSeeds('all')}
              disabled={allSeedsLoading || selectedSeed === 'all'}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {allSeedsLoading || selectedSeed === 'all' ? 'Ejecutando...' : 'Ejecutar Todos'}
            </button>
          </div>

          {/* Seeds de Perfiles */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-3">Seeds de Perfiles</h4>
            <p className="text-white/70 text-sm mb-4">
              Crea los perfiles de los 6 astronautas con sus métricas base
            </p>
            <button
              onClick={() => handleRunSeeds('profiles')}
              disabled={profilesLoading || selectedSeed === 'profiles'}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {profilesLoading || selectedSeed === 'profiles' ? 'Ejecutando...' : 'Ejecutar Perfiles'}
            </button>
          </div>

          {/* Seeds de Monitoreo */}
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="text-purple-400 font-semibold mb-3">Seeds de Monitoreo</h4>
            <p className="text-white/70 text-sm mb-4">
              Genera datos de monitoreo históricos y estado de tripulación
            </p>
            <button
              onClick={() => handleRunSeeds('monitoring')}
              disabled={monitoringLoading || selectedSeed === 'monitoring'}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {monitoringLoading || selectedSeed === 'monitoring' ? 'Ejecutando...' : 'Ejecutar Monitoreo'}
            </button>
          </div>
        </div>

        {/* Información sobre Seeds */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-2">💡 Información sobre Seeds</h4>
          <div className="text-yellow-300 text-sm space-y-2">
            <p><strong>Seeds de Perfiles:</strong> Crea 6 astronautas con sus métricas base y umbrales</p>
            <p><strong>Seeds de Monitoreo:</strong> Genera datos históricos de los últimos 7 días</p>
            <p><strong>Todos los Seeds:</strong> Ejecuta ambos tipos de seeds en secuencia</p>
            <p className="text-yellow-400 font-semibold mt-2">
              ⚠️ Los seeds pueden tardar unos segundos en completarse
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Astronautas */}
      {testEndpoint?.data?.astronauts && (
        <div className="bg-black/20 rounded-xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">👨‍🚀</span>
            Astronautas Disponibles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testEndpoint.data.astronauts.map((astronaut: string, index: number) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {astronaut.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">{astronaut}</h5>
                    <p className="text-white/70 text-sm">Astronauta</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
