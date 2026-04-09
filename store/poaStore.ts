// POA Document Store
import { create } from 'zustand'
import { POAData } from '@/lib/poa/types'
import { samplePOAFilled } from '@/lib/poa/sampleData'

interface POAStore {
    poaData: POAData
    setPOAData: (data: Partial<POAData>) => void
    updatePrincipal1: (data: Partial<POAPrincipal>) => void
    updatePrincipal2: (data: Partial<POAPrincipal>) => void
    updatePrincipal1Representative: (data: Partial<POARepresentative>) => void
    updatePrincipal2Representative: (data: Partial<POARepresentative>) => void
    updateAttorney: (data: Partial<POAData['attorney']>) => void
    updateLicense: (data: Partial<POAData['license']>) => void
    updateSections: (data: Partial<POAData['sections']>) => void
    updateValidity: (data: Partial<POAData['validity']>) => void
    initializeFromCache: () => void
    clearCache: () => void
    resetToDefault: () => void
}

const POA_CACHE_KEY = 'poa_document_data'

const saveToCache = (data: POAData) => {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(POA_CACHE_KEY, JSON.stringify(data))
    } catch (error) {
        console.error('Failed to save POA to cache:', error)
    }
}

const loadFromCache = (): POAData | null => {
    if (typeof window === 'undefined') return null
    try {
        const cached = localStorage.getItem(POA_CACHE_KEY)
        return cached ? JSON.parse(cached) : null
    } catch (error) {
        console.error('Failed to load POA from cache:', error)
        return null
    }
}

const clearCacheStorage = () => {
    if (typeof window === 'undefined') return
    try {
        localStorage.removeItem(POA_CACHE_KEY)
    } catch (error) {
        console.error('Failed to clear POA cache:', error)
    }
}

export const usePOAStore = create<POAStore>((set, get) => ({
    poaData: samplePOAFilled,

    setPOAData: (data) => {
        const newState = { ...get().poaData, ...data }
        set({ poaData: newState })
        saveToCache(newState)
    },

    updatePrincipal1: (data) => {
        const newPrincipals = [...get().poaData.principals!]
        newPrincipals[0] = { ...newPrincipals[0], ...data }
        const newState = { ...get().poaData, principals: newPrincipals }
        set({ poaData: newState })
        saveToCache(newState)
    },

    updatePrincipal2: (data) => {
        const newPrincipals = [...get().poaData.principals!]
        newPrincipals[1] = { ...newPrincipals[1], ...data }
        const newState = { ...get().poaData, principals: newPrincipals }
        set({ poaData: newState })
        saveToCache(newState)
    },

    updatePrincipal1Representative: (data) => {
        const newPrincipals = [...get().poaData.principals!]
        const currentRep = newPrincipals[0].representative || {}
        newPrincipals[0] = { 
            ...newPrincipals[0], 
            representative: { ...currentRep, ...data } 
        }
        const newState = { ...get().poaData, principals: newPrincipals }
        set({ poaData: newState })
        saveToCache(newState)
    },

    updatePrincipal2Representative: (data) => {
        const newPrincipals = [...get().poaData.principals!]
        const currentRep = newPrincipals[1].representative || {}
        newPrincipals[1] = { 
            ...newPrincipals[1], 
            representative: { ...currentRep, ...data } 
        }
        const newState = { ...get().poaData, principals: newPrincipals }
        set({ poaData: newState })
        saveToCache(newState)
    },

    updateAttorney: (data) => {
        const newAttorney = { ...get().poaData.attorney, ...data }
        const newState = { ...get().poaData, attorney: newAttorney }
        set({ poaData: newState })
        saveToCache(newState)
    },

    updateLicense: (data) => {
        const newLicense = { ...get().poaData.license, ...data }
        const newState = { ...get().poaData, license: newLicense }
        set({ poaData: newState })
        saveToCache(newState)
    },

    updateSections: (data) => {
        const newSections = { ...get().poaData.sections, ...data }
        const newState = { ...get().poaData, sections: newSections }
        set({ poaData: newState })
        saveToCache(newState)
    },

    updateValidity: (data) => {
        const newValidity = { ...get().poaData.validity, ...data }
        const newState = { ...get().poaData, validity: newValidity }
        set({ poaData: newState })
        saveToCache(newState)
    },

    initializeFromCache: () => {
        const cachedData = loadFromCache()
        if (cachedData) {
            set({ poaData: cachedData })
        }
    },

    clearCache: () => {
        clearCacheStorage()
        set({ poaData: samplePOAFilled })
    },

    resetToDefault: () => {
        set({ poaData: samplePOAFilled })
        clearCacheStorage()
    }
}))
