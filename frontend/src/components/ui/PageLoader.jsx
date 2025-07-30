const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="relative">
        <span className="text-4xl font-bold font-space bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
          H
        </span>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
      </div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

export default PageLoader;