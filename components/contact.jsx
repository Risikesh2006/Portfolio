'use client'

import { useState } from 'react'
import { Mail, Github, Linkedin, ArrowUpRight, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ScrollReveal } from '@/components/scroll-reveal'

const SOCIALS = [
  { label: 'Email', value: 'risisonu2006@gmail.com', href: 'mailto:risisonu2006@gmail.com', icon: Mail },
  { label: 'GitHub', value: 'github.com/Risikesh2006', href: 'https://github.com/Risikesh2006', icon: Github },
  { label: 'LinkedIn', value: 'linkedin.com/in/risikesh-somnath-t', href: 'https://www.linkedin.com/in/risikesh-somnath-t-7b5222376', icon: Linkedin },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus({ state: 'error', msg: 'Please fill in name, email, and message.' })
      return
    }
    setStatus({ state: 'loading', msg: '' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setStatus({ state: 'error', msg: data.error || 'Something went wrong. Try again.' })
        return
      }
      if (data.emailed) {
        setStatus({ state: 'success', msg: "Message sent! I'll get back to you soon." })
      } else {
        setStatus({ state: 'success', msg: 'Message received! I\u2019ll be in touch soon.' })
      }
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus({ state: 'error', msg: 'Network error. Please try again.' })
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs sm:text-sm font-mono text-muted-foreground mb-3">05 — Contact</p>
          <h2 className="text-[clamp(28px,8vw,56px)] sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Let&apos;s build <span className="gradient-text">something great.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-8 sm:mb-12 leading-relaxed">
            Have an idea, a role, or a collaboration in mind? Drop me a message below or reach out directly — my inbox is always open.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Form */}
          <ScrollReveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={onSubmit} className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="bg-background/40 border-border/60 min-h-[48px]"
                    disabled={status.state === 'loading'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className="bg-background/40 border-border/60 min-h-[48px]"
                    disabled={status.state === 'loading'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="What&apos;s this about?"
                  className="bg-background/40 border-border/60 min-h-[48px]"
                  disabled={status.state === 'loading'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me about your project, role, or idea..."
                  rows={6}
                  className="bg-background/40 border-border/60 resize-none min-h-[120px]"
                  disabled={status.state === 'loading'}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="text-sm min-h-[20px]">
                  {status.state === 'success' && (
                    <span className="inline-flex items-center gap-2 text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" /> {status.msg}
                    </span>
                  )}
                  {status.state === 'error' && (
                    <span className="inline-flex items-center gap-2 text-red-500">
                      <AlertCircle className="h-4 w-4" /> {status.msg}
                    </span>
                  )}
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto rounded-full px-8 group transition-all hover:-translate-y-0.5 hover:shadow-lg min-h-[48px]" disabled={status.state === 'loading'}>
                  {status.state === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </ScrollReveal>

          {/* Direct contact links */}
          <div className="lg:col-span-2 space-y-3">
            {SOCIALS.map((s, i) => {
              const Icon = s.icon
              return (
                <ScrollReveal key={s.label} delay={0.15 + i * 0.05}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 sm:p-5 transition-all duration-300 hover:border-border hover:bg-card hover:-translate-y-1 hover:shadow-lg min-h-[48px]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 shrink-0">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground">{s.label}</p>
                        <p className="text-sm font-medium truncate">{s.value}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground shrink-0" />
                  </a>
                </ScrollReveal>
              )
            })}
            <ScrollReveal delay={0.35}>
              <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-5 text-sm text-muted-foreground">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-2">Response time</p>
                <p className="leading-relaxed">I usually reply within 24&ndash;48 hours. For urgent things, email is fastest.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
