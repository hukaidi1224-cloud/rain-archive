import { Link, Navigate, useParams } from 'react-router'
import { getEntry, entries } from '@/data'
import { ClearanceBadge, HazardBadge } from '@/components/Badges'
import SectionRenderer from '@/components/SectionRenderer'

export default function EntryPage() {
  const { id } = useParams<{ id: string }>()
  const entry = id ? getEntry(id) : undefined

  if (!entry) return <Navigate to="/archive" replace />

  const idx = entries.findIndex((e) => e.id === entry.id)
  const prev = idx > 0 ? entries[idx - 1] : null
  const next = idx < entries.length - 1 ? entries[idx + 1] : null

  return (
    <div className="relative z-10 mx-auto max-w-4xl px-5 py-14">
      {/* 面包屑 */}
      <nav className="font-code mb-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        <Link to="/" className="hover:text-primary">卷首</Link>
        <span aria-hidden>/</span>
        <Link to={`/archive?cat=${encodeURIComponent(entry.category)}`} className="hover:text-primary">
          档案库 · {entry.category}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-primary">{entry.code}</span>
      </nav>

      {/* 湿纸文档 */}
      <article className="paper relative px-6 py-10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] md:px-14 md:py-14">
        {/* 折角 */}
        <span
          className="absolute right-0 top-0 h-0 w-0 border-l-[26px] border-t-[26px] border-l-transparent border-t-[#0b100f]"
          aria-hidden
        />

        {/* 档头 */}
        <header className="border-b-2 border-[#3e4634]/60 pb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-code text-[11px] uppercase tracking-[0.45em] text-[#6b7557]">
                雨底之东 · 潮湿档案
              </p>
              <p className="font-code mt-2 text-[13px] tracking-[0.3em] text-[#8a4a3a]">
                编号 {entry.code}
              </p>
            </div>
            <div className="stamp font-doc text-sm text-[#9d3128]">{entry.clearance}</div>
          </div>

          <h1 className="font-doc mt-6 text-3xl font-black leading-snug tracking-[0.1em] text-[#23281f] md:text-4xl">
            {entry.title}
          </h1>
          {entry.subtitle && (
            <p className="font-doc mt-2 text-[15px] tracking-[0.15em] text-[#5c6450]">{entry.subtitle}</p>
          )}
        </header>

        {/* 元信息栏 */}
        <dl className="font-doc grid grid-cols-2 gap-x-8 gap-y-2.5 border-b border-[#3e4634]/40 py-5 text-[12.5px] tracking-wider text-[#3a4030] md:grid-cols-4">
          <div>
            <dt className="text-[#6b7557]">归档日期</dt>
            <dd className="font-code mt-0.5 text-[12px]">{entry.date}</dd>
          </div>
          <div>
            <dt className="text-[#6b7557]">类别</dt>
            <dd className="mt-0.5">{entry.category} 类</dd>
          </div>
          {entry.location && (
            <div>
              <dt className="text-[#6b7557]">涉及地点</dt>
              <dd className="mt-0.5">{entry.location}</dd>
            </div>
          )}
          {entry.source && (
            <div className={entry.location ? 'col-span-2 md:col-span-4' : 'col-span-2'}>
              <dt className="text-[#6b7557]">来源</dt>
              <dd className="mt-0.5">{entry.source}</dd>
            </div>
          )}
        </dl>

        {/* 等级行 */}
        <div className="flex flex-wrap items-center gap-3 py-5">
          <HazardBadge level={entry.hazard} dark={false} />
          <ClearanceBadge level={entry.clearance} dark={false} />
          {entry.tags.map((t) => (
            <span key={t} className="font-doc border border-[#6b7557]/40 px-2 py-0.5 text-[11px] tracking-[0.2em] text-[#5c6450]">
              {t}
            </span>
          ))}
        </div>

        {/* 正文 */}
        <SectionRenderer sections={entry.body} />

        {/* 档尾 */}
        <footer className="mt-12 border-t border-[#3e4634]/40 pt-5">
          <div className="rule-dotted text-[#3e4634]" />
          <p className="font-code mt-4 text-center text-[10px] uppercase tracking-[0.4em] text-[#6b7557]">
            — {entry.code} · 完 · 雨仍在下 —
          </p>
        </footer>
      </article>

      {/* 上一卷 / 下一卷 */}
      <nav className="font-doc mt-10 grid gap-4 text-[13px] tracking-[0.2em] sm:grid-cols-2">
        {prev ? (
          <Link to={`/entry/${prev.id}`} className="group border border-border p-5 transition-colors hover:border-primary/60">
            <span className="font-code block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">上一卷</span>
            <span className="mt-2 block text-foreground group-hover:text-primary">
              {prev.code} · {prev.title}
            </span>
          </Link>
        ) : (
          <span className="border border-border/50 p-5 opacity-40">没有更早的卷宗</span>
        )}
        {next ? (
          <Link to={`/entry/${next.id}`} className="group border border-border p-5 text-right transition-colors hover:border-primary/60">
            <span className="font-code block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">下一卷</span>
            <span className="mt-2 block text-foreground group-hover:text-primary">
              {next.code} · {next.title}
            </span>
          </Link>
        ) : (
          <span className="border border-border/50 p-5 text-right opacity-40">全卷至此终了</span>
        )}
      </nav>
    </div>
  )
}
