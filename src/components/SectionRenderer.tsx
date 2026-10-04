import type { Section } from '@/data'
import { cn } from '@/lib/utils'

/** 解析文中的【密】…【/密】涂黑段 */
function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/【密】|【\/密】/)
  // split 后奇数索引为涂黑内容
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={`${keyPrefix}-r${i}`} className="redact">
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

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-6">
      {sections.map((sec, i) => {
        switch (sec.type) {
          case 'heading':
            return (
              <h2
                key={i}
                className="font-doc pt-4 text-lg font-bold tracking-[0.2em] text-[#2e3a2a]"
              >
                <span className="mr-2 inline-block h-2 w-2 rotate-45 bg-[#8a4a3a] align-middle" />
                {sec.text}
              </h2>
            )
          case 'para':
            return (
              <p key={i} className="font-doc text-justify text-[15px] leading-[1.95] tracking-[0.02em] text-[#2b3123]">
                {renderInline(sec.text, `p${i}`)}
              </p>
            )
          case 'quote':
            return (
              <blockquote
                key={i}
                className="font-doc relative border-l-2 border-[#8a4a3a]/60 pl-5 pr-2 text-[14.5px] leading-[1.9] text-[#3a4030]"
              >
                <span className="mb-1 block text-2xl leading-none text-[#8a4a3a]/50">「</span>
                {renderInline(sec.text, `q${i}`)}
                {sec.by && (
                  <cite className="mt-2 block text-right text-[13px] not-italic tracking-wider text-[#5c6450]">
                    —— {sec.by}
                  </cite>
                )}
              </blockquote>
            )
          case 'table':
            return (
              <div key={i} className="overflow-x-auto">
                <table className="font-doc w-full border-collapse text-[13.5px] leading-relaxed">
                  <thead>
                    <tr>
                      {sec.cols.map((c, j) => (
                        <th
                          key={j}
                          className="border border-[#4a4433]/50 bg-[#3e463455] px-3 py-2 text-left font-bold tracking-wider text-[#23281f]"
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="border border-[#4a4433]/40 px-3 py-2 align-top text-[#2b3123]"
                          >
                            {renderInline(cell, `t${i}-${r}-${c}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'list':
            return (
              <ul key={i} className="font-doc space-y-2.5 text-[15px] leading-[1.9] text-[#2b3123]">
                {sec.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#6b7557]" />
                    <span className="text-justify">{renderInline(item, `l${i}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            )
          case 'stamp':
            return (
              <div key={i} className="flex justify-center pt-6">
                <span className="stamp font-doc text-xl text-[#9d3128]">{sec.text}</span>
              </div>
            )
          case 'note':
            return (
              <aside
                key={i}
                className={cn(
                  'font-doc relative -mx-2 border border-[#6b7557]/40 bg-[#4a553a14] px-5 py-4',
                  'text-[13.5px] leading-[1.9] text-[#3f4832]',
                )}
              >
                <span className="absolute -top-3 left-4 bg-[#e7dfca] px-2 text-[11px] tracking-[0.4em] text-[#6b7557]">
                  编者注
                </span>
                {renderInline(sec.text, `n${i}`)}
              </aside>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
