# 🎉 Birthday Webapp 🎂✨

A delightful, modern, and interactive Birthday Web Application designed to celebrate special days with joy, animations, music, and interactive surprises!

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

- 🎂 **Interactive Birthday Cake & Candles**: Blow out candles with a click or tap, complete with smoke animations, cheers, and confetti explosions. Re-light them anytime!
- 💌 **3D Interactive Greeting Card**: Click to unfold a 3D greeting card with a personalized birthday message and signature.
- 🎁 **Mystery Gift Box Unboxing**: Pop open the gift box to unlock special surprises and heartfelt wishes.
- 🎶 **Synthesized Birthday Melody**: Built-in Web Audio API synthesizer that plays the *"Happy Birthday to You"* tune on demand without needing external MP3s.
- 🎊 **Confetti & Fireworks Particle Engine**: High-performance HTML5 Canvas physics engine powering confetti blasts, hearts, and fireworks.
- 🎈 **Ambient Floating Balloons**: Colorful, soothing background balloons gently floating upwards.
- 🪄 **Dynamic Personalization**:
  - Customize the recipient's name and message via the **Customize Modal**.
  - Or share customized links using URL parameters:
    ```
    https://your-domain.com/?name=Alex&msg=Wishing+you+the+best+year+ahead!
    ```
- 📸 **Polaroid Memories Wall**: Aesthetic retro polaroid gallery showcasing favorite memories.
- 📱 **Fully Responsive & Glassmorphism Design**: Looks stunning on smartphones, tablets, and desktop displays.

---

## 🚀 Quick Start / Local Preview

No heavy installation or build steps required! Run it with any local server or simply open `index.html` in your favorite web browser.

### Option 1: Double-click to open
Simply double-click `index.html` in your file explorer.

### Option 2: Using Node / npx (Recommended)
```bash
# Using serve
npx serve .

# Or using http-server
npx http-server -p 3000
```

### Option 3: Using Python
```bash
# Python 3
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## 📁 Project Structure

```text
Birthday_Webapp/
├── index.html        # Main HTML structure & semantic layout
├── style.css         # Glassmorphism styling, keyframes & responsive design
├── script.js         # Interactive physics, Web Audio synth, events & logic
├── .gitignore        # Git ignore rules for system & node artifacts
├── LICENSE           # MIT open source license
└── README.md         # Comprehensive project documentation
```

---

## 🌐 Deploy to GitHub Pages (1-Click Hosting)

1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/<your-username>/Birthday_Webapp.git
   git branch -M main
   git push -u origin main
   ```
2. On GitHub, go to your repository **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Select `main` branch and `/ (root)` folder, then click **Save**.
5. Your birthday webapp will be live at `https://<your-username>.github.io/Birthday_Webapp/`!

---

## 🎨 Customization

- **Change Default Name & Message**: Update `defaultData` in [script.js](file:///Volumes/volume/Projects/Birthday_Webapp/script.js).
- **Add Your Own Photos**: Replace the `.polaroid-img` background or add `<img>` tags inside `.polaroid` divs in [index.html](file:///Volumes/volume/Projects/Birthday_Webapp/index.html).
- **Color Palette**: Modify CSS variables in `:root` inside [style.css](file:///Volumes/volume/Projects/Birthday_Webapp/style.css).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
