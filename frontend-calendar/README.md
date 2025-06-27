# Frontend Event Calendar

A dynamic, interactive event calendar built with React, TypeScript, and Tailwind CSS. This is a frontend-only application that uses localStorage for data persistence.

## Features

- **Monthly Calendar View**: Navigate between months with a clean, responsive layout
- **Event Management**: Create, edit, and delete events with form validation
- **Drag & Drop**: Reschedule events by dragging them to different dates
- **Recurring Events**: Support for daily, weekly, monthly, and custom recurrence patterns
- **Event Categories**: Organize events with color-coded categories (Personal, Work, Other)
- **Conflict Detection**: Warns when creating overlapping events
- **Search & Filter**: Find events by title/description and filter by category
- **Local Storage**: All data persists in browser localStorage
- **Responsive Design**: Works on desktop and mobile devices

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

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (buttons, inputs, modals)
│   └── calendar/     # Calendar-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and storage logic
├── pages/            # Main page components
├── types/            # TypeScript type definitions
└── App.tsx           # Main application component
```

## Key Components

- **Calendar Grid**: Main calendar interface with month view
- **Event Modal**: Form for creating/editing events
- **Conflict Modal**: Handles event scheduling conflicts
- **Filter Sidebar**: Category filtering and search
- **Event Storage**: localStorage wrapper for data persistence

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **date-fns** - Date manipulation and formatting
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Wouter** - Lightweight client-side routing
- **Vite** - Fast build tool and development server

## Usage

### Creating Events
- Click on any date in the calendar to create a new event
- Fill in the event details including title, time, description, and category
- Set recurrence patterns if needed (daily, weekly, monthly, or custom)

### Managing Events
- Click on existing events to edit them
- Drag events to different dates to reschedule
- Use the delete button to remove events

### Filtering & Search
- Use the search bar to find events by title or description
- Click the filter button to show/hide event categories
- View upcoming events in the sidebar

### Data Persistence
All your events are automatically saved to your browser's localStorage. They will persist between sessions on the same device and browser.

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

This is a frontend-only application. To add new features:

1. Add new types to `src/types/index.ts`
2. Create new components in `src/components/`
3. Add new hooks in `src/hooks/`
4. Extend the storage logic in `src/lib/storage.ts`

## License

MIT License - feel free to use this code for your own projects.