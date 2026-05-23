import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">404</p>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">Page not found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you were looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
