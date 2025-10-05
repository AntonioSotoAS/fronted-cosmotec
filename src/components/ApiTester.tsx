'use client'

import { useState } from 'react'

interface TestResult {
  status?: number
  statusText?: string
  data?: unknown
  success?: boolean
  error?: string
}

export function ApiTester() {
  const [results, setResults] = useState<Record<string, TestResult>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const endpoints = [
    { name: 'Test Endpoint', url: '/astronauts/test' },
    { name: 'Astronaut Profiles', url: '/astronauts/profiles' },
    { name: 'Dashboard', url: '/astronauts/dashboard' },
    { name: 'Crew Statistics', url: '/astronauts/crew/statistics' },
    { name: 'Crew Status', url: '/astronauts/crew-status/current' },
    { name: 'Active Alerts', url: '/astronauts/alerts/active' },
    { name: 'Seeds Status', url: '/astronauts/seeds/status' },
    { name: 'Root', url: '/' },
    { name: 'Health', url: '/health' },
  ]

  const testEndpoint = async (endpoint: { name: string; url: string }) => {
    setLoading(prev => ({ ...prev, [endpoint.name]: true }))
    
    const fullUrl = `http://localhost:5000${endpoint.url}`
    
    console.log('🧪 Petición ApiTester iniciada:', {
      endpoint: endpoint.name,
      url: fullUrl,
      method: 'GET',
      timestamp: new Date().toISOString()
    })
    
    try {
      const response = await fetch(fullUrl)
      
      console.log('✅ Respuesta ApiTester recibida:', {
        endpoint: endpoint.name,
        url: fullUrl,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
        timestamp: new Date().toISOString()
      })
      
      const data = await response.json()
      
      console.log('📊 Datos ApiTester procesados:', {
        endpoint: endpoint.name,
        url: fullUrl,
        dataSize: JSON.stringify(data).length,
        dataKeys: Object.keys(data),
        timestamp: new Date().toISOString()
      })
      
      setResults(prev => ({
        ...prev,
        [endpoint.name]: {
          status: response.status,
          statusText: response.statusText,
          data: data,
          success: response.ok
        }
      }))
    } catch (error) {
      console.error('❌ Error en ApiTester:', {
        endpoint: endpoint.name,
        url: fullUrl,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
      
      setResults(prev => ({
        ...prev,
        [endpoint.name]: {
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false
        }
      }))
    } finally {
      setLoading(prev => ({ ...prev, [endpoint.name]: false }))
    }
  }

  return (
    <div className="p-6 bg-black/20 rounded-xl">
      <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-xl">🔧</span>
        API Tester - Verificar Endpoints
      </h3>
      
      <div className="space-y-4">
        {endpoints.map((endpoint) => (
          <div key={endpoint.name} className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-white font-medium">{endpoint.name}</h4>
                <p className="text-white/70 text-sm">{endpoint.url}</p>
              </div>
              <button
                onClick={() => testEndpoint(endpoint)}
                disabled={loading[endpoint.name]}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {loading[endpoint.name] ? 'Testing...' : 'Test'}
              </button>
            </div>
            
            {results[endpoint.name] && (
              <div className={`p-3 rounded-lg ${
                results[endpoint.name].success 
                  ? 'bg-green-500/10 border border-green-500/30' 
                  : 'bg-red-500/10 border border-red-500/30'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${
                    results[endpoint.name].success ? 'bg-green-400' : 'bg-red-400'
                  }`}></span>
                  <span className={`text-sm font-medium ${
                    results[endpoint.name].success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {results[endpoint.name].success ? 'SUCCESS' : 'ERROR'}
                  </span>
                  {results[endpoint.name].status && (
                    <span className="text-white/70 text-sm">
                      {results[endpoint.name].status} {results[endpoint.name].statusText}
                    </span>
                  )}
                </div>
                
                {results[endpoint.name].error ? (
                  <p className="text-red-300 text-sm">{results[endpoint.name].error}</p>
                ) : (
                  <pre className="text-white/70 text-xs overflow-x-auto">
                    {JSON.stringify(results[endpoint.name].data, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <h4 className="text-blue-400 font-semibold mb-2">💡 Información</h4>
        <p className="text-blue-300 text-sm">
          Usa este tester para verificar qué endpoints están disponibles en tu API. 
          Asegúrate de que tu servidor esté corriendo en localhost:5000.
        </p>
      </div>
    </div>
  )
}
