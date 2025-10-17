# Planar - Automated Construction Cost Estimates

A full-stack web application that helps small developers and builders in Africa generate automated construction cost estimates (Bills of Quantities).

## Features

- Simple numeric/text input form for building specifications
- Automated calculation of material quantities and costs for one-room foundations
- Detailed breakdown of excavation, blinding, foundation, and column materials
- Labor cost estimation based on location
- CSV export of Bill of Quantities
- Data persistence using Supabase PostgreSQL database
- Responsive design with clean, professional UI

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, TailwindCSS
- **State Management**: React Reducers (following container/actions/reducer pattern)
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React

## Project Structure

```
/tmp/cc-agent/58825529/project/
├── app/
│   ├── api/
│   │   └── calculate/
│   │       └── route.ts          # API endpoint for BoQ calculations
│   ├── layout.tsx
│   ├── page.tsx                  # Main page using BoqContainer
│   └── globals.css
├── containers/
│   └── BoqContainer/             # Main container with state management
│       ├── index.tsx             # Container component
│       ├── actions.ts            # Redux-style actions
│       ├── reducer.ts            # State reducer
│       ├── constants.ts          # Action types and constants
│       └── types.ts              # TypeScript interfaces
├── components/
│   ├── BoqForm.tsx               # Input form component
│   ├── BoqResults.tsx            # Results display component
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── calculateBoq.ts           # Core calculation logic
│   ├── supabase.ts               # Supabase client configuration
│   └── utils.ts
└── package.json
```

## Calculation Logic

The application implements precise construction calculations based on standard civil engineering formulas:

### Excavation
- Volume = Perimeter × Trench Width × Trench Depth
- Perimeter = 4 × Length

### Blinding Concrete (1:3:6 mix ratio)
- Dry Volume = (Perimeter × Width × Thickness) × 1.54
- Materials calculated based on cement:sand:gravel ratio

### Foundation Concrete (1:2:4 mix ratio)
- Similar to blinding but with different thickness and ratios

### Column Concrete (1:2:4 mix ratio)
- Volume = Depth × Width × Width × Number of Columns
- Default: 0.75m depth, 0.225m width, 4 columns

### Labor Cost
- Cost = Rate per m³ × Excavation Volume
- Rates vary by location (Lagos: ₦4000/m³, Abuja: ₦3800/m³, etc.)

## Database Schema

**Table: `boq_records`**

Stores all generated BoQ records with:
- Project metadata (name, type, dimensions, location)
- Calculated volumes and quantities
- Material breakdowns for blinding, foundation, and columns
- Labor costs
- Timestamps

Row Level Security (RLS) is enabled with public access policies for the MVP.

## Getting Started

1. Ensure environment variables are set in `.env`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run type checking:
   ```bash
   npm run typecheck
   ```

## API Endpoints

### POST /api/calculate

Generate a Bill of Quantities calculation.

**Request Body:**
```json
{
  "projectName": "My Project",
  "buildingType": "One room",
  "length": 12,
  "width": 12,
  "location": "Lagos"
}
```

**Response:**
```json
{
  "excavationVolume": 22,
  "blinding": {
    "cement": 6.34,
    "sand": 1.07,
    "gravel": 2.26,
    "water": 154.5
  },
  "foundation": {
    "cement": 27.14,
    "sand": 3.04,
    "gravel": 6.46,
    "water": 678.5
  },
  "column": {
    "cement": 0.95,
    "sand": 0.11,
    "gravel": 0.23,
    "water": 23.75
  },
  "laborCost": 88000,
  "recordId": "uuid"
}
```

## Future Extensions

The project is structured to support future enhancements:

- Additional building types and custom dimensions
- Multiple construction stages beyond foundation
- Material cost database with real-time pricing
- PDF export functionality
- User authentication and project management
- Collaborative features for teams
- Mobile application
- Integration with material suppliers
- Advanced reporting and analytics

## License

Proprietary - All rights reserved
