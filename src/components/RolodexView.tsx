import { useState, useRef, useLayoutEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Section } from '@/types'

const PEEK = 80

export function RolodexView({ sections }: { sections: Section[] }) {
  const [index, setIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [heights, setHeights] = useState<number[]>([])
  const dragStartY = useRef(0)
  const scrollCooldown = useRef(false)

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault()
    if (scrollCooldown.current) return
    scrollCooldown.current = true
    setTimeout(() => { scrollCooldown.current = false }, 500)
    if (e.deltaY > 0) setIndex(i => Math.min(sections.length - 1, i + 1))
    else setIndex(i => Math.max(0, i - 1))
  }
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    setHeights(slotRefs.current.map(el => el?.offsetHeight ?? 0))
  }, [sections])

  const offsets = heights.reduce<number[]>((acc, _, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + heights[i - 1])
    return acc
  }, [])

  const currentHeight = heights[index] ?? 320
  const containerHeight = currentHeight + PEEK * 2
  const translateY = -(offsets[index] ?? 0) + dragOffset

  function startDrag(clientY: number) {
    dragStartY.current = clientY
    setDragging(true)
  }

  function moveDrag(clientY: number) {
    if (!dragging) return
    setDragOffset(clientY - dragStartY.current)
  }

  function endDrag() {
    if (!dragging) return
    setDragging(false)
    const threshold = currentHeight / 3
    if (dragOffset < -threshold) setIndex(i => Math.min(sections.length - 1, i + 1))
    else if (dragOffset > threshold) setIndex(i => Math.max(0, i - 1))
    setDragOffset(0)
  }

  return (
    <div className="px-4 py-4">
      <div
        onWheel={handleWheel}
        onMouseDown={e => { e.preventDefault(); startDrag(e.clientY) }}
        onMouseMove={e => moveDrag(e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={e => startDrag(e.touches[0].clientY)}
        onTouchMove={e => moveDrag(e.touches[0].clientY)}
        onTouchEnd={endDrag}
        style={{
          height: containerHeight,
          perspective: '700px',
          position: 'relative',
          overflow: 'hidden',
          cursor: dragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          transition: 'height 380ms ease',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            top: PEEK,
            transform: `translateY(${translateY}px)`,
            transition: dragging ? 'none' : 'transform 380ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {sections.map((section, i) => {
            const pixelDist = (offsets[i] ?? 0) - (offsets[index] ?? 0) - dragOffset
            const d = pixelDist / (currentHeight || 320)
            const rotateX = d * -22
            const opacity = Math.max(0, 1 - Math.abs(d) * 0.5)

            return (
              <div
                key={i}
                ref={el => { slotRefs.current[i] = el }}
                style={{
                  paddingBottom: 8,
                  transform: `rotateX(${rotateX}deg)`,
                  opacity,
                  transition: dragging ? 'none' : 'transform 380ms ease, opacity 380ms ease',
                  transformOrigin: 'center center',
                  pointerEvents: i === index ? 'auto' : 'none',
                }}
              >
                <Card className="border-l-4 border-l-secondary backdrop-blur-md ![background:linear-gradient(to_bottom,rgba(180,190,210,0.08)_0%,rgba(140,155,180,0.04)_100%)]">
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
                            <Badge key={`t-${j}`} variant="secondary" className="text-sm font-mono rounded-sm ![background-color:rgba(0,35,149,0.12)]">
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
