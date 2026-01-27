# Supabase SQL Scripts

SQL scripts for setting up the Supabase database and storage for document templates.

## 📝 Usage

1. Open Supabase Dashboard → SQL Editor
2. Copy and paste the SQL from the desired file
3. Run the query
4. Verify the results

## 📁 Available Scripts

### 01_create_bucket_policies.sql
Sets up storage bucket policies for the `document-templates` bucket.

**When to run:** After creating the storage bucket in the dashboard.

**What it does:**
- Creates SELECT policy (read templates)
- Creates INSERT policy (save templates)
- Creates DELETE policy (delete templates)
- Includes verification query

**Safe to run multiple times:** Yes (uses IF NOT EXISTS checks)

## 🔄 Running Scripts

### Via Supabase Dashboard (Recommended)

1. Go to: https://app.supabase.com/project/gitdffpbljsvqawfyhqg/sql
2. Click "New query"
3. Copy SQL from the file
4. Paste and run
5. Check results

### Via Supabase CLI (Advanced)

```bash
supabase db execute --file supabase/sql/01_create_bucket_policies.sql
```

## ✅ Verification Queries

### Check bucket exists:
```sql
SELECT name, public FROM storage.buckets WHERE name = 'document-templates';
```

### Check all policies:
```sql
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects' 
AND qual LIKE '%document-templates%'
ORDER BY policyname;
```

### Check templates in storage:
```sql
SELECT name, created_at, metadata 
FROM storage.objects 
WHERE bucket_id = 'document-templates'
ORDER BY created_at DESC
LIMIT 10;
```

## 🆕 Adding New Scripts

When adding new SQL scripts:

1. Name them with a number prefix: `02_script_name.sql`, `03_script_name.sql`, etc.
2. Add a description in `00_setup_instructions.md`
3. Include verification queries at the end
4. Use `IF NOT EXISTS` checks where possible
5. Add comments explaining what each script does

## 📚 Related Documentation

- `../QUICK_START_SUPABASE.md` - Quick setup guide
- `../SUPABASE_SETUP.md` - Detailed setup instructions
- `../SUPABASE_VERIFY_SETUP.md` - Verification and troubleshooting
