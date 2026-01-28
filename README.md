[ Drone Fleet Management Dashboard ]

A production-grade drone fleet management interface built with Next.js 15+ App Router, TypeScript, and Tailwind CSS.

## Features

- **Fleet Overview** - Real-time monitoring of 25+ drones
- **Live Map View** - Interactive map with drone positions
- **Mission Planning** - Create and manage flight missions
- **Analytics Dashboard** - Flight statistics and performance metrics
- **Drone Details** - Comprehensive telemetry and mission history

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** React Query + Zustand i may to use
- **Maps:** Leaflet / not heavy and only import it when need
- **Charts:** Recharts
- **Animations:** Framer Motion

## Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/drone-fleet-dashboard.git

# Navigate to project
cd drone-fleet-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

for check : (http://localhost:3000).

## Project Structure

```

after long planning and seacrshing with Ai , I created this as bais and not full folders list :

drone-fleet-dashboard/
├── app/
│   ├── (dashboard)/         # Dashboard routes
│   │   ├── fleet/          # Fleet overview page
│   │   ├── map/            # Live map view
│   │   ├── missions/       # Mission management
│   │   ├── analytics/      # Analytics dashboard
│   │   └── drones/[id]/    # Drone detail view
│   ├── api/                # API routes (Route Handlers)
│   │   ├── drones/         # Drone endpoints
│   │   ├── missions/       # Mission endpoints
│   │   └── telemetry/      # Telemetry endpoint
│   └── actions/            # Server Actions
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── fleet/             # Fleet-specific components
│   ├── map/               # Map components
│   └── shared/            # Shared components
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── mockDb.ts          # Mock database (25 drones, 50+ missions)
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Form validation schemas
└── hooks/                 # Custom React hooks
```

## Architecture Decisions

### Server vs Client Components

- **Server Components** by default for better performance
- **Client Components** only for interactivity (forms, state ,maps, animations)

### Data Fetching

- **Route Handlers** for GET requests
- **Server Actions** for mutations (create, update, delete) on data
- **React Query** for client-side caching and polling

### Mock Database as needed :

- Simulates 25 drones with varied states
- 50+ historical missions
- Real-time telemetry updates every second
- Automatic battery drain and status changes

## Key Features

### Live Simulation

- Drone positions update in real-time
- Battery levels decrease over time
- Random status changes (online/offline)
- Automatic charging when battery is low

### API Routes

- Network delay simulation (200-500ms)
- 5% error rate for testing error handling
- Proper TypeScript typing
- RESTful design

## API Endpoints

```
GET    /api/drones              # Get all drones
GET    /api/drones/:id          # Get single drone
PATCH  /api/drones/:id          # Update drone status
GET    /api/missions            # Get all missions
POST   /api/missions            # Create mission
DELETE /api/missions?id=:id    # Delete mission
GET    /api/telemetry           # Get all telemetry
GET    /api/telemetry?droneId=:id  # Get drone telemetry
```

## Development

```bash
# Run dev server
npm run dev // i use this to run my webSite

# Type check
npx tsc --noEmit // to check for errors


# Build for production
npm run build

# Start production server
npm start
```

## Current Progress

- [x] Project setup with Next.js 14+ App Router
- [x] TypeScript strict mode configuration
- [x] Tailwind CSS v4 setup
- [x] Mock database with 25 drones & 55 missions
- [x] API Routes (Route Handlers)
- [x] Server Actions for mutations
- [x] React Query setup with providers
- [x] Zustand store for filters
- [x] Custom hooks (useDrones, useMissions, useTelemetry)
- [x] Loading skeletons and error boundaries
- [x] Font optimization with next/font
- [x] Fleet Overview page with real-time updates
- [x] Search and filter functionality
- [x] Grid/List view toggle
- [x] Drone cards with live data

TO do :

- [x] Drone Detail View page
- [x] Live telemetry display
- [x] Mission history table
- [x] Drone command interface
- [x] Live Map view with Leaflet
- [x] Mission Planning interface with waypoint drawing
- [x] Analytics dashboard with Recharts
- [x] Performance optimizations (virtualization, memoization)
- [x] Full responsive design polish
- [x] Accessibility improvements

1. Implement Server Actions for create/update/delete operations
2. Build Fleet Overview page with filters and search
3. Create interactive map with Leaflet
4. Develop mission planning interface
5. Build analytics charts with Recharts

## some resources :

I used : https://www.researchgate.net/figure/Database-schema-of-the-reconnaissance-platform-showing-the-relational-structure-for_fig3_393889665
for better design my mock data

https://react-leaflet.js.org for map page

https://sonner.emilkowal.ski/ for sonner notifactions

## 📄 License

MIT

## 👤 Author

Meshari
