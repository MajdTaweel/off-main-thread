import { createFileRoute } from '@tanstack/react-router';
import logo from '../assets/logo.png';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <div className="flex items-center gap-4">
        <picture>
          <img
            alt="Off Main Thread Logo"
            className="h-24 w-24 rounded-lg border-1 border-primary/20"
            height={96}
            src={logo}
            width={96}
          />
        </picture>
        <h1 className="font-bold font-mono text-2xl">Off Main Thread</h1>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <h2 className="font-bold font-mono text-2xl">
          Massive GitHub Event Visualizer
        </h2>
        <p className="text-muted-foreground text-sm">
          A demonstration of how Web Workers can prevent UI freezing when
          processing large datasets.
        </p>
        <p className="text-muted-foreground text-sm">
          This app fetches massive GitHub Archive files (~100MB+ JSON) and
          visualizes event data using charts.
        </p>
        <p className="text-muted-foreground text-sm">
          Compare the performance difference between main thread processing
          (freezes UI) and Web Worker processing (smooth experience).
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <a
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
          href="/main-thread"
        >
          Main Thread Demo (Freezes)
        </a>
        <a
          className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 font-medium text-secondary-foreground text-sm hover:bg-secondary/90"
          href="/web-worker"
        >
          Web Worker Demo (Smooth)
        </a>
      </div>
    </div>
  );
}
