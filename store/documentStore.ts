import { create } from 'zustand'
import { sampleSpcFilled } from '@/lib/sampleData'

export interface CompanyData {
  name?: string
  nameAr?: string
  newName?: string
  newNameAr?: string
  licenseNumber?: string
  moaDate?: string
  activities?: string
  activitiesAr?: string
  address?: string
  addressAr?: string
  emirate?: string
  emirateAr?: string
  notarizationNumber?: string
  notarizationDate?: string
  registrationDate?: string
}

export interface PartyData {
  name?: string
  nameAr?: string
  eidNumber?: string
  passportNumber?: string
  dob?: string
  nationality?: string
  nationalityAr?: string
  address?: string
  addressAr?: string
  capacity?: string
  capacityAr?: string
  documentType?: 'eid' | 'passport'
  expiryDate?: string
}

export interface CapitalData {
  totalCapital?: number
  shareCount?: number
  shareValue?: number
}

export interface DocumentData {
  company?: CompanyData
  sourceParties?: PartyData[]
  destinationParties?: PartyData[]
  shares?: { source: number[]; destination: number[] }
  oldMoa?: { notarizationNumber?: string; notarizationDate?: string; originalShares?: number[] }
  managerArticle?: {
    managerName?: string
    managerNameAr?: string
    managerNationality?: string
    managerNationalityAr?: string
    managerIdNumber?: string
    managerDob?: string
    managerDocType?: 'eid' | 'passport'
  }
  capital?: CapitalData
}

interface DocumentStore {
  extractedData: DocumentData
  isProcessing: boolean
  setExtractedData: (data: Partial<DocumentData>) => void
  setProcessing: (v: boolean) => void
  initializeFromCache: () => void
  clearCache: () => void
  resetToDefault: () => void
}

// Cache key for storing document data
const DOCUMENT_CACHE_KEY = 'moa_document_data'

// Function to save data to cache
const saveToCache = (data: DocumentData) => {
  try {
    localStorage.setItem(DOCUMENT_CACHE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save to cache:', error)
  }
}

// Function to load data from cache
const loadFromCache = (): DocumentData | null => {
  try {
    const cached = localStorage.getItem(DOCUMENT_CACHE_KEY)
    return cached ? JSON.parse(cached) : null
  } catch (error) {
    console.error('Failed to load from cache:', error)
    return null
  }
}

// Function to clear cache
const clearCache = () => {
  try {
    localStorage.removeItem(DOCUMENT_CACHE_KEY)
  } catch (error) {
    console.error('Failed to clear cache:', error)
  }
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  extractedData: loadFromCache() || sampleSpcFilled,
  isProcessing: false,
  setExtractedData: (data) => {
    const newState = { ...get().extractedData, ...data }
    set({ extractedData: newState })
    // Save to cache after updating state
    saveToCache(newState)
  },
  setProcessing: (v) => set({ isProcessing: v }),
  initializeFromCache: () => {
    const cachedData = loadFromCache()
    if (cachedData) {
      set({ extractedData: cachedData })
    }
  },
  clearCache: () => {
    clearCache()
    // Reset to default after clearing cache
    set({ extractedData: sampleSpcFilled })
  },
  resetToDefault: () => {
    set({ extractedData: sampleSpcFilled })
    // Also clear the cache to match the reset
    clearCache()
  }
}))
