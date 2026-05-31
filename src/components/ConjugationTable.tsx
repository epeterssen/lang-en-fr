import { useState } from 'react'
import { EraserIcon } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { TXT } from '@/utils/txt'

export interface ConjugationEntry {
  pronoun: string
  form: string
  tooltip: string
}

interface ConjugationTableProps {
  title: string
  titleTooltip: string
  tense?: string
  test?: boolean
  entries: ConjugationEntry[]
}

export function ConjugationTable({ title, titleTooltip, tense, test: initialTest = false, entries }: ConjugationTableProps) {
  const [test, setTest] = useState(initialTest)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  function toggle(i: number) {
    setRevealed(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">{TXT.ttip(title, titleTooltip, true)}{tense && <span className="font-normal text-muted-foreground"> ({tense})</span>}</p>
        <div className="flex items-center gap-2">
          {test && (
            <button
              onClick={() => setRevealed(new Set())}
              className="text-xs transition-colors ![color:rgba(0,35,149,0.18)] hover:![color:rgba(0,35,149,0.36)]"
            >
              <span className="flex items-center gap-1"><EraserIcon size={12} /> Clear</span>
            </button>
          )}
          <button
            role="switch"
            aria-checked={test}
            onClick={() => { setTest(t => !t); setRevealed(new Set()) }}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none ${test ? '![background-color:rgba(0,35,149,0.18)]' : 'bg-input'}`}
          >
            <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${test ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>
      <div className="inline-grid grid-cols-2 gap-x-6 gap-y-1">
        {entries.map((entry, i) => (
          <div key={i} className="flex gap-1.5 items-center text-sm">
            <Badge variant="secondary" className="text-sm font-mono rounded-sm ![background-color:rgba(0,35,149,0.12)] w-32 justify-start whitespace-nowrap">{entry.pronoun}</Badge>
            {test ? (
              <span
                className="text-sm w-28 cursor-pointer select-none"
                onClick={() => toggle(i)}
              >
                {revealed.has(i)
                  ? <span className="text-muted-foreground">{entry.form}</span>
                  : <span className="text-muted-foreground/30">——</span>
                }
              </span>
            ) : (
              <span className="text-sm text-muted-foreground w-28">{entry.form}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
