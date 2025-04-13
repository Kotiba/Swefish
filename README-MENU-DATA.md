# Static Menu Data with Build-time Fetching

This project uses a build-time approach to fetch menu data from Google Sheets. This means the menu data is retrieved once during the build/deployment process rather than every time a user visits your page.

## How It Works

1. When the site is built (via `npm run build` or when Cloudflare Pages deploys your site), the system runs a script that:
   - Fetches the latest menu data from your Google Sheet
   - Processes the data into the correct format
   - Saves it as a static JSON file (`src/data/static-menu-data.json`)

2. The `staticMenu.astro` page loads this pre-generated JSON file instead of making API calls to Google Sheets on every page load.

## Benefits

- **Faster Page Loads**: No API calls when users visit your page
- **Better Reliability**: Your site works even if Google Sheets or OpenSheet API is down
- **Lower Costs**: Fewer API calls means less bandwidth and potential API costs
- **Better SEO**: Content is available immediately for search engines

## How to Update Menu Content

Since the data is fetched at build time, you need to trigger a new build whenever you want to update your menu. You have several options:

### Option 1: Manual Redeploy

1. Update your Google Sheet with the new menu items
2. Go to Cloudflare Pages dashboard
3. Find your project and click "Redeploy"
4. Your site will rebuild with the latest menu data

### Option 2: Set Up a Deploy Hook (Recommended)

1. In Cloudflare Pages dashboard, go to your project
2. Navigate to Settings > Deploy hooks
3. Create a new deploy hook (e.g., "Update Menu")
4. You'll get a URL like: `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/xxxx`
5. You can trigger a rebuild by sending a POST request to this URL (via curl, Postman, or a simple script)

Example curl command:
```bash
curl -X POST https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/your-deploy-hook-id
```

### Option 3: Scheduled Builds

You can set up GitHub Actions to automatically redeploy your site on a schedule:

1. Create a file `.github/workflows/scheduled-deploy.yml` in your repository
2. Add the following content:

```yaml
name: Scheduled Deployment
on:
  schedule:
    - cron: '0 0 * * *'  # Runs at midnight every day

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Cloudflare Pages build hook
        run: curl -X POST https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/your-deploy-hook-id
```

## Troubleshooting

If your menu data isn't updating:

1. Check your Google Sheet is still public (Settings > Share > Anyone with the link > Viewer)
2. Verify the Sheet ID in `src/scripts/fetch-menu-data.js` matches your spreadsheet
3. Confirm the sheet name is exactly "Menu" (case-sensitive)
4. Look at build logs in Cloudflare Pages to see if there are any errors during the build process

## Setting Up from Scratch

If you need to set up the Google Sheet again:

1. Create a new Google Sheet
2. Create a tab named "Menu"
3. Import the CSV file from `src/data/spreadsheet-templates/menu-single.csv`
4. Make the sheet public (Share > Anyone with the link > Viewer)
5. Copy the spreadsheet ID from the URL and update it in `src/scripts/fetch-menu-data.js` 