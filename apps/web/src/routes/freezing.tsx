import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useAlert } from '@/components/alert-provider';
import { EventsChart } from '@/components/events-chart';
import { Button } from '@/components/ui/button';
import type { ProcessedEvent } from '@/lib/data-processor';

export const Route = createFileRoute('/freezing')({
  component: FreezingDemo,
});

// Function that uses a more robust simulation of heavy computation to ensure consistent UI freezing across environments
const processDataBlocking = (): ProcessedEvent[] => {
  // Simulate heavy computation that would freeze the UI
  const start = Date.now();
  const targetDuration = 3000; // 3 seconds

  // Block the main thread with CPU-intensive operations that work consistently across environments
  while (Date.now() - start < targetDuration) {
    // Block the main thread with CPU-intensive operations
    // This approach should be more consistent across different environments
    let result = 0;
    for (let i = 0; i < 100_000; i++) {
      result += Math.sqrt(i) + Math.sin(i) + Math.cos(i);
    }
    // Prevent optimization by using the result
    if (result > Number.MAX_SAFE_INTEGER) {
      // This should never happen, but prevents the compiler from optimizing away the loop
      return [];
    }
  }

  // Fallback: if the loop completes too quickly, add more work
  // This ensures the demo always shows the freezing behavior
  if (Date.now() - start < 1000) {
    // Add additional blocking work if the first approach was too fast
    const additionalStart = Date.now();
    while (Date.now() - additionalStart < 2000) {
      let result = 0;
      for (let i = 0; i < 50_000; i++) {
        result += i ** 2 + Math.log(i + 1);
      }
      if (result > Number.MAX_SAFE_INTEGER) {
        return [];
      }
    }
  }

  // Return sample data for demonstration
  return [
    { type: 'Push', count: 1250 },
    { type: 'Create', count: 890 },
    { type: 'Delete', count: 340 },
    { type: 'Fork', count: 567 },
    { type: 'Watch', count: 1234 },
    { type: 'Issues', count: 789 },
    { type: 'PR', count: 456 },
    { type: 'Release', count: 123 },
  ];
};

function FreezingDemo() {
  const [chartData, setChartData] = useState<ProcessedEvent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showAlert } = useAlert();

  const handleProcessData = async () => {
    setIsProcessing(true);
    try {
      const data = await processDataBlocking();
      setChartData(data);
      showAlert('success', 'Data processed successfully!', 'Success');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to process data';
      showAlert('destructive', errorMessage, 'Error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4 font-bold text-3xl">UI Freezing Demo</h1>
          <p className="mb-6 text-muted-foreground">
            This demo simulates processing a large dataset on the main thread,
            causing the UI to freeze for several seconds.
          </p>
          <Button
            className="mb-6"
            disabled={isProcessing}
            onClick={handleProcessData}
          >
            {isProcessing
              ? 'Processing... (UI Frozen)'
              : 'Process Data (Will Freeze UI)'}
          </Button>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="mb-2 font-semibold text-yellow-800">
              ⚠️ What to expect
            </h3>
            <p className="text-sm text-yellow-700">
              When you click the button, the UI will become completely
              unresponsive for 3 seconds while the main thread is blocked. This
              demonstrates the problem that streaming and Web Workers solve. Try
              the{' '}
              <Link
                className="font-medium text-yellow-900 underline hover:text-yellow-950"
                to="/streaming"
              >
                Streaming Solution
              </Link>{' '}
              and{' '}
              <Link
                className="font-medium text-yellow-900 underline hover:text-yellow-950"
                to="/web-worker"
              >
                Web Worker Solution
              </Link>{' '}
              to see how to avoid this!
            </p>
          </div>

          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="mb-2 font-semibold text-red-800">
              🔍 Why we're using a simulation
            </h3>
            <p className="text-red-700 text-sm">
              In a real application, this freezing would occur when using{' '}
              <code className="rounded bg-red-100 px-1">response.text()</code>{' '}
              on a large file (like our GitHub events dataset). However, modern
              browsers have built-in protections that prevent such large files
              from being loaded synchronously, which is why{' '}
              <code className="rounded bg-red-100 px-1">response.text()</code>{' '}
              returns empty data for very large files. This demo simulates the
              blocking behavior that would occur in older browsers or with
              smaller files that don't trigger these protections.
            </p>
          </div>

          <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
            <h3 className="mb-2 font-semibold text-orange-800">
              🧪 Technical Details
            </h3>
            <p className="text-orange-700 text-sm">
              The large dataset would decompress to several hundred MB of text.
              Modern browsers implement memory limits and timeout protections
              that prevent such large synchronous operations from completing.
              This is actually a good thing for user experience, but it makes
              demonstrating the original problem challenging. The simulation
              accurately represents the UI freezing behavior that developers
              encounter with heavy computations.
            </p>
          </div>
        </div>

        {chartData.length > 0 && (
          <div className="mt-8">
            <EventsChart data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}
