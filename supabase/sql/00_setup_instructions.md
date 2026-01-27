# Supabase SQL Setup Scripts

This folder contains SQL scripts for setting up your Supabase database and storage for the document template system.

## 📋 Setup Order

Run these scripts in order:

1. **01_create_bucket_policies.sql** - Sets up storage bucket policies (run after creating the bucket)

## 🚀 Quick Setup

### Step 1: Create Storage Bucket (via Dashboard)

1. Go to Supabase Dashboard → Storage
2. Click "New bucket"
3. Name: `document-templates`
4. Check "Public bucket"
5. Click "Create bucket"

### Step 2: Run SQL Scripts

1. Open Supabase SQL Editor
2. Run `01_create_bucket_policies.sql`
3. Verify policies were created (the script includes a verification query)

## 📁 Files

- `00_setup_instructions.md` - This file
- `01_create_bucket_policies.sql` - Storage bucket policies setup

## ✅ Verification

After running the scripts, verify setup:

```sql
-- Check bucket exists
SELECT * FROM storage.buckets WHERE name = 'document-templates';

-- Check policies exist
SELECT policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects' 
AND qual LIKE '%document-templates%';
```

You should see:
- `document-templates` bucket
- 3 policies: Public read access, Public insert, Public delete

## 🔧 Troubleshooting

### Policy already exists
- The scripts use `IF NOT EXISTS` checks, so they're safe to run multiple times
- If you see "already exists" errors, that's fine - the policies are already set up

### Bucket not found
- Make sure you created the bucket via the dashboard first
- Verify bucket name is exactly `document-templates`

### Permission errors
- Ensure bucket is set to "Public" in dashboard
- Verify all three policies exist (SELECT, INSERT, DELETE)
