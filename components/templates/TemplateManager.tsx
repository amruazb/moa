'use client'

import { useState, useEffect } from 'react'
import { DocumentType, TemplateMetadata } from '@/lib/supabase/client'
import { listTemplates, saveTemplate, loadTemplate, deleteTemplate } from '@/lib/supabase/templateService'
import { Save, FolderOpen, Trash2, X, Loader2 } from 'lucide-react'

interface TemplateManagerProps {
  documentType: DocumentType
  currentData: any
  onLoadTemplate: (data: any) => void
  disabled?: boolean
}

export function TemplateManager({
  documentType,
  currentData,
  onLoadTemplate,
  disabled = false,
}: TemplateManagerProps) {
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')
  const [templates, setTemplates] = useState<TemplateMetadata[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Load templates when modal opens
  useEffect(() => {
    if (showLoadModal) {
      loadTemplates()
    }
  }, [showLoadModal, documentType])

  const loadTemplates = async () => {
    setLoading(true)
    setError(null)
    const result = await listTemplates(documentType)
    if (result.success && result.templates) {
      setTemplates(result.templates)
    } else {
      setError(result.error || 'Failed to load templates')
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (!templateName.trim()) {
      setError('Template name is required')
      return
    }

    setSaving(true)
    setError(null)
    setSuccess(null)

    const result = await saveTemplate(documentType, templateName.trim(), currentData, templateDescription.trim() || undefined)

    if (result.success) {
      setSuccess('Template saved successfully!')
      setTemplateName('')
      setTemplateDescription('')
      setTimeout(() => {
        setShowSaveModal(false)
        setSuccess(null)
      }, 1500)
    } else {
      setError(result.error || 'Failed to save template')
    }

    setSaving(false)
  }

  const handleLoad = async (templateId: string) => {
    setLoading(true)
    setError(null)

    const result = await loadTemplate(templateId)
    if (result.success && result.template) {
      onLoadTemplate(result.template.data)
      setShowLoadModal(false)
      setSuccess('Template loaded successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } else {
      setError(result.error || 'Failed to load template')
    }

    setLoading(false)
  }

  const handleDelete = async (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to delete this template?')) return

    setLoading(true)
    setError(null)

    const result = await deleteTemplate(templateId)
    if (result.success) {
      await loadTemplates()
      setSuccess('Template deleted successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } else {
      setError(result.error || 'Failed to delete template')
    }

    setLoading(false)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSaveModal(true)}
          disabled={disabled}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Save className="w-4 h-4" />
          Save Template
        </button>
        <button
          onClick={() => setShowLoadModal(true)}
          disabled={disabled}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <FolderOpen className="w-4 h-4" />
          Load Template
        </button>
      </div>

      {/* Success/Error Messages */}
      {(success || error) && (
        <div className={`p-3 rounded-lg ${success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {success || error}
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Save Template</h2>
              <button
                onClick={() => {
                  setShowSaveModal(false)
                  setTemplateName('')
                  setTemplateDescription('')
                  setError(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name *
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., Standard POA Template"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Add a description for this template..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowSaveModal(false)
                    setTemplateName('')
                    setTemplateDescription('')
                    setError(null)
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !templateName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Load Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Load Template</h2>
              <button
                onClick={() => {
                  setShowLoadModal(false)
                  setError(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {loading && !templates.length ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            ) : templates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No templates found. Save a template first!
              </div>
            ) : (
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleLoad(template.id!)}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition relative"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        {template.description && (
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          Created: {formatDate(template.createdAt)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDelete(template.id!, e)}
                        className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete template"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
          </div>
        </div>
      )}
    </>
  )
}
