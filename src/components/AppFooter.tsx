export function AppFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 bg-background border-t border-border/50 px-4 py-2 text-xs sm:text-sm text-muted-foreground text-right">
      Understanding French<sup>&copy;{new Date().getFullYear()}</sup>
    </footer>
  );
}
