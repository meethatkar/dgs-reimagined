# 🔬 Lighthouse Report Analysis — DGS Groups (Mobile)

## Quick Context: Dev Mode vs Production

> [!IMPORTANT]
> You ran Lighthouse on `localhost:3000` with **dev mode** (`npm run dev`). This is critical to understand because **many of the flagged issues are dev-only artifacts** and will vanish in a production build (`npm run build && npm start`). I'll mark each issue below.

| Issue | Dev-Only? | Your Control? |
|-------|-----------|---------------|
| Minify JavaScript (282 KiB) | ✅ Yes | ❌ Turbopack handles this in prod |
| Legacy JS polyfills (9 KiB) | ✅ Yes | ❌ Next.js bundles these |
| Unused JS from devtools chunks | ✅ Yes | ❌ Auto-removed in prod |
| Chrome extension JS (3,210 KiB) | N/A | ❌ Not your code |
| Unsplash images (2,316 KiB) | ❌ No | ✅ **You fix this** |
| Logo.png (1.07 MB) | ❌ No | ✅ **You fix this** |
| Font chain latency (3,952 ms) | ❌ No | ✅ **You fix this** |
| LCP delay (3,340 ms) | ❌ No | ✅ **You fix this** |
| GSAP forced reflows (456 ms) | ❌ No | ✅ **You fix this** |

**Bottom line: ~70% of the flagged bytes are from Chrome extensions + dev mode. Focus on the 5 items marked "You fix this."**

---

## Issue 1: LCP — 3,340ms Element Render Delay 🔴 Critical

**What Lighthouse says:** The Largest Contentful Paint element is `h1.z-10.select-none.text-center...` — your **Preloader text**. It takes 3,340ms of "element render delay" before it paints.

**Why it happens:**
1. Your entire page is `"use client"` — the `page.jsx` root component. This means **zero server-side HTML** is sent. The browser receives an empty shell, then must download, parse, and execute all JS before any content renders.
2. The Preloader is driven by GSAP timelines that set elements to `opacity: 0` initially, so even after React renders, the text isn't "visible" until GSAP runs `gsap.to(..., { opacity: 1 })`.
3. Fonts must load before text renders properly — and the font chain is 3,952ms deep.

**How to understand this:**
```
TTFB (490ms) → JS Download → JS Parse → React Hydration → GSAP sets opacity:0 → Font loads → GSAP animates opacity:1
                                                                                                ↑ LCP fires HERE
```

**Fix strategies:**

| Strategy | Impact | Difficulty |
|----------|--------|------------|
| Move Preloader to a Server Component wrapper | 🟢 High | Medium |
| Add `display: optional` to font config | 🟢 High | Easy |
| Reduce Poppins weight count (9 → 3-4) | 🟡 Medium | Easy |

### Fix: Reduce font weights (easy win)

You're loading **all 9 Poppins weights** (100-900). Realistically, you use 3-4.

```diff
// layout.js
 const poppins = Poppins({
   variable: "--font-poppins",
   subsets: ["latin"],
-  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
+  weight: ["300", "400", "600", "700"],
+  display: "swap",
 });

 const cinzel = Cinzel({
   variable: "--font-cinzel",
   subsets: ["latin"],
+  display: "swap",
 });
```

**Why:** Each weight is a separate font file download. `display: "swap"` tells the browser to immediately show text with a fallback font, then swap to the custom font when loaded — eliminating the font-blocking delay from LCP.

---

## Issue 2: Hero Images — 2,316 KiB 🔴 Critical

**What Lighthouse says:** Two Unsplash images total 2.3 MB of network payload.

**Why it happens:** Your `DualPortalGateway` loads images via CSS `background-image: url(...)` with raw Unsplash URLs:

```jsx
// DualPortalGateway.jsx line 22-23
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: `url(${image})` }}
/>
```

**Problems with this approach:**
1. **No Next.js Image optimization** — `background-image` bypasses `next/image`, so no WebP conversion, no responsive sizing, no lazy loading.
2. **Full resolution** — Unsplash serves the original image (often 4000px+) regardless of device.
3. **No lazy loading** — Both images download immediately, even the right portal which may be off-screen on mobile.

**Fix: Use `next/image` with `fill` prop instead of CSS background-image:**

```jsx
import Image from "next/image";

// Replace the background div with:
<Image
  src={image}
  alt={title}
  fill
  sizes="(max-width: 1024px) 100vw, 38vw"
  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
  priority={alignment === "left"}  // Only priority-load the first portal
  quality={75}
/>
```

**Why this works:**
- `next/image` auto-converts to WebP (40-60% smaller)
- `sizes` tells it to serve a 100vw-wide image on mobile, 38vw on desktop — no wasted pixels
- `priority` on only the left portal means the right one lazy-loads
- Quality 75 is indistinguishable from 100 on photos but much smaller

**But wait — Unsplash is external.** You need to allowlist it in `next.config.mjs`:

```js
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};
```

**Estimated savings: ~1.5 MB** (from 2.3 MB → ~800 KB with WebP + responsive sizing)

---

## Issue 3: Logo.png — 1.07 MB 🔴 Critical

**What Lighthouse says:** The logo image is 16.4 KiB transferred (after Next.js optimization) but could save another 15.4 KiB. The source file is **1.07 MB** on disk.

