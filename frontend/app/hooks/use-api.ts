"use client"

// Hook personalizado para manejo de estados de API

import { useState, useCallback } from "react"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>
  reset: () => void
}

export function useApi<T>(apiFunction: (...args: any[]) => Promise<T>): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ data: null, loading: true, error: null })
      try {
        const result = await apiFunction(...args)
        setState({ data: result, loading: false, error: null })
        return result
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Error desconocido")
        setState({ data: null, loading: false, error: err })
        return null
      }
    },
    [apiFunction],
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return { ...state, execute, reset }
}
