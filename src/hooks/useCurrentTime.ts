'use client'

import { useState, useEffect } from 'react'

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }

    // Establecer el tiempo inicial
    updateTime()

    // Actualizar cada segundo
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return currentTime
}
