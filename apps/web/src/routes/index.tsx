import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <div className="flex items-center gap-4">
        <picture>
          <img
            alt="Off Main Thread Logo"
            className="h-24 w-24 rounded-lg border-1 border-primary/20"
            height={96}
            src="/logo.png"
            width={96}
          />
        </picture>
        <h1 className="font-bold font-mono text-2xl">Off Main Thread</h1>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <h2 className="font-bold font-mono text-2xl">
          Frontend Performance Solutions
        </h2>
        <p className="text-muted-foreground text-sm">
          A demonstration of different approaches to handle large data
          processing without freezing the UI.
        </p>
        <p className="text-muted-foreground text-sm">
          This app processes a large GitHub events dataset and visualizes the
          results using charts. Explore three different approaches to understand
          frontend performance optimization.
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
        <h3 className="mb-2 font-semibold text-indigo-800">
          📊 About the dataset
        </h3>
        <p className="text-indigo-700 text-sm">
          We're processing a <strong>79MB gzipped file</strong> containing{' '}
          <strong>NDJSON (Newline Delimited JSON)</strong> data with hundreds of
          thousands of GitHub events from January 1st, 2024. When uncompressed,
          it's several hundred MB of real production data from GitHub Archive.
          Each line is a valid JSON object representing a GitHub event (pushes,
          pull requests, issues, etc.). Learn more about{' '}
          <a
            className="font-medium text-indigo-900 underline hover:text-indigo-950"
            href="https://en.wikipedia.org/wiki/JSON_streaming#Newline-delimited_JSON"
            rel="noopener noreferrer"
            target="_blank"
          >
            NDJSON format
          </a>
          .
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          className="inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-3 font-medium text-sm text-white transition-colors hover:bg-red-600"
          to="/freezing"
        >
          <div className="text-center">
            <div className="font-bold">UI Freezing Demo</div>
            <div className="text-xs opacity-90">The Problem</div>
          </div>
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-sm text-white transition-colors hover:bg-blue-600"
          to="/streaming"
        >
          <div className="text-center">
            <div className="font-bold">Streaming Solution</div>
            <div className="text-xs opacity-90">Solution 1</div>
          </div>
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-green-500 px-4 py-3 font-medium text-sm text-white transition-colors hover:bg-green-600"
          to="/web-worker"
        >
          <div className="text-center">
            <div className="font-bold">Web Worker Solution</div>
            <div className="text-xs opacity-90">Solution 2</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
