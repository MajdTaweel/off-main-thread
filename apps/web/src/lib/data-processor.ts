export interface ProcessedEvent {
  type: string;
  count: number;
}

async function processStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  decoder: TextDecoder,
  grouped: Record<string, number>,
  buffer = ''
): Promise<void> {
  const result = await reader.read();

  if (result.done) {
    // Process any remaining data in buffer
    if (buffer.trim()) {
      try {
        const event = JSON.parse(buffer) as { type: string };
        grouped[event.type] = (grouped[event.type] || 0) + 1;
      } catch {
        // Ignore invalid JSON
      }
    }
    return;
  }

  const chunk = decoder.decode(result.value, { stream: true });
  const newBuffer = buffer + chunk;
  const lines = newBuffer.split('\n');

  // Process all complete lines (all but the last one)
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    if (line.trim()) {
      try {
        const event = JSON.parse(line) as { type: string };
        grouped[event.type] = (grouped[event.type] || 0) + 1;
      } catch {
        // Ignore invalid JSON
      }
    }
  }

  // Keep the last (potentially incomplete) line for next iteration
  const remainingBuffer = lines.at(-1) || '';

  return processStream(reader, decoder, grouped, remainingBuffer);
}

function processGroupedData(grouped: Record<string, number>): ProcessedEvent[] {
  return Object.entries(grouped).map(([type, count]) => ({
    type: type.replace('Event', '').replace('PullRequest', 'PR'),
    count: count as number,
  }));
}

export async function fetchAndProcessGitHubEvents(): Promise<ProcessedEvent[]> {
  const response = await fetch('/2024-01-01-15.json.gz', { cache: 'no-store' });

  if (!response.body) {
    throw new Error('Response body is null');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const grouped: Record<string, number> = {};

  await processStream(reader, decoder, grouped);

  return processGroupedData(grouped);
}
