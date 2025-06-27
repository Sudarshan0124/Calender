# Event Calendar Application

## Overview

This is a frontend-only event calendar application built with React and Vite. The application provides a dynamic, interactive calendar interface where users can manage their schedule by adding, editing, deleting, and viewing events. It features a monthly calendar view with drag-and-drop functionality, recurring events support, and event conflict detection. All data is persisted locally using browser localStorage.

## System Architecture

The application is a single-page application (SPA) with no backend dependencies:

- **Frontend**: React application built with Vite, using TypeScript and Tailwind CSS
- **Data Storage**: Browser localStorage for event persistence
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React hooks for local state management

## Key Components

### Frontend Architecture
- **Client Directory**: Contains the React application with components, pages, hooks, and utilities
- **Component Structure**: Organized into UI components (reusable) and feature-specific components (calendar)
- **Routing**: Uses Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Data Storage Architecture
- **LocalStorage Service**: Custom EventStorage class for client-side data persistence
- **Event Management**: CRUD operations performed directly in the browser
- **Data Validation**: Zod schemas ensure type safety and data integrity
- **Auto-sync**: Changes are automatically saved to localStorage

## Data Flow

1. **User Interactions**: React components handle user actions directly
2. **Local Processing**: Events are managed through the EventStorage service
3. **Data Persistence**: All data is saved to browser localStorage
4. **UI Updates**: React state updates trigger immediate UI changes
5. **Error Management**: Comprehensive error handling with user-friendly toast notifications

### Event Management Flow
- Events are created through modal forms with validation
- Drag-and-drop functionality allows rescheduling with conflict detection
- Recurring events are handled with configurable patterns
- Real-time updates ensure calendar state consistency

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18+ with TypeScript support
- **UI Framework**: Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with PostCSS processing
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Date Handling**: date-fns for date manipulation and formatting
- **Validation**: Zod for schema validation

### Build Tools
- **Bundler**: Vite with React plugin
- **TypeScript**: Full TypeScript support
- **Build Process**: Single frontend build command

## Deployment Strategy

The application is configured for frontend-only deployment:

- **Development**: Vite dev server runs on port 5000
- **Build Process**: `vite build` creates production build
- **Data Storage**: Browser localStorage provides data persistence
- **Environment**: Node.js 20 runtime for development tools only

### Replit Configuration
- **Port Configuration**: Frontend runs on port 5000
- **Build Strategy**: Static site deployment
- **Module Dependencies**: Node.js for development tools only

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 26, 2025. Initial setup