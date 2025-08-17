export interface ProcessedEvent {
  type: string;
  count: number;
}

export async function fetchAndProcessGitHubEvents(): Promise<ProcessedEvent[]> {
  const response = await fetch('/data/gharchive/500mb-sample.json');
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }

  const rawData = await response.text();

  // This is where the UI freezes (when ran on main thread)
  const events = rawData
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));

  // This also freezes the UI (when ran on main thread)
  const grouped = events.reduce(
    (acc: Record<string, number>, ev: { type: string }) => {
      acc[ev.type] = (acc[ev.type] || 0) + 1;
      return acc;
    },
    {}
  );

  const processedData = Object.entries(grouped).map(([type, count]) => ({
    type: type.replace('Event', '').replace('PullRequest', 'PR'),
    count: count as number,
  }));

  return processedData;
}
