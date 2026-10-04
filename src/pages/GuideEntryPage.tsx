import { Link, Navigate, useParams } from 'react-router'
import { getGuideEntry, guideEntries, THREAT_DESC } from '@/data/guideIndex'
import GuideSectionRenderer from '@/components/GuideSectionRenderer'

export default function GuideEntryPage() {
  const { id } = useParams<{ id: string }>()
  const entry = id ? getGuideEntry(id) : undefined

  if (!entry) return <Navigate to="/guide" replace />

  const idx = guideEntries.findIndex((e) => e.id === entry.id)
  const prev = idx > 0 ? guideEntries[idx - 1] : null
  const next = idx < guideEntries.length - 1 ? guideEntries[idx + 1] : null

  return (
    <div className="relative z-10 mx-auto max-w-4xl px-5 py-14">
      <nav className="font-code mb-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        <Link to="/" className="hover:text-primary">卷首</Link>
        <span aria-hidden>/</span>
        <Link to="/guide" className="hover:text-primary">生存指南</Link>
        <span aria-hidden>/</span>
        <span className="text-primary">{entry.code}</span>
      </nav>

      {/* 冷灰影印件 */}
      <article className="paper-cold relative px-6 py-10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] md:px-12 md:py-12">
        <span
          className="absolute right-0 top-0 h-0 w-0 border-l-[26px] border-t-[26px] border-l-transparent border-t-[#0b100f]"
          aria-hidden
        />

        {/* 手册头 */}
        <header className="border-b-2 border-[#1d2422]/70 pb-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-code text-[11px] uppercase tracking-[0.4em] text-[#5c6b62]">
                潮底生存指南 · 避雨人内务
              </p>
              <p className="font-code mt-2 text-[13px] tracking-[0.3em] text-[#8f2b23]">
                {entry.code} · {entry.version}
              </p>
            </div>
            <div className="barcode w-32 text-[#1d2422]/70" aria-hidden />
          </div>
          <h1
            className="mt-6 text-3xl font-black leading-snug tracking-[0.12em] text-[#1d2422] md:text-4xl"
            style={{ fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif' }}
          >
            {entry.title}
          </h1>
          <p className="mt-2 text-[15px] tracking-[0.12em] text-[#4a5a52]"
             style={{ fontFamily: '"PingFang SC", "Hiragino Sans GB", sans-serif' }}>
            {entry.subtitle}
          </p>
        </header>

        {/* 状态行 */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[#4a5a52]/40 py-4 text-[12.5px] tracking-[0.15em] text-[#33413a]">
          <span>
            威胁分级：
            <strong className="ml-1 text-[#8f2b23]">{entry.threat}</strong>
          </span>
          <span className="text-[12px] text-[#5c6b62]">{THREAT_DESC[entry.threat]}</span>
          {entry.depth && (
            <span className="w-full text-[12px] text-[#5c6b62]">出没深度：{entry.depth}</span>
          )}
          {entry.threatNote && (
            <span className="w-full text-[12px] text-[#8a6d1f]">备注：{entry.threatNote}</span>
          )}
        </div>

        {/* 正文 */}
        <div className="py-6">
          <GuideSectionRenderer sections={entry.body} />
        </div>

        {/* 手册尾 */}
        <footer className="mt-10 border-t border-[#4a5a52]/40 pt-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-code text-[10px] uppercase tracking-[0.35em] text-[#5c6b62]">
                第〇四四号 · 内部资料 · 遗失报失
              </p>
              <p className="font-code mt-1 text-[10px] uppercase tracking-[0.35em] text-[#5c6b62]">
                修订：{entry.date} · {entry.version}
              </p>
            </div>
            <div className="stamp text-sm text-[#8f2b23]" style={{ fontFamily: '"PingFang SC", sans-serif' }}>
              避雨人内务
            </div>
          </div>
        </footer>
      </article>

      {/* 上一条 / 下一条 */}
      <nav className="mt-10 grid gap-4 text-[13px] tracking-[0.15em] sm:grid-cols-2"
           style={{ fontFamily: '"PingFang SC", "Hiragino Sans GB", sans-serif' }}>
        {prev ? (
          <Link to={`/guide/${prev.id}`} className="group border border-border p-5 transition-colors hover:border-primary/60">
            <span className="font-code block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">上一条</span>
            <span className="mt-2 block text-foreground group-hover:text-primary">{prev.code} · {prev.title}</span>
          </Link>
        ) : (
          <span className="border border-border/50 p-5 opacity-40">前面没有了</span>
        )}
        {next ? (
          <Link to={`/guide/${next.id}`} className="group border border-border p-5 text-right transition-colors hover:border-primary/60">
            <span className="font-code block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">下一条</span>
            <span className="mt-2 block text-foreground group-hover:text-primary">{next.code} · {next.title}</span>
          </Link>
        ) : (
          <span className="border border-border/50 p-5 text-right opacity-40">本册至此暂完</span>
        )}
      </nav>
    </div>
  )
}
