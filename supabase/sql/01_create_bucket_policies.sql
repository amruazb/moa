-- Storage Bucket Policies for Document Templates
-- This file sets up the necessary policies for the document-templates bucket
-- Run this after creating the bucket in Supabase Storage

-- Allow public read access (for loading templates)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public read access'
    ) THEN
        CREATE POLICY "Public read access" ON storage.objects
        FOR SELECT USING (bucket_id = 'document-templates');
    END IF;
END $$;

-- Allow public insert (for saving templates)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public insert'
    ) THEN
        CREATE POLICY "Public insert" ON storage.objects
        FOR INSERT WITH CHECK (bucket_id = 'document-templates');
    END IF;
END $$;

-- Allow public delete (for deleting templates)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public delete'
    ) THEN
        CREATE POLICY "Public delete" ON storage.objects
        FOR DELETE USING (bucket_id = 'document-templates');
    END IF;
END $$;

-- Verify all policies exist
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects' 
AND (policyname LIKE '%Public%' OR qual LIKE '%document-templates%')
ORDER BY policyname;
