# Palette by Stithi

A production-ready materials library web application for Indian architecture firms, built with Next.js 14, TypeScript, PostgreSQL, and Prisma.

## Features

- 🏛️ **Materials Library** - Browse, search, and organize construction materials, furniture, plants, and landscaping elements
- 🤖 **PAL AI Assistant** - Claude-powered materials consultant for Indian architecture
- 📋 **Project Management** - Organize materials by projects and rooms
- 🎨 **Moodboards** - Create material collections and boards
- ❤️ **Favorites** - Save and organize frequently-used materials
- 📱 **Mobile-first UI** - Beautiful Chettinad-inspired design optimized for tablets and phones

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS + Custom Chettinad design system
- **AI**: Anthropic Claude API for PAL assistant
- **Deployment**: Render.com

## Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL database

### Setup

1. **Clone and install dependencies**

```bash
git clone <your-repo>
cd palette-by-stithi
npm install
```

2. **Set up environment variables**

Create `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/palette"
ANTHROPIC_API_KEY="your_anthropic_api_key"
```

3. **Initialize database**

```bash
# Run migrations
npx prisma db push

# Seed with sample data
npm run db:seed
```

4. **Start development server**

```bash
npm run dev
```

Visit http://localhost:3000

## Deployment to Render.com

### Option 1: Using render.yaml (Recommended)

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Connect to Render.com**

- Go to [Render Dashboard](https://dashboard.render.com/)
- Click "New" → "Blueprint"
- Connect your GitHub repository
- Render will automatically detect `render.yaml` and create:
  - PostgreSQL database (`palette-db`)
  - Web service (`palette-by-stithi`)

3. **Set environment variables**

After creation, add your Anthropic API key:
- Go to your web service
- Navigate to "Environment"
- Add `ANTHROPIC_API_KEY` with your key

4. **Run database migrations**

In your web service shell:

```bash
npx prisma migrate deploy
npm run db:seed
```

### Option 2: Manual Setup

1. **Create PostgreSQL Database**

- Dashboard → "New" → "PostgreSQL"
- Name: `palette-db`
- Copy the Internal Database URL

2. **Create Web Service**

- Dashboard → "New" → "Web Service"
- Connect your GitHub repo
- Settings:
  - **Build Command**: `npm install && npm run build`
  - **Start Command**: `npm start`
  - **Environment Variables**:
    - `DATABASE_URL`: (paste internal database URL)
    - `ANTHROPIC_API_KEY`: your API key

3. **Deploy and Seed**

After first deploy, open shell and run:

```bash
npx prisma migrate deploy
npm run db:seed
```

## Project Structure

```
src/
├── app/
│   ├── (app)/              # Main app routes with tab bar
│   │   ├── home/           # Home screen
│   │   ├── search/         # Search materials
│   │   ├── projects/       # Project management
│   │   ├── boards/         # Moodboards
│   │   ├── pal/            # AI assistant
│   │   └── add/            # Add new material
│   ├── api/                # REST API routes
│   │   ├── materials/      # Materials CRUD
│   │   ├── projects/       # Projects CRUD
│   │   ├── rooms/          # Rooms CRUD
│   │   ├── favourites/     # Favorites toggle
│   │   └── pal/            # AI assistant endpoint
│   └── layout.tsx          # Root layout
├── components/
│   ├── layout/             # Layout components
│   └── materials/          # Material components
├── lib/
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Utilities
└── types/                  # TypeScript types

prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed data
```

## Database Schema

- **Material** - Construction materials, furniture, plants
- **Project** - Client projects
- **Room** - Rooms within projects
- **RoomMaterial** - Materials assigned to rooms
- **Board** - Moodboard collections
- **BoardItem** - Materials in boards
- **Favourite** - User favorites
- **PalConversation** - AI chat history

## API Endpoints

### Materials
- `GET /api/materials` - List materials (with filters)
- `POST /api/materials` - Create material
- `GET /api/materials/:id` - Get material
- `PATCH /api/materials/:id` - Update material
- `DELETE /api/materials/:id` - Delete material

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project with rooms
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Rooms
- `POST /api/rooms` - Create room
- `PATCH /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room
- `POST /api/rooms/:id/materials` - Add material to room
- `DELETE /api/rooms/:id/materials` - Remove material from room

### Favorites
- `GET /api/favourites` - List favorites
- `POST /api/favourites` - Toggle favorite

### PAL AI
- `POST /api/pal` - Chat with AI assistant (text or image)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `ANTHROPIC_API_KEY` | Claude API key for PAL assistant | Yes |

## Features in Detail

### PAL AI Assistant
- Material recommendations for specific use cases
- Image recognition for material identification
- Context-aware advice for Indian architecture
- Supports text and image inputs

### Design System
Inspired by Chettinad architecture:
- Warm cream and brass color palette
- Cormorant Garamond serif + DM Sans
- Subtle diagonal pattern overlays
- Mobile-first responsive design

### Search & Discovery
- Full-text search across materials
- Filter by category (flooring, walls, plants, etc.)
- AI-powered search hints
- Material ranking and suggestions

## License

Proprietary - Palette by Stithi

## Support

For questions or issues, contact: [your-email]
