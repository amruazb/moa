// Template Service for Saving/Loading Documents from Supabase Storage
import { supabase, isSupabaseConfigured, getSupabaseSetupHint, DocumentType, Template, TemplateMetadata } from './client'
import { formatSupabaseError } from './health'

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
    const setupHint = getSupabaseSetupHint()
    if (!isSupabaseConfigured || setupHint) {
      return { success: false, error: setupHint ?? 'Supabase is not configured. Check .env.local and restart the dev server.' }
    }

    // Create template object
    const template: Template = {
      name,
      documentType,
      data,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const json = JSON.stringify(template)
    if (json.length > 4_500_000) {
      return {
        success: false,
        error: 'Template is too large to upload (logo image may be very large). Try a smaller logo or remove it before saving.',
      }
    }

    // Generate filename: documentType/timestamp-name.json
    const timestamp = Date.now()
    const sanitizedName = name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const filename = `${documentType}/${timestamp}-${sanitizedName}.json`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, json, {
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
  } catch (error: unknown) {
    console.error('Error saving template:', error)
    return { success: false, error: formatSupabaseError(error) }
  }
}

/**
 * List all templates for a specific document type
 */
export async function listTemplates(
  documentType: DocumentType
): Promise<{ success: boolean; templates?: TemplateMetadata[]; error?: string }> {
  try {
    const setupHint = getSupabaseSetupHint()
    if (!isSupabaseConfigured || setupHint) {
      return { success: false, error: setupHint ?? 'Supabase is not configured.' }
    }

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
    const templates = await Promise.all(
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

        const meta: TemplateMetadata = {
          id: `${documentType}/${file.name}`,
          name: template.name,
          documentType: template.documentType,
          createdAt: template.createdAt || file.created_at,
          updatedAt: template.updatedAt || file.updated_at,
          description: template.description,
        }
        return meta
      })
    )

    return {
      success: true,
      templates: templates.filter((t): t is TemplateMetadata => t !== null),
    }
  } catch (error: unknown) {
    console.error('Error listing templates:', error)
    return { success: false, error: formatSupabaseError(error) }
  }
}

/**
 * Load a specific template by ID
 */
export async function loadTemplate(
  templateId: string
): Promise<{ success: boolean; template?: Template; error?: string }> {
  try {
    const setupHint = getSupabaseSetupHint()
    if (!isSupabaseConfigured || setupHint) {
      return { success: false, error: setupHint ?? 'Supabase is not configured.' }
    }

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
  } catch (error: unknown) {
    console.error('Error loading template:', error)
    return { success: false, error: formatSupabaseError(error) }
  }
}

/**
 * Update (overwrite) an existing template in place
 */
export async function updateTemplate(
  templateId: string,
  name: string,
  data: any,
  description?: string,
  originalCreatedAt?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const setupHint = getSupabaseSetupHint()
    if (!isSupabaseConfigured || setupHint) {
      return { success: false, error: setupHint ?? 'Supabase is not configured.' }
    }

    // Derive documentType from the templateId path (first segment)
    const documentType = templateId.split('/')[0] as DocumentType

    const template: Template = {
      name,
      documentType,
      data,
      description,
      createdAt: originalCreatedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(templateId, JSON.stringify(template), {
        contentType: 'application/json',
        upsert: true,
      })

    if (uploadError) {
      console.error('Supabase update error:', uploadError)
      return { success: false, error: uploadError.message }
    }

    return { success: true }
  } catch (error: unknown) {
    console.error('Error updating template:', error)
    return { success: false, error: formatSupabaseError(error) }
  }
}

/**
 * Delete a template
 */
export async function deleteTemplate(
  templateId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const setupHint = getSupabaseSetupHint()
    if (!isSupabaseConfigured || setupHint) {
      return { success: false, error: setupHint ?? 'Supabase is not configured.' }
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([templateId])

    if (error) {
      console.error('Supabase delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: unknown) {
    console.error('Error deleting template:', error)
    return { success: false, error: formatSupabaseError(error) }
  }
}
