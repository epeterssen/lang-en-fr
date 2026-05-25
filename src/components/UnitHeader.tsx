import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const KeyE: Record<string, React.ReactNode> = {
  Masc: <>(<em>m.</em>)</>,
  Fem: <>(<em>f.</em>)</>,
  Inf: <>(<em>inf.</em>)</>,
  Form: <>(<em>form.</em>)</>,
}

const keyEntries: { term: React.ReactNode; detail: React.ReactNode }[] = [
  { term: KeyE.Masc, detail: 'Masculine' },
  { term: KeyE.Fem, detail: 'Feminine' },
  { term: KeyE.Inf, detail: 'Informal' },
  { term: KeyE.Form, detail: 'Formal' },
]

export function UnitHeader({ title }: { title: string }) {
  const navigate = useNavigate()
  const [keyOpen, setKeyOpen] = useState(false)

  return (
    <>
      {keyOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setKeyOpen(false)} />
      )}
      {keyOpen && (
        <div className="fixed right-4 top-[152px] z-50 w-80">
          <Card className="backdrop-blur-2xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] [background:linear-gradient(to_bottom,rgba(180,190,210,0.08)_0%,rgba(140,155,180,0.04)_100%)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Key</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-2 items-center">
                {keyEntries.map((entry, i) => (
                  <>
                    <Badge key={`t-${i}`} variant="secondary" className="text-sm font-mono rounded-sm ![background-color:rgba(0,35,149,0.12)]">{entry.term}</Badge>
                    <dd key={`d-${i}`} className="text-sm text-muted-foreground">{entry.detail}</dd>
                  </>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="sticky top-24 bg-background z-10 flex items-center justify-between px-4 pt-4 pb-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setKeyOpen(o => !o)}>Key</Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/main-menu')}>Main Menu</Button>
        </div>
      </div>
    </>
  )
}
