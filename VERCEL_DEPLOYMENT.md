# Vercel Deployment Guide

## Issue: OCR Scanning Doesn't Finish

### Root Causes:
1. **Serverless Function Timeout**: Vercel's default 10-second timeout is too short for OCR processing
2. **Tesseract.js Worker Loading**: Workers and training data need proper configuration for serverless environments
3. **Missing CDN Configuration**: Training data files need to be loaded from CDN in production

### Solutions Implemented:

#### 1. Extended Timeout Configuration
- Added `maxDuration: 60` export in `/app/api/ocr/route.ts`
- Created `vercel.json` with function-specific timeout settings
- **Note**: Free (Hobby) plan has 10s limit, Pro plan allows up to 60s

#### 2. CDN Configuration for Tesseract.js
Updated both `runOCREnglish()` and `runOCRArabic()` functions to use CDN paths:
```typescript
langPath: 'https://tessdata.projectnaptha.com/4.0.0',
workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@4.1.4/dist/worker.min.js',
corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@4.0.4/tesseract-core.wasm.js'
```

#### 3. Client-Side Timeout Handling
Added proper timeout handling in `OCRUpload.tsx` with:
- 60-second fetch timeout
- AbortController for request cancellation
- Clear error messages for timeout scenarios

### Deployment Steps:

1. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Fix OCR timeout issues for Vercel deployment"
   git push
   ```

2. **Vercel Dashboard Settings**:
   - Go to your project settings on Vercel
   - Navigate to **Functions** tab
   - Verify timeout settings are applied

3. **Upgrade Plan if Needed**:
   - Free/Hobby plan: 10-second max
   - Pro plan: 60-second max
   - Enterprise: 900-second max
   
   If your OCR processing takes longer than 10 seconds, you'll need a Pro plan or higher.

### Alternative: Environment Variables
If you want to make timeouts configurable, add to `.env.local`:
```env
OCR_TIMEOUT_MS=60000
```

### Testing After Deployment:

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on `/api/ocr` function
   - View real-time logs during OCR processing

2. **Monitor Execution Time**:
   - Check console logs for timing: `OCR Complete in XXXms`
   - Ensure it's under your plan's limit

3. **Test Different Document Types**:
   - Emirates ID (fastest)
   - Passport (medium)
   - Trade Certificate (slowest - dual language)

### Troubleshooting:

**If scanning still times out:**
1. Check your Vercel plan limits
2. Verify the CDN URLs are accessible
3. Check browser console for errors
4. Review Vercel function logs

**If you get CORS errors:**
- CDN resources should load fine, but check browser console
- May need to add headers in `next.config.js` if blocked

**For better performance:**
- Process only one language if possible (English OR Arabic, not both)
- Compress/resize images before upload
- Consider using a dedicated OCR service API (Google Vision, AWS Textract)

### Cost Considerations:

**Free Tier**: 10s limit makes OCR challenging
**Pro Tier ($20/month)**: 60s should work for most documents
**Enterprise**: 900s for complex/large documents

### Recommended: Alternative Architecture

For production apps with heavy OCR usage:
1. Use background job queue (Vercel doesn't support this natively)
2. Consider serverless with longer timeouts (AWS Lambda: 15 minutes, Google Cloud Functions: 60 minutes)
3. Use dedicated OCR APIs instead of Tesseract.js
