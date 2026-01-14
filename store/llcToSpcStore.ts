// LLC to SPC Conversion Document Store
import { create } from 'zustand'
import { LLCToSPCData } from '@/lib/llc_to_spc/types'
import { sampleLLCToSPCData } from '@/lib/llc_to_spc/sampleData'

interface LLCToSPCStore {
    conversionData: LLCToSPCData
    useDynamicPaging: boolean
    setConversionData: (data: Partial<LLCToSPCData>) => void
    setUseDynamicPaging: (value: boolean) => void
    toggleDynamicPaging: () => void
    updateFirstParty: (data: Partial<LLCToSPCData['firstParty']>) => void
    updateSecondParty: (data: Partial<LLCToSPCData['secondParty']>) => void
    updateThirdParty: (data: Partial<LLCToSPCData['thirdParty']>) => void
    updateManager: (data: Partial<LLCToSPCData['manager']>) => void
    updateLicense: (data: Partial<LLCToSPCData['license']>) => void
    updateOriginalMOA: (data: Partial<LLCToSPCData['originalMOA']>) => void
    updateCapitalInfo: (data: Partial<LLCToSPCData['capitalInfo']>) => void
    updateAgreementDate: (date: string) => void
    initializeFromCache: () => void
    clearCache: () => void
    resetToDefault: () => void
}

const LLC_TO_SPC_CACHE_KEY = 'llc_to_spc_document_data'

const saveToCache = (data: LLCToSPCData) => {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(LLC_TO_SPC_CACHE_KEY, JSON.stringify(data))
    } catch (error) {
        console.error('Failed to save LLC to SPC data to cache:', error)
    }
}

const loadFromCache = (): LLCToSPCData | null => {
    if (typeof window === 'undefined') return null
    try {
        const cached = localStorage.getItem(LLC_TO_SPC_CACHE_KEY)
        return cached ? JSON.parse(cached) : null
    } catch (error) {
        console.error('Failed to load LLC to SPC data from cache:', error)
        return null
    }
}

const clearCacheStorage = () => {
    if (typeof window === 'undefined') return
    try {
        localStorage.removeItem(LLC_TO_SPC_CACHE_KEY)
    } catch (error) {
        console.error('Failed to clear LLC to SPC cache:', error)
    }
}

export const useLLCToSPCStore = create<LLCToSPCStore>((set, get) => ({
    conversionData: sampleLLCToSPCData,
    useDynamicPaging: false, // Default to stable fixed pages

    setConversionData: (data) => {
        const newState = { ...get().conversionData, ...data }
        set({ conversionData: newState })
        saveToCache(newState)
    },

    setUseDynamicPaging: (value) => {
        set({ useDynamicPaging: value })
    },

    toggleDynamicPaging: () => {
        set({ useDynamicPaging: !get().useDynamicPaging })
    },

    updateFirstParty: (data) => {
        const newFirstParty = { ...get().conversionData.firstParty, ...data }
        const newState = { ...get().conversionData, firstParty: newFirstParty }
        set({ conversionData: newState })
        saveToCache(newState)
    },

    updateSecondParty: (data) => {
        const newSecondParty = { ...get().conversionData.secondParty, ...data }
        const newState = { ...get().conversionData, secondParty: newSecondParty }
        set({ conversionData: newState })
        saveToCache(newState)
    },

    updateThirdParty: (data) => {
        const newThirdParty = { ...get().conversionData.thirdParty, ...data }
        const newState = { ...get().conversionData, thirdParty: newThirdParty }
        set({ conversionData: newState })
        saveToCache(newState)
    },

    updateManager: (data) => {
        const newManager = { ...get().conversionData.manager, ...data }
        const newState = { ...get().conversionData, manager: newManager }
        set({ conversionData: newState })
        saveToCache(newState)
    },

    updateLicense: (data) => {
        const newLicense = { ...get().conversionData.license, ...data }
        const newState = { ...get().conversionData, license: newLicense }
        set({ conversionData: newState })
        saveToCache(newState)
    },

    updateOriginalMOA: (data) => {
        const newOriginalMOA = { ...get().conversionData.originalMOA, ...data }
        const newState = { ...get().conversionData, originalMOA: newOriginalMOA }
        set({ conversionData: newState })
        saveToCache(newState)
    },

    updateCapitalInfo: (data) => {
        const newCapitalInfo = { ...get().conversionData.capitalInfo, ...data }
        const newState = { ...get().conversionData, capitalInfo: newCapitalInfo }
        set({ conversionData: newState })
        saveToCache(newState)
    },

    updateAgreementDate: (date) => {
        const newState = { ...get().conversionData, agreementDate: date }
        set({ conversionData: newState })
        saveToCache(newState)
    },

    initializeFromCache: () => {
        const cachedData = loadFromCache()
        if (cachedData) {
            set({ conversionData: cachedData })
        }
    },

    clearCache: () => {
        clearCacheStorage()
        set({ conversionData: sampleLLCToSPCData })
    },

    resetToDefault: () => {
        set({ conversionData: sampleLLCToSPCData })
        clearCacheStorage()
    }
}))
