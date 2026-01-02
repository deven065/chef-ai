# Vercel Deployment Guide for Chef Claude

## Prerequisites
- GitHub account connected to Vercel
- HuggingFace API key

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (already done!)

2. **Go to [Vercel](https://vercel.com)** and sign in

3. **Import your repository:**
   - Click "Add New" → "Project"
   - Select your `chef-ai` repository from GitHub

4. **Configure the project:**
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: 
     - Key: `VITE_HUGGINGFACE_API_KEY`
     - Value: Your HuggingFace API key
   - Select all environments (Production, Preview, Development)

6. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Add environment variable:**
   ```bash
   vercel env add VITE_HUGGINGFACE_API_KEY
   ```
   Enter your HuggingFace API key when prompted.

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Vercel Configuration

The project includes:
- ✅ `vercel.json` - Deployment configuration
- ✅ `/api` directory - Serverless functions for backend
  - `/api/health.js` - Health check endpoint
  - `/api/recipe.js` - Recipe generation endpoint
  - `/api/index.js` - Backend info page

## Features on Vercel

- **Serverless Functions** - Backend runs as serverless functions (no server to maintain!)
- **Automatic HTTPS** - SSL certificate included
- **Global CDN** - Fast loading worldwide
- **Preview Deployments** - Every push gets a preview URL
- **Custom Domain** - Add your own domain in Vercel settings

## Post-Deployment

1. **Test the deployment:**
   - Visit your Vercel URL
   - Try generating a recipe
   - Check `/api/health` endpoint

2. **Enable automatic deployments:**
   - Every push to `main` branch auto-deploys
   - Pull requests get preview deployments

3. **Monitor your app:**
   - View logs in Vercel dashboard
   - Check analytics and performance

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Ensure `vite build` works locally

### API Errors
- Verify `VITE_HUGGINGFACE_API_KEY` environment variable is set
- Check Vercel function logs for errors
- Test API endpoints: `https://your-app.vercel.app/api/health`

### Environment Variables Not Working
- Make sure variable name starts with `VITE_`
- Redeploy after adding variables
- Variables are available at build time and runtime

## Custom Domain Setup

1. Go to your project in Vercel
2. Settings → Domains
3. Add your domain
4. Update DNS records as shown
5. Wait for DNS propagation (5-10 minutes)

## Cost

- **Hobby Plan (Free):**
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless function execution included
  - Perfect for this project!

---

**Your app is production-ready!** 🚀
