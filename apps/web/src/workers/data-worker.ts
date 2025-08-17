import { expose } from 'comlink';
import { fetchAndProcessGitHubEvents } from '@/lib/data-processor';

// Expose the function to the main thread
expose({
  fetchAndProcessGitHubEvents,
});
