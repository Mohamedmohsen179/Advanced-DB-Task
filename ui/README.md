# Faculty System - Next.js Frontend

Complete CRUD management frontend for the Faculty System API.

## Features

- ✅ Next.js 14+ with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Axios for API requests
- ✅ Complete CRUD operations for all entities
- ✅ Form validation
- ✅ Loading and error states
- ✅ Responsive design
- ✅ Navigation sidebar

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running (default: http://localhost:5194)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure API URL (optional):
   - Create a `.env.local` file in the `ui` folder
   - Add: `NEXT_PUBLIC_API_URL=http://localhost:5194/api`
   - Or update the default in `lib/api.ts`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ui/
├── app/                    # Next.js App Router pages
│   ├── students/          # Student CRUD pages
│   ├── doctors/          # Doctor CRUD pages
│   ├── courses/          # Course CRUD pages
│   ├── departements/     # Department CRUD pages
│   └── ...                # Other entity pages
├── components/            # Reusable components
│   ├── Navigation.tsx    # Sidebar navigation
│   ├── Loading.tsx       # Loading spinner
│   └── Error.tsx         # Error display
├── lib/
│   └── api.ts            # Central API service
├── types/
│   └── index.ts          # TypeScript type definitions
└── public/               # Static assets
```

## Available Entities

The frontend includes CRUD operations for:

- Students
- Doctors
- Courses
- Departements
- Course Schedules
- Enrollements
- Teaches
- Doctor Addresses
- Doctor Phones
- Doctor Rate Audits
- Student Addresses
- Student Phones

## API Configuration

The API base URL is configured in `lib/api.ts`. By default, it uses:
- `http://localhost:5194/api` (or `NEXT_PUBLIC_API_URL` environment variable)

Make sure your backend API is running and accessible at this URL.

## Building for Production

```bash
npm run build
npm start
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Notes

- All forms include client-side validation
- All API calls include error handling
- The UI is fully responsive and works on mobile devices
- Dark mode support is included via Tailwind CSS
