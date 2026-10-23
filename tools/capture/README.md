# Project image capture (dev only)

Not part of the site build. Produces the framed WebP screenshots in `public/projects/` and `manifest.json`.

```
cd tools/capture && npm install
node capture.mjs                  # everything
node capture.mjs tracklane        # one project
node capture.mjs --frame-only     # re-frame existing raw shots
```

- Anidex and Interview Prep are captured from the live public sites.
- Tracklane runs locally with an in-memory store and invented applications (database and OAuth env vars are forced empty).
- Game Chat Bridge runs its frontend locally with every API call mocked and invented players, Discord users and avatars.
- Uses the Chromium already cached by Playwright (override with `CHROMIUM_PATH`).
