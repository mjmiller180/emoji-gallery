# 🌟 Premium Emoji Gallery

A high-performance, searchable, and visually stunning emoji lookup tool. This project transforms a raw list of emojis into a beautiful interactive gallery designed for platforms that lack native emoji support.

![Aesthetic Preview](https://img.shields.io/badge/Aesthetics-Premium-blueviolet?style=for-the-badge)
![Tech](https://img.shields.io/badge/Vanilla-HTML%2FCSS%2FJS-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- **🔍 Smart Search & Tagging**: Find emojis instantly by name, category, or keyword.
- **➕ Interactive Custom Tags**: Personalize your gallery! Click the **`+`** button on any card to add and save your own searchable keywords (Saved to Local Storage).
- **📋 Copy-on-Click**: Click any tile to instantly copy the emoji to your clipboard.
- **📐 Geometric Scaling**: 10 calibrated presets with logarithmic growth for visually consistent zoom.
- **🚀 High Performance**: Optimized with CSS layout containment and event delegation to handle 1,300+ emojis with near-instant responsiveness.
- **🌙 Premium Dark Mode**: Modern "glassmorphism" design using the *Outfit* typeface.

---

## 🚀 Getting Started (Out of the Box)

### **Option 1: Use it Locally**
Just download this repository and open the **`emoji_gallery.html`** file in any modern web browser. 

### **Option 2: Use it on Your Own Site**
1. Upload the **`index.html`** (or `emoji_gallery.html`) file to your server.
2. That's it! It is entirely self-contained—no extra folders or databases are required for the gallery to function.

### **Option 3: Host on GitHub Pages**
If you fork this repository, go to **Settings > Pages** and select the main branch. GitHub will automatically host it for you at `your-username.github.io/emoji-gallery`.

---

## 📁 Repository Structure

- **`/index.html`**: The main demo page. Best for web hosting.
- **`/emoji_gallery.html`**: The standalone tool. Identical to index, but named for easy identification.
- **`/README.md`**: This documentation file.
- **`/LICENSE`**: MIT License (allows you to use, modify, and distribute this for free).
- **`/data/`**: 
  - `emoji.md`: The raw source list of emojis used to build the gallery.
  - `metadata.json`: The database of emoji names, aliases, and tags.
- **`/scripts/`**:
  - `regenerate.js`: A Node.js automation tool that rebuilds the gallery from the source data in the `/data/` folder.

---

## 🛠️ For Developers: Rebuilding the Gallery
If you add new emojis to `data/emoji.md` or want to update the metadata, you can regenerate the entire gallery:
1. Open a terminal in the project root.
2. Run: `node scripts/regenerate.js`
3. The script will deduplicate the list, filter skin tones, and update `index.html`.

---

*Created for efficient emoji management and premium user experience.*
