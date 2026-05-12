'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Image as ImageIcon } from 'lucide-react'

interface Message {
  role: 'user' | 'pal'
  text: string
  image?: string
  result?: any
}

export default function PalScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'pal', text: 'Hi! I\'m PAL, your materials expert. Ask me about materials for any space — bathrooms, exteriors, landscaping, furniture — and I\'ll recommend the best options for Indian architecture.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  async function sendMessage() {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('/api/pal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })
      const data = await res.json()

      if (data.data?.isText) {
        setMessages(prev => [...prev, { role: 'pal', text: data.data.text }])
      } else if (data.data?.scenario) {
        setMessages(prev => [...prev, { role: 'pal', text: `Got it — here are your options for: ${data.data.scenario}`, result: data.data }])
      } else {
        setMessages(prev => [...prev, { role: 'pal', text: 'Could not process that request. Try asking about materials for a specific space.' }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'pal', text: 'PAL is temporarily unavailable. Please try again.' }])
    }
    setLoading(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (evt) => {
      const base64 = evt.target?.result as string
      const preview = base64
      const b64Data = base64.split(',')[1]

      setMessages(prev => [...prev, { role: 'user', text: 'Identify this material', image: preview }])
      setLoading(true)

      try {
        const res = await fetch('/api/pal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Identify this material', imageBase64: b64Data, imageType: file.type }),
        })
        const data = await res.json()

        if (data.data?.name) {
          setMessages(prev => [...prev, { role: 'pal', text: `Found it! That's ${data.data.name}. ${data.data.pal_note || ''}` }])
        } else {
          setMessages(prev => [...prev, { role: 'pal', text: 'Could not identify the material. Try a clearer photo.' }])
        }
      } catch (error) {
        setMessages(prev => [...prev, { role: 'pal', text: 'Could not identify the material.' }])
      }
      setLoading(false)
    }
    reader.readAsDataURL(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function stars(n: number) { return '★'.repeat(n) + '☆'.repeat(5 - n) }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-3.5 pb-3" style={{ background: 'var(--cr2)', borderBottom: '1px solid var(--brl)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--br)' }}>
            <Sparkles size={20} strokeWidth={1.8} color="#fff" />
          </div>
          <div>
            <div className="font-serif text-xl font-semibold italic" style={{ color: 'var(--ink)' }}>PAL</div>
            <div className="text-[11px]" style={{ color: 'var(--mu)' }}>Palette AI Library</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto no-scrollbar px-4 py-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-4 ${msg.role === 'pal' ? '' : 'flex justify-end'}`}>
            {msg.image && (
              <div className="mb-2">
                <img src={msg.image} alt="Uploaded" className="max-w-[200px] rounded-xl" style={{ border: '0.5px solid var(--brl)' }} />
              </div>
            )}
            <div
              className="inline-block rounded-2xl px-4 py-2.5 max-w-[85%]"
              style={{
                background: msg.role === 'pal' ? 'var(--brp)' : 'var(--ink2)',
                border: msg.role === 'pal' ? '0.5px solid var(--brl)' : 'none',
                color: msg.role === 'pal' ? 'var(--ink2)' : '#F7F2EA',
              }}
            >
              <div className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.text}</div>
              {msg.result?.options && (
                <div className="mt-3 space-y-2.5">
                  {msg.result.options.map((opt: any, idx: number) => (
                    <div
                      key={idx}
                      className="rounded-xl p-3"
                      style={{
                        background: opt.best ? 'var(--cr)' : 'var(--cr2)',
                        border: opt.best ? '1px solid var(--br)' : '0.5px solid var(--brl)',
                      }}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="font-serif text-[15px] font-semibold" style={{ color: 'var(--ink)' }}>{opt.name}</div>
                        {opt.best && (
                          <span className="text-[9px] font-medium uppercase px-2 py-0.5 rounded-full" style={{ background: 'var(--br)', color: '#fff' }}>
                            Best
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] mb-2" style={{ color: 'var(--mu)' }}>{opt.specs}</div>
                      <div className="text-[12px] mb-1.5" style={{ color: 'var(--ink2)' }}>
                        <strong>Pros:</strong> {opt.pros}
                      </div>
                      <div className="text-[12px] mb-2" style={{ color: 'var(--ink2)' }}>
                        <strong>Cons:</strong> {opt.cons}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-[16px] font-semibold" style={{ color: 'var(--br)' }}>{opt.price}</div>
                        <div className="text-[12px]" style={{ color: 'var(--mu)' }}>{stars(opt.rating)}</div>
                      </div>
                      {opt.reason && (
                        <div className="mt-2 pt-2 text-[11px] italic" style={{ borderTop: '0.5px solid var(--brl)', color: 'var(--ink2)' }}>
                          {opt.reason}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="mb-4">
            <div className="inline-block rounded-2xl px-4 py-3" style={{ background: 'var(--brp)', border: '0.5px solid var(--brl)' }}>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--br)' }} />
                <div className="w-2 h-2 rounded-full animate-pulse delay-100" style={{ background: 'var(--br)' }} />
                <div className="w-2 h-2 rounded-full animate-pulse delay-200" style={{ background: 'var(--br)' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-4 pb-safe pt-3" style={{ background: 'var(--cr2)', borderTop: '1px solid var(--brl)' }}>
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)' }}
          >
            <ImageIcon size={18} strokeWidth={1.8} style={{ color: 'var(--ink2)' }} />
          </button>
          <div className="flex-1 flex items-center gap-2 rounded-full px-4 py-2.5" style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about materials…"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{ background: input.trim() && !loading ? 'var(--br)' : 'var(--cr3)' }}
            >
              <Send size={16} strokeWidth={1.8} style={{ color: input.trim() && !loading ? '#fff' : 'var(--mu)' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
