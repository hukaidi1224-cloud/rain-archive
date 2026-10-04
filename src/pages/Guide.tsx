import { useState } from 'react'
import { Link } from 'react-router'
import { GUIDE_CATEGORIES, guideByCategory, guideCount, type Threat } from '@/data/guideIndex'
import { cn } from '@/lib/utils'

const THREAT_STYLE: Record<Threat, string> = {
  可近: 'text-[#3c6b46] border-[#3c6b46]/50',
  需避: 'text-[#8a6d1f] border-[#8a6d1f]/50',
  必逃: 'text-[#9c4a1a] border-[#9c4a1a]/60',
  无解: 'text-[#8f2b23] border-[#8f2b23]/70',
}

function ThreatBadge({ level }: { level: Threat }) {
  return (
    <span className={cn('font-code inline-flex items-center border px-2 py-0.5 text-[11px] tracking-[0.25em]', THREAT_STYLE[level])}>
      {level}
    </span>
  )
}

export default function Guide() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-5 py-14">
      <header className="mb-10">
        <p className="font-code text-[11px] uppercase tracking-[0.45em] text-[#8ba888]">
          Chiu Dai Survival Guide
        </p>
        <h1 className="font-doc mt-3 text-4xl font-black tracking-[0.2em] text-foreground">
          潮底生存指南
        </h1>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted-foreground"
           style={{ fontFamily: '"PingFang SC", "Hiragino Sans GB", sans-serif' }}>
          共 {guideCount} 条：层（深度带）· 实（实体）· 则（守则）。
          本指南不是故事，是工具——放在手边，保持干燥，定期翻阅。
        </p>
      </header>

      {/* 编者注：本册来历（双声部对照） */}
      <aside className="mb-12 border border-border bg-secondary/40 p-6">
        <p className="font-code text-[10px] uppercase tracking-[0.4em] text-primary">编者注 · 关于这一册</p>
        <p className="font-doc mt-3 text-[14px] leading-[2] text-foreground/85">
          档案库里的其他文字，全部转录自那只饼干铁盒——它们来自过去，来自被雨泡散的记录者。
          这一册不同。2008 年 4 月的某个清晨，它塑封完好地躺在编者门缝底下，编号「第〇四四号」，
          与册内印刷编号不符。它不怀旧，不感伤，不解释；它只说「做」与「勿做」。
          铁盒笔记是这座城市的记忆，生存指南是这座城市的条件反射。
          编者把两者并置于此，由你判断哪一个更接近真相——或者，更接近雨。
        </p>
      </aside>

      {/* 分组目录 */}
      <div className="space-y-12">
        {GUIDE_CATEGORIES.map((cat) => {
          const items = guideByCategory(cat.key)
          const isOpen = open === null || open === cat.key
          return (
            <section key={cat.key}>
              <button
                onClick={() => setOpen(isOpen && open === cat.key ? 'none' : cat.key)}
                className="group flex w-full items-baseline justify-between border-b-2 border-[#4a5a52]/60 pb-3 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-doc text-3xl font-black text-[#8ba888]">{cat.key}</span>
                  <span>
                    <span className="font-doc block text-lg font-bold tracking-[0.3em] text-foreground">{cat.name}</span>
                    <span className="font-code text-[9px] uppercase tracking-[0.35em] text-muted-foreground">{cat.latin}</span>
                  </span>
                </span>
                <span className="font-code text-[11px] tracking-[0.25em] text-muted-foreground">
                  {String(items.length).padStart(2, '0')} 条 {open === cat.key ? '−' : '+'}
                </span>
              </button>
              <p className="font-doc mt-2 text-[12.5px] text-muted-foreground">{cat.desc}</p>

              {isOpen && (
                <div className="mt-4 overflow-x-auto border border-border">
                  <table className="w-full min-w-[760px] border-collapse text-[14px]">
                    <thead>
                      <tr className="bg-secondary/60 text-left">
                        {['编号', '名称', '威胁', '深度 / 出没', '摘要'].map((c) => (
                          <th key={c} className="border-b border-border px-4 py-3 text-[12px] font-bold tracking-[0.3em] text-[#8ba888]">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((e) => (
                        <tr key={e.id} className="group transition-colors hover:bg-secondary/40">
                          <td className="border-b border-border/60 px-4 py-3.5">
                            <Link to={`/guide/${e.id}`} className="font-code text-[12px] tracking-[0.15em] text-[#8ba888] group-hover:text-primary">
                              {e.code}
                            </Link>
                          </td>
                          <td className="border-b border-border/60 px-4 py-3.5">
                            <Link to={`/guide/${e.id}`} className="block">
                              <span className="font-bold tracking-[0.12em] text-foreground group-hover:text-primary">
                                {e.title}
                              </span>
                              <span className="mt-0.5 block text-[12px] text-muted-foreground">{e.subtitle}</span>
                            </Link>
                          </td>
                          <td className="border-b border-border/60 px-4 py-3.5">
                            <ThreatBadge level={e.threat} />
                          </td>
                          <td className="max-w-[220px] border-b border-border/60 px-4 py-3.5 text-[12px] leading-relaxed text-muted-foreground">
                            {e.depth ?? '—'}
                          </td>
                          <td className="max-w-[280px] border-b border-border/60 px-4 py-3.5">
                            <span className="block truncate text-[12.5px] text-muted-foreground">{e.excerpt}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )
        })}
      </div>

      <p className="font-code mt-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
        本册编号「第〇四四号」 · 遗失请报失 · 拾获请交还凉茶铺
      </p>
    </div>
  )
}
