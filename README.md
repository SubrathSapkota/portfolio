# Todo App with Cloudflare Worker KV

A modern, full-stack todo application built with React and Cloudflare Workers, featuring global data persistence using Cloudflare KV.

## 🚀 Features

- ✨ **Persistent Storage**: All todos stored in Cloudflare KV (global edge database)
- 🌍 **Global Deployment**: API deployed on Cloudflare's edge network
- 📱 **Modern UI**: Clean React interface with Tailwind CSS
- 🔄 **Real-time CRUD**: Create, Read, Update, Delete operations
- 💨 **Fast & Responsive**: Edge computing for minimal latency
- 🛡️ **Error Handling**: Comprehensive error states and loading indicators

## 🏗️ Architecture

```
portfolio/
├── frontend/          # React application (Vite + Tailwind)
├── worker/           # Cloudflare Worker API
├── DEPLOYMENT.md     # Detailed deployment guide
└── README.md        # This file
```

## 🌐 Live Application

- **API Endpoint**: `https://todoapp.subrathsapkota119.workers.dev`
- **Frontend**: Deploy to any static hosting (Vercel, Netlify, Cloudflare Pages)

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Library
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling
- **React Router** - Navigation

### Backend
- **Cloudflare Workers** - Serverless API
- **Cloudflare KV** - Global Key-Value Storage
- **Wrangler** - Deployment & Development

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Start the API (Cloudflare Worker)
```bash
cd worker
npm install
npx wrangler dev --port 8787
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to see your todo app!

## 📦 Deployment

The Cloudflare Worker is already deployed! For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy Commands:
```bash
# Deploy Worker
cd worker && npx wrangler deploy

# Build Frontend
cd frontend && npm run build
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |

## 📱 Screenshots

*Add screenshots of your application here*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with ❤️ using Cloudflare Workers
- Powered by React and modern web technologies
- Global data persistence with Cloudflare KV
