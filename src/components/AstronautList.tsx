'use client'

import { useGetAstronautProfilesQuery } from '@/lib/api/apiSlice'
import Image from 'next/image'

export function AstronautList() {
  const { data: astronauts, error, isLoading } = useGetAstronautProfilesQuery()

  if (isLoading) {
    return (
      <div className="p-4 bg-black/20 rounded-xl">
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-white/10 rounded"></div>
            <div className="h-3 bg-white/10 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    // Extract error information more robustly
    let errorMessage = 'Unknown error'
    let errorDetails = ''
    
    if (error && typeof error === 'object') {
      if ('data' in error && error.data) {
        errorMessage = `Error ${error.status || 'unknown'}: Bad Request`
        errorDetails = JSON.stringify(error.data, null, 2)
      } else if ('message' in error) {
        errorMessage = error.message || 'Unknown error'
      } else {
        errorMessage = JSON.stringify(error, null, 2)
      }
    } else if (typeof error === 'string') {
      errorMessage = error
    }
    
    return (
      <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
        <p className="text-red-400 font-semibold mb-2">
          Error loading astronauts
        </p>
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
    <div className="p-4 bg-black/20 rounded-xl">
      <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-xl">👨‍🚀</span>
        Astronauts from API
      </h3>
      {astronauts && astronauts.length > 0 ? (
        <div className="space-y-3">
          {astronauts.map((astronaut) => (
            <div key={astronaut.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
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
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{astronaut.fullName}</p>
                    <p className="text-white/70 text-sm">{astronaut.codename}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      astronaut.currentStatus === 'OPTIMO' ? 'bg-green-500/20 text-green-400' :
                      astronaut.currentStatus === 'ESTRESADO' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {astronaut.currentStatus}
                    </span>
                    <p className="text-white/60 text-xs mt-1">
                      {astronaut.isMonitoring ? 'Active monitoring' : 'Inactive monitoring'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/70">No astronauts available</p>
      )}
    </div>
  )
}
