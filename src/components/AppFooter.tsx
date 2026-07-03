export function AppFooter() {
  return (
    <footer className="sticky bottom-0 bg-background border-t border-border/50 px-4 py-2 text-sm text-muted-foreground text-right">
      Understanding French<sup>&copy;{new Date().getFullYear()}</sup>
    </footer>
  );
}
