# 📊 Frontend Performance Solutions

A comprehensive demonstration of different approaches to handle large data processing without freezing the UI. This project showcases three different solutions for processing massive GitHub Archive files and their impact on user experience.

## 🌐 Live Demo

**🔗 [View Live Demo](https://off-main-thread.fly.dev)**

Experience the performance difference between main thread processing and Web Worker processing in real-time!

## 🎯 Goal

Build a frontend app that demonstrates three different approaches to processing large datasets:

1. **UI Freezing Demo** - Shows the problem of blocking the main thread
2. **Streaming Solution** - Processes data in chunks to keep UI responsive
3. **Web Worker Solution** - Moves processing to a background thread

## 📊 Dataset

The app processes a **79MB gzipped GitHub events file** that contains:

- **NDJSON (Newline Delimited JSON)** format - each line is a valid JSON object
- **Several hundred MB** when uncompressed
- **Hundreds of thousands** of GitHub events from January 1st, 2024
- **Real production data** from GitHub Archive

Learn more about [NDJSON format](https://en.wikipedia.org/wiki/JSON_streaming#Newline-delimited_JSON).

## ❄️ The Problem

- Large datasets can cause the UI to freeze when processed on the main thread
- Modern browsers have protections that prevent extremely large files from loading synchronously
- Heavy computations block user interactions and animations
- Poor user experience when the interface becomes unresponsive

## ✅ The Solutions

- **Streaming**: Process data in small chunks to keep the main thread responsive
- **Web Workers**: Move heavy computations to background threads
- **Performance Comparison**: Clear demonstration of different approaches

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

- **Home** (`/`) - Project overview and navigation to all demos
- **UI Freezing Demo** (`/freezing`) - Shows the problem of blocking the main thread
- **Streaming Solution** (`/streaming`) - Processes data in chunks to keep UI responsive
- **Web Worker Solution** (`/web-worker`) - Moves processing to a background thread

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

1. **UI Freezing Problem** - How heavy computations can block the main thread
2. **Streaming Solutions** - Processing data in chunks to maintain responsiveness
3. **Web Worker Benefits** - Moving work to background threads
4. **Performance Optimization** - When and how to use different approaches
5. **User Experience** - The importance of responsive interfaces
6. **Real-world Data Processing** - Handling large NDJSON datasets

## 📝 Available Scripts

- `bun dev` - Start all applications in development mode
- `bun build` - Build all applications
- `bun dev:web` - Start only the web application
- `bun check-types` - Check TypeScript types across all apps
