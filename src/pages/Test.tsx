import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Test() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Test Page</h1>
        <p className="text-muted-foreground">Ready to build.</p>
        <Button onClick={() => navigate('/')}>Go to first page</Button>
      </div>
    </div>
  )
}
