// POA Document Store
import { create } from 'zustand'
import { POAData, POAPrincipal, POARepresentative, POAAttorney, getPronouns } from '@/lib/poa/types'
import { samplePOAFilled } from '@/lib/poa/sampleData'

interface POAStore {
    poaData: POAData
    setPOAData: (data: Partial<POAData>) => void
    updatePrincipal1: (data: Partial<POAPrincipal>) => void
    updatePrincipal2: (data: Partial<POAPrincipal>) => void
    updatePrincipal1Representative: (data: Partial<POARepresentative>) => void
    updatePrincipal2Representative: (data: Partial<POARepresentative>) => void
    // New dynamic principal management functions
    updatePrincipal: (index: number, data: Partial<POAPrincipal>) => void
    updatePrincipalRepresentative: (index: number, data: Partial<POARepresentative>) => void
    addPrincipal: () => void
    removePrincipal: (index: number) => void
    // Legacy attorney function (for backward compatibility)
    updateAttorney: (data: Partial<POAData['attorney']>) => void
    // New dynamic attorney management functions
    updateAttorneyByIndex: (index: number, data: Partial<POAAttorney>) => void
    addAttorney: () => void
    removeAttorney: (index: number) => void
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

    // Dynamic principal management functions
    updatePrincipal: (index, data) => {
        const newPrincipals = [...get().poaData.principals!]
        if (newPrincipals[index]) {
            const updatedPrincipal = { ...newPrincipals[index], ...data }
            // Update pronouns if salutation changed
            if (data.salutation) {
                updatedPrincipal.pronouns = getPronouns(data.salutation)
            }
            newPrincipals[index] = updatedPrincipal
            const newState = { ...get().poaData, principals: newPrincipals }
            set({ poaData: newState })
            saveToCache(newState)
        }
    },

    updatePrincipalRepresentative: (index, data) => {
        const newPrincipals = [...get().poaData.principals!]
        if (newPrincipals[index]) {
            const currentRep = newPrincipals[index].representative || {}
            const updatedRep = { ...currentRep, ...data }
            // Update pronouns if salutation changed
            if (data.salutation) {
                updatedRep.pronouns = getPronouns(data.salutation)
            }
            newPrincipals[index] = { 
                ...newPrincipals[index], 
                representative: updatedRep 
            }
            const newState = { ...get().poaData, principals: newPrincipals }
            set({ poaData: newState })
            saveToCache(newState)
        }
    },

    addPrincipal: () => {
        const newPrincipals = [...get().poaData.principals!]
        const defaultPrincipal: Partial<POAPrincipal> = {
            name: '',
            nameAr: '',
            salutation: 'mr',
            pronouns: getPronouns('mr'),
            nationality: '',
            nationalityAr: '',
            eidOrPassport: '',
            documentType: 'eid',
            address: '',
            addressAr: '',
            isRepresented: false
        }
        newPrincipals.push(defaultPrincipal as POAPrincipal)
        const newState = { ...get().poaData, principals: newPrincipals }
        set({ poaData: newState })
        saveToCache(newState)
    },

    removePrincipal: (index) => {
        const currentPrincipals = get().poaData.principals!
        // Don't allow removing if only one principal remains
        if (currentPrincipals.length <= 1) {
            return
        }
        const newPrincipals = currentPrincipals.filter((_, i) => i !== index)
        const newState = { ...get().poaData, principals: newPrincipals }
        set({ poaData: newState })
        saveToCache(newState)
    },

    // Legacy attorney update (for backward compatibility)
    updateAttorney: (data) => {
        // Convert to attorneys array if needed
        const currentData = get().poaData
        const attorneys = currentData.attorneys || (currentData.attorney ? [currentData.attorney] : [])
        if (attorneys.length === 0) {
            attorneys.push({})
        }
        attorneys[0] = { ...attorneys[0], ...data }
        const newState = { ...currentData, attorneys, attorney: attorneys[0] }
        set({ poaData: newState })
        saveToCache(newState)
    },

    // Dynamic attorney management functions
    updateAttorneyByIndex: (index, data) => {
        const currentData = get().poaData
        // Support both attorneys array and legacy attorney
        const attorneys = currentData.attorneys || (currentData.attorney ? [currentData.attorney] : [])
        if (attorneys[index]) {
            const updatedAttorney = { ...attorneys[index], ...data }
            // Update pronouns if salutation changed
            if (data.salutation) {
                updatedAttorney.pronouns = getPronouns(data.salutation)
            }
            attorneys[index] = updatedAttorney
            const newState = { ...currentData, attorneys }
            set({ poaData: newState })
            saveToCache(newState)
        }
    },

    addAttorney: () => {
        const currentData = get().poaData
        const attorneys = currentData.attorneys || (currentData.attorney ? [currentData.attorney] : [])
        const defaultAttorney: Partial<POAAttorney> = {
            name: '',
            nameAr: '',
            salutation: 'mr',
            pronouns: getPronouns('mr'),
            nationality: '',
            nationalityAr: '',
            eidOrPassport: '',
            documentType: 'eid',
            address: '',
            addressAr: ''
        }
        attorneys.push(defaultAttorney as POAAttorney)
        const newState = { ...currentData, attorneys }
        set({ poaData: newState })
        saveToCache(newState)
    },

    removeAttorney: (index) => {
        const currentData = get().poaData
        const attorneys = currentData.attorneys || (currentData.attorney ? [currentData.attorney] : [])
        // Don't allow removing if only one attorney remains
        if (attorneys.length <= 1) {
            return
        }
        const newAttorneys = attorneys.filter((_, i) => i !== index)
        const newState = { ...currentData, attorneys: newAttorneys }
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
