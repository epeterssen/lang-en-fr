import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Section } from '@/types'

const VARIANTS = {
  blue: {
    card: 'border-l-4 border-l-[rgba(0,35,149,0.75)] backdrop-blur-md ![background:linear-gradient(to_bottom,rgba(180,190,210,0.08)_0%,rgba(140,155,180,0.04)_100%)]',
    badge: '![background-color:rgba(0,35,149,0.12)]',
  },
  red: {
    card: 'border-l-4 border-l-[rgba(237,41,57,0.75)] backdrop-blur-md ![background:linear-gradient(to_bottom,rgba(237,41,57,0.04)_0%,rgba(237,41,57,0.02)_100%)]',
    badge: '![background-color:rgba(237,41,57,0.12)]',
  },
}

export function SectionCard({ section }: { section: Section }) {
  const v = VARIANTS[section.variant ?? 'blue']

  return (
    <Card className={v.card}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          {section.icon}
          {section.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-2 items-center">
          {section.content.map((item, j) => (
            item.term ? (
              <>
                <Badge key={`t-${j}`} variant="secondary" className={`text-sm font-mono rounded-sm ${v.badge}`}>
                  {item.term}
                </Badge>
                <dd key={`d-${j}`} className="text-sm text-muted-foreground">{item.detail}</dd>
              </>
            ) : (
              <dd key={`d-${j}`} className="col-span-2 text-sm text-muted-foreground">{item.detail}</dd>
            )
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
