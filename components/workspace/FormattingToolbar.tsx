'use client'

import { useEffect } from 'react'
import { useFormattingStore, ENGLISH_FONTS, ARABIC_FONTS, FONT_SIZES } from '@/store/formattingStore'

export function FormattingToolbar() {
  const { settings, setSettings, resetToDefault, initializeFromCache } = useFormattingStore()

  useEffect(() => {
    initializeFromCache()
  }, [initializeFromCache])

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <h3 className="text-sm font-semibold text-gray-900">Formatting Options</h3>
        </div>
        <button
          onClick={resetToDefault}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* English Font */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">English Font</label>
          <select
            value={settings.englishFont}
            onChange={(e) => setSettings({ englishFont: e.target.value })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {ENGLISH_FONTS.map((font) => (
              <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Arabic Font */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Arabic Font</label>
          <select
            value={settings.arabicFont}
            onChange={(e) => setSettings({ arabicFont: e.target.value })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            dir="rtl"
          >
            {ARABIC_FONTS.map((font) => (
              <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Font Size</label>
          <div className="flex gap-1">
            {FONT_SIZES.map((size) => (
              <button
                key={size.value}
                onClick={() => setSettings({ baseFontSize: size.value })}
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg transition ${
                  settings.baseFontSize === size.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bold Edited Fields */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Edited Text Style</label>
          <button
            onClick={() => setSettings({ boldEditedFields: !settings.boldEditedFields })}
            className={`w-full px-3 py-1.5 text-sm font-medium rounded-lg transition flex items-center justify-center gap-2 ${
              settings.boldEditedFields
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="font-bold">B</span>
            <span>{settings.boldEditedFields ? 'Bold Enabled' : 'Normal'}</span>
          </button>
        </div>
      </div>

      {/* Column Ratio Slider */}
      <div className="mt-4">
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Column Balance: {Math.round((1 - settings.columnRatio) * 100)}% Arabic / {Math.round(settings.columnRatio * 100)}% English
        </label>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">العربية</span>
          <input
            type="range"
            min="0.35"
            max="0.65"
            step="0.05"
            value={settings.columnRatio}
            onChange={(e) => setSettings({ columnRatio: parseFloat(e.target.value) })}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-xs text-gray-500">English</span>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Preview:</p>
        <div className="flex gap-4">
          <p 
            style={{ 
              fontFamily: settings.englishFont, 
              fontSize: FONT_SIZES.find(s => s.value === settings.baseFontSize)?.basePt + 'pt',
              fontWeight: settings.boldEditedFields ? 700 : 400
            }}
          >
            English Sample Text
          </p>
          <p 
            dir="rtl"
            style={{ 
              fontFamily: settings.arabicFont, 
              fontSize: FONT_SIZES.find(s => s.value === settings.baseFontSize)?.basePt + 'pt',
              fontWeight: settings.boldEditedFields ? 700 : 400
            }}
          >
            نص عربي للمعاينة
          </p>
        </div>
      </div>
    </div>
  )
}
