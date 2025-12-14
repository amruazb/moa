import { create } from 'zustand'
import { ConversionType, ValidationError } from '@/lib/validation'

export interface CompanyData {
  name: string
  nameAr?: string
  newName: string
  licenseNumber: string
  moaDate: string
}

export interface PartyData {
  name: string
  nameAr?: string
  eidNumber: string
  dob: string
  nationality: string
  nationalityAr?: string
  // New fields for Passport support
  documentType?: 'eid' | 'passport'
  expiryDate?: string
}

export interface OldMoaData {
  notarizationNumber: string
  notarizationDate: string
  originalShares: number[] // Dynamic array for original shares
}

export interface ShareDistribution {
  source: number[]      // Share percentages for each source party
  destination: number[] // Share percentages for each destination party
}

export interface DocumentData {
  company: CompanyData
  sourceParties: PartyData[]      // Parties transferring shares (from entity)
  destinationParties: PartyData[] // Parties receiving shares (to entity)
  oldMoa: OldMoaData
  shares: ShareDistribution
}

export interface DocumentStore {
  // Language
  language: 'en' | 'ar'
  setLanguage: (lang: 'en' | 'ar') => void

  // Conversion type
  conversionType: ConversionType
  setConversionType: (type: ConversionType) => void

  // Document data
  extractedData: DocumentData
  setExtractedData: (data: Partial<DocumentData>) => void

  // Uploaded files
  uploadedFiles: {
    oldMoa: File | null
    tradeLicense: File | null
    partyEids: { [key: string]: File } // Dynamic party EID uploads: 'source-0', 'source-1', 'dest-0', etc.
  }
  setUploadedFile: (type: 'oldMoa' | 'tradeLicense', file: File | null) => void
  setPartyEidFile: (partyType: 'source' | 'destination', index: number, file: File | null) => void

  // Processing state
  isProcessing: boolean
  setProcessing: (processing: boolean) => void

  // Validation
  validationErrors: ValidationError[]
  setValidationErrors: (errors: ValidationError[]) => void
  clearValidationError: (field: string) => void

  // Preview
  autoPreview: boolean
  setAutoPreview: (enabled: boolean) => void

  // Reset
  resetStore: () => void
}

const initialData: DocumentData = {
  company: {
    name: '',
    newName: '',
    licenseNumber: '',
    moaDate: new Date().toISOString().split('T')[0]
  },
  sourceParties: [
    {
      name: '',
      eidNumber: '',
      dob: '',
      nationality: ''
    }
  ],
  destinationParties: [
    {
      name: '',
      eidNumber: '',
      dob: '',
      nationality: ''
    },
    {
      name: '',
      eidNumber: '',
      dob: '',
      nationality: ''
    }
  ],
  oldMoa: {
    notarizationNumber: '',
    notarizationDate: '',
    originalShares: [100]
  },
  shares: {
    source: [100],
    destination: [50, 50]
  }
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  // Language
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),

  // Conversion type
  conversionType: 'SPC_TO_LLC',
  setConversionType: (type) => set({ conversionType: type }),

  // Document data
  extractedData: initialData,
  setExtractedData: (data) => set((state) => ({
    extractedData: { ...state.extractedData, ...data }
  })),

  // Uploaded files
  uploadedFiles: {
    oldMoa: null,
    tradeLicense: null,
    partyEids: {}
  },
  setUploadedFile: (type, file) => set((state) => ({
    uploadedFiles: { ...state.uploadedFiles, [type]: file }
  })),
  setPartyEidFile: (partyType, index, file) => set((state) => {
    const key = `${partyType}-${index}`
    const newPartyEids = { ...state.uploadedFiles.partyEids }
    if (file) {
      newPartyEids[key] = file
    } else {
      delete newPartyEids[key]
    }
    return {
      uploadedFiles: { ...state.uploadedFiles, partyEids: newPartyEids }
    }
  }),

  // Processing state
  isProcessing: false,
  setProcessing: (processing) => set({ isProcessing: processing }),

  // Validation
  validationErrors: [],
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  clearValidationError: (field) => set((state) => ({
    validationErrors: state.validationErrors.filter(err => err.field !== field)
  })),

  // Preview
  autoPreview: true,
  setAutoPreview: (enabled) => set({ autoPreview: enabled }),

  // Reset
  resetStore: () => set({
    conversionType: 'SPC_TO_LLC',
    extractedData: initialData,
    uploadedFiles: {
      oldMoa: null,
      tradeLicense: null,
      partyEids: {}
    },
    isProcessing: false,
    validationErrors: [],
    autoPreview: true
  })
}))
