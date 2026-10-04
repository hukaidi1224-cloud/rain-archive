import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { cn } from '@/lib/utils'

function RainAudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}rain.mp3`)
    audio.loop = true
    audio.volume = 0.32
    audio.addEventListener('error', () => setAvailable(false))
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  if (!available) return null

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setAvailable(false))
    }
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'group flex shrink-0 items-center gap-2 border border-border px-2.5 py-1.5 text-xs tracking-[0.25em] transition-colors',
        playing ? 'text-primary border-primary/50' : 'text-muted-foreground hover:text-foreground',
      )}
      aria-pressed={playing}
    >
      <span className="flex items-end gap-[2px]" aria-hidden>
        {[3, 5, 4].map((h, i) => (
          <span
            key={i}
            className={cn('w-[2px] bg-current transition-all', playing ? 'animate-pulse' : '')}
            style={{ height: playing ? h * 2 : 3 }}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{playing ? '雨声 · 开' : '雨声'}</span>
    </button>
  )
}

export default function Nav() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      'whitespace-nowrap px-0.5 py-2 text-[12px] tracking-[0.08em] transition-colors md:px-1 md:tracking-[0.3em]',
      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
    )

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 md:gap-3 md:px-5">
        <Link to="/" className="group flex min-w-0 shrink items-center gap-2 md:gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-primary/60 text-primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 9a4 4 0 1 1 .8-7.9A5 5 0 0 1 13 4.5 2.75 2.75 0 0 1 12.5 9H3Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 11.5 4 14M8.5 11.5 7.5 14M12 11.5 11 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="min-w-0 leading-tight">
            <span className="font-doc block truncate text-[14px] font-bold tracking-[0.15em] text-foreground md:text-[15px] md:tracking-[0.35em]">
              雨底之东
            </span>
            <span className="font-code hidden text-[9px] uppercase tracking-[0.4em] text-muted-foreground sm:block">
              The Damp Archive
            </span>
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-2 md:gap-4">
          <NavLink to="/" end className={linkCls} title="卷首">
            卷首
          </NavLink>
          <NavLink to="/archive" className={linkCls} title="铁盒笔记">
            笔记
          </NavLink>
          <NavLink to="/guide" className={linkCls} title="潮底生存指南">
            指南
          </NavLink>
          <NavLink to="/about" className={linkCls} title="关于">
            关于
          </NavLink>
          <RainAudioToggle />
        </nav>
      </div>
    </header>
  )
}
