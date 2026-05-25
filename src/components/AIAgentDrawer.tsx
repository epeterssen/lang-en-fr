import { useRef, useState, useEffect } from 'react'
import { useSettingsStore } from '@/store/settings'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { PaperPlaneTiltIcon } from '@phosphor-icons/react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

const API_URL = import.meta.env.VITE_CHAT_API_URL

function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center h-4">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-current opacity-50 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  )
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AIAgentDrawer() {
  const allowCopyPaste = useSettingsStore((s) => s.allowCopyPaste)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Ask me anything about the French language.' },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    if (!input.trim() || isLoading) return
    const userMessage = input.trim()
    const history: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setIsLoading(true)

    try {
      if (!API_URL) throw new Error('VITE_CHAT_API_URL is not set')
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      if (!res.ok) throw new Error(`Lambda error: ${res.status}`)
      const data = await res.json()
      const content = typeof data === 'string' ? data : (data.content ?? 'French AI Agent is temporarily unavailable.')
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content }
        return updated
      })
    } catch (err) {
      console.error(err instanceof Error ? err.message : err)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: 'French AI Agent is temporarily unavailable.' }
        return updated
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">AI Agent</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[50vh] backdrop-blur-2xl border-t border-grey/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] [background:linear-gradient(to_bottom,rgba(180,190,210,0.08)_0%,rgba(140,155,180,0.04)_100%)]">
        <DrawerHeader className="pb-2">
          <DrawerTitle>French Language Tutor</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col flex-1 overflow-hidden px-4 pb-4 gap-3">
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${allowCopyPaste ? 'select-text' : 'select-none'} ${
                  msg.role === 'user'
                    ? 'text-foreground [background-color:rgba(237,41,57,0.06)]'
                    : 'text-foreground [background-color:rgba(0,35,149,0.06)]'
                }`}>
                  {msg.content || (isLoading && i === messages.length - 1 ? <TypingDots /> : '')}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="flex gap-2 items-end">
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
              placeholder="Ask a French question..."
              className="resize-none min-h-[40px] max-h-[120px]"
              rows={1}
              disabled={isLoading}
            />
            <Button size="icon" onClick={handleSend} disabled={isLoading}>
              <PaperPlaneTiltIcon size={16} />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
