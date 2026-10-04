import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { CATEGORIES, entries, type Category } from '@/data'
import { ClearanceBadge, HazardBadge } from '@/components/Badges'
import { cn } from '@/lib/utils'

export default function Archive() {
  const [params, setParams] = useSearchParams()
  const cat = (params.get('cat') as Category | null) ?? null
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return entries.filter((e) => {
      if (cat && e.category !== cat) return false
      if (!q) return true
      const hay = `${e.code}${e.title}${e.subtitle ?? ''}${e.excerpt}${e.tags.join('')}`.toLowerCase()
      return hay.includes(q)
    })
  }, [cat, query])

  const setCat = (c: Category | null) => {
    if (c) params.set('cat', c)
    else params.delete('cat')
    setParams(params, { replace: true })
  }

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-5 py-14">
      <header className="mb-10">
        <p className="font-code text-[11px] uppercase tracking-[0.45em] text-primary">The Tin-Box Notes</p>
        <h1 className="font-doc mt-3 text-4xl font-black tracking-[0.2em] text-foreground">铁盒笔记</h1>
        <p className="font-doc mt-3 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
          全部 {entries.length} 卷，编者自饼干铁盒转录，按六类编号。雨险等级由薄雨至回南递增；密级由可晾晒至珍藏递增。
          笔记保留原文的洇痕与矛盾，只做加注——它们是这座城市的记忆。
        </p>
        <p className="font-doc mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground/80">
          想要冷一点的文字？{' '}
          <Link to="/guide" className="underline decoration-primary/60 underline-offset-4 hover:text-primary">
            潮底生存指南 →
          </Link>
        </p>
      </header>

      {/* 类别筛选 */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setCat(null)}
          className={cn(
            'font-doc border px-4 py-1.5 text-[13px] tracking-[0.3em] transition-colors',
            cat === null
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border text-muted-foreground hover:text-foreground',
          )}
        >
          全部
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(cat === c.key ? null : c.key)}
            className={cn(
              'font-doc border px-4 py-1.5 text-[13px] tracking-[0.3em] transition-colors',
              cat === c.key
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground',
            )}
          >
            {c.key} · {c.name}
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="检索：题名 / 编号 / 标签…"
          className="font-doc ml-auto w-full border border-border bg-transparent px-4 py-1.5 text-[13px] tracking-wider text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none sm:w-64"
        />
      </div>

      {/* 索引表 */}
      <div className="overflow-x-auto border border-border">
        <table className="font-doc w-full min-w-[820px] border-collapse text-[14px]">
          <thead>
            <tr className="bg-secondary/60 text-left">
              {['编号', '题名', '类别', '雨险', '密级', '日期'].map((c) => (
                <th key={c} className="border-b border-border px-4 py-3 text-[12px] font-bold tracking-[0.3em] text-primary">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="group transition-colors hover:bg-secondary/40">
                <td className="border-b border-border/60 px-4 py-3.5">
                  <Link to={`/entry/${e.id}`} className="font-code text-[12px] tracking-[0.15em] text-primary/80 group-hover:text-primary">
                    {e.code}
                  </Link>
                </td>
                <td className="border-b border-border/60 px-4 py-3.5">
                  <Link to={`/entry/${e.id}`} className="block">
                    <span className="font-bold tracking-[0.12em] text-foreground group-hover:text-primary">
                      {e.title}
                    </span>
                    <span className="mt-0.5 block max-w-md truncate text-[12px] text-muted-foreground">
                      {e.subtitle ?? e.excerpt}
                    </span>
                  </Link>
                </td>
                <td className="border-b border-border/60 px-4 py-3.5 text-muted-foreground">{e.category}</td>
                <td className="border-b border-border/60 px-4 py-3.5">
                  <HazardBadge level={e.hazard} />
                </td>
                <td className="border-b border-border/60 px-4 py-3.5">
                  <ClearanceBadge level={e.clearance} />
                </td>
                <td className="border-b border-border/60 px-4 py-3.5 font-code text-[11px] tracking-wider text-muted-foreground">
                  {e.date}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  没有匹配的档案。也许它被淋溶了，也许你该等一场雨。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="font-code mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
        共 {filtered.length} 卷 · 原铁盒编号即锁
      </p>
    </div>
  )
}
