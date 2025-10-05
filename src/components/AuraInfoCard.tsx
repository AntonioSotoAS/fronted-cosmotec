'use client'

export function AuraInfoCard() {
  return (
    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
            <span className="text-3xl">🧠</span>
            AURA - Asistente de Comprensión y Respuesta
          </h2>
          <p className="text-white/70 text-sm mb-4">
            Sistema de reconocimiento facial para monitoreo emocional de astronautas en misiones espaciales
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-green-400 text-sm font-medium mb-1">Emociones Positivas</div>
              <div className="text-2xl font-bold text-white">45%</div>
              <div className="text-white/60 text-xs">Línea base promedio</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-red-400 text-sm font-medium mb-1">Emociones Negativas</div>
              <div className="text-2xl font-bold text-white">15%</div>
              <div className="text-white/60 text-xs">Bajo control</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-blue-400 text-sm font-medium mb-1">Emociones Neutras</div>
              <div className="text-2xl font-bold text-white">40%</div>
              <div className="text-white/60 text-xs">Estado estable</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              Reconocimiento Facial
            </span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
              Salud Psicológica
            </span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
              Misión Espacial
            </span>
            <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
              Astronautas
            </span>
          </div>
        </div>
        
        <div className="text-right ml-6">
          <div className="text-xs text-white/60 mb-1">Estado del Sistema</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-semibold">ACTIVO</span>
          </div>
          <div className="text-xs text-white/60">Precisión: 94%</div>
          <div className="text-xs text-white/60">Última actualización: Ahora</div>
        </div>
      </div>
    </div>
  )
}
