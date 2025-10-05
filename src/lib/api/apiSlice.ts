import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Tipos de datos basados en las entidades de tu BD
export interface AstronautProfile {
  id: number
  astronautId: string
  fullName: string
  codename: string
  initials?: string
  photoUrl?: string
  description?: string
  baselineMetrics?: {
    normalEyeOpening: number
    normalTensionExpressions: number
    normalPallor: number
    normalFocus: number
    normalConcentration: number
    normalEar: number
  }
  thresholds?: {
    stressThreshold: number
    criticalThreshold: number
    drowsyThreshold: number
    closedThreshold: number
  }
  isActive: boolean
  isMonitoring: boolean
  lastSeen?: string
  currentStatus?: string
  statusLastUpdated?: string
  createdAt: string
  updatedAt: string
}

export interface AstronautMonitoring {
  id: number
  astronautId: string
  astronautName: string
  codename: string
  timestamp: string
  faceDetected: boolean
  faceConfidence?: number
  recognizedName?: string
  eyeOpening?: number
  tensionExpressions?: number
  pallor?: number
  focus?: number
  concentration?: number
  ear?: number
  eyeState?: string
  dominantEmotion?: string
  emotionConfidence?: number
  emotionalState?: string
  emotionBreakdown?: Record<string, number>
  overallState: string
  stateDescription?: string
  alertLevel?: string
  consecutiveClosedFrames: number
  stabilityFrames: number
  sentimentCounts?: Record<string, number>
  dominantSentiment?: string
  sentimentPercentage?: number
  totalFrames: number
  activeAlerts?: string[]
  alertHistory?: Array<{
    type: string
    timestamp: string
    severity: string
  }>
  recommendedActions?: string[]
  createdAt: string
  updatedAt: string
}

export interface CrewStatus {
  id: number
  timestamp: string
  crewMembers: Array<{
    astronautId: string
    name: string
    codename: string
    status: string
    color: string
    lastUpdate: string
  }>
  totalMembers: number
  optimalCount: number
  stressedCount: number
  criticalCount: number
  unknownCount: number
  crewAlerts?: string[]
  crewNotes?: string
  createdAt: string
  updatedAt: string
}

export interface AstronautStatistics {
  astronautId: string
  fullName: string
  codename: string
  statistics: {
    totalRecords: number
    timeRange: {
      start: string
      end: string
    }
    stateCounts: {
      OPTIMO: number
      ESTRESADO: number
      CRITICO: number
    }
    statePercentages: {
      OPTIMO: number
      ESTRESADO: number
      CRITICO: number
    }
    averageMetrics: {
      eyeOpening: number
      tensionExpressions: number
      pallor: number
      focus: number
      concentration: number
      ear: number
    }
    alertHistory: {
      totalAlerts: number
      criticalAlerts: number
      stressAlerts: number
      lastAlert: string
    }
    performanceScore: number
  }
}

export interface CrewStatistics {
  totalAstronauts: number
  activeAstronauts: number
  totalRecords: number
  timeRange: {
    start: string
    end: string
  }
  overallStateCounts: {
    OPTIMO: number
    ESTRESADO: number
    CRITICO: number
  }
  overallPercentages: {
    OPTIMO: number
    ESTRESADO: number
    CRITICO: number
  }
  crewPerformance: {
    averageScore: number
    bestPerformer: string
    needsAttention: string
  }
  astronautStats: Array<{
    astronautId: string
    fullName: string
    performanceScore: number
    stateCounts: {
      OPTIMO: number
      ESTRESADO: number
      CRITICO: number
    }
  }>
}

export interface DashboardData {
  crewStatus: {
    timestamp: string
    crewMembers: Array<{
      astronautId: string
      name: string
      codename: string
      status: string
      color: string
      lastUpdate: string
    }>
    totalMembers: number
    optimalCount: number
    stressedCount: number
    criticalCount: number
  }
  activeAlerts: Alert[]
  crewStatistics: {
    totalRecords: number
    uniqueAstronauts: number
    stateCounts: {
      OPTIMO: number
      ESTRESADO: number
      CRITICO: number
    }
  }
  astronautStatuses: Array<{
    astronautId: string
    fullName: string
    codename: string
    currentStatus: {
      overallState: string
      eyeOpening: number
      tensionExpressions: number
      pallor: number
      focus: number
      concentration: number
      timestamp: string
    }
  }>
}

