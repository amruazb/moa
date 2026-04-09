import { create } from 'zustand'
import { LLCAmendmentMOAData, Salutation, Activity, defaultActivities } from '@/lib/llc_amendment_moa/types'
import type { POASections } from '@/lib/poa/types'
import { sampleLLCAmendmentMOAData } from '@/lib/llc_amendment_moa/sampleData'

const CACHE_KEY = 'llc-amendment-moa-data'

// Default data for LLC Amendment MOA
const getDefaultData = (): LLCAmendmentMOAData => ({
    company: {
        name: '',
        nameAr: '',
        emirate: 'Abu Dhabi',
        emirateAr: 'أبوظبي',
        address: '',
        addressAr: '',
        amendmentDate: '',
        licenseNo: ''
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
            hasRepresentative: false,
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
            hasRepresentative: false,
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

interface LLCAmendmentMOAStore {
    data: LLCAmendmentMOAData
    updateCompany: (field: keyof LLCAmendmentMOAData['company'], value: string) => void
    updatePartner: (index: number, field: string, value: any) => void
    updatePartnerRepresentative: (index: number, field: string, value: any) => void
    togglePartnerRepresentative: (index: number) => void
    updateManager: (field: string, value: any) => void
    updateCapital: (field: keyof LLCAmendmentMOAData['capital'], value: number) => void
    updateActivities: (activities: Activity[]) => void
    updateManagingDirectorPowers: (partial: Partial<POASections>) => void
    resetData: () => void
    loadSampleData: () => void
    saveToCache: () => void
    initializeFromCache: () => void
}

export const useLLCAmendmentMoaStore = create<LLCAmendmentMOAStore>((set, get) => ({
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

    updatePartnerRepresentative: (index, field, value) => {
        set((state) => {
            const newPartners = [...state.data.partners]
            newPartners[index] = {
                ...newPartners[index],
                representative: {
                    ...newPartners[index].representative,
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

    togglePartnerRepresentative: (index) => {
        set((state) => {
            const newPartners = [...state.data.partners]
            newPartners[index] = {
                ...newPartners[index],
                hasRepresentative: !newPartners[index].hasRepresentative
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
        set((state) => ({
            data: {
                ...state.data,
                capital: {
                    ...state.data.capital,
                    [field]: value
                }
            }
        }))
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

    updateManagingDirectorPowers: (partial) => {
        set((state) => ({
            data: {
                ...state.data,
                managingDirectorPowers: {
                    ...state.data.managingDirectorPowers,
                    ...partial
                }
            }
        }))
        get().saveToCache()
    },

    resetData: () => {
        set({ data: getDefaultData() })
        localStorage.removeItem(CACHE_KEY)
    },

    loadSampleData: () => {
        set({ data: sampleLLCAmendmentMOAData })
        get().saveToCache()
    },

    saveToCache: () => {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(get().data))
        } catch (error) {
            console.error('Failed to save to cache:', error)
        }
    },

    initializeFromCache: () => {
        try {
            const cached = localStorage.getItem(CACHE_KEY)
            if (cached) {
                const parsedData = JSON.parse(cached)
                set({ data: { ...getDefaultData(), ...parsedData } })
            }
        } catch (error) {
            console.error('Failed to load from cache:', error)
        }
    }
}))
