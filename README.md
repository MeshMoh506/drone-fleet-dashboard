Drone Fleet Management Dashboard
A production-grade drone fleet management interface built with Next.js 16 App Router, TypeScript, and Tailwind CSS. This project demonstrates modern web development practices with real-time data updates, interactive maps, and comprehensive analytics.

Live Demo
Repository: https://github.com/MeshMoh506/drone-fleet-dashboard

---

Key Features
Core Features (All Implemented)
Fleet Overview: Real-time monitoring of 25+ drones with advanced filtering.

Live Map View: Interactive map with real-time drone positions centered on Riyadh.

Mission Planning: Click-to-add waypoints with drag-to-reorder functionality.

Analytics Dashboard: Comprehensive charts and statistics using Recharts.

Drone Detail View: Live telemetry, commands, and mission history.

Advanced Features
Real-time updates: Data refreshes every 1-2 seconds with polling.

Interactive maps: Leaflet integration with custom markers and dynamic imports.

Optimistic updates: Instant UI feedback using React Query.

Live Simulation: Positions update, battery drains, and drones auto-charge when low.

Type-safe: TypeScript strict mode throughout with zero any types.

---

Tech Stack
Category Technology
Framework Next.js 16 (App Router)
Language TypeScript (Strict Mode)
Styling Tailwind CSS v4State
ManagementReact Query + Zustand
Maps Leaflet + React Leaflet ChartsRecharts Icons Lucide ReactAnimationsFramer MotionNotifications Sonner

---

Installation :

# Clone repository

git clone https://github.com/MeshMoh506/drone-fleet-dashboard.git
cd drone-fleet-dashboard

# Install dependencies

npm install

# Run development server

npm run dev

---

Open http://localhost:3000 to see the dashboard.

---

main Structure not fully!

drone-fleet-dashboard/
├── app/
│ ├── (dashboard)/ # Dashboard routes
│ │ ├── fleet/ # Fleet overview with filters
│ │ ├── map/ # Live map with drone positions
│ │ ├── missions/ # Mission planning and management
│ │ ├── analytics/ # Analytics dashboard
│ │ └── drones/[id]/ # Drone detail view
│ ├── api/ # Route Handlers (GET/POST/PATCH)
│ ├── actions/ # Server Actions for mutations
│ ├── providers.tsx # Context and Query providers
│ └── layout.tsx # Root layout with fonts
├── components/
│ ├── ui/ # Reusable UI (Skeletons, Error boundaries)
│ ├── fleet/ # Fleet-specific components
│ ├── map/ # Map-specific components
│ └── shared/ # Shared layout components
├── lib/
│ ├── types.ts # TypeScript interfaces
│ ├── mockDb.ts # Mock database (25 drones, 55 missions)
│ ├── utils.ts # Utility functions
│ └── validations.ts # Zod schemas
├── hooks/ # Custom hooks (useDrones, useTelemetry)
└── store/
└── useFilterStore.ts # Zustand UI state

    ------------------------------------

Architecture Highlights :

Server vs Client Components
Server Components are used by default for optimal performance and SEO.

Client Components are used only for interactivity (Leaflet maps, Framer Motion, and stateful forms).

Data Fetching Strategy
Server Components fetch initial data (SSR).

React Query handles client-side caching, polling, and synchronization.

Server Actions process all mutations (Create mission, update drone status).

Route Handlers provide REST API endpoints with simulated network delay (200-500ms).

---

Simulation Logic :
Dynamic Telemetry: Battery levels decrease over time and positions update in real-time.

Auto Behaviors: Drones change status to "Charging" when battery is low and toggle "Online/Offline" states.

---

API Endpoints :

# Drones

GET /api/drones # Get all drones (supports filtering)
GET /api/drones/:id # Get single drone details
PATCH /api/drones/:id # Update drone status/commands

# Missions

GET /api/missions # Get mission history
POST /api/missions # Create new mission
DELETE /api/missions?id=:id # Delete mission record

# Telemetry

GET /api/telemetry # Get global telemetry
GET /api/telemetry?droneId=:id # Get specific drone telemetry

---

Development Commands :

# Start development server

npm run dev

# Build for production

npm run build

# Start production server

npm start

# Code Quality

npm run lint # Run ESLint
npm run type-check # TypeScript validation

---

Requirement,Status,Implementation
Next.js 15+ App Router,Complete,Built on Next.js 16
TypeScript Strict Mode,Complete,Zero use of any
Tailwind CSS v4,Complete,Used for all styling
Real-time Updates,Complete,1-2s polling with React Query
Responsive Design,Complete,Mobile-first approach
Mock Database,Complete,"25 drones, 55+ missions"

---

License
MIT

Author
Meshari Frontend Developer

GitHub: @MeshMoh506

Last Updated: January 2026

Status: Complete - All requirements met
