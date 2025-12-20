# 🚀 FREE DEPLOYMENT GUIDE (No Domain Purchase Needed)

You asked for a free domain. The best way to get a URL like `virtualgames.fun` for free is to use a **Hosting Subdomain**. This gives you a public link (HTTPS) instantly.

## Option 1: Railway (Recommended for Multiplayer)
Railway allows you to deploy the `Dockerfile` I created.

1.  **Sign Up**: Go to [Railway.app](https://railway.app) (Github login recommended).
2.  **New Project**: Click "New Project" -> "Deploy from Repo" -> Select your GitHub repo containing this code.
3.  **Wait**: Railway will detect `Dockerfile` and build it automatically.
4.  **Get URL**:
    *   Once active, go to "Settings" -> "Domains".
    *   Click "Generate Domain".
    *   You will get a URL like: `virtualgames-production.up.railway.app`.
    *   **This is your free domain!** You can share this with anyone.

## Option 2: Render (Completely Free Tier)
Render is slower on free tier (it "sleeps" when inactive) but completely free.

1.  **Sign Up**: Go to [Render.com](https://render.com).
2.  **New Web Service**: Click "New" -> "Web Service".
3.  **Connect Repo**: Link your GitHub repository.
4.  **Settings**:
    *   **Environment**: Docker
    *   **Plan**: Free
5.  **Deploy**: Click Create Web Service.
6.  **Get URL**: Render will give you `virtualgames.onrender.com`.

## 🌐 HOSTING ON VERCEL? (Read Carefully)
**Vercel is NOT recommended** for this specific app version because:
1.  **WebSockets**: Vercel Serverless functions crash with long-running WebSocket connections.
2.  **Database**: This app uses a local SQLite file (`virtualgames.sqlite`), which gets deleted every time Vercel redeploys (ephemeral filesystem).

### ✅ The Solution: Use Railway or Render
These platforms simulate a "Real Server" (VPS) which keeps your game running 24/7 and saves your database.

---

## 🌐 Custom Domain Guide (`virtualgather.games`)

If you want to use **`virtualgather.games`**, follow these steps on **Railway** (easiest):

1.  **Register the Domain**: First, ensure you have bought/registered `virtualgather.games` (e.g., on Namecheap, GoDaddy, or Squarespace).
2.  **Deploy Code**: Deploy this repository to **Railway** (Option 1 above).
3.  **Connect Domain**:
    *   In Railway, go to **Settings** -> **Domains**.
    *   Click **Custom Domain**.
    *   Enter `virtualgather.games`.
4.  **Update DNS**:
    *   Railway will give you a **CNAME** or **A Record**.
    *   Go to your Registrar (where you bought the domain).
    *   Add the record (e.g., CNAME `virtualgather.games` -> `virtualgames-prod.up.railway.app`).
5.  **Wait**: DNS propagates in 5-60 minutes. Your app will then resolve at your custom link!

