// LLC to SPC Conversion Document Store
import { create } from 'zustand'
import { LLCToSPCData, Activity } from '@/lib/llc_to_spc/types'
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
    updateNewOwner: (data: Partial<LLCToSPCData['newOwner']>) => void
    updateManager: (data: Partial<LLCToSPCData['manager']>) => void
    updateLicense: (data: Partial<LLCToSPCData['license']>) => void
    updateOriginalMOA: (data: Partial<LLCToSPCData['originalMOA']>) => void
    updateCapitalInfo: (data: Partial<LLCToSPCData['capitalInfo']>) => void
    updateAgreementDate: (date: string) => void
    updateActivities: (activities: Activity[]) => void
    addActivity: (activity: Activity) => void
    removeActivity: (index: number) => void
    updateActivity: (index: number, activity: Partial<Activity>) => void
    initializeFromCache: () => void
    clearCache: () => void
    resetToDefault: () => void
}

const LLC_TO_SPC_CACHE_KEY = 'llc_to_spc_document_data_v3' // v3: Fixed 4-party structure with proper newOwner

// Helper function to get current date in YYYY-MM-DD format
const getCurrentDate = (): string => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

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
    conversionData: { ...sampleLLCToSPCData, agreementDate: getCurrentDate() },
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
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                firstParty: { ...state.conversionData.firstParty, ...data }
            }
        }))
        saveToCache(get().conversionData)
    },

    updateSecondParty: (data) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                secondParty: { ...state.conversionData.secondParty, ...data }
            }
        }))
        saveToCache(get().conversionData)
    },

    updateThirdParty: (data) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                thirdParty: { ...state.conversionData.thirdParty, ...data }
            }
        }))
        saveToCache(get().conversionData)
    },

    updateNewOwner: (data) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                newOwner: { ...state.conversionData.newOwner, ...data }
            }
        }))
        saveToCache(get().conversionData)
    },

    updateManager: (data) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                manager: { ...state.conversionData.manager, ...data }
            }
        }))
        saveToCache(get().conversionData)
    },

    updateLicense: (data) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                license: { ...state.conversionData.license, ...data }
            }
        }))
        saveToCache(get().conversionData)
    },

    updateOriginalMOA: (data) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                originalMOA: { ...state.conversionData.originalMOA, ...data }
            }
        }))
        saveToCache(get().conversionData)
    },

    updateCapitalInfo: (data) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                capitalInfo: { ...state.conversionData.capitalInfo, ...data }
            }
        }))
        saveToCache(get().conversionData)
    },

    updateAgreementDate: (date) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                agreementDate: date
            }
        }))
        saveToCache(get().conversionData)
    },

    updateActivities: (activities) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                activities
            }
        }))
        saveToCache(get().conversionData)
    },

    addActivity: (activity) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                activities: [...(state.conversionData.activities || []), activity]
            }
        }))
        saveToCache(get().conversionData)
    },

    removeActivity: (index) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                activities: (state.conversionData.activities || []).filter((_, i) => i !== index)
            }
        }))
        saveToCache(get().conversionData)
    },

    updateActivity: (index, activity) => {
        set((state) => ({
            conversionData: {
                ...state.conversionData,
                activities: (state.conversionData.activities || []).map((a, i) =>
                    i === index ? { ...a, ...activity } : a
                )
            }
        }))
        saveToCache(get().conversionData)
    },

    initializeFromCache: () => {
        const cachedData = loadFromCache()
        if (cachedData) {
            // Always update to current date even when loading from cache
            set({ conversionData: { ...cachedData, agreementDate: getCurrentDate() } })
        } else {
            // If no cache, use sample data with current date
            set({ conversionData: { ...sampleLLCToSPCData, agreementDate: getCurrentDate() } })
        }
    },

    clearCache: () => {
        clearCacheStorage()
        set({ conversionData: { ...sampleLLCToSPCData, agreementDate: getCurrentDate() } })
    },

    resetToDefault: () => {
        set({ conversionData: { ...sampleLLCToSPCData, agreementDate: getCurrentDate() } })
        clearCacheStorage()
    }
}))
