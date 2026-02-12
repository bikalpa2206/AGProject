# Deploying to Vercel

This guide will walk you through deploying your travel blog to Vercel and configuring the necessary Firebase environment variables.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Firebase project credentials from your `.env.local` file

## Deployment Steps

### Step 1: Connect Your Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose your repository from the list
5. Click **"Import"**

### Step 2: Configure Environment Variables

Before deploying, you **must** add your Firebase environment variables to Vercel:

1. In the project setup page, scroll down to **"Environment Variables"**
2. Add the following variables one by one (copy values from your `.env.local` file):

   | Variable Name | Value (from your .env.local) |
   |--------------|------------------------------|
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyDR9j7y84dB45syhyKXj_KKVDw6J8l5MUY` |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `my-witty-blog.firebaseapp.com` |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `my-witty-blog` |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `my-witty-blog.firebasestorage.app` |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `774380253999` |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:774380253999:web:a586d25da1c702397ca7da` |

3. For each variable:
   - Enter the **Name** (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`)
   - Enter the **Value** (copy from your `.env.local` file)
   - Select all environments: **Production**, **Preview**, and **Development**
   - Click **"Add"**

### Step 3: Deploy

1. After adding all environment variables, click **"Deploy"**
2. Vercel will build and deploy your application
3. Wait for the build to complete (usually takes 1-3 minutes)
4. Once complete, you'll see a success message with your live URL

### Step 4: Access Your Live Site

Your site will be available at a URL like:
```
https://your-project-name.vercel.app
```

You can also configure a custom domain in the Vercel dashboard.

## Adding Environment Variables to Existing Deployment

If you've already deployed but forgot to add environment variables:

1. Go to your project in the [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **"Settings"** tab
3. Select **"Environment Variables"** from the left sidebar
4. Add all the Firebase variables listed above
5. Go to **"Deployments"** tab
6. Click the **"..."** menu on the latest deployment
7. Select **"Redeploy"** to rebuild with the new environment variables

## Troubleshooting

### Build Fails with Firebase Error

**Error**: `Error [FirebaseError]: Firebase: Error (auth/invalid-api-key)`

**Solution**: Make sure all Firebase environment variables are added to Vercel. Double-check that:
- Variable names are spelled correctly (including `NEXT_PUBLIC_` prefix)
- Values don't have extra spaces or quotes
- All 6 variables are present

### Authentication Not Working on Deployed Site

**Checklist**:
1. Verify all environment variables are set in Vercel
2. Check Firebase Console → Authentication → Settings → Authorized domains
3. Add your Vercel domain (e.g., `your-project-name.vercel.app`) to authorized domains
4. Redeploy your application

### Site Builds Locally but Fails on Vercel

**Solution**: 
- Check the build logs in Vercel for specific errors
- Ensure your `package.json` has all required dependencies
- Verify Node.js version compatibility (Vercel uses Node 18+ by default)

## Using Vercel CLI (Alternative Method)

You can also deploy using the Vercel CLI:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to your project directory
cd /home/student/Desktop/AGv2/AGProject

# Deploy (follow the prompts)
vercel

# Add environment variables via CLI
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Enter the value when prompted
# Repeat for all 6 Firebase variables
```

## Next Steps

After successful deployment:

1. ✅ Test your live site thoroughly
2. ✅ Verify authentication (Google login) works
3. ✅ Check that all blog posts display correctly
4. ✅ Test on mobile devices
5. ✅ Consider setting up a custom domain
6. ✅ Enable analytics in Vercel dashboard (optional)

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Firebase Setup Guide](https://firebase.google.com/docs/web/setup)
