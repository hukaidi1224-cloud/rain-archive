import type { Clearance, Hazard } from '@/data'
import { cn } from '@/lib/utils'

const HAZARD_STYLE: Record<Hazard, string> = {
  薄雨: 'text-[#8ba888] border-[#8ba888]/50',
  骤雨: 'text-[#d9a441] border-[#d9a441]/50',
  暴雨: 'text-[#d4733a] border-[#d4733a]/60',
  回南: 'text-[#b3372f] border-[#b3372f]/70',
}

const CLEARANCE_STYLE: Record<Clearance, string> = {
  可晾晒: 'text-muted-foreground border-border',
  避雨: 'text-[#7d9063] border-[#7d9063]/50',
  珍藏: 'text-[#b3372f] border-[#b3372f]/70',
}

export function HazardBadge({ level, dark = true }: { level: Hazard; dark?: boolean }) {
  return (
    <span
      className={cn(
        'font-code inline-flex items-center gap-1.5 border px-2 py-0.5 text-[11px] tracking-[0.2em]',
        HAZARD_STYLE[level],
        !dark && 'mix-blend-multiply',
      )}
      title={`雨险等级：${level}`}
    >
      <span className="text-[10px]">☔</span>
      {level}
    </span>
  )
}

export function ClearanceBadge({ level, dark = true }: { level: Clearance; dark?: boolean }) {
  return (
    <span
      className={cn(
        'font-code inline-flex items-center border px-2 py-0.5 text-[11px] tracking-[0.2em]',
        CLEARANCE_STYLE[level],
        !dark && 'mix-blend-multiply',
      )}
      title={`密级：${level}`}
    >
      {level}
    </span>
  )
}

export function CategoryMark({ label, latin }: { label: string; latin: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="font-doc flex h-7 w-7 items-center justify-center border border-primary/60 text-[13px] text-primary">
        {label}
      </span>
      <span className="font-code text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {latin}
      </span>
    </span>
  )
}
