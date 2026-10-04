import { Link } from 'react-router'
import { CATEGORIES, entriesByCategory, featuredEntries } from '@/data'
import { featuredGuide } from '@/data/guideIndex'
import { ClearanceBadge, HazardBadge } from '@/components/Badges'

const RAIN_LEVELS = [
  ['毛毛雨', '霓虹灯晕开，车牌反光异常', '只有「敏感者」能感知到空气变厚'],
  ['中雨', '瓷砖返潮，镜面起雾，旧楼走廊出现霉味', '局部空间折叠：楼梯多出一层，巷尾连通另一条街'],
  ['暴雨', '积水形成不透明镜面，公交窗上的水流逆向', '完全重叠，物理法则让位于「水语法」'],
  ['回南天', '墙壁渗出水珠，衣物永不干燥', '最危险的渗透——残留不随雨停消失，可持续数日'],
]

export default function Home() {
  return (
    <div className="relative z-10">
      {/* ── 卷首 · 全屏雨景 ─────────────────────────── */}
      <section className="relative flex min-h-[92vh] flex-col overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-rain.jpg)` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/35 to-background" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-24">
          <p className="font-code text-[11px] uppercase tracking-[0.5em] text-primary/90">
            Can Ton · Chiu Dai · 2000s
          </p>
          <h1 className="font-doc neon-flicker mt-6 text-balance text-6xl font-black leading-tight tracking-[0.12em] text-[#e8e4d4] md:text-8xl">
            雨底之东
          </h1>
          <p className="font-doc mt-4 text-xl tracking-[0.55em] text-[#c9cfc0] md:text-2xl">
            潮 湿 档 案
          </p>
          <p className="font-doc mt-8 max-w-xl text-[15px] leading-[2] text-[#b9c0b2]">
            一座同时属于大量外来人口和古老传统的多雨城市，
            和在雨中出现的异世界投影。
            这些档案转录自一只在拆迁工地发现的饼干铁盒——
            盒里的每一张纸，都是湿的。那天是晴天，连续第九天晴天。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/archive"
              className="font-doc border border-primary bg-primary/10 px-8 py-3 text-sm tracking-[0.4em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              进入档案库
            </Link>
            <Link
              to="/entry/zero"
              className="font-doc border border-[#8ba888]/60 px-8 py-3 text-sm tracking-[0.4em] text-[#c9cfc0] transition-colors hover:border-[#8ba888] hover:text-white"
            >
              编者说明
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-8">
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <p className="font-code text-[10px] uppercase tracking-[0.35em] text-[#8ba888]">
              雨级越高 · 渗透越深
            </p>
            <p className="font-code text-[10px] uppercase tracking-[0.35em] text-[#8ba888]">
              回南将至 · 慎读
            </p>
          </div>
        </div>
      </section>

      {/* ── 雨级表 ─────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-doc text-2xl font-bold tracking-[0.3em] text-foreground">
            雨级判定表
          </h2>
          <span className="font-code text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            摘自 潮-001
          </span>
        </div>
        <div className="overflow-x-auto border border-border">
          <table className="font-doc w-full min-w-[720px] border-collapse text-[14px]">
            <thead>
              <tr className="bg-secondary/60 text-left">
                {['雨级', '表世界现象', '潮底渗透程度'].map((c) => (
                  <th key={c} className="border-b border-border px-5 py-3.5 font-bold tracking-[0.25em] text-primary">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RAIN_LEVELS.map((row, i) => (
                <tr key={i} className="transition-colors hover:bg-secondary/40">
                  <td className="border-b border-border/60 px-5 py-4 font-bold tracking-[0.2em] text-foreground">
                    {row[0]}
                  </td>
                  <td className="border-b border-border/60 px-5 py-4 leading-relaxed text-foreground/85">
                    {row[1]}
                  </td>
                  <td
                    className={
                      'border-b border-border/60 px-5 py-4 leading-relaxed ' +
                      (i === 3 ? 'text-[#d4733a]' : 'text-muted-foreground')
                    }
                  >
                    {row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-doc mt-4 text-[13px] leading-relaxed text-muted-foreground">
          所有人都有可能在下雨时进入潮底：一条多出的路口，一条长得不正常的街，或仅仅是在雨中走了太久。
          <Link to="/entry/chiu-001" className="ml-2 underline decoration-primary/60 underline-offset-4 hover:text-primary">
            阅读完整档案 →
          </Link>
        </p>
      </section>

      {/* ── 精选笔记 ─────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-doc text-2xl font-bold tracking-[0.3em] text-foreground">精选笔记</h2>
          <Link
            to="/archive"
            className="font-code text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
          >
            全部笔记 →
          </Link>
        </div>
        <div className="border-t border-border">
          {featuredEntries.map((e) => (
            <Link
              key={e.id}
              to={`/entry/${e.id}`}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-b border-border py-6 transition-colors hover:bg-secondary/30 md:grid-cols-[110px_1fr_auto]"
            >
              <span className="font-code pt-1 text-[12px] tracking-[0.2em] text-primary/80">{e.code}</span>
              <span>
                <span className="font-doc block text-lg font-bold tracking-[0.15em] text-foreground transition-colors group-hover:text-primary">
                  {e.title}
                </span>
                <span className="font-doc mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                  {e.excerpt}
                </span>
              </span>
              <span className="col-span-2 flex gap-2 md:col-span-1 md:flex-col md:items-end">
                <HazardBadge level={e.hazard} />
                <ClearanceBadge level={e.clearance} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 编者的话 + 铁盒 ─────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative">
            <div
              className="aspect-[3/2] bg-cover bg-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/dossier.jpg)` }}
            />
            <span className="font-code absolute -bottom-3 left-4 bg-background px-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              铁盒 · 第三层 · 防水袋
            </span>
          </div>
          <div>
            <p className="font-code text-[11px] uppercase tracking-[0.4em] text-primary">编者说明 · 节选</p>
            <blockquote className="font-doc mt-6 text-xl leading-[2.1] tracking-[0.05em] text-foreground">
              「原文照录。错别字、方言用字、洇开的墨迹均保留，仅加注。
              不同记录互相矛盾之处，并存不裁——
              <span className="text-primary">这座城市本身就互相矛盾。</span>」
            </blockquote>
            <p className="font-doc mt-6 text-[13px] leading-relaxed text-muted-foreground">
              铁盒纸张的笔迹至少属于七个人。其中三个笔迹，在最后一页之后还各出现过一次——
              出现在别人的记录里，时间在他们停笔之后。
            </p>
            <Link
              to="/entry/zero"
              className="font-doc mt-8 inline-block border border-border px-6 py-2.5 text-[13px] tracking-[0.35em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              阅读第〇号档案
            </Link>
          </div>
        </div>
      </section>

      {/* ── 另一种声音 · 生存指南 ─────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-doc text-2xl font-bold tracking-[0.3em] text-foreground">
            另一种声音
          </h2>
          <Link
            to="/guide"
            className="font-code text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
          >
            翻开指南 →
          </Link>
        </div>
        <p className="font-doc mb-8 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">
          铁盒笔记是这座城市的记忆——洇开的、矛盾的、属于过去的。
          《潮底生存指南》是它的条件反射：不怀旧，不解释，只说「做」与「勿做」。
          传说是避雨人的内务手册，某一夜自己出现在编者的门缝底下，塑封完好。
        </p>
        <div className="border border-border">
          {featuredGuide.slice(0, 3).map((g) => (
            <Link
              key={g.id}
              to={`/guide/${g.id}`}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-1 border-b border-border px-5 py-5 transition-colors last:border-b-0 hover:bg-secondary/40"
            >
              <span className="font-code pt-1 text-[12px] tracking-[0.2em] text-[#8ba888]">{g.code}</span>
              <span className="min-w-0">
                <span className="block text-[15px] font-bold tracking-[0.15em] text-foreground group-hover:text-primary"
                      style={{ fontFamily: '"PingFang SC", "Hiragino Sans GB", sans-serif' }}>
                  {g.title}
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] text-muted-foreground">{g.excerpt}</span>
              </span>
              <span className="font-code border px-2 py-0.5 text-[11px] tracking-[0.25em]"
                    style={{
                      color: g.threat === '无解' || g.threat === '必逃' ? '#d4733a' : '#8ba888',
                      borderColor: g.threat === '无解' || g.threat === '必逃' ? '#d4733a66' : '#8ba88855',
                    }}>
                {g.threat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 六类索引 ─────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-doc mb-8 text-2xl font-bold tracking-[0.3em] text-foreground">六类索引</h2>
        <div className="grid grid-cols-2 border-l border-t border-border md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              to={`/archive?cat=${encodeURIComponent(c.key)}`}
              className="group border-b border-r border-border p-6 transition-colors hover:bg-secondary/40"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-doc text-3xl font-black text-primary/90 transition-colors group-hover:text-primary">
                  {c.key}
                </span>
                <span className="font-code text-[11px] tracking-[0.2em] text-muted-foreground">
                  {String(entriesByCategory(c.key).length).padStart(2, '0')} 卷
                </span>
              </div>
              <p className="font-doc mt-3 text-[15px] font-bold tracking-[0.25em] text-foreground">{c.name}</p>
              <p className="font-code text-[9px] uppercase tracking-[0.3em] text-muted-foreground/80">{c.latin}</p>
              <p className="font-doc mt-3 text-[12.5px] leading-relaxed text-muted-foreground">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
