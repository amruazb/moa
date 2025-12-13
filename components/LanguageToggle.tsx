'use client'

import { useDocumentStore } from '@/store/documentStore'
import { Globe } from 'lucide-react'

export const LanguageToggle = () => {
  const { language, setLanguage } = useDocumentStore()

  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-300 ${
          language === 'en'
            ? 'bg-primary-500 text-white border-primary-500'
            : 'bg-white text-primary-500 border-primary-500 hover:bg-primary-50'
        }`}
      >
        <Globe className="w-4 h-4" />
        English
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-300 ${
          language === 'ar'
            ? 'bg-primary-500 text-white border-primary-500'
            : 'bg-white text-primary-500 border-primary-500 hover:bg-primary-50'
        }`}
      >
        <Globe className="w-4 h-4" />
        العربية
      </button>
    </div>
  )
}