**Why it matters:** Your [Logo.jsx](file:///home/meet/Desktop/JOB%20Assignment/dgs-groups-2/src/components/Logo.jsx) has:

```jsx
<Image src="/Logo.png" height={200} width={200} />
```

But the logo displays at **90×72px** on desktop. You're telling Next.js the intrinsic size is 200×200, which makes it serve a 256px version — still 3x larger than needed.

**Fix:**

```diff
 <Image
   src="/Logo.png"
-  height={200}
-  width={200}
+  height={72}
+  width={90}
   alt={alt}
   className={`object-contain ${sizeClass}`}
+  priority  // Logo is above the fold — don't lazy-load it
 />
```

**Even better long-term:** Convert the PNG logo to **SVG** if possible. An SVG logo would be ~2-5 KB (vs 1.07 MB source PNG), razor-sharp at any size, and eliminates the optimization pipeline entirely.

---

## Issue 4: Forced Reflows — 456ms 🟡 Medium

**What Lighthouse says:** `node_modules_next_dist_compiled_1amofcm._.js:2628` causes 456ms of forced reflow.

**Why it happens:** This is GSAP's compiled code. When GSAP reads layout properties (like `getBoundingClientRect()`, `offsetWidth`) right after changing styles, the browser must stop and recalculate layout — this is a "forced reflow."

Your Preloader does this during its animation setup, and ScrollTrigger does it when calculating trigger positions.

**Fix strategies:**

| Strategy | What it does |
|----------|-------------|
| Batch reads before writes | GSAP's `gsap.set()` before `gsap.to()` pattern already does this mostly |
| Use `will-change` on animated elements | Promotes to GPU layer, reducing reflow cost |
| Defer ScrollTrigger.refresh() | You already do this with the timeout — good ✅ |
| Use `useGSAP` instead of `useEffect` | Batches animation setup properly — you already do this in newer components ✅ |

**Practical advice:** Most of the 456ms is from GSAP internals + Next.js dev mode instrumentation. In production this drops significantly. The main actionable item is to **not mix DOM reads and writes** in your own animation setup code.

---

## Issue 5: Font Chain — 3,952ms Critical Path 🟡 Medium

**What Lighthouse says:**
```
localhost (585ms) → geist-latin.woff2 (3,952ms)
                  → Inter (2,315ms)
                  → Roboto (2,313ms)
                  → Cinzel/Poppins (2,311ms)
```

**Why it happens:** You're loading **Cinzel + Poppins** via `next/font/google` (good), but the report also shows **Inter**, **Roboto**, and **Geist** loading. These are likely from:
- **Geist**: Next.js default font (may be auto-included by Turbopack dev server)
- **Inter/Roboto**: Possibly from a component library or leftover CSS

**Fix:** Add `display: "swap"` to your font configs (shown in Issue 1 fix). In production, Next.js self-hosts these fonts, cutting the Google Fonts round-trip entirely.

---

## Issue 6: `"use client"` on page.jsx 🟡 Medium (Architecture)

**What it means:** Your [page.jsx](file:///home/meet/Desktop/JOB%20Assignment/dgs-groups-2/src/app/page.jsx) has `"use client"` at the top. This turns the entire page into a Client Component, which means:

1. **No SSR HTML** — the server sends an empty div, the browser must run JS to render anything
2. **Larger JS bundle** — all imports (Navbar, Footer, DualPortalGateway, GSAP) are bundled client-side
3. **Slower LCP** — content only appears after JS executes

**Better architecture:**

```
page.jsx (Server Component — NO "use client")
├── Preloader (Client — needs state/GSAP)
├── Navbar (Client — needs state for mobile menu)
├── DualPortalGateway (Server — static HTML + images)
│   ├── Portal images via next/image (server-rendered)
│   └── HeroTextCard (Server — just text)
├── MotiveSection (Client — needs GSAP TextReveal)
└── Footer (Server — static HTML)
```

This way, the portal images and text cards render as **real HTML in the initial server response** — the browser paints them immediately without waiting for JS. Only the interactive parts (menu, animations) need client JS.

> [!TIP]
> This is the **single biggest architectural improvement** you can make. It would drop LCP from ~3.3s to under 1s because the server sends pre-rendered HTML with image tags that browsers can start loading immediately.

---

## Summary: Priority Action Items

| Priority | Action | Est. Impact | Effort |
|----------|--------|-------------|--------|
| 🔴 P0 | Add `display: "swap"` to fonts + reduce Poppins weights | -500ms LCP | 5 min |
| 🔴 P0 | Replace portal CSS `background-image` with `next/image` | -1.5 MB payload | 30 min |
| 🔴 P0 | Fix Logo.png dimensions + add `priority` | -15 KiB + faster FCP | 5 min |
| 🟡 P1 | Add Unsplash to `next.config.mjs` `remotePatterns` | Required for next/image | 2 min |
| 🟡 P1 | Convert Logo.png → SVG | -1 MB source size | 15 min |
| 🟢 P2 | Refactor page.jsx to Server Component pattern | -2s LCP, -200KB JS | 1 hour |

> [!NOTE]
> **Always run Lighthouse on a production build** (`npm run build && npm start`) with Chrome extensions disabled (use Incognito mode). Dev mode inflates scores by 40-60%. Your actual production score will be significantly better than what you're seeing.
