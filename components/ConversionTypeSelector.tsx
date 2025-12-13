'use client'

import { useDocumentStore } from '@/store/documentStore'
import { CONVERSION_TYPES, ConversionType } from '@/lib/validation'
import { ArrowRight, Building2, Users, User } from 'lucide-react'

export const ConversionTypeSelector = () => {
    const { language, conversionType, setConversionType } = useDocumentStore()

    const conversionOptions = Object.values(CONVERSION_TYPES)

    const getEntityIcon = (entityType: string) => {
        switch (entityType) {
            case 'LLC':
                return <Users className="w-6 h-6" />
            case 'SPC':
                return <User className="w-6 h-6" />
            case 'EST':
                return <Building2 className="w-6 h-6" />
            default:
                return <Building2 className="w-6 h-6" />
        }
    }

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'ar' ? 'نوع التحويل' : 'Conversion Type'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {conversionOptions.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => setConversionType(option.id)}
                        className={`
              relative p-5 rounded-lg border-2 transition-all duration-200
              ${conversionType === option.id
                                ? 'border-primary-500 bg-primary-50 shadow-md'
                                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
                            }
            `}
                    >
                        {/* Selection indicator */}
                        {conversionType === option.id && (
                            <div className="absolute top-3 right-3 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                        )}

                        {/* Conversion visualization */}
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${conversionType === option.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}>
                                {getEntityIcon(option.from)}
                            </div>
                            <ArrowRight className={`w-5 h-5 ${conversionType === option.id ? 'text-primary-500' : 'text-gray-400'}`} />
                            <div className={`p-2 rounded-lg ${conversionType === option.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}>
                                {getEntityIcon(option.to)}
                            </div>
                        </div>

                        {/* Label */}
                        <div className="text-center">
                            <h3 className={`font-semibold mb-1 ${conversionType === option.id ? 'text-primary-700' : 'text-gray-800'}`}>
                                {option.label[language]}
                            </h3>
                            <p className={`text-xs ${conversionType === option.id ? 'text-primary-600' : 'text-gray-500'}`}>
                                {option.description[language] === option.label[language]
                                    ? `${option.from} → ${option.to}`
                                    : option.description[language]
                                }
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Info box */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    {language === 'ar'
                        ? `تم اختيار: ${CONVERSION_TYPES[conversionType].label.ar}`
                        : `Selected: ${CONVERSION_TYPES[conversionType].label.en}`
                    }
                </p>
            </div>
        </div>
    )
}
