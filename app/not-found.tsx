import { Button } from "@/components/ui/button";
import { TerminalWindow } from "@/components/ui/terminal-window";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-32 text-center md:px-16">
      <TerminalWindow title="404.ts" className="w-full max-w-md text-left">
        {`throw new NotFoundException(
  'Route not found: ' + request.path
)`}
      </TerminalWindow>
      <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-[0.98] font-medium tracking-tight text-primary">
        This page didn&apos;t ship.
      </h1>
      <p className="max-w-md text-lg text-secondary">
        The route you&apos;re looking for doesn&apos;t exist, or moved. Let&apos;s get you back
        on track.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary">
          Back to Home
        </Button>
        <Button href="/contact" variant="ghost">
          Contact Us
        </Button>
      </div>
    </main>
  );
}
