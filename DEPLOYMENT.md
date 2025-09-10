# Todo Application with Cloudflare Worker KV Deployment Guide

## Project Structure
```
portfolio/
├── frontend/           # React frontend
├── worker/            # Cloudflare Worker
└── DEPLOYMENT.md      # This file
```

## Prerequisites
- Node.js installed
- Cloudflare account
- Wrangler CLI installed globally: `npm install -g wrangler`

## Setup Instructions

### 1. Cloudflare Worker Setup

1. **Login to Cloudflare:**
   ```bash
   cd worker
   wrangler auth login
   ```

2. **Create KV Namespace:**
   ```bash
   # For production
   wrangler kv:namespace create "TODOS"
   
   # For preview/development
   wrangler kv:namespace create "TODOS" --preview
   ```

3. **Update `wrangler.toml` with your actual KV namespace IDs:**
   ```toml
   [[kv_namespaces]]
   binding = "TODOS"
   id = "your_production_namespace_id"
   preview_id = "your_preview_namespace_id"
   ```

4. **Deploy the Worker:**
   ```bash
   npm run deploy
   ```

### 2. Frontend Setup

1. **Create environment file:**
   ```bash
   cd frontend
   echo "VITE_API_URL=https://your-worker-name.your-subdomain.workers.dev" > .env.production
   echo "VITE_API_URL=http://localhost:8787" > .env.development
   ```

2. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```

## Development Workflow

### 1. Start the Worker locally:
```bash
cd worker
npm run dev
```
This starts the worker at `http://localhost:8787`

### 2. Start the Frontend:
```bash
cd frontend
npm run dev
```
This starts the React app at `http://localhost:5173`

## API Endpoints

Your Cloudflare Worker exposes these endpoints:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a specific todo
- `DELETE /api/todos/:id` - Delete a specific todo

## Environment Variables

### Frontend (.env files)
- `VITE_API_URL` - URL of your Cloudflare Worker

### Worker (wrangler.toml)
- `TODOS` - KV namespace binding for storing todos

## Troubleshooting

1. **CORS Issues**: The worker includes CORS headers for all origins (`*`). For production, consider restricting to your domain.

2. **KV Namespace Issues**: Make sure your KV namespace IDs in `wrangler.toml` match the ones created in Cloudflare dashboard.

3. **API URL**: Ensure your frontend's `VITE_API_URL` points to the correct worker URL.

4. **Local Development**: Worker must be running on port 8787 for local development.

## Production Deployment

1. Deploy the worker: `cd worker && npm run deploy`
2. Get your worker URL from Cloudflare dashboard
3. Update frontend environment: `VITE_API_URL=https://your-worker.workers.dev`
4. Build and deploy frontend: `cd frontend && npm run build`
