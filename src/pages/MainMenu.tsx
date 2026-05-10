import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function MainMenu() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-120px)]">
      <h2 className="text-2xl font-semibold px-4 pt-4">Main Menu</h2>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Ready to build.</p>
          <Button onClick={() => navigate('/')}>Home</Button>
        </div>
      </div>
    </div>
  )
}
