import { useRef, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSettingsStore } from '@/store/settings';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PaperPlaneTiltIcon } from '@phosphor-icons/react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const API_URL = import.meta.env.VITE_CHAT_API_URL;

const FOLLOW_UP_CHIPS = ['Quiz me on this unit', 'Give me an example', 'How do I remember this?'];

function greeting(title: string) {
  return title
    ? `You're on **${title}**. Ask me anything, or type **Quiz** to test yourself.`
    : 'Ask me anything about the French language, or type **Quiz** to test yourself.';
}

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
  );
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAgentDrawer() {
  const allowCopyPaste = useSettingsStore((s) => s.allowCopyPaste);
  const currentPageContext = useSettingsStore((s) => s.currentPageContext);
  const currentPageTitle = useSettingsStore((s) => s.currentPageTitle);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: greeting(currentPageTitle) },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const questionHistory = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const inputDraft = useRef('');

  useEffect(() => {
    setMessages([{ role: 'assistant', content: greeting(currentPageTitle) }]);
  }, [currentPageTitle]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isLoading) textareaRef.current?.focus();
  }, [isLoading]);

  function handleHistoryKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'ArrowUp') {
      if (questionHistory.current.length === 0) return;
      e.preventDefault();
      if (historyIndex.current === -1) inputDraft.current = input;
      const next = Math.min(historyIndex.current + 1, questionHistory.current.length - 1);
      historyIndex.current = next;
      setInput(questionHistory.current[next]);
    } else if (e.key === 'ArrowDown') {
      if (historyIndex.current === -1) return;
      e.preventDefault();
      const next = historyIndex.current - 1;
      historyIndex.current = next;
      setInput(next < 0 ? inputDraft.current : questionHistory.current[next]);
    }
  }

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;
    const userMessage = text.trim();
    questionHistory.current = [userMessage, ...questionHistory.current];
    historyIndex.current = -1;
    inputDraft.current = '';
    const history: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setIsLoading(true);

    try {
      if (!API_URL) throw new Error('VITE_CHAT_API_URL is not set');
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
          context: currentPageContext || undefined,
        }),
      });
      if (!res.ok || !res.body) throw new Error(`Lambda error: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
              setMessages(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = { ...last, content: last.content + parsed.delta.text };
                return updated;
              });
            }
            if (parsed.error) throw new Error(parsed.error);
          } catch { /* malformed chunk — skip */ }
        }
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: 'French AI Agent is temporarily unavailable.' };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  const lastIsAssistant = messages[messages.length - 1]?.role === 'assistant';
  const showChips = !isLoading && lastIsAssistant && messages.length > 1;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">AI Agent</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[50vh] backdrop-blur-2xl border-t border-grey/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] [background:linear-gradient(to_bottom,rgba(180,190,210,0.08)_0%,rgba(140,155,180,0.04)_100%)]">
        <DrawerHeader className="pb-2">
          <DrawerTitle>French AI Agent</DrawerTitle>
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
                  {msg.content
                    ? msg.role === 'assistant'
                      ? (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-1">{children}</ol>,
                            li: ({ children }) => <li className="mb-0.5">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      )
                      : msg.content
                    : (isLoading && i === messages.length - 1 ? <TypingDots /> : '')}
                </div>
              </div>
            ))}
            {showChips && (
              <div className="flex flex-wrap gap-2 justify-start pl-1">
                {FOLLOW_UP_CHIPS.map(chip => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="text-xs px-2.5 py-1 rounded-full border transition-colors [border-color:rgba(0,35,149,0.25)] [color:rgba(0,35,149,0.6)] hover:[background-color:rgba(0,35,149,0.06)]"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="flex gap-2 items-end">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { handleHistoryKey(e); if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Ask a French question..."
              className="resize-none min-h-[40px] max-h-[120px]"
              rows={1}
              disabled={isLoading}
            />
            <Button size="icon" onClick={() => sendMessage(input)} disabled={isLoading}>
              <PaperPlaneTiltIcon size={16} />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