export interface AstronautStatus {
  astronautId: string
  fullName: string
  codename: string
  currentStatus: {
    overallState: string
    eyeOpening: number
    tensionExpressions: number
    pallor: number
    focus: number
    concentration: number
    timestamp: string
  }
}

export interface HistoryParams {
  startDate?: string
  endDate?: string
  state?: string
  limit?: number
  offset?: number
}

export interface Alert {
  astronautId: string
  astronautName: string
  alertType: string
  description: string
  timestamp: string
  recommendedActions: string[]
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
    // Configuración para manejar errores
    fetchFn: async (...args) => {
      const [url, options] = args
      
      // Extraer información de la URL de manera más robusta
      let urlString = ''
      let method = 'GET'
      
      if (typeof url === 'string') {
        urlString = url
      } else if (url instanceof Request) {
        urlString = url.url
        method = url.method
      } else {
        urlString = String(url)
      }
      
      // Obtener método de options si está disponible
      if (options?.method) {
        method = options.method
      }
      
      console.log('🚀 Petición API iniciada:', {
        url: urlString,
        method: method,
        headers: options?.headers,
        body: options?.body,
        timestamp: new Date().toISOString()
      })
      
      try {
        const response = await fetch(...args)
        
        console.log('✅ Respuesta API recibida:', {
          url: urlString,
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries()),
          timestamp: new Date().toISOString()
        })
        
        if (!response.ok) {
          // Intentar obtener el cuerpo del error para más información
          try {
            const errorBody = await response.clone().text()
            console.error('❌ Error 400 - Cuerpo de respuesta:', {
              url: urlString,
              status: response.status,
              statusText: response.statusText,
              body: errorBody,
              timestamp: new Date().toISOString()
            })
          } catch (bodyError) {
            console.error('❌ No se pudo leer el cuerpo del error:', bodyError)
          }
          
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return response
      } catch (error) {
        console.error('❌ Error en petición API:', {
          url: urlString,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        })
        throw error
      }
    },
  }),
  tagTypes: ['AstronautProfile', 'AstronautStatistics', 'CrewStatistics', 'Dashboard', 'AstronautStatus', 'History', 'AstronautMonitoring', 'CrewStatus', 'Alert', 'Test', 'Report'],
  endpoints: (builder) => ({
    // 1. Obtener todos los perfiles de astronautas
    getAstronautProfiles: builder.query<AstronautProfile[], void>({
      query: () => '/astronauts/profiles',
      providesTags: ['AstronautProfile'],
    }),
    
    // 2. Dashboard completo
    getDashboard: builder.query<DashboardData, void>({
      query: () => '/astronauts/dashboard',
      providesTags: ['Dashboard'],
    }),
    
    // 3. Estadísticas por astronauta
    getAstronautStatistics: builder.query<AstronautStatistics, string>({
      query: (astronautId) => `/astronauts/statistics/${astronautId}`,
      providesTags: (result, error, astronautId) => [
        { type: 'AstronautStatistics', id: astronautId }
      ],
    }),
    
    // 4. Estadísticas generales de la tripulación
    getCrewStatistics: builder.query<CrewStatistics, void>({
      query: () => '/astronauts/crew/statistics',
      providesTags: ['CrewStatistics'],
    }),
    
    // 5. Datos históricos por astronauta
    getAstronautHistory: builder.query<AstronautMonitoring[], { astronautId: string; params?: HistoryParams }>({
      query: ({ astronautId, params = {} }) => {
        const searchParams = new URLSearchParams()
        if (params.startDate) searchParams.append('startDate', params.startDate)
        if (params.endDate) searchParams.append('endDate', params.endDate)
        if (params.state) searchParams.append('state', params.state)
        if (params.limit) searchParams.append('limit', params.limit.toString())
        if (params.offset) searchParams.append('offset', params.offset.toString())
        
        const queryString = searchParams.toString()
        return `/astronauts/monitoring/history/${astronautId}${queryString ? `?${queryString}` : ''}`
      },
      providesTags: (result, error, { astronautId }) => [
        { type: 'History', id: astronautId }
      ],
    }),
    
    // 6. Alertas activas
    getActiveAlerts: builder.query<Alert[], void>({
      query: () => '/astronauts/alerts/active',
      providesTags: ['Alert'],
    }),
    
    // 7. Estado actual de la tripulación
    getCrewStatus: builder.query<CrewStatus, void>({
      query: () => '/astronauts/crew-status/current',
      providesTags: ['CrewStatus'],
    }),
    
    // 8. Estado actual de un astronauta específico
    getAstronautStatus: builder.query<AstronautMonitoring, string>({
      query: (astronautId) => `/astronauts/status/${astronautId}`,
      providesTags: (result, error, astronautId) => [
        { type: 'AstronautStatus', id: astronautId }
      ],
    }),
    
    // 9. Endpoint de prueba
    getTestEndpoint: builder.query<{ success: boolean; message: string; timestamp: string; data: { astronauts: string[] } }, void>({
      query: () => '/astronauts/test',
      providesTags: ['Test'],
    }),
    
    // 10. Ejecutar todos los seeds
    runAllSeeds: builder.mutation<{ success: boolean; message: string; timestamp: string }, void>({
      query: () => ({
        url: '/astronauts/seeds/run-all',
        method: 'POST',
      }),
      invalidatesTags: ['AstronautProfile', 'AstronautMonitoring', 'CrewStatus'],
    }),
    
    // 11. Ejecutar seeds de perfiles
    runProfilesSeeds: builder.mutation<{ success: boolean; message: string; timestamp: string }, void>({
      query: () => ({
        url: '/astronauts/seeds/profiles',
        method: 'POST',
      }),
      invalidatesTags: ['AstronautProfile'],
    }),
    
    // 12. Ejecutar seeds de monitoreo
    runMonitoringSeeds: builder.mutation<{ success: boolean; message: string; timestamp: string }, void>({
      query: () => ({
        url: '/astronauts/seeds/monitoring',
        method: 'POST',
      }),
      invalidatesTags: ['AstronautMonitoring', 'CrewStatus'],
    }),
    
    // 13. Verificar estado de seeds
    getSeedsStatus: builder.query<{ success: boolean; message: string; timestamp: string }, void>({
      query: () => '/astronauts/seeds/status',
      providesTags: ['Test'],
    }),
    
    // 14. Generar reporte de datos
    generateReportData: builder.query<any[], { startDate: string; endDate: string }>({
      query: ({ startDate, endDate }) => ({
        url: `/astronauts/reports/data?startDate=${startDate}&endDate=${endDate}`,
        method: 'GET',
      }),
      providesTags: ['Report'],
    }),
    
    // 15. Obtener resumen del reporte
    getReportSummary: builder.query<any, { startDate: string; endDate: string }>({
      query: ({ startDate, endDate }) => ({
        url: `/astronauts/reports/summary?startDate=${startDate}&endDate=${endDate}`,
        method: 'GET',
      }),
      providesTags: ['Report'],
    }),
  }),
})

// Exporta hooks para usar en componentes
export const {
  useGetAstronautProfilesQuery,
  useGetDashboardQuery,
  useGetAstronautStatisticsQuery,
  useGetCrewStatisticsQuery,
  useGetAstronautHistoryQuery,
  useGetActiveAlertsQuery,
  useGetCrewStatusQuery,
  useGetAstronautStatusQuery,
  useGetTestEndpointQuery,
  useRunAllSeedsMutation,
  useRunProfilesSeedsMutation,
  useRunMonitoringSeedsMutation,
  useGetSeedsStatusQuery,
  useGenerateReportDataQuery,
  useGetReportSummaryQuery,
} = apiSlice
