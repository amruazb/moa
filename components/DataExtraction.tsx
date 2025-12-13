'use client'

import { useState } from 'react'
import { useDocumentStore } from '@/store/documentStore'
import { PartyData } from '@/store/documentStore'
import { CONVERSION_TYPES } from '@/lib/validation'
import { Building, User, FileText, Calendar, Hash, Globe, Plus, Trash2 } from 'lucide-react'
import { DocumentUploadButton } from './DocumentUploadButton'
import toast from 'react-hot-toast'

interface DataFieldProps {
  label: string
  value: string
  placeholder: string
  onChange: (value: string) => void
  type?: 'text' | 'date' | 'number'
  icon?: React.ReactNode
}

const DataField = ({ label, value, onChange, placeholder, type = 'text', icon }: DataFieldProps) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {icon}
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
    />
  </div>
)

export const DataExtraction = () => {
  const { language, extractedData, setExtractedData, conversionType, uploadedFiles, setUploadedFile, setPartyEidFile } = useDocumentStore()
  const conversionInfo = CONVERSION_TYPES[conversionType]

  // Safe defaults
  const company = extractedData.company || { name: '', newName: '', licenseNumber: '', moaDate: new Date().toISOString().split('T')[0] }
  const sourceParties = extractedData.sourceParties || []
  const destParties = extractedData.destinationParties || []
  const oldMoa = extractedData.oldMoa || { notarizationNumber: '', notarizationDate: '', originalShares: [] }
  const shares = extractedData.shares || { source: [], destination: [] }

  const handleCompanyChange = (field: keyof typeof company, value: string) => {
    setExtractedData({
      company: { ...company, [field]: value }
    })
  }

  const handlePartyChange = (partyType: 'source' | 'destination', index: number, field: keyof PartyData, value: string) => {
    const parties = partyType === 'source' ? [...sourceParties] : [...destParties]
    parties[index] = { ...parties[index], [field]: value }
    setExtractedData({
      [partyType === 'source' ? 'sourceParties' : 'destinationParties']: parties
    })
  }

  const handleShareChange = (partyType: 'source' | 'destination', index: number, value: string) => {
    const newShares = partyType === 'source' ? [...shares.source] : [...shares.destination]
    newShares[index] = parseFloat(value) || 0
    setExtractedData({
      shares: {
        ...shares,
        [partyType]: newShares
      }
    })
  }

  const addParty = (partyType: 'source' | 'destination') => {
    const parties = partyType === 'source' ? [...sourceParties] : [...destParties]
    const currentShares = partyType === 'source' ? [...shares.source] : [...shares.destination]

    if (parties.length >= 5) {
      alert(language === 'ar' ? 'الحد الأقصى 5 أطراف' : 'Maximum 5 parties allowed')
      return
    }

    // Add new party
    parties.push({ name: '', eidNumber: '', dob: '', nationality: '' })

    // Smart share distribution: distribute equally among all parties
    const newPartyCount = parties.length
    const equalShare = Math.floor(100 / newPartyCount)
    const remainder = 100 - (equalShare * newPartyCount)

    // Create new shares array with equal distribution
    const newShares = Array(newPartyCount).fill(equalShare)
    // Add remainder to first party to ensure total is 100%
    newShares[0] += remainder

    setExtractedData({
      [partyType === 'source' ? 'sourceParties' : 'destinationParties']: parties,
      shares: {
        ...shares,
        [partyType]: newShares
      }
    })
  }

  const removeParty = (partyType: 'source' | 'destination', index: number) => {
    const parties = partyType === 'source' ? [...sourceParties] : [...destParties]
    const currentShares = partyType === 'source' ? [...shares.source] : [...shares.destination]

    if (parties.length <= 1) {
      alert(language === 'ar' ? 'يجب أن يكون هناك طرف واحد على الأقل' : 'At least one party is required')
      return
    }

    // Remove party and their share
    parties.splice(index, 1)
    currentShares.splice(index, 1)

    // Redistribute shares equally among remaining parties
    const newPartyCount = parties.length
    const equalShare = Math.floor(100 / newPartyCount)
    const remainder = 100 - (equalShare * newPartyCount)

    const redistributedShares = Array(newPartyCount).fill(equalShare)
    redistributedShares[0] += remainder

    setExtractedData({
      [partyType === 'source' ? 'sourceParties' : 'destinationParties']: parties,
      shares: {
        ...shares,
        [partyType]: redistributedShares
      }
    })
  }

  const handleOldMoaChange = (field: keyof typeof oldMoa, value: string) => {
    setExtractedData({
      oldMoa: { ...oldMoa, [field]: value }
    })
  }

  const handleCompanyExtraction = (data: any) => {
    if (data.company) {
      setExtractedData({
        company: { ...company, ...data.company }
      })
      // toast handled in button
    }
  }

  const handlePartyExtraction = (partyType: 'source' | 'destination', index: number, data: any) => {
    if (data.partyData) {
      const parties = partyType === 'source' ? [...sourceParties] : [...destParties]
      parties[index] = { ...parties[index], ...data.partyData }
      setExtractedData({
        [partyType === 'source' ? 'sourceParties' : 'destinationParties']: parties
      })
      // toast handled in button
    }
  }

  // Calculate share totals
  const sourceTotal = shares.source.reduce((sum, val) => sum + val, 0)
  const destTotal = shares.destination.reduce((sum, val) => sum + val, 0)

  // Determine if we should show source/dest based on conversion
  const shouldShowMultipleSource = conversionInfo.from === 'LLC'
  const shouldShowMultipleDest = conversionInfo.to === 'LLC'

  return (
    <div className="space-y-8">
      {/* Company Information */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Building className="w-6 h-6 text-primary-500" />
          {language === 'ar' ? 'معلومات الشركة' : 'Company Information'}
        </h2>

        <DocumentUploadButton
          type="companyLicense"
          label={language === 'ar' ? 'رفع الرخصة التجارية (للاستخراج التلقائي)' : 'Upload Trade License (Auto-Extraction)'}
          onDataExtracted={handleCompanyExtraction}
          onFileSelect={(file) => setUploadedFile('tradeLicense', file)}
          currentFile={uploadedFiles.tradeLicense}
        />

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DataField
              label={language === 'ar' ? 'اسم الشركة' : 'Company Name'}
              value={company.name}
              onChange={(value) => handleCompanyChange('name', value)}
              placeholder={language === 'ar' ? 'أدخل اسم الشركة' : 'Enter company name'}
              icon={<Building className="w-4 h-4" />}
            />
            <DataField
              label={language === 'ar' ? 'الاسم الجديد' : 'New Name'}
              value={company.newName}
              onChange={(value) => handleCompanyChange('newName', value)}
              placeholder={language === 'ar' ? 'أدخل الاسم الجديد' : 'Enter new name'}
              icon={<Building className="w-4 h-4" />}
            />
            <DataField
              label={language === 'ar' ? 'رقم الترخيص' : 'License Number'}
              value={company.licenseNumber}
              onChange={(value) => handleCompanyChange('licenseNumber', value)}
              placeholder={language === 'ar' ? 'أدخل رقم الترخيص' : 'Enter license number'}
              icon={<Hash className="w-4 h-4" />}
            />
            <DataField
              label={language === 'ar' ? 'تاريخ إعداد المذكرة' : 'MOA Preparation Date'}
              value={company.moaDate}
              onChange={(value) => handleCompanyChange('moaDate', value)}
              placeholder=""
              type="date"
              icon={<Calendar className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>

      {/* Source Parties */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <User className="w-6 h-6 text-primary-500" />
            {language === 'ar' ? `الأطراف المحولة (${conversionInfo.from})` : `Source Parties (${conversionInfo.from})`}
          </h2>
          {shouldShowMultipleSource && sourceParties.length < 5 && (
            <button
              onClick={() => addParty('source')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              <Plus className="w-4 h-4" />
              {language === 'ar' ? 'إضافة طرف' : 'Add Party'}
            </button>
          )}
        </div>

        <div className="space-y-6">
          {sourceParties.map((party, index) => (
            <div key={index} className="bg-blue-50 border border-blue-300 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-600">
                  {language === 'ar' ? `الطرف ${index + 1}` : `Party ${index + 1}`}
                </h3>
                {shouldShowMultipleSource && sourceParties.length > 1 && (
                  <button
                    onClick={() => removeParty('source', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="mb-4">
                <DocumentUploadButton
                  type="partyDocument"
                  partyIndex={index}
                  label={language === 'ar' ? 'رفع هوية/جواز سفر (للاستخراج التلقائي)' : 'Upload ID/Passport (Auto-Extraction)'}
                  onDataExtracted={(data) => handlePartyExtraction('source', index, data)}
                  onFileSelect={(file) => setPartyEidFile('source', index, file)}
                  currentFile={uploadedFiles.partyEids[`source-${index}`]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataField
                  label={language === 'ar' ? 'الاسم' : 'Name'}
                  value={party.name}
                  onChange={(value) => handlePartyChange('source', index, 'name', value)}
                  placeholder={language === 'ar' ? 'أدخل الاسم' : 'Enter name'}
                  icon={<User className="w-4 h-4" />}
                />
                <DataField
                  label={language === 'ar' ? 'رقم الهوية' : 'EID Number'}
                  value={party.eidNumber}
                  onChange={(value) => handlePartyChange('source', index, 'eidNumber', value)}
                  placeholder="784-XXXX-XXXXXXX-X"
                  icon={<Hash className="w-4 h-4" />}
                />
                <DataField
                  label={language === 'ar' ? 'تاريخ الميلاد' : 'Date of Birth'}
                  value={party.dob}
                  onChange={(value) => handlePartyChange('source', index, 'dob', value)}
                  placeholder=""
                  type="date"
                  icon={<Calendar className="w-4 h-4" />}
                />
                <DataField
                  label={language === 'ar' ? 'الجنسية' : 'Nationality'}
                  value={party.nationality}
                  onChange={(value) => handlePartyChange('source', index, 'nationality', value)}
                  placeholder={language === 'ar' ? 'مثل: الإمارات' : 'e.g., UAE'}
                  icon={<Globe className="w-4 h-4" />}
                />
                <DataField
                  label={language === 'ar' ? 'الحصة (%)' : 'Share (%)'}
                  value={shares.source[index]?.toString() || '0'}
                  onChange={(value) => handleShareChange('source', index, value)}
                  placeholder="0"
                  type="number"
                  icon={<Hash className="w-4 h-4" />}
                />
              </div>
            </div>
          ))}

          <div className={`text-sm font-medium ${sourceTotal === 100 ? 'text-green-600' : 'text-red-600'}`}>
            {language === 'ar' ? 'المجموع:' : 'Total:'} {sourceTotal}% {sourceTotal !== 100 && `(${language === 'ar' ? 'يجب أن يكون 100%' : 'Must be 100%'})`}
          </div>
        </div>
      </div>

      {/* Destination Parties */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <User className="w-6 h-6 text-primary-500" />
            {language === 'ar' ? `الأطراف المستقبلة (${conversionInfo.to})` : `Destination Parties (${conversionInfo.to})`}
          </h2>
          {shouldShowMultipleDest && destParties.length < 5 && (
            <button
              onClick={() => addParty('destination')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              <Plus className="w-4 h-4" />
              {language === 'ar' ? 'إضافة طرف' : 'Add Party'}
            </button>
          )}
        </div>

        <div className="space-y-6">
          {destParties.map((party, index) => (
            <div key={index} className="bg-green-50 border border-green-300 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-600">
                  {language === 'ar' ? `الطرف ${index + 1}` : `Party ${index + 1}`}
                </h3>
                {shouldShowMultipleDest && destParties.length > 1 && (
                  <button
                    onClick={() => removeParty('destination', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="mb-4">
                <DocumentUploadButton
                  type="partyDocument"
                  partyIndex={index}
                  label={language === 'ar' ? 'رفع هوية/جواز سفر (للاستخراج التلقائي)' : 'Upload ID/Passport (Auto-Extraction)'}
                  onDataExtracted={(data) => handlePartyExtraction('destination', index, data)}
                  onFileSelect={(file) => setPartyEidFile('destination', index, file)}
                  currentFile={uploadedFiles.partyEids[`destination-${index}`]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataField
                  label={language === 'ar' ? 'الاسم' : 'Name'}
                  value={party.name}
                  onChange={(value) => handlePartyChange('destination', index, 'name', value)}
                  placeholder={language === 'ar' ? 'أدخل الاسم' : 'Enter name'}
                  icon={<User className="w-4 h-4" />}
                />
                <DataField
                  label={language === 'ar' ? 'رقم الهوية' : 'EID Number'}
                  value={party.eidNumber}
                  onChange={(value) => handlePartyChange('destination', index, 'eidNumber', value)}
                  placeholder="784-XXXX-XXXXXXX-X"
                  icon={<Hash className="w-4 h-4" />}
                />
                <DataField
                  label={language === 'ar' ? 'تاريخ الميلاد' : 'Date of Birth'}
                  value={party.dob}
                  onChange={(value) => handlePartyChange('destination', index, 'dob', value)}
                  placeholder=""
                  type="date"
                  icon={<Calendar className="w-4 h-4" />}
                />
                <DataField
                  label={language === 'ar' ? 'الجنسية' : 'Nationality'}
                  value={party.nationality}
                  onChange={(value) => handlePartyChange('destination', index, 'nationality', value)}
                  placeholder={language === 'ar' ? 'مثل: الإمارات' : 'e.g., UAE'}
                  icon={<Globe className="w-4 h-4" />}
                />
                <DataField
                  label={language === 'ar' ? 'الحصة (%)' : 'Share (%)'}
                  value={shares.destination[index]?.toString() || '0'}
                  onChange={(value) => handleShareChange('destination', index, value)}
                  placeholder="0"
                  type="number"
                  icon={<Hash className="w-4 h-4" />}
                />
              </div>
            </div>
          ))}

          <div className={`text-sm font-medium ${destTotal === 100 ? 'text-green-600' : 'text-red-600'}`}>
            {language === 'ar' ? 'المجموع:' : 'Total:'} {destTotal}% {destTotal !== 100 && `(${language === 'ar' ? 'يجب أن يكون 100%' : 'Must be 100%'})`}
          </div>
        </div>
      </div>

      {/* Old MOA Details */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary-500" />
          {language === 'ar' ? 'تفاصيل مذكرة التأسيس القديمة' : 'Old MOA Details'}
        </h2>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DataField
              label={language === 'ar' ? 'رقم التوثيق' : 'Notarization Number'}
              value={oldMoa.notarizationNumber}
              onChange={(value) => handleOldMoaChange('notarizationNumber', value)}
              placeholder={language === 'ar' ? 'أدخل رقم التوثيق' : 'Enter notarization number'}
              icon={<Hash className="w-4 h-4" />}
            />
            <DataField
              label={language === 'ar' ? 'تاريخ التوثيق' : 'Notarization Date'}
              value={oldMoa.notarizationDate}
              onChange={(value) => handleOldMoaChange('notarizationDate', value)}
              placeholder=""
              type="date"
              icon={<Calendar className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}