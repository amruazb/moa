# Quick Start: Supabase Template Storage

## ✅ Credentials Configured

Your Supabase credentials have been added to `.env.local`. 

**Project URL**: `https://gitdffpbljsvqawfyhqg.supabase.co`

## 🚀 Next Steps

### Step 1: Create the Storage Bucket

1. Go to your Supabase dashboard: https://app.supabase.com/project/gitdffpbljsvqawfyhqg
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Configure:
   - **Name**: `document-templates` (exactly this name)
   - **Public bucket**: ✅ **Check this** (important!)
   - **File size limit**: 5 MB (or leave default)
   - **Allowed MIME types**: Leave empty (or add `application/json`)
5. Click **"Create bucket"**

### Step 2: Set Up Public Access (Important!)

Since templates should be accessible, make the bucket public:

1. Go to **Storage** → **Policies**
2. Select the `document-templates` bucket
3. Click **"New Policy"**
4. Create a policy for **SELECT** (read access):
   - Policy name: `Public read access`
   - Allowed operation: `SELECT`
   - Policy definition:
     ```sql
     bucket_id = 'document-templates'
     ```
5. Save the policy

**OR** use the SQL Editor (safe version - won't error if policies exist):

See `supabase/sql/01_create_bucket_policies.sql` for the complete script.

```sql
-- Allow public read access to templates (only creates if doesn't exist)
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
```

**✅ If you see "policy already exists" error**: That's fine! The policies are already set up. Skip this step and proceed to testing.

### Step 3: Restart Your Dev Server

After creating the bucket, restart your Next.js dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
# or
pnpm dev
```

### Step 4: Test the Integration

1. Navigate to `/poa` page
2. Fill in some POA data
3. Click **"Save Template"**
4. Enter a template name (e.g., "Test Template")
5. Click **"Save"**
6. You should see a success message
7. Click **"Load Template"** to see your saved template

## 🔍 Troubleshooting

### "Failed to save template"
- ✅ Check that bucket name is exactly `document-templates`
- ✅ Verify bucket is set to **Public**
- ✅ Check browser console for detailed error messages
- ✅ Verify `.env.local` file exists and has correct values

### "Supabase environment variables are not set"
- ✅ Make sure `.env.local` file exists in project root
- ✅ Restart your dev server after creating `.env.local`
- ✅ Check that variable names start with `NEXT_PUBLIC_`

### Templates not showing in list
- ✅ Check Supabase Storage dashboard to see if files were uploaded
- ✅ Verify bucket policies allow SELECT operation
- ✅ Check browser console for errors

## 📁 File Structure

Templates will be stored as:
```
document-templates/
  ├── poa/
  │   ├── 1234567890-template-name.json
  │   └── 1234567891-another-template.json
  ├── llc-moa/
  ├── llc-amendment-moa/
  ├── llc-new-moa/
  └── llc-to-spc/
```

## 🎯 What's Already Done

- ✅ Supabase client configured
- ✅ Template service created (save/load/delete)
- ✅ TemplateManager UI component created
- ✅ POA workspace integrated
- ✅ Environment variables configured

## 📝 Next: Integrate into Other Document Types

See `TEMPLATE_INTEGRATION_GUIDE.md` for instructions on adding TemplateManager to:
- LLC MOA
- LLC Amendment MOA
- LLC New MOA
- LLC to SPC

## 🔒 Security Note

The `.env.local` file is already in `.gitignore`, so your credentials won't be committed to git. Keep this file secure and never share it publicly.
