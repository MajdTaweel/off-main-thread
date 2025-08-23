import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useAlert } from '@/components/alert-provider';
import { EventsChart } from '@/components/events-chart';
import { Button } from '@/components/ui/button';
import {
  fetchAndProcessGitHubEvents,
  type ProcessedEvent,
} from '@/lib/data-processor';

export const Route = createFileRoute('/streaming')({
  component: StreamingDemo,
});

const processData = async () => {
  // This uses streaming to avoid UI freezing
  return await fetchAndProcessGitHubEvents();
};

function StreamingDemo() {
  const [chartData, setChartData] = useState<ProcessedEvent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showAlert } = useAlert();

  const handleProcessData = async () => {
    setIsProcessing(true);
    try {
      const data = await processData();
      setChartData(data);
      showAlert(
        'success',
        'Data processed successfully with streaming!',
        'Success'
      );
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
          <h1 className="mb-4 font-bold text-3xl">Streaming Solution</h1>
          <p className="mb-6 text-muted-foreground">
            This demo processes a large dataset on the main thread using
            streaming, which keeps the UI responsive by processing data in small
            chunks.
          </p>
          <Button
            className="mb-6"
            disabled={isProcessing}
            onClick={handleProcessData}
          >
            {isProcessing
              ? 'Processing... (UI Responsive)'
              : 'Process Data (Streaming)'}
          </Button>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-800">
              🔄 How streaming works
            </h3>
            <p className="text-blue-700 text-sm">
              Instead of loading the entire large dataset into memory at once,
              this approach streams the data in small chunks and processes each
              chunk immediately. This keeps the main thread responsive by
              yielding control back to the browser between chunks. Compare this
              to the{' '}
              <Link
                className="font-medium text-blue-900 underline hover:text-blue-950"
                to="/freezing"
              >
                Freezing Demo
              </Link>{' '}
              and{' '}
              <Link
                className="font-medium text-blue-900 underline hover:text-blue-950"
                to="/web-worker"
              >
                Web Worker Demo
              </Link>{' '}
              to see the different approaches!
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
