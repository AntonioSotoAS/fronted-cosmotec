'use client'

import { useState } from 'react'
import { useGenerateReportDataQuery, useGetReportSummaryQuery } from '@/lib/api/apiSlice'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function ReportsModule() {
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [showReport, setShowReport] = useState<boolean>(false)

  // Queries para obtener datos del reporte
  const { data: reportData, error: reportError, isLoading: reportLoading } = useGenerateReportDataQuery(
    { startDate, endDate },
    { skip: !showReport || !startDate || !endDate }
  )

  const { data: reportSummary, error: summaryError, isLoading: summaryLoading } = useGetReportSummaryQuery(
    { startDate, endDate },
    { skip: !showReport || !startDate || !endDate }
  )

  const handleGenerateReport = () => {
    if (startDate && endDate) {
      setShowReport(true)
    }
  }

  const handleExportReport = () => {
    if (reportData && reportSummary) {
      const exportData = {
        summary: reportSummary,
        data: reportData,
        exportedAt: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `astronaut-report-${startDate}-to-${endDate}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-6">
      {/* Controles de Reporte */}
      <div className="bg-black/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Generar Reporte de Astronautas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">Fecha de Inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-red-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-2">Fecha de Fin</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button
            onClick={handleGenerateReport}
            disabled={!startDate || !endDate}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generar Reporte
          </Button>
          
          {showReport && reportData && (
            <Button
              onClick={handleExportReport}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Exportar JSON
            </Button>
          )}
        </div>
      </div>

      {/* Resumen del Reporte */}
      {showReport && reportSummary && (
        <div className="bg-black/20 rounded-xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📈</span>
            Resumen del Reporte
          </h3>
          
          {summaryLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-white/20 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded"></div>
                <div className="h-3 bg-white/10 rounded w-3/4"></div>
              </div>
            </div>
          ) : summaryError ? (
            <div className="text-red-400">
              Error al cargar el resumen del reporte
            </div>
          ) : (
            <div className="space-y-6">
              {/* Información del Reporte */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/5 border-white/10 p-4">
                  <div className="text-white/60 text-sm mb-1">Total de Registros</div>
                  <div className="text-2xl font-bold text-white">
                    {reportSummary.reportInfo?.totalRecords || 0}
                  </div>
                </Card>
                
                <Card className="bg-white/5 border-white/10 p-4">
                  <div className="text-white/60 text-sm mb-1">Astronautas Únicos</div>
                  <div className="text-2xl font-bold text-white">
                    {reportSummary.reportInfo?.uniqueAstronauts || 0}
                  </div>
                </Card>
                
                <Card className="bg-white/5 border-white/10 p-4">
                  <div className="text-white/60 text-sm mb-1">Días de Datos</div>
                  <div className="text-2xl font-bold text-white">
                    {reportSummary.reportInfo?.duration?.days || 0}
                  </div>
                </Card>
              </div>

              {/* Estadísticas por Estado */}
              {reportSummary.statistics?.stateCounts && (
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Distribución por Estado</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(reportSummary.statistics.stateCounts).map(([state, count]) => (
                      <Card key={state} className="bg-white/5 border-white/10 p-4">
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-medium ${
                            state === 'OPTIMO' ? 'text-green-400' :
                            state === 'ESTRESADO' ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {state}
                          </span>
                          <span className="text-white font-bold">
                            {count as number}
                          </span>
                        </div>
                        <div className="text-white/60 text-xs mt-1">
                          {reportSummary.statistics.statePercentages?.[state]?.toFixed(1)}%
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Métricas Promedio */}
              {reportSummary.statistics?.averageMetrics && (
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Métricas Promedio</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(reportSummary.statistics.averageMetrics).map(([metric, value]) => (
                      <Card key={metric} className="bg-white/5 border-white/10 p-4">
                        <div className="text-white/60 text-sm mb-1 capitalize">
                          {metric.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-white font-bold">
                          {typeof value === 'number' ? Math.round(value) + '%' : 'N/A'}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Datos del Reporte */}
      {showReport && reportData && (
        <div className="bg-black/20 rounded-xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Datos del Reporte ({reportData.length} registros)
          </h3>
          
          {reportLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-white/20 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded"></div>
                <div className="h-3 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            </div>
          ) : reportError ? (
            <div className="text-red-400">
              Error al cargar los datos del reporte
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/70 py-2">Astronauta</th>
                    <th className="text-left text-white/70 py-2">Timestamp</th>
                    <th className="text-left text-white/70 py-2">Estado</th>
                    <th className="text-left text-white/70 py-2">Apertura Ocular</th>
                    <th className="text-left text-white/70 py-2">Tensión</th>
                    <th className="text-left text-white/70 py-2">Focalización</th>
                    <th className="text-left text-white/70 py-2">Concentración</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.slice(0, 50).map((record, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-2 text-white">{record.fullName || record.astronautName}</td>
                      <td className="py-2 text-white/70">
                        {new Date(record.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          record.overallState === 'OPTIMO' ? 'bg-green-500/20 text-green-400' :
                          record.overallState === 'ESTRESADO' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {record.overallState}
                        </span>
                      </td>
                      <td className="py-2 text-white">
                        {record.eyeOpening ? Math.round(record.eyeOpening) + '%' : 'N/A'}
                      </td>
                      <td className="py-2 text-white">
                        {record.tensionExpressions ? Math.round(record.tensionExpressions) + '%' : 'N/A'}
                      </td>
                      <td className="py-2 text-white">
                        {record.focus ? Math.round(record.focus) + '%' : 'N/A'}
                      </td>
                      <td className="py-2 text-white">
                        {record.concentration ? Math.round(record.concentration) + '%' : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {reportData.length > 50 && (
                <div className="text-center mt-4 text-white/70 text-sm">
                  Mostrando los primeros 50 registros de {reportData.length} totales
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
