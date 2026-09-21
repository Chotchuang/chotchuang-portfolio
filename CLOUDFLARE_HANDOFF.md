# Cloudflare Pages + GitHub Handoff

Prepared for `chotchuang.uk`.

## Recommended architecture

```text
GitHub repository
  → Cloudflare Pages build
  → Cloudflare global network
  → chotchuang.uk
```

Canva remains an optional design tool only. It is not part of the production
hosting path.

## 1. Create the GitHub repository

Recommended repository name: `chotchuang-portfolio`

The repository can be public or private. A public repository provides visible
code evidence to recruiters; a private repository reduces exposure. Do not add
datasets, credentials, `.env` files, private documents, or unpublished decks.

Push the existing `main` branch. Keep `package-lock.json` committed so
Cloudflare installs the validated dependency versions.

## 2. Create the Cloudflare Pages project

In Cloudflare:

1. Open **Workers & Pages**.
2. Choose **Create application** and connect to Git.
3. Select the `chotchuang-portfolio` GitHub repository.
4. Use the **Next.js (Static HTML Export)** preset.
5. Confirm the settings below.

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build:pages` |
| Build output directory | `out` |
| Root directory | `/` |

No environment variables, database, Pages Functions, Supabase, or Vercel are
required.

## 3. Verify the temporary Pages URL

Before changing the domain, test the generated `*.pages.dev` URL:

- `/`
- `/project`
- `/project/bluex`
- `/project/merchant-growth-fintech`
- `/og.png`
- `/robots.txt`
- `/sitemap.xml`

Confirm desktop and mobile navigation, external links, and the displayed
contact email.

## 4. Cut over the domain safely

Only after the `*.pages.dev` checks pass:

1. Add `chotchuang.uk` under the Pages project's **Custom domains**.
2. Add `www.chotchuang.uk` as a second custom domain.
3. Let Cloudflare create or propose the DNS records.
4. Remove only the superseded hosting DNS records for those two
   hostnames.
5. Wait for both domains and SSL certificates to become active.
6. Test `https://chotchuang.uk/project`.
7. Configure a permanent redirect from `www.chotchuang.uk` to
   `chotchuang.uk`.
8. After the domain works, detach the two pending custom domains from the old
   previous hosting project. Keep its URL temporarily as rollback.

Do not delete the old deployment before the new domain and SSL are confirmed.

## 5. Build-count policy

With Cloudflare Git integration, a push to a watched branch triggers a build.
A normal change merged through a pull request commonly creates:

1. One preview build for the pull-request branch.
2. One production build when merged into `main`.

Several commits pushed together are normally handled as one push-triggered
build. Avoid repeatedly pushing tiny commits when one reviewed push will do.

To reduce unnecessary builds:

- Work locally and run `npm run check:pages`.
- Push only when a reviewable change is ready.
- Disable automatic builds for branches that do not need previews.
- Use Cloudflare's skip-build commit option for documentation-only changes when
  appropriate.

## 6. Rollback

Cloudflare Pages keeps deployment history. If a production build is bad, roll
back to the previous successful deployment in the Cloudflare dashboard. The
Git repository remains the source of truth.
