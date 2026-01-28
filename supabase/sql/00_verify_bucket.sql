-- Verify Storage Bucket Exists
-- Run this query to check if the document-templates bucket exists

SELECT 
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types,
    created_at,
    updated_at
FROM storage.buckets 
WHERE name = 'document-templates';

-- If this returns no rows, the bucket doesn't exist and needs to be created via the dashboard
-- Go to: Storage → New bucket → Name: document-templates → Public: Yes → Create
