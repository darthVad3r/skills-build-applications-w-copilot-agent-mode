import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeCollection(payload, resourceKey) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[resourceKey])) {
    return payload[resourceKey]
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  if (Array.isArray(payload?.records)) {
    return payload.records
  }

  return []
}

export function useCollection(resourceKey) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const endpoint = `${apiBaseUrl}/${resourceKey}/`

  useEffect(() => {
    let active = true

    async function loadCollection() {
      try {
        setStatus('loading')
        setError('')

        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()
        const collection = normalizeCollection(payload, resourceKey)

        if (active) {
          setItems(collection)
          setStatus('success')
        }
      } catch (requestError) {
        if (active) {
          setItems([])
          setError(requestError instanceof Error ? requestError.message : 'Request failed')
          setStatus('error')
        }
      }
    }

    loadCollection()

    return () => {
      active = false
    }
  }, [endpoint, resourceKey])

  return { endpoint, error, items, status }
}
