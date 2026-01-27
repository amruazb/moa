# Verify Supabase Setup

## ✅ Check if Policies Already Exist

If you see the error "policy already exists", that means the policies are already set up! You can verify this:

### Option 1: Check in Supabase Dashboard

1. Go to **Storage** → **Policies**
2. Select the `document-templates` bucket
3. You should see policies like:
   - "Public read access" (SELECT)
   - "Public insert" (INSERT) - if created
   - "Public delete" (DELETE) - if created

### Option 2: Check via SQL

Run this in the SQL Editor to see existing policies:

```sql
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%document-templates%' 
OR policyname LIKE '%Public%';
```

## ✅ Verify Bucket Exists

1. Go to **Storage** → **Buckets**
2. You should see `document-templates` bucket
3. Check that it's marked as **Public** (green indicator)

## ✅ Test the Setup

1. Restart your dev server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. Go to `/poa` page
3. Fill in some data
4. Click **"Save Template"**
5. If it works, you're all set! ✅

## 🔧 If Policies Are Missing

If you need to create policies but they already exist, you can:

### Option 1: Drop and Recreate (if needed)

```sql
-- Drop existing policies (if you need to recreate them)
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Public insert" ON storage.objects;
DROP POLICY IF EXISTS "Public delete" ON storage.objects;

-- Then create them again
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'document-templates');

CREATE POLICY "Public insert" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'document-templates');

CREATE POLICY "Public delete" ON storage.objects
FOR DELETE USING (bucket_id = 'document-templates');
```

### Option 2: Use IF NOT EXISTS (PostgreSQL 9.5+)

```sql
-- This won't error if policy already exists
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
```

## 🎯 Quick Test Checklist

- [ ] Bucket `document-templates` exists
- [ ] Bucket is marked as **Public**
- [ ] At least one policy exists (SELECT)
- [ ] `.env.local` file has correct credentials
- [ ] Dev server restarted after creating `.env.local`
- [ ] Can save a template without errors
- [ ] Can load saved templates

## 🐛 Common Issues

### "Policy already exists" Error
✅ **This is fine!** The policy is already set up. Skip that step and test saving a template.

### "Bucket not found" Error
- Check bucket name is exactly `document-templates`
- Verify bucket exists in Storage dashboard

### "Permission denied" Error
- Verify bucket is set to **Public**
- Check that SELECT policy exists
- Verify INSERT policy exists (for saving)

### Templates save but don't show in list
- Check that SELECT policy exists
- Verify the bucket is public
- Check browser console for errors
