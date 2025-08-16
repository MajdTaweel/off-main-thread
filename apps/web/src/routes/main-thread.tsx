import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/main-thread')({
  component: MainThreadDemo,
});

function MainThreadDemo() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Main Thread Demo</h1>
        <p className="text-muted-foreground">
          This demo will process GitHub event data on the main thread, which
          will freeze the UI. Try clicking the button and notice how the
          interface becomes unresponsive.
        </p>
      </div>

      <div className="mb-6">
        <button
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          type="button"
        >
          Process Data (Will Freeze UI)
        </button>
      </div>

      <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <h3 className="mb-2 font-semibold text-yellow-800">⚠️ Notice</h3>
        <p className="text-sm text-yellow-700">
          During processing, the UI becomes completely unresponsive. This
          demonstrates why heavy computations should be moved to Web Workers.
          Try the Web Worker demo to see the difference!
        </p>
      </div>
    </div>
  );
}
