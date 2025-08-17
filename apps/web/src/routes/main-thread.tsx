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
    <div className="container mx-auto p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4 font-bold text-3xl">Main Thread Demo</h1>
          <p className="mb-6 text-muted-foreground">
            This demo processes a large dataset on the main thread, causing the
            UI to freeze.
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
              unresponsive for several seconds while processing 445MB of data.
              This demonstrates why heavy computations should be moved to Web
              Workers. Try the{' '}
              <a
                className="font-medium text-yellow-900 underline hover:text-yellow-950"
                href="/web-worker"
              >
                Web Worker Demo
              </a>{' '}
              to see the difference!
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
