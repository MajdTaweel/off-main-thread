import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/web-worker')({
  component: WebWorkerDemo,
});

function WebWorkerDemo() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Web Worker Demo</h1>
        <p className="text-muted-foreground">
          This demo will process GitHub event data using a Web Worker, keeping
          the UI responsive. Notice how smooth the interface remains during
          processing.
        </p>
      </div>

      <div className="mb-6">
        <button
          className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          type="button"
        >
          Process Data (Smooth UI)
        </button>
      </div>

      <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-4">
        <h3 className="mb-2 font-semibold text-green-800">✅ Success</h3>
        <p className="text-green-700 text-sm">
          The UI remains responsive during processing because the heavy
          computation is offloaded to a Web Worker. This is the recommended
          approach for handling large datasets in web applications.
        </p>
      </div>
    </div>
  );
}
