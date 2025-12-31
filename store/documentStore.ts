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
    managerDocType?: 'eid' | 'passport'
  }
}

interface DocumentStore {
  extractedData: DocumentData
  isProcessing: boolean
  setExtractedData: (data: Partial<DocumentData>) => void
  setProcessing: (v: boolean) => void
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  extractedData: sampleSpcFilled,
  isProcessing: false,
  setExtractedData: (data) => set((state) => ({ extractedData: { ...state.extractedData, ...data } })),
  setProcessing: (v) => set({ isProcessing: v })
}))
