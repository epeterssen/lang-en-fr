import { useState } from 'react'

function TtipTogglable({ display, tooltip, reverse }: { display: string; tooltip: string; reverse: boolean }) {
  const [toggled, setToggled] = useState(reverse)
  return (
    <span
      className="ttip"
      data-tooltip={toggled ? display : tooltip}
      onClick={() => setToggled(t => !t)}
      style={{ cursor: 'pointer' }}
    >
      {toggled ? tooltip : display}
    </span>
  )
}

export class TXT {
  static ttip = (display: string, tooltip: string, resolve: boolean = false, reverse: boolean = false): React.ReactNode => {
    if (!resolve) {
      return <span className="ttip" data-tooltip={reverse ? display : tooltip}>{reverse ? tooltip : display}</span>
    }
    return <TtipTogglable display={display} tooltip={tooltip} reverse={reverse} />
  }

  static trans = (display: string, tooltip: string): React.ReactNode => (
    <span>{display} <span className="text-muted-foreground">({tooltip})</span></span>
  )

  static bold = (content: React.ReactNode): React.ReactNode => (
    <span className="font-semibold">{content}</span>
  )
}
