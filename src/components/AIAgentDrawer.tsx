import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { PaperPlaneTilt } from '@phosphor-icons/react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

const API_URL = import.meta.env.VITE_CHAT_API_URL

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AIAgentDrawer() {
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
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: data.content }
        return updated
      })
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: 'Something went wrong. Please try again.' }
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
      <DrawerContent className="h-[50vh] bg-background/80 backdrop-blur-[2px]">
        <DrawerHeader className="pb-2">
          <DrawerTitle>French Language Tutor</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col flex-1 overflow-hidden px-4 pb-4 gap-3">
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}>
                  {msg.content || (isLoading ? '…' : '')}
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
              placeholder="Ask a question..."
              className="resize-none min-h-[40px] max-h-[120px]"
              rows={1}
              disabled={isLoading}
            />
            <Button size="icon" onClick={handleSend} disabled={isLoading}>
              <PaperPlaneTilt size={16} />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
