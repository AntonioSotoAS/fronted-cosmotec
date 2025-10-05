'use client'

export function AuraTeamCard() {
  const teamMembers = [
    { name: 'Luis Carlos Bautista', role: 'Líder del Proyecto' },
    { name: 'José Heiner Castro', role: 'Desarrollo de IA' },
    { name: 'José Roger Gamonal', role: 'Análisis de Datos' },
    { name: 'Miguel Ángel López', role: 'Sistema de Monitoreo' },
    { name: 'Rodolfo Junior Miranda', role: 'Interfaz de Usuario' },
    { name: 'Arturo Antonio Montejo', role: 'Integración de Sistemas' }
  ]

  return (
    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">👥</span>
        Equipo AURA - Chimbote, Perú 2025
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-white font-medium text-sm">{member.name}</div>
                <div className="text-white/70 text-xs">{member.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-white/70 text-xs text-center">
          Proyecto AURA - Asistente de Comprensión y Respuesta de Astronautas
        </div>
        <div className="text-white/60 text-xs text-center mt-1">
          Sistema de reconocimiento facial para monitoreo emocional en misiones espaciales
        </div>
      </div>
    </div>
  )
}
