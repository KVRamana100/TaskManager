# EC2 Demo App — Task Manager

## Stack
- Frontend: React + Vite (port 3000)
- Backend: Node.js + Express (port 5000)
- DB: Supabase (Postgres)

## Supabase Setup
Run `supabase_setup.sql` in your Supabase SQL editor.

## Local Dev
```bash
# Backend
cd backend
cp .env.example .env   # fill in keys
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## EC2 Deploy Steps
1. SSH into EC2
2. Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs`
3. Clone/upload this folder
4. Backend: `cd backend && cp .env.example .env` → fill keys → `npm install && npm start`
5. Frontend: `cd frontend && echo "VITE_API_URL=http://<EC2_IP>:5000" > .env && npm install && npm run build`
6. Serve frontend build with: `npx serve dist -l 3000`
7. Open EC2 security group ports: 3000 (frontend), 5000 (backend)
