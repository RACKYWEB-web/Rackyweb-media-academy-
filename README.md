# RackyWeb Academy — Premium Digital Ecosystem
### Gold · Emerald · Sunset Gradient Edition

---

## 📁 File Structure

```
rackyweb/
├── index.html      ← Main website (all 11 sections)
├── styles.css      ← Complete stylesheet (gold/emerald/sunset palette + image backgrounds)
├── main.js         ← All interactivity, animations & effects
├── 404.html        ← Custom 404 error page
└── README.md       ← This file
```

---

## 🚀 How to Use

### Option 1 — Open Locally
Simply open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).  
No build tools, no npm, no server required.

### Option 2 — Deploy to a Host
Upload all files to any static hosting service:
- **Netlify** — drag & drop the folder at netlify.com/drop
- **Vercel** — `vercel --prod` in the folder
- **GitHub Pages** — push to a repo and enable Pages
- **Cloudflare Pages** — connect your GitHub repo

---

## 🎨 Color Palette

| Name           | Hex / Variable        | Usage                        |
|----------------|-----------------------|------------------------------|
| Gold           | `#f5c842`             | Primary accent, CTAs, stars  |
| Gold Light     | `#fde98a`             | Luxury gradient highlight    |
| Emerald        | `#10c97a`             | Secondary accent, skill bars |
| Emerald Light  | `#4dffa6`             | Code highlights, labels      |
| Sunset Coral   | `#ff6b35`             | Warm gradient start          |
| Sunset Rose    | `#f7418f`             | Events, creator cards        |
| Sunset Violet  | `#9b59f5`             | Labs, future tech            |
| Sunset Sky     | `#38bdf8`             | React path, sky elements     |
| Deep Void      | `#080604`             | Background base              |

---

## 🖼️ Image Backgrounds

Each section uses a different Unsplash photo as a background with a dark overlay:

| Section          | Image Theme              |
|------------------|--------------------------|
| Hero             | Circuit board / tech     |
| Innovation Hub   | Data visualization       |
| Statistics       | Aerial city lights       |
| Academy          | Library / knowledge      |
| Creator Space    | Abstract art             |
| Templates Vault  | Design studio            |
| RackyWeb Labs    | Server room              |
| Community        | Diverse team             |
| Startup Launch   | Modern office            |
| Future Tech      | Neon abstract            |
| Careers          | Remote workspace         |
| Events           | Stage lights             |
| Testimonials     | Warm collaboration       |
| CTA Band         | Space / galaxy           |
| Footer           | Scenic horizon           |

> **Note:** Images are loaded from Unsplash CDN. An internet connection is required to display them. For fully offline use, download the images and update the `background:` URLs in `styles.css`.

---

## ✨ Features

### Interactivity
- Custom magnetic cursor with ring-follow effect
- Scroll progress bar (gradient gold line at top)
- 130-particle canvas with color-matched network lines
- Mouse-follow radial glow
- 3D card tilt on hover (mousemove transform)
- Ripple effect on all buttons
- Smooth anchor scroll

### Animations
- Scroll-triggered reveal animations (up, left, right, scale)
- Animated skill tree progress bars
- Live animated counters (48K students, 1.2M AI generations…)
- Prism gradient text shimmer (hero title)
- Orbital ring animations
- Glowing orb pulse
- Infinite marquee ticker
- Testimonial auto-slider (every 5.2s)
- Live countdown timer (first event)
- Live activity feed (auto-updates every 5.5s)

### Sections (11 total)
1. 🤖 Innovation Hub — 6 AI tool cards
2. 📊 Live Statistics — animated counters
3. 🎓 Explore Academy — roadmaps + skill tree
4. 🎨 Creator Space — spotlight grid
5. 📦 Templates Vault — filterable gallery
6. 🧬 RackyWeb Labs — bento grid + live code
7. 👥 Community Zone — leaderboard + activity feed
8. 🚀 Startup Launch — 3 pricing packages
9. 🔮 Future Tech — holographic concept cards
10. 💼 Careers — tabbed job listings
11. 📅 Events & Webinars — countdown timers

### UI Components
- Sticky animated navbar (shrinks on scroll)
- Floating dock menu (7 quick-jump buttons)
- Glassmorphism cards with backdrop-filter
- Custom scrollbar (gold color)
- Responsive for mobile, tablet & desktop
- Custom 404 page with matching design

---

## 🛠️ Customization

### Change Colors
Edit the CSS variables at the top of `styles.css`:
```css
:root {
  --gold:  #f5c842;   /* Change primary gold */
  --em:    #10c97a;   /* Change emerald */
  --sun-rose: #f7418f; /* Change sunset rose */
}
```

### Change Section Background Images
Find the section in `styles.css` (e.g. `#hero`) and update the Unsplash URL:
```css
#hero {
  background:
    linear-gradient(...overlay...),
    url('YOUR_IMAGE_URL_HERE') center/cover fixed;
}
```

### Add/Edit Content
All text, cards, and sections are in `index.html`.  
JavaScript logic (counters, slider, feed) is in `main.js`.

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full |

> The custom cursor is hidden on touch devices automatically.

---

## 📄 License

Built for **RackyWeb Academy**.  
Free to use, modify, and deploy for personal and commercial projects.

---

*Made with 💛 and a lot of gold gradients.*
