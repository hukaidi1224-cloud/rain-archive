import { Link } from 'react-router'
import { totalCount } from '@/data'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border/70">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-doc text-lg tracking-[0.3em] text-foreground">雨底之东 · 潮湿档案</p>
            <p className="font-code mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Under the rain, east of nowhere · {totalCount} files and counting
            </p>
            <p className="font-doc mt-4 max-w-md text-[13px] leading-relaxed text-muted-foreground">
              本档案库收录的文字均属虚构，是《雨底之东》世界观的一部分。
              雨夜阅读，后果自负；回南天阅读，请先检查窗户。
            </p>
          </div>
          <div className="font-doc space-y-1 text-[13px] tracking-wider text-muted-foreground md:text-right">
            <p>铁盒笔记：潮 · 榕 · 城 · 人 · 信 · 名</p>
            <p>生存指南：层 · 实 · 则</p>
            <p className="pt-3 text-[12px] text-foreground/60">
              一只饼干铁盒，与一盒永远晾不干的纸。
            </p>
          </div>
        </div>
        <div className="rule-dotted mt-8 text-muted-foreground" />
        <p className="font-code mt-4 text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70">
          © 雨底之东档案库 · 个人创作项目 · <Link to="/about" className="underline underline-offset-4 hover:text-primary">关于本站</Link>
        </p>
      </div>
    </footer>
  )
}
