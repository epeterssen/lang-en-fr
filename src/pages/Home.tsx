import { Button } from '@/components/ui/button'

export function Home() {
  return (
    <div className="flex items-center justify-center h-full min-h-[calc(100vh-120px)]">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">lang-en-fr</h1>
        <p className="text-muted-foreground">Ready to build.</p>
        <Button onClick={() => console.log('clicked')}>Get started</Button>
      </div>
    </div>
  )
}
