# Vercel Deployment Guide - OCR Issues Fixed

## Problem: OCR Scanning Doesn't Finish on Vercel

### Root Causes:
1. **Tesseract.js worker path error**: Server-side doesn't accept CDN URLs for workers
2. **Timeout limits**: Vercel Free tier = 10s, OCR typically needs 15-60s
3. **Processing is too slow**: Running both English + Arabic scans sequentially

## ✅ Solutions Implemented:

### 1. Fixed Worker Path Error
**Before** (❌ Error):
```typescript
workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@4.1.4/dist/worker.min.js' // Doesn't work server-side
```

**After** (✅ Fixed):
```typescript
// Removed CDN paths - Tesseract uses local workers automatically
tessedit_pageseg_mode: Tesseract.PSM.AUTO
```

### 2. Optimized for Free Tier
- Set `maxDuration: 10` (Free tier limit)
- Removed slow CDN loading
- Optimized Tesseract settings

### 3. What You Need to Do:

#### Option A: Compress Images Before Upload (Recommended for Free Tier)
The app will work on Free tier if you:
- **Resize images to max 800px width** before uploading
- **Use good quality photos** (clear, well-lit)  - **Crop to just the document** (remove background)

This should complete in under 10 seconds.

#### Option B: Upgrade to Vercel Pro ($20/month)
If you need to process large/complex images:
1. Upgrade to Pro plan
2. Change in `app/api/ocr/route.ts`:
   ```typescript
   export const maxDuration = 60  // Change from 10 to 60
   ```
3. Change in `vercel.json`:
   ```json
   "maxDuration": 60  // Change from 10 to 60
   ```

#### Option C: Use Client-Side OCR (Advanced)
Process OCR in the browser (no timeout limits):
- Implemented in `components/ocr/ClientOCR.tsx`
- Shows real-time progress
- No server limits
- Slower on mobile devices

To enable, import and use ClientOCR component instead of OCRUpload.

## 📋 Quick Deployment Checklist:

- [x] Fixed worker path error (removed CDN URLs)
- [x] Set timeout to Free tier limit (10s)
- [x] Optimized Tesseract settings
- [ ] **Your action**: Test with compressed images
- [ ] **Optional**: Upgrade to Pro if needed

## 🧪 Testing After Deployment:

### Test with Small Images First:
1. Take a photo of Emirates ID
2. **Compress it**: Use phone's "resize" feature or https://tinypng.com
3. Upload and test
4. Check Vercel logs for timing

### If it Still Times Out:
Check the Vercel function logs:
```
Vercel Dashboard → Your Project → Functions → /api/ocr
```

Look for:
- `OCR English completed in XXXms`
- `OCR Arabic completed in XXXms`
- `OCR Complete in XXXms`

If total time > 9000ms, you'll hit the timeout.

## 💡 Performance Tips:

### Make OCR Faster:
1. **Image size matters**: 
   - 800x600px = ~3-5 seconds
   - 1920x1080px = ~10-15 seconds
   - 4000x3000px = ~30-60 seconds

2. **Image quality**:
   - Clear text = faster
   - Blurry/dark = slower (more retries)

3. **Process only what you need**:
   - Emirates ID: Both languages needed
   - Passport: English only (faster)
   - Trade Certificate: Both languages

### Optimize Images Client-Side:
Add this to OCRUpload component before sending:
```typescript
// Resize image before upload
const resized = await resizeImage(file, 1000) // max 1000px width
```

## 🚀 Alternative Solutions:

### 1. Use External OCR API (Best for Production):
- **Google Cloud Vision**: $1.50/1000 images, very fast
- **AWS Textract**: $1.50/1000 pages, excellent accuracy
- **Azure Computer Vision**: Similar pricing

Benefits:
- No timeout issues
- Better accuracy
- Faster processing
- Support for more languages

### 2. Use Different Hosting:
Platforms with longer timeouts:
- **Railway**: 30 minutes timeout
- **Render**: 60 seconds on free tier
- **Google Cloud Run**: 60 minutes
- **AWS Lambda**: 15 minutes

### 3. Background Processing:
Use a job queue (requires additional service):
- Upload image
- Queue OCR job
- Poll for results
- Show result when ready

## 📊 Cost Comparison:

| Solution | Monthly Cost | Timeout | Pros | Cons |
|----------|--------------|---------|------|------|
| Vercel Free | $0 | 10s | Easy, free | Must compress images |
| Vercel Pro | $20 | 60s | Simple upgrade | Still has limits |
| Google Vision | ~$15 | None | Fast, accurate | API integration |
| Railway | $5 | 30min | Long timeout | Migration needed |
| AWS Lambda | ~$0 | 15min | Scalable | Complex setup |

## 🎯 Recommended Path:

**For MVP/Testing**: 
- Stay on Vercel Free
- Compress images to 800-1000px
- Add helper text: "For best results, resize images before upload"

**For Production**: 
- Use Google Cloud Vision or AWS Textract
- Much faster and more reliable
- Better ROI than managing Tesseract.js

## 📝 Need Help?

If scanning still doesn't work:
1. Check image size (should be < 1MB, < 1200px)
2. Check Vercel logs for exact error
3. Verify plan limits in Vercel dashboard
4. Consider using external OCR API
