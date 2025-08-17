# 📊 Massive GitHub Event Visualizer

A demonstration of how Web Workers can prevent UI freezing when processing large datasets. This project showcases the performance difference between processing massive GitHub Archive files on the main thread versus using Web Workers.

## 🎯 Goal

Build a frontend app that:

1. Fetches large GitHub event archives (JSON lines format)
2. Parses and transforms the data (groups events by type)
3. Displays results using interactive charts
4. Demonstrates UI freezing vs smooth performance

## ❄️ The Problem

- GitHub Archive files are **massive (445MB JSON)**
- Parsing hundreds of thousands of records on the **main thread** blocks the browser
- UI becomes completely unresponsive during processing
- Users can't interact with the interface while data is being processed

## ✅ The Solution

- **Main Thread Demo**: Shows UI freezing with synchronous processing
- **Web Worker Demo**: Demonstrates smooth UI with offloaded processing
- **Performance Comparison**: Clear before/after demonstration

## 🚀 Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Recharts** - Interactive data visualization
- **Alert System** - User-friendly notifications
- **Dark Mode** - Modern UI with theme support
- **Comlink** - Simplified Web Worker communication

## 🛠️ Tech Stack

| **Technology**        | **Purpose**                              |
| --------------------- | ---------------------------------------- |
| **React + shadcn/ui** | Solid UI base with accessible components |
| **TanStack Router**   | Type-safe file-based routing             |
| **Recharts**          | Interactive data visualization           |
| **Web Workers**       | Offload heavy computations               |
| **Comlink**           | Simplified Web Worker communication      |
| **TailwindCSS**       | Utility-first styling                    |
| **TypeScript**        | Type safety and developer experience     |

## 🚀 Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the application.

## 📊 Demo Pages

- **Home** (`/`) - Project overview and navigation
- **Main Thread Demo** (`/main-thread`) - Demonstrates UI freezing with large data processing
- **Web Worker Demo** (`/web-worker`) - Shows smooth performance with Web Workers

## 📁 Project Structure

```
off-main-thread/
├── apps/
│   └── web/                    # Frontend application
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   ├── routes/         # TanStack Router pages
│       │   └── workers/        # Web Worker files
│       └── public/
│           └── data/           # GitHub Archive sample files
```

## 🎯 Learning Objectives

This project demonstrates:

1. **Main Thread Blocking** - How heavy computations freeze the UI
2. **Web Worker Benefits** - Offloading work to background threads
3. **Performance Optimization** - When and how to use Web Workers
4. **User Experience** - The importance of responsive interfaces

## 📝 Available Scripts

- `bun dev` - Start all applications in development mode
- `bun build` - Build all applications
- `bun dev:web` - Start only the web application
- `bun check-types` - Check TypeScript types across all apps
