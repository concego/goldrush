# Gold Rush: Technical & Accessibility Documentation

## 1. Project Overview
**Gold Rush** is a Stealth-Roguelike PWA designed to bridge the gap between complex game mechanics and total digital inclusion. While many accessibility initiatives focus on high contrast or motor adjustments, Gold Rush introduces a "Blind-First" architecture that ensures players with total vision loss have the same strategic depth as sighted players.

## 2. Tech Stack & Rationale

### Frontend: PWA (HTML5, CSS3, JavaScript)
- **Choice:** Progressive Web App.
- **Advantage:** Low barrier to entry. No app store friction. Native-like performance on Android (TalkBack) and iOS (VoiceOver).
- **Inclusion Benefit:** PWAs are inherently more compatible with screen readers than many custom game engines (Unity/Unreal) which often require complex plugins for accessibility.

### Backend: PocketBase (via PocketHost)
- **Choice:** Go-based backend with SQLite.
- **Advantage:** Real-time data synchronization with minimal latency.
- **Inclusion Benefit:** Allows for persistent world states (Debt, Reputation) and global leaderboards, fostering a sense of community for players who are often isolated from competitive gaming.

### Audio: Web Audio API
- **Choice:** Low-latency spatial audio processing.
- **Inclusion Benefit:** Enables dynamic "Soundscapes" (Reverb, Panning, Low-pass filters) that translate spatial data into intuitive audio cues.

## 3. Accessibility Architecture (The "Eu Concego" Standard)

### A. Non-Visual Navigation (The Wind System)
- **The Problem:** Blind players often have to "scan" every step to find a path, which is tedious and breaks immersion.
- **The Solution:** Inspired by *Shadow Line*, we use a **Dynamic Wind System**. A subtle breeze sound indicates an open corridor. If the wind stops, the path is blocked.
- **Advantage:** Allows for fluid, "gliding" navigation based on intuition rather than constant text-to-speech triggers.

### B. Spatial Awareness (Audio Proximity)
- **Mechanism:** Enemies and items emit "Passive Audio Cues" (panning and volume-based).
- **Benefit:** Players "feel" the presence of a Goblin or a Treasure chest in the 3D space, reducing cognitive load and increasing tension.

### C. Orientation-Based Gameplay (Facing)
- **Mechanism:** Split-control layout (Landscape mode). Left side for turning (Facing), Right side for moving (Grid).
- **Inclusion Benefit:** Separation of concerns. Changing direction is a "free action" that triggers a **Cone Scan**, allowing the player to map the environment strategically without wasting turns.

### D. Tactical Stealth (Sneak Attack)
- **Mechanism:** Reverb + Whisper audio shift.
- **Benefit:** Provides a clear, dramatic reward for tactical positioning (attacking from behind), proving that stealth mechanics can be perfectly executed through audio.

## 4. Why This Matters for Game Studios
Most studios treat accessibility as a "post-production" checklist (contrast, subtitles). **Gold Rush** demonstrates **Inclusive Design from Day Zero**. 

By hiring or partnering with specialists who understand the non-visual experience, studios can:
1. **Expand their Market:** Reaching millions of blind and low-vision gamers globally.
2. **Innovate UX:** Solutions for blind players (like the wind system) often result in more immersive and intuitive interfaces for all players.
3. **Lead the Industry:** Setting a new standard for what "Accessibility" truly means—not just making a game playable, but making it **engaging and competitive**.

---
**Developer:** Anderson Carvalho (Eu Concego Jogar)  
**Consultancy & Inquiries:** euconcego@gmail.com
