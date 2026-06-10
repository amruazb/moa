// LLC to SPC Conversion Document Store
import { create } from 'zustand'
import { LLCToSPCData, Activity, TransferParty } from '@/lib/llc_to_spc/types'
import { sampleLLCToSPCData } from '@/lib/llc_to_spc/sampleData'

interface LLCToSPCStore {
    conversionData: LLCToSPCData
    useDynamicPaging: boolean
    setConversionData: (data: Partial<LLCToSPCData>) => void
    setUseDynamicPaging: (value: boolean) => void
    toggleDynamicPaging: () => void
    updateFirstParty: (data: Partial<TransferParty>) => void
    updateSecondParty: (data: Partial<TransferParty>) => void
    updateThirdParty: (data: Partial<TransferParty>) => void
    updateSeller: (index: number, data: Partial<TransferParty>) => void
    addSeller: () => void
    removeSeller: (index: number) => void
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
    conversionData: { 
        ...sampleLLCToSPCData, 
        sellers: [
            sampleLLCToSPCData.firstParty || {}, 
            sampleLLCToSPCData.secondParty || {}
        ],
        agreementDate: getCurrentDate() 
    },
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

    updateSeller: (index, data) => {
        set((state) => {
            const newSellers = [...(state.conversionData.sellers || [])]
            newSellers[index] = { ...newSellers[index], ...data }
            
            // Sync with firstParty, secondParty, thirdParty for backwards compatibility
            const syncObj: Partial<LLCToSPCData> = {}
            if (index === 0) syncObj.firstParty = newSellers[0]
            if (index === 1) syncObj.secondParty = newSellers[1]
            if (index === 2) syncObj.thirdParty = newSellers[2]

            const newState = {
                ...state.conversionData,
                sellers: newSellers,
                ...syncObj
            }
            return { conversionData: newState }
        })
        saveToCache(get().conversionData)
    },

    addSeller: () => {
        set((state) => {
            const newSellers = [...(state.conversionData.sellers || [])]
            newSellers.push({
                name: '',
                nameAr: '',
                salutation: 'mr',
                nationality: 'Indian',
                nationalityAr: 'هندي',
                eidOrPassport: '',
                documentType: 'eid',
                dob: '',
                address: 'Abu Dhabi',
                addressAr: 'أبوظبي',
                sharesPercent: 0
            })
            const newState = {
                ...state.conversionData,
                sellers: newSellers
            }
            return { conversionData: newState }
        })
        saveToCache(get().conversionData)
    },

    removeSeller: (index) => {
        set((state) => {
            const newSellers = (state.conversionData.sellers || []).filter((_, i) => i !== index)
            const newState = {
                ...state.conversionData,
                sellers: newSellers
            }
            return { conversionData: newState }
        })
        saveToCache(get().conversionData)
    },

    updateFirstParty: (data) => {
        get().updateSeller(0, data)
    },

    updateSecondParty: (data) => {
        get().updateSeller(1, data)
    },

    updateThirdParty: (data) => {
        get().updateSeller(2, data)
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
            const sellers = cachedData.sellers || [cachedData.firstParty || {}, cachedData.secondParty || {}]
            set({ conversionData: { ...cachedData, sellers, agreementDate: getCurrentDate() } })
        } else {
            const sellers = [sampleLLCToSPCData.firstParty || {}, sampleLLCToSPCData.secondParty || {}]
            set({ conversionData: { ...sampleLLCToSPCData, sellers, agreementDate: getCurrentDate() } })
        }
    },

    clearCache: () => {
        clearCacheStorage()
        const sellers = [sampleLLCToSPCData.firstParty || {}, sampleLLCToSPCData.secondParty || {}]
        set({ conversionData: { ...sampleLLCToSPCData, sellers, agreementDate: getCurrentDate() } })
    },

    resetToDefault: () => {
        const sellers = [sampleLLCToSPCData.firstParty || {}, sampleLLCToSPCData.secondParty || {}]
        set({ conversionData: { ...sampleLLCToSPCData, sellers, agreementDate: getCurrentDate() } })
        clearCacheStorage()
    }
}))
