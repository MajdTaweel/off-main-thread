import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useAlert } from '@/components/alert-provider';
import { EventsChart } from '@/components/events-chart';
import { Button } from '@/components/ui/button';
import {
  fetchAndProcessGitHubEvents,
  type ProcessedEvent,
} from '@/lib/data-processor';

export const Route = createFileRoute('/main-thread')({
  component: MainThreadDemo,
});

const processData = async () => {
  // This freezes the UI
  return await fetchAndProcessGitHubEvents();
};

function MainThreadDemo() {
  const [chartData, setChartData] = useState<ProcessedEvent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showAlert } = useAlert();

  const handleProcessData = async () => {
    setIsProcessing(true);
    try {
      const data = await processData();
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
        <Button
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          disabled={isProcessing}
          onClick={handleProcessData}
        >
          {isProcessing
            ? 'Processing... (UI Frozen)'
            : 'Process Data (Will Freeze UI)'}
        </Button>
      </div>

      <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <h3 className="mb-2 font-semibold text-yellow-800">⚠️ Notice</h3>
        <p className="text-sm text-yellow-700">
          During processing, the UI becomes completely unresponsive. This
          demonstrates why heavy computations should be moved to Web Workers.
          Try the Web Worker demo to see the difference!
        </p>
      </div>

      {chartData.length > 0 && (
        <div className="mt-8">
          <EventsChart data={chartData} />
        </div>
      )}
    </div>
  );
}
