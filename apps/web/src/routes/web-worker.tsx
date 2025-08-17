import { createFileRoute } from '@tanstack/react-router';
import { wrap } from 'comlink';
import { useState } from 'react';
import { useAlert } from '@/components/alert-provider';
import { EventsChart } from '@/components/events-chart';
import { Button } from '@/components/ui/button';
import type { ProcessedEvent } from '@/lib/data-processor';

export const Route = createFileRoute('/web-worker')({
  component: WebWorkerDemo,
});

function WebWorkerDemo() {
  const [chartData, setChartData] = useState<ProcessedEvent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showAlert } = useAlert();

  const handleProcessData = async () => {
    setIsProcessing(true);
    try {
      const worker = new Worker(
        new URL('../workers/data-worker.ts', import.meta.url),
        { type: 'module' }
      );

      const workerApi = wrap<{
        fetchAndProcessGitHubEvents: () => Promise<ProcessedEvent[]>;
      }>(worker);

      const data = await workerApi.fetchAndProcessGitHubEvents();

      setChartData(data);
      showAlert(
        'success',
        'Data processed successfully in Web Worker!',
        'Success'
      );

      worker.terminate();
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
          <h1 className="mb-4 font-bold text-3xl">Web Worker Demo</h1>
          <p className="mb-6 text-muted-foreground">
            This demo processes the same large dataset using a Web Worker,
            keeping the UI responsive.
          </p>
          <Button
            className="mb-6"
            disabled={isProcessing}
            onClick={handleProcessData}
          >
            {isProcessing
              ? 'Processing... (UI Responsive)'
              : 'Process Data (Web Worker)'}
          </Button>

          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <h3 className="mb-2 font-semibold text-green-800">
              ✅ What to expect
            </h3>
            <p className="text-green-700 text-sm">
              When you click the button, the UI will remain completely
              responsive while processing the same 445MB of data in a Web
              Worker. Notice how smooth the interface stays! Compare this to the{' '}
              <a
                className="font-medium text-green-900 underline hover:text-green-950"
                href="/main-thread"
              >
                Main Thread Demo
              </a>{' '}
              to see the dramatic difference.
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
