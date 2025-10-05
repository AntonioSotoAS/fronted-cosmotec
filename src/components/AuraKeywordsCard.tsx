'use client'

export function AuraKeywordsCard() {
  const keywords = [
    { keyword: 'Reconocimiento Facial', description: 'Tecnología biométrica para análisis de expresiones', color: 'blue' },
    { keyword: 'Emociones', description: 'Estados afectivos positivos, negativos y neutros', color: 'green' },
    { keyword: 'Astronautas', description: 'Tripulantes en misiones espaciales', color: 'purple' },
    { keyword: 'Salud Psicológica', description: 'Bienestar mental y emocional', color: 'orange' },
    { keyword: 'Misión Espacial', description: 'Expediciones al espacio profundo', color: 'red' },
    { keyword: 'Zona Ricitos de Oro', description: 'Analogía de zona habitable emocional', color: 'yellow' },
    { keyword: 'Tablero de Mando', description: 'Dashboard para monitoreo en tiempo real', color: 'indigo' },
    { keyword: 'Adaptación', description: 'Proceso de ajuste a condiciones espaciales', color: 'pink' }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  return (
    <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">🔑</span>
        Palabras Clave del Proyecto AURA
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {keywords.map((item, index) => (
          <div key={index} className={`rounded-lg p-3 border ${getColorClasses(item.color)}`}>
            <div className="font-semibold text-sm mb-1">{item.keyword}</div>
            <div className="text-xs opacity-80">{item.description}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-white/70 text-sm">
          <strong>Objetivo Principal:</strong> Implementar un sistema de reconocimiento facial para examinar 
          el estado de ánimo de los astronautas durante sus misiones espaciales, permitiendo identificar 
          estados emocionales (positivos, negativos o neutros) sin necesidad de comunicación verbal.
        </div>
      </div>
    </div>
  )
}
