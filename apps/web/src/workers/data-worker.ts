import { expose } from 'comlink';
import { fetchAndProcessGitHubEvents } from '@/lib/data-processor';

expose({ fetchAndProcessGitHubEvents });
