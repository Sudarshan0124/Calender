# Frontend Event Calendar

A complete frontend-only event calendar built with React, TypeScript, and Tailwind CSS. All data is stored locally in your browser.

## Features

- 📅 **Monthly Calendar View** - Navigate between months with a clean interface
- ✏️ **Event Management** - Create, edit, and delete events with form validation
- 🎯 **Drag & Drop** - Reschedule events by dragging them to different dates
- 🔄 **Recurring Events** - Support for daily, weekly, monthly, and custom patterns
- 🏷️ **Event Categories** - Organize events with color-coded categories
- ⚠️ **Conflict Detection** - Warns when creating overlapping events
- 🔍 **Search & Filter** - Find events by title/description and filter by category
- 💾 **Local Storage** - All data persists in your browser automatically
- 📱 **Responsive Design** - Works perfectly on desktop and mobile

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

Your calendar will be available at `http://localhost:5173`

## How to Use

### Creating Events
- Click on any date in the calendar
- Fill in event details (title, time, description, category)
- Set recurrence if needed (none, daily, weekly, monthly, or custom)
- Click "Create Event"

### Managing Events
- Click on existing events to edit them
- Drag events to different dates to reschedule
- Use the delete button to remove events
- Events automatically save to your browser

### Filtering & Search
- Use the search bar to find specific events
- Click the filter button to show/hide categories
- View all upcoming events in the sidebar

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── calendar/     # Calendar-specific components
├── hooks/            # Custom React hooks
├── lib/              # Storage and utility functions
├── pages/            # Main page components
├── types/            # TypeScript definitions
└── App.tsx           # Main application
```

## Technologies

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **date-fns** for date handling
- **React Hook Form** with Zod validation
- **Vite** for fast development and building

## Browser Storage

All your events are saved automatically to localStorage. Your data will persist between browser sessions on the same device. To clear all data, you can use your browser's developer tools to clear localStorage for this site.

