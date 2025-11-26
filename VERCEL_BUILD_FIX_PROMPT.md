# Vercel Build Fix Prompt for Cursor

Copy and paste this prompt into Cursor:

---

**Problem:** When deploying to Vercel, the build logs show it's running a static file copy command (`mkdir -p public && cp -r *.html *.css *.js public/`) instead of building the Next.js app with `next build`. This causes the old version of components to be deployed instead of the new ones.

**Solution needed:** Add a `vercel-build` script to `package.json` that explicitly runs `next build` so Vercel uses the correct build command.

**Task:** 
1. Read the current `package.json` file
2. Add `"vercel-build": "next build"` to the scripts section
3. Ensure the build script is set to `"build": "next build"` (it should already be, but verify)
4. The scripts section should look like this:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "vercel-build": "next build",
     "start": "next start",
     "lint": "next lint"
   }
   ```

This will ensure Vercel properly builds the Next.js application instead of just copying static files.

---

