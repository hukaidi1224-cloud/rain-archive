import { Link } from 'react-router'
import type { GSection } from '@/data/guideTypes'
import { getEntry } from '@/data'
import { cn } from '@/lib/utils'

const WARN_STYLE = {
  注意: 'border-[#8a6d1f] bg-[#8a6d1f12] text-[#4a3c12]',
  警告: 'border-[#9c4a1a] bg-[#9c4a1a12] text-[#54290d]',
  严禁: 'border-[#8f2b23] bg-[#8f2b2315] text-[#5c1a14]',
} as const

const WARN_LABEL = {
  注意: '注意',
  警告: '警告',
  严禁: '严禁',
} as const

/** 解析 ██ 涂黑 */
function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/██/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={`${keyPrefix}-b${i}`} className="redact">
        {part}
      </span>
    ) : (
      <span key={`${keyPrefix}-t${i}`}>
        {part.split('\n').map((line, j) => (
          <span key={j}>
            {line}
            {j < part.split('\n').length - 1 && <br />}
          </span>
        ))}
      </span>
    ),
  )
}

export default function GuideSectionRenderer({ sections }: { sections: GSection[] }) {
  return (
    <div className="space-y-5">
      {sections.map((sec, i) => {
        switch (sec.type) {
          case 'para':
            return (
              <p
                key={i}
                className="text-justify text-[14.5px] leading-[1.95] tracking-[0.02em] text-[#232a27]"
                style={{ fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif' }}
              >
                {renderInline(sec.text, `p${i}`)}
              </p>
            )
          case 'clause':
            return (
              <section key={i} className="border-l-2 border-[#4a5a52] pl-4">
                <h3 className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-code text-[12px] tracking-[0.3em] text-[#8f2b23]">{sec.no}</span>
                  <span className="text-[15.5px] font-bold tracking-[0.15em] text-[#1d2422]">{sec.title}</span>
                </h3>
                <p className="mt-1.5 text-justify text-[14px] leading-[1.9] text-[#2a332f]">
                  {renderInline(sec.text, `c${i}`)}
                </p>
              </section>
            )
          case 'warn':
            return (
              <aside
                key={i}
                className={cn('flex gap-3 border-l-4 px-4 py-3 text-[13.5px] leading-[1.85]', WARN_STYLE[sec.level])}
              >
                <span className="font-code shrink-0 text-[11px] font-bold tracking-[0.3em]">
                  ▲ {WARN_LABEL[sec.level]}
                </span>
                <span className="text-justify">{renderInline(sec.text, `w${i}`)}</span>
              </aside>
            )
          case 'specs':
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <tbody>
                    {sec.items.map(([k, v], r) => (
                      <tr key={r}>
                        <td className="w-28 shrink-0 border border-[#4a5a52]/35 bg-[#4a5a520d] px-3 py-2 font-bold tracking-[0.2em] text-[#33413a]">
                          {k}
                        </td>
                        <td className="border border-[#4a5a52]/35 px-3 py-2 leading-relaxed text-[#232a27]">
                          {renderInline(v, `s${i}-${r}`)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'list':
            return (
              <ul key={i} className="space-y-2 text-[14px] leading-[1.85] text-[#2a332f]">
                {sec.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-[#4a5a52]" />
                    <span className="text-justify">{renderInline(item, `l${i}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            )
          case 'figure':
            return (
              <figure key={i} className="mx-auto max-w-md py-3">
                <img src={sec.src} alt={sec.caption ?? ''} className="w-full" loading="lazy" />
                {sec.caption && (
                  <figcaption className="mt-2 text-center font-code text-[10px] uppercase tracking-[0.35em] text-[#5c6b62]">
                    {sec.caption}
                  </figcaption>
                )}
              </figure>
            )
          case 'refs':
            return (
              <div key={i} className="border-t border-dashed border-[#4a5a52]/40 pt-3">
                <p className="font-code text-[10px] uppercase tracking-[0.35em] text-[#5c6b62]">参见 · 铁盒笔记</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {sec.ids.map((rid) => {
                    const ref = getEntry(rid)
                    return ref ? (
                      <Link
                        key={rid}
                        to={`/entry/${rid}`}
                        className="border border-[#4a5a52]/40 px-2.5 py-1 text-[12px] tracking-[0.15em] text-[#33413a] transition-colors hover:border-[#8f2b23] hover:text-[#8f2b23]"
                      >
                        {ref.code} {ref.title}
                      </Link>
                    ) : (
                      <span key={rid} className="border border-[#4a5a52]/40 px-2.5 py-1 text-[12px] text-[#5c6b62]">
                        {rid}（缺卷）
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
