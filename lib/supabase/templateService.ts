// Template Service for Saving/Loading Documents from Supabase Storage
import { supabase, DocumentType, Template, TemplateMetadata } from './client'

const BUCKET_NAME = 'document-templates'

/**
 * Save a document template to Supabase Storage
 */
export async function saveTemplate(
  documentType: DocumentType,
  name: string,
  data: any,
  description?: string
): Promise<{ success: boolean; error?: string; templateId?: string }> {
  try {
    // Create template object
    const template: Template = {
      name,
      documentType,
      data,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Generate filename: documentType/timestamp-name.json
    const timestamp = Date.now()
    const sanitizedName = name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const filename = `${documentType}/${timestamp}-${sanitizedName}.json`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, JSON.stringify(template), {
        contentType: 'application/json',
        upsert: false,
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      return { success: false, error: uploadError.message }
    }

    // Get public URL (optional, for reference)
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename)

    return {
      success: true,
      templateId: uploadData.path,
    }
  } catch (error: any) {
    console.error('Error saving template:', error)
    return { success: false, error: error.message || 'Failed to save template' }
  }
}

/**
 * List all templates for a specific document type
 */
export async function listTemplates(
  documentType: DocumentType
): Promise<{ success: boolean; templates?: TemplateMetadata[]; error?: string }> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(documentType, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) {
      console.error('Supabase list error:', error)
      return { success: false, error: error.message }
    }

    // Parse template metadata from filenames and fetch data
    const templates: TemplateMetadata[] = await Promise.all(
      (data || []).map(async (file) => {
        // Fetch the file to get metadata
        const { data: fileData, error: fetchError } = await supabase.storage
          .from(BUCKET_NAME)
          .download(`${documentType}/${file.name}`)

        if (fetchError || !fileData) {
          return null
        }

        const text = await fileData.text()
        const template: Template = JSON.parse(text)

        return {
          id: `${documentType}/${file.name}`,
          name: template.name,
          documentType: template.documentType,
          createdAt: template.createdAt || file.created_at,
          updatedAt: template.updatedAt || file.updated_at,
          description: template.description,
        }
      })
    )

    return {
      success: true,
      templates: templates.filter((t): t is TemplateMetadata => t !== null),
    }
  } catch (error: any) {
    console.error('Error listing templates:', error)
    return { success: false, error: error.message || 'Failed to list templates' }
  }
}

/**
 * Load a specific template by ID
 */
export async function loadTemplate(
  templateId: string
): Promise<{ success: boolean; template?: Template; error?: string }> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(templateId)

    if (error) {
      console.error('Supabase download error:', error)
      return { success: false, error: error.message }
    }

    const text = await data.text()
    const template: Template = JSON.parse(text)

    return {
      success: true,
      template,
    }
  } catch (error: any) {
    console.error('Error loading template:', error)
    return { success: false, error: error.message || 'Failed to load template' }
  }
}

/**
 * Delete a template
 */
export async function deleteTemplate(
  templateId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([templateId])

    if (error) {
      console.error('Supabase delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error deleting template:', error)
    return { success: false, error: error.message || 'Failed to delete template' }
  }
}
