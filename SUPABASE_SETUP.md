# Supabase Setup Guide for Document Templates

This guide will help you set up Supabase storage for saving and loading document templates.

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: Your project name (e.g., "MOA Document Templates")
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest region
5. Click "Create new project"
6. Wait for the project to be set up (takes 1-2 minutes)

## Step 2: Create Storage Bucket

1. In your Supabase project dashboard, go to **Storage** in the left sidebar
2. Click **"New bucket"**
3. Configure the bucket:
   - **Name**: `document-templates`
   - **Public bucket**: ✅ **Check this** (allows public access to templates)
   - **File size limit**: 5 MB (or as needed)
   - **Allowed MIME types**: `application/json` (or leave empty for all)
4. Click **"Create bucket"**

## Step 3: Set Up Bucket Policies (Optional but Recommended)

For better security, you can set up Row Level Security (RLS) policies:

1. Go to **Storage** → **Policies** → Select `document-templates` bucket
2. Click **"New Policy"**
3. Create policies for:
   - **INSERT**: Allow authenticated users to upload
   - **SELECT**: Allow public to read (since templates should be accessible)
   - **DELETE**: Allow authenticated users to delete

Or use this SQL in the SQL Editor:

```sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'document-templates');

-- Allow authenticated users to insert
CREATE POLICY "Authenticated insert" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'document-templates' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete
CREATE POLICY "Authenticated delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'document-templates' 
  AND auth.role() = 'authenticated'
);
```

## Step 4: Get Your API Keys

1. Go to **Settings** → **API** in your Supabase dashboard
2. Find these values:
   - **Project URL**: Copy this (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key**: Copy this (starts with `eyJhbGci...`)

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Important**: Restart your Next.js dev server after adding environment variables:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Step 6: Install Dependencies

```bash
npm install @supabase/supabase-js
# or
pnpm install @supabase/supabase-js
```

## Step 7: Test the Integration

1. Start your development server
2. Navigate to any document page (POA, LLC MOA, etc.)
3. Fill in some data
4. Click **"Save Template"** button
5. Enter a template name and save
6. Click **"Load Template"** to see your saved templates

## Troubleshooting

### "Supabase environment variables are not set"
- Make sure `.env.local` exists and has the correct variables
- Restart your dev server after adding environment variables
- Check that variable names start with `NEXT_PUBLIC_`

### "Failed to save template" / "Failed to load template"
- Verify your bucket name is exactly `document-templates`
- Check that the bucket is set to public
- Verify your API keys are correct
- Check browser console for detailed error messages

### Templates not showing up
- Check Supabase Storage dashboard to see if files were uploaded
- Verify the bucket name matches exactly: `document-templates`
- Check browser console for errors

## File Structure

Templates are stored in Supabase Storage with this structure:
```
document-templates/
  ├── poa/
  │   ├── 1234567890-standard-poa-template.json
  │   └── 1234567891-custom-poa-template.json
  ├── llc-moa/
  │   └── 1234567892-standard-llc-moa.json
  └── ...
```

Each template file contains:
- Template metadata (name, description, dates)
- Complete document data (all form fields)

## Security Notes

- The `anon` key is safe to expose in client-side code (it's public)
- Templates are stored as JSON files (no sensitive data should be included)
- Consider adding authentication if you want user-specific templates
- For production, consider adding rate limiting

## Next Steps

- Add user authentication for personalized templates
- Add template sharing features
- Add template categories/tags
- Add template versioning
