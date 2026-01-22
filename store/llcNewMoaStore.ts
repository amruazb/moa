import { create } from 'zustand'
import { LLCNewMOAData, Salutation, Activity, defaultActivities } from '@/lib/llc_new_moa/types'
import { sampleLLCNewMOAData } from '@/lib/llc_new_moa/sampleData'

const CACHE_KEY = 'llc-new-moa-data'

// Default data for a new LLC MOA with company partners
const getDefaultData = (): LLCNewMOAData => ({
    company: {
        name: '',
        nameAr: '',
        emirate: 'Abu Dhabi',
        emirateAr: 'أبوظبي',
        address: '',
        addressAr: '',
        moaDate: ''
    },
    partners: [
        {
            name: '',
            nameAr: '',
            country: '',
            countryAr: '',
            licenseNo: '',
            address: '',
            addressAr: '',
            email: '',
            shareCount: 90,
            representative: {
                salutation: 'mr' as Salutation,
                name: '',
                nameAr: '',
                eid: '',
                dob: '',
                nationality: '',
                nationalityAr: ''
            }
        },
        {
            name: '',
            nameAr: '',
            country: '',
            countryAr: '',
            licenseNo: '',
            address: '',
            addressAr: '',
            email: '',
            shareCount: 10,
            representative: {
                salutation: 'mr' as Salutation,
                name: '',
                nameAr: '',
                eid: '',
                dob: '',
                nationality: '',
                nationalityAr: ''
            }
        }
    ],
    manager: {
        salutation: 'mr' as Salutation,
        name: '',
        nameAr: '',
        eid: '',
        dob: '',
        nationality: '',
        nationalityAr: '',
        address: '',
        addressAr: ''
    },
    capital: {
        totalCapital: 150000,
        shareCount: 100,
        shareValue: 1500
    },
    activities: [...defaultActivities]
})

interface LLCNewMOAStore {
    data: LLCNewMOAData

    // Actions
    updateCompany: (field: keyof LLCNewMOAData['company'], value: string) => void
    updatePartner: (index: number, field: string, value: string | number) => void
    updatePartnerRepresentative: (partnerIndex: number, field: string, value: string) => void
    updateManager: (field: keyof LLCNewMOAData['manager'], value: string) => void
    updateCapital: (field: keyof LLCNewMOAData['capital'], value: number) => void
    updateActivities: (activities: Activity[]) => void
    addActivity: (activity: Activity) => void
    removeActivity: (index: number) => void

    // Cache management
    initializeFromCache: () => void
    saveToCache: () => void
    resetData: () => void
    loadSampleData: () => void
}

export const useLLCNewMoaStore = create<LLCNewMOAStore>((set, get) => ({
    data: getDefaultData(),

    updateCompany: (field, value) => {
        set((state) => ({
            data: {
                ...state.data,
                company: {
                    ...state.data.company,
                    [field]: value
                }
            }
        }))
        get().saveToCache()
    },

    updatePartner: (index, field, value) => {
        set((state) => {
            const newPartners = [...state.data.partners]
            newPartners[index] = {
                ...newPartners[index],
                [field]: value
            }
            return {
                data: {
                    ...state.data,
                    partners: newPartners
                }
            }
        })
        get().saveToCache()
    },

    updatePartnerRepresentative: (partnerIndex, field, value) => {
        set((state) => {
            const newPartners = [...state.data.partners]
            newPartners[partnerIndex] = {
                ...newPartners[partnerIndex],
                representative: {
                    ...newPartners[partnerIndex].representative,
                    [field]: value
                }
            }
            return {
                data: {
                    ...state.data,
                    partners: newPartners
                }
            }
        })
        get().saveToCache()
    },

    updateManager: (field, value) => {
        set((state) => ({
            data: {
                ...state.data,
                manager: {
                    ...state.data.manager,
                    [field]: value
                }
            }
        }))
        get().saveToCache()
    },

    updateCapital: (field, value) => {
        set((state) => {
            const newCapital = {
                ...state.data.capital,
                [field]: value
            }
            // Recalculate share value if capital or share count changes
            if (field === 'totalCapital' || field === 'shareCount') {
                newCapital.shareValue = newCapital.totalCapital / newCapital.shareCount
            }
            return {
                data: {
                    ...state.data,
                    capital: newCapital
                }
            }
        })
        get().saveToCache()
    },

    updateActivities: (activities) => {
        set((state) => ({
            data: {
                ...state.data,
                activities
            }
        }))
        get().saveToCache()
    },

    addActivity: (activity) => {
        set((state) => ({
            data: {
                ...state.data,
                activities: [...state.data.activities, activity]
            }
        }))
        get().saveToCache()
    },

    removeActivity: (index) => {
        set((state) => ({
            data: {
                ...state.data,
                activities: state.data.activities.filter((_, i) => i !== index)
            }
        }))
        get().saveToCache()
    },

    initializeFromCache: () => {
        if (typeof window === 'undefined') return

        try {
            const cached = localStorage.getItem(CACHE_KEY)
            if (cached) {
                const parsedData = JSON.parse(cached)
                set({ data: parsedData })
            }
        } catch (error) {
            console.error('Failed to load from cache:', error)
        }
    },

    saveToCache: () => {
        if (typeof window === 'undefined') return

        try {
            const data = get().data
            localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        } catch (error) {
            console.error('Failed to save to cache:', error)
        }
    },

    resetData: () => {
        const defaultData = getDefaultData()
        set({ data: defaultData })
        if (typeof window !== 'undefined') {
            localStorage.removeItem(CACHE_KEY)
        }
    },

    loadSampleData: () => {
        console.log('Loading sample data:', sampleLLCNewMOAData)
        set({ data: sampleLLCNewMOAData })
        get().saveToCache()
        console.log('Sample data loaded successfully')
    }
}))
