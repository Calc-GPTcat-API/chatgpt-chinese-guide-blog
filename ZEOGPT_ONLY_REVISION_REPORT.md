# ZEOGPT Only Revision Report

Generated: 2026-06-29 01:15:34

## Revision Goal

The site is now aligned with one commercial objective: **ZEOGPT-only promotion**.

## Changed

- Rebuilt `AgentConversionStrip.vue` as a single ZEOGPT CTA.
- Kept ZEOGPT as the only primary promotion source.
- Updated public copy and workflow docs to avoid multi-platform promotion ambiguity.
- Preserved conversion-oriented structure:
  - article-top CTA strip,
  - ZEOGPT CTA component,
  - low-competition article set,
  - SEO and disclosure mechanisms.

## Current Main Promotion URL

`https://www.zeogpt.com/register?ref=Ac3KbS3F`

## Before Uploading

Still preserve existing webmaster verification files from the deployed site:

- `docs/public/BingSiteAuth.xml`
- `docs/public/baidu_verify*.html`

Then run local validation and deploy:

```powershell
npm install
npm run build
git add -A
git commit -m "Upload ZEOGPT only conversion version"
git push origin main
```
